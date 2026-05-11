"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const HOME_TILE_IDS = ["perf", "strategy", "creative", "funnel"] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tighter text-white mb-4">
            {t("homeSectionTitle")}
          </h2>
          <p className="text-2xl text-gray-400">{t("homeSectionSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {HOME_TILE_IDS.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 bg-zinc-950 border border-white/10 rounded-3xl hover:border-[#00b4ff]/30 transition-all hover:bg-zinc-900"
            >
              <div className="text-5xl mb-8">{t(`homeTiles.${id}.icon`)}</div>
              <h3 className="text-3xl font-semibold text-white mb-4 group-hover:text-[#00b4ff] transition-colors">
                {t(`homeTiles.${id}.title`)}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">{t(`homeTiles.${id}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
