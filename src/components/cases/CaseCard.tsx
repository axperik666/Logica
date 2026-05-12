"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

interface CaseCardProps {
  client: string;
  niche: string;
  result: string;
  description: string;
  video: string;
  /** Цель перехода при клике по карточке / бейджу (по умолчанию — хаб кейсов). */
  href?: string;
}

export default function CaseCard({
  client,
  niche,
  result,
  description,
  video,
  href = "/kejsy"
}: CaseCardProps) {
  const t = useTranslations("cases");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasError, setHasError] = useState(false);

  const aria = `${client} — ${t("gridViewCase")}`;

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -14 }}
      className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/5 bg-zinc-950 shadow-2xl aspect-[4/5] sm:aspect-[16/10] sm:min-h-0"
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
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-100"
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-all group-hover:via-black/35" />

      <div className="pointer-events-none absolute bottom-0 left-0 z-[2] w-full space-y-2.5 p-4 pb-5 sm:space-y-3 sm:p-7 sm:pb-8">
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

      <div className="pointer-events-none absolute right-6 top-6 z-[2] opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm backdrop-blur-xl">
          {t("gridViewCase")}
        </div>
      </div>

      <Link
        href={href}
        aria-label={aria}
        className="absolute inset-0 z-[5] rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00b4ff]"
      />
    </motion.div>
  );
}

export { CaseCard };
