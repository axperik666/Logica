"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

type Insight = { href: string; title: string; desc: string; date: string; image: string };

export function LatestInsights() {
  const t = useTranslations("latestInsights");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  const raw = t.raw("items");
  const items = Array.isArray(raw) ? (raw as Insight[]) : [];

  return (
    <MotionSection
      ref={ref}
      id="guides"
      className="full-bleed relative overflow-x-clip border-t border-white/[0.06] bg-[linear-gradient(180deg,#121a2e_0%,#101824_100%)] py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } }
      }}
    >
      <div className="site-container">
        <div className="sr-only">
          <p>{tSec("latestInsights.metaTitle")}</p>
          <p>{tSec("latestInsights.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {items.map((item, i) => (
            <MotionDiv
              key={item.href + i}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <motion.div
                className="h-full"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              >
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] shadow-[0_20px_64px_rgba(0,0,0,0.35)] transition duration-300 hover:border-cyan-400/35 hover:shadow-[0_0_44px_rgba(34,211,238,0.14)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121a2e]/88 via-transparent to-transparent opacity-80"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <time className="text-[11px] font-medium uppercase tracking-wider text-white/40">{item.date}</time>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-white sm:text-lg">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{item.desc}</p>
                    <span className="mt-5 inline-flex items-center justify-center gap-1 rounded-xl border border-cyan-400/25 bg-cyan-400/5 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
                      {t("readMore")}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
