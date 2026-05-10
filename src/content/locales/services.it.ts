import type { ServiceContent } from "../serviceTypes";

export const servicePack: Record<string, ServiceContent> = {
  "sozdanie-lendinga": {
    name: "Creazione landing page",
    short:
      "Landing premium orientata alla conversione, analytics e velocità — non design fine a se stesso.",
    outcome: "Più richieste grazie a struttura, messaggio e UX — non «magia grafica».",
    forWhom: ["Servizi", "Esperti", "E‑commerce (singolo prodotto)", "Business locale"],
    includes: [
      "Prototipo (struttura, offerte, trigger di fiducia)",
      "UI design (mobile-first) + responsive",
      "Sviluppo su Next.js 15 + Tailwind",
      "Modulo lead + integrazioni (su richiesta)",
      "Base SEO + Core Web Vitals solidi",
      "Blocchi pronti per A/B e varianti offerta"
    ],
    process: [
      { title: "Diagnosi", text: "Obiettivo, ICP, offerta, contesto competitivo, metriche." },
      { title: "Struttura", text: "Prototipo: percorso utente, sezioni, argomenti, CTA." },
      { title: "Design + copy", text: "UI premium e testi che si leggono e convertono." },
      { title: "Sviluppo", text: "Next.js, motion, velocità, form, analytics." },
      { title: "Go-live", text: "Check, eventi, goal, aggiustamenti sui dati." }
    ],
    faqs: [
      {
        q: "Quanto tempo serve?",
        a: "Di solito 7–14 giorni, in base a materiali e approvazioni."
      },
      {
        q: "Si possono più servizi?",
        a: "Sì — come sito multi-pagina con pagine dedicate."
      }
    ]
  },
  "nastrojka-reklamy-meta": {
    name: "Configurazione ads Meta (FB / Instagram)",
    short:
      "Strategia, struttura account, creatività, ottimizzazione — per un CPL prevedibile.",
    outcome: "CPL più basso e lead di qualità con test e funnel.",
    forWhom: ["Servizi", "Info / esperti", "E‑commerce", "Lead generation"],
    includes: [
      "Audit campagne esistenti (se presenti)",
      "Struttura: obiettivi, eventi, pixel / CAPI dove possibile",
      "Playbook test: creatività, audience, offerte",
      "Ottimizzazione: budget, bid, taglio sprechi",
      "Report settimanali: conclusioni + next step"
    ],
    process: [
      { title: "Preparazione", text: "Goal, eventi, pixel, attribuzione sensata." },
      { title: "Lancio", text: "Test ipotesi: creatività, offerte, audience." },
      { title: "Scale", text: "Rafforziamo ciò che funziona, tagliamo il resto." }
    ],
    faqs: [
      {
        q: "Servono creatività da parte vostra?",
        a: "Preferibilmente — ma possiamo produrle end-to-end."
      },
      {
        q: "Che budget?",
        a: "Dipende dalla nicchia — abbastanza per test statisticamente utili."
      }
    ]
  },
  "nastrojka-reklamy-google": {
    name: "Configurazione Google Ads",
    short:
      "Ricerca, Performance Max, remarketing — con analytics ed economia corretta.",
    outcome: "Lead dalla domanda calda e ROAS / ROMI in miglioramento.",
    forWhom: ["Servizi", "E‑commerce", "B2B"],
    includes: [
      "Semantica e struttura campagne",
      "Negative, annunci, estensioni",
      "Conversioni e import goal GA4",
      "Ottimizzazione sui dati, non sull’istinto"
    ],
    process: [
      { title: "Mappa domanda", text: "Keyword, priorità, landing." },
      { title: "Lancio", text: "Struttura, annunci, conversioni, bidding." },
      { title: "Ottimizzazione", text: "Query, qualità traffico, economia." }
    ],
    faqs: [
      {
        q: "Ricerca o PMax prima?",
        a: "Spesso partiamo dalla ricerca, poi PMax in base ai dati."
      }
    ]
  },
  "nastrojka-reklamy-tiktok": {
    name: "Configurazione TikTok Ads",
    short: "Canale creativo: test, angoli UGC, iterazioni veloci, remarketing.",
    outcome: "Volume lead con creatività forti e playbook di test chiaro.",
    forWhom: ["E‑commerce", "Servizi", "App"],
    includes: [
      "Pixel / eventi e analytics di base",
      "Strategia test creativi",
      "Lancio campagne e ottimizzazione",
      "Remarketing e warm-up"
    ],
    process: [
      { title: "Strategia creativa", text: "Angoli, hook, formati, script." },
      { title: "Test", text: "Iterazioni rapide, taglio perdenti, winner." },
      { title: "Crescita", text: "Scale sistematico e refresh creativi." }
    ],
    faqs: [
      {
        q: "TikTok funziona per tutti?",
        a: "Dove creatività e funnel sono solidi."
      }
    ]
  },
  "sozdanie-kreativov": {
    name: "Produzione creatività",
    short: "Banner, video, script UGC — per ipotesi, non solo «bello».",
    outcome: "CTR più alto, CPM/CPL più bassi, performance più stabile nel tempo.",
    forWhom: ["Meta", "TikTok", "Google (display / YouTube)"],
    includes: [
      "Strategia creativa (angoli + offerte)",
      "Pacchetti per test (5–20+)",
      "Script UGC / video",
      "Rotazione e refresh dei winner"
    ],
    process: [
      { title: "Analisi", text: "Niche, pain, trigger, competitor, reference." },
      { title: "Produzione", text: "Script → design / montaggio → varianti per test." },
      { title: "Ciclo", text: "Dati → conclusioni → prossimo pacchetto." }
    ],
    faqs: [
      {
        q: "Adattate alle piattaforme?",
        a: "Sì — formati e placement."
      }
    ]
  }
};
