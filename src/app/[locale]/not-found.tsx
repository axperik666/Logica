import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="tech-bg relative site-container py-16">
      <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
        <div className="text-sm font-semibold text-brand-300">{t("badge")}</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-white/65">{t("description")}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/" className="w-full sm:w-auto">
            {t("home")}
          </Button>
          <Button href="/uslugi" variant="ghost" className="w-full sm:w-auto">
            {t("services")}
          </Button>
        </div>
        <div className="mt-6 text-xs text-white/55">
          {t("contactHint")}{" "}
          <Link
            className="text-white underline underline-offset-4"
            href="/kontakty"
          >
            {t("contactLink")}
          </Link>
          .
        </div>
      </div>
    </section>
  );
}
