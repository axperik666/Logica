"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { BarChart3, Coins, FolderKanban, Timer } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useLocale, useTranslations } from "next-intl";

type Metric = {
  icon: "projects" | "roi" | "revenue" | "ltv";
  suffix: string;
  decimals: number;
  value: number;
  label: string;
  sub?: string;
};

const ICONS = {
  projects: FolderKanban,
  roi: BarChart3,
  revenue: Coins,
  ltv: Timer
};

function MetricCard({
  metric,
  inView,
  reduceMotion
}: {
  metric: Metric;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const target = Number(metric.value);
  const [display, setDisplay] = useState(() => (reduceMotion ? target : 0));
  const Icon = ICONS[metric.icon];

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion || !Number.isFinite(target)) {
      setDisplay(target);
      return;
    }
    const ctrl = animate(0, target, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => setDisplay(target)
    });
    return () => ctrl.stop();
  }, [inView, target, reduceMotion]);

  const formatted =
    metric.decimals > 0
      ? display.toFixed(metric.decimals)
      : Math.round(display).toString();

  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-500 hover:border-cyan-400/25 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/18"
      />
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.2)]">
          <Icon className="h-6 w-6 text-cyan-200" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              {formatted}
              {metric.suffix}
            </span>
          </p>
          <p className="mt-2 text-sm font-semibold leading-snug text-white/88">{metric.label}</p>
          {metric.sub ? (
            <p className="mt-1 text-xs leading-relaxed text-white/45">{metric.sub}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Results() {
  const t = useTranslations("homeResults");
  const tSec = useTranslations("sectionsSeo");
  const locale = useLocale();
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef(null);
  /** Раньше срабатываем на мобильных; без отрицательного margin — секция не «зависает» невидимой. */
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "0px 0px 20% 0px" });

  const raw = t.raw("metrics");
  const metrics = Array.isArray(raw) ? (raw as Metric[]) : [];

  return (
    <MotionSection
      ref={ref}
      id="results"
      className="full-bleed tech-bg relative overflow-x-clip py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } }
      }}
    >
      <div className="site-container">
        <div className="sr-only">
          <p>{tSec("results.metaTitle")}</p>
          <p>{tSec("results.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/85">{t("badge")}</p>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5 xl:grid-cols-4"
          key={locale}
        >
          {metrics.map((m) => (
            <MotionDiv
              key={m.label}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              <MetricCard metric={m} inView={isInView} reduceMotion={reduceMotion} />
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
