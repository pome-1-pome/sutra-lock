"use client";

import { useEffect, useState } from "react";

type Props = {
  unlockUntil: number;
  onExpire: () => void;
};

function formatRemaining(ms: number): string {
  if (ms <= 0) return "00:00";
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function UnlockTimer({ unlockUntil, onExpire }: Props) {
  const [remaining, setRemaining] = useState(() => unlockUntil - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const diff = unlockUntil - Date.now();
      setRemaining(diff);
      if (diff <= 0) {
        clearInterval(id);
        onExpire();
      }
    }, 500);
    return () => clearInterval(id);
  }, [unlockUntil, onExpire]);

  const pct = Math.max(0, remaining) / (unlockUntil - (unlockUntil - 15 * 60 * 1000));
  const clampedPct = Math.min(1, Math.max(0, pct));

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center w-48 h-48">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="44"
            fill="none" stroke="#e5e7eb" strokeWidth="8"
          />
          <circle
            cx="50" cy="50" r="44"
            fill="none" stroke="#22c55e" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${clampedPct * 276.46} 276.46`}
          />
        </svg>
        <span className="text-4xl font-mono font-bold tabular-nums">
          {formatRemaining(remaining)}
        </span>
      </div>
      <p className="text-sm text-zinc-500">ロック解除中</p>
    </div>
  );
}
