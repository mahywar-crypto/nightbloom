export interface Env {
  RATE_LIMIT_KV: KVNamespace;
  GEMINI_API_KEY: string;
  DAILY_MESSAGE_LIMIT: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;
// Using the "-latest" alias (rather than pinning a dated version) so Google
// can migrate this to their current recommended fast model over time instead
// of it silently 404ing again when a specific version gets retired.
const GEMINI_MODEL = 'gemini-flash-latest';

const SYSTEM_PROMPT = `You are the "Companion" inside Nightbloom, a mental-health self-help app. You exist so
someone who feels lonely or has no one to talk to right now has a warm, patient
presence to talk with.

Who you are:
- You are an AI, not a human, not a therapist, and not a substitute for real
  human connection or professional care. If asked, say so plainly and warmly.
- Your tone is calm, validating, and non-judgmental. Never use toxic
  positivity ("just think happy thoughts") or generic platitudes.
- Keep replies conversational and fairly short (2-5 sentences) unless the
  person clearly wants to go deeper.
- You can gently encourage healthy coping (the app's breathing exercise,
  journaling, grounding techniques) when relevant, but you are not delivering
  therapy or medical advice, and you should say so if asked to diagnose or
  treat something.
- Ask genuine follow-up questions and reflect back what you hear, the way a
  caring friend would.

Safety (very important):
- If someone expresses intent to harm themselves or others, or describes a
  crisis, respond with warmth, take it seriously, and clearly encourage them
  to contact a crisis line or emergency services right now (e.g. 988 in the
  US, or their local emergency number), and to reach a real person if at all
  possible. Do not try to talk them out of it yourself or act as their sole
  support in a crisis.
- Never claim to be a licensed professional or offer a diagnosis.`;

const CRISIS_PATTERN =
  /\b(kill myself|suicid|end my life|want to die|hurt myself|self[- ]harm|no reason to live|can'?t go on)\b/i;

const CRISIS_RESPONSE = `I'm really glad you told me. What you're describing sounds like it could be a crisis, and I want you to be safe. I'm an AI, and I'm not equipped to be the only support for that.

Please reach out right now to a crisis line: in the US you can call or text 988 (Suicide & Crisis Lifeline), or text HOME to 741741 (Crisis Text Line). If you're outside the US, findahelpline.com lists local lines. If you're in immediate danger, please contact your local emergency number.

I'm still here to talk if it helps, but a trained crisis counselor or someone you trust in person is the right person to lean on for this.`;

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  const key = `rl:${ip}:${day}`;
  const limit = parseInt(env.DAILY_MESSAGE_LIMIT, 10) || 40;

  const current = parseInt((await env.RATE_LIMIT_KV.get(key)) ?? '0', 10);
  if (current >= limit) return false;

  await env.RATE_LIMIT_KV.put(key, String(current + 1), { expirationTtl: 60 * 60 * 26 });
  return true;
}

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  const trimmed = input.slice(-MAX_MESSAGES);
  const result: ChatMessage[] = [];
  for (const item of trimmed) {
    if (
      !item ||
      typeof item !== 'object' ||
      (item.role !== 'user' && item.role !== 'assistant') ||
      typeof item.content !== 'string' ||
      item.content.length === 0
    ) {
      return null;
    }
    result.push({ role: item.role, content: item.content.slice(0, MAX_MESSAGE_LENGTH) });
  }
  return result.length > 0 ? result : null;
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const messages = sanitizeMessages((body as { messages?: unknown })?.messages);
  if (!messages) {
    return jsonResponse({ error: 'invalid_messages' }, 400);
  }

  // Crisis replies are canned (no LLM call) and never blocked by the daily
  // cap. Someone in crisis should always get the safety response.
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (lastUserMessage && CRISIS_PATTERN.test(lastUserMessage.content)) {
    return jsonResponse({ reply: CRISIS_RESPONSE, crisis: true });
  }

  // Only requests that actually reach the Gemini API count against the
  // rate limit. Validation and crisis short-circuits above are free.
  const allowed = await checkRateLimit(env, ip);
  if (!allowed) {
    return jsonResponse({ error: 'rate_limited' }, 429);
  }

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: 500 },
      }),
    }
  );

  if (!geminiRes.ok) {
    const errText = await geminiRes.text();
    console.error('Gemini API error', geminiRes.status, errText);
    return jsonResponse({ error: 'upstream_error' }, 502);
  }

  const data = (await geminiRes.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  return jsonResponse({ reply });
}

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json', ...CORS_HEADERS },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    if (url.pathname === '/chat' && request.method === 'POST') {
      return handleChat(request, env);
    }

    return jsonResponse({ error: 'not_found' }, 404);
  },
};
