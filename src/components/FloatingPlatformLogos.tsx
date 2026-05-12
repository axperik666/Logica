"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** 12 платформ — PNG в public/logos/ */
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

const MIN_INTERVAL_MS = 55;
const MIN_MOVE_PX = 14;
const MAX_VISIBLE = 14;
const POP_MS = 2600;

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
  const lastT = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const onPointerMove = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      const now = performance.now();
      if (now - lastT.current < MIN_INTERVAL_MS) return;

      const jitter = 16;
      const x = e.clientX - rect.left + (Math.random() - 0.5) * jitter;
      const y = e.clientY - rect.top + (Math.random() - 0.5) * jitter;

      const prev = lastPos.current;
      if (prev) {
        const d = Math.hypot(x - prev.x, y - prev.y);
        if (d < MIN_MOVE_PX) return;
      }

      lastT.current = now;
      lastPos.current = { x, y };

      const src = PLATFORM_LOGOS[logoTurn.current % PLATFORM_LOGOS.length]!;
      logoTurn.current += 1;
      idSeq.current += 1;
      const id = idSeq.current;

      setPops((list) => [...list, { id, x, y, src }].slice(-MAX_VISIBLE));

      window.setTimeout(() => {
        setPops((list) => list.filter((p) => p.id !== id));
      }, POP_MS);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true, capture: true });
    return () => window.removeEventListener("pointermove", onPointerMove, true);
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
      <AnimatePresence mode="popLayout">
        {!reducedMotion &&
          pops.map((p) => (
            <motion.div
              key={p.id}
              className="absolute z-[15] -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{ left: p.x, top: p.y }}
              initial={{ opacity: 0, scale: 0.45 }}
              animate={{
                opacity: [0, 1, 0.92, 0],
                scale: [0.45, 1.06, 1, 0.96],
                rotate: [0, -5, 3, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: POP_MS / 1000,
                times: [0, 0.12, 0.58, 1],
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- локальные PNG, без оптимизации */}
              <img
                src={p.src}
                alt=""
                width={72}
                height={72}
                draggable={false}
                className="h-14 w-14 select-none drop-shadow-[0_6px_28px_rgba(0,191,255,0.5)] sm:h-[72px] sm:w-[72px]"
              />
            </motion.div>
          ))}
      </AnimatePresence>

      {reducedMotion ? (
        <div className="pointer-events-none absolute inset-0 z-[15] flex flex-wrap items-center justify-center gap-5 opacity-45">
          {PLATFORM_LOGOS.slice(0, 8).map((src) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={src} src={src} alt="" width={56} height={56} className="h-12 w-12 sm:h-14 sm:w-14" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
