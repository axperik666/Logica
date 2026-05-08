"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  BadgeCheck,
  Gauge,
  Headphones,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";

const BENEFIT_ICONS: Record<string, LucideIcon> = {
  target: Target,
  sparkles: Sparkles,
  gauge: Gauge,
  shield: ShieldCheck,
  chart: LineChart,
  support: Headphones
};

type Stat = { value: string; label: string };
type Benefit = { icon: string; title: string; desc: string };

export function WhyUs() {
  const t = useTranslations("whyUs");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 100px 0px"
  });

  const statsRaw = t.raw("stats");
  const stats = Array.isArray(statsRaw) ? (statsRaw as Stat[]) : [];
  const benefitsRaw = t.raw("benefits");
  const benefits = Array.isArray(benefitsRaw) ? (benefitsRaw as Benefit[]) : [];

  return (
    <MotionSection
      ref={ref}
      id="why-us"
      className="tech-bg relative py-20 container-px"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.04
          }
        }
      }}
    >
      <div className="sr-only">
        <p>{tSec("whyUs.metaTitle")}</p>
        <p>{tSec("whyUs.metaDescription")}</p>
      </div>

      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,191,255,0.2)] bg-[rgba(0,191,255,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7AE0FF]">
          <BadgeCheck className="h-4 w-4" aria-hidden />
          {t("badge")}
        </div>
        <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
      </MotionDiv>

      {stats.length > 0 ? (
        <MotionDiv
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 }
            }
          }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4"
        >
          {stats.map((s, i) => (
            <MotionDiv
              key={`${s.label}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="glass hover-lift rounded-2xl px-4 py-5 text-center sm:px-5"
            >
              <div className="brand-glow text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50 sm:text-xs">
                {s.label}
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      ) : null}

      <MotionDiv
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.06, delayChildren: 0.08 }
          }
        }}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {benefits.map((b, idx) => {
          const Icon = BENEFIT_ICONS[b.icon] ?? Sparkles;
          return (
            <MotionDiv
              key={b.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: idx * 0.05 }
                }
              }}
              className="glass hover-lift group rounded-3xl p-6 transition-[box-shadow] duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(0,191,255,0.28)] bg-[rgba(0,191,255,0.1)] shadow-[0_0_28px_rgba(0,191,255,0.18)] transition group-hover:border-[rgba(0,191,255,0.45)] group-hover:shadow-[0_0_36px_rgba(0,191,255,0.28)]">
                <Icon className="h-6 w-6 text-[#7AE0FF]" aria-hidden />
              </div>
              <h3 className="brand-glow mt-4 text-base font-semibold leading-snug">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{b.desc}</p>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </MotionSection>
  );
}
