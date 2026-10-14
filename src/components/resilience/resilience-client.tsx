"use client";

import { useMemo } from "react";
import { Link2, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { RESILIENCE_SCORES, SUPPLIERS } from "@/lib/mock-data";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { STATUS } from "@/lib/colors";
import { ResilienceRadar } from "./resilience-radar";
import { ResilienceTable } from "./resilience-table";

export function ResilienceClient() {
  const overallScore = Math.round(
    RESILIENCE_SCORES.reduce((s, r) => s + r.clientScore, 0) / RESILIENCE_SCORES.length
  );
  const peerAvg = Math.round(
    RESILIENCE_SCORES.reduce((s, r) => s + r.peerBenchmark, 0) / RESILIENCE_SCORES.length
  );
  const aheadCount = RESILIENCE_SCORES.filter((r) => r.clientScore - r.peerBenchmark >= 5).length;
  const singleSourceCount = useMemo(() => SUPPLIERS.filter((s) => s.singleSource).length, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Supply Chain Resilience Scorecard
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Supply chain resilience reflects an organization&apos;s ability to anticipate disruption,
          maintain critical operations, respond effectively and recover performance. This
          illustrative scorecard rates five dimensions — visibility, supplier diversification,
          geographic concentration, flexibility &amp; alternative sourcing, and risk monitoring
          &amp; response readiness — on a 0–100 scale against an anonymised peer benchmark, using
          the same sample supplier and risk data shown elsewhere on this console.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
          Scores are illustrative, intended to demonstrate the assessment approach rather than
          represent a verified evaluation of an actual organization. A score does not guarantee
          resilience or predict the outcome of a future disruption.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile label="Overall resilience score" value={`${overallScore}/100`} icon={ShieldCheck} accent="#3987e5" />
        <KpiTile label="Peer benchmark avg." value={`${peerAvg}/100`} icon={Target} accent="#71717a" />
        <KpiTile label="Dimensions ahead of peers" value={`${aheadCount}/5`} icon={TrendingUp} accent={STATUS.Low} />
        <KpiTile
          label="Single-source dependencies"
          value={String(singleSourceCount)}
          icon={Link2}
          accent={STATUS.Medium}
        />
      </div>

      <div className="mt-6">
        <ResilienceRadar scores={RESILIENCE_SCORES} />
      </div>

      <h2 className="mt-8 text-sm font-medium text-ink-primary">Maturity assessment</h2>
      <p className="mt-1 text-xs text-ink-muted">Planning, procurement, logistics, risk, and digital capabilities</p>
      <div className="mt-4">
        <ResilienceTable scores={RESILIENCE_SCORES} />
      </div>
    </div>
  );
}
