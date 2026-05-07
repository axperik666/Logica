"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView } from "framer-motion";
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
import { HOME_CASE_IDS, type HomeCaseId } from "@/content/homeCases";

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

function useEscToClose(onClose: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, onClose]);
}

export function Cases() {
  const t = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const [activeId, setActiveId] = useState<HomeCaseId | null>(null);
  useEscToClose(() => setActiveId(null), Boolean(activeId));

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <MotionSection
      ref={sectionRef}
      id="cases"
      className="tech-bg relative py-20 container-px"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
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
          <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <Button href="/kontakty" variant="ghost" className="hover-lift">
          {t("ctaTop")}
        </Button>
      </MotionDiv>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_CASE_IDS.map((id) => {
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
              className="glass hover-lift rounded-3xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/60">
                      {niche} • {client}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold leading-snug text-primary">
                      {result}
                    </h3>
                    <div className="mt-1 text-xs text-white/55">{period}</div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/65">{summary}</p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setActiveId(id)}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover-lift"
                >
                  {t("more")}
                </button>
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
              <p className="mt-2 text-sm text-white/65">{t("bannerSub")}</p>
            </div>
            <Button href="/kontakty" className="hover-lift w-full sm:w-auto">
              {t("bannerCta")}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeId ? (
          <MotionDiv
            className="fixed inset-0 z-[60] grid place-items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label={t("modalCloseAria")}
              className="absolute inset-0 bg-black/70"
              onClick={() => setActiveId(null)}
            />

            <MotionDiv
              role="dialog"
              aria-modal="true"
              className="glass relative w-full max-w-2xl rounded-3xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-white/60">
                    {t(`items.${activeId}.niche`)} • {t(`items.${activeId}.client`)}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-primary">
                    {t(`items.${activeId}.result`)}
                  </h3>
                  <div className="mt-1 text-sm text-white/60">
                    {t(`items.${activeId}.period`)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover-lift"
                >
                  {t("modalClose")}
                </button>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-white/65">
                {t(`items.${activeId}.summary`)}
              </p>

              <div className="mt-6 space-y-3">
                {(t.raw(`items.${activeId}.details`) as string[]).map((d) => (
                  <div
                    key={d}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/kontakty" className="hover-lift w-full sm:w-auto">
                  {t("modalCta1")}
                </Button>
                <Button
                  href="/uslugi"
                  variant="ghost"
                  className="hover-lift w-full sm:w-auto"
                >
                  {t("modalCta2")}
                </Button>
              </div>
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </MotionSection>
  );
}
