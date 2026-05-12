"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { casesData, type CaseNicheKey } from "@/lib/casesData";
import { cn } from "@/lib/cn";
import { DsButton } from "@/components/ui/ds";

/** Фильтры как в макете: healthcare = niche `medicine` в данных */
type FilterId = "all" | CaseNicheKey;

const FILTERS: FilterId[] = ["all", "ecommerce", "medicine", "edtech", "beauty"];

function filterCases(id: FilterId) {
  if (id === "all") return casesData;
  return casesData.filter((c) => c.nicheKey === id);
}

export default function CasesSection() {
  const t = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const [active, setActive] = useState<FilterId>("all");
  const list = useMemo(() => filterCases(active), [active]);

  return (
    <section id="cases" className="bg-dark-900 py-20 md:py-24">
      <div className="sr-only">
        <p>{tSec("cases.metaTitle")}</p>
        <p>{tSec("cases.metaDescription")}</p>
        <p>{t("titleBrand")}</p>
        <p>
          {t("gridTitleLine1")} {t("gridTitleLine2")}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-header mb-8 text-center md:mb-10"
        >
          <span className="block">{t("gridTitleLine1")}</span>
          <span className="block">{t("gridTitleLine2")}</span>
        </motion.h2>

        <div
          className="mb-10 flex flex-wrap justify-center gap-3 md:mb-12"
          role="toolbar"
          aria-label={t("filtersAria")}
        >
          {FILTERS.map((id) => (
            <DsButton
              key={id}
              type="button"
              variant={active === id ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(id)}
            >
              {id === "all" ? t("filterLabels.all") : t(`filterLabels.${id}` as "filterLabels.medicine")}
            </DsButton>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {list.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">{t("filterEmpty")}</p>
          ) : (
            list.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.08, 0.4),
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-3xl border border-white/10 bg-dark-800 shadow-xl transition-all duration-500",
                    "hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/15"
                  )}
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="pointer-events-none absolute inset-0 h-full w-full scale-[1.06] object-cover transition-transform duration-500 group-hover:scale-100"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="pointer-events-none absolute left-4 top-4 max-w-[70%] rounded-2xl bg-black/75 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-primary/95 sm:text-xs">
                      {t(`filterLabels.${item.nicheKey}` as "filterLabels.medicine")}
                    </div>
                    <div className="pointer-events-none absolute right-4 top-4 rounded-2xl bg-black/80 px-4 py-1.5 text-xs font-semibold text-primary shadow-lg sm:text-sm">
                      {t(`gridCards.${item.id}.result` as "gridCards.1.result")}
                    </div>
                  </div>

                  <div className="pointer-events-none space-y-3 p-6 sm:p-8">
                    <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">{item.client}</h3>
                    <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
                      {t(`gridCards.${item.id}.description` as "gridCards.1.description")}
                    </p>
                    <span
                      className={cn(
                        "mt-6 flex w-full items-center justify-center rounded-2xl border border-transparent py-3.5 text-center text-base font-medium text-primary",
                        "group-hover:bg-white/5 group-hover:text-[#7ee8ff]"
                      )}
                    >
                      {t("gridViewCase")}
                    </span>
                  </div>

                  <Link
                    href="/kejsy"
                    aria-label={`${item.client} — ${t("gridViewCase")}`}
                    className="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
