import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckIn, CompanionMessage, JournalEntry } from './types';

const CHECKINS_KEY = 'nightbloom:checkins';
const JOURNAL_KEY = 'nightbloom:journal';
const COMPANION_KEY = 'nightbloom:companion';

function makeId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

async function readList<T>(key: string): Promise<T[]> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeList<T>(key: string, list: T[]): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(list));
}

export async function getCheckIns(): Promise<CheckIn[]> {
  const list = await readList<CheckIn>(CHECKINS_KEY);
  return list.sort((a, b) => b.createdAt - a.createdAt);
}

export async function addCheckIn(entry: Omit<CheckIn, 'id' | 'createdAt'>): Promise<CheckIn> {
  const list = await readList<CheckIn>(CHECKINS_KEY);
  const newEntry: CheckIn = { ...entry, id: makeId(), createdAt: Date.now() };
  list.push(newEntry);
  await writeList(CHECKINS_KEY, list);
  return newEntry;
}

export async function deleteCheckIn(id: string): Promise<void> {
  const list = await readList<CheckIn>(CHECKINS_KEY);
  await writeList(CHECKINS_KEY, list.filter((c) => c.id !== id));
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const list = await readList<JournalEntry>(JOURNAL_KEY);
  return list.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getJournalEntry(id: string): Promise<JournalEntry | undefined> {
  const list = await readList<JournalEntry>(JOURNAL_KEY);
  return list.find((j) => j.id === id);
}

export async function addJournalEntry(
  entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>
): Promise<JournalEntry> {
  const list = await readList<JournalEntry>(JOURNAL_KEY);
  const now = Date.now();
  const newEntry: JournalEntry = { ...entry, id: makeId(), createdAt: now, updatedAt: now };
  list.push(newEntry);
  await writeList(JOURNAL_KEY, list);
  return newEntry;
}

export async function updateJournalEntry(
  id: string,
  updates: Partial<Pick<JournalEntry, 'title' | 'body'>>
): Promise<void> {
  const list = await readList<JournalEntry>(JOURNAL_KEY);
  const idx = list.findIndex((j) => j.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], ...updates, updatedAt: Date.now() };
  await writeList(JOURNAL_KEY, list);
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const list = await readList<JournalEntry>(JOURNAL_KEY);
  await writeList(JOURNAL_KEY, list.filter((j) => j.id !== id));
}

export async function getCompanionMessages(): Promise<CompanionMessage[]> {
  const list = await readList<CompanionMessage>(COMPANION_KEY);
  return list.sort((a, b) => a.createdAt - b.createdAt);
}

export async function addCompanionMessage(
  message: Omit<CompanionMessage, 'id' | 'createdAt'>
): Promise<CompanionMessage> {
  const list = await readList<CompanionMessage>(COMPANION_KEY);
  const newMessage: CompanionMessage = { ...message, id: makeId(), createdAt: Date.now() };
  list.push(newMessage);
  await writeList(COMPANION_KEY, list);
  return newMessage;
}

export async function clearCompanionMessages(): Promise<void> {
  await writeList<CompanionMessage>(COMPANION_KEY, []);
}
