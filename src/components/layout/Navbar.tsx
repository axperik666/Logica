"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { homeHashHref, homeSectionHref } from "@/lib/navHref";

const LOCALE_LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  it: "IT"
};

const NAVBAR_SERVICE_KEYS = [
  "performance",
  "strategyAudit",
  "creativeOffers",
  "turnkeyWebsite",
  "fullFunnel"
] as const;

function navTextClass(active: boolean) {
  return cn(
    "text-sm font-medium transition-colors",
    active ? "text-[#00b4ff]" : "text-white/90 hover:text-[#00b4ff]"
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
    setServicesOpen(false);
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
  const blogActive = useMemo(() => onHome && hash === "#blog", [onHome, hash]);
  const contactActive = useMemo(() => onHome && hash === "#contact", [onHome, hash]);

  const servicesHref = homeSectionHref("services");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[var(--header-h)] min-h-[4.375rem] items-center justify-between gap-3 lg:min-h-[5.75rem]">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/logo.png"
              alt="LOGICA Marketing"
              width={144}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            <Link href={homeSectionHref("cases")} className={navTextClass(casesActive)}>
              {tNav("cases")}
            </Link>

            <div className="group relative">
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 outline-none",
                  navTextClass(servicesActive)
                )}
                aria-haspopup="menu"
                aria-label={tNav("servicesDropdownAria")}
              >
                {tNav("services")}
                <ChevronDown className="h-3.5 w-3.5 opacity-70 transition duration-300 group-hover:rotate-180" />
              </button>
              <div
                className="invisible absolute left-1/2 top-full z-50 min-w-[18rem] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="rounded-3xl border border-white/10 bg-zinc-900/98 p-4 shadow-2xl backdrop-blur-xl">
                  {NAVBAR_SERVICE_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={servicesHref}
                      role="menuitem"
                      className="block rounded-2xl px-4 py-3 text-sm text-white/90 transition hover:bg-white/5 hover:text-[#00b4ff]"
                    >
                      {tNav(`navbarServiceLinks.${key}`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/o-nas" className={navTextClass(aboutActive)}>
              {tNav("about")}
            </Link>
            <Link href={homeHashHref("blog")} className={navTextClass(blogActive)}>
              {tNav("blog")}
            </Link>
            <Link href={homeSectionHref("contact")} className={navTextClass(contactActive)}>
              {tNav("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden items-center rounded-full bg-white/5 p-1 text-sm md:flex"
              role="group"
              aria-label={tHeader("switchTo")}
            >
              {routing.locales.map((loc) => {
                const active = locale === loc;
                return (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    prefetch={false}
                    className={cn(
                      "rounded-full px-4 py-2 font-medium transition sm:px-5",
                      active ? "bg-white text-black" : "text-white/80 hover:bg-white/10"
                    )}
                  >
                    {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                  </Link>
                );
              })}
            </div>

            <Link
              href={homeSectionHref("contact")}
              className="inline-flex max-w-[10.5rem] truncate rounded-2xl bg-white px-4 py-2.5 text-xs font-semibold text-black shadow-lg transition hover:bg-[#00b4ff] hover:text-white sm:max-w-none sm:px-8 sm:py-3.5 sm:text-sm"
            >
              {tNav("ctaStrategy")}
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="flex min-h-11 min-w-11 items-center justify-center text-2xl text-white md:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? tHeader("closeMenu") : tHeader("openMenu")}
            >
              {isOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-black py-8 md:hidden"
        >
          <div className="flex max-h-[min(75vh,calc(100dvh-var(--header-h)))] flex-col gap-6 overflow-y-auto px-8 text-lg text-white/95">
            <Link href={homeSectionHref("cases")} onClick={() => setIsOpen(false)}>
              {tNav("cases")}
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between py-1 text-left font-medium"
              >
                {tNav("services")}
                <ChevronDown
                  className={cn("h-5 w-5 transition", servicesOpen ? "rotate-180" : "")}
                />
              </button>
              {servicesOpen ? (
                <div className="mt-3 space-y-1 border-l border-white/10 pl-4">
                  {NAVBAR_SERVICE_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={servicesHref}
                      className="block py-2 text-base text-white/75 hover:text-[#00b4ff]"
                      onClick={() => setIsOpen(false)}
                    >
                      {tNav(`navbarServiceLinks.${key}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link href="/o-nas" onClick={() => setIsOpen(false)}>
              {tNav("about")}
            </Link>
            <Link href={homeHashHref("blog")} onClick={() => setIsOpen(false)}>
              {tNav("blog")}
            </Link>
            <Link href={homeSectionHref("contact")} onClick={() => setIsOpen(false)}>
              {tNav("contact")}
            </Link>

            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
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
                      "rounded-full px-4 py-2 text-sm font-medium",
                      active ? "bg-white text-black" : "bg-white/10 text-white"
                    )}
                  >
                    {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                  </Link>
                );
              })}
            </div>

            <Link
              href={homeSectionHref("contact")}
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-2xl bg-white py-5 text-center text-lg font-semibold text-black"
            >
              {tNav("ctaStrategyLong")}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </nav>
  );
}
