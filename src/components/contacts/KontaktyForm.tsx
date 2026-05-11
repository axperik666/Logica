"use client";

import { FormEvent, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { TurnstileField } from "@/components/TurnstileField";
import { LeadMessengersHint } from "@/components/contacts/LeadMessengersHint";

type Err =
  | "VALIDATION"
  | "DELIVERY"
  | "NOT_CONFIGURED"
  | "RATE_LIMIT"
  | "CAPTCHA"
  | null;

export function KontaktyForm() {
  const t = useTranslations("contactsPage");
  const tl = useTranslations("leads");
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<Err>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const onTurnstile = useCallback((token: string | null) => {
    setTurnstileToken(token ?? "");
  }, []);

  function goStep2() {
    setErr(null);
    if (!name.trim() || !contact.trim()) {
      setErr("VALIDATION");
      return;
    }
    setStep(1);
  }

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
        setName("");
        setContact("");
        setMessage("");
        setStep(0);
        setTurnstileToken("");
        track("lead_submit", { source: "kontakty" });
      } else if (data.error === "VALIDATION") {
        setErr("VALIDATION");
      } else if (data.error === "RATE_LIMIT") {
        setErr("RATE_LIMIT");
      } else if (data.error === "CAPTCHA") {
        setErr("CAPTCHA");
      } else if (data.error === "DELIVERY") {
        setErr("DELIVERY");
      } else {
        setErr("NOT_CONFIGURED");
      }
    } catch {
      setErr("DELIVERY");
    } finally {
      setPending(false);
    }
  }

  const field =
    "h-12 rounded-xl border border-white/[0.12] bg-[#050810]/80 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-cyan-400/45 focus:ring-2 focus:ring-cyan-400/25";

  if (ok) {
    return (
      <div className="mt-8 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-5">
        <p className="text-sm font-medium text-emerald-200/95">{t("submitSuccess")}</p>
        <LeadMessengersHint />
      </div>
    );
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
      <input type="hidden" name="source" value="kontakty" />
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">
        {step === 0 ? t("formStep1Label") : t("formStep2Label")}
      </p>

      {step === 0 ? (
        <>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldName")}</span>
            <input
              className={field}
              placeholder={t("placeholderName")}
              name="name_visible"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={pending}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldContact")}</span>
            <input
              className={field}
              placeholder={t("placeholderContact")}
              name="contact_visible"
              autoComplete="tel email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              disabled={pending}
            />
          </label>
          {err === "VALIDATION" ? (
            <p className="text-sm text-amber-200/90" role="alert">
              {t("submitErrorValidation")}
            </p>
          ) : null}
          <Button
            type="button"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-bold uppercase tracking-wide shadow-[0_0_32px_rgba(0,180,255,0.35)] transition hover:brightness-110"
            onClick={goStep2}
          >
            {t("formNext")}
          </Button>
        </>
      ) : (
        <>
          <input type="hidden" name="name" value={name} readOnly />
          <input type="hidden" name="contact" value={contact} readOnly />
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldMessage")}</span>
            <textarea
              className={`min-h-32 resize-y py-3 ${field}`}
              placeholder={t("placeholderMessage")}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="ghost"
              className="w-full rounded-xl border border-white/20 sm:w-auto sm:min-w-[7rem]"
              onClick={() => {
                setStep(0);
                setErr(null);
              }}
              disabled={pending}
            >
              {t("formBack")}
            </Button>
            <Button
              type="submit"
              className="w-full flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-bold uppercase tracking-wide shadow-[0_0_32px_rgba(0,180,255,0.35)] transition hover:brightness-110 disabled:opacity-60"
              disabled={pending}
            >
              {pending ? t("submitting") : t("submit")}
            </Button>
          </div>
          <p className="text-xs leading-relaxed text-white/50">{t("consent")}</p>
        </>
      )}
    </form>
  );
}
