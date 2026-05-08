"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { HOME_CASE_IDS } from "@/content/homeCases";
import { cn } from "@/lib/cn";

const LOGO_COUNT = 12;

function ClientChip({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "group/client shrink-0 rounded-2xl border border-white/[0.12] bg-[rgba(5,9,24,0.65)] px-7 py-3.5 backdrop-blur-xl transition-all duration-[400ms] ease-out sm:px-9 sm:py-4",
        "grayscale",
        "hover:-translate-y-1 hover:grayscale-0 hover:border-[#00BFFF]/48 hover:shadow-[0_16px_48px_rgba(0,0,0,0.48),0_0_28px_rgba(0,191,255,0.42)]",
        className
      )}
    >
      <span className="block max-w-[14rem] text-center text-[13px] font-bold uppercase tracking-[0.14em] text-white/38 transition duration-300 group-hover/client:scale-[1.02] group-hover/client:text-white sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function Clients() {
  const t = useTranslations("clients");
  const tCases = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 100px 0px"
  });

  const ids = HOME_CASE_IDS.slice(0, LOGO_COUNT);
  const doubled = [...ids, ...ids];

  return (
    <MotionSection
      ref={ref}
      id="clients"
      className="full-bleed tech-bg relative overflow-x-clip py-20"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.05, delayChildren: 0.04 }
        }
      }}
    >
      <div className="container">
      <div className="sr-only">
        <p>{tSec("clients.metaTitle")}</p>
        <p>{tSec("clients.metaDescription")}</p>
      </div>

      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,191,255,0.28)] bg-[rgba(0,191,255,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9AE8FF]">
          <Building2 className="h-4 w-4" aria-hidden />
          {t("badge")}
        </div>
        <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm font-medium leading-relaxed text-white/78 sm:text-base">
          {t("subtitle")}
        </p>
      </MotionDiv>

      <MotionDiv
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { duration: 0.6, delay: 0.08 }
          }
        }}
        className="relative mx-auto mt-12 max-w-[100vw] overflow-hidden px-0 sm:mt-14"
      >
        {!reduceMotion ? (
          <div className="relative [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <motion.div
              className="flex w-max gap-3 sm:gap-4"
              animate={isInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
              transition={{
                x: {
                  duration: 46,
                  repeat: isInView ? Infinity : 0,
                  ease: "linear",
                  repeatType: "loop"
                }
              }}
            >
              {doubled.map((id, idx) => (
                <ClientChip
                  key={`${id}-${idx}`}
                  label={tCases(`items.${id}.client`)}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {ids.map((id) => (
              <ClientChip key={id} label={tCases(`items.${id}.client`)} />
            ))}
          </div>
        )}
      </MotionDiv>
      </div>
    </MotionSection>
  );
}
