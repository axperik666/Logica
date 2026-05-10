"use client";

import type { LucideIcon } from "lucide-react";
import { CaseCoverImage } from "@/components/cases/CaseCoverImage";

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
 * Обложка кейса: опциональное видео (public/videos/…) поверх постера из картинки.
 */
export function CaseCoverMedia({
  videoSrc,
  Icon,
  ...imageProps
}: Props) {
  const v = videoSrc?.trim();

  if (v) {
    return (
      <>
        <video
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={imageProps.src}
          aria-hidden
        >
          <source src={v} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden />
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-primary" aria-hidden />
          </div>
        </div>
      </>
    );
  }

  return <CaseCoverImage Icon={Icon} {...imageProps} />;
}
