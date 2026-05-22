"use client";

import { useEffect, useState } from "react";
import { getHistory } from "@/lib/storage";
import HistoryList from "@/components/HistoryList";
import type { ChantSession } from "@/types";

export default function HistoryPage() {
  const [sessions, setSessions] = useState<ChantSession[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSessions(getHistory().reverse());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-1 flex-col px-4 py-6">
      <h1 className="text-lg font-bold text-center">履歴</h1>
      <div className="mt-4">
        <HistoryList sessions={sessions} />
      </div>
    </div>
  );
}
