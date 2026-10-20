"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AlertOutcome, AlertOutcomeLog } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";

const OUTCOMES: AlertOutcome[] = ["Disruption avoided", "Impact mitigated", "Monitoring", "No action needed"];

interface OutcomeCount {
  outcome: AlertOutcome;
  count: number;
}

function OutcomeTooltip({ active, payload }: { active?: boolean; payload?: { value: number; payload: OutcomeCount }[] }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-panel-raised px-3 py-2.5 shadow-xl">
      <p className="text-xs font-medium text-ink-primary">{row.outcome}</p>
      <p className="mt-1 font-mono text-sm text-ink-secondary">{row.count} alert{row.count === 1 ? "" : "s"}</p>
    </div>
  );
}

export function OutcomeChart({ outcomes }: { outcomes: AlertOutcomeLog[] }) {
  const data: OutcomeCount[] = OUTCOMES.map((o) => ({
    outcome: o,
    count: outcomes.filter((x) => x.outcome === o).length,
  }));

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <h3 className="text-sm font-medium text-ink-primary">Outcome breakdown</h3>
      <p className="text-xs text-ink-muted">How this client&apos;s alerts were resolved</p>
      <div className="mt-4 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} strokeDasharray="0" />
            <XAxis
              dataKey="outcome"
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 10.5 }}
              axisLine={{ stroke: CHART_CHROME.axis }}
              tickLine={false}
              interval={0}
            />
            <YAxis tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
            <Tooltip content={<OutcomeTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="count" name="Alerts" fill={CATEGORICAL.redSea} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
