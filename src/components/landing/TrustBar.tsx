"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("contactsPage");
  const raw = t.raw("trustBarLines");
  const items: string[] = Array.isArray(raw) ? (raw as string[]) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-y border-white/10 bg-white/5 py-8"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-sm text-white/80 md:text-base">
          {items.map((item, i) => (
            <div key={`${item}-${i}`} className="group flex items-center gap-3">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b4ff] transition-transform group-hover:scale-110" />
              <span className="font-medium tracking-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
