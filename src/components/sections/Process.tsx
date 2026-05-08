"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  PenTool,
  Rocket,
  Search,
  type LucideIcon
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";

const STEP_ICONS: Record<string, LucideIcon> = {
  search: Search,
  pen: PenTool,
  rocket: Rocket,
  chart: BarChart3,
  report: ClipboardList
};

type Step = { icon: string; title: string; desc: string };

export function Process() {
  const t = useTranslations("process");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.06,
    margin: "0px 0px 120px 0px"
  });

  const stepsRaw = t.raw("steps");
  const steps = Array.isArray(stepsRaw) ? (stepsRaw as Step[]) : [];

  return (
    <MotionSection
      ref={ref}
      id="process"
      className="tech-bg relative py-20 container-px"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.09,
            delayChildren: 0.05
          }
        }
      }}
    >
      <div className="sr-only">
        <p>{tSec("process.metaTitle")}</p>
        <p>{tSec("process.metaDescription")}</p>
      </div>

      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          {t("badge")}
        </div>
        <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
      </MotionDiv>

      <div className="relative mx-auto mt-14 max-w-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[2.125rem] top-10 bottom-10 w-px bg-gradient-to-b from-[#00BFFF]/55 via-[#00BFFF]/22 to-transparent sm:left-[2.375rem]"
        />

        <ol className="relative space-y-5 sm:space-y-7">
          {steps.map((step, idx) => {
            const Icon = STEP_ICONS[step.icon] ?? Search;
            const num = String(idx + 1).padStart(2, "0");
            return (
              <MotionDiv
                key={step.title}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
                className="relative flex gap-4 pl-0 sm:gap-6"
              >
                <div className="relative z-[1] flex w-[4.25rem] shrink-0 flex-col items-center sm:w-[4.75rem]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#00BFFF] bg-[linear-gradient(145deg,rgba(0,191,255,0.22),rgba(10,10,31,0.95))] font-mono text-lg font-bold tabular-nums text-[#9AE8FF] shadow-[0_0_36px_rgba(0,191,255,0.35)] sm:h-16 sm:w-16 sm:text-xl">
                    {num}
                  </span>
                  <span className="sr-only">
                    {t("stepLabel", { n: idx + 1 })}
                  </span>
                </div>

                <div className="glass hover-lift min-w-0 flex-1 rounded-3xl p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(0,191,255,0.35)] bg-[rgba(0,191,255,0.12)] shadow-[0_0_28px_rgba(0,191,255,0.18)]">
                      <Icon className="h-6 w-6 text-[#7AE0FF]" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#00BFFF]/75">
                        {t("stepLabel", { n: idx + 1 })}
                      </p>
                      <h3 className="brand-glow mt-1 text-lg font-semibold leading-snug">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/68">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </ol>
      </div>
    </MotionSection>
  );
}
