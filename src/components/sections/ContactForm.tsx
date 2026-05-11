"use client";

import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <section id="contact" className="py-28 bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00b4ff12_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00b4ff]/10 to-transparent px-8 py-3 rounded-full mb-6 border border-[#00b4ff]/20">
            <span className="text-[#00b4ff] text-xl">⚡</span>
            <span className="uppercase tracking-[3px] text-sm font-medium">
              Free Strategy in 24h
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Ready to scale in 2026?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We&apos;ll show exactly where your money leaks and what will bring the fastest growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-zinc-950/80 border border-white/10 rounded-3xl p-10 md:p-12">
            <h3 className="text-white text-2xl font-semibold mb-10">What you&apos;ll get</h3>
            <div className="space-y-8 text-gray-300">
              {[
                "Полный аудит трафика и воронки",
                "2–3 главных приоритета на 90 дней",
                "Прогноз ROI и бюджета",
                "Рекомендации по креативам и офферам",
                "Ответ в течение 15 минут"
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-emerald-400 text-xl mt-0.5">✓</div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-950 border border-[#00b4ff]/30 rounded-3xl p-10 md:p-14">
            <h3 className="text-3xl font-semibold text-white mb-10">
              Request your free strategy
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder:text-gray-500 focus:border-[#00b4ff] outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone or Telegram"
                  className="bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder:text-gray-500 focus:border-[#00b4ff] outline-none"
                />
              </div>

              <input
                type="email"
                placeholder="Business email"
                className="w-full bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder:text-gray-500 focus:border-[#00b4ff] outline-none"
              />

              <textarea
                placeholder="Tell us about your niche and main goal..."
                rows={5}
                className="w-full bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder:text-gray-500 focus:border-[#00b4ff] outline-none resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#00b4ff] to-cyan-400 text-black font-semibold py-7 rounded-2xl text-xl hover:brightness-110 transition-all mt-2"
              >
                Get My Free Strategy →
              </motion.button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8">
              We reply within 15 minutes • No spam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
