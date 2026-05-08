"use client";

import Image from "next/image";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Иконка ниши: при ошибке загрузки или пустом src — крупный центрированный плейсхолдер вместо «пустой ямы». */
  Icon: LucideIcon;
};

/**
 * Обложка кейса. Remote URL может не загрузиться — показываем техно-плейсхолдер с иконкой (без пустого тёмного поля).
 */
export function CaseCoverImage({ src, alt, sizes, priority, Icon }: Props) {
  const [failed, setFailed] = useState(false);

  const showImage = Boolean(src?.trim()) && !failed;

  if (!showImage) {
    return (
      <>
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#06182e] via-[#0a1424] to-[#040814]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_38%,rgba(0,191,255,0.16),transparent_58%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,191,255,0.22) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,191,255,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px"
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/45 bg-black/35 shadow-[0_0_36px_rgba(0,191,255,0.28)] ring-1 ring-white/10 sm:h-16 sm:w-16">
            <Icon className="h-7 w-7 text-[#7AE0FF] sm:h-8 sm:w-8" aria-hidden />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={88}
        onError={() => setFailed(true)}
      />
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm">
          <Icon className="h-5 w-5 text-primary" aria-hidden />
        </div>
      </div>
    </>
  );
}
