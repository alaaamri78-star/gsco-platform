import type { Supplier } from "@/lib/types";
import { CriticalityBadge } from "@/components/ui/badge";
import { riskLevelFromScore } from "@/lib/utils";

export function SupplierTable({ items }: { items: Supplier[] }) {
  const sorted = [...items].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs text-ink-muted">
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Site</th>
              <th className="px-4 py-3 font-medium">Sector</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">Single-source</th>
              <th className="px-4 py-3 text-right font-medium">Risk score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {sorted.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-ink-primary">{s.name}</td>
                <td className="px-4 py-3 text-ink-secondary">{s.site}</td>
                <td className="px-4 py-3 text-ink-secondary">{s.sector}</td>
                <td className="px-4 py-3 font-mono text-ink-secondary">T{s.tier}</td>
                <td className="px-4 py-3 text-ink-secondary">
                  {s.singleSource ? (
                    <span className="text-status-warning">Yes</span>
                  ) : (
                    <span className="text-ink-muted">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2.5">
                    <span className="font-mono text-ink-primary">{s.riskScore}</span>
                    <CriticalityBadge level={riskLevelFromScore(s.riskScore)} />
                  </div>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-ink-muted">
                  No suppliers match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
