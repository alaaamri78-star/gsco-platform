"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ResilienceScore } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";

function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; name: string; payload: ResilienceScore }[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-panel-raised px-3 py-2.5 shadow-xl">
      <p className="text-xs font-medium text-ink-primary">{row.dimension}</p>
      <p className="mt-1 font-mono text-xs text-ink-secondary">Client: {row.clientScore}/100</p>
      <p className="font-mono text-xs text-ink-muted">Peer benchmark: {row.peerBenchmark}/100</p>
    </div>
  );
}

export function ResilienceRadar({ scores }: { scores: ResilienceScore[] }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <h3 className="text-sm font-medium text-ink-primary">Maturity vs. anonymised peer benchmark</h3>
      <p className="text-xs text-ink-muted">5 dimensions &middot; 0-100 scale</p>
      <div className="mt-2 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={scores} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
            <PolarGrid stroke={CHART_CHROME.gridline} />
            <PolarAngleAxis dataKey="dimension" tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fill: CHART_CHROME.textMuted, fontSize: 10 }} axisLine={false} />
            <Tooltip content={<RadarTooltip />} />
            <Radar
              name="Peer benchmark"
              dataKey="peerBenchmark"
              stroke="#71717a"
              fill="#71717a"
              fillOpacity={0.15}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Radar
              name="Your score"
              dataKey="clientScore"
              stroke={CATEGORICAL.redSea}
              fill={CATEGORICAL.redSea}
              fillOpacity={0.25}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: CHART_CHROME.textSecondary }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
