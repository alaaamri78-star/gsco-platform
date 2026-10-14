"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MapPin } from "lucide-react";
import type { NearshoreScore } from "@/lib/types";
import { CATEGORICAL, CHART_CHROME } from "@/lib/colors";

const DIMENSIONS: { key: keyof Omit<NearshoreScore, "geography" | "composite">; label: string }[] = [
  { key: "proximity", label: "Proximity to EU/US demand centers" },
  { key: "laborCost", label: "Labor cost competitiveness" },
  { key: "tradeAccess", label: "Trade-agreement access" },
  { key: "stability", label: "Political & regulatory stability" },
  { key: "infrastructure", label: "Logistics & port infrastructure maturity" },
];

function CompositeTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: NearshoreScore }[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-panel-raised px-3 py-2.5 shadow-xl">
      <p className="text-xs font-medium text-ink-primary">{row.geography}</p>
      <p className="mt-1 font-mono text-sm text-ink-secondary">{row.composite}/100 composite</p>
    </div>
  );
}

export function NearshoreComparison({ scores }: { scores: NearshoreScore[] }) {
  const sorted = [...scores].sort((a, b) => b.composite - a.composite);
  const morocco = scores.find((s) => s.geography === "Morocco");

  return (
    <div className="rounded-xl border border-border bg-panel p-5 lg:p-6">
      <div className="max-w-2xl">
        <h3 className="text-sm font-medium text-ink-primary">Near-shoring Attractiveness Index</h3>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          4-geography comparison across 5 GSCI analyst dimensions — how attractive each near-shoring
          destination is relative to EU/US demand centers right now.
        </p>
      </div>

      <div className="mt-5 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} strokeDasharray="0" />
            <XAxis
              dataKey="geography"
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={{ stroke: CHART_CHROME.axis }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: CHART_CHROME.textMuted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<CompositeTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="composite" name="Composite" fill={CATEGORICAL.redSea} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-border-subtle">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-left text-xs text-ink-muted">
                <th className="px-3 py-2.5 font-medium">Geography</th>
                {DIMENSIONS.map((d) => (
                  <th key={d.key} className="px-3 py-2.5 text-right font-medium">
                    {d.label}
                  </th>
                ))}
                <th className="px-3 py-2.5 text-right font-medium">Composite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {sorted.map((s) => (
                <tr key={s.geography} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5 font-medium text-ink-primary">{s.geography}</td>
                  {DIMENSIONS.map((d) => (
                    <td key={d.key} className="px-3 py-2.5 text-right font-mono text-ink-secondary">
                      {s[d.key]}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right font-mono font-medium text-ink-primary">{s.composite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {morocco && (
        <div className="mt-5 flex gap-3 rounded-lg border-l-2 border-signal-amber/40 bg-white/[0.02] px-4 py-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-signal-amber" strokeWidth={2} />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-signal-amber">
              Spotlight: Morocco
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-secondary">
              Morocco doesn&apos;t lead the composite, but it makes its case on specifics: Tanger Med
              sits within 14km of Spain, giving the shortest EU crossing of the four, and its EU
              Association Agreement plus US free-trade agreement give it the broadest tariff-free
              market access in this comparison — a structural argument for near-shoring investment
              even without the top overall score.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
