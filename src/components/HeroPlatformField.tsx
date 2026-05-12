"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Pt = { x: number; y: number };

/** Нормализованные позиции 0–1 внутри hero (не пересекают центральный контент сильно). */
const SLOTS = [
  { nx: 0.06, ny: 0.14 },
  { nx: 0.88, ny: 0.12 },
  { nx: 0.14, ny: 0.38 },
  { nx: 0.84, ny: 0.42 },
  { nx: 0.05, ny: 0.62 },
  { nx: 0.92, ny: 0.58 },
  { nx: 0.18, ny: 0.82 },
  { nx: 0.78, ny: 0.78 },
  { nx: 0.48, ny: 0.08 },
  { nx: 0.52, ny: 0.88 }
] as const;

function glowStrength(px: Pt, cx: number, cy: number, w: number, h: number, radiusFrac: number) {
  const ix = cx * w;
  const iy = cy * h;
  const dx = px.x - ix;
  const dy = px.y - iy;
  const r = Math.min(w, h) * radiusFrac;
  const d2 = dx * dx + dy * dy;
  return Math.exp(-d2 / (r * r * 0.42));
}

function IconBubble({
  children,
  className,
  glow,
  cx,
  cy,
  reduced
}: {
  children: ReactNode;
  className?: string;
  glow: number;
  cx: number;
  cy: number;
  reduced: boolean;
}) {
  const base = reduced ? 0.34 : 0.1 + 0.58 * glow;
  const scale = reduced ? 1 : 0.92 + 0.14 * glow;
  const blur = reduced ? 0 : 12 * (0.2 + 0.8 * glow);

  return (
    <div
      className={cn(
        "pointer-events-none absolute flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.12] bg-[rgba(6,10,24,0.55)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-[opacity,transform,box-shadow] duration-300 sm:h-12 sm:w-12",
        className
      )}
      style={{
        left: `${cx * 100}%`,
        top: `${cy * 100}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: base,
        boxShadow:
          glow > 0.08 && !reduced
            ? `0 0 ${blur}px rgba(34,211,238,${0.15 + 0.45 * glow}), inset 0 1px 0 rgba(255,255,255,0.12)`
            : undefined
      }}
    >
      <div className="flex h-7 w-7 items-center justify-center text-white/95 [&_svg]:h-full [&_svg]:w-full">
        {children}
      </div>
    </div>
  );
}

function SvgMeta() {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 12c0-1.3 1-2.4 2.5-2.4s2.5 1.1 2.5 2.4-1 2.4-2.5 2.4-2.5-1.1-2.5-2.4zm7 0c0-1.3 1-2.4 2.5-2.4s2.5 1.1 2.5 2.4-1 2.4-2.5 2.4-2.5-1.1-2.5-2.4z"
        stroke={`url(#meta-${gid})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={`meta-${gid}`} x1="4" y1="4" x2="20" y2="18">
          <stop stopColor="#0084ff" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SvgGoogle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function SvgFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SvgInstagram() {
  const iid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={`ig-${iid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#e6683c" />
          <stop offset="100%" stopColor="#dc2743" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill={`url(#ig-${iid})`} />
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1.3" fill="white" />
    </svg>
  );
}

function SvgTelegram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#26A5E4" />
      <path
        fill="white"
        d="M18.5 7.5l-2.2 10.4c-.2.9-.7 1.1-1.4.7l-3.9-2.9-1.9 1.8c-.2.2-.4.4-.8.4l.3-4.6 7.2-6.5c.3-.3-.1-.5-.5-.3l-8.9 5.6-3.8-1.2c-.8-.3-.8-.8.2-1.2l14.8-5.7c.7-.3 1.3.2 1.1 1.1z"
      />
    </svg>
  );
}

function SvgTikTok() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#25F4EE"
        d="M14.5 4.5h2.4v2.2c1 .1 2 .5 2.8 1.2v2.6c-.8-.4-1.7-.6-2.6-.6v5.4c0 3-2.4 5.4-5.4 5.4S6.3 18.3 6.3 15.3c0-2.8 2.1-5 4.8-5.3v2.7c-1.3.3-2.3 1.5-2.3 2.9 0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V4.5z"
      />
      <path
        fill="#FE2C55"
        d="M14.5 6.8v2.4c.9.1 1.8.4 2.6.9V7.6c-.7-.6-1.6-1-2.6-1z"
        opacity="0.92"
      />
    </svg>
  );
}

function SvgLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="#0A66C2" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SvgYoutube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SvgYandex() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#FC3F1E"
        d="M14.2 3.5L10 14.2 8.2 20.5H5.8l2.3-6.5L4 3.5h2.6l3.2 7.4 3.4-7.4h2.6zm5.8 0v17h-2.4V3.5h2.4z"
      />
    </svg>
  );
}

function SvgWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#25D366"
        d="M12 2C6.48 2 2 6.48 2 12c0 1.85.49 3.58 1.35 5.08L2 22l5.02-1.32A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.38 14.27c-.23.65-1.17 1.2-1.62 1.28-.43.08-.98.12-1.58-.12-.36-.14-.83-.33-1.44-.66-2.54-1.15-4.18-3.84-4.31-4.03-.13-.19-1.03-1.37-1.03-2.61 0-1.24.65-1.85.88-2.1.23-.25.5-.31.67-.31h.48c.15 0 .35-.06.55-.38.22-.38.84-1.65.92-1.77.08-.12.18-.28.02-.46-.16-.18-.44-.21-.56-.22l-.42-.01c-.38 0-.74.11-1.05.34-.38.29-1.28 1.25-1.28 3.05 0 1.8 1.31 3.54 1.49 3.79.18.25 2.58 3.94 6.25 5.52.87.38 1.55.61 2.08.78.87.28 1.66.24 2.29.15.7-.1 2.15-.88 2.45-1.73.3-.85.3-1.58.21-1.73-.09-.15-.33-.24-.7-.42z"
      />
    </svg>
  );
}

const ICON_SET = [
  SvgMeta,
  SvgGoogle,
  SvgFacebook,
  SvgInstagram,
  SvgTelegram,
  SvgTikTok,
  SvgLinkedIn,
  SvgYoutube,
  SvgYandex,
  SvgWhatsApp
] as const;

type Props = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function HeroPlatformField({ sectionRef }: Props) {
  const reduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState<Pt | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const rafRef = useRef(0);

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setDims({ w: r.width, h: r.height });
    setPointer({ x: clientX - r.left, y: clientY - r.top });
  }, [sectionRef]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setDims({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    if (reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const flush = (clientX: number, clientY: number) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => updatePointer(clientX, clientY));
    };

    const inHero = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      return (
        clientX >= r.left &&
        clientX <= r.right &&
        clientY >= r.top &&
        clientY <= r.bottom
      );
    };

    const onMove = (e: MouseEvent) => flush(e.clientX, e.clientY);
    const onLeave = () => setPointer(null);

    /** Палец над hero с любого слоя (в т.ч. поверх контента) — для мобилки */
    const onTouchGlobal = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      if (inHero(t.clientX, t.clientY)) flush(t.clientX, t.clientY);
    };
    const onTouchEndGlobal = () => setPointer(null);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchstart", onTouchGlobal, { passive: true });
    window.addEventListener("touchmove", onTouchGlobal, { passive: true });
    window.addEventListener("touchend", onTouchEndGlobal);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", onTouchGlobal);
      window.removeEventListener("touchmove", onTouchGlobal);
      window.removeEventListener("touchend", onTouchEndGlobal);
    };
  }, [sectionRef, updatePointer, reduceMotion]);

  const w = Math.max(dims.w, 1);
  const h = Math.max(dims.h, 1);
  const slots = SLOTS.slice(0, ICON_SET.length);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] overflow-hidden"
      aria-hidden
    >
      {slots.map((slot, i) => {
        const Icon = ICON_SET[i] ?? ICON_SET[0];
        let glow = 0;
        if (reduceMotion) {
          glow = 0.35;
        } else if (pointer) {
          glow = glowStrength(pointer, slot.nx, slot.ny, w, h, 0.24);
        }

        return (
          <IconBubble key={i} cx={slot.nx} cy={slot.ny} glow={glow} reduced={!!reduceMotion}>
            <Icon />
          </IconBubble>
        );
      })}
    </div>
  );
}
