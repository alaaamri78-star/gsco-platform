import { Minus, Plane, Ship, TrainFront, Truck, type LucideIcon } from "lucide-react";
import type { Corridor, LanePerformance } from "@/lib/types";
import { CriticalityBadge } from "@/components/ui/badge";
import { riskLevelFromScore } from "@/lib/utils";

const MODE_ICON: Record<Corridor["mode"], LucideIcon> = {
  Ocean: Ship,
  Air: Plane,
  Rail: TrainFront,
  Road: Truck,
};

export interface Row {
  corridor: Corridor;
  perf: LanePerformance;
}

export function LanePerformanceTable({ rows }: { rows: Row[] }) {
  const sorted = [...rows].sort((a, b) => a.perf.otifPct - b.perf.otifPct);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs text-ink-muted">
              <th className="px-4 py-3 font-medium">Lane</th>
              <th className="px-4 py-3 font-medium">Mode</th>
              <th className="px-4 py-3 text-right font-medium">OTIF</th>
              <th className="px-4 py-3 text-right font-medium">Rate index &Delta;</th>
              <th className="px-4 py-3 text-right font-medium">Capacity util.</th>
              <th className="px-4 py-3 text-right font-medium">Risk score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {sorted.map(({ corridor: c, perf: p }) => {
              const ModeIcon = MODE_ICON[c.mode];
              return (
                <tr key={c.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium text-ink-primary">{c.name}</td>
                  <td className="px-4 py-3 text-ink-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <ModeIcon className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2} />
                      {c.mode}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-ink-secondary">{p.otifPct}%</td>
                  <td className="px-4 py-3 text-right font-mono text-ink-secondary">
                    {p.rateIndexDelta === 0 ? (
                      <Minus className="ml-auto h-3 w-3 text-ink-muted" strokeWidth={2.5} />
                    ) : (
                      <span className={p.rateIndexDelta > 0 ? "text-status-critical" : "text-status-good"}>
                        {p.rateIndexDelta > 0 ? "+" : ""}
                        {p.rateIndexDelta}%
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-ink-secondary">{p.capacityUtilizationPct}%</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2.5">
                      <span className="font-mono text-ink-primary">{c.riskScore}</span>
                      <CriticalityBadge level={riskLevelFromScore(c.riskScore)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
