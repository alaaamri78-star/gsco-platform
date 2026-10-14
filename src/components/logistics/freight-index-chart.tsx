"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { IndexSeries } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";
import { formatShortDate } from "@/lib/utils";

function FreightTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-panel-raised px-3 py-2.5 shadow-xl">
      <p className="font-mono text-xs text-ink-muted">{label && formatShortDate(label)}</p>
      <p className="mt-1 font-mono text-sm font-medium text-ink-primary">{payload[0].value}/100</p>
    </div>
  );
}

/** Reuses the Proprietary Indices page's Freight Volatility Index history
 *  (idx6) as this dashboard's headline trend chart, rather than a separate
 *  estimate — the same aggregate figure, in context for a logistics team. */
export function FreightIndexChart({ index }: { index: IndexSeries }) {
  const data = index.history;
  const latest = data[data.length - 1]?.value ?? 0;
  const first = data[0]?.value ?? 0;
  const delta = latest - first;

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">Freight Volatility Index</h3>
          <p className="text-xs text-ink-muted">Trailing 12 periods &middot; rate &amp; capacity volatility across modes</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-semibold text-ink-primary">{latest}</p>
          <p className={`text-xs font-medium ${delta >= 0 ? "text-status-critical" : "text-status-good"}`}>
            {delta >= 0 ? "+" : ""}
            {delta} over period
          </p>
        </div>
      </div>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="freightFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CATEGORICAL.redSea} stopOpacity={0.3} />
                <stop offset="100%" stopColor={CATEGORICAL.redSea} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} strokeDasharray="0" />
            <XAxis
              dataKey="date"
              tickFormatter={formatShortDate}
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={{ stroke: CHART_CHROME.axis }}
              tickLine={false}
              minTickGap={32}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<FreightTooltip />} cursor={{ stroke: CHART_CHROME.axis }} />
            <Area
              type="monotone"
              dataKey="value"
              name="Freight Volatility Index"
              stroke={CATEGORICAL.redSea}
              strokeWidth={2}
              fill="url(#freightFill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
