"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Zap } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { cn } from "@/lib/cn";
import { useCardTilt } from "@/hooks/useCardTilt";
import { TrustBarLogoTile, type TrustBrand } from "@/components/sections/TrustBarLogoTile";

type Brand = TrustBrand;
type Stat = { value: string; label: string };


function FeaturedCard({
  caseId,
  index,
  hero = false
}: {
  caseId: string;
  index: number;
  hero?: boolean;
}) {
  const t = useTranslations("trustBar");
  const tCases = useTranslations("cases");
  const base = `items.${caseId}`;
  const { ref, rotateX, rotateY, onPointerMove, onPointerLeave, disabled } = useCardTilt({
    maxDeg: hero ? 5 : 6,
    stiffness: 200
  });

  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0, y: hero ? 20 : 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.52, delay: 0.1 + index * 0.08 }
        }
      }}
      className={cn("h-full [perspective:1200px]", hero && "lg:min-h-[18.5rem]")}
    >
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d",
          height: "100%"
        }}
        className={cn(
          "group/feat relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.1] p-5 backdrop-blur-xl transition-all duration-500 sm:p-6",
        "bg-[linear-gradient(155deg,rgba(255,255,255,0.09)_0%,rgba(10,14,32,0.88)_38%,rgba(4,8,20,0.96)_100%)]",
        "shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]",
        "hover:border-cyan-400/40 hover:shadow-[0_28px_72px_rgba(0,0,0,0.5),0_0_56px_rgba(34,211,238,0.14)]",
        "motion-safe:hover:-translate-y-1"
      )}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl transition duration-700 group-hover/feat:bg-violet-500/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-400/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
          <Zap className="h-3 w-3 text-cyan-300/90" aria-hidden />
          {tCases(`${base}.niche`)}
        </span>
        {hero ? (
          <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-100/90">
            {t("featuredHeroTag")}
          </span>
        ) : null}
      </div>

      <p
        className={cn(
          "relative mt-5 font-bold tabular-nums tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-300/90",
          hero ? "text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-none" : "text-2xl sm:text-3xl"
        )}
      >
        {tCases(`${base}.result`)}
      </p>
      <p className="relative mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
        {tCases(`${base}.period`)}
      </p>

      <h3
        className={cn(
          "relative font-semibold tracking-tight text-white",
          hero ? "mt-6 text-xl sm:text-2xl" : "mt-4 text-lg sm:text-xl"
        )}
      >
        {tCases(`${base}.client`)}
      </h3>
      <p
        className={cn(
          "relative mt-2 text-sm leading-relaxed text-white/62",
          hero ? "line-clamp-3 sm:text-base" : "line-clamp-2"
        )}
      >
        {tCases(`${base}.summary`)}
      </p>

      <Link
        href="/kejsy"
        className={cn(
          "relative mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white",
          hero ? "pt-6" : "pt-5"
        )}
      >
        {t("featuredCta")}
        {hero ? (
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/feat:translate-x-0.5 group-hover/feat:-translate-y-0.5" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform group-hover/feat:translate-x-0.5" />
        )}
      </Link>
      </motion.div>
    </MotionDiv>
  );
}

export function TrustBar() {
  const t = useTranslations("trustBar");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.06 });

  const rawBrands = t.raw("brands");
  const brands = Array.isArray(rawBrands) ? (rawBrands as Brand[]) : [];
  const rawStats = t.raw("stats");
  const stats = Array.isArray(rawStats) ? (rawStats as Stat[]) : [];
  const rawFeatured = t.raw("featuredCaseIds");
  const featuredCaseIds = Array.isArray(rawFeatured) ? (rawFeatured as string[]) : [];
  const rawPillars = t.raw("pillars");
  const pillars = Array.isArray(rawPillars) ? (rawPillars as string[]) : [];

  const half = Math.ceil(brands.length / 2);
  const rowA = brands.slice(0, half);
  const rowB = brands.slice(half);
  const rowADouble = [...rowA, ...rowA];
  const rowBDouble = [...rowB, ...rowB];

  const [heroCaseId, ...sideCaseIds] = featuredCaseIds;

  return (
    <MotionSection
      ref={ref}
      id="trust-bar"
      className="full-bleed relative overflow-x-clip border-y border-white/[0.08] bg-[#03050e] py-16 sm:py-24"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_15%_-10%,rgba(0,200,255,0.18),transparent_55%),radial-gradient(ellipse_70%_50%_at_95%_20%,rgba(139,92,246,0.14),transparent_50%),radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(34,211,238,0.08),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-screen" aria-hidden>
        <div className="premium-aurora !relative !inset-auto min-h-[150%] -translate-y-[20%] opacity-80" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_30%,black,transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" aria-hidden />

      <div className="site-container relative">
        <div className="sr-only">
          <p>{tSec("trustBar.metaTitle")}</p>
          <p>{tSec("trustBar.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
          }}
          className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12"
        >
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-gradient-to-r from-cyan-500/[0.18] via-white/[0.05] to-violet-500/[0.12] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-50/95 shadow-[0_0_32px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-200" aria-hidden />
              {t("badge")}
            </div>
            <h2 className="mt-5 text-balance text-2xl font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl lg:text-[2.35rem] lg:leading-[1.12]">
              <span className="block text-white/92">{t("titlePrefix")}</span>
              <span className="brand-glow mt-1 block bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/65 sm:text-base lg:mx-0">
              {t("subtitle")}
            </p>
          </div>

          {stats.length > 0 ? (
            <ul className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-3">
              {stats.map((s, i) => (
                <li
                  key={`${s.label}-${i}`}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] px-3 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md sm:px-4 sm:py-4"
                >
                  <div
                    className="pointer-events-none absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-cyan-300/80 to-violet-400/60"
                    aria-hidden
                  />
                  <p className="pl-2 text-xl font-bold tabular-nums tracking-tight text-white sm:text-2xl">{s.value}</p>
                  <p className="pl-2 mt-1 text-[9px] font-semibold uppercase leading-snug tracking-[0.1em] text-white/48 sm:text-[10px]">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </MotionDiv>

        {pillars.length > 0 ? (
          <MotionDiv
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4, delay: 0.08 } } }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:mt-10 lg:justify-start"
          >
            {pillars.map((line) => (
              <span
                key={line}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/72 backdrop-blur-sm sm:text-xs"
              >
                {line}
              </span>
            ))}
          </MotionDiv>
        ) : null}

        {featuredCaseIds.length > 0 ? (
          <MotionDiv
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.45, delay: 0.12 } }
            }}
            className="mt-12 sm:mt-16"
          >
            <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
                  {t("featuredKicker")}
                </p>
                <p className="mt-1 max-w-md text-sm text-white/50">{t("featuredLead")}</p>
              </div>
              <Link
                href="/kejsy"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition hover:text-cyan-200"
              >
                {t("featuredViewAll")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
              {heroCaseId ? (
                <div className="lg:col-span-7 lg:row-span-2">
                  <FeaturedCard caseId={heroCaseId} index={0} hero />
                </div>
              ) : null}
              {sideCaseIds.map((id, i) => (
                <div key={id} className="lg:col-span-5">
                  <FeaturedCard caseId={id} index={i + 1} />
                </div>
              ))}
            </div>
          </MotionDiv>
        ) : null}

        <MotionDiv
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.55, delay: 0.16 } }
          }}
          className="mt-14 sm:mt-16"
        >
          <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
              {t("marqueeKicker")}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100/90">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t("marqueeLive")}
            </span>
          </div>

          <div
            className={cn(
              "trust-marquee-stage group-trust-marquee relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] py-7 shadow-[0_28px_80px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg sm:py-9",
              !reduceMotion && "[mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]"
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-24 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_70%)]"
              aria-hidden
            />
            {!reduceMotion ? (
              <>
                <div className="relative overflow-hidden pb-2">
                  <div className="home-logo-marquee-track flex w-max gap-3 px-2 sm:gap-4">
                    {rowADouble.map((b, i) => (
                      <TrustBarLogoTile key={`a-${b.label}-${i}`} {...b} index={i % rowA.length} />
                    ))}
                  </div>
                </div>
                <div className="relative overflow-hidden pt-2">
                  <div className="home-logo-marquee-track-reverse flex w-max gap-3 px-2 sm:gap-4">
                    {rowBDouble.map((b, i) => (
                      <TrustBarLogoTile key={`b-${b.label}-${i}`} {...b} index={i % rowB.length} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="relative flex flex-wrap justify-center gap-3 px-4 sm:gap-4">
                {brands.map((b, i) => (
                  <TrustBarLogoTile key={b.label} {...b} index={i} />
                ))}
              </div>
            )}
          </div>
          <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-relaxed text-white/40 lg:text-left">
            {t("footnote")}
          </p>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.2 } }
          }}
          className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
        >
          <Link
            href="/kejsy"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/18 bg-white/[0.04] px-8 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] sm:flex-none sm:min-w-[12rem]"
          >
            {t("ctaCases")}
          </Link>
          <Link
            href="/kontakty"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 px-8 text-sm font-semibold text-[#041018] shadow-[0_0_40px_rgba(34,211,238,0.38)] transition hover:brightness-105 motion-safe:hover:scale-[1.02] sm:flex-none sm:min-w-[14rem]"
          >
            {t("ctaContact")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
