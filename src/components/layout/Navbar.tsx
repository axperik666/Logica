"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { homeHashHref, websiteOfferHref } from "@/lib/navHref";

const LOCALE_LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  it: "IT"
};

const WEBSITE_MENU_KEYS = ["landing", "multiPage", "corporate"] as const;

function offerSectionKey(k: (typeof WEBSITE_MENU_KEYS)[number]): "landing" | "multipage" | "corporate" {
  if (k === "multiPage") return "multipage";
  return k;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();
  const locale = useLocale();
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
    setWebsiteOpen(false);
    setMoreOpen(false);
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

  const casesActive = useMemo(
    () => pathname.startsWith("/kejsy") || (onHome && hash === "#cases"),
    [pathname, onHome, hash]
  );
  const servicesActive = useMemo(
    () => pathname.startsWith("/uslugi") || (onHome && hash === "#services"),
    [pathname, onHome, hash]
  );
  const websiteActive = useMemo(() => pathname.startsWith("/sozdanie-sajta"), [pathname]);
  const guidesActive = useMemo(() => onHome && hash === "#guides", [onHome, hash]);
  const moreActive = useMemo(
    () => pathname === "/faq" || pathname === "/otzyvy" || pathname === "/o-nas",
    [pathname]
  );
  const contactActive = useMemo(
    () => pathname === "/kontakty" || (onHome && hash === "#contact"),
    [pathname, onHome, hash]
  );

  const itemClass = (active: boolean) =>
    cn(
      "relative inline-flex min-h-10 items-center justify-center whitespace-nowrap px-2.5 text-[15px] font-medium leading-snug tracking-tight text-white transition-[font-weight,opacity] duration-200 sm:min-h-11 sm:px-3 sm:text-sm",
      active ? "font-semibold" : "font-normal opacity-95 hover:opacity-100"
    );

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-0 bg-transparent shadow-none ring-0">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid h-[var(--header-h)] min-h-[4.375rem] grid-cols-[1fr_auto_1fr] items-center gap-3 lg:min-h-[5.75rem]">
          <div className="flex min-w-0 items-center justify-start">
            <Link
              href="/"
              className="flex shrink-0 items-center outline-none ring-0 ring-offset-0 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <Image
                src="/logo.png"
                alt="LOGICA Marketing"
                width={200}
                height={50}
                className="h-9 w-auto sm:h-10 md:h-11 lg:h-12"
                priority
              />
            </Link>
          </div>

          <div className="hidden min-w-0 items-center justify-center gap-x-7 lg:gap-x-9 md:flex">
            <Link href="/kejsy" className={itemClass(casesActive)}>
              {tNav("cases")}
            </Link>

            <Link href="/uslugi" className={itemClass(servicesActive)}>
              {tNav("services")}
            </Link>

            <div className="group relative flex items-center py-2 -my-2">
              <button
                type="button"
                className={cn(
                  itemClass(websiteActive),
                  "cursor-pointer gap-1 border-0 bg-transparent p-0",
                  "inline-flex items-center"
                )}
                aria-haspopup="menu"
                aria-label={tNav("websiteCreateAria")}
              >
                <span className="whitespace-nowrap">{tNav("createWebsite")}</span>
                <ChevronDown
                  strokeWidth={2.25}
                  className="size-4 shrink-0 text-white opacity-90 transition-transform duration-200 ease-out group-hover:rotate-180"
                  aria-hidden
                />
              </button>
              <div
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="h-4 w-full" aria-hidden />
                <div className="rounded-xl bg-[rgba(8,10,20,0.96)] p-1.5 shadow-xl backdrop-blur-xl">
                  {WEBSITE_MENU_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={websiteOfferHref(offerSectionKey(key))}
                      role="menuitem"
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.06]"
                    >
                      {tNav(`websiteCreateLinks.${key}`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href={homeHashHref("guides")} className={itemClass(guidesActive)}>
              {tNav("guides")}
            </Link>

            <Link href="/kontakty" className={itemClass(contactActive)}>
              {tNav("contact")}
            </Link>

            <div className="group relative flex items-center py-2 -my-2">
              <button
                type="button"
                className={cn(
                  itemClass(moreActive),
                  "cursor-pointer gap-1 border-0 bg-transparent p-0",
                  "inline-flex items-center"
                )}
                aria-haspopup="menu"
                aria-label={tNav("moreMenuAria")}
              >
                <span className="whitespace-nowrap">{tNav("more")}</span>
                <ChevronDown
                  strokeWidth={2.25}
                  className="size-4 shrink-0 text-white opacity-90 transition-transform duration-200 ease-out group-hover:rotate-180"
                  aria-hidden
                />
              </button>
              <div
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="h-4 w-full" aria-hidden />
                <div className="rounded-xl bg-[rgba(8,10,20,0.96)] p-1.5 shadow-xl backdrop-blur-xl">
                  <Link
                    href="/o-nas"
                    role="menuitem"
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.06]"
                  >
                    {tNav("about")}
                  </Link>
                  <Link
                    href="/faq"
                    role="menuitem"
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.06]"
                  >
                    {tNav("faqShort")}
                  </Link>
                  <Link
                    href="/otzyvy"
                    role="menuitem"
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.06]"
                  >
                    {tNav("reviews")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-white transition hover:bg-white/[0.06] md:hidden"
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
          className="border-t border-white/[0.08] bg-[rgba(10,12,24,0.98)] backdrop-blur-xl md:hidden"
        >
          <div className="flex max-h-[min(78vh,calc(100dvh-var(--header-h)))] flex-col gap-1 overflow-y-auto px-6 py-6 text-[17px] text-white">
            <Link
              href="/kejsy"
              className="rounded-lg px-3 py-3 font-medium text-white hover:bg-white/[0.04]"
              onClick={() => setIsOpen(false)}
            >
              {tNav("cases")}
            </Link>
            <Link
              href="/uslugi"
              className="rounded-lg px-3 py-3 font-medium text-white hover:bg-white/[0.04]"
              onClick={() => setIsOpen(false)}
            >
              {tNav("services")}
            </Link>

            <div className="rounded-lg">
              <button
                type="button"
                onClick={() => setWebsiteOpen((v) => !v)}
                className="flex w-full items-center justify-between px-3 py-3 text-left font-medium text-white hover:bg-white/[0.04]"
              >
                {tNav("createWebsite")}
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-white/80 transition", websiteOpen ? "rotate-180" : "")} />
              </button>
              {websiteOpen ? (
                <div className="ml-3 space-y-0.5 py-1 pl-4">
                  {WEBSITE_MENU_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={websiteOfferHref(offerSectionKey(key))}
                      className="block rounded-lg py-2.5 text-[15px] text-white hover:bg-white/[0.04]"
                      onClick={() => setIsOpen(false)}
                    >
                      {tNav(`websiteCreateLinks.${key}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              href={homeHashHref("guides")}
              className="rounded-lg px-3 py-3 font-medium text-white hover:bg-white/[0.04]"
              onClick={() => setIsOpen(false)}
            >
              {tNav("guides")}
            </Link>

            <Link
              href="/kontakty"
              className="rounded-lg px-3 py-3 font-medium text-white hover:bg-white/[0.04]"
              onClick={() => setIsOpen(false)}
            >
              {tNav("contact")}
            </Link>

            <div className="rounded-lg">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex w-full items-center justify-between px-3 py-3 text-left font-medium text-white hover:bg-white/[0.04]"
              >
                {tNav("more")}
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-white/80 transition", moreOpen ? "rotate-180" : "")} />
              </button>
              {moreOpen ? (
                <div className="ml-3 space-y-0.5 py-1 pl-4">
                  <Link
                    href="/o-nas"
                    className="block rounded-lg py-2.5 text-[15px] text-white hover:bg-white/[0.04]"
                    onClick={() => setIsOpen(false)}
                  >
                    {tNav("about")}
                  </Link>
                  <Link
                    href="/faq"
                    className="block rounded-lg py-2.5 text-[15px] text-white hover:bg-white/[0.04]"
                    onClick={() => setIsOpen(false)}
                  >
                    {tNav("faqShort")}
                  </Link>
                  <Link
                    href="/otzyvy"
                    className="block rounded-lg py-2.5 text-[15px] text-white hover:bg-white/[0.04]"
                    onClick={() => setIsOpen(false)}
                  >
                    {tNav("reviews")}
                  </Link>
                </div>
              ) : null}
            </div>

            <div
              className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm font-semibold uppercase tracking-wider text-white/70"
              role="group"
              aria-label={tHeader("switchTo")}
            >
              {routing.locales.map((loc, idx) => (
                <span key={loc} className="inline-flex items-center">
                  {idx > 0 ? <span className="mx-2 text-white/35" aria-hidden>·</span> : null}
                  <Link
                    href={pathname}
                    locale={loc}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-md px-1 py-2 text-white transition hover:opacity-100",
                      locale === loc ? "font-bold opacity-100" : "font-medium opacity-75"
                    )}
                  >
                    {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                  </Link>
                </span>
              ))}
            </div>

            <Link
              href="/kontakty"
              onClick={() => setIsOpen(false)}
              className="mt-2 py-3 text-center text-base font-semibold text-cyan-200 hover:text-cyan-100"
            >
              {tNav("ctaStrategyLong")}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </nav>
  );
}
