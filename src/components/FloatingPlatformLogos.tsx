"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const MANIFEST_URL = "/logos/manifest.json";

/** Десктоп — ровный след, без «дребезга» */
const MIN_INTERVAL_MS = 135;
const MIN_MOVE_PX = 30;
const MAX_MARKERS = 8;
const IDLE_HIDE_MS = 1700;

/** Мобилка — реже спавн, длиннее «шаг», меньше одновременных маркеров */
const MIN_INTERVAL_TOUCH_MS = 440;
const MIN_MOVE_TOUCH_PX = 76;
const MAX_MARKERS_TOUCH = 5;
const IDLE_HIDE_TOUCH_MS = 2400;

type Pop = { id: number; x: number; y: number; src: string };

type FloatingPlatformLogosProps = {
  className?: string;
};

function pathForLogo(filename: string): string {
  return `/logos/${encodeURIComponent(filename)}`;
}

export default function FloatingPlatformLogos({ className }: FloatingPlatformLogosProps) {
  const [sources, setSources] = useState<string[]>([]);
  const [pops, setPops] = useState<Pop[]>([]);
  const [touchUi, setTouchUi] = useState(false);
  const idSeq = useRef(0);
  const logoTurn = useRef(0);
  const lastSpawnT = useRef(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);
  const idleHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchMoveRaf = useRef<number | null>(null);
  const pendingMove = useRef<{ cx: number; cy: number } | null>(null);
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

      const jitter = touchUi ? 4 : 6;
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

    const flushTouchMove = () => {
      touchMoveRaf.current = null;
      const pending = pendingMove.current;
      pendingMove.current = null;
      if (!pending) return;

      const rect = hero.getBoundingClientRect();
      const inside =
        pending.cx >= rect.left &&
        pending.cx <= rect.right &&
        pending.cy >= rect.top &&
        pending.cy <= rect.bottom;

      if (!inside) {
        if (idleHideTimer.current) {
          clearTimeout(idleHideTimer.current);
          idleHideTimer.current = null;
        }
        clearAllMarkers();
        return;
      }

      trySpawn(pending.cx, pending.cy, false);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (touchUi) {
        pendingMove.current = { cx: e.clientX, cy: e.clientY };
        if (touchMoveRaf.current == null) {
          touchMoveRaf.current = requestAnimationFrame(flushTouchMove);
        }
        return;
      }

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
      if (touchMoveRaf.current != null) cancelAnimationFrame(touchMoveRaf.current);
      pendingMove.current = null;
    };
  }, [sources, touchUi]);

  const motionSimple = Boolean(reducedMotion);

  const enterTransition = motionSimple
    ? { duration: 0.22 }
    : touchUi
      ? { type: "tween" as const, duration: 0.42, ease: [0.25, 0.1, 0.25, 1] as const }
      : { type: "spring" as const, stiffness: 148, damping: 36, mass: 0.85 };

  const exitTransition = motionSimple
    ? { duration: 0.2 }
    : { type: "tween" as const, duration: 0.32, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[8] overflow-hidden min-h-[min(100%,100dvh)] min-w-full",
        className
      )}
      aria-hidden
    >
      <AnimatePresence>
        {pops.map((p) => (
          <motion.div
            key={p.id}
            className="absolute z-[8] -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-multiply"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: touchUi ? 0.94 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, transition: exitTransition }}
            transition={enterTransition}
            layout={false}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt=""
              width={72}
              height={72}
              draggable={false}
              className={cn(
                "pointer-events-none select-none object-contain",
                touchUi ? "h-11 w-11" : "h-14 w-14 sm:h-[72px] sm:w-[72px]",
                "[filter:brightness(1.22)_contrast(1.08)_saturate(1.18)]"
              )}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
