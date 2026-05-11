export interface Case {
  id: number;
  client: string;
  niche: string;
  result: string;
  description: string;
  video: string;
}

export const casesData: Case[] = [
  {
    id: 1,
    client: "VitaMed",
    niche: "Медицина",
    result: "+340% лидов",
    description:
      "Пересобрали оффер, посадочную и рекламные связки. Убрали «мусорные» заявки, усилили ретаргет.",
    video: "/videos/cases/vitamed.mp4"
  },
  {
    id: 2,
    client: "NordMebel",
    niche: "E-commerce",
    result: "ROAS 8.4",
    description: "Выстроили связку каталога, фидов и Performance Max/Meta.",
    video: "/videos/cases/nordmebel.mp4"
  },
  {
    id: 3,
    client: "LexPro",
    niche: "Юриспруденция",
    result: "+180% заявок",
    description: "Сместили фокус на «горячий» спрос и усилили доверие.",
    video: "/videos/cases/lexpro.mp4"
  },
  {
    id: 4,
    client: "SkillNova",
    niche: "EdTech",
    result: "12 400 студентов",
    description: "Продуктовая упаковка + автоворонка.",
    video: "/videos/cases/skillnova.mp4"
  },
  {
    id: 5,
    client: "Éclat Studio",
    niche: "Beauty",
    result: "+290% записей",
    description: "Премиум-позиционирование и реклама «до/после».",
    video: "/videos/cases/eclat.mp4"
  },
  {
    id: 6,
    client: "BuildCraft",
    niche: "Строительство",
    result: "47 новых объектов",
    description: "Многостраничный сайт + поисковый ремаркетинг.",
    video: "/videos/cases/buildcraft.mp4"
  },
  {
    id: 7,
    client: "TechPoint",
    niche: "E-commerce",
    result: "+520% продаж",
    description: "Усилили фид и креативы.",
    video: "/videos/cases/techpoint.mp4"
  },
  {
    id: 8,
    client: "SmileLine",
    niche: "Медицина",
    result: "380 пациентов/мес",
    description: "Воронка «диагностика → план лечения».",
    video: "/videos/cases/smileline.mp4"
  },
  {
    id: 9,
    client: "PrimeEstate",
    niche: "Недвижимость",
    result: "2.8 млн ₽ с лида",
    description: "Lead-qual flow и прогрев.",
    video: "/videos/cases/primeestate.mp4"
  },
  {
    id: 10,
    client: "Pulse Gym",
    niche: "Фитнес",
    result: "+410% продаж",
    description: "Упаковали преимущества и первую тренировку.",
    video: "/videos/cases/pulsegym.mp4"
  },
  {
    id: 11,
    client: "Atelier Mebel",
    niche: "Производство",
    result: "+670% заявок",
    description: "Новая структура услуг и кейсы «до/после».",
    video: "/videos/cases/atelier-mebel.mp4"
  },
  {
    id: 12,
    client: "AutoHub",
    niche: "Авто",
    result: "940 клиентов",
    description: "Воронка + локальный спрос.",
    video: "/videos/cases/autohub.mp4"
  },
  {
    id: 13,
    client: "TradeMind",
    niche: "EdTech",
    result: "1 840 студентов",
    description: "Сегментация и креативный конвейер.",
    video: "/videos/cases/trademind.mp4"
  },
  {
    id: 14,
    client: "UrbanKitchen",
    niche: "HoReCa",
    result: "+380% среднего чека",
    description: "Апселл-механика и выгодные комплекты.",
    video: "/videos/cases/urbankitchen.mp4"
  },
  {
    id: 15,
    client: "CloudDesk",
    niche: "IT / SaaS",
    result: "+12 000 MRR",
    description: "Упаковка SaaS-продукта.",
    video: "/videos/cases/clouddesk.mp4"
  }
];
