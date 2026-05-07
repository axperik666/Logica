import { routing } from "@/i18n/routing";

/** Path с учётом префикса локали (defaultLocale без префикса — localePrefix as-needed). */
export function localizedPath(locale: string, pathname: string): string {
  const path =
    pathname === "" || pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  if (locale === routing.defaultLocale) {
    return path === "" ? "/" : path;
  }
  return path === "" ? `/${locale}` : `/${locale}${path}`;
}
