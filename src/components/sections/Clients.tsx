"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Building2 } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { HOME_CASE_IDS } from "@/content/homeCases";

/** Первые 10 кейсов на главной — имена брендов как «логотипы» (wordmark). */
const LOGO_COUNT = 10;

export function Clients() {
  const t = useTranslations("clients");
  const tCases = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 100px 0px"
  });

  const ids = HOME_CASE_IDS.slice(0, LOGO_COUNT);

  return (
    <MotionSection
      ref={ref}
      id="clients"
      className="tech-bg relative py-20 container-px"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.05, delayChildren: 0.04 }
        }
      }}
    >
      <div className="sr-only">
        <p>{tSec("clients.metaTitle")}</p>
        <p>{tSec("clients.metaDescription")}</p>
      </div>

      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          <Building2 className="h-4 w-4 text-[#7AE0FF]" aria-hidden />
          {t("badge")}
        </div>
        <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
      </MotionDiv>

      <MotionDiv
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 0.08 }
          }
        }}
        className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5"
      >
        {ids.map((id) => {
          const label = tCases(`items.${id}.client`);
          return (
            <MotionDiv
              key={id}
              variants={{
                hidden: { opacity: 0, scale: 0.96 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
              }}
              className="group"
            >
              <div className="glass flex min-h-[3.25rem] min-w-[8.5rem] items-center justify-center rounded-2xl px-6 py-3 transition duration-300 grayscale hover:grayscale-0">
                <span className="text-center text-sm font-bold uppercase tracking-[0.14em] text-white/45 transition group-hover:text-white">
                  {label}
                </span>
              </div>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </MotionSection>
  );
}
