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

const WEBSITE_MENU_KEYS = ["landing", "multiPage", "corporate"] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
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

  const itemClass = (active: boolean) =>
    cn(
      "inline-flex h-10 items-center whitespace-nowrap text-sm font-medium leading-none transition-colors",
      active ? "text-[#00b4ff]" : "text-white hover:text-[#00b4ff]"
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[var(--header-h)] min-h-[4.375rem] items-center justify-between gap-4 md:gap-6 lg:min-h-[5.75rem]">
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

          {/* Десктоп: одна линия, одинаковая высота строк */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:gap-8 xl:gap-10 md:flex">
            <Link href={homeSectionHref("cases")} className={itemClass(casesActive)}>
              {tNav("cases")}
            </Link>

            <Link href={servicesHref} className={itemClass(servicesActive)}>
              {tNav("services")}
            </Link>

            <div className="group relative flex h-10 items-center">
              <button
                type="button"
                className={cn(itemClass(false), "cursor-pointer gap-1 border-0 bg-transparent p-0")}
                aria-haspopup="menu"
                aria-label={tNav("websiteCreateAria")}
              >
                {tNav("createWebsite")}
                <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-80 transition duration-200 group-hover:rotate-180" />
              </button>
              <div
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="rounded-3xl border border-white/10 bg-zinc-900/98 p-3 shadow-2xl backdrop-blur-xl">
                  {WEBSITE_MENU_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={servicesHref}
                      role="menuitem"
                      className="block rounded-2xl px-4 py-3 text-sm text-white/90 transition hover:bg-white/5 hover:text-[#00b4ff]"
                    >
                      {tNav(`websiteCreateLinks.${key}`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/o-nas" className={itemClass(aboutActive)}>
              {tNav("about")}
            </Link>
            <Link href={homeHashHref("blog")} className={itemClass(blogActive)}>
              {tNav("blog")}
            </Link>
            <Link href={homeSectionHref("contact")} className={itemClass(contactActive)}>
              {tNav("contact")}
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <div
              className="hidden items-center rounded-3xl bg-white/5 p-1 text-sm md:flex"
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
                      "rounded-3xl px-4 py-2 font-medium transition sm:px-5",
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
              className="inline-flex max-w-[10.5rem] items-center justify-center truncate rounded-2xl bg-white px-4 py-2.5 text-xs font-semibold text-black shadow-lg transition hover:bg-[#00b4ff] hover:text-white sm:max-w-none sm:px-8 sm:py-3.5 sm:text-sm"
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
            <Link
              href={homeSectionHref("cases")}
              className="py-0.5 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {tNav("cases")}
            </Link>
            <Link
              href={servicesHref}
              className="py-0.5 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {tNav("services")}
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setWebsiteOpen((v) => !v)}
                className="flex w-full items-center justify-between py-0.5 text-left font-medium"
              >
                {tNav("createWebsite")}
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition", websiteOpen ? "rotate-180" : "")} />
              </button>
              {websiteOpen ? (
                <div className="mt-3 space-y-0.5 border-l border-white/15 pl-4">
                  {WEBSITE_MENU_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={servicesHref}
                      className="block py-2 text-base text-white/75 hover:text-[#00b4ff]"
                      onClick={() => setIsOpen(false)}
                    >
                      {tNav(`websiteCreateLinks.${key}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link href="/o-nas" className="py-0.5 font-medium" onClick={() => setIsOpen(false)}>
              {tNav("about")}
            </Link>
            <Link href={homeHashHref("blog")} className="py-0.5 font-medium" onClick={() => setIsOpen(false)}>
              {tNav("blog")}
            </Link>
            <Link
              href={homeSectionHref("contact")}
              className="py-0.5 font-medium"
              onClick={() => setIsOpen(false)}
            >
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
                      "rounded-3xl px-4 py-2 text-sm font-medium",
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
