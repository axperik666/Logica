"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const STORAGE_KEY = "logica_cookie_consent_v1";

export function CookieConsent() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const v = window.localStorage.getItem(STORAGE_KEY);
      setVisible(v !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("ariaLabel")}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/[0.12] bg-[linear-gradient(180deg,rgba(8,10,22,0.97)_0%,rgba(4,6,14,0.99)_100%)] px-4 py-4 shadow-[0_-12px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6 sm:py-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-pretty text-sm leading-relaxed text-white/75">
          {t("message")}{" "}
          <Link
            href="/privacy"
            className="font-semibold text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-200"
          >
            {t("privacy")}
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_24px_rgba(0,180,255,0.3)] transition hover:brightness-110"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
