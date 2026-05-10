"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { homeSectionHref } from "@/lib/navHref";
import type { HomeCaseId } from "@/content/homeCases";
import {
  CASE_COVER_FALLBACKS,
  CASE_COVER_IMAGES,
  CASE_COVER_VIDEOS
} from "@/content/caseCovers";
import { cn } from "@/lib/cn";

type Props = {
  caseId: HomeCaseId;
  className?: string;
  priority?: boolean;
};

/**
 * Видео после входа в viewport (`margin: -150px`). Постер — если нет видео, reduced motion или ошибка ролика.
 */
export function CaseCard({ caseId, className, priority }: Props) {
  const t = useTranslations("cases");
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { once: true, margin: "-150px" });

  const niche = t(`items.${caseId}.niche`);
  const client = t(`items.${caseId}.client`);
  const result = t(`items.${caseId}.result`);
  const summary = t(`items.${caseId}.summary`);

  const videoSrc = CASE_COVER_VIDEOS[caseId]?.trim() ?? "";
  const mainPoster = CASE_COVER_IMAGES[caseId];
  const fbPoster = CASE_COVER_FALLBACKS[caseId];

  const [imgUseFallback, setImgUseFallback] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [hasError, setHasError] = useState(false);

  const posterSrc = useMemo(() => {
    if (imgUseFallback && fbPoster) return fbPoster;
    return mainPoster;
  }, [fbPoster, imgUseFallback, mainPoster]);

  const canPlayVideo =
    isInView && Boolean(videoSrc) && !reduceMotion && !hasError;

  const showFallbackImage =
    isInView && !canPlayVideo && Boolean(posterSrc) && !imgFailed;

  const showZincPlaceholder =
    !isInView ||
    (isInView && !canPlayVideo && (!posterSrc || imgFailed));

  const alt = `${niche} — ${client}`;

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
        whileHover={reduceMotion ? undefined : { y: -12 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/5 bg-zinc-950"
      >
        {showZincPlaceholder && !showFallbackImage ? (
          <div className="absolute inset-0 bg-zinc-900" aria-hidden />
        ) : null}

        {showFallbackImage ? (
          <Image
            src={posterSrc!}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            quality={85}
            onError={() => {
              if (!imgUseFallback && fbPoster) setImgUseFallback(true);
              else setImgFailed(true);
            }}
          />
        ) : null}

        {canPlayVideo ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onError={() => setHasError(true)}
            className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 group-hover/card:scale-100"
            aria-hidden
          />
        ) : null}

        {hasError ? (
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
