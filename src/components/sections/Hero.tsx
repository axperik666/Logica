"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* Видео фон */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        <motion.img
          src="/logo.png"
          alt="LOGICA Marketing"
          className="mx-auto h-14 sm:h-20 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        />

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-white mb-6">
          Marketing that<br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#00b4ff] via-cyan-400 to-white bg-clip-text text-transparent">
            actually grows
          </span>
        </h1>

        <p className="text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
          3–7× ROI. Real profit, not reports.
        </p>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block sm:inline-block w-full sm:w-auto bg-white text-black font-semibold text-xl py-6 px-12 rounded-2xl hover:bg-[#00b4ff] hover:text-white transition-all shadow-2xl shadow-cyan-500/30"
        >
          Get Free Growth Strategy →
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;
