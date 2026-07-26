import { CompanionMessage } from './types';

// Set by deploying server/ (see server/README.md) and adding
// EXPO_PUBLIC_COMPANION_API_URL=https://your-worker.workers.dev to a .env
// file in the project root, e.g. https://nightbloom-companion.<you>.workers.dev
const API_URL = process.env.EXPO_PUBLIC_COMPANION_API_URL ?? '';

export function isCompanionConfigured(): boolean {
  return API_URL.length > 0;
}

export class CompanionError extends Error {
  kind: 'not_configured' | 'rate_limited' | 'network' | 'server';
  constructor(kind: CompanionError['kind'], message: string) {
    super(message);
    this.kind = kind;
  }
}

export async function sendCompanionMessage(
  history: CompanionMessage[]
): Promise<{ reply: string; crisis?: boolean }> {
  if (!isCompanionConfigured()) {
    throw new CompanionError(
      'not_configured',
      "Companion isn't connected yet. This build has no server configured."
    );
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        messages: history.map((m) => ({ role: m.role, content: m.content })),
      }),
    });
  } catch {
    throw new CompanionError('network', "Couldn't reach Companion. Check your connection.");
  }

  if (res.status === 429) {
    throw new CompanionError(
      'rate_limited',
      "You've reached today's message limit for Companion. Try again tomorrow."
    );
  }
  if (!res.ok) {
    throw new CompanionError('server', 'Companion had trouble responding. Please try again.');
  }

  const data = (await res.json()) as { reply: string; crisis?: boolean };
  return data;
}
