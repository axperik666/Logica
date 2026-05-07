"use client";

import { useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { MotionDiv, MotionSection } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Mail, MessageCircle, Send } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";

export function Hero() {
  const t = useTranslations("hero");
  const tSec = useTranslations("sectionsSeo");
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const parallax = reduceMotion ? 0 : 1;
  const yDots = useTransform(scrollYProgress, [0, 1], [0, 28 * parallax]);
  const yLines = useTransform(scrollYProgress, [0, 1], [0, -18 * parallax]);
  const ySparkle = useTransform(scrollYProgress, [0, 1], [0, 22 * parallax]);

  const statsRaw = t.raw("stats");
  const stats = Array.isArray(statsRaw)
    ? (statsRaw as { k: string; v: string }[])
    : [];

  return (
    <MotionSection
      ref={sectionRef}
      id="hero"
      className="tech-bg relative min-h-[100svh] overflow-x-clip py-12 pt-[calc(5.75rem+env(safe-area-inset-top,0px))] pb-14 sm:min-h-screen sm:overflow-x-visible sm:py-20 sm:pt-28 sm:pb-20"
      initial={false}
      animate="show"
      variants={{
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.06,
            delayChildren: reduceMotion ? 0 : 0.02
          }
        }
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-gradient-mesh" />

        <div className="tech-grid tech-grid--hero">
          <MotionDiv
            style={{ y: yDots }}
            className="tech-grid__layer tech-grid__layer--dots tech-grid__layer--anim-dots"
          />
          <MotionDiv
            style={{ y: yLines }}
            className="tech-grid__layer tech-grid__layer--lines tech-grid__layer--anim-lines"
          />
          <MotionDiv
            style={{ y: ySparkle }}
            className="tech-grid--hero-sparkle"
          />
        </div>

        <div className="section-edge-vignette" />
      </div>

      <div className="container-px relative z-[1] w-full min-w-0 overflow-x-clip sm:overflow-x-visible">
        <div className="mx-auto w-full max-w-5xl">
          <div className="sr-only">
            <p>{tSec("hero.metaTitle")}</p>
            <p>{tSec("hero.metaDescription")}</p>
          </div>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: -16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/35 bg-[rgba(4,8,22,0.75)] px-4 py-1.5 text-xs font-medium text-white/95 shadow-[inset_0_1px_0_rgba(0,191,255,0.15),0_8px_32px_rgba(0,191,255,0.12)] backdrop-blur-md"
          >
            <span className="brand-glow">{t("badge")}</span>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 22, scale: 0.98 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <h1 className="brand-glow mt-6 text-balance break-words text-4xl font-extrabold tracking-[-0.03em] text-white drop-shadow-[0_8px_48px_rgba(0,191,255,0.42)] sm:text-5xl sm:tracking-tight md:text-6xl lg:text-7xl lg:leading-[1.05]">
              {t.rich("title", {
                br: () => <br />,
                highlight: (chunks) => (
                  <span className="text-[#C9F9FF] drop-shadow-[0_0_36px_rgba(0,191,255,0.55)]">
                    {chunks}
                  </span>
                )
              })}
            </h1>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }
              }
            }}
          >
            <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/95 sm:text-lg sm:leading-relaxed">
              {t.rich("subtitle", {
                roi: (chunks) => (
                  <span className="brand-glow mx-0.5 inline font-bold text-[#B8F6FF] drop-shadow-[0_0_28px_rgba(0,191,255,0.65)]">
                    {chunks}
                  </span>
                )
              })}
            </p>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <nav
              aria-label={t("internalNavAria")}
              className="scrollbar-hide mt-8 flex flex-nowrap gap-x-3 overflow-x-auto overflow-y-hidden border-t border-white/18 pt-8 text-sm text-white/78 [-webkit-overflow-scrolling:touch]"
            >
              <Link
                href="/uslugi"
                className="shrink-0 whitespace-nowrap font-semibold text-[#9AE8FF] underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavServices")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/40" aria-hidden>
                ·
              </span>
              <Link
                href="/kejsy"
                className="shrink-0 whitespace-nowrap font-semibold text-[#9AE8FF] underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavCasesPage")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/40" aria-hidden>
                ·
              </span>
              <Link
                href="/#cases"
                className="shrink-0 whitespace-nowrap font-semibold text-[#9AE8FF] underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavCasesAnchor")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/40" aria-hidden>
                ·
              </span>
              <Link
                href="/#testimonials"
                className="shrink-0 whitespace-nowrap font-semibold text-[#9AE8FF] underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavTestimonials")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/40" aria-hidden>
                ·
              </span>
              <Link
                href="/o-nas"
                className="shrink-0 whitespace-nowrap font-semibold text-[#9AE8FF] underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavAbout")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/40" aria-hidden>
                ·
              </span>
              <Link
                href="/#contact"
                className="shrink-0 whitespace-nowrap font-semibold text-[#9AE8FF] underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavContact")}
              </Link>
            </nav>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button
              href="/#contact"
              className="btn-cta-premium w-full min-h-[3.25rem] px-8 text-base shadow-[0_14px_48px_rgba(0,191,255,0.35)] sm:w-auto hover-lift"
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              href="/#cases"
              variant="ghost"
              className="w-full min-h-[3.25rem] border border-[#00BFFF]/38 bg-[rgba(8,12,28,0.82)] px-8 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.14),0_10px_40px_rgba(0,191,255,0.14)] backdrop-blur-md sm:w-auto hover-lift hover:border-[#00BFFF]/55 hover:bg-[rgba(0,191,255,0.1)] hover:text-white"
            >
              {t("ctaSecondary")}
            </Button>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 }
              }
            }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
              {t("quickMessengersLabel")}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={CONTACTS.telegramHttps}
                aria-label={t("contactTelegram")}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#00BFFF]/45 bg-[rgba(0,191,255,0.12)] text-[#B8F6FF] shadow-[0_0_32px_rgba(0,191,255,0.35)] transition hover:scale-105 hover:border-[#00BFFF]/65 hover:bg-[rgba(0,191,255,0.2)] hover-lift"
              >
                <Send className="h-6 w-6" aria-hidden />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("contactWhatsapp")}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/45 bg-emerald-500/15 text-emerald-300 shadow-[0_0_26px_rgba(52,211,153,0.28)] transition hover:scale-105 hover:border-emerald-400/65 hover:bg-emerald-500/22 hover-lift"
              >
                <MessageCircle className="h-6 w-6" aria-hidden />
              </a>
            </div>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
              }
            }}
            className="mt-6 flex justify-center sm:justify-start"
          >
            <a
              href={CONTACTS.mailto}
              className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/[0.09] px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:border-[#00BFFF]/40 hover:bg-white/14 hover-lift"
            >
              <Mail className="h-5 w-5 shrink-0 text-[#7AE0FF]" aria-hidden />
              {t("contactEmail")}
            </a>
          </MotionDiv>

          {stats.length > 0 ? (
            <MotionDiv
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.08 }
                }
              }}
              className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
            >
              {stats.map((x) => (
                <MotionDiv
                  key={x.k}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                    }
                  }}
                  className="glass hover-lift rounded-2xl border border-white/12 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-4"
                >
                  <p className="text-sm font-semibold text-white">{x.k}</p>
                  <div className="mt-1 text-xs font-medium text-white/78">{x.v}</div>
                </MotionDiv>
              ))}
            </MotionDiv>
          ) : null}
        </div>
      </div>
    </MotionSection>
  );
}
