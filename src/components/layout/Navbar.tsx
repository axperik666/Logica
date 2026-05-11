"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const LOCALE_LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  it: "IT"
};

function LocaleSwitcher({
  variant,
  onNavigate
}: {
  variant: "toolbar" | "drawer";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const isDrawer = variant === "drawer";

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-stretch rounded-xl border border-white/15 bg-white/5 p-0.5",
        isDrawer ? "w-full justify-stretch" : "shrink-0"
      )}
    >
      {routing.locales.map((loc, idx) => {
        const active = locale === loc;
        return (
          <div key={loc} className="flex min-w-0 flex-1 items-stretch">
            {idx > 0 ? (
              <span
                className="my-1 w-px shrink-0 bg-gradient-to-b from-transparent via-white/25 to-transparent"
                aria-hidden
              />
            ) : null}
            <Link
              href={pathname}
              locale={loc}
              prefetch={false}
              onClick={() => onNavigate?.()}
              className={cn(
                "flex flex-1 items-center justify-center font-semibold uppercase tracking-wider transition",
                isDrawer
                  ? "min-h-11 rounded-lg px-2 py-2 text-xs"
                  : "min-h-9 rounded-lg px-2.5 py-1.5 text-[11px]",
                active
                  ? "bg-[#00b4ff]/25 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-3 h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="LOGICA"
              width={144}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
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

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <LocaleSwitcher variant="toolbar" />
            <a
              href="#contact"
              className="bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:bg-[#00b4ff] hover:text-white transition-all"
            >
              Get Strategy Free
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white min-h-11 min-w-11 flex items-center justify-center"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
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

            <div className="pt-2">
              <LocaleSwitcher variant="drawer" onNavigate={() => setIsOpen(false)} />
            </div>

            <a
              href="#contact"
              className="bg-white text-black py-4 rounded-2xl text-center font-semibold mt-2"
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
