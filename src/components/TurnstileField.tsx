"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      reset?: (widgetId: string) => void;
    };
  }
}

type Props = {
  onToken: (token: string | null) => void;
};

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;
  turnstileScriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile script"));
    document.head.appendChild(s);
  });
  return turnstileScriptPromise;
}

/** Cloudflare Turnstile — показывается только при NEXT_PUBLIC_TURNSTILE_SITE_KEY. */
export function TurnstileField({ onToken }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const hostRef = useRef<HTMLDivElement>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey || !hostRef.current) return;
    let cancelled = false;

    void (async () => {
      try {
        await loadTurnstileScript();
        if (cancelled || !hostRef.current || !window.turnstile) return;
        void window.turnstile.render(hostRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onTokenRef.current(token),
          "error-callback": () => onTokenRef.current(null),
          "expired-callback": () => onTokenRef.current(null)
        });
      } catch {
        onTokenRef.current(null);
      }
    })();

    return () => {
      cancelled = true;
      onTokenRef.current(null);
    };
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <div className="flex min-h-[65px] justify-center [&_iframe]:max-w-full">
      <div ref={hostRef} />
    </div>
  );
}
