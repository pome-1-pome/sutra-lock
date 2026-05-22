/** Daily ritual completion record */
export type DailyRecord = {
  /** Date string in YYYY-MM-DD format */
  date: string;
  /** Number of completed rituals today */
  count: number;
};
