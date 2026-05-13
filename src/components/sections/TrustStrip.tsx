"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import {
  SECTION_REVEAL_EASE,
  sectionRevealTransition,
  sectionRevealViewport
} from "@/lib/sectionReveal";

export function TrustStrip() {
  const t = useTranslations("trustStrip");
  const reduceMotion = useReducedMotion();
  const raw = t.raw("items");
  const items = Array.isArray(raw) ? (raw as string[]) : [];

  if (items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionRevealViewport}
      transition={sectionRevealTransition(0)}
      className="relative z-10 overflow-hidden border-b border-white/[0.08] bg-[linear-gradient(180deg,rgba(5,8,20,0.97)_0%,rgba(3,5,14,0.94)_45%,rgba(4,7,18,0.98)_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-30%,rgba(0,200,255,0.14),transparent_58%),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(139,92,246,0.08),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-screen"
        aria-hidden
      >
        <div className="premium-aurora !relative !inset-auto min-h-[120%] -translate-y-1/4 opacity-70 md:opacity-90" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionRevealViewport}
          transition={sectionRevealTransition(0.04)}
          className="mb-6 flex justify-center sm:mb-8"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/[0.14] via-white/[0.04] to-violet-500/[0.12] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-100/95 shadow-[0_0_32px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md sm:text-[11px] sm:tracking-[0.28em]">
            {t("kicker")}
          </span>
        </motion.div>

        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {items.map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionRevealViewport}
              transition={{
                duration: reduceMotion ? 0 : 0.48,
                delay: reduceMotion ? 0 : 0.06 + i * 0.1,
                ease: SECTION_REVEAL_EASE
              }}
              className={cn(
                "group/trust-card relative flex gap-3 overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-4 py-4 text-sm leading-snug text-white/85 shadow-[0_18px_50px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 sm:flex-col sm:items-center sm:px-5 sm:py-5 sm:text-center sm:leading-relaxed",
                "hover:border-cyan-400/35 hover:shadow-[0_22px_56px_rgba(0,0,0,0.42),0_0_40px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]",
                "motion-safe:hover:-translate-y-0.5"
              )}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-80"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-opacity duration-500 group-hover/trust-card:opacity-100 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
                aria-hidden
              />
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/25 to-cyan-600/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-white/15 sm:mb-2 sm:h-10 sm:w-10">
                <Check className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="relative text-pretty font-medium tracking-tight text-white/88">{line}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
