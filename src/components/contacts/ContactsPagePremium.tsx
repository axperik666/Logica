"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { KontaktyForm } from "@/components/contacts/KontaktyForm";
import { CONTACTS } from "@/lib/contacts";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactsPagePremium() {
  const t = useTranslations("contactsPage");

  const steps = [
    { n: "01", title: t("step1Title"), desc: t("step1Desc") },
    { n: "02", title: t("step2Title"), desc: t("step2Desc") },
    { n: "03", title: t("step3Title"), desc: t("step3Desc") }
  ];

  const trust = [t("trust1"), t("trust2"), t("trust3")];

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-30%,rgba(0,180,255,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(139,92,246,0.06),transparent_45%)]"
        aria-hidden
      />

      <div className="site-container relative pt-10 sm:pt-14 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/85">
            {t("kicker")}
          </p>
          <div className="mt-4 inline-flex items-center rounded-full border border-cyan-400/35 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-100">
            {t("heroBadge")}
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">{t("intro")}</p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1, ease }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md"
            >
              <span className="font-mono text-2xl font-bold text-cyan-400/50">{s.n}</span>
              <h2 className="mt-2 text-sm font-semibold text-white sm:text-base">{s.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="site-container relative pb-14 pt-4 sm:pb-20 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
            className="lg:col-span-5"
          >
            <ul className="space-y-3">
              {trust.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-white/75">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)]"
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-4">
              <a
                href={CONTACTS.telegramHttps}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-400/30 hover:bg-cyan-400/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300 transition group-hover:bg-cyan-400/25">
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">
                    {t("telegramLabel")}
                  </span>
                  <span className="font-medium text-white">{t("openTelegram")}</span>
                </span>
              </a>

              <a
                href={CONTACTS.mailto}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-400/30 hover:bg-cyan-400/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200 transition group-hover:bg-violet-500/25">
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">
                    {t("emailLabel")}
                  </span>
                  <span className="break-all font-medium text-white">{CONTACTS.email}</span>
                  <span className="mt-0.5 block text-xs text-cyan-300/90">{t("writeEmail")}</span>
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[1.5rem] p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.5)] [background:linear-gradient(135deg,rgba(0,180,255,0.45),rgba(139,92,246,0.25),rgba(0,180,255,0.15))]">
              <div className="rounded-[1.45rem] border border-white/[0.06] bg-[linear-gradient(165deg,rgba(12,16,32,0.97)_0%,rgba(6,8,18,0.98)_100%)] p-6 backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Sparkles className="h-5 w-5" strokeWidth={2} />
                  <span className="text-sm font-semibold">{t("formKicker")}</span>
                </div>
                <p className="mt-2 text-sm text-white/60">{t("formNote")}</p>
                <KontaktyForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
