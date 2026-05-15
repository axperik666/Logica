/** PNG партнёрских платформ в `public/logos/`. */
export function certLogoSrc(filename: string): string {
  return `/logos/${encodeURIComponent(filename)}`;
}
