"use client";

import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import type { Criticality, Supplier } from "@/lib/types";
import { STATUS } from "@/lib/colors";
import { riskLevelFromScore } from "@/lib/utils";

const LEVELS: Criticality[] = ["Low", "Medium", "Critical"];

function SupplierTooltip({ active, payload }: { active?: boolean; payload?: { payload: Supplier }[] }) {
  if (!active || !payload?.length) return null;
  const s = payload[0].payload;
  return (
    <div className="max-w-[260px] rounded-lg border border-border bg-panel-raised px-3 py-2.5 shadow-xl">
      <p className="text-xs font-medium leading-snug text-ink-primary">{s.name}</p>
      <p className="mt-1 text-[11px] text-ink-muted">
        {s.site} · Tier {s.tier} · {s.sector}
      </p>
      <div className="mt-2 flex items-center gap-3 font-mono text-[11px] text-ink-secondary">
        <span>Risk {s.riskScore}/100</span>
        {s.singleSource && <span className="text-status-warning">Single-source</span>}
      </div>
    </div>
  );
}

/** A stylized placement canvas (the same abstract space the hero's signal
 *  map uses), not a real geographic projection — axes are hidden since the
 *  coordinates carry no real units. */
export function SupplierMap({ items }: { items: Supplier[] }) {
  const byLevel = LEVELS.map((level) => ({
    level,
    color: STATUS[level],
    data: items.filter((s) => riskLevelFromScore(s.riskScore) === level),
  }));

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <h3 className="text-sm font-medium text-ink-primary">Supplier exposure map</h3>
      <p className="text-xs text-ink-muted">Stylized placement · colored and sized by risk score</p>

      <div className="mt-4 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis type="number" dataKey="mapX" domain={[0, 440]} hide />
            <YAxis type="number" dataKey="mapY" domain={[340, 0]} hide />
            <ZAxis type="number" dataKey="riskScore" range={[90, 420]} />
            <Tooltip content={<SupplierTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "#3f3f46" }} />
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
