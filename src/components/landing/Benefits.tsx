"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Benefit = { title: string; desc: string };

export function Benefits() {
  const t = useTranslations("contactsPage");
  const raw = t.raw("landingBenefits");
  const benefits: Benefit[] = Array.isArray(raw) ? (raw as Benefit[]) : [];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-8 md:grid-cols-3">
        {benefits.map((benefit, i) => (
          <motion.div
            key={`${benefit.title}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00b4ff]/40"
          >
            <div className="absolute bottom-8 left-0 top-8 w-[3px] bg-gradient-to-b from-transparent via-[#00b4ff] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white">{benefit.title}</h3>
            <p className="text-[17px] leading-relaxed text-white/80">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
