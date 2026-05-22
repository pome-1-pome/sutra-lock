import type { AppSettings, ChantSession, UnlockState } from "@/types";

const KEYS = {
  settings: "sutra-lock-settings",
  history: "sutra-lock-history",
  unlock: "sutra-lock-unlock",
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  pledgeText: "私はスマホに支配されず、自分の意思で行動します。",
  requiredKeywords: ["スマホ", "意思", "行動"],
  unlockDurationMinutes: 15,
};

// ---------------------------------------------------------------------------
// Generic helpers
// ---------------------------------------------------------------------------

function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function setItem(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export function getSettings(): AppSettings {
  return getItem<AppSettings>(KEYS.settings) ?? DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings): void {
  setItem(KEYS.settings, settings);
}

// ---------------------------------------------------------------------------
// Chant history
// ---------------------------------------------------------------------------

export function getHistory(): ChantSession[] {
  return getItem<ChantSession[]>(KEYS.history) ?? [];
}

export function addHistory(session: ChantSession): void {
  const history = getHistory();
  history.push(session);
  setItem(KEYS.history, history);
}

// ---------------------------------------------------------------------------
// Unlock state
// ---------------------------------------------------------------------------

export function getUnlockState(): UnlockState {
  return getItem<UnlockState>(KEYS.unlock) ?? { unlockUntil: null };
}

export function saveUnlockState(state: UnlockState): void {
  setItem(KEYS.unlock, state);
}

/**
 * Returns true if the unlock timer is still active (i.e. not yet expired).
 */
export function isUnlocked(): boolean {
  const { unlockUntil } = getUnlockState();
  if (unlockUntil === null) return false;
  return Date.now() < unlockUntil;
}
