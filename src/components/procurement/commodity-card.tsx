"use client";

import type { CommodityPrice } from "@/lib/types";
import { TagBadge } from "@/components/ui/badge";

/** Solid directional triangle — replaces the per-commodity sparkline with a
 *  single bold up/down signal. Follows GSCI's existing commodity color
 *  convention: a price increase is cost risk (red), a decrease is
 *  favorable (green) — the same semantics as the trend arrow and the
 *  Period change column elsewhere on this page and the dashboard. */
function TrendTriangle({ up }: { up: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={up ? "h-9 w-9 text-status-critical" : "h-9 w-9 rotate-180 text-status-good"}
      aria-hidden="true"
    >
      <polygon points="12,3 22,20 2,20" fill="currentColor" />
    </svg>
  );
}

export function CommodityCard({ commodity }: { commodity: CommodityPrice }) {
  const latest = commodity.history[commodity.history.length - 1]?.value ?? 0;
  const first = commodity.history[0]?.value ?? 0;
  const changePct = first !== 0 ? Math.round(((latest - first) / first) * 1000) / 10 : 0;
  const up = changePct >= 0;

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">{commodity.name}</h3>
          <p className="mt-1 text-xs text-ink-muted">{commodity.unit}</p>
        </div>
        <TagBadge>{commodity.sector}</TagBadge>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xl font-semibold text-ink-primary">{latest}</p>
          <p className={`text-xs font-medium ${up ? "text-status-critical" : "text-status-good"}`}>
            {up ? "+" : ""}
            {changePct}% over period
          </p>
        </div>
        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center" title={`${up ? "Up" : "Down"} ${Math.abs(changePct)}% over period`}>
          <TrendTriangle up={up} />
        </div>
      </div>
    </div>
  );
}
