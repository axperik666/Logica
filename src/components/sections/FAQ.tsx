"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";

type FaqItem = { q: string; a: string };

export function FAQ() {
  const t = useTranslations("homeFaq");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.06,
    margin: "0px 0px 100px 0px"
  });

  const raw = t.raw("items");
  const items = Array.isArray(raw) ? (raw as FaqItem[]) : [];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionSection
      ref={ref}
      id="faq"
      className="tech-bg relative py-20 container-px"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.06, delayChildren: 0.04 }
        }
      }}
    >
      <div className="sr-only">
        <p>{tSec("homeFaq.metaTitle")}</p>
        <p>{tSec("homeFaq.metaDescription")}</p>
      </div>

      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,191,255,0.2)] bg-[rgba(0,191,255,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7AE0FF]">
          <HelpCircle className="h-4 w-4" aria-hidden />
          {t("badge")}
        </div>
        <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
      </MotionDiv>

      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
        }}
        className="mx-auto mt-10 max-w-3xl space-y-3"
      >
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="glass overflow-hidden rounded-2xl border border-white/10 transition hover:border-[rgba(0,191,255,0.28)]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
              >
                <span className="text-sm font-semibold leading-snug text-white sm:text-base">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="shrink-0 text-[#7AE0FF]"
                >
                  <ChevronDown className="h-5 w-5" aria-hidden />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-white/[0.08]"
                  >
                    <p className="px-5 pb-5 pt-3 text-sm leading-relaxed text-white/68">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </MotionDiv>
    </MotionSection>
  );
}
