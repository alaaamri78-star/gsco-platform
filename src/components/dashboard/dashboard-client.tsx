"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, CircleAlert, Wallet } from "lucide-react";
import { KpiTile } from "./kpi-tile";
import { ExposureTrendChart } from "./exposure-trend-chart";
import { TopRisksList } from "./top-risks-list";
import { ActionsTracker } from "./actions-tracker";
import { ACTION_ITEMS, EXPOSURE_TREND, RISK_ITEMS } from "@/lib/mock-data";
import { REGIONS, SECTORS, type Region, type Sector } from "@/lib/types";
import { formatCompactUsd } from "@/lib/utils";
import { STATUS } from "@/lib/colors";

export function DashboardClient() {
  const [sector, setSector] = useState<Sector | "All">("All");
  const [region, setRegion] = useState<Region | "All">("All");

  const filteredRisks = useMemo(
    () =>
      RISK_ITEMS.filter(
        (r) => (sector === "All" || r.sector === sector) && (region === "All" || r.region === region)
      ),
    [sector, region]
  );

  const filteredRiskIds = useMemo(() => new Set(filteredRisks.map((r) => r.id)), [filteredRisks]);
  const filteredActions = useMemo(
    () => ACTION_ITEMS.filter((a) => filteredRiskIds.has(a.riskId)),
    [filteredRiskIds]
  );

  const criticalCount = filteredRisks.filter((r) => r.criticality === "Critical").length;
  const totalExposure = filteredRisks.reduce((sum, r) => sum + r.exposureUsdM, 0);
  const openActions = filteredActions.filter((a) => a.status === "Open").length;
  const closedActions = filteredActions.filter((a) => a.status === "Closed").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Global Supply Chain Intelligence Console
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-secondary">
          An overview of selected developments affecting global supply chains. Explore risk
          indicators, monitor relevant alerts and review exposure and mitigation status across
          sector and region. Use these indicators as decision-support information — their
          interpretation depends on the underlying sources, reporting periods and methodology.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-panel p-3">
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile
          label="Exposure tracked"
          value={formatCompactUsd(totalExposure)}
          icon={Wallet}
          accent="#d95926"
        />
        <KpiTile
          label="Critical risks"
          value={String(criticalCount)}
          icon={AlertTriangle}
          accent={STATUS.Critical}
        />
        <KpiTile label="Actions open" value={String(openActions)} icon={CircleAlert} accent={STATUS.Medium} />
        <KpiTile
          label="Actions closed"
          value={String(closedActions)}
          icon={CheckCircle2}
          accent={STATUS.Low}
        />
      </div>

      <ExposureTrendChart data={EXPOSURE_TREND} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TopRisksList items={filteredRisks} />
        <ActionsTracker items={filteredActions} risks={filteredRisks} />
      </div>
    </div>
  );
}
