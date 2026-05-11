import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { homeSectionHref } from "@/lib/navHref";

export default async function Footer() {
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");

  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="LOGICA Marketing"
              width={160}
              height={40}
              className="h-10 w-auto mb-6"
            />
            <p className="text-gray-400 max-w-md">{tFooter("about")}</p>
            <p className="text-sm text-gray-500 mt-8">{tFooter("copyright")}</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-semibold text-white mb-6">{tFooter("quickLinks")}</h4>
            <div className="space-y-3 text-gray-400">
              <Link
                href={homeSectionHref("cases")}
                className="block hover:text-white transition-colors"
              >
                {tNav("cases")}
              </Link>
              <Link
                href={homeSectionHref("services")}
                className="block hover:text-white transition-colors"
              >
                {tNav("services")}
              </Link>
              <Link href="/o-nas" className="block hover:text-white transition-colors">
                {tNav("about")}
              </Link>
              <Link
                href={homeSectionHref("contact")}
                className="block hover:text-white transition-colors"
              >
                {tNav("contact")}
              </Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-semibold text-white mb-6">{tFooter("contactsTitle")}</h4>
            <div className="space-y-4 text-gray-400">
              <a
                href="https://t.me/logicamarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                {tFooter("telegramLabel")}
              </a>
              <a
                href="mailto:hello@logicamarketing.pro"
                className="flex items-center gap-3 hover:text-white transition-colors"
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
