"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { useCardTilt } from "@/hooks/useCardTilt";
import { trustLogoSrc } from "@/lib/trustBrandLogos";

export type TrustBrand = {
  label: string;
  abbr?: string;
  niche?: string;
  win?: string;
  logo?: string;
};

export function TrustBarLogoTile({
  label,
  abbr,
  niche,
  win,
  logo,
  index
}: TrustBrand & { index: number }) {
  const footer = niche || win;
  const num = String(index + 1).padStart(2, "0");
  const logoSrc = logo ? trustLogoSrc(logo) : null;
  const { ref, rotateX, rotateY, onPointerMove, onPointerLeave, disabled } = useCardTilt({ maxDeg: 8 });

  return (
    <div className="trust-tile-wrap group/trust-tile shrink-0 [perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d"
        }}
        className="trust-tile-shell"
      >
        <div
          style={{ transform: "translateZ(12px)" }}
          className={cn(
            "relative z-[1] flex h-[5.35rem] w-[9.75rem] flex-col items-center justify-between overflow-hidden rounded-[calc(1.15rem-1px)] px-3 py-2.5 sm:h-[5.75rem] sm:w-[11rem] sm:py-3",
            "bg-[linear-gradient(165deg,rgba(14,20,42,0.95)_0%,rgba(6,10,24,0.98)_55%,rgba(4,8,18,1)_100%)]",
            "transition-[filter] duration-500",
            logoSrc ? "grayscale-[0.35] group-hover/trust-tile:grayscale-0" : "grayscale-[0.7] group-hover/trust-tile:grayscale-0"
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(34,211,238,0.14),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover/trust-tile:opacity-100"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute left-2.5 top-2 text-[9px] font-bold tabular-nums tracking-widest text-white/20 transition group-hover/trust-tile:text-cyan-300/55"
            aria-hidden
          >
            {num}
          </span>

          <div className="relative flex w-full flex-col items-center pt-0.5">
            {logoSrc ? (
              <div className="relative flex h-10 w-full items-center justify-center rounded-xl bg-white/[0.04] px-2 ring-1 ring-white/10 transition duration-500 group-hover/trust-tile:bg-white/[0.07] group-hover/trust-tile:ring-white/20 sm:h-11">
                <Image
                  src={logoSrc}
                  alt={label}
                  width={120}
                  height={44}
                  className="max-h-7 w-auto max-w-[5.75rem] object-contain opacity-90 brightness-110 contrast-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition duration-500 group-hover/trust-tile:opacity-100 group-hover/trust-tile:brightness-125 sm:max-h-8 sm:max-w-[6.5rem]"
                  draggable={false}
                />
              </div>
            ) : abbr ? (
              <span
                aria-hidden
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-violet-500/25 text-[11px] font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-white/20 transition duration-500 group-hover/trust-tile:scale-105 sm:h-9 sm:w-9 sm:text-xs"
              >
                {abbr}
              </span>
            ) : null}
            {!logoSrc ? (
              <span className="relative mt-1.5 line-clamp-2 max-w-[8.5rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.07em] text-white/65 transition group-hover/trust-tile:text-white sm:text-[11px]">
                {label}
              </span>
            ) : (
              <span className="sr-only">{label}</span>
            )}
          </div>

          {footer ? (
            <div
              style={{ transform: "translateZ(8px)" }}
              className="relative flex min-h-[1.4rem] w-full items-center justify-center px-0.5"
            >
              {niche ? (
                <span className="text-center text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-white/36 transition-all duration-300 group-hover/trust-tile:translate-y-1 group-hover/trust-tile:opacity-0 sm:text-[10px]">
                  {niche}
                </span>
              ) : null}
              {win ? (
                <span
                  className={cn(
                    "absolute inset-x-0 translate-y-1 text-center text-[9px] font-bold uppercase leading-tight tracking-[0.05em] text-cyan-200 transition-all duration-300 sm:text-[10px]",
                    niche
                      ? "opacity-0 group-hover/trust-tile:translate-y-0 group-hover/trust-tile:opacity-100"
                      : "opacity-90"
                  )}
                >
                  <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 line-clamp-2">
                    {win}
                  </span>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
