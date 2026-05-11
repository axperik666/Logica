"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import {
  Building2,
  Car,
  Cpu,
  Dumbbell,
  Factory,
  GraduationCap,
  Heart,
  Home,
  Landmark,
  Scale,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Industry = { key: string; caseId: string };

const ICONS: Record<string, LucideIcon> = {
  medicine: Stethoscope,
  ecommerce: ShoppingBag,
  legal: Scale,
  edtech: GraduationCap,
  beauty: Sparkles,
  construction: Building2,
  realestate: Home,
  fitness: Dumbbell,
  manufacturing: Factory,
  auto: Car,
  horeca: UtensilsCrossed,
  saas: Cpu,
  retail: ShoppingBag,
  finance: Landmark,
  services: Heart
};

export function Industries() {
  const t = useTranslations("homeIndustries");
  const tCases = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.06 });
  const [hovered, setHovered] = useState<string | null>(null);

  const raw = t.raw("items");
  const items = Array.isArray(raw) ? (raw as Industry[]) : [];

  return (
    <MotionSection
      ref={ref}
      id="industries"
      className="full-bleed tech-bg relative overflow-x-clip py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } }
      }}
    >
      <div className="site-container">
        <div className="sr-only">
          <p>{tSec("industries.metaTitle")}</p>
          <p>{tSec("industries.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/85">{t("badge")}</p>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:mt-14">
          {items.map((item, idx) => {
            const Icon = ICONS[item.key] ?? Sparkles;
            const result = tCases(`items.${item.caseId}.result`);
            const label = t(`labels.${item.key}`);
            return (
              <MotionDiv
                key={item.key}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, delay: idx * 0.02 }
                  }
                }}
              >
                <motion.div
                  className={cn(
                    "group relative flex min-h-[7.5rem] flex-col items-center justify-center rounded-2xl border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] px-3 py-4 text-center backdrop-blur-md transition duration-300 sm:min-h-[8.25rem]",
                    hovered === item.key && "border-cyan-400/40 shadow-[0_0_36px_rgba(34,211,238,0.2)]"
                  )}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  onHoverStart={() => setHovered(item.key)}
                  onHoverEnd={() => setHovered(null)}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/55 transition duration-300",
                      "group-hover:border-cyan-400/35 group-hover:text-cyan-200 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-2.5 text-[11px] font-semibold uppercase leading-tight tracking-wide text-white/80 sm:text-xs">
                    {label}
                  </p>
                  <p className="mt-1.5 hidden text-[10px] font-bold text-cyan-300 sm:text-[11px] group-hover:block">
                    {result}
                  </p>
                </motion.div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
