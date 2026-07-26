import { MoodKey, TriggerKey } from './types';

export const MOODS: { key: MoodKey; label: string; emoji: string }[] = [
  { key: 'anxious', label: 'Anxious', emoji: '😟' },
  { key: 'overwhelmed', label: 'Overwhelmed', emoji: '🌊' },
  { key: 'sad', label: 'Sad', emoji: '😔' },
  { key: 'restless', label: 'Restless', emoji: '😣' },
  { key: 'numb', label: 'Numb', emoji: '😶' },
  { key: 'angry', label: 'Angry', emoji: '😠' },
  { key: 'okay', label: 'Okay', emoji: '🙂' },
  { key: 'good', label: 'Good', emoji: '😊' },
];

export const TRIGGERS: { key: TriggerKey; label: string }[] = [
  { key: 'work', label: 'Work / school' },
  { key: 'relationships', label: 'Relationships' },
  { key: 'family', label: 'Family' },
  { key: 'health', label: 'Health' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'finances', label: 'Finances' },
  { key: 'social', label: 'Social situations' },
  { key: 'future', label: 'The future' },
  { key: 'unknown', label: "Not sure / no reason" },
  { key: 'other', label: 'Something else' },
];

export const JOURNAL_PROMPTS: string[] = [
  "What's one thing weighing on your mind right now?",
  'What would you tell a friend who felt the way you feel today?',
  "What's one small thing within your control today?",
  'Describe the feeling in your body right now, without judging it.',
  'What happened right before this feeling started?',
  "What's one thing that went okay today, even a small thing?",
  'If this feeling could talk, what would it be trying to tell you?',
  "What's something you need right now that you can actually ask for?",
  'Who is someone you could reach out to today, even just to say hi?',
  "What's one thing you did today that your future self might thank you for?",
];

export interface GroundingStep {
  title: string;
  body: string;
}

// 5-4-3-2-1 grounding technique for panic or acute anxiety.
export const GROUNDING_STEPS: GroundingStep[] = [
  {
    title: "You're safe. This will pass.",
    body: "Panic attacks are frightening but not dangerous, and they always peak and fade. Let's ride this one out together, one step at a time.",
  },
  {
    title: 'Notice 5 things you can see',
    body: 'Look around slowly. Name five things you can see, out loud or in your head.',
  },
  {
    title: 'Notice 4 things you can touch',
    body: 'Feel four things near you: your clothing, a surface, your own hands.',
  },
  {
    title: 'Notice 3 things you can hear',
    body: 'Listen for three sounds, near or far. Just notice them, no need to name their source.',
  },
  {
    title: 'Notice 2 things you can smell',
    body: 'Notice two smells in the air, or two things you can imagine smelling.',
  },
  {
    title: 'Notice 1 thing you can taste',
    body: 'Notice one taste in your mouth right now, or take a sip of water.',
  },
  {
    title: 'Slow your breathing',
    body: "Let's do a minute of slow box breathing together on the next screen.",
  },
];

export const PANIC_REMINDERS: string[] = [
  'This feeling is temporary and it will pass.',
  "You've gotten through this before, and you'll get through it again.",
  "You don't need to fight the feeling. Just let it move through you.",
  "You are safe right now, even though it doesn't feel that way.",
];

export interface CrisisResource {
  region: string;
  name: string;
  contact: string;
  description: string;
}

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    region: 'United States',
    name: '988 Suicide & Crisis Lifeline',
    contact: 'Call or text 988',
    description: 'Free, confidential support, 24/7, for anyone in emotional distress or crisis.',
  },
  {
    region: 'United States',
    name: 'Crisis Text Line',
    contact: 'Text HOME to 741741',
    description: 'Free 24/7 text support with a trained crisis counselor.',
  },
  {
    region: 'United States',
    name: 'SAMHSA National Helpline',
    contact: 'Call 1-800-662-4357',
    description: 'Free, confidential, 24/7 treatment referral and information service for mental health and substance use.',
  },
  {
    region: 'Canada',
    name: 'Talk Suicide Canada',
    contact: 'Call 1-833-456-4566, or text 45645',
    description: '24/7 bilingual support for people thinking about suicide or worried about someone.',
  },
  {
    region: 'United Kingdom & Ireland',
    name: 'Samaritans',
    contact: 'Call 116 123',
    description: 'Free 24/7 confidential emotional support.',
  },
  {
    region: 'International',
    name: 'Befrienders Worldwide',
    contact: 'befrienders.org',
    description: 'Directory of emotional support helplines around the world.',
  },
  {
    region: 'International',
    name: 'Find a helpline',
    contact: 'findahelpline.com',
    description: "Directory of crisis lines by country if you're outside the regions above.",
  },
];

export const COPING_TECHNIQUES: { title: string; body: string }[] = [
  {
    title: 'Box breathing',
    body: 'Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 1 to 2 minutes to calm your nervous system.',
  },
  {
    title: 'Cold water reset',
    body: "Splash cold water on your face or hold an ice cube. The cold triggers your body's dive reflex, which can quickly lower heart rate and anxiety.",
  },
  {
    title: 'Progressive muscle relaxation',
    body: 'Starting at your feet, tense each muscle group for 5 seconds, then release. Work slowly up to your shoulders and face.',
  },
  {
    title: 'Name it to tame it',
    body: 'Silently label what you\'re feeling, like "this is anxiety" or "this is a panic wave." Naming an emotion can reduce its intensity.',
  },
  {
    title: 'Anchor phrase',
    body: 'Pick a short phrase like "I am safe right now" and repeat it slowly as you breathe.',
  },
  {
    title: 'Move your body',
    body: 'A short walk, stretch, or shaking out your hands can help discharge anxious or restless energy. Even five minutes counts.',
  },
  {
    title: 'Reach out to one person',
    body: "Send a text to someone you trust, even just to say hi. Isolation tends to feed hard feelings, and you don't have to explain everything to reach out.",
  },
  {
    title: 'Protect your sleep',
    body: 'Poor sleep makes almost everything harder to cope with. Try a consistent wind-down time and keeping screens out of bed if you can.',
  },
  {
    title: 'Watch the caffeine and news',
    body: "Caffeine can mimic anxiety symptoms (racing heart, jitteriness), and doomscrolling can spike stress. Neither is 'bad,' but noticing the pattern helps.",
  },
  {
    title: 'Self-compassion break',
    body: "Put a hand on your chest and say what you'd say to a friend having this exact day. You're allowed to be kind to yourself, especially right now.",
  },
  {
    title: 'Schedule your worry',
    body: "Set aside 10 minutes later today to think through what's worrying you. When it comes up before then, jot it down and let your mind set it aside until then.",
  },
  {
    title: 'Get outside for a few minutes',
    body: 'Natural light and fresh air, even just standing on a balcony or by an open window, can measurably lower stress.',
  },
];

export interface Reminder {
  body: string;
  kind: 'affirmation' | 'tip';
}

// A mix of affirmations and short, actionable, evidence-based tips so this
// doesn't read like the same quote on repeat. ~24 entries, roughly a month
// before it cycles.
export const REMINDERS: Reminder[] = [
  { kind: 'affirmation', body: 'I am doing the best I can with what I have right now.' },
  { kind: 'tip', body: "Feeling keyed up? Try exhaling longer than you inhale. It's one of the fastest ways to signal safety to your nervous system." },
  { kind: 'affirmation', body: 'My feelings are valid, and they do not define me.' },
  { kind: 'tip', body: 'Naming an emotion out loud, even quietly to yourself, can take some of its intensity down a notch.' },
  { kind: 'affirmation', body: 'I have survived every hard moment so far.' },
  { kind: 'tip', body: 'A racing mind often means your body needs movement more than your thoughts need solving. Try a two-minute walk.' },
  { kind: 'affirmation', body: 'It is okay to ask for help.' },
  { kind: 'tip', body: 'If today feels heavy, one small task done is worth more than a long list left undone. Pick just one thing.' },
  { kind: 'affirmation', body: 'I am allowed to take up space and rest.' },
  { kind: 'tip', body: 'Cold water on your face or wrists can calm a racing heart in under a minute. Worth trying if things feel urgent.' },
  { kind: 'affirmation', body: 'This moment is temporary.' },
  { kind: 'tip', body: "Overthinking loves silence and stillness. A short conversation, even with an AI, can interrupt the loop." },
  { kind: 'affirmation', body: 'I am not my anxious thoughts.' },
  { kind: 'tip', body: 'You do not need the full picture figured out today. One next step is enough.' },
  { kind: 'affirmation', body: 'I get to define what a good day looks like for me.' },
  { kind: 'tip', body: 'If you are hard on yourself right now, try the question: what would I say to a friend in this exact situation?' },
  { kind: 'affirmation', body: 'Rest is productive too.' },
  { kind: 'tip', body: 'Isolation tends to make hard feelings louder. A short message to someone you trust can be enough.' },
  { kind: 'affirmation', body: 'I am allowed to change my mind about what I can handle today.' },
  { kind: 'tip', body: 'Sleep, food, and water are not small things. If you are struggling, checking those three first is not silly, it is smart.' },
  { kind: 'affirmation', body: 'Progress is not always visible, but it still counts.' },
  { kind: 'tip', body: 'Five slow breaths, in for 4 and out for 6, can measurably lower stress hormones. It is worth the sixty seconds.' },
  { kind: 'affirmation', body: 'I deserve patience, especially from myself.' },
  { kind: 'tip', body: 'If a thought keeps circling, try writing it down. Getting it out of your head and onto a page changes how it feels.' },
];

// Kept for compatibility with older content references.
export const AFFIRMATIONS: string[] = REMINDERS.filter((r) => r.kind === 'affirmation').map((r) => r.body);

export interface Recommendation {
  title: string;
  body: string;
  route: string;
  cta: string;
}

// Suggested next steps shown after a check-in or a Companion chat, based on
// the mood someone reported. Not exhaustive, just a reasonable starting
// point pointing at tools already in the app.
export const MOOD_RECOMMENDATIONS: Record<MoodKey, Recommendation[]> = {
  anxious: [
    {
      title: 'Breathing exercise',
      body: 'A couple of minutes of slow, paced breathing can calm a racing mind and body.',
      route: '/breathing',
      cta: 'Start breathing',
    },
    {
      title: 'Grounding techniques',
      body: 'The 5-4-3-2-1 technique and other grounding tools can help pull you out of anxious thoughts and into the present.',
      route: '/(tabs)/calm',
      cta: 'See coping techniques',
    },
  ],
  overwhelmed: [
    {
      title: 'Breathing exercise',
      body: 'When everything feels like too much, a short breathing exercise can help your body settle first.',
      route: '/breathing',
      cta: 'Start breathing',
    },
    {
      title: 'Talk it through',
      body: "Sometimes saying it out loud, or typing it out, helps untangle an overwhelming day.",
      route: '/companion',
      cta: 'Talk to Companion',
    },
  ],
  sad: [
    {
      title: 'Write it down',
      body: 'Journaling can help you understand what is underneath the sadness, even if you do not share it with anyone.',
      route: '/journal/new',
      cta: 'Start a journal entry',
    },
    {
      title: 'Talk to Companion',
      body: 'You do not have to sit with this alone right now.',
      route: '/companion',
      cta: 'Talk to Companion',
    },
  ],
  restless: [
    {
      title: 'Move your body',
      body: 'A short walk, stretch, or shaking out your hands can help discharge restless energy.',
      route: '/(tabs)/calm',
      cta: 'See coping techniques',
    },
    {
      title: 'Breathing exercise',
      body: 'Slowing your breath can help take the edge off restlessness.',
      route: '/breathing',
      cta: 'Start breathing',
    },
  ],
  numb: [
    {
      title: 'Gentle grounding',
      body: 'Noticing small physical sensations, like your feet on the floor, can help you reconnect when everything feels far away.',
      route: '/(tabs)/calm',
      cta: 'See coping techniques',
    },
    {
      title: 'Talk to Companion',
      body: 'No pressure to explain anything. Sometimes just having something to respond to helps.',
      route: '/companion',
      cta: 'Talk to Companion',
    },
  ],
  angry: [
    {
      title: 'Cold water reset',
      body: 'Splashing cold water on your face can take the physical edge off intense anger fast.',
      route: '/(tabs)/calm',
      cta: 'See coping techniques',
    },
    {
      title: 'Breathing exercise',
      body: 'A slower exhale can help bring your body out of fight-or-flight mode.',
      route: '/breathing',
      cta: 'Start breathing',
    },
  ],
  okay: [
    {
      title: 'Keep the momentum',
      body: 'A quick journal entry can help you remember what is working today, for the days that are harder.',
      route: '/journal/new',
      cta: 'Write a journal entry',
    },
  ],
  good: [
    {
      title: 'Note what is working',
      body: 'Writing down what helped today makes it easier to find your way back on tougher days.',
      route: '/journal/new',
      cta: 'Write a journal entry',
    },
  ],
};

export const HIGH_INTENSITY_THRESHOLD = 8;

export const HIGH_INTENSITY_RECOMMENDATION: Recommendation = {
  title: "You don't have to handle this alone",
  body: 'That sounds really intense. Real people are available right now if you want to talk to someone beyond this app.',
  route: '/(tabs)/resources',
  cta: 'See crisis resources',
};

// General next steps shown at the end of a Companion conversation, when
// there is no specific mood/intensity context to tailor around.
export const GENERAL_RECOMMENDATIONS: Recommendation[] = [
  {
    title: 'Breathing exercise',
    body: 'A couple of minutes of slow breathing can help settle your body after a hard conversation.',
    route: '/breathing',
    cta: 'Start breathing',
  },
  {
    title: 'Write it down',
    body: 'Journaling can help you hold onto anything useful that came up while chatting.',
    route: '/journal/new',
    cta: 'Start a journal entry',
  },
  {
    title: 'More ways to cope',
    body: 'Grounding techniques, movement, and other tools that might help right now.',
    route: '/(tabs)/calm',
    cta: 'See coping techniques',
  },
];

export interface ProfessionalResource {
  name: string;
  description: string;
  contact: string;
}

// Real-world options for when self-help tools in this app are not enough.
// Not an endorsement of any specific paid service, just realistic starting
// points people actually use to find support.
export const PROFESSIONAL_RESOURCES: ProfessionalResource[] = [
  {
    name: 'Psychology Today therapist directory',
    description: 'Search for local therapists by location, specialty, and insurance accepted.',
    contact: 'psychologytoday.com/us/therapists',
  },
  {
    name: 'Open Path Collective',
    description: 'Low-cost therapy sessions (roughly $30 to $80) for people without insurance coverage.',
    contact: 'openpathcollective.org',
  },
  {
    name: 'SAMHSA treatment locator',
    description: 'Free, confidential referrals to local mental health and substance use treatment (US).',
    contact: 'findtreatment.samhsa.gov',
  },
  {
    name: 'NAMI HelpLine',
    description: 'Information, resource referrals, and support from the National Alliance on Mental Illness.',
    contact: 'Call or text 1-800-950-6264',
  },
  {
    name: 'Warmlines',
    description: 'Peer support phone lines for when you need to talk but it is not an emergency.',
    contact: 'warmline.org',
  },
  {
    name: 'Your employer or school',
    description: 'Many workplaces and schools offer a free Employee or Student Assistance Program with a few covered counseling sessions.',
    contact: 'Check with HR or student services',
  },
];

export const WHEN_TO_SEEK_HELP: string[] = [
  "It's lasted more than two weeks and isn't improving on its own.",
  "It's getting in the way of work, school, or basic day-to-day tasks.",
  "You're pulling away from people you'd normally want to talk to.",
  "You've been leaning on alcohol or other substances to get through the day.",
  "Your sleep, appetite, or energy have changed and there's no clear reason why.",
  'You have thoughts of harming yourself. If this is happening, please see the crisis resources above.',
];
