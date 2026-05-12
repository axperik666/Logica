import type { IndustryVerticalBundle } from "../types";
import { buildIndustryVerticalPage } from "../factory";

const V = "Video case in evidenza";
const T = "Scenari testuali — clic per aprire";

export const industryVerticalIt: IndustryVerticalBundle = {
  medicine: buildIndustryVerticalPage(
    "Sanità e cliniche — casi performance | LOGICA Marketing",
    "Funnel cliniche: CPL, qualità appuntamenti, creatività e scaling — un video in evidenza e sei scenari testuali con link nel sito.",
    "Sanità e cliniche",
    "Targeting geografico pulito, creatività prudenti e routing CRM per non perdere richieste.",
    V,
    T,
    [
      ["Scaling Meta con test creativi strutturati", "−32% CPL", "Prospecting + retarget con rotazione settimanale e offerta chiara."],
      ["Economia consulenza B2B e velocità di risposta", "+41% consulti prenotati", "Messaggi prioritari e scoring per richieste ad alta intenzione."],
      ["Biblioteca video completa", "18+ vertical", "Breakdown brevi confrontabili con la tua unit economics."],
      ["Call strategica — KPI e roadmap", "Risposta in giornata", "Allineamento tracking e piano di test realistico."],
      ["Griglia casi in homepage", "Benchmark live", "Video con numeri — filtro per settore sulla home."],
      ["FAQ — budget, tempi, ROI", "Chiaro", "Cosa significano i segnali iniziali e come iteriamo."]
    ]
  ),
  ecommerce: buildIndustryVerticalPage(
    "E‑commerce — casi di crescita | LOGICA Marketing",
    "Economia catalogo: feed, catalog ads, velocità creativa e scaling attento al margine — video + sei percorsi.",
    "E‑commerce",
    "Struttura profit-first: bundle, segmentazione catalogo e test creativi allineati a stock e promo.",
    V,
    T,
    [
      ["Catalogo + PDP per Advantage+", "+37% MER", "Cluster SKU e offerta chiara per intent forte."],
      ["Preventivi B2B e qualità lead", "−24% lead spuri", "Form, CRM e mix canali sul margine — non solo ROAS."],
      ["Casi video cross‑category", "Spunti benchmark", "Funnel con KPI confrontabili."],
      ["Contatto — audit e go‑live", "Risposta rapida", "Tracking, priorità catalogo e corsia test 2–4 settimane."],
      ["Sezione casi homepage", "Griglia interattiva", "Showcase motion e ritorno ai testi verticali."],
      ["FAQ — scaling, fatigue creativa", "Linee guida", "Come gestiamo i test con stagionalità."]
    ]
  ),
  legal: buildIndustryVerticalPage(
    "Servizi legali — casi | LOGICA Marketing",
    "Acquisizione compliance-first: intent, landing di fiducia, qualifica — video + sei link profondi.",
    "Servizi legali",
    "Messaggi prudenti, prove nei creative e intake che tutela la qualità per tipologia di incarico.",
    V,
    T,
    [
      ["Cluster di ricerca e varianti landing", "−29% CPL", "Messaggi per practice con proof sicuri."],
      ["Retainer B2B e intake qualificato", "+3.1× SQL→won", "Scoring e velocità di chiamata per professional services."],
      ["Approfondimenti scritti nell’hub casi", "Metodo", "Pattern long‑form accanto alla libreria video."],
      ["Sessione strategica", "Canale privato", "Vincoli etici ed economia CPL realistica."],
      ["Griglia casi homepage", "Showcase fiducia", "Motion con storytelling da studio."],
      ["FAQ — intake, budget, mercati", "Diretto", "Campagne internazionali e multi‑office."]
    ]
  ),
  edtech: buildIndustryVerticalPage(
    "EdTech — acquisizione | LOGICA Marketing",
    "Trial→paid: chiarezza funnel, prove creative, messaggi per cohort — video + sei percorsi.",
    "EdTech",
    "Scalette di offerta, demo e retention allineate al payback — non vanity install.",
    V,
    T,
    [
      ["Test creativi su risultati", "+44% avvio trial", "Angoli su syllabus, mentor e outcome di carriera."],
      ["Routing lead sales‑assist B2B", "−31% costo/SQL", "CRM per acquisti team vs trial consumer."],
      ["Hub casi studio", "Librerie & funnel", "Pattern vicini al tuo pricing."],
      ["Talk crescita — roadmap", "Stessa settimana", "Tracking, eventi e backlog creativi."],
      ["Motion homepage", "Numeri prima", "Griglia casi per benchmark."],
      ["FAQ — payback, cadenza creative", "Aspettative", "Segnali direzionali per fascia di spend."]
    ]
  ),
  beauty: buildIndustryVerticalPage(
    "Beauty & premium — casi | LOGICA Marketing",
    "Posizionamento premium: standard visivi, offer retention e controllo CPL — video + sei link.",
    "Beauty & premium",
    "Mix UGC + studio, storytelling bundle e geo pulito che tutela il brand.",
    V,
    T,
    [
      ["Mix creativi premium", "+29% ATC", "Studio, UGC e founder su cadenza settimanale."],
      ["Abbonamenti & CRM", "+22% repeat", "Email/SMS coordinati ai burst paid."],
      ["Showcase premium", "Benchmark visivi", "Motion con AOV simile."],
      ["Consulenza — test", "Intake rapido", "Priorità SKU e claim sicuri."],
      ["Homepage casi", "Griglia", "Torna ai video quando vuoi."],
      ["FAQ — claim, budget, stagionalità", "Pratico", "Ritmo creative nei lanci."]
    ]
  ),
  construction: buildIndustryVerticalPage(
    "Costruzioni — lead | LOGICA Marketing",
    "Cicli d’acquisto per progetto: form lunghi, geo ring, prove — video + sei scenari.",
    "Costruzioni",
    "Lead pronti a preventivo: filtri distanza, portfolio e velocità di chiamata sul carico squadre.",
    V,
    T,
    [
      ["Geo allineata alle squadre", "−26% lead spuri", "Raggi e intake consapevole dei tempi."],
      ["Acquisizione vicina a gare B2B", "+35% RFQ qualificati", "Angoli residenziale vs commerciale."],
      ["Libreria casi industrial & build", "Pattern", "Strutture sito confrontabili dall’hub."],
      ["Call strategica — pipeline", "Scope onesto", "CPL realistico per dimensione progetto."],
      ["Showcase homepage", "Prove motion", "Funnel completi con metriche."],
      ["FAQ — stagionalità & intake", "Ops-first", "Spend quando cambia capacità."]
    ]
  ),
  realestate: buildIndustryVerticalPage(
    "Immobiliare — performance | LOGICA Marketing",
    "Funnel consapevoli dell’inventory: listing, sviluppo, broker — video + sei route.",
    "Immobiliare",
    "Micro‑geo, creative guidate dagli annunci e velocità broker nel rispetto delle policy.",
    V,
    T,
    [
      ["Rotazione creative su listing", "+31% tour qualificati", "Hook su cluster e finanziamenti."],
      ["Percorsi investitore vs buyer", "−22% duplicati", "Form e step diversi per ICP."],
      ["Libreria scritti + video", "KPI confrontabili", "Ticket size simile."],
      ["Consulenza crescita", "Linea diretta", "Geo e banda broker allineati."],
      ["Griglia homepage", "Scan veloce", "Torna ai video tra una lettura e l’altra."],
      ["FAQ — compliance & budget", "Trasparente", "Multi‑mercato e tempi realistici."]
    ]
  ),
  fitness: buildIndustryVerticalPage(
    "Fitness — abbonamenti | LOGICA Marketing",
    "Economia trial: raggio locale, pacchetti classi, ponti retention — video + sei link.",
    "Fitness",
    "Targeting fedele al raggio, scalette trial→membership e creative anti‑fatigue.",
    V,
    T,
    [
      ["Scalette trial & pacchetti", "+28% presentazioni trial", "Bundle con prova da studio."],
      ["Discovery locale + mappe", "−19% mismatch distanza", "Geo per palestre urbane e franchise."],
      ["Libreria motion", "Benchmark", "ARPU simile."],
      ["Contatto — rollout", "Risposta rapida", "Cadenza creative vs obiettivi membership."],
      ["Homepage casi", "Griglia video", "Showcase dalla main."],
      ["FAQ — scaling test", "Aspettative", "Quante creative al mese per spend."]
    ]
  ),
  manufacturing: buildIndustryVerticalPage(
    "Manifattura — B2B | LOGICA Marketing",
    "Cicli lunghi: proof tecnica, qualità RFQ, enablement — video + sei percorsi.",
    "Manifattura",
    "Trust documentale, messaggi per ruolo e SQL aderenti alla fabbrica.",
    V,
    T,
    [
      ["Stack prove sulle landing", "+2.4× MQL→SQL", "Storytelling CAD senza overclaim."],
      ["Mix canali distributori vs OEM", "−33% click fuori bersaglio", "Angoli acquisti vs engineering."],
      ["Deep dive + hub video", "Browse", "Categorie macchinari vicine."],
      ["Sessione — sales alignment", "Privato", "Eventi, CRM e definizioni lead."],
      ["Griglia motion homepage", "Proof first", "Ticket confrontabile."],
      ["FAQ — cicli, attribuzione", "B2B realista", "Win assistiti nel ciclo lungo."]
    ]
  ),
  auto: buildIndustryVerticalPage(
    "Automotive — acquisizione | LOGICA Marketing",
    "Officina & dealer: promo stock, raggio locale, velocità call — video + sei link.",
    "Automotive",
    "Disciplina raggio, chiarezza service vs vendita e creative ruotate su inventario.",
    V,
    T,
    [
      ["Funnel service vs vendita", "+26% prenotazioni assistenza", "Angoli con tempi da officina."],
      ["Ricambi & accessori", "−21% instradamenti errati", "Promo sincrone allo stock."],
      ["Libreria vertical mobility", "Idee rapide", "Showcase automotive nell’hub."],
      ["Contatto — audit officina", "Fast lane", "Geo, offerte e call handling."],
      ["Homepage casi", "Indietro ai video", "CPL confrontabile."],
      ["FAQ — offerte & compliance", "Chiaro", "Dati inventario necessari."]
    ]
  ),
  horeca: buildIndustryVerticalPage(
    "HoReCa & delivery — casi | LOGICA Marketing",
    "Promo attente al margine: raggio delivery, menu, burst weekend — video + sei route.",
    "HoReCa & delivery",
    "Anelli delivery veri, cadenza menu e pacing quando la cucina è al limite.",
    V,
    T,
    [
      ["Raggio delivery & finestre promo", "+33% GMV weekend", "Creative su picchi menu e turni."],
      ["Aggregatori vs canale proprietario", "−18% CAC misto", "Ponti CRM tra burst."],
      ["Showcase food & delivery", "Pattern", "AOV simile."],
      ["Call strategica — menu & ops", "Stessa settimana", "CPL vs throughput cucina."],
      ["Griglia homepage", "Salto immediato", "Tra i testi torni ai video."],
      ["FAQ — stagionalità", "Ops-first", "Throttling spend quando serve."]
    ]
  ),
  saas: buildIndustryVerticalPage(
    "IT / SaaS — pipeline | LOGICA Marketing",
    "PLG vs sales‑assist: demo, trial, igiene pipeline — video + sei scenari.",
    "IT / SaaS",
    "Tracking ricco di eventi, offerta per segmento e cadenza creative sul release train.",
    V,
    T,
    [
      ["Demo vs trial per ACV", "+40% demo qualificate", "LP segmentate con hook di prova."],
      ["Economia pipeline B2B", "−27% SQL rumorosi", "Scoring + SLA su calendario AE."],
      ["Hub pattern product‑led", "Browse", "Breakdown motion confrontabili."],
      ["Talk — instrumentation", "Risposta rapida", "Eventi, CRM e backlog esperimenti."],
      ["Showcase homepage", "Salto libero", "KPI motion sulla main."],
      ["FAQ — payback, esperimenti", "Chiaro", "Ritmo ipotesi per fascia spend."]
    ]
  ),
  retail: buildIndustryVerticalPage(
    "Retail & furniture — omnichannel | LOGICA Marketing",
    "Showroom + online: catalog ads, finanziamenti, promesse delivery — video + sei link.",
    "Retail & furniture",
    "Cluster SKU, promo sul margine e geo realistica sulla logistica.",
    V,
    T,
    [
      ["Segmentazione SKU big‑ticket", "+31% visite qualificate", "Creative su disponibilità e zone."],
      ["Ponti store ↔ web", "−24% perdite assist", "QR e offerte coerenti cross‑channel."],
      ["Showcase retail", "Benchmark", "Ticket simile."],
      ["Consulenza — calendario promo", "Diretto", "Agganci finance alle finestre stock."],
      ["Griglia motion homepage", "Ritorno veloce", "Tra le sezioni ai casi."],
      ["FAQ — promo & logistica", "Pratico", "Burst senza rompere ops."]
    ]
  ),
  finance: buildIndustryVerticalPage(
    "Finance & B2B — acquisizione | LOGICA Marketing",
    "Funnel fiducia: claim regolamentati, SQL, committee buying — video + sei route.",
    "Finance & B2B",
    "Messaggi prudenti, stack di prove e routing per decisioni di comitato.",
    V,
    T,
    [
      ["Cluster intent con claim prudenti", "−30% rischio compliance", "Varianti copy review‑ready per linea."],
      ["Routing tipo ABM per deal complessi", "+2.1× SQL qualificati", "Form segmentate e sales‑assist."],
      ["Deep dive scritti B2B", "Browse", "Note long‑form accanto ai video."],
      ["Sessione strategica privata", "Intake sicuro", "KPI e vincoli disclosure."],
      ["Griglia homepage — benchmark", "Salto rapido", "Proof motion mentre leggi."],
      ["FAQ — mercati, attribuzione", "Trasparente", "Multi‑entity e bande CPL."]
    ]
  ),
  services: buildIndustryVerticalPage(
    "Servizi professionali — casi | LOGICA Marketing",
    "Crescita reputation‑first: fiducia, velocità intake, CPL premium — video + sei link.",
    "Servizi professionali",
    "Prove founder‑first, campagne discrete e routing che protegge il tono del brand.",
    V,
    T,
    [
      ["Storytelling & proof", "+36% richieste consulenza", "Mix studio + founder bilanciato."],
      ["Velocità intake premium", "−22% abbandoni", "Messenger con qualifica discreta."],
      ["Showcase servizi affini", "Idee", "Ticket simile."],
      ["Consulenza — roadmap discreta", "Risposta privata", "Posizionamento vs reputazione."],
      ["Homepage casi", "Griglia motion", "Tra vertical letture e video."],
      ["FAQ — tono, budget", "Umano", "Iterazioni senza rumore."]
    ]
  )
};
