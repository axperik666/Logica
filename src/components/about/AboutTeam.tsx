import { getTranslations } from "next-intl/server";

type Role = { role: string; scope: string };

export async function AboutTeam() {
  const t = await getTranslations("aboutPage");
  const raw = t.raw("teamRoles");
  const roles = Array.isArray(raw) ? (raw as Role[]) : [];
  if (roles.length === 0) return null;

  return (
    <div className="mt-10 rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
        {t("teamBlockTitle")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{t("teamBlockSub")}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {roles.map((r) => (
          <li
            key={r.role}
            className="rounded-2xl border border-white/[0.08] bg-[#050810]/60 p-4"
          >
            <div className="text-sm font-semibold text-cyan-200/95">{r.role}</div>
            <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
              {r.scope}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
