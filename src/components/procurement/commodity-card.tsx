"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CommodityPrice } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";
import { TagBadge } from "@/components/ui/badge";
import { formatShortDate } from "@/lib/utils";

function SparkTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  unit: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-panel-raised px-3 py-2 shadow-xl">
      <p className="font-mono text-[11px] text-ink-muted">{label && formatShortDate(label)}</p>
      <p className="mt-0.5 font-mono text-xs font-medium text-ink-primary">
        {payload[0].value} {unit}
      </p>
    </div>
  );
}

export function CommodityCard({ commodity }: { commodity: CommodityPrice }) {
  const latest = commodity.history[commodity.history.length - 1]?.value ?? 0;
  const first = commodity.history[0]?.value ?? 0;
  const changePct = first !== 0 ? Math.round(((latest - first) / first) * 1000) / 10 : 0;

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
          <p className={`text-xs font-medium ${changePct >= 0 ? "text-status-critical" : "text-status-good"}`}>
            {changePct >= 0 ? "+" : ""}
            {changePct}% over period
          </p>
        </div>
        <div className="h-[48px] w-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={commodity.history} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
              <Tooltip content={<SparkTooltip unit={commodity.unit} />} cursor={{ stroke: CHART_CHROME.axis }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={CATEGORICAL.cbam}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
