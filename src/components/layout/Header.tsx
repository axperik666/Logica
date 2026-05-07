"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Menu, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
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

const LANG_DISPLAY: Record<(typeof routing.locales)[number], { flag: string; label: string }> =
  {
    ru: { flag: "🇷🇺", label: "RU" },
    en: { flag: "🇬🇧", label: "EN" },
    it: { flag: "🇮🇹", label: "IT" }
  };

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tUi = useTranslations("header");
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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="site-header glass glass-nav fixed inset-x-0 top-0 z-50"
    >
      <div className="container-px">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 hover-lift">
              <Image
                src="/logo.png"
                alt={tSeo("logoAlt")}
                fill
                sizes="36px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="leading-tight">
              <div className="brand-glow text-sm font-semibold tracking-tight">
                LOGICA Marketing
              </div>
              <div className="text-xs text-white/60">{tUi("tagline")}</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm transition hover:bg-white/5 hover:text-white hover-lift",
                  i.active ? "text-white" : "text-white/70"
                )}
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <nav
              aria-label={tUi("switchTo")}
              className="hidden items-center gap-1 md:flex"
            >
              {routing.locales.map((loc) => {
                const { flag, label } = LANG_DISPLAY[loc];
                const active = locale === loc;
                return (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    className={cn(
                      "rounded-lg px-2 py-1.5 text-xs font-semibold transition hover:bg-white/10",
                      active
                        ? "text-primary"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    <span aria-hidden>{flag}</span>{" "}
                    <span className="uppercase tracking-wide">{label}</span>
                  </Link>
                );
              })}
            </nav>
            <Button
              href="/#contact"
              className="btn-cta-premium hidden md:inline-flex hover-lift"
            >
              {t("cta")}
            </Button>

            <button
              type="button"
              aria-label={open ? tUi("closeMenu") : tUi("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="btn-burger-glass inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/90 transition hover:border-[rgba(0,191,255,0.4)] hover:bg-white/5 lg:hidden"
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
          open
            ? { opacity: 1, pointerEvents: "auto" }
            : { opacity: 0, pointerEvents: "none" }
        }
        className="fixed inset-0 z-[60] lg:hidden"
      >
        <button
          type="button"
          aria-label={tUi("closeMenu")}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/65"
        />
        <MotionDiv
          initial={false}
          animate={open ? { y: 0 } : { y: -10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="container-px relative mt-16 pb-4"
        >
          <div className="glass-mobile-drawer rounded-3xl p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
              <div className="text-xs font-semibold tracking-[0.18em] text-white/55">
                LOGICA MARKETING
              </div>
              <nav
                aria-label={tUi("switchTo")}
                className="flex flex-wrap items-center gap-1"
              >
                {routing.locales.map((loc) => {
                  const { flag, label } = LANG_DISPLAY[loc];
                  const active = locale === loc;
                  return (
                    <Link
                      key={loc}
                      href={pathname}
                      locale={loc}
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-xs font-semibold transition hover:bg-white/10",
                        active
                          ? "text-primary"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      <span aria-hidden>{flag}</span>{" "}
                      <span className="uppercase">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="grid gap-1">
              {items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className={cn(
                    "rounded-2xl px-3 py-3 text-sm transition hover:bg-white/5 hover-lift",
                    i.active ? "text-white" : "text-white/75"
                  )}
                >
                  {i.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                {tf("mobileContactsTitle")}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 px-1">
                <a
                  href={CONTACTS.telegramHttps}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center text-xs font-medium text-white/85 transition hover:bg-white/10"
                >
                  <Send className="h-5 w-5 text-primary" />
                  {tf("telegramLabel")}
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center text-xs font-medium text-white/85 transition hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5 text-primary" />
                  {tf("whatsappLabel")}
                </a>
                <a
                  href={CONTACTS.mailto}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center text-xs font-medium text-white/85 transition hover:bg-white/10"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  {tf("emailLabel")}
                </a>
              </div>
            </div>

            <div className="mt-3 px-1">
              <Button href="/#contact" className="btn-cta-premium w-full hover-lift">
                {t("cta")}
              </Button>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
    </MotionHeader>
  );
}
