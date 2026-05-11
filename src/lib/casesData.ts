export type CaseNicheKey =
  | "medicine"
  | "ecommerce"
  | "legal"
  | "edtech"
  | "beauty"
  | "construction"
  | "realestate"
  | "fitness"
  | "manufacturing"
  | "auto"
  | "horeca"
  | "saas";

export interface Case {
  id: number;
  client: string;
  nicheKey: CaseNicheKey;
  video: string;
}

export const CASE_NICHE_FILTER_ORDER: CaseNicheKey[] = [
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
  "saas"
];

export const casesData: Case[] = [
  { id: 1, client: "VitaMed", nicheKey: "medicine", video: "/videos/cases/vitamed.mp4" },
  { id: 2, client: "NordMebel", nicheKey: "ecommerce", video: "/videos/cases/nordmebel.mp4" },
  { id: 3, client: "LexPro", nicheKey: "legal", video: "/videos/cases/lexpro.mp4" },
  { id: 4, client: "SkillNova", nicheKey: "edtech", video: "/videos/cases/skillnova.mp4" },
  { id: 5, client: "Éclat Studio", nicheKey: "beauty", video: "/videos/cases/eclat.mp4" },
  { id: 6, client: "BuildCraft", nicheKey: "construction", video: "/videos/cases/buildcraft.mp4" },
  { id: 7, client: "TechPoint", nicheKey: "ecommerce", video: "/videos/cases/techpoint.mp4" },
  { id: 8, client: "SmileLine", nicheKey: "medicine", video: "/videos/cases/smileline.mp4" },
  { id: 9, client: "PrimeEstate", nicheKey: "realestate", video: "/videos/cases/primeestate.mp4" },
  { id: 10, client: "Pulse Gym", nicheKey: "fitness", video: "/videos/cases/pulsegym.mp4" },
  { id: 11, client: "Atelier Mebel", nicheKey: "manufacturing", video: "/videos/cases/atelier-mebel.mp4" },
  { id: 12, client: "AutoHub", nicheKey: "auto", video: "/videos/cases/autohub.mp4" },
  { id: 13, client: "TradeMind", nicheKey: "edtech", video: "/videos/cases/trademind.mp4" },
  { id: 14, client: "UrbanKitchen", nicheKey: "horeca", video: "/videos/cases/urbankitchen.mp4" },
  { id: 15, client: "CloudDesk", nicheKey: "saas", video: "/videos/cases/clouddesk.mp4" },
  { id: 16, client: "LeadForge", nicheKey: "saas", video: "/videos/cases/techpoint.mp4" },
  { id: 17, client: "OmniRetail", nicheKey: "ecommerce", video: "/videos/cases/nordmebel.mp4" },
  { id: 18, client: "AstraDent", nicheKey: "medicine", video: "/videos/cases/smileline.mp4" }
];
