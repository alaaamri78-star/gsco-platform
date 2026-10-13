"use client";

import { useMemo } from "react";
import { Gauge, PercentCircle, TrendingUp } from "lucide-react";
import { CORRIDORS, INDICES, LANE_PERFORMANCE } from "@/lib/mock-data";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { STATUS } from "@/lib/colors";
import { FreightIndexChart } from "./freight-index-chart";
import { LanePerformanceTable, type Row } from "./lane-performance-table";

export function LogisticsClient() {
  const rows = useMemo(() => {
    const out: Row[] = [];
    for (const perf of LANE_PERFORMANCE) {
      const corridor = CORRIDORS.find((c) => c.id === perf.corridorId);
      if (corridor) out.push({ corridor, perf });
    }
    return out;
  }, []);

  const avgOtif = Math.round(rows.reduce((s, r) => s + r.perf.otifPct, 0) / rows.length);
  const avgCapacity = Math.round(rows.reduce((s, r) => s + r.perf.capacityUtilizationPct, 0) / rows.length);
  const worseningCount = rows.filter((r) => r.corridor.riskTrend === "Up").length;
  const freightIndex = INDICES.find((i) => i.id === "idx6");

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Logistics Performance
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Freight rates, transit-time reliability, and capacity across this client&apos;s own trade
          lanes &mdash; the same lanes tracked on the Corridor Risk Scores page.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile label="Avg. OTIF" value={`${avgOtif}%`} icon={PercentCircle} accent="#3987e5" />
        <KpiTile label="Avg. capacity utilization" value={`${avgCapacity}%`} icon={Gauge} accent="#3987e5" />
        <KpiTile label="Lanes worsening" value={String(worseningCount)} icon={TrendingUp} accent={STATUS.Medium} />
        <KpiTile
          label="Freight Volatility Index"
          value={freightIndex ? String(freightIndex.history[freightIndex.history.length - 1].value) : "–"}
          icon={TrendingUp}
          accent={STATUS.Critical}
        />
      </div>

      {freightIndex && (
        <div className="mt-6">
          <FreightIndexChart index={freightIndex} />
        </div>
      )}

      <h2 className="mt-8 text-sm font-medium text-ink-primary">Lane performance</h2>
      <div className="mt-4">
        <LanePerformanceTable rows={rows} />
      </div>
    </div>
  );
}
