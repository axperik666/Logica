"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="LOGICA" className="h-9" />
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#cases" className="hover:text-[#00b4ff] transition-colors">
              Cases
            </a>
            <a href="#services" className="hover:text-[#00b4ff] transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-[#00b4ff] transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-[#00b4ff] transition-colors">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="hidden md:block bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:bg-[#00b4ff] hover:text-white transition-all"
          >
            Get Strategy Free
          </a>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black border-t border-white/10"
        >
          <div className="flex flex-col px-6 py-8 space-y-6 text-lg">
            <a href="#cases" onClick={() => setIsOpen(false)}>
              Cases
            </a>
            <a href="#services" onClick={() => setIsOpen(false)}>
              Services
            </a>
            <a href="#about" onClick={() => setIsOpen(false)}>
              About
            </a>
            <a href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </a>

            <a
              href="#contact"
              className="bg-white text-black py-4 rounded-2xl text-center font-semibold mt-4"
              onClick={() => setIsOpen(false)}
            >
              Get Free Strategy
            </a>
          </div>
        </motion.div>
      ) : null}
    </nav>
  );
}

