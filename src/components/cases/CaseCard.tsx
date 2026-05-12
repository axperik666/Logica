"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface CaseCardProps {
  client: string;
  niche: string;
  result: string;
  description: string;
  video: string;
}

export default function CaseCard({
  client,
  niche,
  result,
  description,
  video
}: CaseCardProps) {
  const t = useTranslations("cases");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -14 }}
      className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/5 bg-zinc-950 shadow-2xl aspect-[4/5] cursor-pointer sm:aspect-[16/10] sm:min-h-0"
    >
      {isInView && !hasError ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-all group-hover:via-black/35" />

      <div className="absolute bottom-0 left-0 z-10 w-full space-y-2.5 p-4 pb-5 sm:space-y-3 sm:p-7 sm:pb-8">
        <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 break-words font-mono text-[11px] leading-snug tracking-wider text-[#00b4ff] sm:text-sm sm:tracking-widest">
          <span>{niche}</span>
          <span className="select-none opacity-60" aria-hidden>
            •
          </span>
          <span>{result}</span>
        </p>
        <h3 className="break-words text-xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
          {client}
        </h3>
        <p className="break-words text-sm leading-relaxed text-gray-400 line-clamp-4 sm:text-[15px] sm:line-clamp-3">
          {description}
        </p>
      </div>

      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl text-sm border border-white/20 hover:bg-white/20">
          {t("gridViewCase")}
        </div>
      </div>
    </motion.div>
  );
}

export { CaseCard };
