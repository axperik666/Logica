"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { CertPartnerTile, type CertPartner } from "@/components/sections/CertPartnerTile";

export function Certifications() {
  const t = useTranslations("certifications");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.06 });

  const raw = t.raw("partners");
  const partners = Array.isArray(raw) ? (raw as CertPartner[]) : [];
  const rowDouble = [...partners, ...partners];

  return (
    <MotionSection
      ref={ref}
      id="certifications"
      className="full-bleed relative overflow-x-clip border-t border-white/[0.06] bg-[linear-gradient(180deg,rgba(6,10,22,0.92)_0%,rgba(4,6,14,0.96)_100%)] py-16 sm:py-20 lg:py-24"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,180,255,0.07),transparent_55%)]"
        aria-hidden
      />
      <div className="site-container relative">
        <div className="sr-only">
          <p>{tSec("certifications.metaTitle")}</p>
          <p>{tSec("certifications.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
            <Award className="h-3.5 w-3.5" aria-hidden />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-4 text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-white/65 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.55, delay: 0.06 } }
          }}
          className={cn(
            "group-cert-marquee relative mx-auto mt-10 max-w-[100vw] overflow-hidden px-0 sm:mt-12",
            !reduceMotion && "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          )}
        >
          {!reduceMotion ? (
            <div className="overflow-hidden py-1">
              <div className="flex w-max gap-4 sm:gap-5 home-logo-marquee-track pr-4 sm:pr-5">
                {rowDouble.map((p, i) => (
                  <CertPartnerTile key={`${p.key}-${i}`} {...p} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 py-2">
              {partners.map((p) => (
                <CertPartnerTile key={p.key} {...p} />
              ))}
            </div>
          )}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
