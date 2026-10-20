"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";
import { cn, formatShortDate } from "@/lib/utils";

const TOPICS: { key: keyof TrendPoint; color: string }[] = [
  { key: "Red Sea rerouting", color: CATEGORICAL.redSea },
  { key: "EU carbon tariff (CBAM)", color: CATEGORICAL.cbam },
  { key: "Rare earth export curbs", color: CATEGORICAL.rareEarth },
];

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-panel-raised px-3 py-2.5 shadow-xl">
      <p className="font-mono text-xs text-ink-muted">{label && formatShortDate(label)}</p>
      <ul className="mt-1.5 space-y-1">
        {payload.map((p) => (
          <li key={p.dataKey} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-ink-secondary">{p.dataKey}</span>
            <span className="ml-auto font-mono font-medium text-ink-primary">
              {p.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const [active, setActive] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">
            Weak-signal volume
          </h3>
          <p className="text-xs text-ink-muted">Trailing 56 days · all tracked topics, aggregate</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const on = active.has(t.key as string);
            return (
              <button
                key={t.key as string}
                onClick={() => toggle(t.key as string)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
                  on
                    ? "border-transparent bg-white/[0.06] text-ink-primary"
                    : "border-border text-ink-muted hover:text-ink-secondary"
                )}
                aria-pressed={on}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: on ? t.color : "#52525b" }}
                />
                {t.key as string}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="totalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CATEGORICAL.redSea} stopOpacity={0.28} />
                <stop offset="100%" stopColor={CATEGORICAL.redSea} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={CHART_CHROME.gridline}
              strokeDasharray="0"
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatShortDate}
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={{ stroke: CHART_CHROME.axis }}
              tickLine={false}
              minTickGap={32}
            />
            <YAxis
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHART_CHROME.axis }} />
            <Area
              type="monotone"
              dataKey="total"
              name="Total (all topics)"
              stroke={CATEGORICAL.redSea}
              strokeWidth={2}
              fill="url(#totalFill)"
              isAnimationActive={false}
            />
            {TOPICS.filter((t) => active.has(t.key as string)).map((t) => (
              <Line
                key={t.key as string}
                type="monotone"
                dataKey={t.key as string}
                name={t.key as string}
                stroke={t.color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
