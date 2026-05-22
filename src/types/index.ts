/** A single chant (音読) attempt record */
export type ChantSession = {
  /** ISO 8601 timestamp of when the attempt occurred */
  timestamp: string;
  /** The text recognized by speech API */
  recognizedText: string;
  /** Whether the attempt was judged as successful */
  success: boolean;
};

/** User-configurable app settings */
export type AppSettings = {
  /** The pledge text displayed on screen */
  pledgeText: string;
  /** Keywords that must appear in recognized speech to pass */
  requiredKeywords: string[];
  /** Unlock duration in minutes after a successful chant */
  unlockDurationMinutes: number;
};

/** Current unlock state persisted across reloads */
export type UnlockState = {
  /** Unix timestamp (ms) when the unlock expires, or null if locked */
  unlockUntil: number | null;
};
