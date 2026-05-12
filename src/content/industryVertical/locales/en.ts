import type { IndustryVerticalBundle } from "../types";
import { buildIndustryVerticalPage } from "../factory";

const V = "Featured video case";
const T = "Written scenarios — pick a track";

export const industryVerticalEn: IndustryVerticalBundle = {
  medicine: buildIndustryVerticalPage(
    "Healthcare & clinics — performance cases | LOGICA Marketing",
    "Clinic funnels: CPL, appointment quality, creatives and scaling — one featured video case plus six written scenarios with links across our library.",
    "Healthcare & clinics",
    "Geo‑clean campaigns, creative guardrails for policies, and CRM routing so consult requests stop leaking.",
    V,
    T,
    [
      ["Meta scaling with structured creative tests", "−32% CPL", "Prospecting + retarget ladder with weekly creative swaps and clear offer mapping."],
      ["B2B consult economics & speed‑to‑lead", "+41% booked consults", "Messenger‑first routing and lead scoring for high‑intent specialty requests."],
      ["Browse the full video case library", "18+ verticals", "Short funnel breakdowns you can compare against your unit economics."],
      ["Strategy call — fit, KPIs, roadmap", "Same‑day reply", "We align tracking readiness and a realistic test plan for your niche."],
      ["Jump to the homepage cases grid", "Live showcases", "Motion cases with numbers — filter by industry on the main page."],
      ["Budgets, tempo & ROI expectations", "Plain answers", "What early signals mean and how we iterate without guesswork."]
    ]
  ),
  ecommerce: buildIndustryVerticalPage(
    "E‑commerce — growth cases | LOGICA Marketing",
    "Catalog and SKU economics: feed hygiene, catalog ads, creative velocity and margin‑aware scaling — video + six linked scenarios.",
    "E‑commerce",
    "Profit‑first structure: bundles, catalog segmentation and creative testing synchronized with inventory and promos.",
    V,
    T,
    [
      ["Catalog + PDP narrative for Advantage+", "+37% MER", "Structured SKU clusters and offer clarity for intent‑heavy audiences."],
      ["B2B wholesale quotes & lead quality", "−24% bad leads", "Forms, CRM hooks and channel mix tuned for margin — not just ROAS."],
      ["Video cases across categories", "Benchmark ideas", "Browse funnels with comparable KPI patterns."],
      ["Contact — audits & launch sequence", "Fast reply", "We map tracking, catalog priorities and a 2–4 week test lane."],
      ["Homepage cases section", "Interactive grid", "See motion showcases and jump back into vertical reads."],
      ["FAQ — scaling, creative fatigue, promos", "Clear guardrails", "How we pace tests when seasonality hits."]
    ]
  ),
  legal: buildIndustryVerticalPage(
    "Legal services — performance cases | LOGICA Marketing",
    "Compliance‑aware acquisition: keyword intent, trust‑first landings, lead qualification — video case + six deep links.",
    "Legal services",
    "Conservative claims, evidence‑driven creatives and intake routing that protects quality per matter type.",
    V,
    T,
    [
      ["Search intent clusters & landing variants", "−29% CPL", "Practice‑level messaging with compliance‑safe proof points."],
      ["B2B retainers & qualified intake", "+3.1× SQL→won", "Lead scoring + speed‑to‑call patterns tuned for professional services."],
      ["Written deep dives in the case hub", "Method notes", "Long‑form patterns adjacent to our video library."],
      ["Book a strategy session", "Private channel", "We review ethics constraints and realistic CPL economics."],
      ["Homepage cases grid", "Trust showcases", "Motion cases with firm‑level storytelling."],
      ["FAQ — intake, budgets, markets", "Straight talk", "International campaigns and multi‑office setups."]
    ]
  ),
  edtech: buildIndustryVerticalPage(
    "EdTech — acquisition cases | LOGICA Marketing",
    "Trial‑to‑paid economics: funnel clarity, creative proof, cohort messaging — featured video + six navigation scenarios.",
    "EdTech",
    "Offer ladders, demo flows and retention hooks aligned with payback windows — not vanity installs.",
    V,
    T,
    [
      ["Creative testing for proof & outcomes", "+44% start‑trial", "Angle rotation around syllabus, mentors and career outcomes."],
      ["B2B sales‑assist lead routing", "−31% cost/SQL", "CRM alignment for team purchases vs consumer trials."],
      ["Explore case studies hub", "Libraries & funnels", "Pick patterns closest to your pricing model."],
      ["Talk to growth — roadmap", "Same week", "We align tracking, events and a staged creative backlog."],
      ["Homepage motion cases", "Numbers first", "Jump into the cases grid for benchmarks."],
      ["FAQ — payback, creative cadence", "Expectations", "How fast directional signals appear by spend band."]
    ]
  ),
  beauty: buildIndustryVerticalPage(
    "Beauty & premium — growth cases | LOGICA Marketing",
    "Premium positioning: visual standards, retention offers and premium CPL controls — video + six paths.",
    "Beauty & premium",
    "UGC + studio mixes, bundle storytelling and geo‑clean targeting that preserves brand equity.",
    V,
    T,
    [
      ["Creative mixes that preserve premium cues", "+29% ATC", "Studio, UGC and founder‑led angles on a weekly cadence."],
      ["Membership & CRM journeys", "+22% repeat", "Email/SMS handoffs coordinated with paid bursts."],
      ["Browse premium showcases", "Visual benchmarks", "Compare motion cases with similar AOV bands."],
      ["Consult — positioning & tests", "Fast intake", "We align SKU priorities and guardrails for claims."],
      ["Homepage cases", "Scroll grid", "Jump back to video cards anytime."],
      ["FAQ — claims, budgets, seasonality", "Practical", "How we pace creative during launches."]
    ]
  ),
  construction: buildIndustryVerticalPage(
    "Construction — lead generation cases | LOGICA Marketing",
    "Project‑based buying cycles: long forms, geo rings, proof stacks — video case + six scenario links.",
    "Construction",
    "Estimate‑ready leads: distance filters, portfolio proof and speed‑to‑call routines that match crew capacity.",
    V,
    T,
    [
      ["Geo rings matched to crew coverage", "−26% junk leads", "Radius logic + schedule‑aware intake questions."],
      ["B2B tender‑adjacent acquisition", "+35% qualified RFQs", "Separate angles for residential vs commercial decision makers."],
      ["Case library — industrial & build", "Patterns", "Pick comparable site structures from the hub."],
      ["Strategy call — pipeline fit", "Honest scope", "We map realistic CPL by project size."],
      ["Homepage showcases", "Motion proof", "See completed funnel patterns with metrics."],
      ["FAQ — seasonality & lead handling", "Ops‑aware", "How we pace spend when capacity shifts."]
    ]
  ),
  realestate: buildIndustryVerticalPage(
    "Real estate — performance cases | LOGICA Marketing",
    "Inventory‑aware funnels: listing velocity, developer angles, broker economics — video + six routes.",
    "Real estate",
    "Micro‑geo splits, listing‑led creatives and broker speed routines that respect compliance.",
    V,
    T,
    [
      ["Listing‑led creative rotation", "+31% qualified tours", "Hooks tied to inventory clusters and financing angles."],
      ["Investor vs buyer journeys", "−22% duplicate leads", "Separate forms and qualification steps per ICP."],
      ["Written + video library", "Comparable KPIs", "Jump across cases with similar ticket sizes."],
      ["Book a growth consult", "Direct line", "We align geo strategy with broker bandwidth."],
      ["Homepage cases grid", "Fast scan", "Return to motion cards while you read."],
      ["FAQ — compliance & budgets", "Transparent", "Multi‑market setups and realistic timelines."]
    ]
  ),
  fitness: buildIndustryVerticalPage(
    "Fitness — membership growth cases | LOGICA Marketing",
    "Trial economics: local radius, class‑pack offers, retention bridges — video case + six links.",
    "Fitness",
    "Radius‑true targeting, offer ladders that match trial‑to‑membership math and creative that survives fatigue.",
    V,
    T,
    [
      ["Offer ladders for trials & packs", "+28% trial show‑ups", "Structured bundles with studio‑level proof."],
      ["Local discovery + map relevance", "−19% distance mismatches", "Geo hygiene for urban gyms and franchises."],
      ["Explore motion libraries", "Benchmarks", "Compare funnels with similar ARPU."],
      ["Talk to us — rollout plan", "Quick reply", "We align creative cadence with membership goals."],
      ["Homepage cases", "Video grid", "Jump into showcases from the main page."],
      ["FAQ — scaling tests", "Expectations", "How many creatives we rotate per month by spend."]
    ]
  ),
  manufacturing: buildIndustryVerticalPage(
    "Manufacturing — B2B cases | LOGICA Marketing",
    "Long sales cycles: technical proof, RFQ quality, partner enablement — video + six scenario paths.",
    "Manufacturing",
    "Document‑led trust, role‑based messaging and SQL definitions that match plant realities.",
    V,
    T,
    [
      ["Technical proof stacks on landings", "+2.4× MQL→SQL", "CAD‑adjacent storytelling without overclaiming."],
      ["Channel mix for distributors vs OEM", "−33% off‑target clicks", "Separate angles for procurement vs engineering."],
      ["Deep dives + video hub", "Browse", "Pick adjacent machinery categories."],
      ["Strategy session — sales alignment", "Private", "We map events, CRM hooks and lead definitions."],
      ["Homepage motion grid", "Proof first", "See funnels with comparable ticket sizes."],
      ["FAQ — cycles, attribution", "B2B‑realistic", "How we attribute assisted wins across long cycles."]
    ]
  ),
  auto: buildIndustryVerticalPage(
    "Automotive — acquisition cases | LOGICA Marketing",
    "Service bays & dealership flows: inventory‑aware promos, local radius, call speed — video + six links.",
    "Automotive",
    "Radius discipline, offer clarity for services vs sales, and creative rotation around inventory.",
    V,
    T,
    [
      ["Service vs sales split funnels", "+26% repair bookings", "Separate angles with bay‑realistic timing."],
      ["Parts & accessory bundles", "−21% misroutes", "Promo hygiene synchronized with stock signals."],
      ["Video library — mobility verticals", "Ideas fast", "Browse automotive showcases in the hub."],
      ["Contact — workshop audit", "Fast lane", "We align geo, offers and call handling."],
      ["Homepage cases", "Scroll back", "Motion cards with comparable CPL bands."],
      ["FAQ — offers, compliance", "Plain", "What we need from your inventory feeds."]
    ]
  ),
  horeca: buildIndustryVerticalPage(
    "HoReCa & delivery — growth cases | LOGICA Marketing",
    "Margin‑aware promos: delivery radius, menu storytelling, weekend bursts — video case + six routes.",
    "HoReCa & delivery",
    "Geo‑true delivery rings, creative cadence for menus and ops‑aware pacing when kitchens hit capacity.",
    V,
    T,
    [
      ["Delivery radius & promo windows", "+33% weekend GMV", "Creative tied to menu peaks and staffing reality."],
      ["Aggregator vs owned channel balance", "−18% blended CAC", "Owned CRM bridges coordinated with bursts."],
      ["Browse food & delivery showcases", "Patterns", "Compare motion cases with similar AOV."],
      ["Strategy call — menu & ops", "Same week", "We map realistic CPL vs kitchen throughput."],
      ["Homepage grid", "Instant jump", "Return to motion cards between reads."],
      ["FAQ — seasonality", "Ops‑first", "How we throttle spend when capacity is tight."]
    ]
  ),
  saas: buildIndustryVerticalPage(
    "IT / SaaS — pipeline cases | LOGICA Marketing",
    "PLG vs sales‑assist: demo CTAs, trial journeys, pipeline hygiene — video + six navigation scenarios.",
    "IT / SaaS",
    "Event‑rich tracking, offer clarity by segment and creative velocity that matches release cadence.",
    V,
    T,
    [
      ["Demo vs trial journeys by ACV", "+40% qualified demos", "Segment‑specific LP variants with proof hooks."],
      ["B2B pipeline economics", "−27% bad SQLs", "Scoring + SLAs aligned with AE calendars."],
      ["Case hub — product‑led patterns", "Browse", "Pick comparable motion breakdowns."],
      ["Talk — instrumentation roadmap", "Fast reply", "We align events, CRM and experiment backlog."],
      ["Homepage showcases", "Jump anytime", "Motion KPI cards on the main page."],
      ["FAQ — payback, experimentation", "Clear", "How we pace hypothesis tests by spend."]
    ]
  ),
  retail: buildIndustryVerticalPage(
    "Retail & furniture — omnichannel cases | LOGICA Marketing",
    "Showroom + online interplay: catalog ads, financing angles, delivery promises — video + six links.",
    "Retail & furniture",
    "SKU clusters, margin‑aware promos and geo strategy that respects logistics reality.",
    V,
    T,
    [
      ["Catalog segmentation for big‑ticket SKUs", "+31% qualified visits", "Creative tied to availability and delivery zones."],
      ["Store vs web journey bridges", "−24% assist leaks", "QR‑adjacent flows and consistent offers across channels."],
      ["Browse retail showcases", "Benchmarks", "Compare motion cases with similar ticket sizes."],
      ["Consult — promo calendar", "Direct", "We align finance hooks with inventory windows."],
      ["Homepage motion grid", "Fast return", "Jump to cases between sections."],
      ["FAQ — promos, logistics", "Practical", "How we pace bursts without breaking ops."]
    ]
  ),
  finance: buildIndustryVerticalPage(
    "Finance & B2B — acquisition cases | LOGICA Marketing",
    "Trust‑first funnels: regulated claims, SQL definitions, multi‑stakeholder journeys — video + six routes.",
    "Finance & B2B",
    "Conservative messaging, proof stacks and routing tuned for committee decisions.",
    V,
    T,
    [
      ["Intent clusters with conservative claims", "−30% compliance risk", "Review‑ready copy variants by product line."],
      ["ABM‑adjacent routing for complex deals", "+2.1× qualified SQLs", "Segmented forms and sales‑assist flows."],
      ["Written deep dives — B2B patterns", "Browse", "Long‑form notes complementing video cases."],
      ["Private strategy session", "Secure intake", "We align KPIs and disclosure constraints."],
      ["Homepage grid — benchmarks", "Quick jump", "Motion proof while you read."],
      ["FAQ — markets, attribution", "Transparent", "Multi‑entity setups and realistic CPL bands."]
    ]
  ),
  services: buildIndustryVerticalPage(
    "Professional services — growth cases | LOGICA Marketing",
    "Reputation‑sensitive growth: trust stacks, intake speed, premium CPL control — video + six scenario links.",
    "Professional services",
    "Founder‑led proof, discreet campaigns and routing that protects brand tone while scaling demand.",
    V,
    T,
    [
      ["Trust‑first storytelling & proof", "+36% consult requests", "Balanced studio + founder‑led creative mixes."],
      ["Premium intake speed routines", "−22% drop‑offs", "Messenger speed with discreet qualification steps."],
      ["Browse services‑adjacent showcases", "Ideas", "Compare motion cases with similar ticket bands."],
      ["Consult — discreet roadmap", "Private reply", "We align positioning with reputation constraints."],
      ["Homepage cases", "Motion grid", "Return to cards between vertical reads."],
      ["FAQ — tone, budgets, expectations", "Human", "How we iterate without noisy messaging."]
    ]
  )
};
