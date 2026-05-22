import type { DailyRecord } from "@/types";

const KEY = "sutra-lock-daily";

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getDailyRecord(): DailyRecord {
  if (typeof window === "undefined") return { date: getToday(), count: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { date: getToday(), count: 0 };
    const record = JSON.parse(raw) as DailyRecord;
    // Reset count if the date has changed
    if (record.date !== getToday()) {
      return { date: getToday(), count: 0 };
    }
    return record;
  } catch {
    return { date: getToday(), count: 0 };
  }
}

export function incrementDailyCount(): DailyRecord {
  const record = getDailyRecord();
  record.count += 1;
  localStorage.setItem(KEY, JSON.stringify(record));
  return record;
}
