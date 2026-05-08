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
import { homeSectionHref } from "@/lib/navHref";
import { HOME_CASE_IDS, type HomeCaseId } from "@/content/homeCases";
import { CASE_COVER_FALLBACKS, CASE_COVER_IMAGES } from "@/content/caseCovers";
import { CaseCoverImage } from "@/components/cases/CaseCoverImage";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";
import { cn } from "@/lib/cn";

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
              className={cn(
                "glass hover-lift overflow-hidden rounded-3xl p-6 transition-[transform,box-shadow,border-color] duration-300 hover:border-[#00BFFF]/35 hover:shadow-[0_28px_84px_rgba(0,0,0,0.58),0_0_58px_rgba(0,191,255,0.18)] hover:scale-[1.01]",
                // Masonry: периодически делаем карточку шире на desktop
                index % 9 === 0 ? "lg:col-span-2" : ""
              )}
            >
              <div
                className={cn(
                  "relative -mx-6 -mt-6 mb-4 overflow-hidden",
                  // Masonry feel: разные высоты обложек на lg+
                  index % 9 === 0
                    ? "h-48 sm:h-52 lg:h-72"
                    : index % 6 === 0
                      ? "h-44 sm:h-48 lg:h-60"
                    : index % 6 === 1
                      ? "h-40 sm:h-44 lg:h-52"
                      : index % 6 === 2
                        ? "h-48 sm:h-52 lg:h-64"
                        : index % 6 === 3
                          ? "h-40 sm:h-44 lg:h-56"
                          : index % 6 === 4
                            ? "h-44 sm:h-48 lg:h-58"
                            : "h-40 sm:h-44 lg:h-50"
                )}
              >
                <CaseCoverImage
                  Icon={Icon}
                  src={CASE_COVER_IMAGES[id]}
                  fallbackSrc={CASE_COVER_FALLBACKS[id]}
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
                  href={homeSectionHref("contact")}
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
