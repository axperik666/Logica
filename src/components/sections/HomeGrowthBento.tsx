"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { RevealSection } from "@/components/motion/RevealSection";
import { sectionRevealTransition, sectionRevealViewport } from "@/lib/sectionReveal";

const tileMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: sectionRevealViewport,
  transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const }
} as const;

function TileShell({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      {...tileMotion}
      transition={sectionRevealTransition(delay)}
      className={`flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(18,22,38,0.85)_0%,rgba(8,10,20,0.92)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-cyan-400/25 hover:shadow-[0_20px_56px_rgba(0,180,255,0.08)] md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function HomeGrowthBento() {
  const t = useTranslations("homeBento");
  const logos = t.raw("logos") as string[];
  const marqueeItems = [...logos, ...logos];

  return (
    <RevealSection
      className="relative isolate overflow-hidden bg-[#05060e] py-24"
      aria-labelledby="home-bento-heading"
    >
      <div className="premium-aurora opacity-[0.85]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        aria-hidden
      />
      <div className="relative z-[2] mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#00b4ff]/90">
            {t("kicker")}
          </p>
          <h2
            id="home-bento-heading"
            className="mb-4 text-4xl font-bold tracking-tighter text-white md:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-400 md:text-xl">{t("subtitle")}</p>
        </div>

        <div className="mb-14 md:mb-16">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
            {t("logoStripLabel")}
          </p>
          <div
            className="home-logo-marquee relative -mx-6 overflow-hidden py-2 md:mx-0"
            role="region"
            aria-label={t("logoStripAria")}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#05060e] to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#05060e] to-transparent md:w-24" />
            <div className="home-logo-marquee-track flex w-max gap-10 md:gap-14">
              {marqueeItems.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="shrink-0 select-none font-semibold tracking-tight text-white/35"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
          <TileShell
            className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2"
            delay={0}
          >
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00b4ff]">
                {t("tileLargeEyebrow")}
              </p>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {t("tileLargeTitle")}
              </h3>
              <p className="text-base leading-relaxed text-gray-400 md:text-lg">{t("tileLargeBody")}</p>
            </div>
          </TileShell>

          <TileShell delay={0.05}>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                {t("tileStat1K")}
              </p>
              <p className="text-2xl font-bold text-white md:text-3xl">{t("tileStat1V")}</p>
            </div>
          </TileShell>

          <TileShell delay={0.1}>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                {t("tileStat2K")}
              </p>
              <p className="text-2xl font-bold text-white md:text-3xl">{t("tileStat2V")}</p>
            </div>
          </TileShell>

          <TileShell className="md:col-span-2 lg:col-span-2 lg:col-start-3" delay={0.12}>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                {t("tileStat3K")}
              </p>
              <p className="text-2xl font-bold text-white md:text-3xl">{t("tileStat3V")}</p>
            </div>
          </TileShell>

          <TileShell delay={0.14}>
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00b4ff]">
                  {t("tileCtaEyebrow")}
                </p>
                <h3 className="mb-3 text-xl font-semibold text-white">{t("tileCtaTitle")}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{t("tileCtaBody")}</p>
              </div>
              <Link
                href="/kontakty"
                className="mt-6 inline-flex min-h-0 items-center justify-center rounded-2xl bg-white/95 px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-white"
              >
                {t("tileCtaButton")}
              </Link>
            </div>
          </TileShell>

          <TileShell delay={0.16}>
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00b4ff]">
                  {t("tileCasesEyebrow")}
                </p>
                <h3 className="mb-3 text-xl font-semibold text-white">{t("tileCasesTitle")}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{t("tileCasesBody")}</p>
              </div>
              <Link
                href="/kejsy"
                className="mt-6 inline-flex min-h-0 items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-[#00b4ff]/50 hover:text-[#00b4ff]"
              >
                {t("tileCasesButton")}
              </Link>
            </div>
          </TileShell>

          <TileShell delay={0.18}>
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00b4ff]">
                  {t("tileSiteEyebrow")}
                </p>
                <h3 className="mb-3 text-xl font-semibold text-white">{t("tileSiteTitle")}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{t("tileSiteBody")}</p>
              </div>
              <Link
                href="/sozdanie-sajta"
                className="mt-6 inline-flex min-h-0 items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-[#00b4ff]/50 hover:text-[#00b4ff]"
              >
                {t("tileSiteButton")}
              </Link>
            </div>
          </TileShell>

          <TileShell delay={0.2}>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00b4ff]">
                {t("tileSpeedEyebrow")}
              </p>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("tileSpeedTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{t("tileSpeedBody")}</p>
            </div>
          </TileShell>
        </div>
      </div>
    </RevealSection>
  );
}

export default HomeGrowthBento;
