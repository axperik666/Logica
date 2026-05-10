import type { HomeCaseId } from "./homeCases";
import { casesData } from "@/lib/casesData";

/** Локальные mp4 — пути из `src/lib/casesData.ts` → `public/videos/cases/…`. */
export const CASE_COVER_VIDEOS: Record<HomeCaseId, string> = Object.fromEntries(
  casesData.map((c) => [c.homeCaseId, c.video])
) as Record<HomeCaseId, string>;
