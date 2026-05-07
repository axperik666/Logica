"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Remote Unsplash covers sometimes fail (CDN / optimizer). Gradient fallback keeps layout consistent.
 */
export function CaseCoverImage({ src, alt, sizes, priority }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#061428] via-[#0a1628] to-[#050814]"
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={85}
      onError={() => setFailed(true)}
    />
  );
}
