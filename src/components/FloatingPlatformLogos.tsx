"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const MANIFEST_URL = "/logos/manifest.json";

/** Десктоп — плавная смена */
const MIN_INTERVAL_MS = 120;
const MIN_MOVE_PX = 26;
const MAX_MARKERS = 10;
const IDLE_HIDE_MS = 1600;

/** Мобилка / палец — заметно реже новые логотипы, больше путь между ними */
const MIN_INTERVAL_TOUCH_MS = 340;
const MIN_MOVE_TOUCH_PX = 58;
const MAX_MARKERS_TOUCH = 6;
const IDLE_HIDE_TOUCH_MS = 2200;

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
  const [touchUi, setTouchUi] = useState(false);
  const idSeq = useRef(0);
  const logoTurn = useRef(0);
  const lastSpawnT = useRef(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);
  const idleHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((data: unknown) => {
        if (cancelled || !Array.isArray(data)) return;
        const names = data.filter((x): x is string => typeof x === "string" && x.endsWith(".png"));
        setSources(names.length ? names : []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqNarrow = window.matchMedia("(max-width: 767px)");
    const sync = () => setTouchUi(mqCoarse.matches || mqNarrow.matches);
    sync();
    mqCoarse.addEventListener("change", sync);
    mqNarrow.addEventListener("change", sync);
    return () => {
      mqCoarse.removeEventListener("change", sync);
      mqNarrow.removeEventListener("change", sync);
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
      const ms = touchUi ? IDLE_HIDE_TOUCH_MS : IDLE_HIDE_MS;
      idleHideTimer.current = setTimeout(() => {
        clearAllMarkers();
        idleHideTimer.current = null;
      }, ms);
    };

    const maxMarkers = touchUi ? MAX_MARKERS_TOUCH : MAX_MARKERS;

    const addPop = (x: number, y: number) => {
      if (!sources.length) return;
      const file = sources[logoTurn.current % sources.length]!;
      logoTurn.current += 1;
      idSeq.current += 1;
      const id = idSeq.current;
      const src = pathForLogo(file);
      setPops((list) => [...list, { id, x, y, src }].slice(-maxMarkers));
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

      const interval = touchUi ? MIN_INTERVAL_TOUCH_MS : MIN_INTERVAL_MS;
      const minMove = touchUi ? MIN_MOVE_TOUCH_PX : MIN_MOVE_PX;

      const now = performance.now();
      if (!force && now - lastSpawnT.current < interval) return;

      const jitter = touchUi ? 8 : 12;
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
  }, [sources, touchUi]);

  const motionSimple = Boolean(reducedMotion);

  const enterTransition = motionSimple
    ? { duration: 0.25 }
    : touchUi
      ? { type: "tween" as const, duration: 0.58, ease: [0.22, 1, 0.36, 1] as const }
      : { type: "spring" as const, stiffness: 165, damping: 30, mass: 0.72 };

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
            initial={{ opacity: 0, scale: touchUi ? 0.88 : 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={enterTransition}
          >
            <div
              className={cn(
                "rounded-2xl bg-gradient-to-br from-cyan-400/45 via-fuchsia-500/35 to-amber-300/40 p-[2.5px]",
                "shadow-[0_0_28px_rgba(0,210,255,0.35),0_0_44px_rgba(180,100,255,0.22)]",
                touchUi && "p-[2px] shadow-[0_0_32px_rgba(0,220,255,0.4)]"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt=""
                width={72}
                height={72}
                draggable={false}
                className={cn(
                  "pointer-events-none h-14 w-14 select-none rounded-[13px] object-cover sm:h-[72px] sm:w-[72px]",
                  "[filter:saturate(1.45)_contrast(1.1)_brightness(1.07)]",
                  "drop-shadow-[0_2px_16px_rgba(255,120,200,0.35)]"
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
