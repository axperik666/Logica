"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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

/** Только если файл реально лежит в `public` — иначе пустой `<source webm>` даёт сбой загрузки в части браузеров. */
const webmSrc = process.env.NEXT_PUBLIC_INTRO_SPLASH_WEBM?.trim() ?? "";

/**
 * Полноэкранный короткий ролик при первом заходе в этой вкладке (мобильный и десктоп).
 * По умолчанию: `public/ava.mp4`. WebM — только через NEXT_PUBLIC_INTRO_SPLASH_WEBM.
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
    (
      reason:
        | "skip"
        | "dismiss"
        | "ended"
        | "error"
        | "timeout"
        | "reduced"
    ) => {
      setOpen(false);
      writeSessionDone();
      track("intro_splash_close", { reason });
    },
    []
  );

  const dismissUser = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    videoRef.current?.pause();
    close("dismiss");
  }, [close]);

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

  /** Автоплей после монтирования (iOS / часть Android без явного play() не стартуют). */
  useEffect(() => {
    if (!open) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const tryPlay = () => {
      void el.play().catch(() => {});
    };
    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) tryPlay();
    else el.addEventListener("loadeddata", tryPlay, { once: true });
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissUser();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismissUser]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ariaLabel")}
      aria-describedby="intro-splash-hint"
      className={`fixed inset-0 z-[130] flex min-h-dvh min-h-[100dvh] w-full cursor-pointer flex-col bg-black transition-opacity duration-500 ease-out ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)"
      }}
      onClick={dismissUser}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(0,191,255,0.2),transparent_55%)]" />

      {/* Логотип всегда читаем — ролик может кропаться или «ездить» по кадру */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex justify-center px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="rounded-2xl border border-white/[0.12] bg-black/55 px-5 py-3 shadow-[0_12px_48px_rgba(0,0,0,0.5)] backdrop-blur-md sm:px-7 sm:py-3.5">
          <Image
            src="/logo.png"
            alt="LOGICA Marketing"
            width={320}
            height={80}
            className="h-9 w-auto sm:h-11 md:h-12"
            priority
          />
        </div>
      </div>

      <div className="relative flex min-h-0 w-full flex-1 items-center justify-center bg-black">
        <video
          ref={videoRef}
          key={videoBase}
          className="max-h-full max-w-full object-contain"
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
            if (process.env.NODE_ENV === "development") {
              console.warn("[IntroSplash] video error", videoBase);
            }
            close("error");
          }}
        >
          <source src={videoBase} type="video/mp4" />
          {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
        </video>
      </div>

      <div className="pointer-events-none relative flex shrink-0 flex-col items-center gap-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2">
        <p id="intro-splash-hint" className="max-w-md px-4 text-center text-xs text-white/55">
          {t("tapAnywhere")}
        </p>
        <button
          type="button"
          tabIndex={0}
          className="pointer-events-auto rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_0_32px_rgba(0,191,255,0.25)] backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/15 active:scale-[0.98]"
        >
          {t("skip")}
        </button>
      </div>
    </div>
  );
}
