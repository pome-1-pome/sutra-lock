import type { ChantSession } from "@/types";

type Props = {
  sessions: ChantSession[];
};

export default function HistoryList({ sessions }: Props) {
  if (sessions.length === 0) {
    return <p className="text-center text-sm text-zinc-400 py-8">履歴はまだありません</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {sessions.map((s, i) => {
        const date = new Date(s.timestamp);
        const timeStr = `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
        return (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl bg-zinc-50 px-4 py-3"
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                s.success ? "bg-green-500" : "bg-red-400"
              }`}
            >
              {s.success ? "OK" : "NG"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{s.recognizedText || "(空)"}</p>
              <p className="text-xs text-zinc-400">{timeStr}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
