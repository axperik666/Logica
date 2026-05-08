"use client";

import { useReducedMotion } from "framer-motion";
import { MotionDiv, MotionSection } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Mail, MessageCircle, Send } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tSec = useTranslations("sectionsSeo");
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
      className="tech-bg relative min-h-[100svh] overflow-x-clip py-12 pt-[calc(5.75rem+env(safe-area-inset-top,0px))] pb-[max(3.5rem,calc(1.35rem+env(safe-area-inset-bottom,0px)))] sm:min-h-screen sm:overflow-x-visible sm:py-20 sm:pt-28 sm:pb-20"
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
        <div className="hero-gradient-mesh" />

        <div className="tech-grid tech-grid--hero">
          <div className="tech-grid__layer tech-grid__layer--dots tech-grid__layer--anim-dots" />
          <div className="tech-grid__layer tech-grid__layer--lines tech-grid__layer--anim-lines" />
          <div className="tech-grid--hero-sparkle" />
        </div>

        <div className="tech-grid--hero-fine" />

        <div className="hero-corner-glow" />

        <div className="section-edge-vignette section-edge-vignette--hero" />
      </div>

      <div className="container-px relative z-[1] w-full min-w-0 overflow-x-clip sm:overflow-x-visible">
        <div className="mx-auto w-full max-w-5xl">
          <div className="sr-only">
            <p>{tSec("hero.metaTitle")}</p>
            <p>{tSec("hero.metaDescription")}</p>
          </div>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 36, scale: 0.96 },
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
            <h1 className="brand-glow mt-6 text-balance break-words text-[clamp(2rem,6.5vw,5.45rem)] font-black leading-[1.02] tracking-[-0.045em] text-white sm:tracking-[-0.04em] md:leading-[1.03] md:tracking-[-0.038em] drop-shadow-[0_16px_80px_rgba(0,191,255,0.55)] [text-shadow:0_2px_0_rgba(0,0,0,0.35),0_0_60px_rgba(0,191,255,0.45)]">
              {t.rich("title", {
                br: () => <br />,
                highlight: (chunks) => (
                  <span className="relative inline-block bg-gradient-to-r from-[#E8FDFF] via-[#7AE0FF] to-[#00BFFF] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,191,255,0.75)]">
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
            <p className="mt-7 max-w-3xl text-[1.05rem] font-semibold leading-relaxed text-white sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed">
              {t.rich("subtitle", {
                roi: (chunks) => (
                  <span className="mx-0.5 inline font-extrabold text-[#D8FDFF] drop-shadow-[0_0_32px_rgba(0,191,255,0.85)]">
                    {chunks}
                  </span>
                )
              })}
            </p>
          </MotionDiv>

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
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button
              href="/#contact"
              className="btn-cta-premium w-full min-h-[3.35rem] px-8 text-base font-bold shadow-[0_18px_56px_rgba(0,191,255,0.42)] sm:w-auto hover-lift"
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              href="/#cases"
              variant="ghost"
              className="w-full min-h-[3.35rem] border border-[#00BFFF]/48 bg-[rgba(6,14,32,0.92)] px-8 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.18),0_12px_44px_rgba(0,191,255,0.2)] backdrop-blur-md sm:w-auto hover-lift hover:border-[#00BFFF]/62 hover:bg-[rgba(0,191,255,0.14)] hover:text-white"
            >
              {t("ctaSecondary")}
            </Button>
          </MotionDiv>

          {/* Быстрые мессенджеры сразу под основными CTA */}
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
            className="mt-5"
          >
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#B8E8FF] sm:text-xs">
              {t("quickMessengersLabel")}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4">
              <a
                href={CONTACTS.telegramHttps}
                aria-label={t("contactTelegram")}
                className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-2xl border border-[#00BFFF]/52 bg-[rgba(0,191,255,0.14)] px-4 py-3 text-sm font-bold text-white shadow-[0_0_36px_rgba(0,191,255,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:border-[#00BFFF]/75 hover:bg-[rgba(0,191,255,0.24)] hover:shadow-[0_0_48px_rgba(0,191,255,0.45)] hover-lift sm:min-w-[11rem] sm:px-6"
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
                className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-2xl border border-emerald-400/48 bg-emerald-500/18 px-4 py-3 text-sm font-bold text-white shadow-[0_0_32px_rgba(52,211,153,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-emerald-400/68 hover:bg-emerald-500/28 hover:shadow-[0_0_44px_rgba(52,211,153,0.38)] hover-lift sm:min-w-[11rem] sm:px-6"
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
            className="mt-7 flex justify-center sm:justify-start"
          >
            <a
              href={CONTACTS.mailto}
              className="inline-flex items-center gap-2 rounded-full border border-white/28 bg-white/[0.11] px-5 py-2.5 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition hover:border-[#00BFFF]/48 hover:bg-white/18 hover-lift"
            >
              <Mail className="h-5 w-5 shrink-0 text-[#9AE8FF]" aria-hidden />
              {t("contactEmail")}
            </a>
          </MotionDiv>

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
          >
            <nav
              aria-label={t("internalNavAria")}
              className="scrollbar-hide mt-10 flex flex-nowrap gap-x-3 overflow-x-auto overflow-y-hidden border-t border-white/22 pt-10 text-sm font-semibold text-[#C8F6FF] [-webkit-overflow-scrolling:touch]"
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
                href="/#cases"
                className="shrink-0 whitespace-nowrap underline-offset-4 transition hover:text-white hover:underline"
              >
                {t("internalNavCasesAnchor")}
              </Link>
              <span className="shrink-0 text-[#00BFFF]/55" aria-hidden>
                ·
              </span>
              <Link
                href="/#testimonials"
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
                href="/#contact"
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
              className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
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
      </div>
    </MotionSection>
  );
}
