"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MotionDiv } from "@/components/motion";
import { Link } from "@/navigation";
import { homeSectionHref } from "@/lib/navHref";
import type { HomeCaseId } from "@/content/homeCases";
import {
  CASE_COVER_FALLBACKS,
  CASE_COVER_IMAGES,
  CASE_COVER_VIDEOS
} from "@/content/caseCovers";
import { useTouchPrimary } from "@/lib/use-touch-primary";
import { cn } from "@/lib/cn";

type Props = {
  caseId: HomeCaseId;
  className?: string;
  priority?: boolean;
};

/**
 * Карточка кейса: видео по hover / в зоне видимости на сенсоре, тексты из next-intl.
 */
export function CaseCard({ caseId, className, priority }: Props) {
  const t = useTranslations("cases");
  const reduceMotion = useReducedMotion();
  const touchPrimary = useTouchPrimary();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2, margin: "0px 0px -10% 0px" });

  const niche = t(`items.${caseId}.niche`);
  const client = t(`items.${caseId}.client`);
  const result = t(`items.${caseId}.result`);
  const summary = t(`items.${caseId}.summary`);

  const videoSrc = CASE_COVER_VIDEOS[caseId]?.trim() ?? "";
  const mainPoster = CASE_COVER_IMAGES[caseId];
  const fbPoster = CASE_COVER_FALLBACKS[caseId];

  const [imgUseFallback, setImgUseFallback] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const posterSrc = useMemo(() => {
    if (imgUseFallback && fbPoster) return fbPoster;
    return mainPoster;
  }, [fbPoster, imgUseFallback, mainPoster]);

  const onEnter = useCallback(() => {
    if (videoSrc && !reduceMotion) setHovered(true);
  }, [reduceMotion, videoSrc]);

  const onLeave = useCallback(() => {
    setHovered(false);
    setVideoError(false);
  }, []);

  const playVideo = Boolean(
    videoSrc && !reduceMotion && !videoError && (touchPrimary ? inView : hovered)
  );

  const alt = `${niche} — ${client}`;

  return (
    <Link
      href={homeSectionHref("contact")}
      className={cn(
        "group/card block cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040814]",
        className
      )}
    >
      <MotionDiv
        ref={rootRef}
        whileHover={reduceMotion ? undefined : { y: -12 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className="relative aspect-[16/9.5] overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_28px_84px_rgba(0,0,0,0.45)] transition-[box-shadow,border-color] duration-300 hover:border-[#00BFFF]/35 hover:shadow-[0_28px_84px_rgba(0,0,0,0.58),0_0_48px_rgba(0,191,255,0.16)]"
      >
        {!imgFailed && posterSrc ? (
          <Image
            src={posterSrc}
            alt={alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              playVideo && !videoError ? "opacity-0" : "opacity-100"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            quality={85}
            onError={() => {
              if (!imgUseFallback && fbPoster) setImgUseFallback(true);
              else setImgFailed(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" aria-hidden />
        )}

        {playVideo && videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onError={() => setVideoError(true)}
            className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 group-hover/card:scale-100"
            aria-hidden
          />
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
          aria-hidden
        />

        <div className="absolute bottom-0 left-0 z-10 w-full p-6 sm:p-8">
          <div className="mb-2 flex min-w-0 items-center gap-2 font-mono text-xs text-[#00b4ff] sm:text-sm">
            <span className="truncate">{niche}</span>
            <span className="shrink-0 text-white/40">•</span>
            <span className="truncate font-semibold text-[#7AE0FF]">{result}</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
            {client}
          </h3>
          <p className="line-clamp-3 text-[14px] leading-relaxed text-gray-400 sm:text-[15px]">
            {summary}
          </p>
          {videoError && !imgFailed ? (
            <p className="mt-2 text-xs text-white/45">{t("caseVideoUnavailable")}</p>
          ) : null}
        </div>

        <div className="absolute right-4 top-4 z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 sm:right-6 sm:top-6">
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white backdrop-blur-md sm:px-5">
            {t("more")}
            <span aria-hidden> →</span>
          </div>
        </div>
      </MotionDiv>
    </Link>
  );
}
