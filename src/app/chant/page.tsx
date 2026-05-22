"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSettings, addHistory, saveUnlockState } from "@/lib/storage";
import { matchKeywords, type MatchResult } from "@/lib/matcher";
import type { AppSettings } from "@/types";

export default function ChantPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  if (!settings) return null;

  const handleSubmit = () => {
    const res = matchKeywords(input, settings.requiredKeywords);
    setResult(res);
    setSubmitted(true);

    addHistory({
      timestamp: new Date().toISOString(),
      recognizedText: input,
      success: res.pass,
    });

    if (res.pass) {
      const unlockUntil = Date.now() + settings.unlockDurationMinutes * 60 * 1000;
      saveUnlockState({ unlockUntil });
    }
  };

  const handleRetry = () => {
    setInput("");
    setResult(null);
    setSubmitted(false);
  };

  return (
    <div className="flex flex-1 flex-col px-4 py-6">
      <h1 className="text-lg font-bold text-center">誓約文を読み上げてください</h1>

      <div className="mt-6 rounded-xl bg-zinc-100 px-5 py-4">
        <p className="text-base leading-relaxed">{settings.pledgeText}</p>
      </div>

      <p className="mt-2 text-xs text-zinc-400">
        必須キーワード: {settings.requiredKeywords.join(", ")}
      </p>

      {!submitted ? (
        <div className="mt-6 flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-600">
            認識結果（手入力）
          </label>
          <textarea
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-500 focus:outline-none"
            rows={3}
            placeholder="ここにテキストを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={input.trim().length === 0}
            className="rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white disabled:opacity-40 active:bg-zinc-700"
          >
            判定する
          </button>
        </div>
      ) : result ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          {result.pass ? (
            <>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <span className="text-2xl">🔓</span>
              </div>
              <p className="text-sm font-semibold text-green-700">
                成功！ {settings.unlockDurationMinutes}分間ロック解除します
              </p>
              <button
                onClick={() => router.push("/")}
                className="rounded-full bg-green-600 px-8 py-3 text-sm font-semibold text-white active:bg-green-700"
              >
                ホームに戻る
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <span className="text-2xl">❌</span>
              </div>
              <p className="text-sm font-semibold text-red-600">
                キーワードが不足しています
              </p>
              <div className="w-full rounded-xl bg-red-50 px-4 py-3">
                <p className="text-xs text-zinc-500 mb-1">不足キーワード:</p>
                <div className="flex flex-wrap gap-2">
                  {result.missing.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-red-200 px-3 py-1 text-xs font-medium text-red-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleRetry}
                className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white active:bg-zinc-700"
              >
                もう一度
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
