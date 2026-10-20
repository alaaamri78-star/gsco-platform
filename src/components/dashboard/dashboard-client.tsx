"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Minus,
  Route,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";
import { KpiTile } from "./kpi-tile";
import { ExposureTrendChart } from "./exposure-trend-chart";
import { TopRisksList } from "./top-risks-list";
import { ActionsTracker } from "./actions-tracker";
import { PrioritySignalsTable } from "./priority-signals-table";
import { DashboardRiskMatrix } from "./dashboard-risk-matrix";
import { RegionExposureTable } from "./region-exposure-table";
import { MarketIntelligence } from "./market-intelligence";
import { WciTracker } from "./wci-tracker";
import { MajorPortsTable } from "./major-ports-table";
import {
  ACTION_ITEMS,
  COMMODITY_PRICES,
  CORRIDORS,
  EXPOSURE_TREND,
  FEED_ITEMS,
  INDICES,
  MAJOR_PORTS,
  RISK_ITEMS,
  SUPPLIERS,
  WCI_COMPOSITE,
  WCI_ROUTES,
} from "@/lib/mock-data";
import {
  REGIONS,
  SECTORS,
  type Criticality,
  type Region,
  type RiskDomain,
  type Sector,
} from "@/lib/types";
import { formatShortDate, riskLevelFromScore } from "@/lib/utils";
import { STATUS } from "@/lib/colors";

const RISK_DOMAINS: RiskDomain[] = ["Geopolitical", "Regulatory", "Market", "Operational", "Climate"];
const SEVERITIES: (Criticality | "All")[] = ["All", "Low", "Medium", "Critical"];

const METHODOLOGY = [
  {
    label: "Active risk signals",
    measures: "Breadth of the current risk register for the selected filters.",
    formula: "Count of tracked risk items matching the active sector/region/category/severity filters.",
    unit: "Count · updated as risks are logged or resolved",
    source: "GSCI risk register",
    limitations: "Reflects only risks GSCI analysts have logged, not all risk present in the market.",
  },
  {
    label: "Medium & critical signals",
    measures: "Concentration of elevated-severity risk within the filtered set.",
    formula: "Count of filtered risk items rated Medium or Critical.",
    unit: "Count · of GSCI's 3 severity tiers (Low / Medium / Critical)",
    source: "GSCI risk register",
    limitations: "GSCI's taxonomy has 3 severity tiers; there is no separate 'High' tier between Medium and Critical.",
  },
  {
    label: "Risk momentum",
    measures: "Direction of total tracked USD exposure over the last two weeks.",
    formula: "% change between the trailing 7-day and prior 7-day average of the exposure series; > +2% = Deteriorating, < −2% = Improving, else Stable.",
    unit: "% change · global total, not filtered by sector/region/category/severity",
    source: "GSCI exposure-tracking series",
    limitations: "A momentum read on aggregate exposure, not a dated risk-score history — the ±2% band is a GSCI modeling choice, not an industry standard.",
  },
  {
    label: "Trade corridor exposure",
    measures: "Share of tracked trade volume moving through the highest-risk corridors.",
    formula: "Sum of volume share for filtered corridors scored Critical (risk score ≥ 70).",
    unit: "% of tracked trade volume · snapshot, updates with corridor scores",
    source: "Corridor Risk Scores page data",
    limitations: "Covers only the 10 corridors GSCI currently tracks, not total global trade volume. Not filtered by risk category/severity — corridors carry no domain or criticality field.",
  },
  {
    label: "Logistics disruption indicator",
    measures: "Current rate volatility across ocean, air and road freight.",
    formula: "Latest weekly reading of the GSCI Freight Volatility Index.",
    unit: "Index, 0–100 · weekly · GSCI composite, not externally sourced · global",
    source: "GSCI Freight Volatility Index",
    limitations: "A composite analyst index, not a quoted market benchmark; not broken out by corridor or mode.",
  },
  {
    label: "Commodity volatility",
    measures: "Statistical price volatility across tracked commodity inputs — how much each price swings day to day, not simply how far it has moved.",
    formula: "Standard deviation of trailing-56-day daily % price changes per commodity, averaged across tracked commodities.",
    unit: "% (daily-return standard deviation) · sector-filtered (no region/category/severity dimension)",
    source: "GSCI commodity price tracking",
    limitations: "A volatility measure, not a directional price-change figure — pair with the Commodity price trends table below for direction. Covers the 53 commodities GSCI tracks.",
  },
] as const;

export function DashboardClient() {
  const [sector, setSector] = useState<Sector | "All">("All");
  const [region, setRegion] = useState<Region | "All">("All");
  const [domain, setDomain] = useState<RiskDomain | "All">("All");
  const [severity, setSeverity] = useState<Criticality | "All">("All");

  const filteredRisks = useMemo(
    () =>
      RISK_ITEMS.filter(
        (r) =>
          (sector === "All" || r.sector === sector) &&
          (region === "All" || r.region === region) &&
          (domain === "All" || r.domain === domain) &&
          (severity === "All" || r.criticality === severity)
      ),
    [sector, region, domain, severity]
  );

  const filteredRiskIds = useMemo(() => new Set(filteredRisks.map((r) => r.id)), [filteredRisks]);
  const filteredActions = useMemo(
    () => ACTION_ITEMS.filter((a) => filteredRiskIds.has(a.riskId)),
    [filteredRiskIds]
  );

  const filteredCorridors = useMemo(
    () =>
      CORRIDORS.filter(
        (c) => (sector === "All" || c.sector === sector) && (region === "All" || c.region === region)
      ),
    [sector, region]
  );

  const filteredCommodities = useMemo(
    () => (sector === "All" ? COMMODITY_PRICES : COMMODITY_PRICES.filter((c) => c.sector === sector)),
    [sector]
  );

  const filteredSuppliers = useMemo(
    () =>
      SUPPLIERS.filter(
        (s) =>
          (sector === "All" || s.sector === sector) &&
          (region === "All" || s.region === region) &&
          (severity === "All" || riskLevelFromScore(s.riskScore) === severity)
      ),
    [sector, region, severity]
  );

  // 1. Active Risk Signals
  const activeRiskSignals = filteredRisks.length;

  // 2. Medium & Critical Risk Signals — GSCI's top two of three severity tiers
  const mediumCriticalCount = filteredRisks.filter(
    (r) => r.criticality === "Medium" || r.criticality === "Critical"
  ).length;

  // 3. Risk Momentum — trailing 7-day vs prior 7-day average of EXPOSURE_TREND.
  // Global total exposure series; not filtered (confirmed method).
  const riskMomentum = useMemo(() => {
    const n = EXPOSURE_TREND.length;
    if (n < 14) return null;
    const avg = (points: typeof EXPOSURE_TREND) =>
      points.reduce((s, p) => s + p.exposureUsdM, 0) / points.length;
    const lastAvg = avg(EXPOSURE_TREND.slice(n - 7));
    const priorAvg = avg(EXPOSURE_TREND.slice(n - 14, n - 7));
    if (priorAvg === 0) return null;
    const pct = ((lastAvg - priorAvg) / priorAvg) * 100;
    const label = pct > 2 ? "Deteriorating" : pct < -2 ? "Improving" : "Stable";
    return { pct, label: label as "Deteriorating" | "Improving" | "Stable" };
  }, []);

  // 4. Trade Corridor Exposure — % of tracked trade volume in Critical-risk (≥70) corridors
  const corridorExposure = useMemo(() => {
    if (filteredCorridors.length === 0) return null;
    const criticalVolume = filteredCorridors
      .filter((c) => riskLevelFromScore(c.riskScore) === "Critical")
      .reduce((s, c) => s + c.volumeSharePct, 0);
    return Math.round(criticalVolume * 10) / 10;
  }, [filteredCorridors]);

  // 5. Logistics Disruption Indicator — latest Freight Volatility Index reading, global
  const freightIndex = INDICES.find((i) => i.id === "idx6");
  const portIndex = INDICES.find((i) => i.id === "idx5");
  const logisticsIndicator = freightIndex?.history[freightIndex.history.length - 1]?.value ?? null;

  // 6. Commodity Volatility — standard deviation of daily % price changes, averaged
  const commodityVolatility = useMemo(() => {
    if (filteredCommodities.length === 0) return null;
    const vols = filteredCommodities.map((c) => {
      if (c.history.length < 2) return 0;
      const returns: number[] = [];
      for (let i = 1; i < c.history.length; i++) {
        const prev = c.history[i - 1].value;
        if (prev !== 0) returns.push((c.history[i].value - prev) / prev);
      }
      if (returns.length === 0) return 0;
      const mean = returns.reduce((s, v) => s + v, 0) / returns.length;
      const variance = returns.reduce((s, v) => s + (v - mean) ** 2, 0) / returns.length;
      return Math.sqrt(variance) * 100;
    });
    return Math.round((vols.reduce((s, v) => s + v, 0) / vols.length) * 10) / 10;
  }, [filteredCommodities]);

  const latestExposureDate = EXPOSURE_TREND[EXPOSURE_TREND.length - 1]?.date ?? "";
  const latestFeedTimestamp = useMemo(
    () => FEED_ITEMS.reduce((latest, f) => (f.timestamp > latest ? f.timestamp : latest), FEED_ITEMS[0]?.timestamp ?? ""),
    []
  );

  const dataCompleteness = useMemo(() => {
    const total = RISK_ITEMS.length;
    const withCore = RISK_ITEMS.filter(
      (r) => r.sector && r.region && r.domain && typeof r.impact === "number" && typeof r.probability === "number"
    ).length;
    const regionsCovered = new Set(RISK_ITEMS.map((r) => r.region)).size;
    const sectorsCovered = new Set(RISK_ITEMS.map((r) => r.sector)).size;
    return { total, withCore, regionsCovered, sectorsCovered };
  }, []);

  const MomentumIcon = !riskMomentum
    ? Minus
    : riskMomentum.label === "Deteriorating"
      ? TrendingUp
      : riskMomentum.label === "Improving"
        ? TrendingDown
        : Minus;
  const momentumAccent = !riskMomentum
    ? "#71717a"
    : riskMomentum.label === "Deteriorating"
      ? STATUS.Critical
      : riskMomentum.label === "Improving"
        ? STATUS.Low
        : "#71717a";

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Global Supply Chain Intelligence Console
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          An overview of selected developments affecting global supply chains. Explore risk
          indicators, monitor relevant alerts and review exposure and mitigation status across
          sector and region. Use these indicators as decision-support information — their
          interpretation depends on the reporting periods and methodology.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-panel p-3">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value as Sector | "All")}
            className="rounded-lg border border-border bg-panel-raised px-3 py-2 text-sm text-ink-primary focus-visible:outline-none"
            aria-label="Filter by sector"
          >
            <option value="All">All sectors</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region | "All")}
            className="rounded-lg border border-border bg-panel-raised px-3 py-2 text-sm text-ink-primary focus-visible:outline-none"
            aria-label="Filter by region"
          >
            <option value="All">All regions</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as RiskDomain | "All")}
            className="rounded-lg border border-border bg-panel-raised px-3 py-2 text-sm text-ink-primary focus-visible:outline-none"
            aria-label="Filter by risk category"
          >
            <option value="All">All categories</option>
            {RISK_DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            {SEVERITIES.map((s) => (
              <button
                key={s}
                onClick={() => setSeverity(s)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  severity === s
                    ? "border-transparent bg-signal-cyan text-white"
                    : "border-border text-ink-secondary hover:text-ink-primary"
                }`}
                aria-pressed={severity === s}
              >
                {s === "All" ? "All severities" : s}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
          Sector, region, category and severity filter the risk register, risk matrix, regional
          exposure, top risks and actions below. Corridor, commodity and supplier panels filter by
          sector/region only (they carry no risk category or severity field of their own). Risk
          momentum and the Logistics disruption indicator are GSCI-wide reads and are not filtered.
        </p>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-medium text-ink-primary">Executive headline KPIs</h2>
          <span className="font-mono text-[11px] text-ink-muted">
            Data as of {formatShortDate(latestExposureDate)}
          </span>
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiTile
            label="Active risk signals"
            value={String(activeRiskSignals)}
            icon={Activity}
            accent="#3987e5"
            note="Tracked risk items matching filters · GSCI risk register"
          />
          <KpiTile
            label="Medium & critical signals"
            value={String(mediumCriticalCount)}
            icon={AlertTriangle}
            accent={STATUS.Critical}
            note="Medium + Critical tier count · GSCI risk register"
          />
          <KpiTile
            label="Risk momentum"
            value={riskMomentum ? riskMomentum.label : "Not available"}
            icon={MomentumIcon}
            accent={momentumAccent}
            note={
              riskMomentum
                ? `${riskMomentum.pct >= 0 ? "+" : ""}${Math.round(riskMomentum.pct)}% · 7d vs prior-7d avg. exposure, ±2% band · global, not filtered`
                : "7d vs prior-7d avg. exposure, ±2% band · global, not filtered"
            }
          />
          <KpiTile
            label="Trade corridor exposure"
            value={corridorExposure !== null ? `${corridorExposure}%` : "Not available"}
            icon={Route}
            accent="#d95926"
            note="% of tracked trade volume in Critical-risk (≥70) corridors"
          />
          <KpiTile
            label="Logistics disruption indicator"
            value={logisticsIndicator !== null ? `${logisticsIndicator}/100` : "Not available"}
            icon={Truck}
            accent="#fab219"
            note="GSCI composite index (not externally sourced), latest reading · global"
          />
          <KpiTile
            label="Commodity volatility"
            value={commodityVolatility !== null ? `${commodityVolatility}%` : "Not available"}
            icon={BarChart3}
            accent="#199e70"
            note="Stdev. of daily % price changes, trailing 56d · sector-filtered"
          />
        </div>
      </div>

      <ExposureTrendChart data={EXPOSURE_TREND} />

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardRiskMatrix items={filteredRisks} />
        <RegionExposureTable items={filteredRisks} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopRisksList items={filteredRisks} />
        <ActionsTracker items={filteredActions} risks={filteredRisks} />
      </div>

      <MarketIntelligence
        corridors={filteredCorridors}
        commodities={filteredCommodities}
        suppliers={filteredSuppliers}
        portIndex={portIndex}
      />

      <div>
        <h2 className="text-sm font-medium text-ink-primary">Global trade infrastructure watch</h2>
        <p className="mt-1 text-xs text-ink-muted">
          Reference data on real global trade lanes and ports, not filtered by the sector/region
          controls above — lanes and ports carry no sector or region field of their own.
        </p>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          <WciTracker routes={WCI_ROUTES} composite={WCI_COMPOSITE} />
          <MajorPortsTable ports={MAJOR_PORTS} />
        </div>
      </div>

      <PrioritySignalsTable items={FEED_ITEMS} sector={sector} region={region} />

      <details className="group rounded-xl border border-border bg-panel p-5">
        <summary className="cursor-pointer list-none text-sm font-medium text-ink-primary">
          Data quality, coverage &amp; KPI methodology
          <span className="ml-2 text-xs text-ink-muted group-open:hidden">(show)</span>
          <span className="ml-2 hidden text-xs text-ink-muted group-open:inline">(hide)</span>
        </summary>

        <div className="mt-4 rounded-lg border border-border-subtle bg-panel-raised p-4">
          <p className="text-xs font-medium text-ink-primary">Data quality &amp; coverage</p>
          <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-ink-muted">
            <li>
              <span className="font-medium text-ink-secondary">Last successful update: </span>
              exposure series through {formatShortDate(latestExposureDate)} · intelligence feed
              through {formatShortDate(latestFeedTimestamp)}.
            </li>
            <li>
              <span className="font-medium text-ink-secondary">Source freshness: </span>
              intelligence feed items are individually dated, real sourced news (see Priority
              Intelligence Signals below); risk, exposure, index and commodity series are GSCI
              analyst estimates on a periodically-refreshed modeled series.
            </li>
            <li>
              <span className="font-medium text-ink-secondary">Data completeness: </span>
              {dataCompleteness.withCore}/{dataCompleteness.total} risk items carry sector, region,
              category, impact and probability; 0/{dataCompleteness.total} carry an individual
              assessment date (not yet tracked in this data model).
            </li>
            <li>
              <span className="font-medium text-ink-secondary">Coverage: </span>
              {dataCompleteness.regionsCovered} of {REGIONS.length} defined regions and{" "}
              {dataCompleteness.sectorsCovered} of {SECTORS.length} defined sectors currently have
              at least one tracked risk.
            </li>
            <li>
              <span className="font-medium text-ink-secondary">Update cadence: </span>
              this console is GSCI&apos;s structured reference build, refreshed periodically by
              GSCI analysts — not a live, real-time feed. No component on this page polls a live
              market or news API; figures update when GSCI&apos;s underlying dataset is refreshed.
            </li>
          </ul>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          All 6 headline KPIs above are computed live from GSCI&apos;s underlying risk, corridor,
          index and commodity data — no figure on this page is hand-entered, and any KPI without
          enough underlying data reads &ldquo;Not available&rdquo; rather than zero. Two KPI
          Catalogue areas from the dashboard enhancement framework — company-level Operations &amp;
          Resilience metrics (OTIF, cash-to-cash cycle, etc.) and Sustainability &amp; Digital
          Supply Chain indicators — are intentionally left out of this release: GSCI does not yet
          hold validated client or benchmark data for them.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METHODOLOGY.map((m) => (
            <div key={m.label} className="rounded-lg border border-border-subtle bg-panel-raised p-3">
              <p className="text-xs font-medium text-ink-primary">{m.label}</p>
              <dl className="mt-2 space-y-1 text-[11px] leading-relaxed text-ink-muted">
                <div>
                  <dt className="inline font-medium text-ink-secondary">Measures: </dt>
                  <dd className="inline">{m.measures}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-ink-secondary">Formula: </dt>
                  <dd className="inline">{m.formula}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-ink-secondary">Unit/period: </dt>
                  <dd className="inline">{m.unit}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-ink-secondary">Source: </dt>
                  <dd className="inline">{m.source}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-ink-secondary">Limitations: </dt>
                  <dd className="inline">{m.limitations}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
