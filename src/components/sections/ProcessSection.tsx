"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Step = { num: string; title: string; desc: string };

export default function ProcessSection() {
  const t = useTranslations("sectionsDs.process");
  const stepsRaw = t.raw("steps");
  const steps = Array.isArray(stepsRaw) ? (stepsRaw as Step[]) : [];

  return (
    <section className="bg-dark py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-header mb-12 text-center md:mb-16"
        >
          {t("title")}
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="h-full rounded-3xl border border-white/10 bg-dark-800 p-6 transition-colors hover:border-primary/30 md:p-8">
                <div className="mb-4 text-4xl font-bold text-primary/25 md:mb-6 md:text-5xl">{step.num}</div>
                <h3 className="mb-3 text-lg font-semibold text-white md:text-2xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400 md:text-base">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
