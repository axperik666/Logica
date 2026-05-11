import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { homeHashHref } from "@/lib/navHref";

export default async function Footer() {
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");

  const linkClass =
    "block rounded-lg py-1.5 text-gray-400 transition hover:text-white hover:translate-x-0.5";

  return (
    <footer className="relative border-t border-white/[0.08] bg-[linear-gradient(180deg,#05070f_0%,#020308_100%)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="LOGICA Marketing"
              width={160}
              height={40}
              className="mb-6 h-10 w-auto opacity-95"
            />
            <p className="max-w-md text-gray-400 leading-relaxed">{tFooter("about")}</p>
            <p className="mt-8 text-sm text-gray-500">{tFooter("copyright")}</p>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white/90">
              {tFooter("quickLinks")}
            </h4>
            <div className="grid gap-1 sm:grid-cols-2">
              <Link href="/kejsy" className={linkClass}>
                {tNav("cases")}
              </Link>
              <Link href="/uslugi" className={linkClass}>
                {tNav("services")}
              </Link>
              <Link href="/sozdanie-sajta" className={linkClass}>
                {tNav("createWebsite")}
              </Link>
              <Link href="/o-nas" className={linkClass}>
                {tNav("about")}
              </Link>
              <Link href={homeHashHref("blog")} className={linkClass}>
                {tNav("blog")}
              </Link>
              <Link href="/kontakty" className={linkClass}>
                {tNav("contact")}
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white/90">
              {tFooter("contactsTitle")}
            </h4>
            <div className="space-y-4 text-gray-400">
              <a
                href="https://t.me/logicamarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg transition hover:text-cyan-300"
              >
                {tFooter("telegramLabel")}
              </a>
              <a
                href="mailto:hello@logicamarketing.pro"
                className="flex items-center gap-3 rounded-lg transition hover:text-cyan-300"
              >
                hello@logicamarketing.pro
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
