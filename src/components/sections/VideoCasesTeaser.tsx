"use client";

import { useCallback, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { HOME_CASE_IDS, type HomeCaseId } from "@/content/homeCases";
import { caseVideoSrc } from "@/content/caseVideos";
import { cn } from "@/lib/cn";

const TEASER_IDS: HomeCaseId[] = HOME_CASE_IDS.filter((id) => caseVideoSrc(id)) as HomeCaseId[];
const DISPLAY_IDS = TEASER_IDS.slice(0, 5);

export function VideoCasesTeaser() {
  const t = useTranslations("videoCasesTeaser");
  const tCases = useTranslations("cases");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const setRef = useCallback((id: string, el: HTMLVideoElement | null) => {
    videoRefs.current[id] = el;
  }, []);

  const playVideo = (id: string) => {
    setActiveVideo(id);
    const v = videoRefs.current[id];
    if (v) {
      v.muted = true;
      void v.play().catch(() => {});
    }
  };

  const pauseVideo = (id: string) => {
    setActiveVideo((cur) => (cur === id ? null : cur));
    const v = videoRefs.current[id];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <MotionSection
      ref={ref}
      id="video-cases"
      className="full-bleed relative overflow-x-clip border-t border-white/[0.06] py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="site-container relative">
        <div className="sr-only">
          <p>{tSec("videoCases.metaTitle")}</p>
          <p>{tSec("videoCases.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
          }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/85">{t("badge")}</p>
            <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label={t("scrollPrev")}
              onClick={() => scrollBy(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition hover:border-cyan-400/35"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={t("scrollNext")}
              onClick={() => scrollBy(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition hover:border-cyan-400/35"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.6 } }
          }}
          className="relative mt-10 -mx-4 sm:mx-0"
        >
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-thin sm:gap-5 sm:px-0"
            style={{ scrollbarGutter: "stable" }}
          >
            {DISPLAY_IDS.map((caseId) => {
              const src = caseVideoSrc(caseId);
              if (!src) return null;
              const client = tCases(`items.${caseId}.client`);
              const result = tCases(`items.${caseId}.result`);
              const playing = activeVideo === caseId;
              return (
                <motion.article
                  key={caseId}
                  className="group relative w-[min(88vw,22rem)] shrink-0 snap-center overflow-hidden rounded-[1.5rem] border border-white/[0.12] bg-[#050810] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:w-[20rem]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  onMouseEnter={() => playVideo(caseId)}
                  onMouseLeave={() => pauseVideo(caseId)}
                >
                  <div className="relative aspect-[16/10] bg-[linear-gradient(145deg,#0a1020,#060912)]">
                    <video
                      ref={(el) => setRef(caseId, el)}
                      src={src}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                        playing ? "opacity-100" : "opacity-0"
                      )}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(4,6,14,0.92)_100%)] transition",
                        playing ? "opacity-40" : "opacity-100"
                      )}
                    />
                    {!playing ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan-400/50 bg-black/40 text-cyan-200 shadow-[0_0_40px_rgba(34,211,238,0.35)] backdrop-blur-sm transition group-hover:scale-110 group-hover:border-cyan-300">
                          <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300/85">{client}</p>
                    <p className="mt-1 text-lg font-bold text-white">{result}</p>
                    <Link
                      href="/kejsy"
                      className="mt-3 inline-flex text-sm font-semibold text-cyan-300/90 underline-offset-2 hover:text-cyan-200 hover:underline"
                    >
                      {t("watchAll")}
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
