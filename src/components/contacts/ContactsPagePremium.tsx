"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, CheckCircle2, Clock, Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { KontaktyForm } from "@/components/contacts/KontaktyForm";
import { BookingCta } from "@/components/contacts/BookingCta";
import { CONTACTS } from "@/lib/contacts";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactsPagePremium() {
  const t = useTranslations("contactsPage");
  const formAnchorRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formAnchorRef, { amount: 0.08 });

  const steps = [
    { n: "01", title: t("step1Title"), desc: t("step1Desc") },
    { n: "02", title: t("step2Title"), desc: t("step2Desc") },
    { n: "03", title: t("step3Title"), desc: t("step3Desc") }
  ];

  const trust = [t("trust1"), t("trust2"), t("trust3")];
  const bulletsRaw = t.raw("promiseBullets");
  const bullets = Array.isArray(bulletsRaw) ? (bulletsRaw as string[]) : [];

  return (
    <div className="relative pb-24 md:pb-0">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-25%,rgba(0,200,255,0.16),transparent_58%),radial-gradient(ellipse_55%_45%_at_100%_35%,rgba(139,92,246,0.12),transparent_50%),radial-gradient(ellipse_50%_40%_at_0%_60%,rgba(0,191,255,0.06),transparent_45%)]"
        aria-hidden
      />

      <div className="site-container relative pt-8 sm:pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/90">{t("kicker")}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 to-blue-600/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-100 shadow-[0_0_24px_rgba(0,200,255,0.15)] sm:text-xs">
              {t("heroBadge")}
            </span>
          </div>
          <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {t("intro")}
          </p>

          {bullets.length > 0 ? (
            <ul className="mx-auto mt-8 flex max-w-2xl flex-col gap-2.5 text-left sm:mt-10 sm:text-center">
              {bullets.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm leading-snug text-white/85 sm:inline-flex sm:max-w-none sm:flex-none sm:flex-row sm:items-center sm:justify-center sm:border-0 sm:bg-transparent sm:px-2 sm:py-0"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400/90 sm:mt-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease }}
          className="mx-auto mt-10 max-w-3xl sm:mt-12"
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-cyan-400/25 bg-[linear-gradient(135deg,rgba(0,180,255,0.12)_0%,rgba(12,16,32,0.85)_45%,rgba(6,8,18,0.92)_100%)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="flex shrink-0 items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.25)]">
                <Clock className="h-6 w-6" strokeWidth={2} aria-hidden />
              </span>
            </div>
            <p className="min-w-0 flex-1 text-sm leading-relaxed text-white/88 sm:text-[15px]">{t("responseStrip")}</p>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-12 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.08, ease }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.38)] backdrop-blur-md"
            >
              <span className="font-mono text-2xl font-bold text-cyan-400/45">{s.n}</span>
              <h2 className="mt-2 flex items-start gap-2 text-sm font-semibold text-white sm:text-base">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/80" aria-hidden />
                {s.title}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-white/62 sm:text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="site-container relative pb-12 pt-6 sm:pb-16 md:pb-24 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Форма первой в DOM: на телефоне с таргета — заявка без прокрутки через весь экран */}
          <motion.div
            ref={formAnchorRef}
            id="contacts-form"
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease }}
            className="scroll-mt-[calc(var(--header-h)+1rem)] order-1 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:order-none"
          >
            <div className="relative rounded-[1.5rem] p-[1px] shadow-[0_28px_96px_rgba(0,0,0,0.55)] [background:linear-gradient(135deg,rgba(0,220,255,0.55),rgba(139,92,246,0.35),rgba(0,180,255,0.2))]">
              <div className="rounded-[1.45rem] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(14,18,36,0.98)_0%,rgba(6,8,18,0.99)_100%)] p-6 backdrop-blur-xl sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Sparkles className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                    <span className="text-sm font-semibold tracking-tight">{t("formKicker")}</span>
                  </div>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200/95">
                    {t("quickRequest")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{t("formNote")}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/48">{t("formWhatHappens")}</p>
                <div className="mt-5 rounded-xl border border-cyan-400/22 bg-cyan-400/[0.07] px-4 py-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/95">{t("formFlowTitle")}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">{t("formFlowLead")}</p>
                </div>
                <KontaktyForm />
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease }}
            className="order-2 space-y-8 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:order-none"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">{t("channelsKicker")}</p>
              <ul className="mt-5 space-y-3">
                {trust.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-snug text-white/78">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)]"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <a
                href={CONTACTS.telegramHttps}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.07]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/18 text-cyan-200 transition group-hover:bg-cyan-400/28">
                  <Send className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">{t("telegramLabel")}</span>
                  <span className="font-medium text-white">{t("openTelegram")}</span>
                </span>
              </a>

              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-emerald-400/40 hover:bg-emerald-500/[0.09]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/18 text-emerald-100 transition group-hover:bg-emerald-500/26">
                  <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">{t("whatsappLabel")}</span>
                  <span className="font-medium text-white">{t("openWhatsapp")}</span>
                </span>
              </a>

              <a
                href={CONTACTS.mailto}
                className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-violet-400/35 hover:bg-violet-500/[0.07]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/18 text-violet-100 transition group-hover:bg-violet-500/26">
                  <Mail className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">{t("emailLabel")}</span>
                  <span className="break-all font-medium text-white">{CONTACTS.email}</span>
                  <span className="mt-0.5 block text-xs text-cyan-300/90">{t("writeEmail")}</span>
                </span>
              </a>
              <BookingCta />
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Якорь #contacts-form — плашка только когда форма не в кадре (не перекрывает отправку) */}
      {!formInView ? (
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
          <a
            href="#contacts-form"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/45 bg-[linear-gradient(135deg,rgba(8,14,28,0.96)_0%,rgba(6,10,22,0.98)_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_48px_rgba(0,0,0,0.55),0_0_40px_rgba(0,200,255,0.18)] backdrop-blur-md transition hover:border-cyan-400/70 hover:brightness-110 active:scale-[0.98]"
          >
            <ArrowDown className="h-4 w-4 text-cyan-300" aria-hidden />
            {t("stickyBarCta")}
          </a>
        </div>
      ) : null}
    </div>
  );
}
