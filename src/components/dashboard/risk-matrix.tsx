"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import type { Criticality, RiskItem } from "@/lib/types";
import { CHART_CHROME, STATUS } from "@/lib/colors";
import { formatCompactUsd } from "@/lib/utils";

const LEVELS: Criticality[] = ["Low", "Medium", "Critical"];

function RiskTooltip({ active, payload }: { active?: boolean; payload?: { payload: RiskItem }[] }) {
  if (!active || !payload?.length) return null;
  const r = payload[0].payload;
  return (
    <div className="max-w-[260px] rounded-lg border border-border bg-panel-raised px-3 py-2.5 shadow-xl">
      <p className="text-xs font-medium leading-snug text-ink-primary">{r.label}</p>
      <p className="mt-1 text-[11px] text-ink-muted">
        {r.domain} · {r.sector} · {r.region}
      </p>
      <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[11px] text-ink-secondary">
        <span>Impact {r.impact}/10</span>
        <span>P {r.probability}%</span>
        <span>{formatCompactUsd(r.exposureUsdM)}</span>
      </div>
    </div>
  );
}

export function RiskMatrix({ items }: { items: RiskItem[] }) {
  const byLevel = LEVELS.map((level) => ({
    level,
    color: STATUS[level],
    data: items.filter((i) => i.criticality === level),
  }));

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <h3 className="text-sm font-medium text-ink-primary">Risk &amp; threat matrix</h3>
      <p className="text-xs text-ink-muted">
        Impact vs. probability · bubble size = estimated exposure
      </p>

      <div className="mt-4 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 16, left: -8, bottom: 8 }}>
            <CartesianGrid stroke={CHART_CHROME.gridline} />
            <XAxis
              type="number"
              dataKey="probability"
              name="Probability"
              unit="%"
              domain={[0, 100]}
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={{ stroke: CHART_CHROME.axis }}
              tickLine={false}
              label={{
                value: "Probability (%)",
                position: "insideBottom",
                offset: -4,
                fill: CHART_CHROME.textMuted,
                fontSize: 11,
              }}
            />
            <YAxis
              type="number"
              dataKey="impact"
              name="Impact"
              domain={[0, 10]}
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={{ stroke: CHART_CHROME.axis }}
              tickLine={false}
              width={70}
              label={{
                value: "Impact (1–10)",
                angle: -90,
                position: "insideLeft",
                fill: CHART_CHROME.textMuted,
                fontSize: 11,
              }}
            />
            <ZAxis type="number" dataKey="exposureUsdM" range={[80, 560]} />
            <Tooltip content={<RiskTooltip />} cursor={{ strokeDasharray: "3 3", stroke: CHART_CHROME.axis }} />
            {byLevel.map((g) => (
              <Scatter
                key={g.level}
                name={g.level}
                data={g.data}
                fill={g.color}
                fillOpacity={0.75}
                stroke="#09090b"
                strokeWidth={2}
                isAnimationActive={false}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend — icon + label pairing is mandatory here: the status reds/greens
          fail CVD separation in isolation (see lib/colors.ts), so hue never
          carries meaning alone. */}
      <div className="mt-3 flex items-center gap-5 border-t border-border-subtle pt-3">
        {byLevel.map((g) => (
          <div key={g.level} className="flex items-center gap-1.5 text-xs text-ink-secondary">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: g.color }} />
            {g.level}
            <span className="text-ink-muted">({g.data.length})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
