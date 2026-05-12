"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** 12 платформ — PNG в public/logos/ (генерация: scripts/generate-logo-pngs.ps1) */
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

const MIN_INTERVAL_MS = 80;
const MIN_MOVE_PX = 36;
const MAX_VISIBLE = 14;
const POP_MS = 2400;

type Pop = { id: number; x: number; y: number; src: string };

type FloatingPlatformLogosProps = {
  className?: string;
};

export default function FloatingPlatformLogos({ className }: FloatingPlatformLogosProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pops, setPops] = useState<Pop[]>([]);
  const idSeq = useRef(0);
  const logoTurn = useRef(0);
  const lastT = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const onPointerMove = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
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

      const jitter = 18;
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

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className={cn("pointer-events-none absolute inset-0 z-10 overflow-hidden", className)}
      aria-hidden
    >
      <AnimatePresence mode="popLayout">
        {!reduceMotion &&
          pops.map((p) => (
            <motion.div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{
                opacity: [0, 1, 0.95, 0],
                scale: [0.35, 1.08, 1, 0.92],
                rotate: [0, -6, 4, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: POP_MS / 1000,
                times: [0, 0.14, 0.55, 1],
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Image
                src={p.src}
                alt=""
                width={72}
                height={72}
                className="h-14 w-14 drop-shadow-[0_6px_24px_rgba(0,191,255,0.45)] sm:h-[72px] sm:w-[72px]"
              />
            </motion.div>
          ))}
      </AnimatePresence>

      {reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 flex flex-wrap items-center justify-center gap-6 opacity-40">
          {PLATFORM_LOGOS.slice(0, 8).map((src) => (
            <Image key={src} src={src} alt="" width={56} height={56} className="h-12 w-12 sm:h-14 sm:w-14" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
