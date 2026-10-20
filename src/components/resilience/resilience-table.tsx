import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import type { ResilienceScore } from "@/lib/types";

function statusFor(gap: number): { label: string; icon: LucideIcon; className: string } {
  if (gap >= 5) return { label: "Ahead", icon: TrendingUp, className: "text-status-good" };
  if (gap <= -5) return { label: "Behind", icon: TrendingDown, className: "text-status-critical" };
  return { label: "At par", icon: Minus, className: "text-ink-muted" };
}

export function ResilienceTable({ scores }: { scores: ResilienceScore[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs text-ink-muted">
              <th className="px-4 py-3 font-medium">Dimension</th>
              <th className="px-4 py-3 text-right font-medium">Your score</th>
              <th className="px-4 py-3 text-right font-medium">Peer benchmark</th>
              <th className="px-4 py-3 text-right font-medium">Gap</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {scores.map((s) => {
              const gap = s.clientScore - s.peerBenchmark;
              const status = statusFor(gap);
              const StatusIcon = status.icon;
              return (
                <tr key={s.dimension} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium text-ink-primary">{s.dimension}</td>
                  <td className="px-4 py-3 text-right font-mono text-ink-primary">{s.clientScore}</td>
                  <td className="px-4 py-3 text-right font-mono text-ink-secondary">{s.peerBenchmark}</td>
                  <td className={`px-4 py-3 text-right font-mono ${status.className}`}>
                    {gap > 0 ? "+" : ""}
                    {gap}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 ${status.className}`}>
                      <StatusIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
