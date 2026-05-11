"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { homeSectionHref } from "@/lib/navHref";

const MotionLink = motion(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#020308]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-[0.68]"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/45 via-[#050810]/88 to-black" />
      <div className="premium-aurora z-[1]" />
      <div className="hero-vignette-ring z-[1]" />
      <div className="premium-grain z-[2]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-cyan-200/85 sm:text-[11px] sm:tracking-[0.42em]"
        >
          {t("homeHeroKicker")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04, ease: easeOut }}
          className="mb-10 flex justify-center"
        >
          <div className="rounded-2xl border border-white/[0.14] bg-white/[0.06] px-7 py-3.5 shadow-[0_0_0_1px_rgba(0,200,255,0.12),0_24px_80px_rgba(0,0,0,0.45),0_0_64px_rgba(0,180,255,0.18)] backdrop-blur-xl">
            <Image
              src="/logo.png"
              alt="LOGICA Marketing"
              width={320}
              height={80}
              className="h-11 w-auto sm:h-[3.25rem]"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
          className="mb-6 text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_4px_48px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-8xl"
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
          className="mx-auto mb-12 max-w-xl text-base font-medium leading-relaxed text-white/72 sm:max-w-2xl sm:text-xl sm:leading-relaxed"
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
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-gradient-to-r from-white via-white to-white/95 px-9 py-4 text-base font-semibold text-[#0a0a12] shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_8px_40px_rgba(0,200,255,0.35),0_24px_64px_rgba(0,0,0,0.35)] transition-[box-shadow] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.65),0_12px_56px_rgba(0,220,255,0.45)] sm:min-h-0 sm:px-11"
          >
            {t("homeVideoCta")}
          </MotionLink>
          <MotionLink
            href={homeSectionHref("cases")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-white/[0.22] bg-white/[0.06] px-9 py-4 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-colors hover:border-cyan-400/35 hover:bg-white/[0.1] sm:min-h-0 sm:px-10"
          >
            {t("ctaSecondary")}
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
