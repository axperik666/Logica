"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

type Err = "VALIDATION" | "DELIVERY" | "NOT_CONFIGURED" | null;

export function KontaktyForm() {
  const t = useTranslations("contactsPage");
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<Err>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setOk(true);
        form.reset();
        track("lead_submit", { source: "kontakty" });
      } else if (data.error === "VALIDATION") {
        setErr("VALIDATION");
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

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldName")}</span>
        <input
          className={field}
          placeholder={t("placeholderName")}
          name="name"
          required
          disabled={pending}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldContact")}</span>
        <input
          className={field}
          placeholder={t("placeholderContact")}
          name="contact"
          required
          disabled={pending}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">{t("fieldMessage")}</span>
        <textarea
          className={`min-h-32 resize-y py-3 ${field}`}
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

      {ok ? (
        <p className="text-sm font-medium text-emerald-300/95">{t("submitSuccess")}</p>
      ) : null}

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-bold uppercase tracking-wide shadow-[0_0_32px_rgba(0,180,255,0.35)] transition hover:brightness-110 disabled:opacity-60"
          disabled={pending}
        >
          {pending ? t("submitting") : t("submit")}
        </Button>
        <p className="mt-4 text-xs leading-relaxed text-white/50">{t("consent")}</p>
      </div>
    </form>
  );
}
