/** Совпадает с ключами `homeIndustries.items` и меткой карточки. */
export const INDUSTRY_KEYS = [
  "medicine",
  "ecommerce",
  "legal",
  "edtech",
  "beauty",
  "construction",
  "realestate",
  "fitness",
  "manufacturing",
  "auto",
  "horeca",
  "saas",
  "retail",
  "finance",
  "services"
] as const;

export type IndustryKey = (typeof INDUSTRY_KEYS)[number];

/** Один «фирменный» видео-кейс из `casesData` на вертикаль. */
export const INDUSTRY_FEATURED_VIDEO_CASE_ID: Record<IndustryKey, number> = {
  medicine: 1,
  ecommerce: 2,
  legal: 3,
  edtech: 4,
  beauty: 5,
  construction: 6,
  realestate: 9,
  fitness: 10,
  manufacturing: 11,
  auto: 12,
  horeca: 14,
  saas: 15,
  retail: 17,
  finance: 3,
  services: 5
};
