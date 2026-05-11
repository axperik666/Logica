"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { homeSectionHref } from "@/lib/navHref";
import { cn } from "@/lib/cn";

const MotionLink = motion(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const [videoActive, setVideoActive] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#020308]"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.svg"
        onLoadedData={() => setVideoActive(true)}
        onPlaying={() => setVideoActive(true)}
        className={cn(
          "absolute inset-0 h-full w-full scale-[1.03] object-cover transition-opacity duration-[900ms] ease-out",
          videoActive ? "opacity-[0.68]" : "opacity-0"
        )}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/45 via-[#050810]/88 to-black" />
      <div className="premium-aurora z-[1]" />
      <div className="hero-vignette-ring z-[1]" />
      <div className="premium-grain z-[2]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mx-auto mb-5 max-w-[22rem] text-pretty text-[9px] font-semibold uppercase leading-snug tracking-[0.28em] text-cyan-200/85 min-[400px]:max-w-none min-[400px]:text-[10px] min-[400px]:tracking-[0.34em] sm:mb-6 sm:text-[11px] sm:tracking-[0.38em]"
        >
          {t("homeHeroKicker")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04, ease: easeOut }}
          className="mb-10 flex justify-center"
        >
          <div className="rounded-2xl border border-white/[0.14] bg-white/[0.06] px-8 py-4 shadow-[0_0_0_1px_rgba(0,200,255,0.12),0_24px_80px_rgba(0,0,0,0.45),0_0_64px_rgba(0,180,255,0.18)] backdrop-blur-xl sm:px-10 sm:py-5">
            <Image
              src="/logo.png"
              alt="LOGICA Marketing"
              width={400}
              height={100}
              className="h-[3.25rem] w-auto sm:h-[4.25rem] md:h-20 lg:h-24"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
          className="mb-5 text-pretty text-[clamp(1.65rem,7.2vw,2.65rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white drop-shadow-[0_4px_48px_rgba(0,0,0,0.55)] min-[480px]:text-[clamp(2rem,8vw,3.75rem)] sm:mb-6 sm:leading-[1.02] sm:tracking-[-0.04em] md:text-7xl lg:text-8xl"
        >
          {t("homeVideoLine1")}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#7ee8ff] via-[#00c8ff] to-[#e8d4ff] bg-clip-text text-transparent">
            {t("homeVideoHighlight")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: easeOut }}
          className="mx-auto mb-10 max-w-xl text-pretty text-[0.9375rem] font-medium leading-snug text-white/72 sm:mb-12 sm:max-w-2xl sm:text-xl sm:leading-relaxed"
        >
          {t("homeVideoSub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: easeOut }}
          className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <MotionLink
            href="/kontakty"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-gradient-to-r from-white via-white to-white/95 px-6 py-3.5 text-center text-sm font-semibold text-[#0a0a12] shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_8px_40px_rgba(0,200,255,0.35),0_24px_64px_rgba(0,0,0,0.35)] transition-[box-shadow] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.65),0_12px_56px_rgba(0,220,255,0.45)] sm:min-h-0 sm:px-11 sm:py-4 sm:text-base"
          >
            {t("homeVideoCta")}
          </MotionLink>
          <MotionLink
            href={homeSectionHref("cases")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-white/[0.22] bg-white/[0.06] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-colors hover:border-cyan-400/35 hover:bg-white/[0.1] sm:min-h-0 sm:px-10 sm:py-4 sm:text-base"
          >
            {t("ctaSecondary")}
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
