import { Minus, Plane, Ship, TrainFront, TrendingDown, TrendingUp, Truck, type LucideIcon } from "lucide-react";
import type { Corridor, CorridorTrend } from "@/lib/types";
import { CriticalityBadge } from "@/components/ui/badge";
import { riskLevelFromScore } from "@/lib/utils";

const MODE_ICON: Record<Corridor["mode"], LucideIcon> = {
  Ocean: Ship,
  Air: Plane,
  Rail: TrainFront,
  Road: Truck,
};

const TREND_CONFIG: Record<CorridorTrend, { icon: LucideIcon; className: string }> = {
  Up: { icon: TrendingUp, className: "text-status-critical" },
  Down: { icon: TrendingDown, className: "text-status-good" },
  Flat: { icon: Minus, className: "text-ink-muted" },
};

export function CorridorTable({ items }: { items: Corridor[] }) {
  const sorted = [...items].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs text-ink-muted">
              <th className="px-4 py-3 font-medium">Lane</th>
              <th className="px-4 py-3 font-medium">Mode</th>
              <th className="px-4 py-3 font-medium">Sector</th>
              <th className="px-4 py-3 text-right font-medium">Transit</th>
              <th className="px-4 py-3 text-right font-medium">Volume share</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Risk score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {sorted.map((c) => {
              const ModeIcon = MODE_ICON[c.mode];
              const trend = TREND_CONFIG[c.riskTrend];
              const TrendIcon = trend.icon;
              return (
                <tr key={c.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium text-ink-primary">{c.name}</td>
                  <td className="px-4 py-3 text-ink-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <ModeIcon className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2} />
                      {c.mode}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-secondary">{c.sector}</td>
                  <td className="px-4 py-3 text-right font-mono text-ink-secondary">{c.transitDays}d</td>
                  <td className="px-4 py-3 text-right font-mono text-ink-secondary">{c.volumeSharePct}%</td>
                  <td className="px-4 py-3 text-ink-secondary">{c.statusNote}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2.5">
                      <TrendIcon className={`h-3.5 w-3.5 ${trend.className}`} strokeWidth={2.5} />
                      <span className="font-mono text-ink-primary">{c.riskScore}</span>
                      <CriticalityBadge level={riskLevelFromScore(c.riskScore)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-ink-muted">
                  No corridors match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
