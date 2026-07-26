export type MoodKey =
  | 'anxious'
  | 'overwhelmed'
  | 'sad'
  | 'restless'
  | 'numb'
  | 'angry'
  | 'okay'
  | 'good';

export type TriggerKey =
  | 'work'
  | 'relationships'
  | 'health'
  | 'sleep'
  | 'finances'
  | 'social'
  | 'family'
  | 'future'
  | 'unknown'
  | 'other';

export interface CheckIn {
  id: string;
  createdAt: number;
  mood: MoodKey;
  intensity: number; // 1-10
  triggers: TriggerKey[];
  note: string;
}

export interface JournalEntry {
  id: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  body: string;
  prompt?: string;
}

export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}
