import type { RiskItem } from "@/lib/types";
import { CriticalityBadge, TagBadge } from "@/components/ui/badge";
import { formatCompactUsd } from "@/lib/utils";

export function TopRisksList({ items }: { items: RiskItem[] }) {
  const top10 = [...items].sort((a, b) => b.exposureUsdM - a.exposureUsdM).slice(0, 10);

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <h3 className="text-sm font-medium text-ink-primary">Top 10 risks</h3>
      <p className="text-xs text-ink-muted">Ranked by estimated exposure · board-level view</p>

      <ol className="mt-4 divide-y divide-border-subtle">
        {top10.map((r, i) => (
          <li key={r.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.04] font-mono text-[11px] font-medium text-ink-muted">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] leading-snug text-ink-primary">{r.label}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <CriticalityBadge level={r.criticality} />
                <TagBadge>{r.sector}</TagBadge>
                <TagBadge>{r.region}</TagBadge>
              </div>
            </div>
            <span className="shrink-0 font-mono text-sm font-medium tabular-nums text-ink-primary">
              {formatCompactUsd(r.exposureUsdM)}
            </span>
          </li>
        ))}
        {top10.length === 0 && (
          <li className="py-8 text-center text-sm text-ink-muted">
            No risks match these filters. Try widening sector or region.
          </li>
        )}
      </ol>
    </div>
  );
}
