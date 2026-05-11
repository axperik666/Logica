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
  const aboutActive = useMemo(() => pathname === "/o-nas", [pathname]);
  const guidesActive = useMemo(() => onHome && hash === "#guides", [onHome, hash]);
  const moreActive = useMemo(
    () => pathname === "/faq" || pathname === "/otzyvy",
    [pathname]
  );
  const contactActive = useMemo(
    () => pathname === "/kontakty" || (onHome && hash === "#contact"),
    [pathname, onHome, hash]
  );

  const itemClass = (active: boolean) =>
    cn(
      "relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full px-3.5 text-sm font-medium leading-none transition-all duration-300",
      active
        ? "text-[#5ddbff] shadow-[0_0_24px_rgba(0,180,255,0.35)]"
        : "text-white/85 hover:bg-white/[0.07] hover:text-[#7ee8ff]"
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[linear-gradient(180deg,rgba(18,22,40,0.62)_0%,rgba(12,16,32,0.52)_100%)] shadow-[0_8px_40px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-[1.75] supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(18,22,40,0.48)_0%,rgba(12,16,32,0.38)_100%)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_-35%,rgba(0,180,255,0.16),transparent_52%),radial-gradient(ellipse_55%_70%_at_100%_-10%,rgba(139,92,246,0.09),transparent_48%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00b4ff]/55 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[var(--header-h)] min-h-[4.375rem] items-center justify-between gap-3 md:gap-5 lg:min-h-[5.75rem]">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-xl outline-none ring-cyan-400/0 transition ring-offset-2 ring-offset-[#060814] focus-visible:ring-2"
          >
            <span className="relative">
              <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/15 opacity-0 blur-md transition group-hover:opacity-100" />
              <Image
                src="/logo.png"
                alt="LOGICA Marketing"
                width={144}
                height={36}
                className="relative h-8 w-auto sm:h-9"
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

            <div className="group relative flex h-10 items-center">
              <button
                type="button"
                className={cn(
                  itemClass(websiteActive),
                  "cursor-pointer gap-1 border-0 bg-transparent pr-2 pl-3.5",
                  !websiteActive && "hover:bg-white/[0.07]"
                )}
                aria-haspopup="menu"
                aria-label={tNav("websiteCreateAria")}
              >
                {tNav("createWebsite")}
                <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-75 transition duration-300 group-hover:rotate-180" />
              </button>
              {websiteActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
              <div
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="rounded-2xl border border-cyan-400/25 bg-[linear-gradient(165deg,rgba(18,22,38,0.98)_0%,rgba(10,12,24,0.97)_100%)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl">
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

            <Link href="/o-nas" className={itemClass(aboutActive)}>
              {tNav("about")}
              {aboutActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
            </Link>

            <Link href={homeHashHref("guides")} className={itemClass(guidesActive)}>
              {tNav("guides")}
              {guidesActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
            </Link>

            <div className="group relative flex h-10 items-center">
              <button
                type="button"
                className={cn(
                  itemClass(moreActive),
                  "cursor-pointer gap-1 border-0 bg-transparent pr-2 pl-3.5",
                  !moreActive && "hover:bg-white/[0.07]"
                )}
                aria-haspopup="menu"
                aria-label={tNav("moreMenuAria")}
              >
                {tNav("more")}
                <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-75 transition duration-300 group-hover:rotate-180" />
              </button>
              {moreActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
              <div
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="rounded-2xl border border-cyan-400/25 bg-[linear-gradient(165deg,rgba(18,22,38,0.98)_0%,rgba(10,12,24,0.97)_100%)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
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

            <Link href="/kontakty" className={itemClass(contactActive)}>
              {tNav("contact")}
              {contactActive ? (
                <span className="absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent" />
              ) : null}
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div
              className="hidden items-stretch rounded-full border border-cyan-400/30 bg-[linear-gradient(160deg,rgba(12,18,40,0.92)_0%,rgba(8,12,28,0.88)_100%)] p-0.5 shadow-[inset_0_1px_0_rgba(0,191,255,0.15)] md:flex"
              role="group"
              aria-label={tHeader("switchTo")}
            >
              {routing.locales.map((loc, idx) => {
                const active = locale === loc;
                return (
                  <div key={loc} className="flex items-stretch">
                    {idx > 0 ? (
                      <span
                        className="my-1.5 w-px shrink-0 bg-gradient-to-b from-transparent via-white/25 to-transparent"
                        aria-hidden
                      />
                    ) : null}
                    <Link
                      href={pathname}
                      locale={loc}
                      prefetch={false}
                      className={cn(
                        "flex min-h-9 items-center rounded-full px-3.5 text-xs font-bold uppercase tracking-wider transition sm:min-h-10 sm:px-4 sm:text-[13px]",
                        active
                          ? "bg-gradient-to-b from-white to-white/90 text-gray-900 shadow-[0_0_28px_rgba(0,191,255,0.35)]"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                    </Link>
                  </div>
                );
              })}
            </div>

            <Link
              href="/kontakty"
              className="inline-flex max-w-[9.5rem] items-center justify-center truncate rounded-full bg-gradient-to-r from-[#00b4ff] to-[#0090d4] px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_0_32px_rgba(0,180,255,0.45)] transition hover:brightness-110 hover:shadow-[0_0_44px_rgba(0,200,255,0.55)] sm:max-w-none sm:px-6 sm:py-2.5 sm:text-xs md:px-7"
            >
              {tNav("ctaStrategy")}
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/10 md:hidden"
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
              href="/o-nas"
              className="rounded-xl px-3 py-3 font-medium hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {tNav("about")}
            </Link>
            <Link
              href={homeHashHref("guides")}
              className="rounded-xl px-3 py-3 font-medium hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {tNav("guides")}
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

            <Link
              href="/kontakty"
              className="rounded-xl px-3 py-3 font-medium hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {tNav("contact")}
            </Link>

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
