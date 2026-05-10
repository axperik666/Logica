"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { homeSectionHref } from "@/lib/navHref";
import { CaseCard } from "@/components/cases/CaseCard";
import {
  CASE_FILTER_ORDER,
  casesDataOnHome,
  type CaseFilterTag
} from "@/lib/casesData";
import { cn } from "@/lib/cn";

type CaseFilter = "all" | CaseFilterTag;

export default function CasesGrid() {
  const t = useTranslations("cases");
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<CaseFilter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? casesDataOnHome
        : casesDataOnHome.filter((c) => c.filterTag === filter),
    [filter]
  );

  const tapHover = reduceMotion
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };

  return (
    <div className="w-full">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/5 px-5 py-2">
          <div
            className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#00b4ff]"
            aria-hidden
          />
          <span className="text-sm uppercase tracking-[0.2em] text-gray-400 sm:tracking-[3px]">
            {t("gridPill")}
          </span>
        </div>

        <h2 className="brand-glow max-w-4xl text-balance text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">
          {t("gridTitleLine1")}
          <br />
          {t("gridTitleLine2")}
        </h2>
      </div>

      <div
        role="toolbar"
        aria-label={t("filtersAria")}
        className="mb-12 flex flex-wrap justify-center gap-3"
      >
        <motion.button
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
          {...tapHover}
          className={cn(
            "rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-300 sm:px-7",
            filter === "all"
              ? "bg-white text-black shadow-lg shadow-white/20"
              : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          )}
        >
          {t("filterLabels.all")}
        </motion.button>
        {CASE_FILTER_ORDER.map((tag) => (
          <motion.button
            type="button"
            key={tag}
            aria-pressed={filter === tag}
            onClick={() => setFilter(tag)}
            {...tapHover}
            className={cn(
              "rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-300 sm:px-7",
              filter === tag
                ? "bg-white text-black shadow-lg shadow-white/20"
                : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            )}
          >
            {t(`filterLabels.${tag}`)}
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-white/60">{t("filterEmpty")}</p>
      ) : (
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense"
        >
          {filtered.map((item, index) => (
            <motion.div
              key={item.homeCaseId}
              id={`case-${item.homeCaseId}`}
              layout
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : index * 0.05,
                layout: { duration: 0.35 }
              }}
              className={cn(
                filter === "all" && index % 9 === 0 ? "lg:col-span-2" : ""
              )}
            >
              <CaseCard caseId={item.homeCaseId} priority={index < 3} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-16 text-center">
        <p className="mb-6 text-gray-400">{t("gridBottomLead")}</p>
        <Link
          href={homeSectionHref("contact")}
          className="inline-block rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:bg-[#00b4ff] hover:text-white sm:px-10 sm:py-5"
        >
          {t("gridBottomCta")}
        </Link>
      </div>
    </div>
  );
}
