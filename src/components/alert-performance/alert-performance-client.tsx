"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock, ListChecks, ShieldCheck } from "lucide-react";
import { ALERT_ITEMS, ALERT_OUTCOMES } from "@/lib/mock-data";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { formatCompactUsd } from "@/lib/utils";
import { OutcomeChart } from "./outcome-chart";
import { AlertLogTable, type LogRow } from "./alert-log-table";

export function AlertPerformanceClient() {
  const rows = useMemo(() => {
    const out: LogRow[] = [];
    for (const outcome of ALERT_OUTCOMES) {
      const alert = ALERT_ITEMS.find((a) => a.id === outcome.alertId);
      if (alert) out.push({ alert, outcome });
    }
    return out;
  }, []);

  const actedOn = rows.filter((r) => r.outcome.actedOn);
  const actedOnPct = Math.round((actedOn.length / rows.length) * 100);
  const avgTimeToAction = actedOn.length
    ? Math.round(actedOn.reduce((s, r) => s + r.outcome.timeToActionHours, 0) / actedOn.length)
    : 0;
  const totalValueProtected = rows.reduce((s, r) => s + r.outcome.valueProtectedUsdM, 0);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Alert Performance Log
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          An illustrative log of alerts received, whether each was acted on, and the recorded
          outcome &mdash; the format a client-facing performance record would follow.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
          Sample data for demonstration. &ldquo;Value protected&rdquo; is a modeled estimate of
          avoided cost, not an audited or guaranteed figure.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile label="Alerts logged" value={String(rows.length)} icon={ListChecks} accent="#3987e5" />
        <KpiTile label="Acted on" value={`${actedOnPct}%`} icon={CheckCircle2} accent="#3987e5" />
        <KpiTile label="Avg. time to action" value={`${avgTimeToAction}h`} icon={Clock} accent="#3987e5" />
        <KpiTile
          label="Value protected (est.)"
          value={formatCompactUsd(totalValueProtected)}
          icon={ShieldCheck}
          accent="#3987e5"
        />
      </div>

      <div className="mt-6">
        <OutcomeChart outcomes={rows.map((r) => r.outcome)} />
      </div>

      <h2 className="mt-8 text-sm font-medium text-ink-primary">Alert log</h2>
      <div className="mt-4">
        <AlertLogTable rows={rows} />
      </div>
    </div>
  );
}
