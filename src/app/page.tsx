"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getDailyRecord, incrementDailyCount, resetDailyCount } from "@/lib/storage";

const READING_SECONDS = 15;

type Phase = "idle" | "reading" | "done";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;
function useHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ------------------------------------------------------------------ */
/* Sutra data                                                         */
/* ------------------------------------------------------------------ */

const SUTRA_LINES = [
  { text: "観自在菩薩 行深般若波羅蜜多時", kana: "かんじーざいぼーさつ ぎょうじん はんにゃーはーらーみったーじ" },
  { text: "照見五蘊皆空 度一切苦厄", kana: "しょうけん ごうんかいくう どいっさいくやく" },
  { text: "舎利子 色不異空 空不異色", kana: "しゃーりーしー しきふいくう くうふいしき" },
  { text: "色即是空 空即是色", kana: "しきそくぜくう くうそくぜしき" },
  { text: "受想行識 亦復如是", kana: "じゅそうぎょうしき やくぶにょぜ" },
  { text: "舎利子 是諸法空相", kana: "しゃーりーしー ぜしょほうくうそう" },
  { text: "不生不滅 不垢不浄 不増不減", kana: "ふしょうふめつ ふくふじょう ふぞうふげん" },
];

const SUTRA_MEANING =
  "ものごとは固定されたものではなく、執着を手放すことで苦しみから距離を取れる、という考え方を短く読む時間です。";

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const hydrated = useHydrated();
  const [phase, setPhase] = useState<Phase>("idle");
  const [remaining, setRemaining] = useState(READING_SECONDS);
  const [dailyCount, setDailyCount] = useState(() =>
    typeof window !== "undefined" ? getDailyRecord().count : 0,
  );
  const [showMeaning, setShowMeaning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = useCallback(() => {
    setPhase("reading");
    setRemaining(READING_SECONDS);

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
    setRemaining(READING_SECONDS);
    setShowMeaning(false);
  }, []);

  const handleReset = useCallback(() => {
    const record = resetDailyCount();
    setDailyCount(record.count);
  }, []);

  if (!hydrated) return null;

  /* ---- Timer ring progress ---- */
  const progress = phase === "reading" ? remaining / READING_SECONDS : 0;
  const circumference = 2 * Math.PI * 54;
  const strokeOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-10 sm:px-8">

      {/* ---- Hero ---- */}
      <header className="flex flex-col items-center gap-1">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sutra Lock
        </h1>
        <p className="text-base text-[#8a8278]">読むことで、開く。</p>
      </header>

      {/* ---- Status chips ---- */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="chip rounded-full px-3 py-1 text-xs text-[#6b6560]">
          今日 {dailyCount}回
        </span>
        <span className="chip rounded-full px-3 py-1 text-xs text-[#6b6560]">
          {READING_SECONDS}秒
        </span>
      </div>

      {/* ================================================================ */}
      {/* Idle                                                             */}
      {/* ================================================================ */}
      {phase === "idle" && (
        <div className="mt-8 flex w-full flex-col items-center gap-8">
          {/* Sutra card */}
          <div className="sutra-card w-full rounded-3xl px-6 py-7 sm:px-8 sm:py-8">
            <p className="text-sm font-semibold text-[#8a8278] tracking-wide">
              般若心経
            </p>
            <p className="mt-0.5 text-xs text-[#b0a99f]">
              摩訶般若波羅蜜多心経
            </p>

            <div className="mt-5 space-y-3">
              {SUTRA_LINES.map((line, i) => (
                <div key={i}>
                  <p className="font-serif text-lg leading-relaxed tracking-widest sm:text-xl">
                    {line.text}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#a09890]">
                    {line.kana}
                  </p>
                </div>
              ))}
            </div>

            {/* Meaning toggle */}
            <div className="mt-6 border-t border-[#e8e2db] pt-4">
              <button
                onClick={() => setShowMeaning((v) => !v)}
                className="text-xs font-medium text-[#8a8278] hover:text-[#6b6560]"
              >
                {showMeaning ? "意味を閉じる" : "意味を見る"}
              </button>
              {showMeaning && (
                <p className="mt-2 text-sm leading-relaxed text-[#8a8278]">
                  {SUTRA_MEANING}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="btn-primary w-full rounded-2xl py-4 text-base font-semibold text-white"
          >
            読み始める
          </button>
        </div>
      )}

      {/* ================================================================ */}
      {/* Reading (countdown)                                              */}
      {/* ================================================================ */}
      {phase === "reading" && (
        <div className="mt-8 flex w-full flex-col items-center gap-8">
          {/* Sutra card (compact during reading) */}
          <div className="sutra-card w-full rounded-3xl px-6 py-7 sm:px-8 sm:py-8">
            <p className="text-sm font-semibold text-[#8a8278] tracking-wide">
              般若心経
            </p>
            <div className="mt-4 space-y-3">
              {SUTRA_LINES.map((line, i) => (
                <div key={i}>
                  <p className="font-serif text-lg leading-relaxed tracking-widest sm:text-xl">
                    {line.text}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#a09890]">
                    {line.kana}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#8a8278]">
            声に出す、または心の中で読んでください
          </p>

          {/* Timer ring */}
          <div className="timer-ring relative flex h-28 w-28 items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60" cy="60" r="54"
                fill="none" stroke="#e8e2db" strokeWidth="6"
              />
              <circle
                cx="60" cy="60" r="54"
                fill="none" stroke="#7c9a72" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
            </svg>
            <span className="text-3xl font-mono font-bold tabular-nums text-[#4a4540]">
              {remaining}
            </span>
          </div>

          <button
            onClick={handleComplete}
            disabled={remaining > 0}
            className="btn-primary w-full rounded-2xl py-4 text-base font-semibold text-white"
          >
            {remaining > 0
              ? `あと ${remaining} 秒お待ちください`
              : "読了する"}
          </button>
        </div>
      )}

      {/* ================================================================ */}
      {/* Done                                                             */}
      {/* ================================================================ */}
      {phase === "done" && (
        <div className="mt-12 flex w-full flex-col items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e9f0e6]">
            <svg className="h-10 w-10 text-[#7c9a72]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight">開いてよい</p>
            <p className="mt-1 text-sm text-[#8a8278]">一度立ち止まりました。</p>
          </div>

          <div className="chip rounded-2xl px-6 py-3 text-center">
            <p className="text-2xl font-bold tabular-nums">{dailyCount}</p>
            <p className="text-xs text-[#8a8278]">今日の読誦回数</p>
          </div>

          <button
            onClick={handleAgain}
            className="btn-primary w-full rounded-2xl py-4 text-base font-semibold text-white"
          >
            もう一度読む
          </button>

          <button
            onClick={handleReset}
            className="text-xs text-[#b0a99f] hover:text-[#8a8278]"
          >
            記録をリセット
          </button>
        </div>
      )}

      {/* ---- Footer ---- */}
      <footer className="mt-auto pt-12 pb-4">
        <p className="text-center text-[10px] text-[#c8c3bc]">
          スマホを開く前に、一度だけ立ち止まるための読誦タイマー。
        </p>
      </footer>
    </div>
  );
}
