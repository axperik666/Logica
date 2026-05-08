"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Send,
  X
} from "lucide-react";
import { cn } from "@/lib/cn";
import { MotionDiv, MotionHeader } from "@/components/motion";
import { Link, usePathname } from "@/navigation";
import { routing } from "@/i18n/routing";
import { CONTACTS } from "@/lib/contacts";
import { homeSectionHref } from "@/lib/navHref";
import {
  CONTACT_SERVICE_ORDER,
  homeServiceAnchorHref,
  type ContactServiceKey
} from "@/lib/contactHref";

type StaticNavKey = "cases" | "testimonials" | "about" | "contact";

const STATIC_NAV: Array<{
  key: StaticNavKey;
  href: ReturnType<typeof homeSectionHref> | "/o-nas" | "/otzyvy";
}> = [
  { key: "cases", href: homeSectionHref("cases") },
  { key: "testimonials", href: "/otzyvy" },
  { key: "about", href: "/o-nas" },
  { key: "contact", href: homeSectionHref("contact") }
];

const LOCALE_SEGMENTS: {
  locale: (typeof routing.locales)[number];
  label: string;
}[] = [
  { locale: "ru", label: "RU" },
  { locale: "en", label: "EN" },
  { locale: "it", label: "IT" }
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
  const isDrawer = variant === "drawer";

  return (
    <div
      role="group"
      aria-label={tUi("switchTo")}
      className={cn(
        "locale-segments inline-flex items-stretch rounded-[13px] border border-[#00BFFF]/44 bg-[linear-gradient(160deg,rgba(6,14,34,0.96)_0%,rgba(4,10,26,0.9)_100%)] shadow-[inset_0_1px_0_rgba(0,191,255,0.22),0_10px_36px_rgba(0,0,0,0.55),0_0_44px_rgba(0,191,255,0.18)] backdrop-blur-2xl",
        isDrawer ? "p-1" : "p-[3px] lg:p-1",
        variant === "toolbar" && "shrink-0",
        variant === "drawer" && "w-full justify-stretch gap-0"
      )}
    >
      {LOCALE_SEGMENTS.map(({ locale: loc, label }, idx) => {
        const active = locale === loc;
        return (
          <div key={loc} className="flex min-w-0 flex-1 items-stretch">
            {idx > 0 ? (
              <span
                className="locale-segments__sep my-1 w-px shrink-0 bg-[linear-gradient(180deg,transparent,rgba(0,191,255,0.5),transparent)] opacity-90"
                aria-hidden
              />
            ) : null}
            <Link
              href={pathname}
              locale={loc}
              prefetch={false}
              className={cn(
                "locale-segments__btn flex flex-1 items-center justify-center font-bold uppercase tracking-[0.12em] transition-all duration-300",
                isDrawer
                  ? "min-h-[2.65rem] rounded-xl px-3 py-2 text-[12px] sm:min-h-[2.75rem] sm:px-4 sm:text-[13px]"
                  : "min-h-[2.5rem] rounded-[10px] px-2 py-1.5 text-[11px] sm:min-h-[2.65rem] sm:px-2.5 sm:text-[12px] lg:min-h-[3rem] lg:rounded-xl lg:px-3.5 lg:py-2.5 lg:text-[13px]",
                active
                  ? "bg-[rgba(0,191,255,0.3)] text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.48),0_0_38px_rgba(0,191,255,0.45)]"
                  : "text-white/72 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_28px_rgba(0,191,255,0.32)]"
              )}
              onClick={() => onNavigate?.()}
            >
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
    "relative shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-[12px] font-medium transition-all duration-300 sm:text-[13px] lg:px-3 lg:py-2.5 lg:text-sm xl:px-3.5",
    "hover:bg-white/[0.08] hover:text-[#00BFFF]",
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_34px_rgba(0,191,255,0.5),0_0_1px_rgba(0,191,255,0.9)]",
    "after:pointer-events-none after:absolute after:left-3 after:right-3 after:bottom-1.5 after:h-px after:rounded after:bg-[#00BFFF] after:opacity-0 after:transition-opacity after:duration-300 after:underline-offset-8 hover:after:opacity-100",
    active
      ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.35),0_0_30px_rgba(0,191,255,0.44)] after:opacity-100"
      : "text-white/82"
  );

/** Текст «Связаться» внутри glass-пилюли + glow / hover-lift */
function HeaderCtaLink({
  className,
  children,
  onClick
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={homeSectionHref("contact")}
      onClick={onClick}
      className={cn(
        "header-cta-link shrink-0 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white",
        "border border-[#00BFFF]/40 bg-[rgba(0,191,255,0.12)]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_52px_rgba(0,191,255,0.38),0_0_18px_rgba(0,191,255,0.32)]",
        "transition-all duration-300 hover:bg-[rgba(0,191,255,0.22)] hover:border-[#00BFFF]/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_86px_rgba(0,191,255,0.62),0_0_26px_rgba(0,191,255,0.45)] hover-lift hover:scale-[1.05]",
        "sm:px-4 sm:text-xs sm:tracking-[0.15em]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tUi = useTranslations("header");
  const tHero = useTranslations("hero");
  const tf = useTranslations("footer");
  const tSeo = useTranslations("seo");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      if (h > 0) {
        document.documentElement.style.setProperty("--header-h", `${h}px`);
      }
    };

    setVar();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setVar());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  const onHome = pathname === "/" || pathname === "";

  const servicesActive = useMemo(
    () =>
      onHome &&
      (hash === "#services" ||
        CONTACT_SERVICE_ORDER.some((k) => hash === `#service-${k}`)),
    [hash, onHome]
  );

  const staticNavItems = useMemo(() => {
    return STATIC_NAV.map((i) => {
      let active = false;
      if (typeof i.href === "object" && i.href !== null && "hash" in i.href) {
        active = onHome && hash === `#${i.href.hash}`;
      } else if (i.href === "/o-nas") {
        active = pathname === "/o-nas";
      }
      return {
        ...i,
        label: t(i.key),
        active
      };
    });
  }, [pathname, t, hash, onHome]);

  return (
    <MotionHeader
      ref={headerRef}
      initial={false}
      className={cn(
        "site-header glass glass-nav fixed inset-x-0 top-0 z-50 w-full min-w-0 max-w-[100vw] overflow-visible"
      )}
    >
      <div className="site-container site-container--wide">
        {/*
          Mobile ~70px (min-h 4.375rem), desktop ~80px (min-h 5rem).
          Воздух: gap растёт от sm к xl.
        */}
        <div
          className={cn(
            "flex min-h-[4.375rem] items-center justify-between gap-2 py-2",
            "sm:gap-3 sm:py-2.5",
            "lg:min-h-[5.75rem] lg:gap-5 lg:py-3.5",
            "xl:min-h-[6rem] xl:gap-7 xl:py-4"
          )}
        >
          <div
            className={cn(
              "flex min-w-0 shrink items-center gap-2 sm:gap-3 lg:gap-4",
              "max-w-[calc(100%-13.5rem)] sm:max-w-[calc(100%-16rem)]",
              "lg:max-w-[min(44vw,22rem)] xl:max-w-[min(46vw,24rem)] 2xl:max-w-none"
            )}
          >
            <Link
              href="/"
              className={cn("group flex min-w-0 shrink items-center gap-2 sm:gap-3")}
            >
            {/* Лого: меньше на мобилке, крупнее на desktop */}
            <div
              className={cn(
                "relative shrink-0 overflow-hidden rounded-xl bg-white/[0.06] ring-[2.5px] ring-[#00BFFF]/44 shadow-[0_0_54px_rgba(0,191,255,0.42)] transition duration-300",
                "h-10 w-10 sm:h-11 sm:w-11 sm:rounded-2xl sm:ring-[3px]",
                "lg:h-[4.25rem] lg:w-[4.25rem] lg:rounded-[1.25rem]",
                "xl:h-[4.75rem] xl:w-[4.75rem] xl:rounded-[1.45rem]",
                "group-hover:ring-[#00BFFF]/68 group-hover:shadow-[0_0_72px_rgba(0,191,255,0.48)]"
              )}
            >
              <Image
                src="/logo.png"
                alt={tSeo("logoAlt")}
                fill
                sizes="(max-width: 1024px) 40px, 72px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0 leading-[1.05]">
              <div
                className={cn(
                  "brand-glow font-extrabold uppercase tracking-[0.1em] text-white",
                  "text-[0.7rem] sm:text-[0.78rem] sm:tracking-[0.105em]",
                  "max-lg:truncate",
                  "lg:whitespace-nowrap lg:text-[clamp(0.88rem,1.15vw,1.06rem)] lg:tracking-[0.12em]",
                  "xl:text-[clamp(1.02rem,1.35vw,1.22rem)] xl:tracking-[0.13em]",
                  "drop-shadow-[0_0_28px_rgba(0,191,255,0.45)]"
                )}
              >
                LOGICA MARKETING
              </div>
              <div className="mt-0.5 hidden flex-wrap items-baseline gap-x-2 md:flex md:mt-1">
                <span className="text-[10px] font-medium text-white/80 sm:text-[11px]">
                  {tUi("tagline")}
                </span>
                <span className="hidden font-mono text-[10px] tracking-wide text-[#00BFFF]/68 lg:inline">
                  logicamarketing.pro
                </span>
              </div>
            </div>
          </Link>

            <Link
              href="/sozdanie-sajta"
              className={cn(
                "brand-glow hidden shrink-0 items-center rounded-full border border-[#00BFFF]/42 bg-[rgba(0,191,255,0.12)] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#D8FDFF] shadow-[0_0_28px_rgba(0,191,255,0.28)] transition hover:border-[#00BFFF]/65 hover:bg-[rgba(0,191,255,0.22)] md:inline-flex lg:px-3 lg:py-2 lg:text-[10px]"
              )}
            >
              {t("websitesOffer")}
            </Link>
          </div>

          <nav
            className="hidden min-w-0 flex-1 justify-center px-3 xl:px-6 lg:flex"
            aria-label={tHero("internalNavAria")}
          >
            <div className="scrollbar-hide mx-auto flex max-w-full items-center justify-center gap-x-1 overflow-x-auto overscroll-x-contain py-0.5 [-webkit-overflow-scrolling:touch] lg:gap-x-1.5 xl:gap-x-2">
              <div className="group relative">
                <Link
                  href={homeSectionHref("services")}
                  className={cn(
                    navLinkClass(servicesActive),
                    "inline-flex items-center gap-1 pr-1"
                  )}
                >
                  {t("services")}
                  <ChevronDown
                    className="h-3.5 w-3.5 shrink-0 opacity-70 transition duration-300 group-hover:rotate-180"
                    aria-hidden
                  />
                </Link>
                <div
                  className="pointer-events-none invisible absolute left-1/2 top-full z-[70] min-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                  role="presentation"
                >
                  <div
                    className="glass overflow-hidden rounded-2xl border border-[#00BFFF]/40 bg-[rgba(6,12,28,0.96)] py-2 shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_48px_rgba(0,191,255,0.22)] backdrop-blur-xl"
                    role="menu"
                    aria-label={t("servicesMenuAria")}
                  >
                    <Link
                      role="menuitem"
                      href={homeSectionHref("services")}
                      className="block px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                    >
                      {t("servicesOverview")}
                    </Link>
                    <div className="mx-3 h-px bg-white/10" />
                    {CONTACT_SERVICE_ORDER.map((svc: ContactServiceKey) => (
                      <Link
                        key={svc}
                        role="menuitem"
                        href={homeServiceAnchorHref(svc)}
                        className="block px-4 py-2 text-sm text-white/82 transition hover:bg-white/[0.08] hover:text-white"
                      >
                        {t(`serviceDrop.${svc}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {staticNavItems.map((i) => (
                <Link key={i.key} href={i.href} className={navLinkClass(i.active)}>
                  {i.label}
                </Link>
              ))}
            </div>
          </nav>

          <div
            className={cn(
              "flex min-w-0 shrink-0 items-center justify-end",
              "gap-1.5 sm:gap-2",
              "lg:gap-3 lg:border-l lg:border-white/[0.14] lg:pl-5 xl:gap-4 xl:pl-7"
            )}
          >
            {/* На мобильных языки доступны в drawer — иначе мешают лого/CTA. */}
            <div className="hidden md:block">
              <LocaleSegments variant="toolbar" />
            </div>

            {/* Desktop / tablet: полная пилюля */}
            <div className="header-contact-pill hidden flex-nowrap md:flex">
              <HeaderCtaLink>{t("cta")}</HeaderCtaLink>
              <span className="header-contact-pill__divider mx-0.5 my-1.5 sm:mx-1" aria-hidden />
              <a
                href={CONTACTS.telegramHttps}
                aria-label={tf("telegramLabel")}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00BFFF]/44 bg-[rgba(0,191,255,0.12)] text-[#9AE8FF] shadow-[0_0_28px_rgba(0,191,255,0.38)] transition hover:border-[#00BFFF]/68 hover:bg-[rgba(0,191,255,0.22)] hover:shadow-[0_0_40px_rgba(0,191,255,0.45)] hover-lift"
              >
                <Send className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tf("whatsappLabel")}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/44 bg-emerald-500/16 text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.3)] transition hover:border-emerald-400/65 hover:bg-emerald-500/24 hover:shadow-[0_0_38px_rgba(52,211,153,0.38)] hover-lift"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
              </a>
            </div>

            {/* Mobile: компактная пилюля «Связаться» + мессенджеры (навигация — только бургер) */}
            <div className="header-contact-pill header-contact-pill--toolbar-sm flex flex-nowrap md:hidden">
              <HeaderCtaLink className="px-2 py-1.5 text-[9px] tracking-[0.12em] sm:px-2.5 sm:text-[10px]">
                {t("cta")}
              </HeaderCtaLink>
              <span
                className="header-contact-pill__divider header-contact-pill__divider--sm mx-0.5"
                aria-hidden
              />
              <a
                href={CONTACTS.telegramHttps}
                aria-label={tf("telegramLabel")}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00BFFF]/48 bg-[rgba(0,191,255,0.12)] text-[#9AE8FF] shadow-[0_0_22px_rgba(0,191,255,0.35)] transition hover:border-[#00BFFF]/65 hover:shadow-[0_0_34px_rgba(0,191,255,0.42)] hover-lift"
              >
                <Send className="h-[1.15rem] w-[1.15rem]" aria-hidden />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tf("whatsappLabel")}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/48 bg-emerald-500/16 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.26)] transition hover:border-emerald-400/62 hover:shadow-[0_0_32px_rgba(52,211,153,0.34)] hover-lift"
              >
                <MessageCircle className="h-[1.15rem] w-[1.15rem]" aria-hidden />
              </a>
            </div>

            <button
              type="button"
              aria-label={open ? tUi("closeMenu") : tUi("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="btn-burger-glass inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition hover:border-[rgba(0,191,255,0.65)] hover:bg-white/[0.08] hover:shadow-[0_0_36px_rgba(0,191,255,0.42)] lg:hidden"
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
          className="site-container relative mt-[calc(var(--header-h)+env(safe-area-inset-top,0px))] max-h-[calc(100dvh-var(--header-h)-env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
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
              <Link
                href="/sozdanie-sajta"
                onClick={() => setOpen(false)}
                className={cn(
                  "drawer-nav-link px-4 py-3.5 text-[15px] font-semibold tracking-tight transition hover:bg-white/[0.12]",
                  pathname === "/sozdanie-sajta" ? "drawer-nav-link--active" : ""
                )}
              >
                {t("websitesOffer")}
              </Link>

              <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-1">
                <Link
                  href={homeSectionHref("services")}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "drawer-nav-link block rounded-xl px-3 py-3 text-[15px] font-semibold tracking-tight transition hover:bg-white/[0.12]",
                    servicesActive ? "drawer-nav-link--active" : ""
                  )}
                >
                  {t("servicesOverview")}
                </Link>
                <div className="mx-2 my-1 h-px bg-white/10" />
                <div className="grid gap-0.5 pb-1">
                  {CONTACT_SERVICE_ORDER.map((svc: ContactServiceKey) => (
                    <Link
                      key={svc}
                      href={homeServiceAnchorHref(svc)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-[14px] font-medium text-white/85 transition hover:bg-white/[0.1]",
                        onHome && hash === `#service-${svc}`
                          ? "bg-white/[0.08] text-white"
                          : ""
                      )}
                    >
                      {t(`serviceDrop.${svc}`)}
                    </Link>
                  ))}
                </div>
              </div>

              {staticNavItems.map((i) => (
                <Link
                  key={i.key}
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
              <HeaderCtaLink
                className="min-w-0 flex-1 rounded-xl py-2.5 text-center text-sm sm:flex-none sm:px-5"
                onClick={() => setOpen(false)}
              >
                {t("cta")}
              </HeaderCtaLink>
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
                href={homeSectionHref("contact")}
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
