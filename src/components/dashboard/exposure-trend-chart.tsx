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
import type { ExposurePoint } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";
import { formatCompactUsd, formatShortDate } from "@/lib/utils";

function ExposureTooltip({
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
      <p className="mt-1 font-mono text-sm font-medium text-ink-primary">
        {formatCompactUsd(payload[0].value)} tracked
      </p>
    </div>
  );
}

export function ExposureTrendChart({ data }: { data: ExposurePoint[] }) {
  const latest = data[data.length - 1]?.exposureUsdM ?? 0;
  const first = data[0]?.exposureUsdM ?? 0;
  const deltaPct = first > 0 ? Math.round(((latest - first) / first) * 100) : 0;

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">Exposure trend</h3>
          <p className="text-xs text-ink-muted">Trailing 56 days · total USD exposure across tracked risks</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-semibold text-ink-primary">{formatCompactUsd(latest)}</p>
          <p className={`text-xs font-medium ${deltaPct >= 0 ? "text-status-critical" : "text-status-good"}`}>
            {deltaPct >= 0 ? "+" : ""}
            {deltaPct}% over period
          </p>
        </div>
      </div>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="exposureFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CATEGORICAL.cbam} stopOpacity={0.3} />
                <stop offset="100%" stopColor={CATEGORICAL.cbam} stopOpacity={0} />
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
              tickFormatter={(v: number) => formatCompactUsd(v)}
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip content={<ExposureTooltip />} cursor={{ stroke: CHART_CHROME.axis }} />
            <Area
              type="monotone"
              dataKey="exposureUsdM"
              name="Exposure"
              stroke={CATEGORICAL.cbam}
              strokeWidth={2}
              fill="url(#exposureFill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
