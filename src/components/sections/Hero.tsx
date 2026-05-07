"use client";

import { useRef } from "react";
import {
  useInView,
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
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
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
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } }
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
        <div className="mx-auto w-full max-w-4xl">
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
            <h1 className="brand-glow mt-6 text-balance break-words text-4xl font-extrabold tracking-[-0.03em] text-white drop-shadow-[0_6px_40px_rgba(0,191,255,0.35)] sm:text-5xl sm:tracking-tight md:text-6xl lg:text-7xl lg:leading-[1.05]">
              {t("title")}
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
            <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/92 sm:text-lg sm:leading-relaxed">
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
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button
              href="/#contact"
              className="btn-cta-premium w-full min-h-[3rem] px-8 text-base shadow-[0_12px_40px_rgba(0,191,255,0.28)] sm:w-auto hover-lift"
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              href="/#cases"
              variant="ghost"
              className="w-full min-h-[3rem] border border-[#00BFFF]/35 bg-[rgba(8,12,28,0.75)] px-8 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.12),0_8px_36px_rgba(0,191,255,0.12)] backdrop-blur-md sm:w-auto hover-lift hover:border-[#00BFFF]/55 hover:bg-[rgba(0,191,255,0.08)] hover:text-white"
            >
              {t("ctaSecondary")}
            </Button>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="mt-12"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              {t("contactStripTitle")}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={CONTACTS.telegramHttps}
                className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-[#00BFFF]/35 bg-[rgba(5,10,26,0.82)] px-5 py-8 shadow-[inset_0_1px_0_rgba(0,191,255,0.15),0_12px_48px_rgba(0,0,0,0.45),0_0_40px_rgba(0,191,255,0.15)] backdrop-blur-xl transition hover:border-[#00BFFF]/55 hover:shadow-[0_0_56px_rgba(0,191,255,0.28)] hover-lift sm:gap-4 sm:px-6 sm:py-10"
              >
                <Send
                  className="h-14 w-14 text-[#7AE0FF] drop-shadow-[0_0_28px_rgba(0,191,255,0.65)] transition duration-300 group-hover:scale-110 group-hover:text-[#B8F6FF] sm:h-16 sm:w-16"
                  aria-hidden
                />
                <span className="text-base font-semibold tracking-wide text-white">
                  {t("contactTelegram")}
                </span>
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-emerald-400/35 bg-[rgba(5,26,18,0.55)] px-5 py-8 shadow-[inset_0_1px_0_rgba(52,211,153,0.12),0_12px_48px_rgba(0,0,0,0.45),0_0_36px_rgba(34,197,94,0.18)] backdrop-blur-xl transition hover:border-emerald-400/55 hover:shadow-[0_0_48px_rgba(52,211,153,0.22)] hover-lift sm:gap-4 sm:px-6 sm:py-10"
              >
                <MessageCircle
                  className="h-14 w-14 text-emerald-400 drop-shadow-[0_0_26px_rgba(52,211,153,0.55)] transition duration-300 group-hover:scale-110 group-hover:text-emerald-300 sm:h-16 sm:w-16"
                  aria-hidden
                />
                <span className="text-base font-semibold tracking-wide text-white">
                  {t("contactWhatsapp")}
                </span>
              </a>
            </div>
            <div className="mt-5 flex justify-center sm:justify-start">
              <a
                href={CONTACTS.mailto}
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.07] px-5 py-2.5 text-sm font-semibold text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-[#00BFFF]/35 hover:bg-white/12 hover-lift"
              >
                <Mail className="h-5 w-5 shrink-0 text-[#7AE0FF]" aria-hidden />
                {t("contactEmail")}
              </a>
            </div>
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
