"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CaseCard from "./CaseCard";
import {
  CASE_NICHE_FILTER_ORDER,
  casesData,
  type CaseNicheKey
} from "@/lib/casesData";
import { cn } from "@/lib/cn";

type FilterValue = "all" | CaseNicheKey;

type CasesGridProps = {
  /** На странице `/kejsy` заголовок задаётся снаружи — скрываем дубль H2. */
  showTitle?: boolean;
  className?: string;
};

export default function CasesGrid({ showTitle = true, className }: CasesGridProps) {
  const t = useTranslations("cases");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filteredCases = useMemo(() => {
    if (activeFilter === "all") return casesData;
    return casesData.filter((c) => c.nicheKey === activeFilter);
  }, [activeFilter]);

  return (
    <div className={cn("bg-transparent py-12 md:py-20", showTitle ? "md:py-28" : "", className)}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {showTitle ? (
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
              {t("resultsHeadline")}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {t("subtitle", { count: casesData.length })}
            </p>
          </div>
        ) : null}

        <div
          className="flex flex-wrap justify-center gap-3 mb-10 md:mb-14"
          role="toolbar"
          aria-label={t("filtersAria")}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap ${
              activeFilter === "all"
                ? "bg-white text-black shadow-lg"
                : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            {t("filterLabels.all")}
          </motion.button>
          {CASE_NICHE_FILTER_ORDER.map((key) => (
            <motion.button
              type="button"
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(key)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === key
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {t(`filterLabels.${key}` as "filterLabels.medicine")}
            </motion.button>
          ))}
        </div>

        {filteredCases.length === 0 ? (
          <p className="text-center text-gray-400">{t("filterEmpty")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-5 md:px-6">
            {filteredCases.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                viewport={{ once: true }}
              >
                <CaseCard
                  client={item.client}
                  niche={t(`filterLabels.${item.nicheKey}` as "filterLabels.medicine")}
                  result={t(`gridCards.${item.id}.result` as "gridCards.1.result")}
                  description={t(`gridCards.${item.id}.description` as "gridCards.1.description")}
                  video={item.video}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
