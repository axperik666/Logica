"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  PartyPopper,
  Send,
  Sparkles,
  Target
} from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { formatPhoneMask, isPhonePlausible } from "@/lib/phoneMask";
import { CONTACTS } from "@/lib/contacts";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";
import {
  CONTACT_SERVICE_ORDER,
  type ContactPlatform,
  type ContactServiceKey
} from "@/lib/contactHref";

const PLATFORM_KEYS: ContactPlatform[] = ["google", "meta", "tiktok", "telegram"];

function isContactPlatform(v: string | null): v is ContactPlatform {
  return v !== null && PLATFORM_KEYS.includes(v as ContactPlatform);
}

function isContactServiceKey(v: string | null): v is ContactServiceKey {
  return v !== null && CONTACT_SERVICE_ORDER.includes(v as ContactServiceKey);
}

function CTAFallback() {
  return (
    <section
      id="contact"
      className="full-bleed tech-bg relative overflow-x-clip py-24 lg:py-28"
    >
      <div className="site-container relative z-[2]">
        <div
          className="glass relative min-h-[28rem] animate-pulse rounded-[2rem] bg-white/[0.04] p-6 sm:p-10"
          aria-hidden
        />
      </div>
    </section>
  );
}

function CTAInner() {
  const t = useTranslations("cta");
  const tSec = useTranslations("sectionsSeo");
  const narrow = useNarrowViewport();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const platform = searchParams.get("platform");
    const service = searchParams.get("service");
    const lines: string[] = [];
    if (isContactPlatform(platform)) {
      lines.push(t(`prefillPlatform.${platform}`));
    }
    if (isContactServiceKey(service)) {
      lines.push(t(`prefillService.${service}`));
    }
    if (lines.length === 0) return;
    const block = lines.join("\n\n");
    setMessage((prev) => (prev.trim() ? prev : block));
  }, [searchParams, t]);

  useEffect(() => {
    const scrollToContact = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash !== "#contact") return;
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    };
    scrollToContact();
    window.addEventListener("hashchange", scrollToContact);
    return () => window.removeEventListener("hashchange", scrollToContact);
  }, []);

  const valuePointsRaw = t.raw("valuePoints");
  const valuePoints = Array.isArray(valuePointsRaw)
    ? (valuePointsRaw as string[])
    : [];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 120px 0px"
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isPhonePlausible(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setFormSuccess(true);
  }

  function handleReset() {
    setFormSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setNiche("");
    setMessage("");
    setPhoneError(false);
  }

  return (
    <MotionSection
      ref={sectionRef}
      id="contact"
      className="full-bleed tech-bg relative overflow-x-clip py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: narrow ? 0.03 : 0.08,
            delayChildren: narrow ? 0.02 : 0.05
          }
        }
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="section-edge-vignette" />
      </div>

      <div className="site-container relative z-[2]">
      <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <div className="sr-only">
          <p>{tSec("cta.metaTitle")}</p>
          <p>{tSec("cta.metaDescription")}</p>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-4 w-4 text-primary" />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">
            {t("sub")}
          </p>
          <div className="brand-glow mt-3 text-xs font-semibold tracking-[0.18em] text-white/55">
            {t("brandLine")}
          </div>
        </MotionDiv>

        <div className="relative mt-8 grid gap-6 lg:grid-cols-12">
          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Target className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug">{t("valueTitle")}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{t("valueSub")}</p>
                </div>
              </div>

              {valuePoints.length > 0 ? (
                <ul className="mt-6 space-y-3.5">
                  {valuePoints.map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/88">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-white/55">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                {t("valueFootnote")}
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h3 className="text-sm font-semibold">{t("formTitle")}</h3>
              <p className="mt-2 text-sm text-white/70">{t("formSub")}</p>

              {formSuccess ? (
                <MotionDiv
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="mt-8 flex flex-col gap-6 text-center sm:text-left"
                >
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 blur-xl" />
                      <PartyPopper className="relative mx-auto h-16 w-16 text-primary sm:mx-0" />
                    </div>
                    <p className="brand-glow mt-5 text-xl font-semibold leading-snug">
                      {t("successTitle")}
                    </p>
                    <p className="mt-2 max-w-md text-base text-white/85">
                      {t("successSub")}
                    </p>
                    <p className="mt-4 text-sm text-white/65">{t("successHint")}</p>
                  </div>

                  <div className="mt-3 flex justify-center gap-4 sm:gap-5">
                    <a
                      href={CONTACTS.telegramHttps}
                      aria-label={t("ctaTelegram")}
                      className="btn-cta-premium inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/35 bg-primary/12 text-white shadow-[0_8px_36px_rgba(0,191,255,0.18)] transition hover:border-primary/55 hover:bg-primary/20 hover-lift"
                    >
                      <Send className="h-8 w-8 text-primary" aria-hidden />
                    </a>
                    <a
                      href={CONTACTS.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("ctaWhatsapp")}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-white shadow-[0_8px_36px_rgba(16,185,129,0.12)] transition hover:border-emerald-400/45 hover:bg-emerald-500/15 hover-lift"
                    >
                      <MessageCircle className="h-8 w-8 text-emerald-400" aria-hidden />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mx-auto w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 sm:mx-0"
                  >
                    {t("submitAgain")}
                  </button>
                </MotionDiv>
              ) : (
                <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
                  <label className="grid gap-2">
                    <span className="text-xs text-white/70">{t("name")}</span>
                    <input
                      name="name"
                      autoComplete="name"
                      className="h-11 rounded-xl border border-white/10 bg-[rgba(8,12,28,0.92)] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-primary/60"
                      placeholder={t("phName")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs text-white/70">{t("phone")}</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className={
                        "h-11 rounded-xl border bg-[rgba(8,12,28,0.92)] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-primary/60 " +
                        (phoneError ? "border-red-400/60" : "border-white/10")
                      }
                      placeholder={t("phPhone")}
                      value={phone}
                      onChange={(e) => {
                        setPhoneError(false);
                        setPhone(formatPhoneMask(e.target.value));
                      }}
                      required
                    />
                    {phoneError ? (
                      <span className="text-xs text-red-400/90">{t("invalidPhone")}</span>
                    ) : null}
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs text-white/70">{t("email")}</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="h-11 rounded-xl border border-white/10 bg-[rgba(8,12,28,0.92)] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-primary/60"
                      placeholder={t("phEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs text-white/70">{t("niche")}</span>
                    <input
                      name="niche"
                      type="text"
                      autoComplete="organization"
                      maxLength={120}
                      className="h-11 rounded-xl border border-white/10 bg-[rgba(8,12,28,0.92)] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-primary/60"
                      placeholder={t("phNiche")}
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      required
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs text-white/70">{t("message")}</span>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="min-h-[104px] resize-y rounded-xl border border-white/10 bg-[rgba(8,12,28,0.92)] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-primary/60"
                      placeholder={t("phMessage")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="btn-cta-premium w-full py-4 text-base font-semibold hover-lift"
                    >
                      {t("submitApplication")}
                    </Button>
                    <p className="mt-3 text-xs leading-relaxed text-white/55">
                      {t("consent")}
                    </p>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/50 sm:text-left">
                        {t("directMessengersTitle")}
                      </p>
                      <div className="mt-4 flex justify-center gap-4 sm:justify-start">
                        <a
                          href={CONTACTS.telegramHttps}
                          aria-label={t("directTelegram")}
                          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/35 bg-[rgba(0,191,255,0.08)] text-white shadow-[0_6px_28px_rgba(0,191,255,0.14)] transition hover:border-[#00BFFF]/55 hover:bg-[rgba(0,191,255,0.14)] hover-lift"
                        >
                          <Send className="h-7 w-7 shrink-0 text-[#00BFFF]" aria-hidden />
                        </a>
                        <a
                          href={CONTACTS.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("directWhatsapp")}
                          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/35 bg-emerald-500/10 text-white shadow-[0_6px_28px_rgba(16,185,129,0.12)] transition hover:border-emerald-400/55 hover:bg-emerald-500/15 hover-lift"
                        >
                          <MessageCircle className="h-7 w-7 shrink-0 text-emerald-400" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </MotionDiv>
        </div>
      </div>
      </div>
    </MotionSection>
  );
}

export function CTA() {
  return (
    <Suspense fallback={<CTAFallback />}>
      <CTAInner />
    </Suspense>
  );
}
