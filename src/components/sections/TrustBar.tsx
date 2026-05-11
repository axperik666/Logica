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
        "group/tile flex h-[4.25rem] w-[8.5rem] shrink-0 flex-col items-center justify-center rounded-2xl border border-white/[0.12] bg-[rgba(5,9,24,0.72)] px-4 backdrop-blur-xl transition-all duration-500 sm:h-[4.75rem] sm:w-[10rem]",
        "grayscale-[0.85] contrast-[1.05]",
        "hover:grayscale-0 hover:border-cyan-400/45 hover:shadow-[0_0_32px_rgba(34,211,238,0.35),0_16px_48px_rgba(0,0,0,0.45)]"
      )}
    >
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/25 to-violet-500/15 text-xs font-bold tracking-tight text-cyan-100/90 shadow-inner ring-1 ring-white/10 transition group-hover/tile:from-cyan-400/40 group-hover/tile:text-white"
      >
        {abbr}
      </span>
      <span className="mt-2 max-w-[9rem] truncate text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55 transition group-hover/tile:text-white/90 sm:text-[11px]">
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
      className="full-bleed relative overflow-x-clip border-y border-white/[0.06] bg-[linear-gradient(180deg,rgba(6,10,22,0.92)_0%,rgba(4,6,14,0.96)_100%)] py-12 sm:py-16"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,180,255,0.08),transparent_55%)]"
        aria-hidden
      />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-4 text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-white/65 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.55, delay: 0.06 } }
          }}
          className={cn(
            "group-trust-marquee relative mx-auto mt-10 max-w-[100vw] space-y-4 overflow-hidden px-0 sm:mt-12 sm:space-y-5",
            !reduceMotion && "[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
          )}
        >
          {!reduceMotion ? (
            <>
              <div className="overflow-hidden">
                <div className="home-logo-marquee-track flex w-max gap-3 sm:gap-4">
                  {rowADouble.map((b, i) => (
                    <LogoTile key={`a-${b.label}-${i}`} {...b} />
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
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
