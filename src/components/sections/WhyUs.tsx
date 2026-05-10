"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  CircleDollarSign,
  FileBarChart,
  TrendingUp,
  UserCircle2,
  Zap,
  type LucideIcon
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { ParallaxFloat } from "@/components/ParallaxFloat";
import { useTranslations } from "next-intl";

const CARD_ICONS: Record<string, LucideIcon> = {
  trend: TrendingUp,
  roas: CircleDollarSign,
  zap: Zap,
  report: FileBarChart,
  history: CalendarDays,
  partner: UserCircle2
};

type WhyCard = {
  icon: string;
  headline: string;
  desc: string;
};

export function WhyUs() {
  const t = useTranslations("whyUs");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 100px 0px"
  });

  const raw = t.raw("cards");
  const cards = Array.isArray(raw) ? (raw as WhyCard[]) : [];

  return (
    <MotionSection
      ref={ref}
      id="why-us"
      className="full-bleed tech-bg relative overflow-x-clip py-24 lg:py-28"
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
      <div className="site-container">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,191,255,0.24)] bg-[rgba(0,191,255,0.09)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7AE0FF] shadow-[0_0_22px_rgba(0,191,255,0.14)]">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <ParallaxFloat>
          <MotionDiv
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.07, delayChildren: 0.08 }
              }
            }}
            className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {cards.map((c, idx) => {
              const Icon = CARD_ICONS[c.icon] ?? TrendingUp;
              return (
                <MotionDiv
                  key={c.headline}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.52, delay: idx * 0.02 }
                    }
                  }}
                  className="glass hover-lift group relative overflow-hidden rounded-3xl p-6 transition-[box-shadow,transform,border-color] duration-300 hover:border-[#00BFFF]/32 hover:shadow-[0_30px_92px_rgba(0,0,0,0.6),0_0_58px_rgba(0,191,255,0.18)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[rgba(0,191,255,0.08)] blur-2xl transition group-hover:bg-[rgba(0,191,255,0.18)]"
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[rgba(0,191,255,0.32)] bg-[rgba(0,191,255,0.1)] shadow-[0_0_32px_rgba(0,191,255,0.22)] transition group-hover:border-[rgba(0,191,255,0.48)]">
                      <Icon className="h-7 w-7 text-[#7AE0FF]" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="brand-glow text-lg font-semibold leading-snug tracking-tight">
                        {c.headline}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/62">{c.desc}</p>
                    </div>
                  </div>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </ParallaxFloat>
      </div>
    </MotionSection>
  );
}
