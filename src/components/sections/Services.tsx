"use client";

import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Wand2,
  Workflow,
  type LucideIcon
} from "lucide-react";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/motion/RevealSection";
import { sectionRevealTransition, sectionRevealViewport } from "@/lib/sectionReveal";

const HOME_TILE_IDS = ["perf", "strategy", "creative", "funnel"] as const;

const TILE_ICONS: Record<(typeof HOME_TILE_IDS)[number], LucideIcon> = {
  perf: TrendingUp,
  strategy: Target,
  creative: Wand2,
  funnel: Workflow
};

export function Services() {
  const t = useTranslations("services");

  return (
    <RevealSection
      id="services"
      className="relative isolate overflow-hidden bg-[#06070e] py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,180,255,0.07),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/75">
            {t("homeSectionEyebrow")}
          </p>
          <h2 className="mb-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-[3.25rem]">
            {t("homeSectionTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-white/58 sm:text-xl">
            {t("homeSectionSubtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {HOME_TILE_IDS.map((id, i) => {
            const Icon = TILE_ICONS[id];
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionRevealViewport}
                transition={sectionRevealTransition(i * 0.08)}
                className="group rounded-3xl border border-white/[0.09] bg-[linear-gradient(165deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/25 hover:shadow-[0_20px_50px_rgba(0,180,255,0.08)] sm:p-10"
              >
                <div
                  className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300 shadow-[0_0_32px_rgba(34,211,238,0.12)] transition group-hover:border-cyan-400/35 group-hover:bg-cyan-400/[0.12]"
                  aria-hidden
                >
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white transition group-hover:text-cyan-200 sm:text-3xl">
                  {t(`homeTiles.${id}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-white/60 sm:text-lg">
                  {t(`homeTiles.${id}.desc`)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}

export default Services;
