"use client";
import { motion } from "framer-motion";

const services = [
  {
    title: "Performance Marketing",
    desc: "Meta, Google, TikTok + Performance Max. Запускаем только то, что приносит ROI от 3×",
    icon: "📈"
  },
  {
    title: "Strategy & Audit",
    desc: "Полный разбор текущей воронки + стратегия роста на 90 дней с прогнозом прибыли",
    icon: "🎯"
  },
  {
    title: "Creative & Offer",
    desc: "Создаём креативы и офферы, которые реально продают. Тестируем и масштабируем победителей",
    icon: "✨"
  },
  {
    title: "Full-Funnel Marketing",
    desc: "От лид-магнита до повторных продаж. Автоворонки, прогрев, ретаргетинг и лояльность",
    icon: "🔄"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tighter text-white mb-4">
            What we do best
          </h2>
          <p className="text-2xl text-gray-400">
            Инструменты, которые приносят реальный рост
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 bg-zinc-950 border border-white/10 rounded-3xl hover:border-[#00b4ff]/30 transition-all hover:bg-zinc-900"
            >
              <div className="text-5xl mb-8">{service.icon}</div>
              <h3 className="text-3xl font-semibold text-white mb-4 group-hover:text-[#00b4ff] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
