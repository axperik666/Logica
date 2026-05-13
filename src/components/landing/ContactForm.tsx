"use client";

import { FormEvent, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TurnstileField } from "@/components/TurnstileField";
import { LeadMessengersHint } from "@/components/contacts/LeadMessengersHint";
import { track } from "@/lib/analytics";

type Err =
  | "VALIDATION"
  | "DELIVERY"
  | "NOT_CONFIGURED"
  | "RATE_LIMIT"
  | "CAPTCHA"
  | null;

const INPUT =
  "w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#00b4ff]";
const INPUT_AREA =
  "w-full resize-none rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#00b4ff]";

function SuccessCard({ title, sub }: { title: string; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12 text-center"
    >
      <div className="mb-6 text-6xl" aria-hidden>
        🚀
      </div>
      <h3 className="mb-2 text-3xl font-semibold text-white">{title}</h3>
      <p className="text-white/80">{sub}</p>
      <LeadMessengersHint />
    </motion.div>
  );
}

function HeroLeadForm() {
  const t = useTranslations("contactsPage");
  const tl = useTranslations("leads");
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<Err>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const onTurnstile = useCallback((token: string | null) => {
    setTurnstileToken(token ?? "");
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (turnstileToken) fd.set("cf-turnstile-response", turnstileToken);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setOk(true);
        form.reset();
        setTurnstileToken("");
        track("lead_submit", { source: "kontakty-hero" });
      } else if (data.error === "VALIDATION") setErr("VALIDATION");
      else if (data.error === "RATE_LIMIT") setErr("RATE_LIMIT");
      else if (data.error === "CAPTCHA") setErr("CAPTCHA");
      else if (data.error === "DELIVERY") setErr("DELIVERY");
      else setErr("NOT_CONFIGURED");
    } catch {
      setErr("DELIVERY");
    } finally {
      setPending(false);
    }
  }

  if (ok) {
    return <SuccessCard title={t("landingSuccessTitle")} sub={t("landingSuccessSub")} />;
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <input type="hidden" name="source" value="kontakty-hero" />
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div>
        <label className="mb-2 block text-sm text-white/70">{t("landingLabelName")}</label>
        <input
          name="name"
          type="text"
          required
          disabled={pending}
          autoComplete="name"
          placeholder={t("landingPlaceholderNameCompany")}
          className={INPUT}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">{t("landingLabelContactCombo")}</label>
        <input
          name="contact"
          type="text"
          required
          disabled={pending}
          autoComplete="tel email"
          placeholder={t("landingPlaceholderContactHero")}
          className={INPUT}
        />
      </div>

      {err === "VALIDATION" ? (
        <p className="text-sm text-amber-200/90" role="alert">
          {t("submitErrorValidation")}
        </p>
      ) : null}
      {err === "RATE_LIMIT" ? (
        <p className="text-sm text-amber-200/90" role="alert">
          {tl("submitErrorRateLimit")}
        </p>
      ) : null}
      {err === "CAPTCHA" ? (
        <p className="text-sm text-amber-200/90" role="alert">
          {tl("submitErrorCaptcha")}
        </p>
      ) : null}
      {err === "DELIVERY" ? (
        <p className="text-sm text-amber-200/90" role="alert">
          {t("submitErrorDelivery")}
        </p>
      ) : null}
      {err === "NOT_CONFIGURED" ? (
        <p className="text-sm text-amber-200/90" role="alert">
          {t("submitErrorNotConfigured")}
        </p>
      ) : null}

      <TurnstileField onToken={onTurnstile} />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-3xl bg-[#00b4ff] py-5 text-lg font-semibold text-black transition-all hover:bg-cyan-300 active:scale-[0.97] disabled:opacity-70"
      >
        {pending ? t("submitting") : t("landingSubmitCta")}
      </button>
      <p className="text-center text-xs text-white/50">{t("landingFormHint")}</p>
      <p className="text-center text-[11px] text-white/40">{t("landingHeroConsent")}</p>
    </form>
  );
}

function FullLeadForm() {
  const t = useTranslations("contactsPage");
  const tl = useTranslations("leads");
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<Err>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const onTurnstile = useCallback((token: string | null) => {
    setTurnstileToken(token ?? "");
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const task = String(fd.get("message") ?? "").trim();
    if (!task) {
      setErr("VALIDATION");
      setPending(false);
      return;
    }
    if (turnstileToken) fd.set("cf-turnstile-response", turnstileToken);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setOk(true);
        form.reset();
        setTurnstileToken("");
        track("lead_submit", { source: "kontakty" });
      } else if (data.error === "VALIDATION") setErr("VALIDATION");
      else if (data.error === "RATE_LIMIT") setErr("RATE_LIMIT");
      else if (data.error === "CAPTCHA") setErr("CAPTCHA");
      else if (data.error === "DELIVERY") setErr("DELIVERY");
      else setErr("NOT_CONFIGURED");
    } catch {
      setErr("DELIVERY");
    } finally {
      setPending(false);
    }
  }

  if (ok) {
    return <SuccessCard title={t("landingSuccessTitle")} sub={t("landingSuccessSub")} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-4">
      <div className="relative rounded-[1.5rem] p-[1px] shadow-[0_28px_96px_rgba(0,0,0,0.55)] [background:linear-gradient(135deg,rgba(0,220,255,0.45),rgba(139,92,246,0.28),rgba(0,180,255,0.18))]">
        <div className="rounded-[1.45rem] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(14,18,36,0.98)_0%,rgba(6,8,18,0.99)_100%)] px-6 py-10 backdrop-blur-xl sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">{t("landingFullFormTitle")}</h2>
          <p className="mt-2 text-sm text-white/60">{t("landingFullFormLead")}</p>

          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="source" value="kontakty" />
            <input
              type="text"
              name="company"
              autoComplete="off"
              tabIndex={-1}
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
              aria-hidden
            />

            <div>
              <label className="mb-2 block text-sm text-white/70">{t("landingLabelName")}</label>
              <input
                name="name"
                type="text"
                required
                disabled={pending}
                autoComplete="name"
                placeholder={t("landingPlaceholderNameCompany")}
                className={INPUT}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">{t("landingLabelContactCombo")}</label>
              <input
                name="contact"
                type="text"
                required
                disabled={pending}
                autoComplete="tel email"
                placeholder={t("placeholderContact")}
                className={INPUT}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">{t("landingFieldNiche")}</label>
              <input name="niche" type="text" disabled={pending} placeholder={t("landingPlaceholderNiche")} className={INPUT} />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">{t("landingFieldTask")}</label>
              <textarea
                name="message"
                required
                disabled={pending}
                rows={3}
                placeholder={t("landingPlaceholderTask")}
                className={INPUT_AREA}
              />
            </div>

            {err === "VALIDATION" ? (
              <p className="text-sm text-amber-200/90" role="alert">
                {t("submitErrorValidation")}
              </p>
            ) : null}
            {err === "RATE_LIMIT" ? (
              <p className="text-sm text-amber-200/90" role="alert">
                {tl("submitErrorRateLimit")}
              </p>
            ) : null}
            {err === "CAPTCHA" ? (
              <p className="text-sm text-amber-200/90" role="alert">
                {tl("submitErrorCaptcha")}
              </p>
            ) : null}
            {err === "DELIVERY" ? (
              <p className="text-sm text-amber-200/90" role="alert">
                {t("submitErrorDelivery")}
              </p>
            ) : null}
            {err === "NOT_CONFIGURED" ? (
              <p className="text-sm text-amber-200/90" role="alert">
                {t("submitErrorNotConfigured")}
              </p>
            ) : null}

            <TurnstileField onToken={onTurnstile} />

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-3xl bg-[#00b4ff] py-5 text-lg font-semibold text-black transition-all hover:bg-cyan-300 active:scale-[0.97] disabled:opacity-70"
            >
              {pending ? t("submitting") : t("landingSubmitCta")}
            </button>
            <p className="text-center text-xs text-white/50">{t("landingFormHint")}</p>
            <p className="text-center text-[11px] text-white/45">{t("consent")}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ContactForm({ isHero }: { isHero?: boolean }) {
  if (isHero) {
    return <HeroLeadForm />;
  }
  return <FullLeadForm />;
}
