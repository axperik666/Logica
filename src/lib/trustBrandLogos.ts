/** PNG в `public/logos/` (см. manifest.json). */
export function trustLogoSrc(filename: string): string {
  return `/logos/${encodeURIComponent(filename)}`;
}

/** Клиентские логотипы (не Meta/Google и т.п.) */
export const TRUST_CLIENT_LOGO_FILES = [
  "Lacoste.png",
  "Ford.png",
  "Ralph.png",
  "Bottega.png",
  "Baldinini.png",
  "Emporio Armani.png"
] as const;
