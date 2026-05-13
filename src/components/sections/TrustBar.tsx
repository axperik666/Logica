"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Brand = { label: string; abbr: string };

function LogoTile({ label, abbr }: Brand) {
  return (
    <div
      className={cn(
        "group/tile relative flex h-[4.35rem] w-[8.75rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-[rgba(5,10,28,0.72)] px-4 shadow-[0_12px_40px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-500 sm:h-[4.85rem] sm:w-[10.25rem]",
        "grayscale-[0.82] contrast-[1.06]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cyan-400/20 before:via-transparent before:to-violet-500/15 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "hover:grayscale-0 hover:border-cyan-400/50 hover:shadow-[0_0_36px_rgba(34,211,238,0.28),0_20px_56px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] motion-safe:hover:-translate-y-0.5"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden
      />
      <span
        aria-hidden
        className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/20 text-xs font-bold tracking-tight text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-white/15 transition duration-500 group-hover/tile:from-cyan-400/45 group-hover/tile:to-violet-400/25 group-hover/tile:text-white group-hover/tile:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
      >
        {abbr}
      </span>
      <span className="relative mt-2 max-w-[9rem] truncate text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white/58 transition group-hover/tile:text-white/92 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export function TrustBar() {
  const t = useTranslations("trustBar");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.06 });

  const raw = t.raw("brands");
  const brands = Array.isArray(raw) ? (raw as Brand[]) : [];
  const half = Math.ceil(brands.length / 2);
  const rowA = brands.slice(0, half);
  const rowB = brands.slice(half);
  const rowADouble = [...rowA, ...rowA];
  const rowBDouble = [...rowB, ...rowB];

  return (
    <MotionSection
      ref={ref}
      id="trust-bar"
      className="full-bleed relative overflow-x-clip border-y border-white/[0.08] bg-[linear-gradient(180deg,rgba(4,8,22,0.96)_0%,rgba(3,5,14,0.98)_50%,rgba(5,9,22,0.95)_100%)] py-12 sm:py-16"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(0,200,255,0.14),transparent_58%),radial-gradient(ellipse_50%_45%_at_0%_60%,rgba(139,92,246,0.09),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-screen"
        aria-hidden
      >
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
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-200" aria-hidden />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-5 text-balance text-xl font-semibold tracking-tight text-white sm:mt-6 sm:text-2xl md:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/68 sm:mt-4 sm:text-base">
            {t("subtitle")}
          </p>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.55, delay: 0.06 } }
          }}
          className={cn(
            "group-trust-marquee relative mx-auto mt-10 max-w-[100vw] overflow-hidden rounded-[1.65rem] border border-white/[0.1] bg-gradient-to-b from-white/[0.05] to-transparent px-4 py-6 shadow-[0_24px_72px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:mt-12 sm:rounded-[1.85rem] sm:px-6 sm:py-8",
            !reduceMotion && "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
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
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
