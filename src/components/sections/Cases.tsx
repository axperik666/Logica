"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import CasesGrid from "@/components/cases/CasesGrid";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";

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
          <p>{t("titleBrand")}</p>
          <p>{t("subtitle")}</p>
          <p>
            {t("gridTitleLine1")} {t("gridTitleLine2")}
          </p>
        </div>

        <CasesGrid />
      </div>
    </MotionSection>
  );
}
