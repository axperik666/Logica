import type { HomeCaseId } from "@/content/homeCases";

/** Имя файла в /public/videos/cases/*.mp4 (без расширения). */
export const CASE_VIDEO_BASENAME: Partial<Record<HomeCaseId, string>> = {
  "furniture-store": "nordmebel",
  "law-firm": "lexpro",
  "edu-center": "skillnova",
  "beauty-premium": "eclat",
  construction: "buildcraft",
  electronics: "techpoint",
  dentistry: "smileline",
  "real-estate": "primeestate",
  fitness: "pulsegym",
  autoservice: "autohub",
  "trading-courses": "trademind",
  "food-delivery": "urbankitchen",
  saas: "clouddesk"
};

export function caseVideoSrc(caseId: HomeCaseId): string | null {
  const base = CASE_VIDEO_BASENAME[caseId];
  if (!base) return null;
  return `/videos/cases/${base}.mp4`;
}
