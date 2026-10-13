export type Sector =
  | "Automotive & Mobility"
  | "Electronics & Semiconductors"
  | "Energy & Chemicals"
  | "Agri-Food & Phosphates"
  | "Textiles & Apparel"
  | "Pharma & Healthcare"
  | "Logistics & Maritime";

export type Region =
  | "Maghreb & North Africa"
  | "Sub-Saharan Africa"
  | "Western Europe"
  | "Eastern Med. & Middle East"
  | "East Asia"
  | "North America"
  | "Latin America";

export type Criticality = "Low" | "Medium" | "Critical";

export type RiskDomain =
  | "Geopolitical"
  | "Regulatory"
  | "Market"
  | "Operational"
  | "Climate";

export const SECTORS: Sector[] = [
  "Automotive & Mobility",
  "Electronics & Semiconductors",
  "Energy & Chemicals",
  "Agri-Food & Phosphates",
  "Textiles & Apparel",
  "Pharma & Healthcare",
  "Logistics & Maritime",
];

export const REGIONS: Region[] = [
  "Maghreb & North Africa",
  "Sub-Saharan Africa",
  "Western Europe",
  "Eastern Med. & Middle East",
  "East Asia",
  "North America",
  "Latin America",
];

/** One day's reading across the tracked topics, wide format for recharts. */
export interface TrendPoint {
  date: string; // ISO date
  total: number;
  "Red Sea rerouting": number;
  "EU carbon tariff (CBAM)": number;
  "Rare earth export curbs": number;
}

export interface RiskItem {
  id: string;
  label: string;
  domain: RiskDomain;
  sector: Sector;
  region: Region;
  impact: number; // 1-10
  probability: number; // 0-100
  exposureUsdM: number; // bubble size, estimated exposure in USD millions
  criticality: Criticality;
}

/** One day's reading of total tracked exposure, for the executive cockpit's
 *  exposure-trend chart. A GSCI analyst estimate (like RiskItem.exposureUsdM
 *  below), not a figure quoted from any single source. */
export interface ExposurePoint {
  date: string; // ISO date
  exposureUsdM: number;
}

export type ActionStatus = "Open" | "Closed";

/** A client-side mitigation action tracked against a risk — first-party
 *  operational data (who is doing what about a risk), not a sourced news
 *  claim, so it carries no sourceName/url the way FeedItem/ReportItem do. */
export interface ActionItem {
  id: string;
  riskId: string; // RiskItem.id this action responds to
  title: string;
  owner: string; // responsible function, e.g. "Logistics", "Procurement"
  status: ActionStatus;
  updatedDate: string; // ISO date — when opened, or when closed
}

export interface FeedItem {
  id: string;
  timestamp: string; // ISO datetime
  title: string;
  summary: string;
  sector: Sector;
  region: Region;
  criticality: Criticality;
  /** Real outlet/publisher name, e.g. "gCaptain", "Ti Insight". */
  sourceName: string;
  /** Real external URL of the source article — feed items link out to it. */
  url: string;
}

/** The two real-time alert product lines in the roadmap's "core paid
 *  product" category. Port & Freight ships first; Trade & Regulatory
 *  follows as the next build — the type already carries both so the UI
 *  (category filter) needs no rework when that data arrives. */
export type AlertCategory = "Port & Freight" | "Trade & Regulatory";

export type AlertEntityType =
  | "Port"
  | "Corridor"
  | "Carrier"
  | "Policy" // a named regulatory/trade-policy body or program
  | "Court" // a named court or tribunal
  | "Transaction"; // a named M&A/FDI deal under regulatory review

export type AlertAction =
  | "Security"
  | "Labor"
  | "Weather"
  | "Capacity"
  | "Commercial"
  | "Cost"
  | "Tariff"
  | "Regulatory"
  | "Legal";

export type AlertConfidence = "Low" | "Medium" | "High";

/** A paid real-time alert: a sourced event re-packaged with the attributes
 *  the roadmap says "turn a news item into a paid alert" — severity score,
 *  confidence, source, timestamp, affected entities, and a recommended
 *  action. severityScore/confidence/recommendedAction are GSCI analyst
 *  assessments layered on top of the real, sourced event at sourceUrl (the
 *  same evidence standard as RiskItem's impact/probability/exposureUsdM). */
export interface AlertItem {
  id: string;
  category: AlertCategory;
  title: string;
  entity: string; // the named port, corridor, or carrier affected
  entityType: AlertEntityType;
  alertType: AlertAction;
  severity: Criticality;
  severityScore: number; // 0-100, GSCI analyst estimate
  confidence: AlertConfidence;
  timestamp: string; // ISO datetime
  affectedEntities: string[];
  recommendedAction: string;
  sector: Sector;
  region: Region;
  /** Real outlet/publisher name, same evidence standard as FeedItem. */
  sourceName: string;
  /** Real external URL of the source article. */
  sourceUrl: string;
}

export type SupplierTier = 1 | 2 | 3;

/** A hypothetical GSCI client's own supplier base — first-party demo data,
 *  like ActionItem, not a sourced news claim, so suppliers carry no
 *  sourceName/url and are clearly fictional companies (never real ones,
 *  which no client has actually disclosed as suppliers). mapX/mapY place
 *  each supplier on the same abstract 440x340 canvas as the hero's signal
 *  map — a stylized layout, not a real geographic projection. */
export interface Supplier {
  id: string;
  name: string;
  site: string; // city, country
  region: Region;
  sector: Sector;
  tier: SupplierTier;
  riskScore: number; // 0-100, GSCI analyst estimate
  singleSource: boolean;
  mapX: number;
  mapY: number;
}

export type CorridorMode = "Ocean" | "Air" | "Rail" | "Road";
export type CorridorTrend = "Up" | "Down" | "Flat";

/** A hypothetical GSCI client's own trade lanes — first-party exposure
 *  data in the same sense as Supplier above, but each riskScore/statusNote
 *  is informed by the real, sourced chokepoint events already tracked in
 *  RISK_ITEMS/ALERT_ITEMS (Hormuz, Black Sea, East African rains, German
 *  port labor, the UP-Norfolk Southern merger, the Suez-routing recovery),
 *  the same evidence standard as RiskItem's impact/probability/exposure. */
export interface Corridor {
  id: string;
  name: string; // "Origin → Destination"
  origin: string;
  destination: string;
  mode: CorridorMode;
  region: Region;
  sector: Sector;
  riskScore: number; // 0-100, GSCI analyst estimate
  riskTrend: CorridorTrend;
  transitDays: number;
  volumeSharePct: number; // % of this client's shipment volume on this lane
  statusNote: string;
}

export type IndexFrequency = "Weekly" | "Monthly" | "Quarterly" | "Semi-annual";

/** The roadmap's subscription tiers (Table 0's "signal families x tier" and
 *  Table 2's report-format tier column). GSCI shows every index/report in
 *  full on this site — the tier chip is a commercial-structure label (what a
 *  real subscriber would pay for), not an access gate, since the site's job
 *  is to demonstrate the full product to visitors, not paywall it. */
export type GsciTier = "Free" | "Professional" | "Enterprise" | "Strategic";

/** One of the roadmap's 8 named proprietary indices (Table 1). A composite
 *  GSCI analyst score (0-100 unless noted), not a figure quoted from any
 *  single outlet. history follows the same deterministic, no-Math.random
 *  convention as TREND_DATA/EXPOSURE_TREND so server and client renders
 *  always match. */
export interface IndexSeries {
  id: string;
  name: string;
  description: string;
  frequency: IndexFrequency;
  tier: GsciTier;
  history: { date: string; value: number }[];
}

/** One of the Near-shoring Attractiveness Index's 4 comparison geographies
 *  (the roadmap names these 4 explicitly), scored 0-100 across 5 GSCI
 *  analyst dimensions. GSCI analyst estimates, the same evidence standard as
 *  IndexSeries.history above. */
export interface NearshoreScore {
  geography: string;
  proximity: number; // proximity to EU/US demand centers
  laborCost: number; // labor cost competitiveness
  tradeAccess: number; // trade-agreement access
  stability: number; // political & regulatory stability
  infrastructure: number; // logistics & port infrastructure maturity
  composite: number; // average of the five dimensions above
}

/** The roadmap's 8 named report formats (Table 2) — a reference catalog of
 *  what GSCI sells, shown on the Report Center alongside the grounded
 *  article grid below. Not every format has (or should have) a fabricated
 *  example instance — several (Commissioned research, Board risk pack,
 *  Country/Supplier Due-Diligence Reports) are bespoke deliverables with no
 *  public example to show, so this is a catalog card, not a news item. */
export interface ReportFormat {
  id: string;
  name: string;
  format: string; // length/cadence, e.g. "2-3 pages, curated"
  whoBuys: string; // e.g. "All tiers (free version as a lead magnet)"
  tier: GsciTier;
}

/** Procurement Intelligence Dashboard — one tracked commodity's price
 *  history. A GSCI analyst market-tracking series (deterministic, no
 *  Math.random, same wave convention as TREND_DATA/EXPOSURE_TREND/
 *  IndexSeries.history above), not a quoted real-time price feed. */
export interface CommodityPrice {
  id: string;
  name: string;
  unit: string; // "$/gal", "index pts", "$/bu", "$/lb", "¢/lb"
  sector: Sector;
  history: { date: string; value: number }[];
}

/** Logistics Performance Dashboard — operational performance for one of
 *  this hypothetical client's own trade lanes, joined to Corridor by id.
 *  First-party operational data, like Corridor/Supplier/ActionItem above —
 *  not a sourced news claim, so it carries no sourceName/url. */
export interface LanePerformance {
  corridorId: string; // Corridor.id this measures
  otifPct: number; // on-time-in-full %, 0-100
  rateIndexDelta: number; // % change in freight rate vs. this lane's baseline
  capacityUtilizationPct: number; // 0-100
}

export type ResilienceDimension =
  | "Planning"
  | "Procurement"
  | "Logistics"
  | "Risk management"
  | "Digital capabilities";

/** Resilience Scorecard — this hypothetical client's maturity against an
 *  anonymised peer benchmark, one row per dimension. GSCI analyst estimate,
 *  first-party/benchmark data like Corridor/Supplier above. */
export interface ResilienceScore {
  dimension: ResilienceDimension;
  clientScore: number; // 0-100
  peerBenchmark: number; // 0-100, anonymised peer average
}

export type AlertOutcome = "Disruption avoided" | "Impact mitigated" | "Monitoring" | "No action needed";

/** Alert Performance Log — this hypothetical client's own handling record
 *  for one alert (AlertItem.id), proving value at renewal per the roadmap's
 *  own framing. First-party operational log data, like ActionItem above —
 *  the underlying alert is real/sourced (see AlertItem), but how a client
 *  acted on it is this client's own record, not a news claim. */
export interface AlertOutcomeLog {
  alertId: string; // AlertItem.id
  actedOn: boolean;
  timeToActionHours: number;
  outcome: AlertOutcome;
  valueProtectedUsdM: number; // GSCI analyst estimate of exposure avoided/mitigated
}

export interface ReportItem {
  id: string;
  title: string;
  date: string; // ISO date — when this note was written
  category: "Situational Note" | "Sector Deep-Dive" | "Risk Bulletin" | "Benchmark Report";
  sector: Sector | "Cross-sector";
  region: Region | "Global";
  summary: string;
  /** Real outlet/publisher this note is grounded in, e.g. "Ti Insight". */
  sourceName: string;
  /** Real external URL readers open via the "Read" action. */
  url: string;
}
