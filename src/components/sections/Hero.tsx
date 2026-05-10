"use client";

import { useId } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { MotionDiv, MotionSection } from "@/components/motion";
import { GrowthLottie } from "@/components/motion/GrowthLottie";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Mail, MessageCircle, Send, TrendingUp } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";
import { cn } from "@/lib/cn";
import { homeSectionHref } from "@/lib/navHref";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function HeroAmbientDecor() {
  return (
    <div aria-hidden className="hero-ambient-lines pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="hero-ambient-lines__beam absolute left-[10%] top-[26%] w-[55%] max-w-3xl -rotate-[7deg] opacity-[0.55] max-lg:left-[5%] max-lg:opacity-[0.38]"
      />
      <div className="hero-ambient-lines__beam absolute right-[6%] top-[42%] w-[38%] max-w-xl rotate-[4deg] opacity-45 max-lg:hidden" />
      <div className="hero-ambient-lines__beam absolute bottom-[28%] left-[44%] hidden w-[28%] rotate-[11deg] opacity-35 lg:block" />
    </div>
  );
}

function HeroParticles({ side }: { side: "left" | "right" }) {
  const delays = ["0s", "2.2s", "4.5s", "1.1s", "3.3s", "5s"];
  const positions =
    side === "right"
      ? [
          "left-[8%] top-[14%] h-2 w-2",
          "left-[52%] top-[28%] h-2.5 w-2.5",
          "right-[18%] top-[22%] h-1.5 w-1.5",
          "left-[28%] bottom-[30%] h-2 w-2",
          "right-[8%] bottom-[38%] h-2 w-2",
          "left-[68%] bottom-[22%] h-1.5 w-1.5"
        ]
      : [
          "left-[8%] top-[18%] h-1.5 w-1.5",
          "right-[12%] top-[24%] h-2 w-2",
          "left-[42%] top-[8%] h-1.5 w-1.5",
          "left-[18%] bottom-[16%] h-2 w-2",
          "right-[22%] bottom-[12%] h-1.5 w-1.5",
          "left-[55%] bottom-[24%] h-1.5 w-1.5"
        ];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-visible",
        side === "right"
          ? "inset-y-[8%] right-0 z-0 hidden w-[min(92%,620px)] lg:block"
          : "inset-x-0 top-0 z-0 h-40 w-full overflow-visible lg:hidden"
      )}
    >
      {positions.map((pos, i) => (
        <span
          key={`${side}-${i}`}
          className={cn("hero-particle absolute", pos)}
          style={{ animationDelay: delays[i] }}
        />
      ))}
    </div>
  );
}

function HeroRoiVisual({
  compact,
  reduceMotion
}: {
  compact?: boolean;
  reduceMotion: boolean | null;
}) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const fillId = `hero-chart-fill-${uid}`;
  const strokeId = `hero-chart-stroke-${uid}`;
  const glowId = `hero-chart-glow-${uid}`;
  const t = useTranslations("hero");

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        compact ? "py-2" : "min-h-[300px] py-5 lg:min-h-[min(460px,58vh)] lg:py-10"
      )}
    >
      {!compact ? <HeroParticles side="right" /> : null}

      <div
        className={cn(
          "relative w-full",
          compact ? "max-w-[100%]" : "max-w-full"
        )}
      >
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/35 bg-[rgba(0,191,255,0.1)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B8F0FF] shadow-[0_0_28px_rgba(0,191,255,0.25)] backdrop-blur-md sm:text-[11px]",
            compact ? "mx-auto" : "mx-auto lg:mx-0 lg:self-start"
          )}
        >
          <TrendingUp className="h-4 w-4 text-[#7AE0FF]" aria-hidden />
          {t("visualRoiPill")}
        </div>

        <div className={cn("relative", compact ? "h-[120px]" : "h-[min(240px,38vw)] lg:h-[min(300px,34vh)] xl:h-[min(340px,32vh)]")}>
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 440 200"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,191,255,0.55)" />
                <stop offset="55%" stopColor="rgba(138,43,226,0.12)" />
                <stop offset="100%" stopColor="rgba(0,191,255,0)" />
              </linearGradient>
              <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06bfff" />
                <stop offset="55%" stopColor="#00BFFF" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 0 165 C 72 158 118 132 168 108 C 228 78 268 52 322 38 C 362 26 402 22 440 18 L 440 200 L 0 200 Z"
              fill={`url(#${fillId})`}
              opacity={0.5}
            />
            <path
              d="M 0 165 C 72 158 118 132 168 108 C 228 78 268 52 322 38 C 362 26 402 22 440 18"
              fill="none"
              stroke={`url(#${strokeId})`}
              strokeWidth={compact ? 2.6 : 4}
              strokeLinecap="round"
              filter={`url(#${glowId})`}
              opacity={0.98}
            />
          </svg>

          <div
            className={cn(
              "pointer-events-none absolute -right-1 top-[8%] rounded-2xl border border-white/15 bg-[rgba(6,10,26,0.65)] px-3 py-2 text-[10px] font-semibold text-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:text-xs",
              compact ? "hidden sm:block" : "hidden lg:block"
            )}
          >
            <span className="text-emerald-300/95">▲</span> {t("visualLiveBadge")}
          </div>
        </div>

        {!compact && !reduceMotion ? (
          <div className="pointer-events-none -mt-1 mb-1 flex justify-center lg:-mt-2 lg:justify-start lg:pl-1">
            <div
              className="h-14 w-36 opacity-[0.92] sm:h-16 sm:w-44 lg:h-[4.5rem] lg:w-52 [filter:drop-shadow(0_0_20px_rgba(0,191,255,0.4))]"
              aria-hidden
            >
              <GrowthLottie src="/lottie/growth-pulse.json" className="h-full w-full" />
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "relative z-[2] mt-2 flex flex-col items-center lg:items-start",
            reduceMotion ? "" : "hero-roi-float"
          )}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#8AD9FF]/85">
            {t("roiVisualKicker")}
          </p>
          <p
            className={cn(
              "font-black tabular-nums tracking-[-0.06em] text-transparent",
              "bg-gradient-to-br from-[#F0FEFF] via-[#7AE0FF] to-[#00BFFF] bg-clip-text",
              compact
                ? "text-[clamp(3.25rem,18vw,4.5rem)] leading-[0.92]"
                : "text-[clamp(4rem,14vw,9.5rem)] leading-[0.86]"
            )}
            style={{
              filter:
                "drop-shadow(0 0 48px rgba(0,191,255,0.65)) drop-shadow(0 0 100px rgba(0,191,255,0.35))"
            }}
          >
            3–7×
          </p>
          <p className="mt-3 max-w-[18rem] text-center text-[11px] font-medium leading-snug text-white/58 lg:text-left lg:text-xs xl:max-w-[20rem]">
            {t("roiVisualCaption")}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const tSec = useTranslations("sectionsSeo");
  const tSeo = useTranslations("seo");
  const reduceMotion = useReducedMotion();
  const narrow = useNarrowViewport();

  const statsRaw = t.raw("stats");
  const stats = Array.isArray(statsRaw)
    ? (statsRaw as { k: string; v: string }[])
    : [];

  const stagger = reduceMotion ? 0 : narrow ? 0.045 : 0.09;
  const delayChild = reduceMotion ? 0 : narrow ? 0.02 : 0.05;
  const fast = reduceMotion || narrow;

  return (
    <MotionSection
      id="hero"
      className="hero-section full-bleed tech-bg relative min-h-[100svh] py-16 pb-[max(4rem,calc(1.5rem+env(safe-area-inset-bottom,0px)))] sm:min-h-screen sm:overflow-x-visible sm:py-20 sm:pb-20 lg:py-24 lg:pb-24 xl:py-28"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delayChild,
            when: "beforeChildren"
          }
        }
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.34]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/hero-growth.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#070b12]/80 to-[#060b18]" />
        <div className="hero-gradient-mesh" />

        <div className="tech-grid tech-grid--hero">
          <div className="tech-grid__layer tech-grid__layer--dots tech-grid__layer--anim-dots" />
          <div className="tech-grid__layer tech-grid__layer--lines tech-grid__layer--anim-lines" />
          <div className="tech-grid--hero-sparkle" />
        </div>

        <div className="tech-grid--hero-fine" />

        <div className="hero-right-grid-mask max-lg:hidden" />

        <HeroAmbientDecor />

        <div className="hero-corner-glow" />

        <div className="section-edge-vignette section-edge-vignette--hero" />
      </div>

      <div className="site-container relative z-[1] w-full min-w-0 overflow-x-visible">
          <div className="sr-only">
            <p>{tSec("hero.metaTitle")}</p>
            <p>{tSec("hero.metaDescription")}</p>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-10 2xl:gap-12">
            {/* Слева ~70%: типографика, асимметрия как у премиум-студий */}
            <div className="w-full shrink-0 lg:w-[70%] lg:max-w-[70%] lg:pr-2 xl:pr-4">
              <div className="relative border-l-[3px] border-[#00BFFF]/40 bg-gradient-to-r from-[rgba(0,191,255,0.09)] via-[rgba(0,191,255,0.03)] to-transparent py-1 pl-5 sm:pl-7 lg:border-l-[4px] lg:pl-9 xl:pl-11">
                <HeroParticles side="left" />

                <div className="relative z-[1]">
                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: fast ? 0.2 : 0.72,
                        ease: easeOutExpo
                      }
                    }
                  }}
                  className="mb-5 inline-flex items-center gap-3 lg:mb-6"
                >
                  <Image
                    src="/logo.png"
                    alt={tSeo("logoAlt")}
                    width={160}
                    height={48}
                    className="h-10 w-auto sm:h-12"
                    priority
                  />
                </MotionDiv>

                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, y: 36, scale: 0.97 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: fast ? 0.22 : 0.95,
                        ease: easeOutExpo
                      }
                    }
                  }}
                >
                  <h1 className="brand-glow text-left text-balance break-words text-[clamp(2.85rem,7.8vw,6.75rem)] font-black leading-[1.02] tracking-[-0.048em] text-white sm:tracking-[-0.042em] md:leading-[1.03] md:tracking-[-0.04em] lg:text-[clamp(3rem,7.2vw,5.5rem)] xl:text-[clamp(3.25rem,7.8vw,6.75rem)] drop-shadow-[0_16px_92px_rgba(0,191,255,0.5)] [text-shadow:0_2px_0_rgba(0,0,0,0.35),0_0_72px_rgba(0,191,255,0.42)]">
                    {t.rich("title", {
                      br: () => <br />,
                      highlight: (chunks) => (
                        <span className="relative inline-block bg-gradient-to-r from-[#E8FDFF] via-[#7AE0FF] to-[#00BFFF] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,191,255,0.72)]">
                          {chunks}
                        </span>
                      )
                    })}
                  </h1>
                </MotionDiv>

                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: fast ? 0.42 : 0.78,
                        ease: easeOutExpo,
                        delay: fast ? 0 : 0.06
                      }
                    }
                  }}
                >
                  <p className="mt-7 max-w-2xl text-left text-[1.05rem] font-semibold leading-relaxed text-white/92 sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:mt-8 xl:max-w-[42rem]">
                    {t.rich("subtitle", {
                      roi: (chunks) => (
                        <span className="mx-0.5 inline font-extrabold text-[#D8FDFF] drop-shadow-[0_0_32px_rgba(0,191,255,0.85)]">
                          {chunks}
                        </span>
                      )
                    })}
                  </p>
                </MotionDiv>

                <div className="mt-8 lg:hidden">
                  <HeroRoiVisual compact reduceMotion={reduceMotion} />
                </div>

                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: fast ? 0.38 : 0.65,
                        ease: easeOutExpo
                      }
                    }
                  }}
                  className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start"
                >
                  <Button
                    href={homeSectionHref("contact")}
                    className="btn-cta-premium w-full min-h-[3.35rem] px-8 text-base font-bold shadow-[0_0_42px_rgba(0,191,255,0.55),0_22px_64px_rgba(0,191,255,0.38)] ring-1 ring-[#00BFFF]/35 sm:w-auto hover-lift"
                  >
                    {t("ctaPrimary")}
                  </Button>
                  <Button
                    href={homeSectionHref("cases")}
                    variant="ghost"
                    className="w-full min-h-[3.35rem] border border-[#00BFFF]/48 bg-[rgba(6,14,32,0.92)] px-8 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.18),0_12px_44px_rgba(0,191,255,0.2)] backdrop-blur-md sm:w-auto hover-lift hover:border-[#00BFFF]/62 hover:bg-[rgba(0,191,255,0.14)] hover:text-white"
                  >
                    {t("ctaSecondary")}
                  </Button>
                </MotionDiv>

                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: fast ? 0.36 : 0.62,
                        ease: easeOutExpo,
                        delay: fast ? 0 : 0.04
                      }
                    }
                  }}
                  className="mt-6 w-full max-w-xl"
                >
                  <p className="mb-3 text-left text-[11px] font-bold uppercase tracking-[0.26em] text-[#B8E8FF] sm:text-xs">
                    {t("quickMessengersLabel")}
                  </p>
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start sm:gap-4">
                    <a
                      href={CONTACTS.telegramHttps}
                      aria-label={t("contactTelegram")}
                      className="group inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-2xl border border-[#00BFFF]/52 bg-[rgba(0,191,255,0.14)] px-4 py-3 text-sm font-bold text-white shadow-[0_0_36px_rgba(0,191,255,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:border-[#00BFFF]/80 hover:bg-[rgba(0,191,255,0.26)] hover:shadow-[0_0_70px_rgba(0,191,255,0.55),0_0_22px_rgba(0,191,255,0.38)] hover-lift sm:w-auto sm:min-w-[11rem] sm:px-6"
                    >
                      <Send
                        className="h-6 w-6 shrink-0 text-[#9AE8FF] transition group-hover:scale-110"
                        aria-hidden
                      />
                      <span className="truncate">{t("contactTelegram")}</span>
                    </a>
                    <a
                      href={CONTACTS.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("contactWhatsapp")}
                      className="group inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-2xl border border-emerald-400/48 bg-emerald-500/18 px-4 py-3 text-sm font-bold text-white shadow-[0_0_32px_rgba(52,211,153,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-emerald-400/72 hover:bg-emerald-500/30 hover:shadow-[0_0_64px_rgba(52,211,153,0.45),0_0_18px_rgba(52,211,153,0.32)] hover-lift sm:w-auto sm:min-w-[11rem] sm:px-6"
                    >
                      <MessageCircle
                        className="h-6 w-6 shrink-0 text-emerald-200 transition group-hover:scale-110"
                        aria-hidden
                      />
                      <span className="truncate">{t("contactWhatsapp")}</span>
                    </a>
                  </div>
                </MotionDiv>

                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: fast ? 0.34 : 0.58,
                        ease: easeOutExpo
                      }
                    }
                  }}
                  className="mt-7 flex w-full max-w-xl justify-start"
                >
                  <a
                    href={CONTACTS.mailto}
                    className="inline-flex items-center gap-2 rounded-full border border-white/28 bg-white/[0.11] px-5 py-2.5 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition hover:border-[#00BFFF]/48 hover:bg-white/18 hover-lift"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-[#9AE8FF]" aria-hidden />
                    {t("contactEmail")}
                  </a>
                </MotionDiv>
                </div>
              </div>
            </div>

            {/* Справа ~30%: крупный ROI-визуал */}
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 28, scale: 0.96 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: fast ? 0.35 : 0.85,
                    ease: easeOutExpo,
                    delay: fast ? 0 : 0.08
                  }
                }
              }}
              className="relative hidden min-h-0 w-full shrink-0 lg:flex lg:w-[30%] lg:max-w-[30%] lg:items-stretch lg:justify-stretch"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 opacity-90"
              >
                <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(0,191,255,0.26),rgba(138,43,226,0.18),rgba(0,191,255,0.26))] blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,191,255,0.22),transparent_62%)] blur-2xl" />
              </div>
              <div className="pointer-events-none absolute -inset-[2px] rounded-[2.35rem] bg-gradient-to-br from-[#00BFFF]/25 via-transparent to-[#a855f740] opacity-90 blur-xl" />
              <div className="hero-roi-stage relative z-[1] flex h-full min-h-[min(440px,58vh)] w-full flex-col justify-center rounded-[2.25rem] border border-white/[0.12] bg-[linear-gradient(165deg,rgba(6,12,32,0.72)_0%,rgba(4,8,22,0.55)_45%,rgba(5,8,28,0.62)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-7 xl:p-9">
                <HeroRoiVisual reduceMotion={reduceMotion} />
              </div>
            </MotionDiv>
          </div>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: fast ? 0.34 : 0.62,
                  ease: easeOutExpo
                }
              }
            }}
            className="mt-12 w-full"
          >
            <nav
              aria-label={t("internalNavAria")}
              className="scrollbar-hide flex w-full max-w-4xl flex-nowrap justify-start gap-x-3 overflow-x-auto overflow-y-hidden border-t border-white/22 pt-10 text-sm font-semibold text-[#C8F6FF] [-webkit-overflow-scrolling:touch]"
            >
              <Link
                href="/uslugi"
                className="shrink-0 whitespace-nowrap underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavServices")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/55" aria-hidden>
                ·
              </span>
              <Link
                href="/kejsy"
                className="shrink-0 whitespace-nowrap underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavCasesPage")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/55" aria-hidden>
                ·
              </span>
              <Link
                href={homeSectionHref("cases")}
                className="shrink-0 whitespace-nowrap underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavCasesAnchor")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/55" aria-hidden>
                ·
              </span>
              <Link
                href="/otzyvy"
                className="shrink-0 whitespace-nowrap underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavTestimonials")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/55" aria-hidden>
                ·
              </span>
              <Link
                href="/o-nas"
                className="shrink-0 whitespace-nowrap underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavAbout")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/55" aria-hidden>
                ·
              </span>
              <Link
                href={homeSectionHref("contact")}
                className="shrink-0 whitespace-nowrap underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavContact")}
              </Link>
            </nav>
          </MotionDiv>

          {stats.length > 0 ? (
            <MotionDiv
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: fast ? 0 : narrow ? 0.04 : 0.08,
                    delayChildren: fast ? 0 : narrow ? 0.03 : 0.06
                  }
                }
              }}
              className="mt-12 grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
            >
              {stats.map((x) => (
                <MotionDiv
                  key={x.k}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: fast ? 0.34 : 0.58,
                        ease: easeOutExpo
                      }
                    }
                  }}
                  className="glass hover-lift rounded-2xl border border-white/16 bg-white/[0.04] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] sm:p-4"
                >
                  <p className="text-sm font-bold text-white">{x.k}</p>
                  <div className="mt-1 text-xs font-semibold text-[#D2F5FF]/95">
                    {x.v}
                  </div>
                </MotionDiv>
              ))}
            </MotionDiv>
          ) : null}
      </div>
    </MotionSection>
  );
}
