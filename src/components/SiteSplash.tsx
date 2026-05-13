"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

const SPLASH_STORAGE_KEY = "logica-site-splash-v1";
const SPLASH_SRC = "/videos/site-splash.mp4";

type Phase = "check" | "show" | "exit" | "done";

export function SiteSplash() {
  const t = useTranslations("hero");
  const [phase, setPhase] = useState<Phase>("check");
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    } catch {
      /* private mode */
    }
    setPhase((p) => (p === "done" ? "done" : "exit"));
    window.setTimeout(() => setPhase("done"), 420);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    try {
      if (sessionStorage.getItem(SPLASH_STORAGE_KEY)) {
        setPhase("done");
        return;
      }
    } catch {
      setPhase("done");
      return;
    }
    setPhase("show");
  }, []);

  useEffect(() => {
    if (phase !== "show") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "show") return;
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => finish());
    }
  }, [phase, finish]);

  if (phase === "check" || phase === "done") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("splashAria")}
      className={cn(
        "fixed inset-0 z-[200] flex flex-col bg-black transition-opacity duration-[420ms] ease-out",
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={SPLASH_SRC}
        playsInline
        muted
        preload="auto"
        poster="/hero-poster.svg"
        onEnded={finish}
        onError={finish}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 to-transparent" aria-hidden />

      <div className="relative z-10 mt-auto flex justify-center p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={finish}
          className="pointer-events-auto min-h-12 rounded-full border border-white/25 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        >
          {t("splashSkip")}
        </button>
      </div>
    </div>
  );
}
