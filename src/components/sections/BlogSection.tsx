import { getTranslations } from "next-intl/server";

export async function BlogSection() {
  const t = await getTranslations("nav");

  return (
    <section
      id="blog"
      className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-white/10 bg-[#0a0a0a] py-16 md:py-20"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {t("blogSectionTitle")}
        </h2>
        <p className="mt-4 text-base text-gray-400 md:text-lg">{t("blogSectionLead")}</p>
      </div>
    </section>
  );
}
