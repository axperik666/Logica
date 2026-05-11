import { casesData } from "@/lib/casesData";

/** Локальные mp4 — пути из `src/lib/casesData.ts` → `public/videos/cases/…`. */
export const CASE_COVER_VIDEOS: Record<number, string> = Object.fromEntries(
  casesData.map((c) => [c.id, c.video])
) as Record<number, string>;
