import { TrendingDown, TrendingUp } from "lucide-react";
import type { CommodityPrice, Corridor, IndexSeries, Supplier } from "@/lib/types";
import { riskLevelFromScore } from "@/lib/utils";

/** Population standard deviation of trailing daily % price changes, as a %.
 *  The same volatility definition used by the Commodity volatility KPI tile. */
function dailyReturnVolatilityPct(history: { date: string; value: number }[]): number {
  if (history.length < 2) return 0;
  const returns: number[] = [];
  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1].value;
    if (prev !== 0) returns.push((history[i].value - prev) / prev);
  }
  if (returns.length === 0) return 0;
  const mean = returns.reduce((s, v) => s + v, 0) / returns.length;
  const variance = returns.reduce((s, v) => s + (v - mean) ** 2, 0) / returns.length;
  return Math.sqrt(variance) * 100;
}

export function MarketIntelligence({
  corridors,
  commodities,
  suppliers,
  portIndex,
}: {
  corridors: Corridor[];
  commodities: CommodityPrice[];
  suppliers: Supplier[];
  portIndex: IndexSeries | undefined;
}) {
  const topCorridors = [...corridors].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
  const portHistory = portIndex?.history ?? [];
  const portLatest = portHistory[portHistory.length - 1]?.value ?? null;
  const portPrev = portHistory[portHistory.length - 2]?.value ?? null;

  const singleSourceCount = suppliers.filter((s) => s.singleSource).length;
  const criticalSupplierCount = suppliers.filter((s) => riskLevelFromScore(s.riskScore) === "Critical").length;

  return (
    <div>
      <h2 className="text-sm font-medium text-ink-primary">Trade, logistics &amp; commodity intelligence</h2>
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-panel p-5">
          <h3 className="text-sm font-medium text-ink-primary">Corridor watch</h3>
          <p className="mt-1 text-xs text-ink-muted">
            Top tracked corridors by GSCI risk score, within the active sector/region filters.
          </p>
          <ul className="mt-3 divide-y divide-border-subtle">
            {topCorridors.map((c) => (
              <li key={c.id} className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-[13px] leading-snug text-ink-primary">{c.name}</p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">
                    {c.mode} · {c.transitDays}d transit · {c.statusNote}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-sm font-medium text-ink-primary">{c.riskScore}/100</p>
                  <p className="text-[11px] text-ink-muted">{c.riskTrend}</p>
                </div>
              </li>
            ))}
            {topCorridors.length === 0 && (
              <li className="py-6 text-center text-sm text-ink-muted">No corridors match these filters.</li>
            )}
          </ul>
          {portLatest !== null && (
            <p className="mt-3 border-t border-border-subtle pt-3 text-xs text-ink-muted">
              Port Performance Index (throughput/dwell-time benchmark, global — a congestion proxy,
              not per-port data):{" "}
              <span className="font-mono text-ink-secondary">{portLatest}/100</span>
              {portPrev !== null && (
                <> ({portLatest >= portPrev ? "+" : ""}{Math.round((portLatest - portPrev) * 10) / 10} pts vs prior week)</>
              )}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-panel p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-medium text-ink-primary">Commodity price trends</h3>
              <p className="mt-1 text-xs text-ink-muted">
                Trailing 56-day window, sector-filtered. Volatility = standard deviation of daily %
                price changes. Each commodity&apos;s latest value is anchored to its real quote
                (GSCI&apos;s additional source for this tracker).
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-border-subtle px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
              {commodities.length} of 53 tracked
            </span>
          </div>
          <div className="mt-3 max-h-80 overflow-y-auto overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-panel">
                <tr className="border-b border-border-subtle text-xs text-ink-muted">
                  <th className="py-1.5 pr-3 font-medium">Commodity</th>
                  <th className="py-1.5 pr-3 font-medium">Latest</th>
                  <th className="py-1.5 pr-3 font-medium">Period change</th>
                  <th className="py-1.5 pr-0 font-medium">Volatility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {commodities.map((c) => {
                  const first = c.history[0]?.value ?? 0;
                  const latest = c.history[c.history.length - 1]?.value ?? 0;
                  const changePct = first !== 0 ? ((latest - first) / first) * 100 : 0;
                  const vol = dailyReturnVolatilityPct(c.history);
                  return (
                    <tr key={c.id}>
                      <td className="py-2 pr-3 text-[13px] text-ink-primary">{c.name}</td>
                      <td className="py-2 pr-3 font-mono text-ink-secondary">
                        {latest.toFixed(2)} {c.unit}
                      </td>
                      <td
                        className={`py-2 pr-3 font-mono ${changePct >= 0 ? "text-status-critical" : "text-status-good"}`}
                      >
                        <span className="inline-flex items-center gap-1">
                          {changePct >= 0 ? (
                            <TrendingUp className="h-3 w-3 shrink-0" aria-hidden="true" />
                          ) : (
                            <TrendingDown className="h-3 w-3 shrink-0" aria-hidden="true" />
                          )}
                          {changePct >= 0 ? "+" : ""}
                          {changePct.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-2 pr-0 font-mono text-ink-secondary">{vol.toFixed(1)}%</td>
                    </tr>
                  );
                })}
                {commodities.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-sm text-ink-muted">
                      No commodities match this sector filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 border-t border-border-subtle pt-3 text-xs text-ink-muted">
            Single-source suppliers:{" "}
            <span className="font-mono text-ink-secondary">{singleSourceCount}</span> of{" "}
            {suppliers.length} tracked · Critical-risk suppliers:{" "}
            <span className="font-mono text-ink-secondary">{criticalSupplierCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
