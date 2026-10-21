"use client";

import { useMemo, useState } from "react";
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

const WINDOWS = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "All (56D)", days: 56 },
] as const;

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
  const [windowDays, setWindowDays] = useState<number>(56);

  const windowed = useMemo(() => data.slice(-windowDays), [data, windowDays]);

  const latest = windowed[windowed.length - 1]?.exposureUsdM ?? 0;
  const first = windowed[0]?.exposureUsdM ?? 0;
  const deltaPct = first > 0 ? Math.round(((latest - first) / first) * 100) : 0;
  const cutoffDate = data[data.length - 1]?.date ?? "";
  const baselineDate = windowed[0]?.date ?? "";

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">Exposure trend</h3>
          <p className="text-xs text-ink-muted">
            Estimated total USD exposure across tracked risks · data through{" "}
            {formatShortDate(cutoffDate)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-semibold text-ink-primary">{formatCompactUsd(latest)}</p>
          <p className={`text-xs font-medium ${deltaPct >= 0 ? "text-status-critical" : "text-status-good"}`}>
            {deltaPct >= 0 ? "+" : ""}
            {deltaPct}% vs {formatShortDate(baselineDate)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-1 rounded-lg border border-border bg-panel-raised p-1 w-fit">
        {WINDOWS.map((w) => (
          <button
            key={w.label}
            onClick={() => setWindowDays(w.days)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              windowDays === w.days ? "bg-white/[0.08] text-ink-primary" : "text-ink-muted hover:text-ink-secondary"
            }`}
            aria-pressed={windowDays === w.days}
          >
            {w.label}
          </button>
        ))}
      </div>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={windowed} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
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
              width={56}
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

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        <strong className="font-medium text-ink-secondary">Estimated exposure</strong> is the sum of
        each tracked risk item&apos;s GSCI analyst-estimated USD exposure — a modeled potential
        impact, not a confirmed, audited or company-specific financial loss. The series does not
        currently model correlation or overlap between individual risks; each is estimated and
        summed independently, so concurrent, related events are not discounted for shared
        causes. The % change compares the selected window&apos;s first and last reading, not a
        fixed calendar baseline. Full series runs {formatShortDate(data[0]?.date ?? "")} –{" "}
        {formatShortDate(cutoffDate)} (56 days, deterministic GSCI model, not a live feed).
      </p>
    </div>
  );
}
