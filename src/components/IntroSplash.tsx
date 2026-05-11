"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";

const SESSION_KEY = "logica_intro_splash_done_v1";
/** Раньше заставка была только на мобильных — учитываем и старый ключ. */
const LEGACY_SESSION_KEY = "logica_mobile_intro_done_v1";
const AUTO_DISMISS_MS = 22_000;

function readSessionDone(): boolean {
  try {
    if (typeof window === "undefined") return false;
    return (
      window.sessionStorage.getItem(SESSION_KEY) === "1" ||
      window.sessionStorage.getItem(LEGACY_SESSION_KEY) === "1"
    );
  } catch {
    return false;
  }
}

function writeSessionDone() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const videoBase =
  process.env.NEXT_PUBLIC_INTRO_SPLASH_VIDEO?.trim() ||
  process.env.NEXT_PUBLIC_MOBILE_INTRO_VIDEO?.trim() ||
  "/ava.mp4";
const posterUrl =
  process.env.NEXT_PUBLIC_INTRO_SPLASH_POSTER?.trim() ||
  process.env.NEXT_PUBLIC_MOBILE_INTRO_POSTER?.trim() ||
  "";
const disabled =
  process.env.NEXT_PUBLIC_INTRO_SPLASH_DISABLED === "1" ||
  process.env.NEXT_PUBLIC_MOBILE_INTRO_DISABLED === "1";

const webmSrc =
  process.env.NEXT_PUBLIC_INTRO_SPLASH_WEBM?.trim() || "/ava.webm";

/**
 * Полноэкранный короткий ролик при первом заходе в этой вкладке (мобильный и десктоп).
 * Файлы по умолчанию: `public/ava.mp4`, опционально `public/ava.webm`.
 * Env: NEXT_PUBLIC_INTRO_SPLASH_VIDEO, NEXT_PUBLIC_INTRO_SPLASH_WEBM, NEXT_PUBLIC_INTRO_SPLASH_POSTER, NEXT_PUBLIC_INTRO_SPLASH_DISABLED=1
 * (старые имена NEXT_PUBLIC_MOBILE_INTRO_* тоже работают)
 */
export function IntroSplash() {
  const t = useTranslations("mobileIntro");
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** В DOM `setTimeout` возвращает `number`; с @types/node у глобального `setTimeout` тип другой. */
  const timeoutRef = useRef<number | null>(null);

  const close = useCallback(
    (reason: "skip" | "ended" | "error" | "timeout" | "reduced") => {
      setOpen(false);
      writeSessionDone();
      track("intro_splash_close", { reason });
    },
    []
  );

  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (readSessionDone()) return;
    if (prefersReducedMotion()) return;

    setOpen(true);
    track("intro_splash_open", {});

    const id = window.setTimeout(() => close("timeout"), AUTO_DISMISS_MS);
    timeoutRef.current = id;
    requestAnimationFrame(() => setEntered(true));

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ariaLabel")}
      className={`fixed inset-0 z-[130] flex flex-col bg-black transition-opacity duration-500 ease-out ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)"
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(0,191,255,0.2),transparent_55%)]" />

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-3 sm:px-6">
        <video
          ref={videoRef}
          className="h-full w-full max-h-[min(85dvh,720px)] max-w-5xl object-contain lg:max-h-[min(88dvh,900px)] xl:max-w-6xl"
          playsInline
          muted
          autoPlay
          preload="auto"
          poster={posterUrl || undefined}
          onEnded={() => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            close("ended");
          }}
          onError={() => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            close("error");
          }}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={videoBase} type="video/mp4" />
        </video>
      </div>

      <div className="relative flex shrink-0 justify-center pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
        <button
          type="button"
          onClick={() => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            videoRef.current?.pause();
            close("skip");
          }}
          className="rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_0_32px_rgba(0,191,255,0.25)] backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/15 active:scale-[0.98]"
        >
          {t("skip")}
        </button>
      </div>
    </div>
  );
}
