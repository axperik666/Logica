import type { HomeCaseId } from "./homeCases";

/** Основные обложки (как было раньше, remote). */
export const CASE_COVER_IMAGES: Record<HomeCaseId, string> = {
  "med-center":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=85&auto=format&fit=crop",
  "furniture-store":
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85&auto=format&fit=crop",
  "law-firm":
    "https://images.unsplash.com/photo-1505664194779-8beeaa7bc734?w=900&q=85&auto=format&fit=crop",
  "edu-center":
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900&q=85&auto=format&fit=crop",
  "beauty-premium":
    "https://images.unsplash.com/photo-1560750588-73207b2efdb9?w=900&q=85&auto=format&fit=crop",
  construction:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=85&auto=format&fit=crop",
  electronics:
    "https://images.unsplash.com/photo-1498049860654-af826ff05dcb?w=900&q=85&auto=format&fit=crop",
  dentistry:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=85&auto=format&fit=crop",
  "real-estate":
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=85&auto=format&fit=crop",
  fitness:
    "https://images.unsplash.com/photo-1534438327276-14e468eaf642?w=900&q=85&auto=format&fit=crop",
  "custom-furniture":
    "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=85&auto=format&fit=crop",
  autoservice:
    "https://images.unsplash.com/photo-1487754180451-c656f887160d?w=900&q=85&auto=format&fit=crop",
  "trading-courses":
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=85&auto=format&fit=crop",
  "food-delivery":
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=85&auto=format&fit=crop",
  saas:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85&auto=format&fit=crop"
};

/** Локальные запасные обложки (если remote не загрузился). Без повторов. */
export const CASE_COVER_FALLBACKS: Record<HomeCaseId, string> = {
  "med-center": "/case-covers/stomat.jpg",
  dentistry: "/case-covers/stomat.jpg",
  "law-firm": "/case-covers/magazine.jpg",
  "trading-courses": "/case-covers/invest.jpg",
  "real-estate": "/case-covers/realstate.jpg",
  autoservice: "/case-covers/auto.jpg",
  fitness: "/case-covers/fit.jpg",
  "beauty-premium": "/case-covers/beuty.jpg",
  "edu-center": "/case-covers/children.jpg",
  "food-delivery": "/case-covers/barber.jpg",
  construction: "/case-covers/office.jpg",
  saas: "/case-covers/fit2.jpg",
  electronics: "/case-covers/office.jpg",
  "furniture-store": "/case-covers/office.jpg",
  "custom-furniture": "/case-covers/office.jpg"
};
