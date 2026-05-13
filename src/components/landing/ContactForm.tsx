"use client";

import { FormEvent, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { KontaktyForm } from "@/components/contacts/KontaktyForm";
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

  const field =
    "h-11 w-full rounded-xl border border-white/[0.12] bg-[#050810]/85 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-cyan-400/45 focus:ring-2 focus:ring-cyan-400/25";

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
    return (
      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-5">
        <p className="text-sm font-medium text-emerald-200/95">{t("submitSuccess")}</p>
        <LeadMessengersHint />
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
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
        <p className="text-base font-semibold text-white">{t("landingHeroFormTitle")}</p>
        <p className="mt-1 text-sm text-white/55">{t("landingHeroFormLead")}</p>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldName")}</span>
        <input className={field} placeholder={t("placeholderName")} name="name" autoComplete="name" required disabled={pending} />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldContact")}</span>
        <input
          className={field}
          placeholder={t("placeholderContact")}
          name="contact"
          autoComplete="tel email"
          required
          disabled={pending}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldMessage")}</span>
        <textarea
          className={`min-h-[88px] resize-y py-3 ${field}`}
          placeholder={t("placeholderMessage")}
          name="message"
          disabled={pending}
        />
      </label>

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

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-bold uppercase tracking-wide shadow-[0_0_28px_rgba(0,180,255,0.35)] transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </Button>
      <p className="text-[11px] leading-relaxed text-white/45">{t("landingHeroConsent")}</p>
    </form>
  );
}

export function ContactForm({ isHero }: { isHero?: boolean }) {
  const t = useTranslations("contactsPage");

  if (isHero) {
    return <HeroLeadForm />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-4">
      <div className="relative rounded-[1.5rem] p-[1px] shadow-[0_28px_96px_rgba(0,0,0,0.55)] [background:linear-gradient(135deg,rgba(0,220,255,0.45),rgba(139,92,246,0.28),rgba(0,180,255,0.18))]">
        <div className="rounded-[1.45rem] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(14,18,36,0.98)_0%,rgba(6,8,18,0.99)_100%)] px-6 py-8 backdrop-blur-xl sm:px-10 sm:py-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">{t("landingFullFormTitle")}</h2>
          <p className="mt-2 text-sm text-white/60">{t("landingFullFormLead")}</p>
          <KontaktyForm embedded />
        </div>
      </div>
    </div>
  );
}
