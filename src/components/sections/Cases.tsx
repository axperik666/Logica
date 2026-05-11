"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import CasesGrid from "@/components/cases/CasesGrid";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";
import { sectionInViewOptions } from "@/lib/sectionReveal";

export function Cases() {
  const t = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const narrow = useNarrowViewport();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, sectionInViewOptions);

  return (
    <MotionSection
      ref={sectionRef}
      id="cases"
      className="full-bleed relative overflow-x-clip py-24 lg:py-28"
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
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_85%_at_50%_-30%,rgba(0,180,255,0.11),transparent_55%)]"
        aria-hidden
      />
      <div className="site-container relative z-[1]">
        <div className="sr-only">
          <p>{tSec("cases.metaTitle")}</p>
          <p>{tSec("cases.metaDescription")}</p>
          <p>{t("titleBrand")}</p>
          <p>
            {t("gridTitleLine1")} {t("gridTitleLine2")}
          </p>
        </div>

        <CasesGrid />
      </div>
    </MotionSection>
  );
}
