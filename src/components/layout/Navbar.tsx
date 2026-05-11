"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { homeSectionHref } from "@/lib/navHref";

const LOCALE_LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  it: "IT"
};

const navLinkClass = (active: boolean) =>
  cn(
    "relative shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-300 lg:text-sm",
    "hover:bg-white/[0.08] hover:text-[#00BFFF]",
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_34px_rgba(0,191,255,0.5),0_0_1px_rgba(0,191,255,0.9)]",
    "after:pointer-events-none after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:rounded after:bg-[#00BFFF] after:shadow-[0_0_18px_rgba(0,191,255,0.65)] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
    active
      ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.35),0_0_30px_rgba(0,191,255,0.44)] after:scale-x-100"
      : "text-white/82"
  );

function LocaleSegments({
  onNavigate,
  className
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const tUi = useTranslations("header");

  return (
    <div
      role="group"
      aria-label={tUi("switchTo")}
      className={cn(
        "flex w-full items-stretch rounded-[13px] border border-[#00BFFF]/44 bg-[linear-gradient(160deg,rgba(6,14,34,0.96)_0%,rgba(4,10,26,0.9)_100%)] p-[3px] shadow-[inset_0_1px_0_rgba(0,191,255,0.22),0_10px_36px_rgba(0,0,0,0.55),0_0_44px_rgba(0,191,255,0.18)] backdrop-blur-2xl md:w-auto",
        className
      )}
    >
      {routing.locales.map((loc, idx) => {
        const active = locale === loc;
        return (
          <div key={loc} className="flex min-w-0 flex-1 items-stretch">
            {idx > 0 ? (
              <span
                className="my-1 w-px shrink-0 bg-[linear-gradient(180deg,transparent,rgba(0,191,255,0.5),transparent)] opacity-90"
                aria-hidden
              />
            ) : null}
            <Link
              href={pathname}
              locale={loc}
              prefetch={false}
              onClick={() => onNavigate?.()}
              className={cn(
                "flex flex-1 items-center justify-center font-bold uppercase tracking-[0.12em] transition-all duration-300",
                "min-h-[2.35rem] rounded-[10px] px-2.5 text-[11px] sm:min-h-[2.5rem] sm:px-3 sm:text-[12px]",
                active
                  ? "bg-[rgba(0,191,255,0.3)] text-white shadow-[inset_0_1px_0_rgba(0,191,255,0.48),0_0_38px_rgba(0,191,255,0.45)]"
                  : "text-white/72 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_28px_rgba(0,191,255,0.32)]"
              )}
            >
              <span className="tabular-nums">{LOCALE_LABELS[loc] ?? loc.toUpperCase()}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

function NavbarCta({ onClick, className }: { onClick?: () => void; className?: string }) {
  const tNav = useTranslations("nav");
  return (
    <Link
      href={homeSectionHref("contact")}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-xl border border-[#00BFFF]/40 bg-[rgba(0,191,255,0.12)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_64px_rgba(0,191,255,0.42),0_0_22px_rgba(0,191,255,0.38)]",
        "transition-all duration-300 hover:scale-[1.03] hover:bg-[rgba(0,191,255,0.24)] hover:border-[#00BFFF]/78 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_112px_rgba(0,191,255,0.7),0_0_34px_rgba(0,191,255,0.55)]",
        "hidden sm:inline-flex sm:items-center sm:justify-center",
        className
      )}
    >
      {tNav("cta")}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const onHome = pathname === "/" || pathname === "";

  const casesActive = useMemo(() => onHome && hash === "#cases", [onHome, hash]);
  const servicesActive = useMemo(() => onHome && hash === "#services", [onHome, hash]);
  const aboutActive = useMemo(() => pathname === "/o-nas", [pathname]);
  const contactActive = useMemo(() => onHome && hash === "#contact", [onHome, hash]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[color-mix(in_srgb,var(--header-surface)_88%,transparent)] shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[var(--header-h)] min-h-[4.375rem] items-center justify-between gap-3 lg:min-h-[5.75rem]">
          <Link href="/" className="relative z-10 flex shrink-0 items-center gap-3">
            <Image
              src="/logo.png"
              alt="LOGICA Marketing"
              width={144}
              height={36}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          {/* Центр: десктоп-навигация */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
            <div className="pointer-events-auto flex items-center gap-0.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
              <Link href={homeSectionHref("cases")} className={navLinkClass(casesActive)}>
                {tNav("cases")}
              </Link>
              <Link href={homeSectionHref("services")} className={navLinkClass(servicesActive)}>
                {tNav("services")}
              </Link>
              <Link href="/o-nas" className={navLinkClass(aboutActive)}>
                {tNav("about")}
              </Link>
              <Link href={homeSectionHref("contact")} className={navLinkClass(contactActive)}>
                {tNav("contact")}
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <LocaleSegments className="hidden md:inline-flex shrink-0" />
            <NavbarCta />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition hover:bg-white/[0.1] md:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? tHeader("closeMenu") : tHeader("openMenu")}
            >
              {isOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/10 bg-[color-mix(in_srgb,#050814_92%,transparent)] backdrop-blur-2xl md:hidden"
        >
          <div className="flex max-h-[min(70vh,calc(100dvh-var(--header-h)-1rem))] flex-col gap-2 overflow-y-auto px-4 py-6">
            <Link
              href={homeSectionHref("cases")}
              onClick={() => setIsOpen(false)}
              className={cn(navLinkClass(casesActive), "w-full text-center")}
            >
              {tNav("cases")}
            </Link>
            <Link
              href={homeSectionHref("services")}
              onClick={() => setIsOpen(false)}
              className={cn(navLinkClass(servicesActive), "w-full text-center")}
            >
              {tNav("services")}
            </Link>
            <Link
              href="/o-nas"
              onClick={() => setIsOpen(false)}
              className={cn(navLinkClass(aboutActive), "w-full text-center")}
            >
              {tNav("about")}
            </Link>
            <Link
              href={homeSectionHref("contact")}
              onClick={() => setIsOpen(false)}
              className={cn(navLinkClass(contactActive), "w-full text-center")}
            >
              {tNav("contact")}
            </Link>

            <div className="pt-4">
              <LocaleSegments onNavigate={() => setIsOpen(false)} className="w-full justify-stretch" />
            </div>

            <Link
              href={homeSectionHref("contact")}
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full rounded-2xl border border-[#00BFFF]/40 bg-[rgba(0,191,255,0.15)] py-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_40px_rgba(0,191,255,0.35)]"
            >
              {tNav("cta")}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </nav>
  );
}
