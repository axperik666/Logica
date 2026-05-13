"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { CONTACTS } from "@/lib/contacts";
import { ContactForm } from "@/components/landing/ContactForm";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactHero() {
  const t = useTranslations("contactsPage");

  const scrollToFullForm = () => {
    document.getElementById("full-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="border-b border-white/[0.06] px-6 pb-16 pt-6 md:pb-20 md:pt-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
        >
          <span aria-hidden>←</span>
          {t("landingBackHome")}
        </Link>
        <div className="flex items-center gap-3 opacity-90 md:justify-end">
          <Image src="/logo.png" alt="LOGICA Marketing" width={160} height={40} className="h-8 w-auto md:h-9" priority />
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-12 md:grid-cols-2 md:items-start lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-300">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400" />
            </span>
            {t("landingHeroPulse")}
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter text-white md:text-5xl lg:text-6xl">
            {t("landingH1Line1")}
            <br />
            <span className="text-cyan-400">{t("landingH1Accent")}</span> {t("landingH1Mid")}
            <br />
            {t("landingH1Line3")}
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/78 md:text-xl">{t("landingHeroLead")}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={CONTACTS.telegramHttps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-cyan-300"
            >
              {t("landingCtaTelegram")}
            </a>
            <button
              type="button"
              onClick={scrollToFullForm}
              className="rounded-2xl border border-white/30 px-8 py-4 text-sm font-medium text-white transition hover:scale-[1.02] hover:border-white/60"
            >
              {t("landingCtaScrollForm")}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
          className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <ContactForm isHero />
        </motion.div>
      </div>
    </section>
  );
}
