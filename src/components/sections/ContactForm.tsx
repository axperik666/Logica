"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [_step, _setStep] = useState(1);

  return (
    <section id="contact" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00b4ff]/5 via-transparent to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-2 rounded-full mb-6">
            <span className="text-[#00b4ff]">★</span>
            <span className="text-sm uppercase tracking-widest">Free in 24 hours</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Ready to scale in 2026?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Получите персональную стратегию роста + roadmap за 1 день
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-zinc-950/80 border border-white/10 rounded-3xl p-10"
          >
            <h3 className="text-2xl font-semibold text-white mb-8">What you get</h3>
            <ul className="space-y-6 text-gray-300">
              {[
                "Аудит текущих каналов и воронки",
                "2–3 главных приоритета на ближайшие 90 дней",
                "Прогноз ROI и бюджета",
                "Рекомендации по креативам и офферам",
                "Ответ в течение 15 минут после заявки"
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-[#00b4ff] mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-zinc-950 border border-[#00b4ff]/20 rounded-3xl p-10 md:p-12 shadow-2xl shadow-[#00b4ff]/10"
          >
            <h3 className="text-2xl font-semibold text-white mb-8">Request a strategy</h3>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-[#00b4ff] focus:outline-none text-white"
              />
              <input
                type="tel"
                placeholder="Phone / Telegram"
                className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-[#00b4ff] focus:outline-none text-white"
              />
              <input
                type="email"
                placeholder="Business email"
                className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-[#00b4ff] focus:outline-none text-white"
              />
              <textarea
                placeholder="Tell us about your niche and goals..."
                rows={4}
                className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-[#00b4ff] focus:outline-none text-white resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#00b4ff] to-cyan-400 text-black font-semibold py-6 rounded-2xl text-xl hover:brightness-110 transition-all mt-4"
              >
                Get My Free Strategy →
              </motion.button>

              <p className="text-center text-xs text-gray-500 mt-6">
                We reply within 15 minutes • No spam
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

