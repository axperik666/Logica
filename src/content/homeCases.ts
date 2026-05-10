/** ID кейсов на главной (совпадает с ключами в messages *.json → cases.items). */
export const HOME_CASE_IDS = [
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
] as const;

export type HomeCaseId = (typeof HOME_CASE_IDS)[number];
