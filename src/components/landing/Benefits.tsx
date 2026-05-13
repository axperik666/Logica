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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-3"
      >
        {benefits.map((benefit, i) => (
          <motion.div
            key={`${benefit.title}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-colors hover:border-[#00b4ff]/30"
          >
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00b4ff]/10 text-3xl text-[#00b4ff] transition-transform group-hover:scale-110">
              {i === 0 ? "→" : i === 1 ? "📊" : "✅"}
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-white">{benefit.title}</h3>
            <p className="text-lg text-white/80">{benefit.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
