"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -14 }}
      className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-950 border border-white/5 cursor-pointer shadow-2xl"
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

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent group-hover:via-black/80 transition-all" />

      <div className="absolute bottom-0 left-0 p-7 sm:p-8 w-full z-10">
        <p className="text-[#00b4ff] font-mono text-sm mb-3 tracking-widest">
          {niche} • {result}
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 tracking-tight">
          {client}
        </h3>
        <p className="text-gray-400 text-[15px] leading-relaxed line-clamp-3">{description}</p>
      </div>

      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl text-sm border border-white/20 hover:bg-white/20">
          Смотреть кейс →
        </div>
      </div>
    </motion.div>
  );
}

export { CaseCard };
