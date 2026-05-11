"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;

export function ScrollDepthAnalytics() {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / h) * 100));
      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          track("scroll_depth", { percent: m });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
