"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { homeSectionHref } from "@/lib/navHref";
import type { HomeCaseId } from "@/content/homeCases";
import { CASE_COVER_VIDEOS } from "@/content/caseCovers";
import { cn } from "@/lib/cn";

type Props = {
  caseId: HomeCaseId;
  className?: string;
  priority?: boolean;
};

/**
 * Только видео (без статичных постеров/Unsplash). До viewport и при ошибке — нейтральный фон.
 */
export function CaseCard({ caseId, className, priority }: Props) {
  const t = useTranslations("cases");
  const rootRef = useRef<HTMLDivElement>(null);
  // Ленивая подгрузка: не качаем 13 видео сразу (иначе часть запросов/декод может падать на слабых сетях/устройствах)
  const isInView = useInView(rootRef, { once: true, margin: "350px 0px" });

  const niche = t(`items.${caseId}.niche`);
  const client = t(`items.${caseId}.client`);
  const result = t(`items.${caseId}.result`);
  const summary = t(`items.${caseId}.summary`);

  const videoSrc = CASE_COVER_VIDEOS[caseId]?.trim() ?? "";
  const [hasError, setHasError] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  const hasVideo = Boolean(videoSrc);
  const showVideoUnavailable = hasVideo && hasError;

  return (
    <Link
      href={homeSectionHref("contact")}
      className={cn(
        "group/card block cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040814]",
        className
      )}
    >
      <motion.div
        ref={rootRef}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="overflow-hidden rounded-3xl border border-white/5 bg-zinc-950"
      >
        <div className="relative aspect-[16/10] bg-zinc-950">
          {!canPlay || hasError ? (
            <div className="absolute inset-0 bg-zinc-900" aria-hidden />
          ) : null}

          {isInView && hasVideo && !hasError ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload={priority ? "auto" : "metadata"}
              onError={() => setHasError(true)}
              onCanPlay={() => setCanPlay(true)}
              className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 group-hover/card:scale-100"
              aria-hidden
            />
          ) : null}

          {showVideoUnavailable ? (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900"
              aria-live="polite"
            >
              <p className="px-4 text-center text-sm text-white/40">
                {t("caseVideoUnavailable")}
              </p>
            </div>
          ) : null}
        </div>

        <div className="p-6 sm:p-7">
          <p className="mb-2 font-mono text-xs text-[#00b4ff] sm:text-sm">
            {niche} • {result}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {client}
          </h3>
          <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
            {summary}
          </p>

          <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white/80 transition group-hover/card:text-white">
            {t("more")}
            <span aria-hidden> →</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default CaseCard;
