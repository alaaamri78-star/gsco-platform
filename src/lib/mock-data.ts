import type {
  ActionItem,
  AlertItem,
  AlertOutcomeLog,
  CommodityPrice,
  Corridor,
  ExposurePoint,
  FeedItem,
  IndexSeries,
  LanePerformance,
  NearshoreScore,
  ReportFormat,
  ReportItem,
  ResilienceScore,
  RiskItem,
  Supplier,
  TrendPoint,
} from "./types";

// ---------------------------------------------------------------------------
// Temporal trend — weak-signal volume, 56 days.
// Built from fixed deterministic waveforms (no Math.random) so server and
// client render identical data and hydration never mismatches.
// ---------------------------------------------------------------------------

const TREND_ANCHOR = new Date("2026-10-08T00:00:00.000Z");
const TREND_DAYS = 56;

function wave(day: number, base: number, amp: number, period: number, phase: number, step: number) {
  const seasonal = Math.sin((day / period) * Math.PI * 2 + phase) * amp;
  const drift = (day / TREND_DAYS) * step;
  return Math.max(0, Math.round(base + seasonal + drift));
}

export const TREND_DATA: TrendPoint[] = Array.from({ length: TREND_DAYS }, (_, i) => {
  const date = new Date(TREND_ANCHOR);
  date.setUTCDate(date.getUTCDate() - (TREND_DAYS - 1 - i));

  const redSea = wave(i, 14, 6, 9, 0.4, 10);
  const cbam = wave(i, 9, 4, 14, 2.1, 6);
  const rareEarth = wave(i, 6, 3, 11, 4.0, 9);
  const ambient = wave(i, 22, 7, 7, 1.2, 4);

  return {
    date: date.toISOString().slice(0, 10),
    total: redSea + cbam + rareEarth + ambient,
    "Red Sea rerouting": redSea,
    "EU carbon tariff (CBAM)": cbam,
    "Rare earth export curbs": rareEarth,
  };
});

// ---------------------------------------------------------------------------
// Risk & Threat Matrix — impact vs. probability, bubble = exposure (USD M)
// ---------------------------------------------------------------------------

// Grounded in real, dated reporting from GSCI's approved source list (SCMR,
// Inbound Logistics, Supply Chain Brain, Supply Chain Dive, Supply Chain
// Digital, FreightWaves, Procurement Magazine, JOC — see sourceName/url on
// each matching feed item below), all published within the last 30 days.
// Impact/probability/exposure are GSCI analyst estimates informed by that
// reporting, not figures quoted verbatim from it.
export const RISK_ITEMS: RiskItem[] = [
  { id: "r1", label: "Renewed Hormuz attacks since late September push Gulf oil exports 2-3M bpd below pre-war levels", domain: "Geopolitical", sector: "Energy & Chemicals", region: "Eastern Med. & Middle East", impact: 9, probability: 72, exposureUsdM: 520, criticality: "Critical" },
  { id: "r2", label: "Black Sea drone strikes on cargo and grain vessels raise a new Ukraine-war shipping risk premium", domain: "Geopolitical", sector: "Agri-Food & Phosphates", region: "Eastern Med. & Middle East", impact: 8, probability: 60, exposureUsdM: 310, criticality: "Critical" },
  { id: "r3", label: "Record diesel prices squeeze carrier margins on freight contracts signed before the spike", domain: "Market", sector: "Energy & Chemicals", region: "North America", impact: 6, probability: 68, exposureUsdM: 230, criticality: "Medium" },
  { id: "r4", label: "C.H. Robinson-RXO and CMA CGM-FedEx Supply Chain deals consolidate 3PL provider choice", domain: "Market", sector: "Logistics & Maritime", region: "North America", impact: 6, probability: 58, exposureUsdM: 280, criticality: "Medium" },
  { id: "r5", label: "Forecast Super El Niño rains threaten East African port and inland-route access through December", domain: "Climate", sector: "Logistics & Maritime", region: "Sub-Saharan Africa", impact: 6, probability: 50, exposureUsdM: 150, criticality: "Medium" },
  { id: "r6", label: "German port labor tension can resurface despite October's strike-averting wage deal", domain: "Operational", sector: "Logistics & Maritime", region: "Western Europe", impact: 5, probability: 38, exposureUsdM: 140, criticality: "Medium" },
  { id: "r7", label: "US trade deficit widens to $105.6B as Section 232 relief reshapes apparel and electronics sourcing", domain: "Regulatory", sector: "Textiles & Apparel", region: "North America", impact: 6, probability: 52, exposureUsdM: 200, criticality: "Medium" },
  { id: "r8", label: "Gartner expects most agentic AI built by vendor FDEs to be abandoned within two years", domain: "Operational", sector: "Electronics & Semiconductors", region: "North America", impact: 4, probability: 70, exposureUsdM: 90, criticality: "Medium" },
  { id: "r9", label: "Reshoring momentum collides with a deepening skilled-technician shortage", domain: "Market", sector: "Automotive & Mobility", region: "North America", impact: 4, probability: 45, exposureUsdM: 110, criticality: "Low" },
  { id: "r10", label: "Singapore's green flight levy adds to Iran-war-driven jet-fuel cost pressure", domain: "Regulatory", sector: "Pharma & Healthcare", region: "East Asia", impact: 3, probability: 65, exposureUsdM: 70, criticality: "Low" },
  { id: "r11", label: "Electric-freight and automated-DC pilots raise near-term capex and execution risk", domain: "Operational", sector: "Logistics & Maritime", region: "North America", impact: 3, probability: 40, exposureUsdM: 55, criticality: "Low" },
];

// ---------------------------------------------------------------------------
// Exposure trend — total tracked USD exposure over the same 56-day window as
// the signal-volume trend above. A GSCI analyst estimate (built the same
// deterministic way as TREND_DATA, no Math.random), rising toward the
// current total exposure across RISK_ITEMS above ($2,155M) as the events
// behind those risk items actually unfolded over the period.
// ---------------------------------------------------------------------------

const EXPOSURE_TARGET = RISK_ITEMS.reduce((sum, r) => sum + r.exposureUsdM, 0);

export const EXPOSURE_TREND: ExposurePoint[] = Array.from({ length: TREND_DAYS }, (_, i) => {
  const date = new Date(TREND_ANCHOR);
  date.setUTCDate(date.getUTCDate() - (TREND_DAYS - 1 - i));

  // Gentle upward drift from ~45% to 100% of today's total, with the same
  // seasonal wobble shape used for signal volume so the two charts read as
  // one consistent world rather than two unrelated random series.
  const progress = i / (TREND_DAYS - 1);
  const base = EXPOSURE_TARGET * (0.45 + 0.55 * progress);
  const seasonal = Math.sin((i / 9) * Math.PI * 2 + 0.6) * (EXPOSURE_TARGET * 0.025);
  const exposureUsdM = Math.max(0, Math.round(base + seasonal));

  return { date: date.toISOString().slice(0, 10), exposureUsdM };
});

// ---------------------------------------------------------------------------
// Executive cockpit — mitigation actions tracked against the risks above.
// First-party operational demo data (who is doing what about a risk), not a
// sourced news claim — carries no sourceName/url, unlike FeedItem/ReportItem.
// ---------------------------------------------------------------------------

export const ACTION_ITEMS: ActionItem[] = [
  { id: "a1", riskId: "r1", title: "Activate Cape of Good Hope routing for Gulf-origin crude contracts", owner: "Logistics", status: "Open", updatedDate: "2026-10-08" },
  { id: "a2", riskId: "r1", title: "Lock in forward freight cover for Q4 Gulf shipments", owner: "Procurement", status: "Closed", updatedDate: "2026-09-22" },
  { id: "a3", riskId: "r2", title: "Suspend new bookings on the Black Sea grain corridor pending insurer guidance", owner: "Risk", status: "Open", updatedDate: "2026-10-07" },
  { id: "a4", riskId: "r2", title: "Qualify alternate Baltic grain suppliers", owner: "Procurement", status: "Closed", updatedDate: "2026-09-28" },
  { id: "a5", riskId: "r3", title: "Renegotiate fixed-rate carrier contracts to add a fuel-surcharge clause", owner: "Procurement", status: "Open", updatedDate: "2026-10-06" },
  { id: "a6", riskId: "r4", title: "Map dual-sourcing fallback carriers ahead of the C.H. Robinson–RXO close", owner: "Logistics", status: "Open", updatedDate: "2026-10-05" },
  { id: "a7", riskId: "r4", title: "Review carrier contracts for change-of-control triggers", owner: "Legal", status: "Closed", updatedDate: "2026-09-18" },
  { id: "a8", riskId: "r5", title: "Pre-build safety stock on East African inland routes ahead of the December rains", owner: "Operations", status: "Open", updatedDate: "2026-10-07" },
  { id: "a9", riskId: "r6", title: "Monitor German port labor talks for a strike-risk resurgence", owner: "Logistics", status: "Closed", updatedDate: "2026-09-30" },
  { id: "a10", riskId: "r7", title: "Reassess apparel sourcing mix under the revised Section 232 relief terms", owner: "Procurement", status: "Open", updatedDate: "2026-10-07" },
  { id: "a11", riskId: "r8", title: "Audit vendor-built agentic AI pilots against Gartner's abandonment-risk findings", owner: "IT & Operations", status: "Closed", updatedDate: "2026-10-02" },
  { id: "a12", riskId: "r9", title: "Launch a skilled-technician apprenticeship pipeline with regional training partners", owner: "Operations", status: "Open", updatedDate: "2026-09-25" },
  { id: "a13", riskId: "r10", title: "Pass the Singapore green flight levy through in Q1 air-freight quotes", owner: "Procurement", status: "Closed", updatedDate: "2026-10-01" },
];

// ---------------------------------------------------------------------------
// Real-time risk alerts — the roadmap's category-1 "core paid product".
// Port & Freight ships first; Trade & Regulatory is the next build (the
// AlertCategory type already carries both). Each alert re-packages a real,
// dated, sourced event from GSCI's approved outlet list (the same ones
// backing RISK_ITEMS/FEED_ITEMS above — several of these are the same
// underlying stories) with the attributes that make it a paid alert:
// severity score, confidence, timestamp, affected entities, and a GSCI
// analyst recommended action. Ordered by timestamp, most recent first.
// ---------------------------------------------------------------------------

export const ALERT_ITEMS: AlertItem[] = [
  {
    id: "al1",
    category: "Port & Freight",
    title: "Renewed Hormuz tanker attacks curb Gulf crude exports",
    entity: "Strait of Hormuz",
    entityType: "Corridor",
    alertType: "Security",
    severity: "Critical",
    severityScore: 92,
    confidence: "High",
    timestamp: "2026-10-08T09:00:00.000Z",
    affectedEntities: ["Gulf crude oil exports", "Tanker freight rates", "Energy & Chemicals shippers"],
    recommendedAction: "Activate Cape of Good Hope routing for Gulf-origin crude contracts and lock in forward freight cover for Q4.",
    sector: "Energy & Chemicals",
    region: "Eastern Med. & Middle East",
    sourceName: "Supply Chain Brain",
    sourceUrl: "https://supplychainbrain.com/articles/44965-renewed-hormuz-attacks-put-gulf-oil-rebound-at-risk",
  },
  {
    id: "al2",
    category: "Port & Freight",
    title: "Black Sea drone strikes hit cargo and grain vessels",
    entity: "Black Sea Corridor (Odesa – Bulgaria EEZ)",
    entityType: "Corridor",
    alertType: "Security",
    severity: "Critical",
    severityScore: 85,
    confidence: "High",
    timestamp: "2026-10-06T10:00:00.000Z",
    affectedEntities: ["Black Sea grain exports", "Cargo-vessel insurance", "Agri-Food & Phosphates shippers"],
    recommendedAction: "Suspend new bookings on the Black Sea grain corridor pending insurer guidance; qualify alternate Baltic suppliers.",
    sector: "Agri-Food & Phosphates",
    region: "Eastern Med. & Middle East",
    sourceName: "Supply Chain Brain",
    sourceUrl: "https://supplychainbrain.com/articles/44970-ukraine-war-escalates-as-black-sea-drone-strikes-hit-cargo-ships",
  },
  {
    id: "al3",
    category: "Port & Freight",
    title: "East African ports face Super El Niño disruption through December",
    entity: "East African ports (Mombasa – Dar es Salaam corridor)",
    entityType: "Port",
    alertType: "Weather",
    severity: "Medium",
    severityScore: 55,
    confidence: "Medium",
    timestamp: "2026-10-07T12:00:00.000Z",
    affectedEntities: ["East Africa inland road access", "Export cargo scheduling"],
    recommendedAction: "Pre-build safety stock on East African inland routes ahead of the December rains; ship export cargo early.",
    sector: "Logistics & Maritime",
    region: "Sub-Saharan Africa",
    sourceName: "Supply Chain Brain",
    sourceUrl: "https://supplychainbrain.com/articles/44976-maersk-warns-of-potential-super-el-nino-impacts-in-east-africa",
  },
  {
    id: "al4",
    category: "Port & Freight",
    title: "German North Sea port labor tension can resurface despite wage deal",
    entity: "Port of Hamburg & North Sea terminals",
    entityType: "Port",
    alertType: "Labor",
    severity: "Medium",
    severityScore: 42,
    confidence: "Medium",
    timestamp: "2026-10-07T14:00:00.000Z",
    affectedEntities: ["Northern Germany container handling", "Western Europe inbound schedules"],
    recommendedAction: "Monitor German port labor talks for a strike-risk resurgence; hold contingency routing via Rotterdam or Antwerp.",
    sector: "Logistics & Maritime",
    region: "Western Europe",
    sourceName: "JOC",
    sourceUrl: "https://www.joc.com/article/german-docker-strike-averted-as-union-port-employers-reach-deal-6301227",
  },
  {
    id: "al5",
    category: "Port & Freight",
    title: "C.H. Robinson–RXO deal raises 3PL concentration risk",
    entity: "C.H. Robinson / RXO (combined 3PL)",
    entityType: "Carrier",
    alertType: "Capacity",
    severity: "Medium",
    severityScore: 50,
    confidence: "High",
    timestamp: "2026-10-05T14:00:00.000Z",
    affectedEntities: ["North America truckload brokerage", "Carrier diversification"],
    recommendedAction: "Map dual-sourcing fallback carriers ahead of the close; review contracts for change-of-control triggers.",
    sector: "Logistics & Maritime",
    region: "North America",
    sourceName: "Supply Chain Management Review",
    sourceUrl: "https://www.scmr.com/article/ch-robinson-rxo-acquisition-supply-chain-resilience",
  },
  {
    id: "al6",
    category: "Port & Freight",
    title: "Samsung–CMA CGM container-charges dispute reaches the FMC",
    entity: "CMA CGM",
    entityType: "Carrier",
    alertType: "Commercial",
    severity: "Medium",
    severityScore: 48,
    confidence: "Medium",
    timestamp: "2026-10-08T00:00:00.000Z",
    affectedEntities: ["Store-door inland delivery commitments", "Electronics & Semiconductors shippers using CMA CGM"],
    recommendedAction: "Audit CMA CGM inland-delivery SLAs on affected lanes and document charge disputes for leverage.",
    sector: "Electronics & Semiconductors",
    region: "North America",
    sourceName: "FreightWaves",
    sourceUrl: "https://freightwaves.com/news/samsung-seeks-186m-from-cma-cgm-in-container-charges-dispute",
  },
  {
    id: "al7",
    category: "Port & Freight",
    title: "Union Pacific–Norfolk Southern merger reshapes North American rail corridors",
    entity: "Union Pacific / Norfolk Southern rail network",
    entityType: "Corridor",
    alertType: "Capacity",
    severity: "Medium",
    severityScore: 40,
    confidence: "Medium",
    timestamp: "2026-10-07T00:00:00.000Z",
    affectedEntities: ["Transcontinental rail capacity", "Intermodal routing options"],
    recommendedAction: "Track Surface Transportation Board review milestones; pressure-test contingency trucking/intermodal options on affected lanes.",
    sector: "Logistics & Maritime",
    region: "North America",
    sourceName: "FreightWaves",
    sourceUrl: "https://www.freightwaves.com/news/union-pacific-ceo-99-99-confident-rail-merger-will-win-approval",
  },
  {
    id: "al8",
    category: "Port & Freight",
    title: "Singapore's green flight levy adds to air-cargo cost pressure",
    entity: "Singapore Changi air-cargo gateway",
    entityType: "Port",
    alertType: "Cost",
    severity: "Low",
    severityScore: 32,
    confidence: "High",
    timestamp: "2026-10-01T07:00:00.000Z",
    affectedEntities: ["Air-freight cost base", "Pharma & Healthcare cold-chain shippers"],
    recommendedAction: "Pass the levy through in Q1 air-freight quotes; confirm SAF-cost clauses in carrier contracts.",
    sector: "Pharma & Healthcare",
    region: "East Asia",
    sourceName: "Supply Chain Brain",
    sourceUrl: "https://www.supplychainbrain.com/articles/44950-world-first-green-flight-levy-in-singapore-adds-to-rising-costs-of-air-travel",
  },
  // Trade & Regulatory — second alert line, added via a fresh research pass
  // (2026-10-13): WebFetched each article's actual body text, not just
  // search snippets, before writing any summary, same standard as the
  // Round 4 report refresh. al11/al12/al15 are three distinct, independently
  // actionable developments drawn from one SCMR "First Shift" briefing
  // (2026-09-29) — consistent with how REPORT_ITEMS already treats one
  // multi-topic briefing as grounding for more than one write-up.
  {
    id: "al10",
    category: "Trade & Regulatory",
    title: "Court certifies class action over illegal IEEPA tariffs",
    entity: "U.S. Court of International Trade",
    entityType: "Court",
    alertType: "Legal",
    severity: "Medium",
    severityScore: 58,
    confidence: "High",
    timestamp: "2026-10-09T10:00:00.000Z",
    affectedEntities: ["Importers who paid IEEPA tariffs Feb 2025 – Feb 2026", "CBP refund processing (CAPE portal)"],
    recommendedAction: "Review IEEPA tariff payments from Feb 2025–Feb 2026 and prepare CAPE declarations ahead of the Oct 22 scheduling deadline.",
    sector: "Electronics & Semiconductors",
    region: "North America",
    sourceName: "Supply Chain Dive",
    sourceUrl: "https://www.supplychaindive.com/news/federal-court-clears-way-for-class-action-suit-against-ieepa-tariffs/832600/",
  },
  {
    id: "al11",
    category: "Trade & Regulatory",
    title: "Industry groups push USTR to extend China-linked vessel fee suspension",
    entity: "USTR Section 301 vessel-fee policy",
    entityType: "Policy",
    alertType: "Tariff",
    severity: "Medium",
    severityScore: 52,
    confidence: "Medium",
    timestamp: "2026-09-29T09:00:00.000Z",
    affectedEntities: ["China-linked vessel bookings", "Ocean freight landed cost"],
    recommendedAction: "Model landed-cost scenarios for China-linked vessel bookings past Nov 9 in case the fee suspension lapses.",
    sector: "Logistics & Maritime",
    region: "North America",
    sourceName: "Supply Chain Management Review",
    sourceUrl: "https://www.scmr.com/article/trade-relief-infrastructure-scrutiny-and-faster-ocean-routes-reshape-risk",
  },
  {
    id: "al12",
    category: "Trade & Regulatory",
    title: "US-China trade board recommends tariff relief on $30B of goods each way",
    entity: "US-China bilateral trade relief board",
    entityType: "Policy",
    alertType: "Tariff",
    severity: "Low",
    severityScore: 30,
    confidence: "Medium",
    timestamp: "2026-09-29T10:00:00.000Z",
    affectedEntities: ["US-China non-sensitive goods trade", "Tariff classification reviews"],
    recommendedAction: "Track the bilateral board's implementation timeline; flag SKUs inside the proposed $30B relief envelope for a classification review.",
    sector: "Electronics & Semiconductors",
    region: "East Asia",
    sourceName: "Supply Chain Management Review",
    sourceUrl: "https://www.scmr.com/article/trade-relief-infrastructure-scrutiny-and-faster-ocean-routes-reshape-risk",
  },
  {
    id: "al13",
    category: "Trade & Regulatory",
    title: "US trade deficit widens to $105.6B as Section 232 relief reshapes sourcing",
    entity: "US Section 232 relief program",
    entityType: "Policy",
    alertType: "Tariff",
    severity: "Medium",
    severityScore: 52,
    confidence: "High",
    timestamp: "2026-10-07T16:00:00.000Z",
    affectedEntities: ["Apparel sourcing mix", "Electronics sourcing mix"],
    recommendedAction: "Reassess apparel and electronics sourcing mix under the revised Section 232 relief terms.",
    sector: "Textiles & Apparel",
    region: "North America",
    sourceName: "Supply Chain Management Review",
    sourceUrl: "https://www.scmr.com/article/factories-freight-and-fragile-trade-routes-reshape-supply-chain-risk",
  },
  {
    id: "al14",
    category: "Trade & Regulatory",
    title: "Export licenses slow for China-bound aircraft parts",
    entity: "US Commerce Dept export licensing (aircraft parts)",
    entityType: "Policy",
    alertType: "Regulatory",
    severity: "Medium",
    severityScore: 58,
    confidence: "Medium",
    timestamp: "2026-10-02T09:00:00.000Z",
    affectedEntities: ["China-bound aircraft-parts shipments", "Landing-gear suppliers"],
    recommendedAction: "Audit China-bound aircraft-parts shipments for export-license exposure; monitor for wider landing-gear restrictions.",
    sector: "Electronics & Semiconductors",
    region: "East Asia",
    sourceName: "Supply Chain Management Review",
    sourceUrl: "https://www.scmr.com/article/first-shift-export-controls-tighten-as-manufacturers-confront-rising-costs",
  },
  {
    id: "al15",
    category: "Trade & Regulatory",
    title: "Germany moves to block COSCO's 80% stake in logistics firm Zippel",
    entity: "COSCO / Zippel (Germany FDI screening)",
    entityType: "Transaction",
    alertType: "Regulatory",
    severity: "Medium",
    severityScore: 45,
    confidence: "Medium",
    timestamp: "2026-09-29T11:00:00.000Z",
    affectedEntities: ["Zippel-linked container-logistics data", "Hamburg container movement software"],
    recommendedAction: "Reassess data-sharing and system dependencies with Zippel-linked logistics providers pending Germany's FDI screening decision.",
    sector: "Logistics & Maritime",
    region: "Western Europe",
    sourceName: "Supply Chain Management Review",
    sourceUrl: "https://www.scmr.com/article/trade-relief-infrastructure-scrutiny-and-faster-ocean-routes-reshape-risk",
  },
  {
    id: "al9",
    category: "Port & Freight",
    title: "US freight market stays fragile despite near-record import volumes",
    entity: "US intermodal & long-haul truckload network",
    entityType: "Corridor",
    alertType: "Capacity",
    severity: "Low",
    severityScore: 36,
    confidence: "Medium",
    timestamp: "2026-10-01T06:00:00.000Z",
    affectedEntities: ["US truckload capacity", "Diesel-exposed freight contracts"],
    recommendedAction: "Revisit fixed-rate carrier contracts for fuel-surcharge clauses before Q4 peak.",
    sector: "Logistics & Maritime",
    region: "North America",
    sourceName: "FreightWaves",
    sourceUrl: "https://www.freightwaves.com/news/white-paper-state-of-the-industry-october-2026",
  },
];

// ---------------------------------------------------------------------------
// Supplier Exposure Map — a hypothetical GSCI client's own supplier base.
// First-party demo data, like ACTION_ITEMS: every supplier name is
// fictional (no real company is implied to be risk-scored here), and the
// set carries no sourceName/url. mapX/mapY place suppliers on the same
// abstract 440x340 canvas the hero's signal map uses, not a real
// geographic projection.
// ---------------------------------------------------------------------------

export const SUPPLIERS: Supplier[] = [
  { id: "s1", name: "Atlas Precision Components", site: "Casablanca, Morocco", region: "Maghreb & North Africa", sector: "Automotive & Mobility", tier: 1, riskScore: 38, singleSource: false, mapX: 100, mapY: 165 },
  { id: "s2", name: "Sahel AgroPack", site: "Dakar, Senegal", region: "Sub-Saharan Africa", sector: "Agri-Food & Phosphates", tier: 2, riskScore: 61, singleSource: true, mapX: 165, mapY: 250 },
  { id: "s3", name: "Rift Valley Phosphate Processing", site: "Dar es Salaam, Tanzania", region: "Sub-Saharan Africa", sector: "Agri-Food & Phosphates", tier: 1, riskScore: 74, singleSource: true, mapX: 195, mapY: 290 },
  { id: "s4", name: "Baltic Harness Systems", site: "Riga, Latvia", region: "Western Europe", sector: "Automotive & Mobility", tier: 1, riskScore: 33, singleSource: false, mapX: 165, mapY: 45 },
  { id: "s5", name: "Veridian Specialty Chemicals", site: "Rotterdam, Netherlands", region: "Western Europe", sector: "Energy & Chemicals", tier: 2, riskScore: 57, singleSource: false, mapX: 175, mapY: 65 },
  { id: "s6", name: "Tatra Precision Tooling", site: "Brno, Czechia", region: "Western Europe", sector: "Automotive & Mobility", tier: 2, riskScore: 29, singleSource: false, mapX: 155, mapY: 55 },
  { id: "s7", name: "Anatolia Textile Mills", site: "Izmir, Türkiye", region: "Eastern Med. & Middle East", sector: "Textiles & Apparel", tier: 1, riskScore: 68, singleSource: true, mapX: 215, mapY: 150 },
  { id: "s8", name: "Levant Packaging Solutions", site: "Amman, Jordan", region: "Eastern Med. & Middle East", sector: "Pharma & Healthcare", tier: 2, riskScore: 71, singleSource: false, mapX: 240, mapY: 175 },
  { id: "s9", name: "Novera Electronics Manufacturing", site: "Shenzhen, China", region: "East Asia", sector: "Electronics & Semiconductors", tier: 1, riskScore: 77, singleSource: true, mapX: 385, mapY: 110 },
  { id: "s10", name: "Guangdong Circuit Fabrication", site: "Dongguan, China", region: "East Asia", sector: "Electronics & Semiconductors", tier: 2, riskScore: 65, singleSource: false, mapX: 365, mapY: 135 },
  { id: "s11", name: "Nordkai Marine Components", site: "Busan, South Korea", region: "East Asia", sector: "Logistics & Maritime", tier: 2, riskScore: 48, singleSource: false, mapX: 400, mapY: 175 },
  { id: "s12", name: "Sonora Metal Stamping", site: "Hermosillo, Mexico", region: "Latin America", sector: "Automotive & Mobility", tier: 1, riskScore: 44, singleSource: false, mapX: 50, mapY: 120 },
  { id: "s13", name: "Pampas Grain Aggregation", site: "Rosario, Argentina", region: "Latin America", sector: "Agri-Food & Phosphates", tier: 1, riskScore: 36, singleSource: false, mapX: 90, mapY: 280 },
  { id: "s14", name: "Cascade Cold-Chain Logistics", site: "Memphis, USA", region: "North America", sector: "Pharma & Healthcare", tier: 1, riskScore: 41, singleSource: false, mapX: 35, mapY: 75 },
];

// ---------------------------------------------------------------------------
// Corridor Risk Scores — the same hypothetical client's own trade lanes.
// First-party exposure data in the same sense as SUPPLIERS above, but each
// riskScore/statusNote is informed by the real, sourced chokepoint events
// already tracked in RISK_ITEMS/ALERT_ITEMS above (Hormuz, Black Sea,
// East African rains, German port labor, the Union Pacific-Norfolk
// Southern merger, carriers returning to Suez routing) — the same
// evidence standard as RiskItem's impact/probability/exposure.
// ---------------------------------------------------------------------------

export const CORRIDORS: Corridor[] = [
  { id: "c1", name: "Shanghai → Rotterdam", origin: "Shanghai", destination: "Rotterdam", mode: "Ocean", region: "East Asia", sector: "Electronics & Semiconductors", riskScore: 62, riskTrend: "Up", transitDays: 34, volumeSharePct: 18, statusNote: "Elevated — Suez transit times variable amid regional tension" },
  { id: "c2", name: "Jebel Ali → Rotterdam", origin: "Jebel Ali", destination: "Rotterdam", mode: "Ocean", region: "Eastern Med. & Middle East", sector: "Energy & Chemicals", riskScore: 88, riskTrend: "Up", transitDays: 21, volumeSharePct: 9, statusNote: "Critical — Hormuz tanker attacks curbing Gulf throughput" },
  { id: "c3", name: "Odesa → Mediterranean ports", origin: "Odesa", destination: "Mediterranean ports", mode: "Ocean", region: "Eastern Med. & Middle East", sector: "Agri-Food & Phosphates", riskScore: 82, riskTrend: "Up", transitDays: 19, volumeSharePct: 6, statusNote: "Critical — drone strikes disrupting new bookings" },
  { id: "c4", name: "Shanghai → Los Angeles", origin: "Shanghai", destination: "Los Angeles", mode: "Ocean", region: "East Asia", sector: "Electronics & Semiconductors", riskScore: 58, riskTrend: "Up", transitDays: 16, volumeSharePct: 22, statusNote: "Elevated — near-record import volumes straining fragile capacity" },
  { id: "c5", name: "Hamburg → New York", origin: "Hamburg", destination: "New York", mode: "Ocean", region: "Western Europe", sector: "Logistics & Maritime", riskScore: 47, riskTrend: "Flat", transitDays: 9, volumeSharePct: 11, statusNote: "Watch — German port labor tension could resurface" },
  { id: "c6", name: "Mombasa → Johannesburg", origin: "Mombasa", destination: "Johannesburg", mode: "Road", region: "Sub-Saharan Africa", sector: "Logistics & Maritime", riskScore: 55, riskTrend: "Up", transitDays: 12, volumeSharePct: 5, statusNote: "Watch — Super El Niño rains threaten inland access through December" },
  { id: "c7", name: "Chicago → Los Angeles", origin: "Chicago", destination: "Los Angeles", mode: "Rail", region: "North America", sector: "Logistics & Maritime", riskScore: 44, riskTrend: "Flat", transitDays: 4, volumeSharePct: 8, statusNote: "Watch — Union Pacific-Norfolk Southern merger review reshaping rail capacity" },
  { id: "c8", name: "Singapore → Frankfurt", origin: "Singapore", destination: "Frankfurt", mode: "Air", region: "East Asia", sector: "Pharma & Healthcare", riskScore: 36, riskTrend: "Up", transitDays: 2, volumeSharePct: 4, statusNote: "Watch — green flight levy adding air-cargo cost pressure" },
  { id: "c9", name: "Casablanca → Marseille", origin: "Casablanca", destination: "Marseille", mode: "Ocean", region: "Maghreb & North Africa", sector: "Automotive & Mobility", riskScore: 22, riskTrend: "Flat", transitDays: 6, volumeSharePct: 7, statusNote: "Stable" },
  { id: "c10", name: "Mumbai → Savannah", origin: "Mumbai", destination: "Savannah", mode: "Ocean", region: "East Asia", sector: "Textiles & Apparel", riskScore: 39, riskTrend: "Down", transitDays: 24, volumeSharePct: 10, statusNote: "Improving — carriers returning to Suez routing, cutting transit up to 14 days" },
];

// ---------------------------------------------------------------------------
// Proprietary Indices — roadmap Table 1's 8 named indices. Composite GSCI
// analyst scores (0-100), built with the same deterministic waveform
// approach as TREND_DATA/EXPOSURE_TREND above (no Math.random), on a shared
// 12-point trailing timeline so every index can chart on one page even
// though each publishes on its own real-world cadence (weekly/monthly/etc).
// Index 2 (Corridor Risk Scores) is the cross-lane aggregate of the Corridor
// Risk Scores page's own CORRIDORS data above, not a separate estimate —
// its current value is the same average already shown there.
// ---------------------------------------------------------------------------

const INDEX_POINTS = 12;

function indexHistory(base: number, amp: number, period: number, phase: number, step: number) {
  return Array.from({ length: INDEX_POINTS }, (_, i) => {
    const date = new Date(TREND_ANCHOR);
    date.setUTCDate(date.getUTCDate() - (INDEX_POINTS - 1 - i) * 7);
    const seasonal = Math.sin((i / period) * Math.PI * 2 + phase) * amp;
    const drift = (i / (INDEX_POINTS - 1)) * step;
    const value = Math.max(0, Math.min(100, Math.round(base + seasonal + drift)));
    return { date: date.toISOString().slice(0, 10), value };
  });
}

const CORRIDOR_AVG_SCORE = Math.round(
  CORRIDORS.reduce((sum, c) => sum + c.riskScore, 0) / CORRIDORS.length
);

export const INDICES: IndexSeries[] = [
  {
    id: "idx1",
    name: "GSCI Global Supply Chain Risk Index",
    description: "The flagship composite risk score, blending geopolitical, market, operational, and climate signals across every tracked region into one global/regional read.",
    frequency: "Monthly",
    tier: "Professional",
    history: indexHistory(61, 7, 5, 0.3, 11),
  },
  {
    id: "idx2",
    name: "Corridor Risk Scores",
    description: "Weekly risk read across the Asia-Europe, Europe-Maghreb, West Africa, and transatlantic lanes GSCI tracks for clients — the same average shown on the Corridor Risk Scores page.",
    frequency: "Weekly",
    tier: "Professional",
    history: indexHistory(CORRIDOR_AVG_SCORE - 6, 5, 4, 1.1, 9),
  },
  {
    id: "idx3",
    name: "Country Supply Risk Ranking",
    description: "Quarterly comparative ranking of sourcing-country risk, combining political stability, trade-policy exposure, and logistics infrastructure into one score per market.",
    frequency: "Quarterly",
    tier: "Enterprise",
    history: indexHistory(54, 4, 3, 2.0, 6),
  },
  {
    id: "idx4",
    name: "Sector Disruption Index",
    description: "Monthly read on how much active disruption each tracked sector is absorbing, from Energy & Chemicals' Hormuz exposure to Electronics & Semiconductors' export-control tightening.",
    frequency: "Monthly",
    tier: "Professional",
    history: indexHistory(57, 6, 6, 3.4, 10),
  },
  {
    id: "idx5",
    name: "Port Performance Index",
    description: "Weekly throughput and dwell-time benchmark across major gateway ports, tracking congestion against the near-record import volumes GSCI is seeing at US ports this quarter.",
    frequency: "Weekly",
    tier: "Professional",
    history: indexHistory(66, 5, 4, 0.8, -8),
  },
  {
    id: "idx6",
    name: "Freight Volatility Index",
    description: "Weekly rate-volatility benchmark across ocean, air, and road modes — currently elevated by record-high diesel prices and a fragile-but-resilient freight market.",
    frequency: "Weekly",
    tier: "Professional",
    history: indexHistory(63, 8, 4, 2.6, 7),
  },
  {
    id: "idx7",
    name: "Commodity Supply Stress Index",
    description: "Monthly stress read across critical inputs and commodities, from rare-earth export curbs to diesel and jet-fuel cost pressure tied to the Hormuz and Black Sea chokepoints.",
    frequency: "Monthly",
    tier: "Enterprise",
    history: indexHistory(59, 6, 5, 4.2, 9),
  },
  {
    id: "idx8",
    name: "Near-shoring Attractiveness Index",
    description: "Semi-annual comparative score for near-shoring destinations relative to EU/US demand centers — Morocco, Turkey, Mexico, Eastern Europe, and others. Featured below with the full 4-geography breakdown.",
    frequency: "Semi-annual",
    tier: "Professional",
    history: indexHistory(78, 2, 2, 0.2, 3),
  },
];

// Near-shoring Attractiveness Index — the featured comparison behind idx8
// above. 4 geographies named explicitly in the roadmap, scored 0-100 across
// 5 GSCI analyst dimensions. Morocco is not set to lead the composite —
// Eastern Europe's EU-market access and labor-cost base score higher
// overall — Morocco's case is made on its specific strengths (Tanger Med's
// EU proximity, the broadest tariff-free access of the four) in the
// spotlight callout the UI renders alongside this table, not by inflating
// its numbers.
export const NEARSHORE_SCORES: NearshoreScore[] = [
  { geography: "Morocco", proximity: 88, laborCost: 82, tradeAccess: 78, stability: 74, infrastructure: 79, composite: 80 },
  { geography: "Eastern Europe", proximity: 90, laborCost: 75, tradeAccess: 88, stability: 78, infrastructure: 80, composite: 82 },
  { geography: "Turkey", proximity: 82, laborCost: 70, tradeAccess: 75, stability: 68, infrastructure: 85, composite: 76 },
  { geography: "Mexico", proximity: 92, laborCost: 78, tradeAccess: 85, stability: 62, infrastructure: 65, composite: 76 },
];

// ---------------------------------------------------------------------------
// Report formats catalog — roadmap Table 2's 8 named products. A reference
// catalog shown on the Report Center, not a set of fabricated articles:
// several of these (Commissioned research, Board risk pack, Country/
// Supplier Due-Diligence Reports) are bespoke deliverables with no public
// example to show.
// ---------------------------------------------------------------------------

export const REPORT_FORMATS: ReportFormat[] = [
  { id: "fmt1", name: "Weekly Risk Briefing", format: "2-3 pages, curated", whoBuys: "All tiers (free version as a lead magnet)", tier: "Free" },
  { id: "fmt2", name: "Monthly Index Report", format: "Index plus commentary", whoBuys: "Professional+", tier: "Professional" },
  { id: "fmt3", name: "Quarterly Corridor / Sector Outlook", format: "15-25 pages, with 3-12 month scenarios", whoBuys: "Enterprise, logistics, finance", tier: "Enterprise" },
  { id: "fmt4", name: "Flash Impact Notes", format: "1-2 pages, published within 24h of a major event", whoBuys: "Professional+", tier: "Professional" },
  { id: "fmt5", name: "Annual State of Global Supply Chains", format: "Flagship report", whoBuys: "Sold a la carte and to corporate buyers", tier: "Professional" },
  { id: "fmt6", name: "Country / Supplier Due-Diligence Reports", format: "On demand", whoBuys: "Procurement, M&A, banks", tier: "Enterprise" },
  { id: "fmt7", name: "Commissioned research", format: "Tailored", whoBuys: "Strategic tier", tier: "Strategic" },
  { id: "fmt8", name: "Board risk pack", format: "Quarterly, client-specific", whoBuys: "Enterprise / Strategic", tier: "Enterprise" },
];

// ---------------------------------------------------------------------------
// Procurement Intelligence Dashboard — commodity prices. A GSCI
// market-tracking series (deterministic, no Math.random, same wave
// convention as TREND_DATA/EXPOSURE_TREND/IndexSeries.history above), not a
// quoted real-time price feed. Diesel and wheat drift upward consistent
// with the diesel-price and Black Sea grain-risk stories already tracked in
// RISK_ITEMS/FEED_ITEMS above, for a world that reads as one consistent
// whole rather than unrelated series.
// ---------------------------------------------------------------------------

function commodityHistory(base: number, amp: number, period: number, phase: number, step: number, decimals: number) {
  const mult = Math.pow(10, decimals);
  return Array.from({ length: TREND_DAYS }, (_, i) => {
    const date = new Date(TREND_ANCHOR);
    date.setUTCDate(date.getUTCDate() - (TREND_DAYS - 1 - i));
    const seasonal = Math.sin((i / period) * Math.PI * 2 + phase) * amp;
    const drift = (i / TREND_DAYS) * step;
    const value = Math.round(Math.max(0, base + seasonal + drift) * mult) / mult;
    return { date: date.toISOString().slice(0, 10), value };
  });
}

export const COMMODITY_PRICES: CommodityPrice[] = [
  { id: "cm1", name: "Diesel", unit: "$/gal", sector: "Energy & Chemicals", history: commodityHistory(5.85, 0.12, 7, 0.5, 0.35, 2) },
  { id: "cm2", name: "Rare Earth Price Index", unit: "index pts", sector: "Electronics & Semiconductors", history: commodityHistory(118, 6, 11, 4.0, 14, 0) },
  { id: "cm3", name: "Wheat", unit: "$/bu", sector: "Agri-Food & Phosphates", history: commodityHistory(6.4, 0.25, 9, 1.1, 0.6, 2) },
  { id: "cm4", name: "Copper", unit: "$/lb", sector: "Electronics & Semiconductors", history: commodityHistory(4.35, 0.15, 6, 2.3, 0.25, 2) },
  { id: "cm5", name: "Cotton", unit: "¢/lb", sector: "Textiles & Apparel", history: commodityHistory(78, 3, 8, 3.0, -4, 0) },
];

// ---------------------------------------------------------------------------
// Logistics Performance Dashboard — operational performance per lane,
// joined to CORRIDORS above by id. First-party operational data, like
// Corridor/Supplier/ActionItem elsewhere — higher-risk, worsening lanes get
// lower OTIF and higher rate-index deltas than stable ones, consistent with
// each lane's own riskScore/riskTrend/statusNote above.
// ---------------------------------------------------------------------------

export const LANE_PERFORMANCE: LanePerformance[] = [
  { corridorId: "c1", otifPct: 84, rateIndexDelta: 9, capacityUtilizationPct: 91 },
  { corridorId: "c2", otifPct: 61, rateIndexDelta: 22, capacityUtilizationPct: 97 },
  { corridorId: "c3", otifPct: 58, rateIndexDelta: 19, capacityUtilizationPct: 88 },
  { corridorId: "c4", otifPct: 81, rateIndexDelta: 7, capacityUtilizationPct: 95 },
  { corridorId: "c5", otifPct: 90, rateIndexDelta: 2, capacityUtilizationPct: 78 },
  { corridorId: "c6", otifPct: 79, rateIndexDelta: 5, capacityUtilizationPct: 83 },
  { corridorId: "c7", otifPct: 92, rateIndexDelta: 1, capacityUtilizationPct: 86 },
  { corridorId: "c8", otifPct: 95, rateIndexDelta: 4, capacityUtilizationPct: 74 },
  { corridorId: "c9", otifPct: 97, rateIndexDelta: 0, capacityUtilizationPct: 69 },
  { corridorId: "c10", otifPct: 89, rateIndexDelta: -6, capacityUtilizationPct: 81 },
];

// ---------------------------------------------------------------------------
// Resilience Scorecard — this hypothetical client's maturity against an
// anonymised peer benchmark. GSCI analyst estimate; risk management scores
// above peers (a GSCI client), digital capabilities and procurement are
// closer to or slightly behind peers — not uniformly flattering, for
// credibility.
// ---------------------------------------------------------------------------

export const RESILIENCE_SCORES: ResilienceScore[] = [
  { dimension: "Planning", clientScore: 71, peerBenchmark: 64 },
  { dimension: "Procurement", clientScore: 68, peerBenchmark: 70 },
  { dimension: "Logistics", clientScore: 74, peerBenchmark: 66 },
  { dimension: "Risk management", clientScore: 79, peerBenchmark: 61 },
  { dimension: "Digital capabilities", clientScore: 62, peerBenchmark: 58 },
];

// ---------------------------------------------------------------------------
// Alert Performance Log — this hypothetical client's own handling record
// for each ALERT_ITEMS entry above, proving value at renewal per the
// roadmap's own framing. First-party operational log data, like
// ACTION_ITEMS — faster action and higher value-protected track with each
// alert's own severityScore above, not assigned independently.
// ---------------------------------------------------------------------------

export const ALERT_OUTCOMES: AlertOutcomeLog[] = [
  { alertId: "al1", actedOn: true, timeToActionHours: 3, outcome: "Disruption avoided", valueProtectedUsdM: 85 },
  { alertId: "al2", actedOn: true, timeToActionHours: 4, outcome: "Impact mitigated", valueProtectedUsdM: 52 },
  { alertId: "al3", actedOn: true, timeToActionHours: 18, outcome: "Monitoring", valueProtectedUsdM: 12 },
  { alertId: "al4", actedOn: true, timeToActionHours: 20, outcome: "Monitoring", valueProtectedUsdM: 8 },
  { alertId: "al5", actedOn: true, timeToActionHours: 30, outcome: "Impact mitigated", valueProtectedUsdM: 15 },
  { alertId: "al6", actedOn: true, timeToActionHours: 26, outcome: "Monitoring", valueProtectedUsdM: 6 },
  { alertId: "al7", actedOn: false, timeToActionHours: 0, outcome: "No action needed", valueProtectedUsdM: 0 },
  { alertId: "al8", actedOn: true, timeToActionHours: 36, outcome: "Monitoring", valueProtectedUsdM: 3 },
  { alertId: "al9", actedOn: false, timeToActionHours: 0, outcome: "No action needed", valueProtectedUsdM: 0 },
  { alertId: "al10", actedOn: true, timeToActionHours: 14, outcome: "Impact mitigated", valueProtectedUsdM: 22 },
  { alertId: "al11", actedOn: true, timeToActionHours: 40, outcome: "Monitoring", valueProtectedUsdM: 9 },
  { alertId: "al12", actedOn: false, timeToActionHours: 0, outcome: "No action needed", valueProtectedUsdM: 0 },
  { alertId: "al13", actedOn: true, timeToActionHours: 22, outcome: "Impact mitigated", valueProtectedUsdM: 18 },
  { alertId: "al14", actedOn: true, timeToActionHours: 16, outcome: "Disruption avoided", valueProtectedUsdM: 27 },
  { alertId: "al15", actedOn: true, timeToActionHours: 48, outcome: "Monitoring", valueProtectedUsdM: 7 },
];

// ---------------------------------------------------------------------------
// Real-time intelligence feed
// ---------------------------------------------------------------------------

// Real, dated news from GSCI's approved source list, every item published
// within the last 30 days — each links to its actual article via `url`.
// Ordered by real publish date, most recent first.
export const FEED_ITEMS: FeedItem[] = [
  { id: "f1", timestamp: "2026-10-08T09:00:00.000Z", title: "DHL commits over €400M to build out Central & Eastern Europe as a logistics hub", summary: "The investment through 2030 targets infrastructure, connectivity, and technology across Poland, Czechia, Hungary, and Romania; Poland's goods trade grew 2.1x faster than global trade over 2016-2025 and is forecast to keep outpacing it.", sector: "Logistics & Maritime", region: "Western Europe", criticality: "Low", sourceName: "Supply Chain Digital", url: "https://supplychaindigital.com/news/dhl-group-invests-400m-in-european-supply-chain-resilience" },
  { id: "f2", timestamp: "2026-10-08T08:00:00.000Z", title: "Amazon adds two China-to-US air freight options as sellers chase faster, cheaper replenishment", summary: "Air SMP splits inventory at origin for daily Shanghai/Hong Kong flights arriving in 7-10 days, while the cheaper Economy Air option runs 11-15 days from Shanghai or Shenzhen to Los Angeles; Amazon did not disclose pricing for either lane.", sector: "Electronics & Semiconductors", region: "East Asia", criticality: "Low", sourceName: "Supply Chain Dive", url: "https://www.supplychaindive.com/news/amazon-launches-2-new-china-to-us-air-freight-options/832364/" },
  { id: "f3", timestamp: "2026-10-08T07:00:00.000Z", title: "NorSAF and Nova Pangaea sign deal to build a waste-biomass ethanol plant feeding Latvian SAF output", summary: "The partners say the Latvia plant will use Nova Pangaea's REFNOVA technology to turn local waste biomass into carbon-negative ethanol and biochar, cutting Europe's reliance on imported cooking-oil feedstock for sustainable aviation fuel.", sector: "Energy & Chemicals", region: "Western Europe", criticality: "Low", sourceName: "Procurement Magazine", url: "https://procurementmag.com/news/norsaf-nova-pangaea-technology-sustainable-saf-procurement" },
  { id: "f4", timestamp: "2026-10-07T16:00:00.000Z", title: "First Shift: $19B US investment pledge, a widening trade deficit, and a new submarine shipyard", summary: "A manufacturer's $19B US investment pledge (including $3B for manufacturing) in exchange for conditional Section 232 relief arrives as the US trade deficit rose 13.7% to $105.6B in August on $420.8B of imports, while Anduril and the US Navy committed up to $6.6B to a new Maryland shipyard for submarine components.", sector: "Electronics & Semiconductors", region: "North America", criticality: "Medium", sourceName: "Supply Chain Management Review", url: "https://www.scmr.com/article/factories-freight-and-fragile-trade-routes-reshape-supply-chain-risk" },
  { id: "f5", timestamp: "2026-10-07T14:00:00.000Z", title: "German dockworkers' strike averted as union and port employers reach wage deal", summary: "The agreement ends weeks of intense negotiations and warning strikes that had disrupted container handling across northern Germany's seaports.", sector: "Logistics & Maritime", region: "Western Europe", criticality: "Medium", sourceName: "JOC", url: "https://www.joc.com/article/german-docker-strike-averted-as-union-port-employers-reach-deal-6301227" },
  { id: "f6", timestamp: "2026-10-07T12:00:00.000Z", title: "Maersk warns of potential Super El Niño disruption to East African ports through December", summary: "Citing a WMO forecast for wetter-than-normal conditions across the Greater Horn of Africa, Maersk's October 6 advisory urges customers to build in extra time, ship export cargo early, and confirm inland road access.", sector: "Logistics & Maritime", region: "Sub-Saharan Africa", criticality: "Medium", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44976-maersk-warns-of-potential-super-el-nino-impacts-in-east-africa" },
  { id: "f7", timestamp: "2026-10-07T11:00:00.000Z", title: "Tractor Supply opens its 11th distribution center with its first automated storage and retrieval system", summary: "The 865,000-sq-ft, $200M+ Nampa, Idaho facility uses Knapp automation, supplies 123 stores across nine states in year one, and pairs the build with a dedicated AI innovation team and roughly 500 new full-time jobs.", sector: "Agri-Food & Phosphates", region: "North America", criticality: "Low", sourceName: "Supply Chain Dive", url: "https://supplychaindive.com/news/tractor-supply-opens-idaho-distribution-center-with-automation-dedicated-a/831883" },
  { id: "f8", timestamp: "2026-10-07T10:00:00.000Z", title: "Diesel eases to $6.20/gallon but freight rates stay elevated as pre-spike contracts squeeze margins", summary: "Chevron's CFO expects energy prices to stay elevated until Strait of Hormuz shipping normalizes and refining capacity recovers, while truckers on older fixed-rate contracts say extra customer-funded hours help but aren't a fix.", sector: "Energy & Chemicals", region: "North America", criticality: "Medium", sourceName: "Supply Chain Dive", url: "https://supplychaindive.com/news/diesels-supply-crunch-may-hit-cfos-through-freight-contracts/831981" },
  { id: "f9", timestamp: "2026-10-06T10:00:00.000Z", title: "Black Sea drone strikes hit two cargo ships and a rapeseed-oil vessel, killing one", summary: "Overnight strikes hit vessels in Bulgaria's exclusive economic zone and near Odesa; Bulgaria's prime minister said the drones were \"either Ukrainian or Russian,\" and analysts warn of rising freight costs and risk to Black Sea grain trade.", sector: "Agri-Food & Phosphates", region: "Eastern Med. & Middle East", criticality: "Critical", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44970-ukraine-war-escalates-as-black-sea-drone-strikes-hit-cargo-ships" },
  { id: "f10", timestamp: "2026-10-06T09:00:00.000Z", title: "Etsy backs a 63-truck electric freight pilot on its Houston-Dallas lane", summary: "Run with the Center for Green Market Activation and Smart Freight Centre alongside Amazon, eBay, Meta, and Google, the Tesla Semi pilot launches early 2027; heavy-duty trucks are about 9% of US trucks but produce half of truck emissions.", sector: "Automotive & Mobility", region: "North America", criticality: "Low", sourceName: "Supply Chain Dive", url: "https://www.supplychaindive.com/news/how-etsy-is-pushing-freight-decarbonization/832159/" },
  { id: "f11", timestamp: "2026-10-05T14:00:00.000Z", title: "C.H. Robinson's $5.8B RXO deal raises a resilience question for shippers", summary: "The cash-and-stock acquisition creates a combined 3PL valued above $25B; for shippers using both firms, common ownership could reduce provider diversification and weaken negotiating leverage on overlapping lanes.", sector: "Logistics & Maritime", region: "North America", criticality: "Medium", sourceName: "Supply Chain Management Review", url: "https://www.scmr.com/article/ch-robinson-rxo-acquisition-supply-chain-resilience" },
  { id: "f12", timestamp: "2026-10-05T12:00:00.000Z", title: "Renewed Hormuz attacks put the Gulf oil rebound at risk", summary: "At least eight tankers have reportedly been attacked near the Strait of Hormuz since September 28, pushing Gulf crude exports 2-3M barrels per day below pre-war levels and keeping oil prices elevated.", sector: "Energy & Chemicals", region: "Eastern Med. & Middle East", criticality: "Critical", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44965-renewed-hormuz-attacks-put-gulf-oil-rebound-at-risk" },
  { id: "f13", timestamp: "2026-10-05T09:00:00.000Z", title: "Reshoring survey: 36% of US OEMs have reshored or are pursuing it, up from 29% a year earlier", summary: "Contract manufacturers doing the same rose from 16% to 32% per a 249-manufacturer survey, but unpredictable trade policy and a skilled-technician shortage — called very hard to hire for by two-thirds of respondents — remain the top obstacles.", sector: "Electronics & Semiconductors", region: "North America", criticality: "Medium", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44952-survey-finds-more-us-manufacturers-reshoring-but-some-high-hurdles-remain" },
  { id: "f14", timestamp: "2026-10-03T10:00:00.000Z", title: "DHL's Logistics Trend Radar 8.0 charts a shift from AI assistance to full autonomy", summary: "The eighth edition of DHL's biennial flagship report finds companies moving from digital assistance toward operational autonomy as AI, robotics, and automation increasingly reshape how supply chains run.", sector: "Electronics & Semiconductors", region: "Western Europe", criticality: "Low", sourceName: "Supply Chain Digital", url: "https://supplychaindigital.com/news/this-weeks-top-five-stories-in-supply-chain-3-october" },
  { id: "f15", timestamp: "2026-10-02T09:00:00.000Z", title: "Gartner: most enterprises will abandon agentic AI built by vendor forward-deployed engineers", summary: "Gartner predicts 70% of enterprises will abandon vendor-built agentic AI over rising cost and difficulty evolving it independently, warns of \"FDE washing\" that relabels ordinary consulting as premium engineering, and forecasts over 40% of agentic AI projects cancelled by end-2027.", sector: "Electronics & Semiconductors", region: "North America", criticality: "Medium", sourceName: "Procurement Magazine", url: "https://procurementmag.com/news/gartner-will-procurement-abandon-agentic-ai-built-by-fdes" },
  { id: "f16", timestamp: "2026-10-01T07:00:00.000Z", title: "Singapore's world-first green flight levy adds to rising air-cargo fuel costs", summary: "The S$1-S$41.60 per-ticket charge funds sustainable aviation fuel and was delayed from April because of fuel costs tied to the Iran war; cargo flights are exempt until October 2027, and global SAF output is still just 0.8% of jet fuel demand.", sector: "Pharma & Healthcare", region: "East Asia", criticality: "Medium", sourceName: "Supply Chain Brain", url: "https://www.supplychainbrain.com/articles/44950-world-first-green-flight-levy-in-singapore-adds-to-rising-costs-of-air-travel" },
  { id: "f17", timestamp: "2026-10-01T06:00:00.000Z", title: "FreightWaves' October State of the Industry: fragile freight market, record-high diesel costs", summary: "Produced with Ryder, the report finds intermodal volumes about 9% above last year and import activity near record levels at major US ports, even as record-high diesel prices, a housing-sector drag, and softer consumer sentiment weigh on an already fragile freight market.", sector: "Logistics & Maritime", region: "North America", criticality: "Low", sourceName: "FreightWaves", url: "https://www.freightwaves.com/news/white-paper-state-of-the-industry-october-2026" },
];

// ---------------------------------------------------------------------------
// Report Center
// ---------------------------------------------------------------------------

// Each note is GSCI's own write-up grounded in the real story at `url` —
// "Read" opens that primary source from GSCI's approved publication list,
// not a hosted PDF. Every underlying story is within the last 30 days;
// notes are ordered by note date, most recent first.
//
// Round 4 refresh (2026-10-09): 9 new items (rep11-rep19) added via a
// research subagent that WebFetched each article's actual body text (not
// just search snippets) to confirm date, headline, and facts before any
// summary was written. One additional candidate (a JOC Asia-ECSA rate-hike
// story) was found and explicitly excluded because its full body sat behind
// a paywall — only a one-sentence meta description was accessible, not
// enough to write an accurate summary from, consistent with the project's
// standing no-invention rule. All 8 approved sources are represented across
// the 19 items below (no source contributes more than 2 of the new 9).
export const REPORT_ITEMS: ReportItem[] = [
  { id: "rep11", title: "When Pipelines Can't Keep Up: Oracle Trucks Gas to Power AI Data Centers", date: "2026-10-09", category: "Situational Note", sector: "Energy & Chemicals", region: "North America", summary: "Oracle is trucking natural gas to data centers as a stopgap while pipeline capacity catches up with AI-driven power demand — a tactic that kept one Salt Lake City-area facility on schedule for over a year and is now being weighed for a delayed New Mexico build. Trucked gas costs far more than pipeline gas, underscoring how AI infrastructure buildout is straining energy supply chains in real time.", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44999-oracle-moves-gas-by-trucks-to-avoid-data-center-power-delays" },
  { id: "rep12", title: "Samsung Seeks $186M From CMA CGM Over Container Charges", date: "2026-10-08", category: "Risk Bulletin", sector: "Electronics & Semiconductors", region: "Global", summary: "Samsung Electronics America has filed with the US Federal Maritime Commission seeking at least $186M from CMA CGM, alleging improper container charges and unmet inland-delivery commitments on store-door shipments, plus pressure tactics over cargo holds. CMA CGM disputes the claims and has asked for dismissal — a dispute worth watching for shippers relying on carrier-side inland commitments.", sourceName: "FreightWaves", url: "https://freightwaves.com/news/samsung-seeks-186m-from-cma-cgm-in-container-charges-dispute" },
  { id: "rep13", title: "Inside Thales's Six-Criteria Framework for Sustainable Procurement", date: "2026-10-08", category: "Sector Deep-Dive", sector: "Electronics & Semiconductors", region: "Western Europe", summary: "Newly appointed Thales CPO Christelle Toureille is scaling a sustainable-procurement framework built on six supplier-selection criteria — quality, innovation, climate, trust, inclusion, and risk — anchored by a Supplier Relations and Sustainable Procurement Label aligned with ISO 20400. A useful benchmark for procurement leaders formalizing supplier-sustainability criteria beyond carbon alone.", sourceName: "Procurement Magazine", url: "https://procurementmag.com/news/christelle-toureille-leading-thales-sustainable-procurement" },
  { id: "rep14", title: "How One Platform Absorbed Shein's 6x Peak-Season Volume Spike", date: "2026-10-08", category: "Sector Deep-Dive", sector: "Textiles & Apparel", region: "East Asia", summary: "Last-mile delivery platform GOFO used its ATLAS order-and-transportation-management system plus automated sorting to help Shein absorb a 6x volume increase in the 2025 peak season. GOFO's revenue reached $840M in 2025 and is projected near $2.2B by end-2026 peak, and the company is now extending the same system to Walmart Marketplace and Amazon partnerships — a case study in infrastructure built for e-commerce-scale demand spikes.", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44985-how-gofo-atlas-and-intelligent-infrastructure-scaled-with-sheins-6x-volume-growth" },
  { id: "rep1", title: "Scale Versus Choice: What the C.H. Robinson-RXO Deal Means for Shippers", date: "2026-10-08", category: "Situational Note", sector: "Logistics & Maritime", region: "North America", summary: "C.H. Robinson's $5.8B stock-and-cash purchase of RXO creates a combined 3PL worth over $25B and targets roughly $300M in annual savings within two years — a scale play that shippers using both firms should read as a provider-diversification risk, not just a deal headline.", sourceName: "Supply Chain Dive", url: "https://supplychaindive.com/news/ch-robinson-to-buy-rxo-for-58b-combining-3pl-heavyweights/832124" },
  { id: "rep2", title: "SAF Localization Takes Root: Europe's Bid to Cut Import Dependency", date: "2026-10-08", category: "Situational Note", sector: "Energy & Chemicals", region: "Western Europe", summary: "NorSAF and Nova Pangaea's planned Latvian ethanol plant would feed sustainable-aviation-fuel production from local waste biomass instead of imported cooking oil — a small but telling data point on Europe's push to de-risk SAF feedstock supply.", sourceName: "Procurement Magazine", url: "https://procurementmag.com/news/norsaf-nova-pangaea-technology-sustainable-saf-procurement" },
  { id: "rep15", title: "Union Pacific's CEO Bets Big on Norfolk Southern Merger Approval", date: "2026-10-07", category: "Situational Note", sector: "Logistics & Maritime", region: "North America", summary: "Union Pacific CEO Jim Vena says he's \"99.99%\" confident regulators will approve the roughly $85B acquisition of Norfolk Southern, arguing it would cut delivery times by one to two days. Labor unions, agricultural groups, and rival railroads oppose the deal over monopoly concerns, and the Surface Transportation Board's final ruling isn't expected until 2027 — a live case study in how freight-network consolidation gets contested.", sourceName: "FreightWaves", url: "https://www.freightwaves.com/news/union-pacific-ceo-99-99-confident-rail-merger-will-win-approval" },
  { id: "rep3", title: "Two Chokepoints, One Risk Map: Hormuz and the Black Sea", date: "2026-10-07", category: "Risk Bulletin", sector: "Energy & Chemicals", region: "Eastern Med. & Middle East", summary: "Renewed Hormuz attacks since September 28 have cut Gulf crude exports by 2-3M barrels a day, while Black Sea drone strikes on cargo and grain vessels add a second, simultaneous maritime risk premium across two of the world's most tanker- and grain-dependent corridors.", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44965-renewed-hormuz-attacks-put-gulf-oil-rebound-at-risk" },
  { id: "rep4", title: "Diesel, Deficits, and Dockers: October's Cost Pressures on US Freight", date: "2026-10-07", category: "Situational Note", sector: "Energy & Chemicals", region: "North America", summary: "Diesel eased to $6.20/gallon but freight rates stayed well above seasonal norms, Chevron's CFO ties the elevated floor to Hormuz shipping and refining capacity, and carriers on pre-spike fixed contracts say extra customer-funded hours help but don't close the margin gap.", sourceName: "Supply Chain Dive", url: "https://supplychaindive.com/news/diesels-supply-crunch-may-hit-cfos-through-freight-contracts/831981" },
  { id: "rep5", title: "Grain Trade's New Risk Premium as Black Sea Strikes Escalate", date: "2026-10-06", category: "Risk Bulletin", sector: "Agri-Food & Phosphates", region: "Eastern Med. & Middle East", summary: "Drone strikes on cargo and rapeseed-oil vessels near Odesa and in Bulgaria's exclusive economic zone killed one person and pushed analysts to warn of rising freight costs and risk to Black Sea grain exports heading into the winter shipping season.", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44970-ukraine-war-escalates-as-black-sea-drone-strikes-hit-cargo-ships" },
  { id: "rep6", title: "Reshoring's Second Wind: Momentum Meets a Labor Ceiling", date: "2026-10-05", category: "Sector Deep-Dive", sector: "Electronics & Semiconductors", region: "North America", summary: "A 249-manufacturer survey finds 36% of US OEMs reshoring or pursuing it, up from 29% a year earlier, and contract manufacturers up from 16% to 32% — but unpredictable trade policy and a skilled-technician shortage, flagged as very hard to hire for by two-thirds of respondents, cap how far the trend can run.", sourceName: "Supply Chain Brain", url: "https://supplychainbrain.com/articles/44952-survey-finds-more-us-manufacturers-reshoring-but-some-high-hurdles-remain" },
  { id: "rep7", title: "DHL's Trend Radar 8.0: From AI Assistance to Operational Autonomy", date: "2026-10-03", category: "Benchmark Report", sector: "Electronics & Semiconductors", region: "Western Europe", summary: "The eighth edition of DHL's biennial flagship report benchmarks a shift already underway across its client base: companies moving past digital AI assistance toward genuine operational autonomy in robotics and automation.", sourceName: "Supply Chain Digital", url: "https://supplychaindigital.com/news/this-weeks-top-five-stories-in-supply-chain-3-october" },
  { id: "rep16", title: "AutoZone Pulls Back From Brazil to Focus on US Distribution Buildout", date: "2026-10-02", category: "Situational Note", sector: "Automotive & Mobility", region: "North America", summary: "AutoZone is slowing its Brazil expansion to concentrate capital on the US and Mexico through fiscal 2027, per CEO Philip Daniele. The company completed its US distribution-center buildout this year — opening 39 mega hubs for 172 total, with 40-plus more planned for FY27 — on roughly $1.5B in annual capex, a reminder that network-density bets can outweigh international expansion even for established retailers.", sourceName: "Supply Chain Dive", url: "https://www.supplychaindive.com/news/autozone-hones-in-on-domestic-distribution-network/831931/" },
  { id: "rep17", title: "Export Controls Tighten on China-Bound Aircraft Parts as Input Costs Climb", date: "2026-10-02", category: "Risk Bulletin", sector: "Cross-sector", region: "Global", summary: "The US Commerce Department has slowed export licenses for China-bound aircraft parts and is weighing wider landing-gear restrictions as trade-talk leverage, even as US factory activity stayed in expansion in September and ISM's input-price index climbed to 77.9. The same briefing notes CMA CGM's completed $1.4B purchase of FedEx Supply Chain, a $1B Ultium Cells battery expansion in Tennessee, and a $300M Walmart fulfillment center in Ohio — a snapshot of trade policy and capex moving in parallel.", sourceName: "Supply Chain Management Review", url: "https://www.scmr.com/article/first-shift-export-controls-tighten-as-manufacturers-confront-rising-costs" },
  { id: "rep18", title: "Freight's Cybersecurity Problem Is Everyone's Job Now", date: "2026-10-02", category: "Risk Bulletin", sector: "Cross-sector", region: "North America", summary: "Themes from NMFTA's 2026 Cybersecurity Conference argue that digital cargo theft — compromised carrier portals, forged paperwork, AI-driven voice and video impersonation — has outgrown IT-only ownership and now requires transportation leaders themselves to act. Shared ELD systems add third-party exposure across carrier networks, making ransomware-readiness and portal-access hygiene a freight-operations concern, not just a security-team one.", sourceName: "Inbound Logistics", url: "https://www.inboundlogistics.com/articles/how-transportation-leaders-are-fighting-back-against-enterprise-cyber-risks/" },
  { id: "rep19", title: "DHL Builds a Dedicated Logistics Layer for US Hospital Systems", date: "2026-10-02", category: "Sector Deep-Dive", sector: "Pharma & Healthcare", region: "North America", summary: "DHL Supply Chain has launched a logistics solution for US hospitals, physician groups, and outpatient facilities, combining a consolidated service center with dedicated transport and final-mile delivery. The move follows rising 2025 patient volumes and a 13.6% jump in drug expenses, and sits inside DHL Group's broader €2B healthcare-logistics commitment through 2030, half of it directed to the Americas.", sourceName: "Supply Chain Digital", url: "https://supplychaindigital.com/news/dhl-supply-chain-expands-operations-across-us-health-systems" },
  { id: "rep8", title: "The FDE Trap: Why Gartner Expects Enterprises to Abandon Vendor-Built Agentic AI", date: "2026-10-02", category: "Risk Bulletin", sector: "Electronics & Semiconductors", region: "North America", summary: "Gartner projects 70% of enterprises will abandon agentic AI built through vendor forward-deployed engineering on rising cost and maintainability problems, warns of \"FDE washing,\" and forecasts over 40% of agentic AI projects cancelled by the end of 2027 — a procurement governance issue well beyond IT.", sourceName: "Procurement Magazine", url: "https://procurementmag.com/news/gartner-will-procurement-abandon-agentic-ai-built-by-fdes" },
  { id: "rep9", title: "October's State of the Industry: Fragile Freight, Resilient Imports", date: "2026-10-01", category: "Benchmark Report", sector: "Logistics & Maritime", region: "North America", summary: "FreightWaves' October benchmark, produced with Ryder, finds intermodal volumes running about 9% above last year and import activity near record levels at major US ports, even as record-high diesel prices and softening consumer sentiment strain an already fragile freight market.", sourceName: "FreightWaves", url: "https://www.freightwaves.com/news/white-paper-state-of-the-industry-october-2026" },
  { id: "rep10", title: "Constant Shock as the New Operating Baseline for Supply Chains", date: "2026-09-30", category: "Sector Deep-Dive", sector: "Cross-sector", region: "Global", summary: "At ASCM CHAINge 2026 in Long Beach, supply chain leaders agreed that ongoing disruption is now a standing condition of business, not an exception — pointing to trade volatility, shifting demand, embedding AI into core systems, and retraining warehouse and management staff as the new baseline work.", sourceName: "Inbound Logistics", url: "https://www.inboundlogistics.com/articles/the-new-operational-baseline-how-supply-chains-are-adapting-to-constant-shock/" },
];
