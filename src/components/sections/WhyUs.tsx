"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import {
  BadgeCheck,
  Code2,
  FileText,
  Layers,
  MessageCircle,
  Target,
  TrendingUp,
  type LucideIcon
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";

const CARD_ICONS: Record<string, LucideIcon> = {
  profit: Target,
  nextjs: Code2,
  messenger: MessageCircle,
  roigrowth: TrendingUp,
  fullcycle: Layers,
  transparency: FileText
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

        <MotionDiv
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.07, delayChildren: 0.08 }
            }
          }}
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5"
        >
          {cards.map((c, idx) => {
            const Icon = CARD_ICONS[c.icon] ?? Target;
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
              >
                <motion.div
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_20px_64px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 sm:p-6"
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 24 }
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[rgba(0,191,255,0.08)] blur-2xl transition group-hover:bg-[rgba(0,191,255,0.2)]"
                  />
                  <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(0,191,255,0.32)] bg-[rgba(0,191,255,0.1)] shadow-[0_0_32px_rgba(0,191,255,0.22)] transition group-hover:border-[rgba(0,191,255,0.5)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6 text-[#7AE0FF] sm:h-7 sm:w-7" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">{c.headline}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/62">{c.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
