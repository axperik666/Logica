"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { useCardTilt } from "@/hooks/useCardTilt";
import { certLogoSrc } from "@/lib/certPlatformLogos";

export type CertPartner = {
  key: string;
  abbr: string;
  label: string;
  logo?: string;
};

export function CertPartnerTile({ abbr, label, logo }: Pick<CertPartner, "abbr" | "label" | "logo">) {
  const logoSrc = logo ? certLogoSrc(logo) : null;
  const { ref, rotateX, rotateY, onPointerMove, onPointerLeave, disabled } = useCardTilt({ maxDeg: 6 });

  return (
    <div className="shrink-0 [perspective:900px]">
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d"
        }}
        className={cn(
          "group/cert flex h-[4.25rem] w-[8.75rem] flex-col items-center justify-center rounded-2xl border border-white/[0.12] bg-[rgba(5,9,24,0.72)] px-3 backdrop-blur-xl transition-all duration-500 sm:h-[4.75rem] sm:w-[10.25rem]",
          "grayscale-[0.88] contrast-[1.06] hover:grayscale-0 hover:border-cyan-400/45 hover:shadow-[0_0_32px_rgba(34,211,238,0.32),0_16px_48px_rgba(0,0,0,0.45)]"
        )}
      >
        {logoSrc ? (
          <div className="relative flex h-9 w-full items-center justify-center rounded-xl bg-white/[0.04] px-2 ring-1 ring-white/10 transition group-hover/cert:bg-white/[0.07] sm:h-10">
            <Image
              src={logoSrc}
              alt={label}
              width={96}
              height={36}
              className="max-h-7 w-auto max-w-[5.5rem] object-contain opacity-90 brightness-110 transition group-hover/cert:opacity-100 sm:max-h-8"
              draggable={false}
            />
          </div>
        ) : (
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/25 to-violet-500/15 text-[11px] font-bold tracking-tight text-cyan-100/90 shadow-inner ring-1 ring-white/10 transition group-hover/cert:from-cyan-400/40 group-hover/cert:text-white sm:text-xs"
          >
            {abbr}
          </span>
        )}
        <span className="mt-2 max-w-[9.5rem] text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.1em] text-white/55 transition group-hover/cert:text-white/90 sm:text-[10px]">
          {label}
        </span>
      </motion.div>
    </div>
  );
}
