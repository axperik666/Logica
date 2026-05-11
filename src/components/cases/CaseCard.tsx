"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
        whileHover={{ y: -12 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/5 bg-zinc-950"
      >
        {!canPlay || hasError ? (
          <div className="absolute inset-0 bg-zinc-900" aria-hidden />
        ) : null}

        {hasVideo && !hasError ? (
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

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/70 to-transparent"
          aria-hidden
        />

        <div className="absolute bottom-0 left-0 z-10 w-full p-8">
          <p className="mb-3 font-mono text-sm text-[#00b4ff]">
            {niche} • {result}
          </p>
          <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
            {client}
          </h3>
          <p className="line-clamp-3 text-[15px] leading-relaxed text-gray-400">
            {summary}
          </p>
        </div>

        <div className="absolute right-6 top-6 z-10 opacity-0 transition-all duration-300 group-hover/card:opacity-100">
          <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white backdrop-blur-md">
            {t("more")}
            <span aria-hidden> →</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default CaseCard;
