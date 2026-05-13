"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

type Benefit = { title: string; desc: string };

export function Benefits() {
  const t = useTranslations("contactsPage");
  const raw = t.raw("landingBenefits");
  const items: Benefit[] = Array.isArray(raw) ? (raw as Benefit[]) : [];

  return (
    <section className="border-b border-white/[0.06] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/85">
            <Sparkles className="h-4 w-4" aria-hidden />
            LOGICA
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{t("landingBenefitsTitle")}</h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md"
            >
              <h3 className="text-lg font-semibold text-white">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{b.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
