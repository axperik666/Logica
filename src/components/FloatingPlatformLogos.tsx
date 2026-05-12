"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const MANIFEST_URL = "/logos/manifest.json";

const MIN_INTERVAL_MS = 28;
const MIN_INTERVAL_TOUCH_MS = 22;
const MIN_MOVE_PX = 3;
const MIN_MOVE_TOUCH_PX = 2;
const MAX_MARKERS = 14;
const IDLE_HIDE_MS = 850;

type Pop = { id: number; x: number; y: number; src: string };

type FloatingPlatformLogosProps = {
  className?: string;
};

function pathForLogo(filename: string): string {
  return `/logos/${encodeURIComponent(filename)}`;
}

export default function FloatingPlatformLogos({ className }: FloatingPlatformLogosProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [pops, setPops] = useState<Pop[]>([]);
  const idSeq = useRef(0);
  const logoTurn = useRef(0);
  const lastSpawnT = useRef(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);
  const idleHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();
  const touchRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((data: unknown) => {
        if (cancelled || !Array.isArray(data)) return;
        const names = data.filter((x): x is string => typeof x === "string" && x.endsWith(".png"));
        setSources(names.length ? names : []);
      })
      .catch(() => {
        /* без manifest — пусто */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => {
      touchRef.current = mq.matches || window.matchMedia("(max-width: 767px)").matches;
    };
    sync();
    mq.addEventListener("change", sync);
    window.matchMedia("(max-width: 767px)").addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.matchMedia("(max-width: 767px)").removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const clearAllMarkers = () => {
      setPops([]);
      lastSpawnPos.current = null;
    };

    const scheduleHideWhenIdle = () => {
      if (idleHideTimer.current) clearTimeout(idleHideTimer.current);
      idleHideTimer.current = setTimeout(() => {
        clearAllMarkers();
        idleHideTimer.current = null;
      }, IDLE_HIDE_MS);
    };

    const addPop = (x: number, y: number) => {
      if (!sources.length) return;
      const file = sources[logoTurn.current % sources.length]!;
      logoTurn.current += 1;
      idSeq.current += 1;
      const id = idSeq.current;
      const src = pathForLogo(file);
      setPops((list) => [...list, { id, x, y, src }].slice(-MAX_MARKERS));
    };

    const trySpawn = (clientX: number, clientY: number, force: boolean) => {
      if (!sources.length) return;

      const rect = hero.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) return;

      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
      if (!inside) return;

      scheduleHideWhenIdle();

      const touch = touchRef.current;
      const interval = touch ? MIN_INTERVAL_TOUCH_MS : MIN_INTERVAL_MS;
      const minMove = touch ? MIN_MOVE_TOUCH_PX : MIN_MOVE_PX;

      const now = performance.now();
      if (!force && now - lastSpawnT.current < interval) return;

      const jitter = touch ? 16 : 10;
      const x = clientX - rect.left + (Math.random() - 0.5) * jitter;
      const y = clientY - rect.top + (Math.random() - 0.5) * jitter;

      const prev = lastSpawnPos.current;
      if (!force && prev) {
        const d = Math.hypot(x - prev.x, y - prev.y);
        if (d < minMove) return;
      }

      lastSpawnT.current = now;
      lastSpawnPos.current = { x, y };
      addPop(x, y);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        if (idleHideTimer.current) {
          clearTimeout(idleHideTimer.current);
          idleHideTimer.current = null;
        }
        clearAllMarkers();
        return;
      }

      trySpawn(e.clientX, e.clientY, false);
    };

    const onEnterHero = (e: PointerEvent) => {
      trySpawn(e.clientX, e.clientY, true);
    };

    const onLeaveHero = () => {
      if (idleHideTimer.current) {
        clearTimeout(idleHideTimer.current);
        idleHideTimer.current = null;
      }
      clearAllMarkers();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerenter", onEnterHero, { passive: true });
    hero.addEventListener("pointerleave", onLeaveHero, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerenter", onEnterHero);
      hero.removeEventListener("pointerleave", onLeaveHero);
      if (idleHideTimer.current) clearTimeout(idleHideTimer.current);
    };
  }, [sources]);

  const motionSimple = Boolean(reducedMotion);

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-[15] overflow-hidden min-h-[min(100%,100dvh)] min-w-full",
        className
      )}
      aria-hidden
    >
      <AnimatePresence mode="popLayout">
        {pops.map((p) => (
          <motion.div
            key={p.id}
            className="absolute z-[15] -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={
              motionSimple
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 420, damping: 34 }
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt=""
              width={72}
              height={72}
              draggable={false}
              className="pointer-events-none h-14 w-14 select-none drop-shadow-[0_6px_28px_rgba(0,191,255,0.45)] sm:h-[72px] sm:w-[72px]"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
