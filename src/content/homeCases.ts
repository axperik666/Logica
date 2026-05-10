/** ID кейсов на главной (совпадает с ключами в messages *.json → cases.items). */
export const HOME_CASE_IDS = [
  "med-center",
  "furniture-store",
  "law-firm",
  "edu-center",
  "beauty-premium",
  "construction",
  "electronics",
  "dentistry",
  "real-estate",
  "fitness",
  "custom-furniture",
  "autoservice",
  "trading-courses",
  "food-delivery",
  "saas"
] as const;

export type HomeCaseId = (typeof HOME_CASE_IDS)[number];

/**
 * Кейсы в блоке «Кейсы» на главной: только с файлом mp4 в `public/videos/cases`
 * (имя файла совпадает с путём в `casesData`, без чужих роликов).
 */
export const HOME_CASE_IDS_WITH_VIDEO = [
  "furniture-store",
  "law-firm",
  "edu-center",
  "beauty-premium",
  "construction",
  "electronics",
  "dentistry",
  "real-estate",
  "fitness",
  "autoservice",
  "trading-courses",
  "food-delivery",
  "saas"
] as const satisfies readonly HomeCaseId[];
