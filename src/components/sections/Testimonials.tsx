"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useInView
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useLocale, useTranslations } from "next-intl";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";

const AUTO_MS_DESKTOP = 7200;
const AUTO_MS_NARROW = 5200;

type Item = {
  name: string;
  role: string;
  text: string;
  result: string;
  avatarId: number;
};

export function Testimonials() {
  const t = useTranslations("testimonials");
  const tAvatar = useTranslations("seo");
  const tSec = useTranslations("sectionsSeo");
  const locale = useLocale();
  const rawItems = t.raw("items");
  const items = Array.isArray(rawItems) ? (rawItems as Item[]) : [];
  const reduceMotion = useReducedMotion();
  const narrow = useNarrowViewport();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 100px 0px"
  });

  const len = items.length;
  const [index, setIndex] = useState(0);
  const dirRef = useRef(1);

  const prev = () => {
    if (!len) return;
    dirRef.current = -1;
    setIndex((i) => (i - 1 + len) % len);
  };

  const next = () => {
    if (!len) return;
    dirRef.current = 1;
    setIndex((i) => (i + 1) % len);
  };

  useEffect(() => {
    setIndex(0);
  }, [locale]);

  useEffect(() => {
    if (reduceMotion || !len) return;
    const id = window.setInterval(() => {
      dirRef.current = 1;
      setIndex((i) => (i + 1) % len);
    }, narrow ? AUTO_MS_NARROW : AUTO_MS_DESKTOP);
    return () => window.clearInterval(id);
  }, [len, narrow, reduceMotion, locale]);

  const safeIndex = len ? Math.min(Math.max(0, index), len - 1) : 0;
  const testimonial = len ? items[safeIndex] : undefined;
  const xEnter =
    narrow && !reduceMotion
      ? dirRef.current >= 0
        ? 14
        : -14
      : dirRef.current >= 0
        ? 36
        : -36;

  return (
    <MotionSection
      ref={ref}
      id="testimonials"
      className="tech-bg relative py-20 container-px"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: narrow ? 0.025 : 0.06,
            delayChildren: narrow ? 0.02 : 0.05
          }
        }
      }}
    >
      <div className="sr-only">
        <p>{tSec("testimonials.metaTitle")}</p>
        <p>{tSec("testimonials.metaDescription")}</p>
      </div>
      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,191,255,0.15)] bg-[rgba(15,15,35,0.55)] px-3 py-1 text-xs text-white/75 backdrop-blur-md">
            <Star className="h-4 w-4 text-[#00BFFF]" />
            <span className="brand-glow">{t("badge")}</span>
          </div>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <motion.button
            type="button"
            aria-label={t("prev")}
            disabled={!len}
            onClick={prev}
            whileTap={{ scale: 0.96 }}
            className="glass-hover-glow inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,191,255,0.18)] bg-[rgba(15,15,35,0.65)] text-white shadow-[0_0_20px_rgba(0,191,255,0.08)] backdrop-blur-md transition hover:border-[rgba(0,191,255,0.35)] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            type="button"
            aria-label={t("next")}
            disabled={!len}
            onClick={next}
            whileTap={{ scale: 0.96 }}
            className="glass-hover-glow inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,191,255,0.18)] bg-[rgba(15,15,35,0.65)] text-white shadow-[0_0_20px_rgba(0,191,255,0.08)] backdrop-blur-md transition hover:border-[rgba(0,191,255,0.35)] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </MotionDiv>

      <div className="relative mx-auto mt-10 max-w-3xl">
        {testimonial ? (
          <>
            <AnimatePresence mode="wait" initial={false}>
              <MotionDiv
                key={safeIndex}
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : narrow
                      ? { opacity: 0, x: xEnter }
                      : { opacity: 0, x: xEnter, filter: "blur(6px)" }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1, x: 0 }
                    : narrow
                      ? { opacity: 1, x: 0 }
                      : { opacity: 1, x: 0, filter: "blur(0px)" }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : narrow
                      ? { opacity: 0, x: -xEnter * 0.8 }
                      : { opacity: 0, x: -xEnter * 0.8, filter: "blur(6px)" }
                }
                transition={{
                  duration: narrow ? 0.28 : 0.45,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="glass-hover-glow glass rounded-[2rem] p-6 sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[rgba(0,191,255,0.25)]">
                    <Image
                      src={`https://i.pravatar.cc/200?img=${testimonial.avatarId}`}
                      alt={tAvatar("avatarAlt", { name: testimonial.name })}
                      fill
                      sizes="64px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold">{testimonial.name}</h3>
                        <p className="mt-1 text-xs text-white/55">{testimonial.role}</p>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(0,191,255,0.15)] bg-[rgba(0,191,255,0.06)]">
                        <Quote className="h-5 w-5 text-[#00BFFF]" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/75">
                      {testimonial.text}
                    </p>
                    <div className="mt-5 inline-flex rounded-full border border-[rgba(0,191,255,0.25)] bg-[rgba(0,191,255,0.08)] px-4 py-1.5 text-sm font-semibold text-[#00BFFF] shadow-[0_0_24px_rgba(0,191,255,0.15)]">
                      {testimonial.result}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </AnimatePresence>

            <div className="mt-6 flex justify-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${t("auto")} ${i + 1}`}
                  aria-current={i === safeIndex}
                  onClick={() => {
                    dirRef.current = i > safeIndex ? 1 : -1;
                    setIndex(i);
                  }}
                  className={
                    "h-2 rounded-full transition-all " +
                    (i === safeIndex
                      ? "w-8 bg-[#00BFFF] shadow-[0_0_12px_rgba(0,191,255,0.5)]"
                      : "w-2 bg-white/25 hover:bg-white/40")
                  }
                />
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-white/35">
              LOGICA Marketing · {t("auto")}
            </p>
          </>
        ) : (
          <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-white/60">
            {t("itemsUnavailable")}
          </p>
        )}
      </div>
    </MotionSection>
  );
}
