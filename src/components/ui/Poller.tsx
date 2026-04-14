"use client";

import { usePolling } from "@/lib/use-polling";

// Drop this component into any page to enable auto-refresh.
// Default: 30 seconds.
export function Poller({ interval = 30000 }: { interval?: number }) {
  usePolling(interval);
  return null;
}

export default Poller;
