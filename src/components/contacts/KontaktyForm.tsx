"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

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

  return (
    <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
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
        <span className="text-xs text-white/70">{t("fieldName")}</span>
        <input
          className="h-11 rounded-xl border border-white/10 bg-[#070B12]/40 px-4 text-sm outline-none focus:ring-2 focus:ring-brand-400/70"
          placeholder={t("placeholderName")}
          name="name"
          required
          disabled={pending}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs text-white/70">{t("fieldContact")}</span>
        <input
          className="h-11 rounded-xl border border-white/10 bg-[#070B12]/40 px-4 text-sm outline-none focus:ring-2 focus:ring-brand-400/70"
          placeholder={t("placeholderContact")}
          name="contact"
          required
          disabled={pending}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs text-white/70">{t("fieldMessage")}</span>
        <textarea
          className="min-h-28 rounded-xl border border-white/10 bg-[#070B12]/40 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-400/70"
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
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? t("submitting") : t("submit")}
        </Button>
        <p className="mt-3 text-xs text-white/55">{t("consent")}</p>
      </div>
    </form>
  );
}
