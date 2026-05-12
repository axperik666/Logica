"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Партнёрские / платформенные логотипы — замени PNG в public/logos/ при необходимости */
const PLATFORM_LOGOS = [
  "/logos/tiktok.png",
  "/logos/meta.png",
  "/logos/vk.png",
  "/logos/yandex.png",
  "/logos/instagram.png",
  "/logos/youtube.png",
  "/logos/telegram.png",
  "/logos/googleads.png",
  "/logos/linkedin.png",
  "/logos/x.png",
  "/logos/pinterest.png",
  "/logos/snapchat.png"
] as const;

const MIN_INTERVAL_MS = 50;
const MIN_MOVE_PX = 12;
const MAX_MARKERS = 12;
/** После последнего движения курсора над hero — всё скрыть */
const IDLE_HIDE_MS = 320;
/** Ушёл курсор из hero — скрыть сразу */

type Pop = { id: number; x: number; y: number; src: string };

type FloatingPlatformLogosProps = {
  className?: string;
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export default function FloatingPlatformLogos({ className }: FloatingPlatformLogosProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pops, setPops] = useState<Pop[]>([]);
  const idSeq = useRef(0);
  const logoTurn = useRef(0);
  const lastSpawnT = useRef(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);
  const idleHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

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

    const onPointerMove = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

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

      // Любое движение над фоном hero продлевает «жизнь» слоя; пауза → всё пропадает
      scheduleHideWhenIdle();

      const now = performance.now();
      if (now - lastSpawnT.current < MIN_INTERVAL_MS) return;

      const jitter = 14;
      const x = e.clientX - rect.left + (Math.random() - 0.5) * jitter;
      const y = e.clientY - rect.top + (Math.random() - 0.5) * jitter;

      const prev = lastSpawnPos.current;
      if (prev) {
        const d = Math.hypot(x - prev.x, y - prev.y);
        if (d < MIN_MOVE_PX) return;
      }

      lastSpawnT.current = now;
      lastSpawnPos.current = { x, y };

      const src = PLATFORM_LOGOS[logoTurn.current % PLATFORM_LOGOS.length]!;
      logoTurn.current += 1;
      idSeq.current += 1;
      const id = idSeq.current;

      setPops((list) => [...list, { id, x, y, src }].slice(-MAX_MARKERS));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true, capture: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove, true);
      if (idleHideTimer.current) clearTimeout(idleHideTimer.current);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-[15] overflow-hidden min-h-full min-w-full",
        className
      )}
      aria-hidden
    >
      {/* Без движения курсора по hero — pops пустой, ничего не рендерится */}
      <AnimatePresence mode="popLayout">
        {!reducedMotion &&
          pops.map((p) => (
            <motion.div
              key={p.id}
              className="absolute z-[15] -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{ left: p.x, top: p.y }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt=""
                width={72}
                height={72}
                draggable={false}
                className="h-14 w-14 select-none drop-shadow-[0_6px_28px_rgba(0,191,255,0.45)] sm:h-[72px] sm:w-[72px]"
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
