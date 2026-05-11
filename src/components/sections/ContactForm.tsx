"use client";

import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <section id="contact" className="py-28 bg-[#050507] relative">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#00b4ff08_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full mb-6 text-sm tracking-widest">
            <span className="text-[#00b4ff]">✦</span>
            FREE STRATEGY IN 24 HOURS
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
            Ready to scale in 2026?
          </h2>
          <p className="text-xl text-gray-400 mt-4 max-w-xl mx-auto">
            We&apos;ll show where your budgets leak and what moves the needle fastest.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-zinc-950/70 border border-white/10 rounded-3xl p-10">
            <h3 className="text-2xl font-semibold text-white mb-8">What you get</h3>
            <ul className="space-y-6 text-gray-300">
              {[
                "Full audit of your current traffic & funnel",
                "2-3 priority moves for the next 90 days",
                "Clear ROI forecast and budget recommendation",
                "Creative & offer recommendations",
                "Reply within 15 minutes after submission"
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 bg-zinc-950 border border-[#00b4ff]/30 rounded-3xl p-10 md:p-14 shadow-2xl shadow-[#00b4ff]/10">
            <h3 className="text-3xl font-semibold text-white mb-10">Request your strategy</h3>

            <form className="space-y-6">
              <input type="text" placeholder="Your name" className="w-full bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder-gray-500 focus:border-[#00b4ff] outline-none" />
              <input type="tel" placeholder="Phone or Telegram" className="w-full bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder-gray-500 focus:border-[#00b4ff] outline-none" />
              <input type="email" placeholder="Business email" className="w-full bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder-gray-500 focus:border-[#00b4ff] outline-none" />
              <textarea placeholder="Tell us about your business and goals..." rows={5} className="w-full bg-black border border-white/20 rounded-2xl px-7 py-6 text-white placeholder-gray-500 focus:border-[#00b4ff] outline-none resize-none" />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-[#00b4ff] to-cyan-400 hover:from-cyan-400 hover:to-[#00b4ff] text-black font-semibold py-7 rounded-2xl text-xl transition-all duration-300"
              >
                Get My Free Strategy →
              </motion.button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8">
              We reply within 15 minutes • No spam ever
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

