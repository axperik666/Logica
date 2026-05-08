"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  ShoppingCart,
  HeartPulse,
  Scale,
  GraduationCap,
  Sparkles,
  Home,
  Dumbbell,
  Wrench,
  UtensilsCrossed,
  Cpu,
  type LucideIcon
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { HOME_CASE_IDS, type HomeCaseId } from "@/content/homeCases";
import { CASE_COVER_IMAGES } from "@/content/caseCovers";
import { CaseCoverImage } from "@/components/cases/CaseCoverImage";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";

const ICONS: Record<HomeCaseId, LucideIcon> = {
  "med-center": HeartPulse,
  "furniture-store": ShoppingCart,
  "law-firm": Scale,
  "edu-center": GraduationCap,
  "beauty-premium": Sparkles,
  construction: Building2,
  electronics: TrendingUp,
  dentistry: Users,
  "real-estate": DollarSign,
  fitness: Dumbbell,
  "custom-furniture": Home,
  autoservice: Wrench,
  "trading-courses": Users,
  "food-delivery": UtensilsCrossed,
  saas: Cpu
};

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
      className="tech-bg relative py-20 container-px"
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

        <Button href="/#contact" variant="ghost" className="hover-lift">
          {t("ctaTop")}
        </Button>
      </MotionDiv>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_CASE_IDS.map((id, index) => {
          const Icon = ICONS[id];
          const niche = t(`items.${id}.niche`);
          const client = t(`items.${id}.client`);
          const result = t(`items.${id}.result`);
          const period = t(`items.${id}.period`);
          const summary = t(`items.${id}.summary`);

          return (
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
              className="glass hover-lift overflow-hidden rounded-3xl p-6"
            >
              <div className="relative -mx-6 -mt-6 mb-4 h-36 overflow-hidden sm:h-40">
                <CaseCoverImage
                  Icon={Icon}
                  src={CASE_COVER_IMAGES[id]}
                  alt={`${niche} — ${client}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-white/80">
                    {niche} • {client}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug text-primary">
                    {result}
                  </h3>
                  <div className="mt-1 text-xs text-white/70">{period}</div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/85">{summary}</p>

              <div className="mt-6">
                <Link
                  href="/#contact"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15 hover-lift sm:w-auto"
                >
                  {t("more")}
                </Link>
              </div>
            </MotionDiv>
          );
        })}
      </div>

      <div className="mt-10">
        <div className="glass hover-lift rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-semibold">{t("bannerTitle")}</h3>
              <p className="mt-2 text-sm text-white/85">{t("bannerSub")}</p>
            </div>
            <Button href="/#contact" className="hover-lift w-full sm:w-auto">
              {t("bannerCta")}
            </Button>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
