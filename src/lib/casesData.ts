import type { HomeCaseId } from "@/content/homeCases";

/** Тег фильтра сетки кейсов (языконезависимый). */
export type CaseFilterTag =
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

export const CASE_FILTER_ORDER: CaseFilterTag[] = [
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

/** Данные кейса: видео и эталонные подписи (карточки на сайте берут тексты из messages → cases.items). */
export interface Case {
  id: number;
  homeCaseId: HomeCaseId;
  filterTag: CaseFilterTag;
  client: string;
  niche: string;
  result: string;
  description: string;
  video: string;
}

export const casesData: Case[] = [
  {
    id: 1,
    homeCaseId: "med-center",
    filterTag: "medicine",
    client: "VitaMed",
    niche: "Медицина",
    result: "+340% лидов",
    description: "Пересобрали оффер, посадочную и рекламные связки.",
    /** до появления `vitamed.mp4` — тот же ролик, что у смежного медкейса */
    video: "/videos/cases/smileline.mp4"
  },
  {
    id: 2,
    homeCaseId: "furniture-store",
    filterTag: "ecommerce",
    client: "NordMebel",
    niche: "E-commerce",
    result: "ROAS 8.4",
    description: "Выстроили связку каталога, фидов и Performance Max.",
    video: "/videos/cases/nordmebel.mp4"
  },
  {
    id: 3,
    homeCaseId: "law-firm",
    filterTag: "legal",
    client: "LexPro",
    niche: "Юриспруденция",
    result: "+180% заявок",
    description: "Усилили доверие через кейсы и гарантии.",
    video: "/videos/cases/lexpro.mp4"
  },
  {
    id: 4,
    homeCaseId: "edu-center",
    filterTag: "edtech",
    client: "SkillNova",
    niche: "EdTech",
    result: "12 400 студентов",
    description: "Продуктовая упаковка + автоворонка.",
    video: "/videos/cases/skillnova.mp4"
  },
  {
    id: 5,
    homeCaseId: "beauty-premium",
    filterTag: "beauty",
    client: "Éclat Studio",
    niche: "Beauty",
    result: "+290% записей",
    description: "Премиум-позиционирование и реклама «до/после».",
    video: "/videos/cases/eclat.mp4"
  },
  {
    id: 6,
    homeCaseId: "construction",
    filterTag: "construction",
    client: "BuildCraft",
    niche: "Строительство",
    result: "47 новых объектов",
    description: "Многостраничный сайт + поисковый ремаркетинг.",
    video: "/videos/cases/buildcraft.mp4"
  },
  {
    id: 7,
    homeCaseId: "electronics",
    filterTag: "ecommerce",
    client: "TechPoint",
    niche: "E-commerce",
    result: "+520% продаж",
    description: "Усилили фид и креативы.",
    video: "/videos/cases/techpoint.mp4"
  },
  {
    id: 8,
    homeCaseId: "dentistry",
    filterTag: "medicine",
    client: "SmileLine",
    niche: "Медицина",
    result: "380 пациентов/мес",
    description: "Воронка «диагностика → план лечения».",
    video: "/videos/cases/smileline.mp4"
  },
  {
    id: 9,
    homeCaseId: "real-estate",
    filterTag: "realestate",
    client: "PrimeEstate",
    niche: "Недвижимость",
    result: "2.8 млн ₽ с лида",
    description: "Lead-qual flow и прогрев.",
    video: "/videos/cases/primeestate.mp4"
  },
  {
    id: 10,
    homeCaseId: "fitness",
    filterTag: "fitness",
    client: "Pulse Gym",
    niche: "Фитнес",
    result: "+410% продаж",
    description: "Упаковали преимущества и первую тренировку.",
    video: "/videos/cases/pulsegym.mp4"
  },
  {
    id: 11,
    homeCaseId: "custom-furniture",
    filterTag: "manufacturing",
    client: "Atelier Mebel",
    niche: "Производство",
    result: "+670% заявок",
    description: "Новая структура услуг и кейсы «до/после».",
    /** до `atelier-mebel.mp4` — мебельный ролик из каталога */
    video: "/videos/cases/nordmebel.mp4"
  },
  {
    id: 12,
    homeCaseId: "autoservice",
    filterTag: "auto",
    client: "AutoHub",
    niche: "Авто",
    result: "940 клиентов",
    description: "Воронка + локальный спрос.",
    video: "/videos/cases/autohub.mp4"
  },
  {
    id: 13,
    homeCaseId: "trading-courses",
    client: "TradeMind",
    niche: "EdTech",
    result: "1 840 студентов",
    description: "Сегментация и креативный конвейер.",
    video: "/videos/cases/trademind.mp4"
  },
  {
    id: 14,
    homeCaseId: "food-delivery",
    filterTag: "horeca",
    client: "UrbanKitchen",
    niche: "HoReCa",
    result: "+380% среднего чека",
    description: "Апселл-механика и выгодные комплекты.",
    video: "/videos/cases/urbankitchen.mp4"
  },
  {
    id: 15,
    homeCaseId: "saas",
    filterTag: "saas",
    client: "CloudDesk",
    niche: "IT / SaaS",
    result: "+12 000 MRR",
    description: "Упаковка SaaS-продукта.",
    video: "/videos/cases/clouddesk.mp4"
  }
];
