import { Check, X } from "lucide-react";
import type { AlertItem, AlertOutcomeLog } from "@/lib/types";
import { CriticalityBadge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";

export interface LogRow {
  alert: AlertItem;
  outcome: AlertOutcomeLog;
}

export function AlertLogTable({ rows }: { rows: LogRow[] }) {
  const sorted = [...rows].sort(
    (a, b) => new Date(b.alert.timestamp).getTime() - new Date(a.alert.timestamp).getTime()
  );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs text-ink-muted">
              <th className="px-4 py-3 font-medium">Alert</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 text-center font-medium">Acted on</th>
              <th className="px-4 py-3 text-right font-medium">Time to action</th>
              <th className="px-4 py-3 font-medium">Outcome</th>
              <th className="px-4 py-3 text-right font-medium">Value protected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {sorted.map(({ alert: a, outcome: o }) => (
              <tr key={a.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-ink-primary">{a.title}</td>
                <td className="px-4 py-3">
                  <CriticalityBadge level={a.severity} />
                </td>
                <td className="px-4 py-3 text-ink-secondary">{formatRelativeTime(a.timestamp)}</td>
                <td className="px-4 py-3 text-center">
                  {o.actedOn ? (
                    <Check className="mx-auto h-4 w-4 text-status-good" strokeWidth={2.5} />
                  ) : (
                    <X className="mx-auto h-4 w-4 text-ink-muted" strokeWidth={2.5} />
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono text-ink-secondary">
                  {o.actedOn ? `${o.timeToActionHours}h` : "–"}
                </td>
                <td className="px-4 py-3 text-ink-secondary">{o.outcome}</td>
                <td className="px-4 py-3 text-right font-mono text-ink-primary">
                  {o.valueProtectedUsdM > 0 ? `$${o.valueProtectedUsdM}M` : "–"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
