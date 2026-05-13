"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

export function TrustBar() {
  const t = useTranslations("contactsPage");
  const lines = [t("trust1"), t("trust2"), t("trust3")];

  return (
    <section className="border-b border-white/[0.06] px-6 py-12 md:py-14">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease }}
          className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] px-5 py-8 md:px-10"
        >
          <div className="grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
            {lines.map((line) => (
              <div key={line} className="flex flex-1 items-start gap-3 md:px-6 md:first:pl-2 md:last:pr-2">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.85)]"
                  aria-hidden
                />
                <p className="text-sm font-medium leading-snug text-white/88 md:text-[15px]">{line}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
