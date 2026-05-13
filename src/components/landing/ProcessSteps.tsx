"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessSteps() {
  const t = useTranslations("contactsPage");

  const steps = [
    { n: "01", title: t("step1Title"), desc: t("step1Desc") },
    { n: "02", title: t("step2Title"), desc: t("step2Desc") },
    { n: "03", title: t("step3Title"), desc: t("step3Desc") }
  ];

  return (
    <section className="border-b border-white/[0.06] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease }}
          className="text-center text-2xl font-bold tracking-tight text-white md:text-3xl"
        >
          {t("formFlowTitle")}
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/60 md:text-base">{t("formFlowLead")}</p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)] p-6 backdrop-blur-md"
            >
              <span className="font-mono text-2xl font-bold text-cyan-400/45">{s.n}</span>
              <h3 className="mt-3 flex items-start gap-2 text-base font-semibold text-white">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400/85" aria-hidden />
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/62">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
