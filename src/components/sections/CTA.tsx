"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import { sectionInViewOptions } from "@/lib/sectionReveal";
import { track } from "@/lib/analytics";
import { TurnstileField } from "@/components/TurnstileField";
import { LeadMessengersHint } from "@/components/contacts/LeadMessengersHint";

const PLATFORM_KEYS: ContactPlatform[] = ["google", "meta", "tiktok", "telegram"];

function isContactPlatform(v: string | null): v is ContactPlatform {
  return v !== null && PLATFORM_KEYS.includes(v as ContactPlatform);
}

function isContactServiceKey(v: string | null): v is ContactServiceKey {
  return v !== null && CONTACT_SERVICE_ORDER.includes(v as ContactServiceKey);
}

export function CTA() {
  const t = useTranslations("cta");
  const tl = useTranslations("leads");
  const tSec = useTranslations("sectionsSeo");
  const narrow = useNarrowViewport();

  const fieldClass =
    "h-12 w-full rounded-xl border border-white/[0.12] bg-[#050810]/80 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-cyan-400/45 focus:ring-2 focus:ring-cyan-400/25 disabled:opacity-60";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [submitPending, setSubmitPending] = useState(false);
  const [submitErr, setSubmitErr] = useState<
    "delivery" | "notConfigured" | "rateLimit" | "captcha" | null
  >(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const onTurnstile = useCallback((token: string | null) => {
    setTurnstileToken(token ?? "");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const platform = sp.get("platform");
    const service = sp.get("service");
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
  }, [t]);

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
  const isInView = useInView(sectionRef, sectionInViewOptions);
  const sectionViewTracked = useRef(false);

  useEffect(() => {
    if (isInView && !sectionViewTracked.current) {
      sectionViewTracked.current = true;
      track("section_view", { section: "cta" });
    }
  }, [isInView]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitErr(null);
    if (!isPhonePlausible(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSubmitPending(true);
    const fd = new FormData();
    fd.set("source", "cta");
    fd.set("name", name);
    fd.set("phone", phone);
    fd.set("email", email);
    fd.set("niche", niche);
    fd.set("message", message);
    fd.set("company", "");
    if (turnstileToken) fd.set("cf-turnstile-response", turnstileToken);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setFormSuccess(true);
        setTurnstileToken("");
        track("lead_submit", { source: "cta" });
      } else if (data.error === "NOT_CONFIGURED") {
        setSubmitErr("notConfigured");
      } else if (data.error === "RATE_LIMIT") {
        setSubmitErr("rateLimit");
      } else if (data.error === "CAPTCHA") {
        setSubmitErr("captcha");
      } else if (data.error === "VALIDATION") {
        setPhoneError(true);
      } else {
        setSubmitErr("delivery");
      }
    } catch {
      setSubmitErr("delivery");
    } finally {
      setSubmitPending(false);
    }
  }

  function handleReset() {
    setFormSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setNiche("");
    setMessage("");
    setPhoneError(false);
    setSubmitErr(null);
    setTurnstileToken("");
  }

  return (
    <MotionSection
      ref={sectionRef}
      id="contact"
      className="full-bleed relative overflow-x-clip py-24 lg:py-28"
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
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-30%,rgba(0,180,255,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_40%,rgba(139,92,246,0.06),transparent_45%)]"
        aria-hidden
      />

      <div className="site-container relative z-[2]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-10">
        <div className="sr-only">
          <p>{tSec("cta.metaTitle")}</p>
          <p>{tSec("cta.metaDescription")}</p>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute -bottom-20 right-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
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
          <div className="brand-glow mt-3 text-xs font-semibold text-white/55 max-md:tracking-normal max-md:normal-case">
            {t("brandLine")}
          </div>
          <figure className="mt-6 max-w-2xl rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 sm:px-5">
            <blockquote className="text-sm leading-relaxed text-white/80">
              {t("socialProofQuote")}
            </blockquote>
            <figcaption className="mt-2 text-xs font-medium text-cyan-300/85">
              {t("socialProofCite")}
            </figcaption>
          </figure>
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
            <div className="rounded-3xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-6">
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
            <div className="relative rounded-[1.5rem] p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] [background:linear-gradient(135deg,rgba(0,180,255,0.45),rgba(139,92,246,0.25),rgba(0,180,255,0.15))]">
              <div className="relative overflow-hidden rounded-[1.45rem] border border-white/[0.06] bg-[linear-gradient(165deg,rgba(12,16,32,0.97)_0%,rgba(6,8,18,0.98)_100%)] p-5 backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                <h3 className="text-sm font-semibold">{t("formTitle")}</h3>
              </div>
              <p className="mt-2 text-sm text-white/60">{t("formSub")}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/50">{t("formWhatHappens")}</p>

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

                  <LeadMessengersHint />

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mx-auto w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 sm:mx-0"
                  >
                    {t("submitAgain")}
                  </button>
                </MotionDiv>
              ) : (
                <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                  <label className="grid gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                      {t("name")}
                    </span>
                    <input
                      name="name"
                      autoComplete="name"
                      className={fieldClass}
                      placeholder={t("phName")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                      {t("phone")}
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className={
                        fieldClass +
                        (phoneError ? " border-red-400/60 focus:border-red-400/50 focus:ring-red-400/20" : "")
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
                    <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                      {t("email")}
                    </span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={fieldClass}
                      placeholder={t("phEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                      {t("niche")}
                    </span>
                    <input
                      name="niche"
                      type="text"
                      autoComplete="organization"
                      maxLength={120}
                      className={fieldClass}
                      placeholder={t("phNiche")}
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      required
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                      {t("message")}
                    </span>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className={`min-h-[7.5rem] resize-y py-3 ${fieldClass}`}
                      placeholder={t("phMessage")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>

                  <TurnstileField onToken={onTurnstile} />

                  <div className="pt-2">
                    {submitErr === "delivery" ? (
                      <p className="mb-3 text-sm text-amber-200/90" role="alert">
                        {t("submitFail")}
                      </p>
                    ) : null}
                    {submitErr === "notConfigured" ? (
                      <p className="mb-3 text-sm text-amber-200/90" role="alert">
                        {t("submitNotConfigured")}
                      </p>
                    ) : null}
                    {submitErr === "rateLimit" ? (
                      <p className="mb-3 text-sm text-amber-200/90" role="alert">
                        {tl("submitErrorRateLimit")}
                      </p>
                    ) : null}
                    {submitErr === "captcha" ? (
                      <p className="mb-3 text-sm text-amber-200/90" role="alert">
                        {tl("submitErrorCaptcha")}
                      </p>
                    ) : null}
                    <Button
                      type="submit"
                      disabled={submitPending}
                      className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_32px_rgba(0,180,255,0.35)] transition hover:brightness-110 disabled:opacity-60"
                    >
                      {submitPending ? t("submitSending") : t("submitApplication")}
                    </Button>
                    <p className="mt-4 text-xs leading-relaxed text-white/50">
                      {t("consent")}
                    </p>

                    <div className="mt-6 border-t border-white/[0.08] pt-5">
                      <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/50 max-md:normal-case max-md:tracking-normal sm:text-left">
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
            </div>
          </MotionDiv>
        </div>
      </div>
      </div>
    </MotionSection>
  );
}
