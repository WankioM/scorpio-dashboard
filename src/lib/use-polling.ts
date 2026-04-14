"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Refreshes the current page data at a given interval (in ms).
// Works with Next.js server components by calling router.refresh().
export function usePolling(intervalMs: number = 30000) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      router.refresh();
    }, intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);
}
