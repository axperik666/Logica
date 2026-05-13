"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ProcessSteps() {
  const t = useTranslations("contactsPage");

  const steps = [
    { num: "01", title: t("step1Title"), desc: t("step1Desc") },
    { num: "02", title: t("step2Title"), desc: t("step2Desc") },
    { num: "03", title: t("step3Title"), desc: t("step3Desc") }
  ];

  return (
    <section className="bg-white/5 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">{t("landingProcessTitle")}</h2>

        <div className="relative grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="absolute right-6 top-6 text-7xl font-bold tracking-tighter text-[#00b4ff] opacity-10 transition-opacity group-hover:opacity-20">
                {step.num}
              </div>
              <div className="mb-4 text-5xl font-bold text-[#00b4ff]">{step.num}</div>
              <h3 className="mb-3 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="text-white/80">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
