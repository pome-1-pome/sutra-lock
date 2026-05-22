/**
 * Normalize text for comparison: collapse whitespace, remove common
 * punctuation/symbols so that minor speech-recognition artifacts don't
 * cause false negatives.
 */
function normalize(text: string): string {
  return text
    .replace(/[\s\u3000]+/g, "") // strip all whitespace (incl. full-width)
    .replace(/[、。,.!?！？・「」『』（）()]/g, "") // strip punctuation
    .toLowerCase();
}

export type MatchResult = {
  /** Whether all required keywords were found */
  pass: boolean;
  /** Keywords that were found in the recognized text */
  matched: string[];
  /** Keywords that were NOT found */
  missing: string[];
};

/**
 * Check whether `recognizedText` contains every keyword in
 * `requiredKeywords`. Comparison is done after normalizing both sides.
 */
export function matchKeywords(
  recognizedText: string,
  requiredKeywords: readonly string[],
): MatchResult {
  const normalizedInput = normalize(recognizedText);

  const matched: string[] = [];
  const missing: string[] = [];

  for (const keyword of requiredKeywords) {
    if (normalizedInput.includes(normalize(keyword))) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  }

  return {
    pass: missing.length === 0,
    matched,
    missing,
  };
}
