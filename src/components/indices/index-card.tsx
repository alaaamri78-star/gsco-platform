"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import type { IndexSeries } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";
import { TierBadge } from "@/components/ui/badge";
import { formatShortDate } from "@/lib/utils";

function SparkTooltip({
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
    <div className="rounded-lg border border-border bg-panel-raised px-3 py-2 shadow-xl">
      <p className="font-mono text-[11px] text-ink-muted">{label && formatShortDate(label)}</p>
      <p className="mt-0.5 font-mono text-xs font-medium text-ink-primary">{payload[0].value}/100</p>
    </div>
  );
}

export function IndexCard({ index }: { index: IndexSeries }) {
  const latest = index.history[index.history.length - 1]?.value ?? 0;
  const first = index.history[0]?.value ?? 0;
  const delta = latest - first;

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">{index.name}</h3>
          <p className="mt-1 text-xs text-ink-muted">{index.frequency}</p>
        </div>
        <TierBadge tier={index.tier} />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-secondary">{index.description}</p>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xl font-semibold text-ink-primary">{latest}</p>
          <p className={`text-xs font-medium ${delta >= 0 ? "text-status-critical" : "text-status-good"}`}>
            {delta >= 0 ? "+" : ""}
            {delta} over period
          </p>
        </div>
        <div className="h-[48px] w-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={index.history} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
              <Tooltip content={<SparkTooltip />} cursor={{ stroke: CHART_CHROME.axis }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={CATEGORICAL.redSea}
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
