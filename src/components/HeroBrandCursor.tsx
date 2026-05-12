"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const SLUGS = [
  "facebook",
  "instagram",
  "youtube",
  "telegram",
  "tiktok",
  "linkedin",
  "x",
  "vk",
  "googleads",
  "pinterest",
  "snapchat",
  "whatsapp",
  "reddit"
] as const;

const CDN = (slug: string) => `https://cdn.simpleicons.org/${slug}/00bfff`;

const MIN_INTERVAL_MS = 95;
const MIN_DIST_PX = 52;
const MAX_MARKERS = 10;
const LIFETIME_MS = 2200;

type Marker = { id: number; x: number; y: number; slug: string };

type HeroBrandCursorProps = {
  className?: string;
};

/** Иконки брендов появляются у траектории курсора (не canvas-частицы). */
export function HeroBrandCursor({ className }: HeroBrandCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const idRef = useRef(0);
  const lastTRef = useRef(0);
  const lastXYRef = useRef<{ x: number; y: number } | null>(null);
  const slugIdxRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const pushMarker = useCallback((x: number, y: number) => {
    const slug = SLUGS[slugIdxRef.current % SLUGS.length]!;
    slugIdxRef.current++;
    idRef.current += 1;
    const id = idRef.current;
    const entry: Marker = { id, x, y, slug };

    setMarkers((prev) => [...prev, entry].slice(-MAX_MARKERS));

    window.setTimeout(() => {
      setMarkers((prev) => prev.filter((m) => m.id !== id));
    }, LIFETIME_MS);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const onPointerMove = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;

      const now = performance.now();
      if (now - lastTRef.current < MIN_INTERVAL_MS) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const prev = lastXYRef.current;
      if (prev) {
        const d = Math.hypot(x - prev.x, y - prev.y);
        if (d < MIN_DIST_PX) return;
      }

      lastTRef.current = now;
      lastXYRef.current = { x, y };
      pushMarker(x, y);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [pushMarker, reduceMotion]);

  return (
    <div
      ref={rootRef}
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden
    >
      <AnimatePresence mode="popLayout">
        {markers.map((m) => (
          <motion.div
            key={m.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ left: m.x, top: m.y }}
            initial={{ opacity: 0, scale: 0.45 }}
            animate={{ opacity: [0, 1, 0.92, 0], scale: [0.45, 1.05, 1, 0.92] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: LIFETIME_MS / 1000,
              times: [0, 0.12, 0.55, 1],
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CDN(m.slug)}
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 drop-shadow-[0_0_16px_rgba(0,191,255,0.45)] sm:h-10 sm:w-10"
              draggable={false}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 opacity-40">
          {SLUGS.slice(0, 6).map((slug, i) => (
            <div
              key={slug}
              className="absolute opacity-50"
              style={{
                top: `${12 + (i % 3) * 26}%`,
                left: `${8 + Math.floor(i / 3) * 42}%`
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CDN(slug)} alt="" width={36} height={36} className="h-8 w-8" draggable={false} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
