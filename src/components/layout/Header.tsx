"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Mail, Menu, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/cn";
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

const LANG_DISPLAY: Record<
  (typeof routing.locales)[number],
  { label: string }
> = {
  ru: { label: "RU" },
  en: { label: "EN" },
  it: { label: "IT" }
};

function LocaleSwitcher({
  onNavigate,
  variant
}: {
  onNavigate?: () => void;
  variant: "toolbar" | "drawer";
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const tUi = useTranslations("header");
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (wrapRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const current = LANG_DISPLAY[locale as keyof typeof LANG_DISPLAY]?.label ?? locale;

  return (
    <div
      ref={wrapRef}
      className={cn("relative z-[60]", variant === "drawer" && "w-full sm:w-auto")}
    >
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-haspopup="listbox"
        aria-label={tUi("switchTo")}
        onClick={() => setMenuOpen((v) => !v)}
        className={cn(
          "lang-switcher-glass inline-flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/[0.06]",
          variant === "toolbar" && "h-10 min-w-[5.25rem] shrink-0 sm:min-w-[5.5rem]",
          variant === "drawer" && "h-11 w-full sm:h-10 sm:min-w-[12rem]"
        )}
      >
        <span className="tabular-nums">{current}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#7AE0FF] transition-transform",
            menuOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {menuOpen ? (
        <ul
          role="listbox"
          className={cn(
            "absolute z-[80] mt-1.5 overflow-hidden rounded-xl border border-[#00BFFF]/45 bg-[rgba(4,10,24,0.98)] py-1 shadow-[0_16px_48px_rgba(0,0,0,0.55),0_0_1px_rgba(0,191,255,0.5)] backdrop-blur-xl",
            variant === "toolbar" && "right-0 min-w-[100%] sm:min-w-[10rem]",
            variant === "drawer" && "left-0 right-0 sm:left-auto sm:right-0 sm:min-w-[12rem]"
          )}
        >
          {routing.locales.map((loc) => {
            const { label } = LANG_DISPLAY[loc];
            const active = locale === loc;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <Link
                  href={pathname}
                  locale={loc}
                  prefetch={false}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-semibold tracking-wide transition",
                    active
                      ? "bg-[rgba(0,191,255,0.18)] text-[#D4FBFF]"
                      : "text-white/88 hover:bg-white/[0.08]"
                  )}
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate?.();
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

const navLinkClass = (active: boolean) =>
  cn(
    "relative shrink-0 whitespace-nowrap rounded-xl px-2 py-2 text-[13px] font-medium transition-all duration-300 lg:px-2.5 lg:py-2 lg:text-sm xl:px-3",
    "hover:bg-white/[0.09] hover:text-white",
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_16px_rgba(0,191,255,0.22)]",
    active
      ? "text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.22),0_0_14px_rgba(0,191,255,0.18)] bg-white/[0.07]"
      : "text-white/80"
  );

export function Header() {
  const pathname = usePathname();
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
        "site-header glass glass-nav fixed inset-x-0 top-0 z-50 overflow-visible"
      )}
    >
      <div className="container-px">
        <div className="flex min-h-[4rem] flex-wrap items-center justify-between gap-y-2 py-2 sm:min-h-[4.5rem] sm:gap-4 lg:grid lg:min-h-[5rem] lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] lg:items-center lg:gap-x-4 lg:gap-y-0 xl:gap-x-8">
          <Link
            href="/"
            className="group flex min-w-0 max-w-[calc(100%-8rem)] shrink items-center gap-2.5 sm:gap-4 lg:max-w-none lg:shrink-0"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white/5 ring-[3px] ring-[#00BFFF]/35 shadow-[0_0_40px_rgba(0,191,255,0.35)] transition group-hover:ring-[#00BFFF]/55 group-hover:shadow-[0_0_52px_rgba(0,191,255,0.45)] sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image
                src="/logo.png"
                alt={tSeo("logoAlt")}
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0 leading-[1.05]">
              <div
                className={cn(
                  "brand-glow text-[0.82rem] font-extrabold uppercase tracking-[0.1em] text-white sm:text-lg sm:tracking-[0.12em]",
                  "max-lg:truncate lg:whitespace-nowrap lg:text-[clamp(0.95rem,1.6vw,1.35rem)] lg:tracking-[0.12em] xl:text-2xl xl:tracking-[0.14em]"
                )}
              >
                LOGICA MARKETING
              </div>
              <div className="mt-0.5 hidden flex-wrap items-baseline gap-x-2 md:flex lg:mt-1">
                <span className="text-[10px] text-white/72 sm:text-[11px]">
                  {tUi("tagline")}
                </span>
                <span className="hidden font-mono text-[10px] tracking-wide text-[#00BFFF]/60 xl:inline">
                  logicamarketing.pro
                </span>
              </div>
            </div>
          </Link>

          <nav
            className="hidden min-h-0 min-w-0 justify-self-stretch lg:flex"
            aria-label={tHero("internalNavAria")}
          >
            <div className="scrollbar-hide flex h-full w-full min-w-0 items-center justify-center overflow-x-auto overscroll-x-contain px-0.5 [-webkit-overflow-scrolling:touch]">
              <div className="flex w-max max-w-full flex-nowrap items-center gap-0.5 lg:gap-1">
                {items.map((i) => (
                  <Link key={i.href} href={i.href} className={navLinkClass(i.active)}>
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-2.5 lg:justify-self-end lg:border-l lg:border-white/[0.12] lg:pl-5 xl:pl-6">
            <LocaleSwitcher variant="toolbar" />

            {/* Десктоп / планшет: «Связаться» + TG + WA в одной glass-пилюле */}
            <div className="header-contact-pill hidden flex-nowrap md:flex">
              <Link
                href="/#contact"
                className="shrink-0 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/12 sm:px-4 sm:text-sm sm:tracking-[0.14em]"
              >
                {t("cta")}
              </Link>
              <span className="header-contact-pill__divider mx-0.5 my-1.5 sm:mx-1" aria-hidden />
              <a
                href={CONTACTS.telegramHttps}
                aria-label={tf("telegramLabel")}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00BFFF]/38 bg-[rgba(0,191,255,0.1)] text-[#7AE0FF] shadow-[0_0_22px_rgba(0,191,255,0.25)] transition hover:border-[#00BFFF]/58 hover:bg-[rgba(0,191,255,0.18)] hover-lift"
              >
                <Send className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tf("whatsappLabel")}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/38 bg-emerald-500/14 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.22)] transition hover:border-emerald-400/58 hover:bg-emerald-500/20 hover-lift"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
              </a>
            </div>

            {/* Мобилка: только быстрые иконки TG/WA */}
            <div className="flex items-center gap-1 md:hidden">
              <a
                href={CONTACTS.telegramHttps}
                aria-label={tf("telegramLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00BFFF]/42 bg-[rgba(6,14,30,0.9)] text-[#7AE0FF] shadow-[0_0_22px_rgba(0,191,255,0.28)] transition hover:border-[#00BFFF]/60 hover-lift"
              >
                <Send className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tf("whatsappLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/14 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.2)] transition hover:border-emerald-400/55 hover-lift"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
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
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[60] lg:hidden"
      >
        <button
          type="button"
          aria-label={tUi("closeMenu")}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/92 backdrop-blur-sm"
        />
        <MotionDiv
          initial={false}
          animate={open ? { y: 0, opacity: 1 } : { y: -12, opacity: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="container-px relative mt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:mt-20"
        >
          <div className="glass-mobile-drawer rounded-3xl p-4 sm:p-5">
            <div className="flex flex-col gap-4 border-b border-white/14 pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div>
                <div className="brand-glow text-sm font-bold uppercase tracking-[0.22em] text-white">
                  LOGICA MARKETING
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#00BFFF]/75">
                  logicamarketing.pro
                </div>
              </div>
              <LocaleSwitcher variant="drawer" onNavigate={() => setOpen(false)} />

            </div>

            <div className="mt-4 grid gap-2.5">
              {items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "drawer-nav-link px-4 py-3.5 text-[15px] font-semibold tracking-tight transition hover:bg-white/10",
                    i.active ? "drawer-nav-link--active" : ""
                  )}
                >
                  {i.label}
                </Link>
              ))}
            </div>

            <div className="header-contact-pill mt-5 flex flex-wrap items-center justify-center gap-2 px-2 py-2 sm:justify-between sm:px-3">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/12 sm:flex-none sm:px-5"
              >
                {t("cta")}
              </Link>
              <span className="header-contact-pill__divider hidden sm:mx-1 sm:block" aria-hidden />
              <div className="flex justify-center gap-3 sm:gap-2">
                <a
                  href={CONTACTS.telegramHttps}
                  aria-label={tf("telegramLabel")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/45 bg-[rgba(0,191,255,0.12)] text-[#7AE0FF] shadow-[0_0_28px_rgba(0,191,255,0.28)] transition hover:bg-[rgba(0,191,255,0.22)] hover-lift"
                >
                  <Send className="h-7 w-7" aria-hidden />
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tf("whatsappLabel")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/50 bg-emerald-500/18 text-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.25)] transition hover:bg-emerald-500/26 hover-lift"
                >
                  <MessageCircle className="h-7 w-7" aria-hidden />
                </a>
              </div>
            </div>

            <div className="mt-4 flex justify-center border-t border-white/14 pt-4">
              <a
                href={CONTACTS.mailto}
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#00BFFF]/40 hover:bg-white/12"
              >
                <Mail className="h-5 w-5 text-[#7AE0FF]" aria-hidden />
                {tf("emailLabel")}
              </a>
            </div>

            <div className="mt-4 px-0.5">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="hover-lift inline-flex w-full items-center justify-center rounded-xl border border-white/16 bg-white/[0.08] py-3.5 text-base font-semibold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                {t("cta")} — {tUi("ctaFormHint")}
              </Link>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
    </MotionHeader>
  );
}
