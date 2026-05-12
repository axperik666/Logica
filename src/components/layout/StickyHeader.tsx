"use client";

/**
 * Альтернативная компактная шапка + мобильный FAB.
 * В layout уже есть `Navbar` — не подключайте оба сразу (дублирование навигации).
 * Чтобы использовать: временно закомментируйте `<Navbar />` в `src/app/[locale]/layout.tsx`
 * или подключайте только на отдельных страницах.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { homeHashHref, homeSectionHref } from "@/lib/navHref";
import { cn } from "@/lib/cn";

export default function StickyHeader() {
  const t = useTranslations("stickyHeader");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass = "text-sm font-medium text-white/90 transition hover:text-primary";

  const navItems = [
    { href: homeHashHref("cases"), label: t("navCases") },
    { href: homeHashHref("process"), label: t("navProcess") },
    { href: homeHashHref("services"), label: t("navServices") },
    { href: homeHashHref("results"), label: t("navResults") }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-[60] border-b border-white/10 transition-all duration-300",
          scrolled ? "bg-dark-900/95 shadow-xl backdrop-blur-lg" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6 md:py-5">
          <Link href="/" className="flex items-center gap-3 outline-none ring-offset-2 ring-offset-[#060814] focus-visible:ring-2 focus-visible:ring-primary">
            <Image src="/logo.png" alt={t("logoAlt")} width={48} height={48} className="h-10 w-auto sm:h-12" />
            <span className="text-xl font-bold tracking-tighter text-white sm:text-2xl">{t("brandShort")}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label={t("navAria")}>
            {navItems.map((item) => (
              <Link key={item.href.hash} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/kontakty"
            className="hidden rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-[#0099d9] md:inline-flex"
          >
            {t("ctaDiscuss")}
          </Link>

          <button
            type="button"
            className="rounded-xl p-2 text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="sticky-mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-7 w-7" strokeWidth={2} /> : <Menu className="h-7 w-7" strokeWidth={2} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="sticky-mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[59] bg-black/70 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col gap-1 border-l border-white/10 bg-[#0a0a12] p-6 pt-[calc(var(--header-h)+1rem)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href.hash}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-lg font-medium text-white hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/kontakty"
                className="mt-4 rounded-2xl bg-primary px-4 py-3 text-center font-semibold text-white shadow-lg shadow-primary/30"
                onClick={() => setMobileOpen(false)}
              >
                {t("ctaDiscuss")}
              </Link>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* FAB на мобилке — дублирует по смыслу FloatingMobileCta из layout; отключите один из них при использовании */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[58] md:hidden"
      >
        <Link
          href={homeSectionHref("contact")}
          className="flex items-center gap-2 rounded-3xl bg-primary px-5 py-3.5 text-base font-semibold text-white shadow-2xl shadow-primary/45 transition active:scale-[0.98]"
        >
          {t("ctaFloat")}
          <span aria-hidden>→</span>
        </Link>
      </motion.div>
    </>
  );
}
