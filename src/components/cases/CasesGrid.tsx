"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MotionDiv } from "@/components/motion";
import { CaseCard } from "@/components/cases/CaseCard";
import {
  CASE_FILTER_ORDER,
  casesData,
  type CaseFilterTag
} from "@/lib/casesData";
import { cn } from "@/lib/cn";

export type CaseFilter = "all" | CaseFilterTag;

export function CasesGrid() {
  const t = useTranslations("cases");
  const [filter, setFilter] = useState<CaseFilter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? casesData
        : casesData.filter((c) => c.filterTag === filter),
    [filter]
  );

  return (
    <>
      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="mb-8"
      >
        <div
          role="toolbar"
          aria-label={t("filtersAria")}
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-2xl px-4 py-2.5 text-sm font-medium transition-all sm:px-5",
              filter === "all"
                ? "bg-white text-black shadow-[0_0_24px_rgba(0,191,255,0.2)]"
                : "border border-white/10 bg-white/5 text-white/70 hover:border-[#00BFFF]/35 hover:bg-white/10 hover:text-white"
            )}
          >
            {t("filterLabels.all")}
          </button>
          {CASE_FILTER_ORDER.map((tag) => (
            <button
              type="button"
              key={tag}
              aria-pressed={filter === tag}
              onClick={() => setFilter(tag)}
              className={cn(
                "rounded-2xl px-4 py-2.5 text-sm font-medium transition-all sm:px-5",
                filter === tag
                  ? "bg-white text-black shadow-[0_0_24px_rgba(0,191,255,0.2)]"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-[#00BFFF]/35 hover:bg-white/10 hover:text-white"
              )}
            >
              {t(`filterLabels.${tag}`)}
            </button>
          ))}
        </div>
      </MotionDiv>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-white/60">{t("filterEmpty")}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense">
          {filtered.map((item, index) => (
            <MotionDiv
              key={item.homeCaseId}
              id={`case-${item.homeCaseId}`}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className={cn(
                filter === "all" && index % 9 === 0 ? "lg:col-span-2" : ""
              )}
            >
              <CaseCard caseId={item.homeCaseId} priority={index < 3} />
            </MotionDiv>
          ))}
        </div>
      )}
    </>
  );
}
