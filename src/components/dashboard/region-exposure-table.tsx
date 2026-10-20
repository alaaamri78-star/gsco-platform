import type { Region, RiskItem } from "@/lib/types";
import { REGIONS } from "@/lib/types";
import { formatCompactUsd } from "@/lib/utils";

interface RegionRow {
  region: Region;
  count: number;
  mediumCritical: number;
  exposure: number;
}

export function RegionExposureTable({ items }: { items: RiskItem[] }) {
  const rows: RegionRow[] = REGIONS.map((region) => {
    const regionItems = items.filter((r) => r.region === region);
    return {
      region,
      count: regionItems.length,
      mediumCritical: regionItems.filter((r) => r.criticality === "Medium" || r.criticality === "Critical").length,
      exposure: regionItems.reduce((s, r) => s + r.exposureUsdM, 0),
    };
  })
    .filter((r) => r.count > 0)
    .sort((a, b) => b.exposure - a.exposure);

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <h3 className="text-sm font-medium text-ink-primary">Exposure by region</h3>
      <p className="mt-1 text-xs text-ink-muted">
        Ranked by estimated exposure, within the active filters. GSCI does not yet track a
        per-region exposure history — only the global exposure trend charted above — so a
        period-over-period change isn&apos;t shown here rather than estimated.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-ink-muted">
              <th className="py-2 pr-3 font-medium">Region</th>
              <th className="py-2 pr-3 font-medium">Monitored risks</th>
              <th className="py-2 pr-3 font-medium">Medium + Critical</th>
              <th className="py-2 pr-0 font-medium">Est. exposure</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {rows.map((r) => (
              <tr key={r.region}>
                <td className="py-2.5 pr-3 text-[13px] text-ink-primary">{r.region}</td>
                <td className="py-2.5 pr-3 font-mono text-ink-secondary">{r.count}</td>
                <td className="py-2.5 pr-3 font-mono text-ink-secondary">{r.mediumCritical}</td>
                <td className="py-2.5 pr-0 font-mono font-medium text-ink-primary">
                  {formatCompactUsd(r.exposure)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-ink-muted">
                  No risks match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
