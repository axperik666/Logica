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
      className="tech-bg relative py-20 min-h-screen pt-24"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } }
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

      <div className="container-px relative z-[1] flex min-h-screen items-center pb-14">
        <div className="w-full max-w-3xl">
          <div className="sr-only">
            <p>{tSec("hero.metaTitle")}</p>
            <p>{tSec("hero.metaDescription")}</p>
          </div>
          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: -14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
          >
            <span className="brand-glow">{t("badge")}</span>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: -18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <h1 className="brand-glow mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {t.rich("title", {
                br: () => <br />,
                highlight: (chunks) => (
                  <span className="bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent">
                    {chunks}
                  </span>
                )
              })}
            </h1>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: -16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {t("subtitle")}
            </p>
          </MotionDiv>

          <nav
            aria-label={t("internalNavAria")}
            className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/70"
          >
            <Link
              href="/uslugi"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalNavServices")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/kejsy"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalNavCasesPage")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/#cases"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalNavCasesAnchor")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/#testimonials"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalNavTestimonials")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/o-nas"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalNavAbout")}
            </Link>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <Link
              href="/#contact"
              className="font-medium text-primary underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("internalNavContact")}
            </Link>
          </nav>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: -14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              href="/#contact"
              className="btn-cta-premium w-full sm:w-auto hover-lift"
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              href="/#cases"
              variant="ghost"
              className="w-full border-[rgba(0,191,255,0.22)] bg-[rgba(15,15,35,0.45)] shadow-[0_0_24px_rgba(0,191,255,0.08)] sm:w-auto hover-lift hover:border-[rgba(0,191,255,0.35)]"
            >
              {t("ctaSecondary")}
            </Button>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              {t("contactStripTitle")}
            </div>
            <div className="flex flex-wrap items-stretch justify-end gap-2">
              <a
                href={CONTACTS.telegramHttps}
                className="inline-flex min-w-[9.5rem] flex-col gap-0.5 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-2.5 text-left transition hover:border-primary/45 hover:bg-primary/15 hover-lift"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
                  <Send className="h-4 w-4 shrink-0 text-primary" />
                  {t("contactTelegram")}
                </span>
                <span className="pl-6 text-[11px] leading-tight text-white/55">
                  {CONTACTS.telegramDisplay}
                </span>
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[9.5rem] flex-col gap-0.5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5 text-left transition hover:border-emerald-400/40 hover:bg-emerald-500/15 hover-lift"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
                  <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                  {t("contactWhatsapp")}
                </span>
                <span className="pl-6 text-[11px] leading-tight text-white/55">
                  {CONTACTS.whatsappDisplay}
                </span>
              </a>
              <a
                href={CONTACTS.mailto}
                className="inline-flex items-center gap-2 self-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/85 transition hover:bg-white/10 hover-lift"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                {t("contactEmail")}
              </a>
            </div>
          </MotionDiv>

          {stats.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((x) => (
                <div key={x.k} className="glass hover-lift rounded-2xl p-4">
                  <p className="text-sm font-semibold">{x.k}</p>
                  <div className="mt-1 text-xs text-muted">{x.v}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </MotionSection>
  );
}
