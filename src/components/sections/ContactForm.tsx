"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    goal: "",
    budget: "",
    contact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    // Здесь будет реальная отправка
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Готовы к росту?
          </h2>
          <p className="text-2xl text-gray-400">Получите персональную стратегию бесплатно</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-white/10 rounded-3xl p-10 md:p-16"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 ? (
              <>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4ff]"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Название компании / ниша"
                  className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4ff]"
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-white text-black py-5 rounded-2xl font-semibold hover:bg-[#00b4ff] hover:text-white transition-all"
                >
                  Продолжить →
                </button>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <textarea
                  placeholder="Какая главная цель на ближайшие 3–6 месяцев?"
                  className="w-full h-32 bg-black border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4ff]"
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Примерный бюджет в месяц"
                    className="bg-black border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4ff]"
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Телефон / Telegram"
                    className="bg-black border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4ff]"
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00b4ff] to-cyan-400 text-black py-6 rounded-2xl font-semibold text-xl hover:brightness-110 transition-all"
                >
                  Получить стратегию бесплатно
                </button>
              </>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

