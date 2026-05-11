"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const MotionLink = motion(Link);

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/75 to-black" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,180,255,0.25), transparent 55%)"
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/logo.png"
            alt="LOGICA Marketing"
            width={320}
            height={80}
            className="h-14 w-auto sm:h-20"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mb-6 text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {t("homeVideoLine1")}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#00b4ff] via-cyan-300 to-white/95 bg-clip-text text-transparent">
            {t("homeVideoHighlight")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 sm:text-2xl"
        >
          {t("homeVideoSub")}
        </motion.p>

        <MotionLink
          href="/kontakty"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block w-full rounded-2xl bg-gradient-to-r from-white to-white/95 px-10 py-5 text-lg font-semibold text-black shadow-[0_0_48px_rgba(0,180,255,0.35)] transition-[box-shadow] hover:shadow-[0_0_64px_rgba(0,180,255,0.55)] sm:w-auto sm:px-12"
        >
          {t("homeVideoCta")}
        </MotionLink>
      </div>
    </section>
  );
}

export default Hero;
