export type Service = {
  slug: string;
  name: string;
  short: string;
  outcome: string;
  forWhom: string[];
  includes: string[];
  process: Array<{ title: string; text: string }>;
  faqs: Array<{ q: string; a: string }>;
};

export type ServiceContent = Omit<Service, "slug">;
