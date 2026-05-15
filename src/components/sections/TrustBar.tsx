"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { cn } from "@/lib/cn";

type Brand = { label: string; abbr: string; niche?: string; win?: string };
type Stat = { value: string; label: string };

function LogoTile({ label, abbr, niche, win }: Brand) {
  const footer = niche || win;

  return (
    <div
      className={cn(
        "group/tile relative flex h-[5rem] w-[9.25rem] shrink-0 flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.09] to-[rgba(5,10,28,0.78)] px-3 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-500 sm:h-[5.35rem] sm:w-[10.5rem] sm:py-3",
        "grayscale-[0.75] contrast-[1.05]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cyan-400/22 before:via-transparent before:to-violet-500/18 before:opacity-0 before:transition-opacity before:duration-500 group-hover/tile:before:opacity-100",
        "hover:grayscale-0 hover:border-cyan-400/45 hover:shadow-[0_0_40px_rgba(34,211,238,0.3),0_20px_56px_rgba(0,0,0,0.5)] motion-safe:hover:-translate-y-1"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        aria-hidden
      />
      <div className="flex flex-col items-center pt-0.5">
        <span
          aria-hidden
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/35 to-violet-500/22 text-[11px] font-bold tracking-tight text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-white/15 transition duration-500 group-hover/tile:from-cyan-400/50 group-hover/tile:to-violet-400/30 sm:h-9 sm:w-9 sm:text-xs"
        >
          {abbr}
        </span>
        <span className="relative mt-1.5 line-clamp-2 max-w-[8.25rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-white/62 transition group-hover/tile:text-white/95 sm:max-w-[9rem] sm:text-[11px]">
          {label}
        </span>
      </motion.div>

      {footer ? (
        <div className="relative flex min-h-[1.35rem] w-full items-center justify-center px-0.5">
          {niche ? (
            <span className="text-center text-[9px] font-medium uppercase leading-tight tracking-[0.12em] text-white/38 transition-opacity duration-200 group-hover/tile:opacity-0 sm:text-[10px]">
              {niche}
            </span>
          ) : null}
          {win ? (
            <span
              className={cn(
                "absolute inset-x-0 text-center text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-cyan-200/95 transition-opacity duration-200 sm:text-[10px]",
                niche ? "opacity-0 group-hover/tile:opacity-100" : "opacity-100"
              )}
            >
              <span className="line-clamp-2">{win}</span>
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function FeaturedCard({ caseId, index }: { caseId: string; index: number }) {
  const t = useTranslations("trustBar");
  const tCases = useTranslations("cases");
  const base = `items.${caseId}`;

  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.48, delay: 0.08 + index * 0.07 }
        }
      }}
      className="group/feat relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.11] bg-gradient-to-br from-white/[0.07] via-[rgba(8,12,28,0.85)] to-[rgba(4,8,20,0.92)] p-5 shadow-[0_20px_56px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-400 hover:border-cyan-400/35 hover:shadow-[0_24px_64px_rgba(0,0,0,0.45),0_0_48px_rgba(34,211,238,0.12)] motion-safe:hover:-translate-y-0.5 sm:p-6"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl transition group-hover/feat:bg-cyan-400/20"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
          {tCases(`${base}.niche`)}
        </span>
        <span className="shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/25 to-violet-500/20 px-2.5 py-1 text-sm font-bold tabular-nums text-cyan-50 ring-1 ring-cyan-400/25">
          {tCases(`${base}.result`)}
        </span>
      </div>
      <h3 className="relative mt-4 text-lg font-semibold tracking-tight text-white sm:text-xl">
        {tCases(`${base}.client`)}
      </h3>
      <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-white/62">{tCases(`${base}.summary`)}</p>
      <Link
        href="/kejsy"
        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200 transition hover:text-white"
      >
        {t("featuredCta")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover/feat:translate-x-0.5" aria-hidden />
      </Link>
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

  const half = Math.ceil(brands.length / 2);
  const rowA = brands.slice(0, half);
  const rowB = brands.slice(half);
  const rowADouble = [...rowA, ...rowA];
  const rowBDouble = [...rowB, ...rowB];

  return (
    <MotionSection
      ref={ref}
      id="trust-bar"
      className="full-bleed relative overflow-x-clip border-y border-white/[0.08] bg-[linear-gradient(180deg,rgba(4,8,22,0.96)_0%,rgba(3,5,14,0.98)_50%,rgba(5,9,22,0.95)_100%)] py-14 sm:py-20"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(0,200,255,0.16),transparent_58%),radial-gradient(ellipse_50%_45%_at_100%_60%,rgba(139,92,246,0.1),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-screen" aria-hidden>
        <div className="premium-aurora !relative !inset-auto min-h-[140%] -translate-y-[18%] opacity-75 md:opacity-90" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,black,transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" aria-hidden />

      <div className="site-container relative">
        <div className="sr-only">
          <p>{tSec("trustBar.metaTitle")}</p>
          <p>{tSec("trustBar.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-gradient-to-r from-cyan-500/[0.15] via-white/[0.04] to-violet-500/[0.1] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/95 shadow-[0_0_28px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-200" aria-hidden />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-5 text-balance text-xl font-semibold tracking-tight text-white sm:mt-6 sm:text-2xl md:text-[1.75rem] md:leading-tight lg:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
            {t("subtitle")}
          </p>

          {stats.length > 0 ? (
            <ul className="mt-8 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
              {stats.map((s, i) => (
                <li
                  key={`${s.label}-${i}`}
                  className="min-w-[7.5rem] flex-1 rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm sm:min-w-[8.5rem] sm:px-5 sm:py-3.5"
                >
                  <p className="text-2xl font-bold tabular-nums tracking-tight text-white sm:text-[1.65rem]">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50 sm:text-xs">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </MotionDiv>

        {featuredCaseIds.length > 0 ? (
          <MotionDiv
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.45, delay: 0.1 } }
            }}
            className="mt-12 sm:mt-14"
          >
            <div className="mb-5 flex items-center justify-center gap-2 sm:mb-6">
              <TrendingUp className="h-4 w-4 text-cyan-300/90" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                {t("featuredKicker")}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {featuredCaseIds.map((id, i) => (
                <FeaturedCard key={id} caseId={id} index={i} />
              ))}
            </div>
          </MotionDiv>
        ) : null}

        <MotionDiv
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.55, delay: 0.14 } }
          }}
          className="mt-12 sm:mt-14"
        >
          <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:mb-6">
            {t("marqueeKicker")}
          </p>
          <div
            className={cn(
              "group-trust-marquee relative mx-auto max-w-[100vw] overflow-hidden rounded-[1.65rem] border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-transparent px-4 py-6 shadow-[0_24px_72px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:rounded-[1.85rem] sm:px-6 sm:py-8",
              !reduceMotion && "[mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
            )}
          >
            {!reduceMotion ? (
              <>
                <div className="overflow-hidden pb-1">
                  <div className="home-logo-marquee-track flex w-max gap-3 sm:gap-4">
                    {rowADouble.map((b, i) => (
                      <LogoTile key={`a-${b.label}-${i}`} {...b} />
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden pt-2">
                  <div className="home-logo-marquee-track-reverse flex w-max gap-3 sm:gap-4">
                    {rowBDouble.map((b, i) => (
                      <LogoTile key={`b-${b.label}-${i}`} {...b} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {brands.map((b) => (
                  <LogoTile key={b.label} {...b} />
                ))}
              </div>
            )}
          </div>
          <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-relaxed text-white/42">{t("footnote")}</p>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.2 } }
          }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4"
        >
          <Link
            href="/kejsy"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.06] px-8 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.1] sm:w-auto"
          >
            {t("ctaCases")}
          </Link>
          <Link
            href="/kontakty"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-300 px-8 text-sm font-semibold text-[#041018] shadow-[0_0_32px_rgba(34,211,238,0.35)] transition hover:brightness-105 motion-safe:hover:scale-[1.02] sm:w-auto"
          >
            {t("ctaContact")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
