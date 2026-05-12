"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Логотипы через CDN Simple Icons (#00bfff) — Facebook, Instagram, YouTube, Telegram и ещё 9 площадок */
const BRANDS: { slug: string; style: CSSProperties }[] = [
  { slug: "facebook", style: { top: "14%", left: "7%" } },
  { slug: "instagram", style: { top: "22%", right: "9%" } },
  { slug: "youtube", style: { top: "11%", left: "42%" } },
  { slug: "telegram", style: { top: "18%", right: "28%" } },
  { slug: "tiktok", style: { bottom: "26%", left: "11%" } },
  { slug: "linkedin", style: { bottom: "32%", right: "12%" } },
  { slug: "x", style: { top: "38%", left: "5%" } },
  { slug: "vk", style: { bottom: "18%", left: "22%" } },
  { slug: "googleads", style: { top: "44%", right: "6%" } },
  { slug: "pinterest", style: { bottom: "40%", right: "22%" } },
  { slug: "snapchat", style: { top: "52%", left: "18%" } },
  { slug: "whatsapp", style: { bottom: "14%", right: "38%" } },
  { slug: "reddit", style: { bottom: "22%", left: "44%" } }
];

const cdn = (slug: string) => `https://cdn.simpleicons.org/${slug}/00bfff`;

export function HeroFloatingBrands() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {BRANDS.map(({ slug, style }, i) => (
        <motion.div
          key={slug}
          className="absolute max-md:opacity-75 [&_img]:h-8 [&_img]:w-8 sm:[&_img]:h-9 sm:[&_img]:w-9 md:[&_img]:h-10 md:[&_img]:w-10"
          style={style}
          initial={{ opacity: 0, scale: 0.72 }}
          animate={
            reduceMotion
              ? { opacity: 0.55, scale: 1, y: 0 }
              : { opacity: 0.88, scale: 1, y: [0, -6, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.35 }
              : {
                  opacity: {
                    delay: 0.18 + i * 0.065,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1]
                  },
                  scale: {
                    delay: 0.18 + i * 0.065,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1]
                  },
                  y: {
                    delay: 0.55 + i * 0.05,
                    duration: 4.5 + (i % 4) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- внешний SVG CDN, без оптимизации Image */}
          <img
            src={cdn(slug)}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="drop-shadow-[0_0_14px_rgba(0,191,255,0.4)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
