"use client";

import type { LucideIcon } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { CaseCoverImage } from "@/components/cases/CaseCoverImage";
import { useTouchPrimary } from "@/lib/use-touch-primary";

type Props = {
  videoSrc?: string | null;
  src: string;
  fallbackSrc?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  Icon: LucideIcon;
};

/**
 * Обложка кейса: видео не грузится до hover (десктоп) или пока карточка не в зоне видимости (сенсор).
 * При prefers-reduced-motion — только постер.
 */
export function CaseCoverMedia({
  videoSrc,
  Icon,
  ...imageProps
}: Props) {
  const v = videoSrc?.trim();
  const reduceMotion = useReducedMotion();
  const touchPrimary = useTouchPrimary();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.22, margin: "0px 0px -12% 0px" });

  const [hovered, setHovered] = useState(false);

  const onEnter = useCallback(() => {
    if (v && !reduceMotion) setHovered(true);
  }, [v, reduceMotion]);

  const onLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const playVideo = Boolean(
    v &&
      !reduceMotion &&
      (touchPrimary ? inView : hovered)
  );

  if (!v || reduceMotion) {
    return <CaseCoverImage Icon={Icon} {...imageProps} />;
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <CaseCoverImage Icon={Icon} {...imageProps} showFooter={false} />
      {playVideo ? (
        <video
          className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        >
          <source src={v} type="video/mp4" />
        </video>
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[2] flex items-end justify-between gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm">
          <Icon className="h-5 w-5 text-primary" aria-hidden />
        </div>
      </div>
    </div>
  );
}
