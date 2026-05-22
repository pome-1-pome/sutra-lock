"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getDailyRecord, incrementDailyCount } from "@/lib/storage";

const CHANT_SECONDS = 15;

type Phase = "idle" | "chanting" | "done";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function Home() {
  const hydrated = useHydrated();
  const [phase, setPhase] = useState<Phase>("idle");
  const [remaining, setRemaining] = useState(CHANT_SECONDS);
  const [dailyCount, setDailyCount] = useState(() =>
    typeof window !== "undefined" ? getDailyRecord().count : 0,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = useCallback(() => {
    setPhase("chanting");
    setRemaining(CHANT_SECONDS);

    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleComplete = useCallback(() => {
    const record = incrementDailyCount();
    setDailyCount(record.count);
    setPhase("done");
  }, []);

  const handleAgain = useCallback(() => {
    setPhase("idle");
    setRemaining(CHANT_SECONDS);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8">
      <h1 className="text-2xl font-bold">Sutra Lock</h1>
      <p className="mt-1 text-sm text-zinc-500">使用前の儀式</p>

      {/* ---- Idle: sutra card + start button ---- */}
      {phase === "idle" && (
        <div className="mt-8 flex w-full flex-col items-center gap-6">
          <div className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-6 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400">般若心経ミニ版</p>
            <p className="mt-3 text-xl font-bold leading-relaxed">
              観自在菩薩 行深般若波羅蜜多時
            </p>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              かんじーざいぼーさつ ぎょうじん はんにゃーはーらーみったーじ
            </p>
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              ものごとを深く観察し、執着から離れるための短い儀式
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full rounded-full bg-zinc-900 py-4 text-sm font-semibold text-white active:bg-zinc-700"
          >
            唱える開始
          </button>

          {dailyCount > 0 && (
            <p className="text-xs text-zinc-400">
              今日の使用前儀式: {dailyCount}回
            </p>
          )}
        </div>
      )}

      {/* ---- Chanting: countdown ---- */}
      {phase === "chanting" && (
        <div className="mt-8 flex w-full flex-col items-center gap-6">
          <div className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-6 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400">般若心経ミニ版</p>
            <p className="mt-3 text-xl font-bold leading-relaxed">
              観自在菩薩 行深般若波羅蜜多時
            </p>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              かんじーざいぼーさつ ぎょうじん はんにゃーはーらーみったーじ
            </p>
          </div>

          <p className="text-sm text-zinc-600">
            声に出す、または心の中で唱えてください
          </p>

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100">
            <span className="text-3xl font-mono font-bold tabular-nums">
              {remaining}
            </span>
          </div>

          <button
            onClick={handleComplete}
            disabled={remaining > 0}
            className="w-full rounded-full py-4 text-sm font-semibold text-white disabled:bg-zinc-300 disabled:text-zinc-500 bg-zinc-900 active:bg-zinc-700"
          >
            {remaining > 0
              ? `あと ${remaining} 秒お待ちください`
              : "唱え終わった"}
          </button>
        </div>
      )}

      {/* ---- Done: completion screen ---- */}
      {phase === "done" && (
        <div className="mt-8 flex w-full flex-col items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl">🙏</span>
          </div>

          <p className="text-lg font-bold">解放されました</p>

          <p className="text-sm text-zinc-500">
            今日の使用前儀式: {dailyCount}回
          </p>

          <button
            onClick={handleAgain}
            className="w-full rounded-full bg-zinc-900 py-4 text-sm font-semibold text-white active:bg-zinc-700"
          >
            もう一度唱える
          </button>
        </div>
      )}
    </div>
  );
}
