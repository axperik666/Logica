export type ContactPlatform = "google" | "meta" | "tiktok" | "telegram";

export type ContactServiceKey =
  | "performance"
  | "seo"
  | "smm"
  | "web"
  | "strategy"
  | "analytics";

/** Порядок карточек на главной и пунктов меню «Услуги» */
export const CONTACT_SERVICE_ORDER: ContactServiceKey[] = [
  "performance",
  "seo",
  "smm",
  "web",
  "strategy",
  "analytics"
];

/** Якорь карточки услуги на главной */
export function homeServiceAnchorHref(serviceKey: ContactServiceKey): {
  pathname: "/";
  hash: string;
} {
  return { pathname: "/", hash: `service-${serviceKey}` };
}

/** Главная → блок контактов (next-intl корректно добавляет локаль) */
export function homeContactLink(opts?: {
  platform?: ContactPlatform;
  service?: ContactServiceKey;
}): { pathname: "/"; query?: Record<string, string>; hash: "contact" } {
  const query: Record<string, string> = {};
  if (opts?.platform) query.platform = opts.platform;
  if (opts?.service) query.service = opts.service;
  return {
    pathname: "/",
    ...(Object.keys(query).length ? { query } : {}),
    hash: "contact"
  };
}
