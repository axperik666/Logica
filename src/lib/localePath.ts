/** Path с префиксом локали (`localePrefix: "always"`): `/en`, `/ru/kejsy`, … */
export function localizedPath(locale: string, pathname: string): string {
  const path =
    pathname === "" || pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  const prefix = `/${locale}`;
  if (path === "") return prefix;
  return `${prefix}${path}`;
}
