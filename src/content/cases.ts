export type CaseStudy = {
  slug: string;
  title: string;
  niche: string;
  result: string;
  bullets: string[];
};

export const cases: CaseStudy[] = [
  {
    slug: "b2b-leadgen",
    title: "B2B лидогенерация: структура + поиск",
    niche: "B2B услуги",
    result: "Стабилизировали поток лидов и снизили стоимость заявки",
    bullets: [
      "Перепаковали оффер и страницу услуги",
      "Разметили события и цели",
      "Запустили поиск Google по горячей семантике",
      "Добавили ретаргет на прогрев"
    ]
  },
  {
    slug: "meta-performance",
    title: "Meta: системные креативы + тесты",
    niche: "Сервис/услуги",
    result: "Улучшили качество лидов и масштабировали бюджет",
    bullets: [
      "Собрали матрицу креативных углов",
      "Поставили цикл тестов 2 раза в неделю",
      "Отсекли нерелевантные плейсменты/аудитории"
    ]
  }
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug) ?? null;
}

