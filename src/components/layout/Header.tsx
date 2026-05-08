"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Menu, MessageCircle, Send, X } from "lucide-react";
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

const LOCALE_SEGMENTS: {
  locale: (typeof routing.locales)[number];
  flag: string;
  label: string;
}[] = [
  { locale: "ru", flag: "🇷🇺", label: "RU" },
  { locale: "en", flag: "🇬🇧", label: "EN" },
  { locale: "it", flag: "🇮🇹", label: "IT" }
];

function LocaleSegments({
  onNavigate,
  variant
}: {
  onNavigate?: () => void;
  variant: "toolbar" | "drawer";
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const tUi = useTranslations("header");

  return (
    <div
      role="group"
      aria-label={tUi("switchTo")}
      className={cn(
        "locale-segments inline-flex items-stretch rounded-2xl border border-[#00BFFF]/55 bg-[linear-gradient(155deg,rgba(8,16,38,0.96)_0%,rgba(3,8,22,0.92)_100%)] p-1 shadow-[inset_0_1px_0_rgba(0,191,255,0.22),0_8px_36px_rgba(0,0,0,0.55),0_0_42px_rgba(0,191,255,0.22)] backdrop-blur-2xl",
        variant === "toolbar" && "shrink-0",
        variant === "drawer" && "w-full justify-stretch gap-0"
      )}
    >
      {LOCALE_SEGMENTS.map(({ locale: loc, flag, label }, idx) => {
        const active = locale === loc;
        return (
          <div key={loc} className="flex min-w-0 flex-1 items-stretch">
            {idx > 0 ? (
              <span
                className="locale-segments__sep my-1 w-px shrink-0 bg-[linear-gradient(180deg,transparent,rgba(0,191,255,0.55),transparent)] opacity-90"
                aria-hidden
              />
            ) : null}
            <Link
              href={pathname}
              locale={loc}
              prefetch={false}
              className={cn(
                "locale-segments__btn flex min-h-[2.5rem] flex-1 items-center justify-center gap-1 rounded-xl px-1.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 sm:gap-1.5 sm:px-2.5 sm:text-[11px]",
                active
                  ? "bg-[rgba(0,191,255,0.26)] text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.42),0_0_28px_rgba(0,191,255,0.38)]"
                  : "text-white/72 hover:bg-white/[0.09] hover:text-white hover:shadow-[0_0_22px_rgba(0,191,255,0.28)]"
              )}
              onClick={() => onNavigate?.()}
            >
              <span className="select-none text-[0.95rem] leading-none sm:text-base" aria-hidden>
                {flag}
              </span>
              <span className="tabular-nums">{label}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

const navLinkClass = (active: boolean) =>
  cn(
    "relative shrink-0 whitespace-nowrap rounded-xl px-2 py-1.5 text-[12px] font-medium transition-all duration-300 sm:px-3 sm:py-2 sm:text-[13px] lg:text-sm xl:px-3.5",
    "hover:bg-white/[0.1] hover:text-white",
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_28px_rgba(0,191,255,0.42),0_0_1px_rgba(0,191,255,0.8)]",
    active
      ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.35),0_0_26px_rgba(0,191,255,0.38)]"
      : "text-white/82"
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

  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(typeof window !== "undefined" ? window.location.hash : "");
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname]);

  const items = useMemo(() => {
    const onHome = pathname === "/" || pathname === "";

    return ROUTES.map((i) => {
      const hashIdx = i.href.indexOf("#");
      const hashPart = hashIdx >= 0 ? i.href.slice(hashIdx) : null;
      const baseHref = hashIdx >= 0 ? i.href.slice(0, hashIdx) || "/" : i.href;

      let active = false;
      if (hashPart) {
        active = onHome && hash === hashPart;
      } else {
        active =
          pathname === baseHref ||
          (baseHref !== "/" && pathname.startsWith(`${baseHref}/`));
      }

      return {
        ...i,
        label: t(i.key),
        active
      };
    });
  }, [pathname, t, hash]);

  return (
    <MotionHeader
      initial={false}
      className={cn("site-header glass glass-nav fixed inset-x-0 top-0 z-50 overflow-visible")}
    >
      <div className="container-px">
        <div className="flex min-h-[4rem] items-center justify-between gap-2 py-2.5 sm:min-h-[4.25rem] sm:gap-3 lg:min-h-[4.5rem] lg:flex-nowrap lg:gap-5 lg:py-3">
          <Link
            href="/"
            className="group flex min-w-0 max-w-[calc(100%-11rem)] shrink items-center gap-2.5 sm:max-w-[calc(100%-12rem)] sm:gap-3.5 lg:max-w-[min(46vw,18rem)] xl:max-w-[min(48vw,22rem)] 2xl:max-w-none"
          >
            <div className="relative h-[3.35rem] w-[3.35rem] shrink-0 overflow-hidden rounded-2xl bg-white/[0.06] ring-[3px] ring-[#00BFFF]/42 shadow-[0_0_48px_rgba(0,191,255,0.42)] transition duration-300 group-hover:ring-[#00BFFF]/65 group-hover:shadow-[0_0_68px_rgba(0,191,255,0.52)] sm:h-[4rem] sm:w-[4rem] lg:h-[4.5rem] lg:w-[4.5rem] lg:rounded-[1.35rem]">
              <Image
                src="/logo.png"
                alt={tSeo("logoAlt")}
                fill
                sizes="72px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0 leading-[1.06]">
              <div
                className={cn(
                  "brand-glow text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-white sm:text-[0.95rem] sm:tracking-[0.11em]",
                  "max-lg:truncate lg:whitespace-nowrap lg:text-[clamp(0.85rem,1.25vw,1.12rem)] lg:tracking-[0.12em] xl:text-[clamp(1rem,1.45vw,1.28rem)] xl:tracking-[0.13em]"
                )}
              >
                LOGICA MARKETING
              </div>
              <div className="mt-0.5 hidden flex-wrap items-baseline gap-x-2 md:flex md:mt-1">
                <span className="text-[10px] font-medium text-white/78 sm:text-[11px]">
                  {tUi("tagline")}
                </span>
                <span className="hidden font-mono text-[10px] tracking-wide text-[#00BFFF]/65 lg:inline">
                  logicamarketing.pro
                </span>
              </div>
            </div>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 justify-center px-2 lg:flex"
            aria-label={tHero("internalNavAria")}
          >
            <div className="scrollbar-hide mx-auto flex max-w-full items-center justify-center gap-x-0.5 overflow-x-auto overscroll-x-contain py-0.5 [-webkit-overflow-scrolling:touch] sm:gap-x-1 lg:gap-x-1.5">
              {items.map((i) => (
                <Link key={i.href} href={i.href} className={navLinkClass(i.active)}>
                  {i.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-2.5 lg:border-l lg:border-white/[0.14] lg:pl-5 xl:pl-6">
            <LocaleSegments variant="toolbar" />

            <div className="header-contact-pill hidden flex-nowrap md:flex">
              <Link
                href="/#contact"
                className="shrink-0 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.14] sm:px-4 sm:text-sm sm:tracking-[0.14em]"
              >
                {t("cta")}
              </Link>
              <span className="header-contact-pill__divider mx-0.5 my-1.5 sm:mx-1" aria-hidden />
              <a
                href={CONTACTS.telegramHttps}
                aria-label={tf("telegramLabel")}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00BFFF]/42 bg-[rgba(0,191,255,0.12)] text-[#9AE8FF] shadow-[0_0_26px_rgba(0,191,255,0.35)] transition hover:border-[#00BFFF]/65 hover:bg-[rgba(0,191,255,0.22)] hover-lift"
              >
                <Send className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tf("whatsappLabel")}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/42 bg-emerald-500/16 text-emerald-200 shadow-[0_0_22px_rgba(52,211,153,0.28)] transition hover:border-emerald-400/65 hover:bg-emerald-500/24 hover-lift"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
              </a>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <a
                href={CONTACTS.telegramHttps}
                aria-label={tf("telegramLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00BFFF]/48 bg-[rgba(6,14,30,0.92)] text-[#9AE8FF] shadow-[0_0_26px_rgba(0,191,255,0.35)] transition hover:border-[#00BFFF]/65 hover-lift"
              >
                <Send className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tf("whatsappLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/45 bg-emerald-500/16 text-emerald-200 shadow-[0_0_22px_rgba(52,211,153,0.26)] transition hover:border-emerald-400/62 hover-lift"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
              </a>
            </div>

            <button
              type="button"
              aria-label={open ? tUi("closeMenu") : tUi("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="btn-burger-glass inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition hover:border-[rgba(0,191,255,0.65)] hover:bg-white/[0.08] hover:shadow-[0_0_36px_rgba(0,191,255,0.42)] lg:hidden"
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
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[60] lg:hidden"
      >
        <button
          type="button"
          aria-label={tUi("closeMenu")}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-[rgba(1,3,10,0.94)] backdrop-blur-md"
        />
        <MotionDiv
          initial={false}
          animate={open ? { y: 0, opacity: 1 } : { y: -14, opacity: 0.97 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="container-px relative mt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:mt-[4.5rem]"
        >
          <div className="glass-mobile-drawer rounded-[1.75rem] border border-[#00BFFF]/55 p-5 shadow-[0_32px_96px_rgba(0,0,0,0.82),0_0_80px_rgba(0,191,255,0.35)] sm:rounded-[2rem] sm:p-6">
            <div className="flex flex-col gap-5 border-b border-white/[0.14] pb-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="brand-glow text-sm font-bold uppercase tracking-[0.22em] text-white">
                  LOGICA MARKETING
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#00BFFF]/78">
                  logicamarketing.pro
                </div>
              </div>
              <LocaleSegments variant="drawer" onNavigate={() => setOpen(false)} />
            </div>

            <div className="mt-5 grid gap-2.5">
              {items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "drawer-nav-link px-4 py-3.5 text-[15px] font-semibold tracking-tight transition hover:bg-white/[0.12]",
                    i.active ? "drawer-nav-link--active" : ""
                  )}
                >
                  {i.label}
                </Link>
              ))}
            </div>

            <div className="header-contact-pill mt-6 flex flex-wrap items-center justify-center gap-2 px-2 py-2.5 sm:justify-between sm:px-3">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.14] sm:flex-none sm:px-5"
              >
                {t("cta")}
              </Link>
              <span className="header-contact-pill__divider hidden sm:mx-1 sm:block" aria-hidden />
              <div className="flex justify-center gap-3 sm:gap-2">
                <a
                  href={CONTACTS.telegramHttps}
                  aria-label={tf("telegramLabel")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/52 bg-[rgba(0,191,255,0.14)] text-[#9AE8FF] shadow-[0_0_36px_rgba(0,191,255,0.38)] transition hover:bg-[rgba(0,191,255,0.26)] hover-lift"
                >
                  <Send className="h-7 w-7" aria-hidden />
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tf("whatsappLabel")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/52 bg-emerald-500/22 text-emerald-200 shadow-[0_0_30px_rgba(52,211,153,0.32)] transition hover:bg-emerald-500/28 hover-lift"
                >
                  <MessageCircle className="h-7 w-7" aria-hidden />
                </a>
              </div>
            </div>

            <div className="mt-5 flex justify-center border-t border-white/[0.14] pt-5">
              <a
                href={CONTACTS.mailto}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.09] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#00BFFF]/45 hover:bg-white/[0.14]"
              >
                <Mail className="h-5 w-5 text-[#9AE8FF]" aria-hidden />
                {tf("emailLabel")}
              </a>
            </div>

            <div className="mt-5 px-0.5">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="hover-lift inline-flex w-full items-center justify-center rounded-xl border border-white/[0.18] bg-white/[0.09] py-3.5 text-base font-semibold text-white transition hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
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
