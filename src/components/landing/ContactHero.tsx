"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/contacts";
import { ContactForm } from "@/components/landing/ContactForm";

export function ContactHero() {
  const t = useTranslations("contactsPage");

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-24 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
        <div className="mb-8 inline-flex items-center gap-2 rounded-3xl bg-white/10 px-5 py-2.5 text-sm font-medium text-[#00b4ff]">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4ff] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00b4ff]" />
          </span>
          {t("landingHeroPulse")}
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tighter text-white lg:text-6xl">
          {t("landingH1Line1")}
          <br />
          <span className="text-[#00b4ff]">{t("landingH1Accent")}</span> {t("landingH1Mid")}
          <br />
          {t("landingH1Line3")}
        </h1>

        <p className="mb-10 max-w-md text-xl text-white/80">{t("landingHeroSub")}</p>

        <div className="flex flex-wrap gap-4">
          <a
            href={CONTACTS.telegramHttps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#00b4ff] px-8 py-4 font-semibold text-black transition-all hover:bg-cyan-300 active:scale-95"
          >
            {t("landingCtaTelegram")}
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl lg:p-10"
      >
        <ContactForm isHero />
      </motion.div>
    </section>
  );
}
