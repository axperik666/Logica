"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Menu, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionHeader } from "@/components/motion";
import { Link, usePathname } from "@/navigation";
import { routing } from "@/i18n/routing";
import { CONTACTS } from "@/lib/contacts";

const ROUTES: {
  href: string;
  key: "services" | "cases" | "testimonials" | "about" | "contact";
}[] = [
  { href: "/#services", key: "services" },
  { href: "/#cases", key: "cases" },
  { href: "/#testimonials", key: "testimonials" },
  { href: "/o-nas", key: "about" },
  { href: "/#contact", key: "contact" }
];

const LANG_DISPLAY: Record<(typeof routing.locales)[number], { flag: string; label: string }> = {
  ru: { flag: "🇷🇺", label: "RU" },
  en: { flag: "🇬🇧", label: "EN" },
  it: { flag: "🇮🇹", label: "IT" }
};

const navLinkClass = (active: boolean) =>
  cn(
    "relative rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-300",
    "hover:bg-white/[0.09] hover:text-white",
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_32px_rgba(0,191,255,0.42),0_0_1px_rgba(0,191,255,0.6)]",
    active
      ? "text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.22),0_0_28px_rgba(0,191,255,0.28)] bg-white/[0.07]"
      : "text-white/80"
  );

const langLinkClass = (active: boolean) =>
  cn(
    "inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 sm:min-h-0 sm:min-w-0 sm:gap-1.5 sm:px-2.5 sm:text-xs sm:tracking-[0.14em] md:px-3",
    active
      ? "border border-[#00BFFF]/60 bg-[rgba(0,191,255,0.16)] text-[#B8F0FF] shadow-[0_0_26px_rgba(0,191,255,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]"
      : "border border-transparent text-white/85 hover:border-[#00BFFF]/35 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_22px_rgba(0,191,255,0.25)]"
  );

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tUi = useTranslations("header");
  const tHero = useTranslations("hero");
  const tf = useTranslations("footer");
  const tSeo = useTranslations("seo");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const items = useMemo(() => {
    return ROUTES.map((i) => {
      const baseHref = i.href.split("#")[0] ?? i.href;
      const active =
        baseHref === "/"
          ? pathname === "/"
          : pathname === baseHref || pathname.startsWith(baseHref + "/");
      return {
        ...i,
        label: t(i.key),
        active
      };
    });
  }, [pathname, t]);

  return (
    <MotionHeader
      initial={false}
      className={cn(
        "site-header glass glass-nav fixed inset-x-0 top-0 z-50 overflow-visible",
        /* усиление контраста на tech-bg + нижнее свечение #00BFFF */
        "border-b border-[#00BFFF]/55",
        "shadow-[inset_0_1px_0_rgba(0,191,255,0.22),0_12px_48px_rgba(0,0,0,0.55),0_0_80px_rgba(0,191,255,0.22)]",
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#00BFFF] after:to-transparent after:opacity-90 after:shadow-[0_0_24px_#00BFFF,0_0_48px_rgba(0,191,255,0.45)]"
      )}
    >
      <div className="container-px">
        <div className="flex min-h-[3.75rem] items-center justify-between gap-1.5 py-1.5 sm:min-h-[4.25rem] sm:gap-4 sm:py-2 lg:min-h-[4.5rem]">
          <Link
            href="/"
            className="group flex min-w-0 shrink items-center gap-3 sm:gap-4"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white/5 ring-2 ring-[#00BFFF]/30 shadow-[0_0_32px_rgba(0,191,255,0.28)] transition group-hover:ring-[#00BFFF]/50 group-hover:shadow-[0_0_44px_rgba(0,191,255,0.38)] sm:h-14 sm:w-14">
              <Image
                src="/logo.png"
                alt={tSeo("logoAlt")}
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="brand-glow truncate text-sm font-bold uppercase tracking-[0.11em] text-white sm:text-xl sm:tracking-[0.14em] md:text-2xl">
                LOGICA MARKETING
              </div>
              <div className="mt-0.5 hidden flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:flex">
                <span className="text-[11px] text-white/65 sm:text-xs">{tUi("tagline")}</span>
                <span className="font-mono text-[10px] tracking-wide text-[#00BFFF]/55">
                  logicamarketing.pro
                </span>
              </div>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label={tHero("internalNavAria")}
          >
            {items.map((i) => (
              <Link key={i.href} href={i.href} className={navLinkClass(i.active)}>
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 shrink items-center justify-end gap-1 sm:gap-2.5">
            <nav
              aria-label={tUi("switchTo")}
              className="flex max-w-[calc(100vw-10rem)] shrink items-center overflow-x-auto rounded-2xl border border-[#00BFFF]/38 bg-[rgba(3,8,22,0.88)] p-1 shadow-[inset_0_1px_0_rgba(0,191,255,0.18),0_4px_32px_rgba(0,191,255,0.14),0_0_1px_rgba(0,191,255,0.5)] backdrop-blur-xl scrollbar-hide [-webkit-overflow-scrolling:touch]"
            >
              {routing.locales.map((loc, idx) => {
                const { flag } = LANG_DISPLAY[loc];
                const active = locale === loc;
                return (
                  <span key={loc} className="flex items-center">
                    {idx > 0 ? (
                      <span
                        aria-hidden
                        className="shrink-0 select-none px-0.5 text-[11px] font-light text-[#00BFFF]/55 sm:px-1"
                      >
                        |
                      </span>
                    ) : null}
                    <Link
                      href={pathname}
                      locale={loc}
                      prefetch={false}
                      className={langLinkClass(active)}
                      aria-current={active ? "true" : undefined}
                      aria-label={LANG_DISPLAY[loc].label}
                      title={LANG_DISPLAY[loc].label}
                    >
                      <span aria-hidden>{flag}</span>
                      <span className="hidden min-[380px]:inline">{LANG_DISPLAY[loc].label}</span>
                    </Link>
                  </span>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-2xl border border-[#00BFFF]/42 bg-[rgba(4,10,26,0.92)] p-1 shadow-[inset_0_1px_0_rgba(0,191,255,0.18),0_6px_28px_rgba(0,191,255,0.14)] backdrop-blur-xl">
                <span className="brand-glow hidden px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white md:inline">
                  {tUi("ctaNow")}
                </span>
                <a
                  href={CONTACTS.telegramHttps}
                  aria-label={tf("telegramLabel")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00BFFF]/35 bg-[rgba(0,191,255,0.08)] text-[#7AE0FF] shadow-[0_0_20px_rgba(0,191,255,0.2)] transition hover:border-[#00BFFF]/55 hover:bg-[rgba(0,191,255,0.14)] hover-lift"
                >
                  <Send className="h-5 w-5" />
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tf("whatsappLabel")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-500/12 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.18)] transition hover:border-emerald-400/55 hover:bg-emerald-500/18 hover-lift"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
              <Button href="/#contact" variant="ghost" className="hidden hover-lift xl:inline-flex">
                {t("cta")}
              </Button>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <a
                href={CONTACTS.telegramHttps}
                aria-label={tf("telegramLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00BFFF]/38 bg-[rgba(6,12,28,0.85)] text-[#7AE0FF] shadow-[0_0_18px_rgba(0,191,255,0.22)] transition hover:border-[#00BFFF]/55 hover-lift"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tf("whatsappLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-500/12 text-emerald-300 transition hover:border-emerald-400/55 hover-lift"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>

            <button
              type="button"
              aria-label={open ? tUi("closeMenu") : tUi("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="btn-burger-glass inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition hover:border-[rgba(0,191,255,0.55)] hover:bg-white/[0.07] hover:shadow-[0_0_28px_rgba(0,191,255,0.35)] lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <MotionDiv
        aria-hidden={!open}
        initial={false}
        animate={
          open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }
        }
        className="fixed inset-0 z-[60] lg:hidden"
      >
        <button
          type="button"
          aria-label={tUi("closeMenu")}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/88 backdrop-blur-[3px]"
        />
        <MotionDiv
          initial={false}
          animate={open ? { y: 0 } : { y: -10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="container-px relative mt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:mt-20"
        >
          <div
            className={cn(
              "glass-mobile-drawer rounded-3xl p-4",
              "border border-[#00BFFF]/50 shadow-[inset_0_1px_0_rgba(0,191,255,0.15),0_24px_64px_rgba(0,0,0,0.65),0_0_56px_rgba(0,191,255,0.22)]"
            )}
          >
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                  LOGICA MARKETING
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#00BFFF]/70">logicamarketing.pro</div>
              </div>
              <nav
                aria-label={tUi("switchTo")}
                className="flex flex-wrap items-center rounded-2xl border border-[#00BFFF]/35 bg-[rgba(4,8,20,0.75)] p-1.5 shadow-[inset_0_1px_0_rgba(0,191,255,0.08)]"
              >
                {routing.locales.map((loc, idx) => {
                  const { flag } = LANG_DISPLAY[loc];
                  const active = locale === loc;
                  return (
                    <span key={loc} className="flex items-center">
                      {idx > 0 ? (
                        <span aria-hidden className="px-1 text-[#00BFFF]/45">
                          |
                        </span>
                      ) : null}
                      <Link
                        href={pathname}
                        locale={loc}
                        prefetch={false}
                        className={cn(langLinkClass(active), "py-2")}
                        aria-current={active ? "true" : undefined}
                        aria-label={LANG_DISPLAY[loc].label}
                        title={LANG_DISPLAY[loc].label}
                      >
                        <span aria-hidden>{flag}</span>
                        <span className="hidden min-[380px]:inline">{LANG_DISPLAY[loc].label}</span>
                      </Link>
                    </span>
                  );
                })}
              </nav>
            </div>

            <div className="mt-4 grid gap-1">
              {items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className={cn(
                    navLinkClass(i.active),
                    "px-4 py-3.5 text-[15px] font-medium"
                  )}
                >
                  {i.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#00BFFF]/35 bg-[rgba(5,10,24,0.75)] px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(0,191,255,0.1)]">
              <div className="brand-glow text-xs font-bold uppercase tracking-[0.2em] text-white">
                {tUi("ctaNow")}
              </div>
              <div className="mt-3 flex justify-center gap-4">
                <a
                  href={CONTACTS.telegramHttps}
                  aria-label={tf("telegramLabel")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/40 bg-[rgba(0,191,255,0.1)] text-[#7AE0FF] shadow-[0_0_24px_rgba(0,191,255,0.2)] transition hover:bg-[rgba(0,191,255,0.18)] hover-lift"
                >
                  <Send className="h-7 w-7" aria-hidden />
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tf("whatsappLabel")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/45 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.18)] transition hover:bg-emerald-500/22 hover-lift"
                >
                  <MessageCircle className="h-7 w-7" aria-hidden />
                </a>
              </div>
            </div>

            <div className="mt-4 flex justify-center border-t border-white/12 pt-4">
              <a
                href={CONTACTS.mailto}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white/95 transition hover:border-[#00BFFF]/35 hover:bg-white/10"
              >
                <Mail className="h-5 w-5 text-[#7AE0FF]" />
                {tf("emailLabel")}
              </a>
            </div>

            <div className="mt-4 px-0.5">
              <Button href="/#contact" variant="ghost" className="hover-lift w-full border border-white/15 bg-white/[0.06] py-3.5 text-base font-semibold text-white hover:bg-white/10">
                {t("cta")} — {tUi("ctaFormHint")}
              </Button>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
    </MotionHeader>
  );
}
