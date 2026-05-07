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
