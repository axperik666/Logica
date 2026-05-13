"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/contacts";
import { ContactForm } from "@/components/landing/ContactForm";

export function ContactHero() {
  const t = useTranslations("contactsPage");

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-24 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="mb-10 inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium text-[#00b4ff]">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4ff] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00b4ff]" />
          </span>
          {t("landingHeroPulse")}
        </div>

        <h1 className="mb-6 text-[52px] font-semibold leading-[1.05] tracking-[-2px] text-white lg:text-[64px]">
          {t("landingH1Line1")}
          <br />
          <span className="text-[#00b4ff]">{t("landingH1Accent")}</span>
          <br />
          {t("landingH1Line3")}
        </h1>

        <p className="mb-12 max-w-md text-[22px] leading-tight text-white/75">{t("landingHeroSub")}</p>

        <a
          href={CONTACTS.telegramHttps}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-3xl bg-[#00b4ff] px-9 py-5 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white active:scale-95"
        >
          {t("landingCtaTelegram")}
          <span className="text-2xl transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-3xl"
      >
        <div className="mb-8">
          <h2 className="mb-1 text-2xl font-semibold text-white">{t("landingFormCardTitle")}</h2>
          <p className="text-white/60">{t("landingFormCardLead")}</p>
        </div>
        <ContactForm isHero />
      </motion.div>
    </section>
  );
}
