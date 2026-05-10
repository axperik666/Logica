"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { MotionDiv, MotionSection } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { homeSectionHref } from "@/lib/navHref";
import { HOME_CASE_IDS } from "@/content/homeCases";
import { CaseCard } from "@/components/cases/CaseCard";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";
import { cn } from "@/lib/cn";

export function Cases() {
  const t = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const narrow = useNarrowViewport();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 100px 0px"
  });

  return (
    <MotionSection
      ref={sectionRef}
      id="cases"
      className="full-bleed tech-bg relative overflow-x-clip py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: narrow ? 0.025 : 0.06,
            delayChildren: narrow ? 0.02 : 0.05
          }
        }
      }}
    >
      <div className="site-container">
        <div className="sr-only">
          <p>{tSec("cases.metaTitle")}</p>
          <p>{tSec("cases.metaDescription")}</p>
        </div>
        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <h2 className="brand-glow text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("titleBrand")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
              {t("subtitle")}
            </p>
          </div>

          <Button href={homeSectionHref("contact")} variant="ghost" className="hover-lift">
            {t("ctaTop")}
          </Button>
        </MotionDiv>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense">
          {HOME_CASE_IDS.map((id, index) => (
            <MotionDiv
              key={id}
              id={`case-${id}`}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className={cn(index % 9 === 0 ? "lg:col-span-2" : "")}
            >
              <CaseCard caseId={id} priority={index < 3} />
            </MotionDiv>
          ))}
        </div>

        <div className="mt-10">
          <div className="glass hover-lift rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-semibold">{t("bannerTitle")}</h3>
                <p className="mt-2 text-sm text-white/85">{t("bannerSub")}</p>
              </div>
              <Button href={homeSectionHref("contact")} className="hover-lift w-full sm:w-auto">
                {t("bannerCta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
