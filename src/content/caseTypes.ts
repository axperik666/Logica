export type CaseStudy = {
  slug: string;
  title: string;
  niche: string;
  result: string;
  bullets: string[];
};

export type CaseStudyContent = Omit<CaseStudy, "slug">;
