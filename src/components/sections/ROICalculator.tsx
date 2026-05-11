"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { Calculator, Sparkles, X } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { TurnstileField } from "@/components/TurnstileField";
import { track } from "@/lib/analytics";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function ROICalculator() {
  const t = useTranslations("roiCalculator");
  const tSec = useTranslations("sectionsSeo");
  const tl = useTranslations("leads");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [budget, setBudget] = useState(500_000);
  const [roas, setRoas] = useState(3.2);
  const [growthPct, setGrowthPct] = useState(25);
  const [profitDisplay, setProfitDisplay] = useState(0);
  const profitAnimFrom = useRef(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [pending, setPending] = useState(false);
  const [formOk, setFormOk] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const onTurnstile = useCallback((token: string | null) => {
    setTurnstileToken(token ?? "");
  }, []);

  const profit = useMemo(() => {
    const b = clamp(budget, 0, 500_000_000);
    const r = clamp(roas, 0.5, 50);
    const g = clamp(growthPct, 0, 200);
    const currentRev = b * r;
    return Math.round(currentRev * (g / 100));
  }, [budget, roas, growthPct]);

  useEffect(() => {
    const ctrl = animate(profitAnimFrom.current, profit, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        profitAnimFrom.current = v;
        setProfitDisplay(v);
      }
    });
    return () => ctrl.stop();
  }, [profit]);

  const profitFormatted = useMemo(
    () =>
      new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
        Math.round(profitDisplay)
      ),
    [profitDisplay]
  );

  async function onSubmitModal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErr(null);
    setPending(true);
    const fd = new FormData();
    fd.set("source", "roi-calculator");
    fd.set("name", name);
    fd.set("contact", contact);
    fd.set(
      "message",
      [
        t("modalNote", {
          budget: new Intl.NumberFormat(undefined).format(budget),
          roas: String(roas),
          growth: String(growthPct),
          profit: new Intl.NumberFormat(undefined).format(profit)
        })
      ].join("\n")
    );
    fd.set("company", "");
    if (turnstileToken) fd.set("cf-turnstile-response", turnstileToken);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setFormOk(true);
        track("lead_submit", { source: "roi-calculator" });
      } else if (data.error === "RATE_LIMIT") setFormErr("RATE_LIMIT");
      else if (data.error === "CAPTCHA") setFormErr("CAPTCHA");
      else setFormErr("OTHER");
    } catch {
      setFormErr("OTHER");
    } finally {
      setPending(false);
    }
  }

  const fieldClass =
    "h-11 w-full rounded-xl border border-white/[0.12] bg-[#050810]/85 px-3 text-sm text-white outline-none focus:border-cyan-400/45";

  return (
    <MotionSection
      ref={ref}
      id="roi-calculator"
      className="full-bleed relative overflow-x-clip border-t border-white/[0.06] py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(0,180,255,0.1),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_80%,rgba(139,92,246,0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="site-container relative">
        <div className="sr-only">
          <p>{tSec("roiCalculator.metaTitle")}</p>
          <p>{tSec("roiCalculator.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            <Calculator className="h-4 w-4 text-cyan-300" aria-hidden />
            {t("badge")}
          </div>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-5">
            <label className="grid gap-2 text-left">
              <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                {t("fieldBudget")}
              </span>
              <input
                type="number"
                min={0}
                className={fieldClass}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value) || 0)}
              />
            </label>
            <label className="grid gap-2 text-left">
              <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                {t("fieldRoas")}
              </span>
              <input
                type="number"
                step="0.1"
                min={0.5}
                className={fieldClass}
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value) || 0)}
              />
            </label>
            <label className="grid gap-2 text-left">
              <span className="text-xs font-medium uppercase tracking-wide text-white/55">
                {t("fieldGrowth")}
              </span>
              <input
                type="range"
                min={0}
                max={150}
                value={growthPct}
                onChange={(e) => setGrowthPct(Number(e.target.value))}
                className="accent-cyan-400"
              />
              <span className="text-sm font-mono text-cyan-200/90">{growthPct}%</span>
            </label>
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.07] px-5 py-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
              {t("resultKicker")}
            </p>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-white sm:text-4xl">
              {t("resultPrefix")}{" "}
              <span className="bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                +{profitFormatted}
              </span>{" "}
              {t("resultCurrency")}
            </p>
            <p className="mt-2 text-xs text-white/50">{t("resultDisclaimer")}</p>
          </div>

          <Button
            type="button"
            onClick={() => {
              setModalOpen(true);
              setFormOk(false);
              setFormErr(null);
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_32px_rgba(0,180,255,0.35)]"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {t("cta")}
          </Button>
        </MotionDiv>
      </div>

      <AnimatePresence>
        {modalOpen ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label={t("modalClose")}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal
              aria-labelledby="roi-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative z-[1] w-full max-w-md rounded-[1.5rem] border border-white/[0.12] bg-[linear-gradient(180deg,#0a1020_0%,#060912_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 id="roi-modal-title" className="pr-10 text-lg font-semibold text-white">
                {t("modalTitle")}
              </h3>
              <p className="mt-2 text-sm text-white/60">{t("modalLead")}</p>

              {formOk ? (
                <p className="mt-6 text-sm font-medium text-emerald-200/95">{t("modalSuccess")}</p>
              ) : (
                <form className="mt-6 grid gap-3" onSubmit={onSubmitModal}>
                  <input
                    className={fieldClass}
                    placeholder={t("modalName")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={pending}
                  />
                  <input
                    className={fieldClass}
                    placeholder={t("modalContact")}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    disabled={pending}
                  />
                  <TurnstileField onToken={onTurnstile} />
                  {formErr === "RATE_LIMIT" ? (
                    <p className="text-sm text-amber-200">{tl("submitErrorRateLimit")}</p>
                  ) : null}
                  {formErr === "CAPTCHA" ? (
                    <p className="text-sm text-amber-200">{tl("submitErrorCaptcha")}</p>
                  ) : null}
                  {formErr === "OTHER" ? (
                    <p className="text-sm text-amber-200">{t("modalError")}</p>
                  ) : null}
                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-bold uppercase tracking-wide"
                  >
                    {pending ? t("modalSending") : t("modalSubmit")}
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionSection>
  );
}
