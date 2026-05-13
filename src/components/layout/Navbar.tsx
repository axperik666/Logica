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
      "relative inline-flex h-10 items-center justify-center whitespace-nowrap px-2.5 text-sm font-medium leading-none text-white/70 transition-colors duration-200 sm:px-3",
      active ? "text-[#7ee8ff]" : "hover:text-white"
    );

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(22,28,48,0.72)_0%,rgba(18,22,40,0.45)_100%)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(22,28,48,0.5)_0%,rgba(18,22,40,0.28)_100%)]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[var(--header-h)] min-h-[4.375rem] items-center justify-between gap-3 md:gap-5 lg:min-h-[5.75rem]">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-lg outline-none ring-cyan-400/0 transition focus-visible:ring-2 focus-visible:ring-cyan-400/40"
          >
            <span className="relative">
              <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/15 opacity-0 blur-md transition group-hover:opacity-100" />
              <Image
                src="/logo.png"
                alt="LOGICA Marketing"
                width={200}
                height={50}
                className="relative h-10 w-auto sm:h-11 md:h-12 lg:h-[3.25rem]"
                priority
              />
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:gap-4 xl:gap-5 2xl:gap-6 md:flex">
            <Link href="/kejsy" className={itemClass(casesActive)}>
              {tNav("cases")}
              {casesActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
            </Link>

            <Link href="/uslugi" className={itemClass(servicesActive)}>
              {tNav("services")}
              {servicesActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
            </Link>

            <div className="group relative flex items-center py-2 -my-2">
              <button
                type="button"
                className={cn(
                  itemClass(websiteActive),
                  "cursor-pointer gap-1 border-0 bg-transparent px-2.5 sm:px-3",
                  "inline-flex items-center"
                )}
                aria-haspopup="menu"
                aria-label={tNav("websiteCreateAria")}
              >
                <span className="whitespace-nowrap">{tNav("createWebsite")}</span>
                <ChevronDown
                  strokeWidth={2.25}
                  className="size-4 shrink-0 opacity-80 transition-transform duration-200 ease-out group-hover:rotate-180"
                  aria-hidden
                />
              </button>
              {websiteActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
              <div
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="h-4 w-full" aria-hidden />
                <div className="rounded-2xl bg-[rgba(14,18,36,0.94)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                  {WEBSITE_MENU_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={websiteOfferHref(offerSectionKey(key))}
                      role="menuitem"
                      className="block rounded-xl px-4 py-3 text-sm text-white/88 transition hover:bg-cyan-400/10 hover:text-[#8aebff]"
                    >
                      {tNav(`websiteCreateLinks.${key}`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href={homeHashHref("guides")} className={itemClass(guidesActive)}>
              {tNav("guides")}
              {guidesActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
            </Link>

            <Link href="/kontakty" className={itemClass(contactActive)}>
              {tNav("contact")}
              {contactActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
            </Link>

            <div className="group relative flex items-center py-2 -my-2">
              <button
                type="button"
                className={cn(
                  itemClass(moreActive),
                  "cursor-pointer gap-1 border-0 bg-transparent px-2.5 sm:px-3",
                  "inline-flex items-center"
                )}
                aria-haspopup="menu"
                aria-label={tNav("moreMenuAria")}
              >
                <span className="whitespace-nowrap">{tNav("more")}</span>
                <ChevronDown
                  strokeWidth={2.25}
                  className="size-4 shrink-0 opacity-80 transition-transform duration-200 ease-out group-hover:rotate-180"
                  aria-hidden
                />
              </button>
              {moreActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
              <div
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="h-4 w-full" aria-hidden />
                <div className="rounded-2xl bg-[rgba(14,18,36,0.94)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                  <Link
                    href="/o-nas"
                    role="menuitem"
                    className="block rounded-xl px-4 py-3 text-sm text-white/88 transition hover:bg-cyan-400/10 hover:text-[#8aebff]"
                  >
                    {tNav("about")}
                  </Link>
                  <Link
                    href="/faq"
                    role="menuitem"
                    className="block rounded-xl px-4 py-3 text-sm text-white/88 transition hover:bg-cyan-400/10 hover:text-[#8aebff]"
                  >
                    {tNav("faqShort")}
                  </Link>
                  <Link
                    href="/otzyvy"
                    role="menuitem"
                    className="block rounded-xl px-4 py-3 text-sm text-white/88 transition hover:bg-cyan-400/10 hover:text-[#8aebff]"
                  >
                    {tNav("reviews")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div
              className="hidden items-center gap-0.5 text-xs font-semibold uppercase tracking-wider text-white/45 md:flex"
              role="group"
              aria-label={tHeader("switchTo")}
            >
              {routing.locales.map((loc, idx) => {
                const active = locale === loc;
                return (
                  <span key={loc} className="flex items-center">
                    {idx > 0 ? (
                      <span className="mx-1.5 select-none text-white/20" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <Link
                      href={pathname}
                      locale={loc}
                      prefetch={false}
                      className={cn(
                        "min-h-9 px-1 py-2 transition sm:min-h-10",
                        active ? "text-[#7ee8ff]" : "hover:text-white/90"
                      )}
                    >
                      {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                    </Link>
                  </span>
                );
              })}
            </div>

            <Link
              href="/kontakty"
              className="inline-flex max-w-[10rem] shrink-0 items-center justify-center truncate text-sm font-semibold text-[#7ee8ff] transition hover:text-[#a8f0ff] sm:max-w-none"
            >
              {tNav("ctaStrategy")}
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/85 transition hover:bg-white/[0.06] hover:text-white md:hidden"
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
          className="border-t border-white/[0.08] bg-[linear-gradient(180deg,rgba(12,16,30,0.96)_0%,rgba(8,10,22,0.98)_100%)] backdrop-blur-xl md:hidden"
        >
          <div className="flex max-h-[min(78vh,calc(100dvh-var(--header-h)))] flex-col gap-1 overflow-y-auto px-6 py-6 text-[17px] text-white/95">
            <Link
              href="/kejsy"
              className="rounded-xl px-3 py-3 font-medium hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {tNav("cases")}
            </Link>
            <Link
              href="/uslugi"
              className="rounded-xl px-3 py-3 font-medium hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {tNav("services")}
            </Link>

            <div className="rounded-xl">
              <button
                type="button"
                onClick={() => setWebsiteOpen((v) => !v)}
                className="flex w-full items-center justify-between px-3 py-3 text-left font-medium hover:bg-white/5"
              >
                {tNav("createWebsite")}
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition", websiteOpen ? "rotate-180" : "")} />
              </button>
              {websiteOpen ? (
                <div className="ml-3 space-y-0.5 border-l border-cyan-400/25 py-1 pl-4">
                  {WEBSITE_MENU_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={websiteOfferHref(offerSectionKey(key))}
                      className="block rounded-lg py-2.5 text-[15px] text-white/75 hover:text-[#7ee8ff]"
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
              className="rounded-xl px-3 py-3 font-medium hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {tNav("guides")}
            </Link>

            <Link
              href="/kontakty"
              className="rounded-xl px-3 py-3 font-medium hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {tNav("contact")}
            </Link>

            <div className="rounded-xl">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex w-full items-center justify-between px-3 py-3 text-left font-medium hover:bg-white/5"
              >
                {tNav("more")}
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition", moreOpen ? "rotate-180" : "")} />
              </button>
              {moreOpen ? (
                <div className="ml-3 space-y-0.5 border-l border-cyan-400/25 py-1 pl-4">
                  <Link
                    href="/o-nas"
                    className="block rounded-lg py-2.5 text-[15px] text-white/75 hover:text-[#7ee8ff]"
                    onClick={() => setIsOpen(false)}
                  >
                    {tNav("about")}
                  </Link>
                  <Link
                    href="/faq"
                    className="block rounded-lg py-2.5 text-[15px] text-white/75 hover:text-[#7ee8ff]"
                    onClick={() => setIsOpen(false)}
                  >
                    {tNav("faqShort")}
                  </Link>
                  <Link
                    href="/otzyvy"
                    className="block rounded-lg py-2.5 text-[15px] text-white/75 hover:text-[#7ee8ff]"
                    onClick={() => setIsOpen(false)}
                  >
                    {tNav("reviews")}
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
              {routing.locales.map((loc) => {
                const active = locale === loc;
                return (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold",
                      active ? "bg-white text-gray-900" : "border border-white/15 bg-white/5 text-white"
                    )}
                  >
                    {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/kontakty"
              onClick={() => setIsOpen(false)}
              className="mt-3 rounded-2xl bg-gradient-to-r from-[#00b4ff] to-[#0088cc] py-4 text-center text-base font-bold text-white shadow-lg"
            >
              {tNav("ctaStrategyLong")}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </nav>
  );
}
