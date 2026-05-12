"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  { nx: 0.52, ny: 0.88 },
  { nx: 0.32, ny: 0.2 },
  { nx: 0.68, ny: 0.2 },
  { nx: 0.26, ny: 0.5 },
  { nx: 0.74, ny: 0.48 },
  { nx: 0.38, ny: 0.68 },
  { nx: 0.63, ny: 0.35 }
] as const;

/**
 * Только ближайший слот (и при необходимости второй для плавного переезда).
 * Раньше softmax по всем 16 давал «хвосты» — на мобилке казалось, что горят все.
 */
function slotGlowWeights(px: Pt, w: number, h: number, slotCount: number, coarse: boolean): number[] {
  const minS = Math.min(w, h);
  const sigma = minS * (coarse ? 0.038 : 0.032);
  const inv2 = 1 / (2 * sigma * sigma);
  const out = Array.from({ length: slotCount }, () => 0);

  const dists: { i: number; d: number }[] = [];
  for (let i = 0; i < slotCount; i++) {
    const s = SLOTS[i];
    if (!s) continue;
    const ix = s.nx * w;
    const iy = s.ny * h;
    dists.push({ i, d: Math.hypot(px.x - ix, px.y - iy) });
  }
  dists.sort((a, b) => a.d - b.d);
  const best = dists[0];
  const second = dists[1];
  if (!best) return out;

  if (!second || second.d - best.d > sigma * 2.8) {
    out[best.i] = 1;
    return out;
  }

  const wa = Math.exp(-(best.d * best.d) * inv2);
  const wb = Math.exp(-(second.d * second.d) * inv2);
  const sum = wa + wb || 1;
  out[best.i] = wa / sum;
  out[second.i] = wb / sum;
  return out;
}

/** Подчёркиваем пик без клиппинга в середину */
function punchGlow(g: number) {
  const t = Math.min(1, Math.max(0, g));
  const s = t * t * (3 - 2 * t);
  return Math.min(1, Math.pow(s, 0.42));
}

const EASE_SPOTLIGHT = [0.14, 1, 0.18, 1] as const;

/** Десктоп / тач: на мобиле шире зона и чуть резче след за пальцем */
const POINTER_LAMBDA_FINE = 30;
const POINTER_LAMBDA_COARSE = 38;
/** Порог в px: ниже — считаем, что догнали цель и можно остановить rAF (экономия CPU). */
const POINTER_SNAP_EPS = 0.42;

function IconBubble({
  children,
  className,
  glow,
  cx,
  cy,
  reduced,
  interacting
}: {
  children: ReactNode;
  className?: string;
  glow: number;
  cx: number;
  cy: number;
  reduced: boolean;
  /** false = курсор/палец не в hero — не показываем слой вообще */
  interacting: boolean;
}) {
  const p = punchGlow(glow);
  const visible = reduced || (interacting && p > 0.002);
  const hot = p > 0.45;

  const tweenSoft = { type: "tween" as const, duration: 0.44, ease: EASE_SPOTLIGHT };
  const tweenGlow = { type: "tween" as const, duration: 0.36, ease: EASE_SPOTLIGHT };

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute will-change-[opacity,transform] sm:h-[3.35rem] sm:w-[3.35rem]",
        !visible && !reduced && "invisible",
        className
      )}
      style={{
        left: `${cx * 100}%`,
        top: `${cy * 100}%`,
        translateX: "-50%",
        translateY: "-50%"
      }}
      initial={reduced ? false : { opacity: 0, scale: 0.88 }}
      animate={
        reduced
          ? { opacity: 0.38, scale: 1 }
          : {
              opacity: visible ? 0.08 + 0.92 * p : 0,
              scale: visible ? 0.88 + 0.16 * p : 0.86
            }
      }
      transition={
        reduced
          ? { duration: 0.2 }
          : { opacity: tweenSoft, scale: { ...tweenSoft, duration: 0.56 } }
      }
    >
      {/* внутреннее ядро свечения */}
      <motion.div
        aria-hidden
        className="absolute -inset-2 rounded-[1.35rem] bg-gradient-to-br from-cyan-300/45 via-sky-400/25 to-fuchsia-500/30 blur-md"
        animate={{ opacity: reduced ? 0 : p * 0.55 }}
        transition={tweenGlow}
      />
      {/* широкий ореол «дорогого» сервиса */}
      <motion.div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/35 via-violet-500/22 to-transparent blur-3xl"
        animate={{ opacity: reduced ? 0 : p * 0.95 }}
        transition={tweenGlow}
      />
      <motion.div
        className={cn(
          "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-md sm:h-[3.35rem] sm:w-[3.35rem]",
          reduced
            ? "border-white/[0.14] bg-[rgba(8,12,28,0.65)]"
            : hot
              ? "border-cyan-200/65 bg-gradient-to-br from-[rgba(16,40,72,0.92)] via-[rgba(10,24,52,0.88)] to-[rgba(24,16,56,0.85)] shadow-[0_0_56px_rgba(34,211,238,0.45)] ring-1 ring-cyan-300/35"
              : "border-white/[0.09] bg-[rgba(3,6,18,0.5)]"
        )}
        animate={
          reduced
            ? {}
            : {
                boxShadow:
                  p > 0.08
                    ? `0 0 ${22 + 58 * p}px rgba(34,211,238,${0.28 + 0.48 * p}), 0 0 ${12 + 36 * p}px rgba(192,132,252,${0.14 + 0.34 * p}), 0 0 ${4 + 12 * p}px rgba(255,255,255,${0.08 + 0.12 * p}), inset 0 1px 0 rgba(255,255,255,${0.2 + 0.28 * p})`
                    : "0 12px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)"
              }
        }
        transition={{ type: "tween", duration: 0.44, ease: EASE_SPOTLIGHT }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.14] via-transparent to-cyan-300/18"
          animate={{ opacity: reduced ? 0 : hot ? 1 : 0 }}
          transition={{ duration: 0.32, ease: EASE_SPOTLIGHT }}
        />
        <motion.div
          className="relative flex h-[1.85rem] w-[1.85rem] items-center justify-center sm:h-8 sm:w-8 [&_svg]:h-full [&_svg]:w-full [&_svg]:drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]"
          animate={
            reduced
              ? {}
              : {
                  filter:
                    p > 0.14
                      ? `brightness(${1 + 0.52 * p}) saturate(${1 + 0.35 * p}) contrast(${1 + 0.14 * p})`
                      : "brightness(0.48) saturate(0.75)"
                }
          }
          transition={{ type: "tween", duration: 0.38, ease: EASE_SPOTLIGHT }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
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

/** Стильный маркер «люкс»: крылья + акцент — без воспроизведения зарегистрированного знака. */
function SvgArmaniStyle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="#c9a962"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5v4M7 10c2.5-3 7.5-3 10 0M6 14c2.5 4 9.5 4 12 0M9 17l3-4 3 4"
      />
      <path fill="#c9a962" d="M12 14.5c1 0 1.8.7 2 1.7l-4 .1c.2-1 1-1.8 2-1.8z" opacity="0.85" />
    </svg>
  );
}

/** Узнаваемый силуэт крокодила — декоративный, не копия логотипа Lacoste. */
function SvgLacosteStyle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#0d5c4a"
        d="M16 8.5c.8-.2 1.8.2 2.2 1 .5 1-.3 2.2-1.5 2.6-.4 1.4-1.4 2.4-2.8 2.8-.3 1.5-1.3 2.7-2.8 3.2l-.8 1.6h-1.2l.2-1.2c-2 .2-3.8-.8-4.8-2.5-.8.3-1.7 0-2.2-.7-.6-.9-.4-2 .5-2.6 1.5-2.8 4-4.5 7-5 .6-1.6 2.4-2.5 4.2-2.2zm-5 3.5c-1.8.5-3.3 1.7-4.2 3.3.4.5 1.1.7 1.7.5 1.5-2 3.8-3 6.2-3.5-.8-.8-2.3-.8-3.7-.3z"
      />
      <circle cx="14.5" cy="9.5" r="0.9" fill="#fff" opacity="0.9" />
    </svg>
  );
}

function SvgNikeStyle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#f5f5f5"
        d="M4.2 15.8c5.8-5.2 11.6-7.8 17.5-7.3.4 4.6-6.8 9.4-17.3 11.5-.3-1.7-.4-3.2-.2-4.2z"
      />
    </svg>
  );
}

function SvgAdidasStyle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="#f5f5f5" d="M5 20L9.5 6h2L7 20zM10.5 20L15 6h2L12.5 20zM16 20L20.5 6h2L18 20z" />
    </svg>
  );
}

/** Два переплетённых овала — отсылка к классическому люксовому знаку. */
function SvgChanelStyle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="#f5f5f5"
        strokeWidth="1.45"
        d="M9.5 8.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5a4.4 4.4 0 0 0 3.6-1.9M14.5 8.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5a4.4 4.4 0 0 1-3.6-1.9"
      />
    </svg>
  );
}

/** Стильные переплетённые буквы — декоративная отсылка к GG-монограмме. */
function SvgGucciStyle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="#c9a962"
        strokeWidth="1.35"
        strokeLinecap="round"
        d="M9 9c-2 0-3.5 1.8-3.5 4s1.5 4 3.5 4 3.5-1.8 3.5-4c0-.8-.2-1.5-.5-2.1M15 9c2 0 3.5 1.8 3.5 4s-1.5 4-3.5 4-3.5-1.8-3.5-4c0-.8.2-1.5.5-2.1"
      />
      <path stroke="#c9a962" strokeWidth="1.2" d="M11.5 11v5M11.5 11c.8-.8 2.2-.8 3 0" />
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
  SvgWhatsApp,
  SvgArmaniStyle,
  SvgLacosteStyle,
  SvgNikeStyle,
  SvgAdidasStyle,
  SvgChanelStyle,
  SvgGucciStyle
] as const;

type Props = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function HeroPlatformField({ sectionRef }: Props) {
  const reduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState<Pt | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const dimsRef = useRef({ w: 0, h: 0 });
  const [coarsePointer, setCoarsePointer] = useState(false);
  const pointerLambdaRef = useRef(POINTER_LAMBDA_FINE);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const syncPointerMode = () => {
      const coarse = mq.matches;
      setCoarsePointer(coarse);
      pointerLambdaRef.current = coarse ? POINTER_LAMBDA_COARSE : POINTER_LAMBDA_FINE;
    };
    syncPointerMode();
    mq.addEventListener("change", syncPointerMode);
    return () => mq.removeEventListener("change", syncPointerMode);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const d = { w: r.width, h: r.height };
      dimsRef.current = d;
      setDims(d);
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

    let rafId = 0;
    let lastTs = performance.now();
    const target: { current: Pt | null } = { current: null };
    const smooth: { current: Pt | null } = { current: null };

    const tick = (ts: number) => {
      const dt = Math.min((ts - lastTs) / 1000, 0.072);
      lastTs = ts;

      const tgt = target.current;
      if (!tgt) {
        smooth.current = null;
        setPointer(null);
        rafId = 0;
        return;
      }

      if (!smooth.current) {
        smooth.current = { x: tgt.x, y: tgt.y };
      } else {
        const a = 1 - Math.exp(-pointerLambdaRef.current * dt);
        smooth.current.x += (tgt.x - smooth.current.x) * a;
        smooth.current.y += (tgt.y - smooth.current.y) * a;
      }

      setPointer({ x: smooth.current.x, y: smooth.current.y });

      const dist = Math.hypot(tgt.x - smooth.current.x, tgt.y - smooth.current.y);
      if (dist > POINTER_SNAP_EPS) {
        rafId = requestAnimationFrame(tick);
      } else {
        smooth.current = { x: tgt.x, y: tgt.y };
        setPointer({ x: tgt.x, y: tgt.y });
        rafId = 0;
      }
    };

    const startLoop = () => {
      if (rafId !== 0) return;
      lastTs = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const setTargetFromClient = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      const d = { w: r.width, h: r.height };
      dimsRef.current = d;
      /* один setState на кадр движения — без лишних пересчётов разметки */
      setDims((prev) => (prev.w === d.w && prev.h === d.h ? prev : d));
      const local = { x: clientX - r.left, y: clientY - r.top };
      target.current = local;
      if (!smooth.current) smooth.current = { ...local };
      startLoop();
    };

    const clearTarget = () => {
      target.current = null;
      if (rafId === 0) {
        smooth.current = null;
        setPointer(null);
      }
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

    /** Десктоп + тач: координаты с окна — hover работает даже над типографикой z-10 */
    const onWindowPointerMove = (e: PointerEvent) => {
      if (!inHero(e.clientX, e.clientY)) {
        clearTarget();
        return;
      }
      setTargetFromClient(e.clientX, e.clientY);
    };

    /** Мгновенная реакция на тап без ожидания pointermove (без capture — не ломаем клики по ссылкам) */
    const onSectionPointerDown = (e: PointerEvent) => {
      if (!inHero(e.clientX, e.clientY)) return;
      setTargetFromClient(e.clientX, e.clientY);
    };

    const onSectionPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      clearTarget();
    };

    document.addEventListener("pointermove", onWindowPointerMove, { passive: true, capture: true });
    window.addEventListener("blur", clearTarget);
    el.addEventListener("pointerdown", onSectionPointerDown, true);
    el.addEventListener("pointerup", onSectionPointerUp);
    el.addEventListener("pointercancel", onSectionPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      target.current = null;
      smooth.current = null;
      document.removeEventListener("pointermove", onWindowPointerMove, true);
      window.removeEventListener("blur", clearTarget);
      el.removeEventListener("pointerdown", onSectionPointerDown, true);
      el.removeEventListener("pointerup", onSectionPointerUp);
      el.removeEventListener("pointercancel", onSectionPointerUp);
    };
  }, [sectionRef, reduceMotion]);

  const w = Math.max(dims.w, 1);
  const h = Math.max(dims.h, 1);
  const slotCount = ICON_SET.length;
  const slots = SLOTS.slice(0, slotCount);

  const glowWeights = useMemo(() => {
    if (reduceMotion || !pointer) return null;
    return slotGlowWeights(pointer, w, h, slotCount, coarsePointer);
  }, [pointer, w, h, slotCount, coarsePointer, reduceMotion]);

  const minSide = Math.min(w, h);
  const sx = pointer ? (pointer.x / w) * 100 : 0;
  const sy = pointer ? (pointer.y / h) * 100 : 0;
  /** Узкое пятно — не «включает свет во всей секции», только локальный отблеск */
  const spotR = Math.round(minSide * (coarsePointer ? 0.2 : 0.17));

  /** Параллакс слоёв относительно центра hero — глубина как у премиальных лендингов */
  const driftX = pointer ? (pointer.x / w - 0.5) * (coarsePointer ? 11 : 16) : 0;
  const driftY = pointer ? (pointer.y / h - 0.5) * (coarsePointer ? 9 : 13) : 0;
  const idleMotion = !pointer;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] overflow-hidden"
      aria-hidden
    >
      {/* «Дыхание» фона только без взаимодействия — иначе мерцание на мобилке */}
      {!reduceMotion && idleMotion && (
        <>
          <motion.div
            className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_55%_at_25%_15%,rgba(56,189,248,0.09),transparent_58%)]"
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_65%,rgba(167,139,250,0.07),transparent_55%)]"
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
        </>
      )}

      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate3d(${driftX * 1.05}px, ${driftY * 0.85}px, 0)`
        }}
      >
        {!reduceMotion && pointer && (
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background: `radial-gradient(circle ${spotR}px at ${sx}% ${sy}%, rgba(186,230,253,0.22) 0%, rgba(56,189,248,0.06) 42%, transparent 56%)`
            }}
          />
        )}
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          transform: `translate3d(${driftX * 0.55}px, ${driftY * 0.48}px, 0)`
        }}
      >
        {slots.map((slot, i) => {
          const Icon = ICON_SET[i] ?? ICON_SET[0];
          let glow = 0;
          if (reduceMotion) {
            glow = 0.35;
          } else if (glowWeights) {
            glow = glowWeights[i] ?? 0;
          }

          return (
            <IconBubble
              key={i}
              cx={slot.nx}
              cy={slot.ny}
              glow={glow}
              reduced={!!reduceMotion}
              interacting={reduceMotion || pointer !== null}
            >
              <Icon />
            </IconBubble>
          );
        })}
      </div>
    </div>
  );
}
