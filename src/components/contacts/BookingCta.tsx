"use client";

import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

/** Ссылка на Cal.com / Calendly и т.п., если задан `NEXT_PUBLIC_BOOKING_URL`. */
export function BookingCta() {
  const t = useTranslations("contactsPage");
  if (!BOOKING_URL) return null;

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-violet-400/35 bg-violet-500/10 px-5 py-3.5 text-sm font-semibold text-violet-100 transition hover:border-violet-400/55 hover:bg-violet-500/[0.14]"
    >
      <Calendar className="h-4 w-4 shrink-0" aria-hidden />
      {t("bookCall")}
    </a>
  );
}
