"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { sectionRevealTransition, sectionRevealViewport } from "@/lib/sectionReveal";

export function TrustStrip() {
  const t = useTranslations("trustStrip");
  const raw = t.raw("items");
  const items = Array.isArray(raw) ? (raw as string[]) : [];

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionRevealViewport}
      transition={sectionRevealTransition(0)}
      className="relative z-10 border-b border-white/[0.07] bg-[linear-gradient(180deg,rgba(6,8,18,0.92)_0%,rgba(4,6,14,0.88)_100%)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80 sm:text-[11px]">
          {t("kicker")}
        </p>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-6">
          {items.map((line, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm leading-snug text-white/80 sm:flex-col sm:items-center sm:text-center sm:leading-relaxed"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300 sm:mb-1">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="text-pretty">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
