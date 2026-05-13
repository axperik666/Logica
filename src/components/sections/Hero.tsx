"use client";

import { type ReactNode, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { homeHashHref, homeSectionHref } from "@/lib/navHref";
import { cn } from "@/lib/cn";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const MotionLink = motion(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;

const NARROW_MQ = "(max-width: 767px)";

function subscribeMaxMd767(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(NARROW_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getMaxMd767(): boolean {
  return typeof window !== "undefined" && window.matchMedia(NARROW_MQ).matches;
}

type HeroProps = {
  children?: ReactNode;
};

export function Hero({ children }: HeroProps) {
  const t = useTranslations("hero");
  const [videoActive, setVideoActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallax = useMouseParallax(sectionRef, { maxPx: 72, layerBoost: 1.12 });
  const reduceMotion = useReducedMotion();
  /** Мобилка: без scroll/parallax на контенте и слоях — иначе скачки dvh/адресной строки дают «мигание». */
  const narrowMobile = useSyncExternalStore(subscribeMaxMd767, getMaxMd767, () => false);
  const motionLayers = !reduceMotion && !narrowMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const scrollSmooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35
  });
  const heroContentFade = useTransform(scrollSmooth, [0, 0.38], [1, 0.78]);
  const heroContentLift = useTransform(scrollSmooth, [0, 1], [0, 56]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate flex min-h-[100dvh] overflow-hidden bg-[#020308] max-md:flex-col md:items-center md:justify-center"
    >
      <motion.div
        className="absolute inset-0 z-0 will-change-transform md:inset-[-5%]"
        style={motionLayers ? { x: parallax.backX, y: parallax.backY } : undefined}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoActive(true)}
          onPlaying={() => setVideoActive(true)}
          className={cn(
            "h-full w-full",
            "max-md:object-contain max-md:object-center max-md:scale-100 max-md:opacity-100",
            "md:transition-opacity md:duration-[900ms] md:ease-out",
            /* Десктоп: full-bleed без полос (cover) */
            "md:object-cover md:object-[center_42%] md:scale-100",
            "scale-[1.02] brightness-[1.12] contrast-[1.03] saturate-[1.06]",
            "md:brightness-[1.12] md:contrast-[1.04] md:saturate-[1.05]",
            videoActive ? "md:opacity-100" : "md:opacity-0"
          )}
        >
          <source src="/videos/site-bg-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Canvas над видео, под градиентом — сеть и «орбиты» читаются на мобилке */}
      {children}

      {/* Один слой: тон + aurora + лёгкая виньетка (mid parallax) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] will-change-transform bg-gradient-to-b from-black/10 via-[#141c32]/38 to-black/55 max-md:from-black/[0.02] max-md:via-[#182238]/10 max-md:to-black/18 md:from-black/[0.04] md:via-[#141c32]/22 md:to-black/38"
        style={motionLayers ? { x: parallax.midX, y: parallax.midY } : undefined}
      >
        <div className="premium-aurora hero-premium-aurora absolute inset-0 md:opacity-[0.55]" />
        <div
          className="pointer-events-none absolute inset-0 max-md:[box-shadow:inset_0_0_40px_rgba(0,0,0,0.1),inset_0_0_100px_rgba(0,0,0,0.06)] md:[box-shadow:inset_0_0_90px_rgba(0,0,0,0.22),inset_0_0_180px_rgba(0,0,0,0.12),inset_0_-80px_120px_rgba(0,180,255,0.04)]"
          aria-hidden
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col px-4 text-center sm:px-6 max-md:flex-1 max-md:justify-between max-md:pt-0 max-md:pb-[max(0.75rem,env(safe-area-inset-bottom))] md:block md:min-h-0 md:py-0"
        style={
          reduceMotion || narrowMobile
            ? undefined
            : {
                opacity: heroContentFade,
                y: heroContentLift
              }
        }
      >
        <div className="max-md:-mt-1 max-md:shrink-0 md:contents">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: easeOut }}
            className="mx-auto mb-4 hidden max-w-[22rem] text-pretty text-[9px] font-semibold uppercase leading-snug tracking-[0.28em] text-cyan-200/85 min-[400px]:max-w-none min-[400px]:text-[10px] min-[400px]:tracking-[0.34em] sm:mb-5 sm:text-[11px] sm:tracking-[0.38em] md:mb-5 md:block"
          >
            {t("homeHeroKicker")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.68, delay: 0.05, ease: easeOut }}
            className="mb-6 hidden w-full justify-center md:mb-10 md:flex"
          >
            <div className="rounded-2xl border border-white/[0.16] bg-white/[0.07] px-8 py-4 shadow-[0_0_0_1px_rgba(0,220,255,0.18),0_28px_96px_rgba(0,0,0,0.5),0_0_80px_rgba(0,200,255,0.28)] backdrop-blur-xl sm:px-10 sm:py-5">
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
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.1, ease: easeOut }}
            className="mx-auto mb-3 max-w-[min(100%,22rem)] text-pretty text-[clamp(1.35rem,5.9vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.75),0_1px_0_rgba(0,0,0,0.5)] min-[400px]:max-w-none min-[480px]:text-[clamp(1.85rem,7vw,3.75rem)] max-md:mb-2 sm:mb-6 sm:leading-[1.02] sm:tracking-[-0.04em] md:mb-5 md:text-7xl md:leading-[1.08] md:tracking-[-0.035em] md:[text-shadow:0_6px_64px_rgba(0,0,0,0.65)] lg:text-8xl"
          >
            {t("homeVideoLine1")}
            <br />
            <span className="bg-gradient-to-r from-[#7ee8ff] via-[#00c8ff] to-[#e8d4ff] bg-clip-text text-transparent [filter:drop-shadow(0_2px_20px_rgba(0,0,0,0.55))] md:[filter:none]">
              {t("homeVideoHighlight")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.14, ease: easeOut }}
            className="mx-auto mb-8 hidden max-w-xl text-pretty text-[0.9375rem] font-medium leading-snug text-white/72 sm:mb-12 sm:max-w-2xl sm:text-xl sm:leading-relaxed md:block"
          >
            {t("homeVideoSub")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.12, ease: easeOut }}
            className="mx-auto mb-0 max-w-md text-pretty text-[0.9rem] font-medium leading-snug text-white/90 max-md:mb-0 md:hidden"
          >
            {t("homeVideoSubMobile")}
          </motion.p>
        </div>

        <div className="max-md:mt-auto max-md:flex max-md:flex-col max-md:gap-5 md:contents">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.2, ease: easeOut }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MotionLink
              href="/kontakty"
              whileHover={{ scale: 1.045 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-gradient-to-r from-white via-white to-white/95 px-6 py-3.5 text-center text-sm font-semibold text-[#0a0a12] shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_10px_48px_rgba(0,210,255,0.42),0_28px_72px_rgba(0,0,0,0.4)] transition-[box-shadow] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.72),0_14px_64px_rgba(0,230,255,0.52)] sm:min-h-0 sm:px-11 sm:py-4 sm:text-base"
            >
              {t("homeVideoCta")}
            </MotionLink>
            <MotionLink
              href={homeSectionHref("cases")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-white/[0.22] bg-white/[0.06] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-colors hover:border-cyan-400/35 hover:bg-white/[0.1] max-md:bg-black/30 max-md:backdrop-blur-none sm:min-h-0 sm:px-10 sm:py-4 sm:text-base"
            >
              {t("ctaSecondary")}
            </MotionLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.55, ease: easeOut }}
            className="mt-10 flex flex-col items-center gap-2 max-md:mt-0 sm:mt-16"
          >
            <Link
              href={homeHashHref("platforms")}
              className="group inline-flex flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45 transition-[gap,color] duration-300 ease-out hover:text-cyan-200/90 group-hover:gap-0"
            >
              <span className="block max-h-10 overflow-hidden text-center transition-[max-height,opacity,margin] duration-300 ease-out group-hover:max-h-0 group-hover:opacity-0 group-hover:mb-0">
                {t("scrollDiscover")}
              </span>
              <motion.span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-[border,background] group-hover:border-cyan-400/25 group-hover:bg-white/[0.07] max-md:bg-black/35 max-md:backdrop-blur-none"
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, 11, 0] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 1.65, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <ChevronDown className="h-5 w-5 text-cyan-200/75" strokeWidth={2} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
