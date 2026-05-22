"use client";

import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "@/lib/storage";

export default function SettingsPage() {
  const [pledgeText, setPledgeText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [duration, setDuration] = useState(15);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const s = getSettings();
    setPledgeText(s.pledgeText);
    setKeywords(s.requiredKeywords.join(", "));
    setDuration(s.unlockDurationMinutes);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSave = () => {
    const requiredKeywords = keywords
      .split(/[,、]/)
      .map((k) => k.trim())
      .filter(Boolean);

    saveSettings({
      pledgeText,
      requiredKeywords,
      unlockDurationMinutes: duration,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-1 flex-col px-4 py-6">
      <h1 className="text-lg font-bold text-center">設定</h1>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-600">誓約文</label>
          <textarea
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-500 focus:outline-none"
            rows={3}
            value={pledgeText}
            onChange={(e) => setPledgeText(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-600">
            必須キーワード（カンマ区切り）
          </label>
          <input
            type="text"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-500 focus:outline-none"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="スマホ, 意思, 行動"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-600">
            解除時間（分）
          </label>
          <input
            type="number"
            min={1}
            max={120}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-500 focus:outline-none"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <button
          onClick={handleSave}
          className="rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white active:bg-zinc-700"
        >
          {saved ? "保存しました" : "保存"}
        </button>
      </div>
    </div>
  );
}
