"use client";

import { MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/contacts";

export function LeadMessengersHint() {
  const t = useTranslations("leads");

  return (
    <div className="mt-6 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4">
      <p className="text-sm text-white/70">{t("successMessengersHint")}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
        <a
          href={CONTACTS.telegramHttps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/35 bg-primary/12 text-white shadow-[0_8px_36px_rgba(0,191,255,0.18)] transition hover:border-primary/55 hover:bg-primary/20"
          aria-label={t("ariaTelegram")}
        >
          <Send className="h-7 w-7 text-primary" aria-hidden />
        </a>
        <a
          href={CONTACTS.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-white shadow-[0_8px_36px_rgba(16,185,129,0.12)] transition hover:border-emerald-400/45 hover:bg-emerald-500/15"
          aria-label={t("ariaWhatsapp")}
        >
          <MessageCircle className="h-7 w-7 text-emerald-400" aria-hidden />
        </a>
      </div>
    </div>
  );
}
