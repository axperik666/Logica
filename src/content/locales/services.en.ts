import type { ServiceContent } from "../serviceTypes";

export const servicePack: Record<string, ServiceContent> = {
  "sozdanie-lendinga": {
    name: "Landing page creation",
    short:
      "A premium conversion-focused landing page with analytics and speed — not design for its own sake.",
    outcome: "More inquiries from structure, messaging, and UX — not “design magic”.",
    forWhom: ["Services", "Experts", "E‑commerce (single product)", "Local business"],
    includes: [
      "Prototype (structure, offers, trust triggers)",
      "UI design (mobile-first) + responsive build",
      "Development on Next.js 15 + Tailwind",
      "Lead form + integrations (on request)",
      "SEO basics + strong Core Web Vitals",
      "A/B-ready blocks and offer variants"
    ],
    process: [
      { title: "Discovery", text: "Goal, ICP, offer, competitive context, success metrics." },
      { title: "Structure", text: "Prototype: user path, sections, arguments, CTAs." },
      { title: "Design + copy", text: "Premium UI and copy that reads and converts." },
      { title: "Build", text: "Next.js, motion, speed, forms, analytics." },
      { title: "Launch", text: "QA, events, goals, tweaks from data." }
    ],
    faqs: [
      {
        q: "How long does it take?",
        a: "Typically 7–14 days, depending on assets and approvals."
      },
      {
        q: "Can we cover multiple services?",
        a: "Yes — as a multi-page site with dedicated service pages."
      }
    ]
  },
  "nastrojka-reklamy-meta": {
    name: "Meta ads setup (Facebook / Instagram)",
    short:
      "Strategy, account structure, creatives, and optimization — so lead cost is predictable.",
    outcome: "Lower CPL and better lead quality through tests and funnel work.",
    forWhom: ["Services", "Info / experts", "E‑commerce", "Lead generation"],
    includes: [
      "Audit of existing campaigns (if any)",
      "Structure: objectives, events, pixel / CAPI where possible",
      "Test playbook: creatives, audiences, offers",
      "Optimization: budgets, bids, cutting waste",
      "Weekly reports: conclusions + next step"
    ],
    process: [
      { title: "Prep", text: "Goals, events, pixel, sane attribution." },
      { title: "Launch", text: "Test hypotheses: creatives, offers, audiences." },
      { title: "Scale", text: "Double down on what works; trim the rest." }
    ],
    faqs: [
      {
        q: "Do you need creatives from us?",
        a: "Preferably — but we can produce creatives end-to-end."
      },
      {
        q: "What budgets?",
        a: "Depends on the niche — enough for statistically meaningful tests."
      }
    ]
  },
  "nastrojka-reklamy-google": {
    name: "Google Ads setup",
    short:
      "Search, Performance Max, remarketing — with proper analytics and economics.",
    outcome: "Demand-capture leads and improved ROAS / ROMI.",
    forWhom: ["Services", "E‑commerce", "B2B"],
    includes: [
      "Keyword research and campaign structure",
      "Negatives, ads, extensions",
      "Conversions and GA4 goal import",
      "Optimization from data, not gut feel"
    ],
    process: [
      { title: "Demand map", text: "Keywords, priorities, landing pages." },
      { title: "Launch", text: "Structure, ads, conversions, bidding." },
      { title: "Optimize", text: "Queries, traffic quality, economics." }
    ],
    faqs: [
      {
        q: "Search or PMax first?",
        a: "Often we start with search, then add PMax based on data."
      }
    ]
  },
  "nastrojka-reklamy-tiktok": {
    name: "TikTok Ads setup",
    short: "A creative-first channel: tests, UGC angles, fast iterations, remarketing.",
    outcome: "Lead volume through strong creatives and a clear test playbook.",
    forWhom: ["E‑commerce", "Services", "Apps"],
    includes: [
      "Pixel / events and baseline analytics",
      "Creative testing strategy",
      "Campaign launch and optimization",
      "Remarketing and warm-up"
    ],
    process: [
      { title: "Creative strategy", text: "Angles, hooks, formats, scripts." },
      { title: "Testing", text: "Fast iterations, cut losers, promote winners." },
      { title: "Growth", text: "Systematic scale and creative refresh." }
    ],
    faqs: [
      {
        q: "Does TikTok work for everyone?",
        a: "It works where creatives are strong and the funnel is clear."
      }
    ]
  },
  "sozdanie-kreativov": {
    name: "Creative production",
    short: "Banners, video, UGC scripts — built for hypotheses, not “pretty only”.",
    outcome: "Higher CTR, lower CPM/CPL, and steadier performance over time.",
    forWhom: ["Meta", "TikTok", "Google (display / YouTube)"],
    includes: [
      "Creative strategy (angles + offers)",
      "Creative packs for testing (5–20+)",
      "UGC / video scripts",
      "Rotation and refresh of winners"
    ],
    process: [
      { title: "Analysis", text: "Niche, pains, triggers, competitors, references." },
      { title: "Production", text: "Scripts → design / edit → variants for tests." },
      { title: "Loop", text: "Data in → conclusions → next pack." }
    ],
    faqs: [
      {
        q: "Can you adapt for different platforms?",
        a: "Yes — formats and placements covered."
      }
    ]
  }
};
