"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { MessageCircle, Sparkles } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";

const SHOW_AFTER_PX = 380;

export function FloatingMobileCta() {
  const t = useTranslations("floatingCta");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onScroll = () => {
      if (!mq.matches) {
        setVisible(false);
        return;
      }
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    const mqListener = () => onScroll();
    mq.addEventListener("change", mqListener);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", mqListener);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2 md:hidden">
      <a
        href={CONTACTS.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsappAria")}
        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-[linear-gradient(135deg,rgba(16,185,129,0.22),rgba(12,16,32,0.92))] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-[0_8px_28px_rgba(16,185,129,0.2)] backdrop-blur-md transition hover:border-emerald-400/55 hover:brightness-110 active:scale-[0.98]"
      >
        <MessageCircle className="h-4 w-4 text-emerald-200" aria-hidden />
        <span className="sr-only sm:not-sr-only">{t("whatsappLabel")}</span>
      </a>
      <Link
        href="/kontakty"
        aria-label={t("ariaLabel")}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-[linear-gradient(135deg,rgba(0,191,255,0.22),rgba(12,16,32,0.92))] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_32px_rgba(0,191,255,0.25)] backdrop-blur-md transition hover:border-cyan-400/55 hover:brightness-110 active:scale-[0.98]"
      >
        <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden />
        {t("label")}
      </Link>
    </div>
  );
}
