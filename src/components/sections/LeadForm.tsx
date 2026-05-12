"use client";

import { type FormEvent, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DsButton } from "@/components/ui/ds";
import { TurnstileField } from "@/components/TurnstileField";
import { track } from "@/lib/analytics";

type Err =
  | "VALIDATION"
  | "DELIVERY"
  | "NOT_CONFIGURED"
  | "RATE_LIMIT"
  | "CAPTCHA"
  | null;

export default function LeadForm() {
  const t = useTranslations("sectionsDs.leadForm");
  const tContacts = useTranslations("contactsPage");
  const tl = useTranslations("leads");
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<Err>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const onTurnstile = useCallback((token: string | null) => {
    setTurnstileToken(token ?? "");
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        track("lead_submit", { source: "sections-ds-lead" });
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

  if (ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl py-10 text-center"
      >
        <h3 className="text-2xl font-semibold text-primary sm:text-3xl">{t("thankTitle")}</h3>
        <p className="mt-3 text-base text-gray-300 sm:text-lg">{t("thankBody")}</p>
      </motion.div>
    );
  }

  const field =
    "w-full rounded-2xl border border-white/30 bg-transparent px-5 py-4 text-white outline-none transition placeholder:text-gray-400 focus:border-primary sm:px-6 sm:py-5";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-dark-800 p-6 sm:p-10"
    >
      <input type="hidden" name="source" value="sections-ds-lead" />
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="space-y-5 sm:space-y-6">
        <input
          type="text"
          name="name"
          placeholder={t("namePlaceholder")}
          className={field}
          required
          disabled={pending}
          autoComplete="name"
        />
        <input
          type="text"
          name="contact"
          placeholder={t("contactPlaceholder")}
          className={field}
          required
          disabled={pending}
          autoComplete="tel"
        />
        <textarea
          name="message"
          placeholder={t("messagePlaceholder")}
          rows={4}
          className={`${field} resize-none rounded-3xl`}
          disabled={pending}
        />
      </div>

      {err === "VALIDATION" ? (
        <p className="mt-4 text-sm text-amber-200/90" role="alert">
          {tContacts("submitErrorValidation")}
        </p>
      ) : null}
      {err === "RATE_LIMIT" ? (
        <p className="mt-4 text-sm text-amber-200/90" role="alert">
          {tl("submitErrorRateLimit")}
        </p>
      ) : null}
      {err === "CAPTCHA" ? (
        <p className="mt-4 text-sm text-amber-200/90" role="alert">
          {tl("submitErrorCaptcha")}
        </p>
      ) : null}
      {err === "DELIVERY" || err === "NOT_CONFIGURED" ? (
        <p className="mt-4 text-sm text-amber-200/90" role="alert">
          {err === "NOT_CONFIGURED" ? tContacts("submitErrorNotConfigured") : tContacts("submitErrorDelivery")}
        </p>
      ) : null}

      <div className="mt-6">
        <TurnstileField onToken={onTurnstile} />
      </div>

      <DsButton type="submit" size="lg" className="mt-8 w-full" disabled={pending}>
        {t("submit")}
      </DsButton>
      <p className="mt-6 text-center text-xs text-gray-500">{t("footnote")}</p>
    </form>
  );
}
