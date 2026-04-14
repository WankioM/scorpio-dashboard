"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export function SyncProjectsButton() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/config/sync-projects`, {
        method: "POST",
      });
      const data = await res.json();
      setResult(`Synced ${data.count} projects`);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setResult("Sync failed");
      console.error("Project sync failed:", err);
    } finally {
      setSyncing(false);
    }
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleSync}
        disabled={syncing}
      >
        {syncing ? "Syncing..." : "Sync Projects"}
      </Button>
      {result && (
        <span className="text-xs text-text-secondary font-body">{result}</span>
      )}
    </div>
  );
}

export default SyncProjectsButton;
