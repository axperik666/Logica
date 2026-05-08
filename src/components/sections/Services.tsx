"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  BarChart3,
  Compass,
  Code2,
  LineChart,
  Megaphone,
  Search
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";

type CardMsg = {
  title: string;
  desc: string;
  href: string;
};

const ICONS = [Megaphone, Search, BarChart3, Code2, Compass, LineChart];

export function Services() {
  const t = useTranslations("services");
  const tSec = useTranslations("sectionsSeo");
  const cardsRaw = t.raw("cards");
  const cards = Array.isArray(cardsRaw) ? (cardsRaw as CardMsg[]) : [];
  const narrow = useNarrowViewport();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 100px 0px"
  });

  return (
    <MotionSection
      ref={ref}
      id="services"
      className="tech-bg relative py-20 container-px"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: narrow ? 0.03 : 0.08,
            delayChildren: narrow ? 0.02 : 0.04
          }
        }
      }}
    >
      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div className="max-w-3xl">
          <div className="sr-only">
            <p>{tSec("services.metaTitle")}</p>
            <p>{tSec("services.metaDescription")}</p>
          </div>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            {t("subtitle")}
          </p>

          <nav
            aria-label={t("internalRelatedAria")}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-5 text-sm text-white/65"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {t("seeAlso")}
            </span>
            <Link
              href="/uslugi"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalAllServices")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/kejsy"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalCasesPage")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/#cases"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalCasesAnchor")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/o-nas"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalAbout")}
            </Link>
          </nav>
        </div>

        <Button href="/#contact" variant="ghost" className="hover-lift shrink-0">
          {t("cta")}
        </Button>
      </MotionDiv>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, idx) => {
          const Icon = ICONS[idx] ?? Megaphone;
          return (
            <MotionDiv
              key={c.title}
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
                    <h3 className="text-sm font-semibold leading-snug">{c.title}</h3>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/65">{c.desc}</p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href="/#contact"
                  className="text-sm font-semibold text-primary transition hover:opacity-90"
                >
                  {t("moreLink")}
                </Link>
                <Button href="/#contact" className="hover-lift">
                  {t("moreBtn")}
                </Button>
              </div>
            </MotionDiv>
          );
        })}
      </div>
    </MotionSection>
  );
}
