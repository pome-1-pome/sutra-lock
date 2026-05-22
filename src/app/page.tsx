"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getHistory, getUnlockState, isUnlocked, saveUnlockState } from "@/lib/storage";
import UnlockTimer from "@/components/UnlockTimer";
import StatCard from "@/components/StatCard";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [unlockUntil, setUnlockUntil] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setUnlocked(isUnlocked());
    const state = getUnlockState();
    setUnlockUntil(state.unlockUntil);
    const history = getHistory();
    setTotalCount(history.length);
    setSuccessCount(history.filter((h) => h.success).length);
  }, []);

  useEffect(() => {
    refresh();
    setMounted(true);
  }, [refresh]);

  const handleExpire = useCallback(() => {
    saveUnlockState({ unlockUntil: null });
    refresh();
  }, [refresh]);

  if (!mounted) return null;

  return (
    <div className="flex flex-1 flex-col px-4 py-6">
      <h1 className="text-2xl font-bold text-center">Sutra Lock</h1>
      <p className="text-center text-sm text-zinc-500 mt-1">スマホ依存対策</p>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-8">
        {unlocked && unlockUntil ? (
          <UnlockTimer unlockUntil={unlockUntil} onExpire={handleExpire} />
        ) : (
          <>
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
              <span className="text-3xl">🔒</span>
            </div>
            <p className="text-sm text-zinc-600 text-center">
              誓約文を音読してロックを解除してください
            </p>
            <Link
              href="/chant"
              className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white active:bg-zinc-700"
            >
              音読を開始する
            </Link>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="総チャレンジ" value={totalCount} />
        <StatCard label="成功回数" value={successCount} />
      </div>
    </div>
  );
}
