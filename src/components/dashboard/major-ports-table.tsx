import type { MajorPort } from "@/lib/types";

/** The 20 major global container ports GSCI tracks. Real annual TEU
 *  throughput from a public port ranking (see sourceName/sourceUrl on each
 *  row in mock-data.ts for the real outlet this traces to) — not GSCI's
 *  own corridor risk scores, and not displayed on-page per GSCI's current
 *  editorial preference to keep named third-party outlets out of the
 *  public UI while retaining full sourcing in the data model. */
export function MajorPortsTable({ ports }: { ports: MajorPort[] }) {
  const period = ports[0]?.period;

  return (
    <div className="min-w-0 rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">Major ports &amp; terminals watch</h3>
          <p className="mt-1 text-xs text-ink-muted">
            20 major global container ports by annual TEU throughput. Not GSCI&apos;s own corridor
            risk scores — a capacity reference, sourced from a public port ranking.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border-subtle px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
          {ports.length} ports
        </span>
      </div>

      <div className="mt-4 max-h-80 overflow-y-auto overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="sticky top-0 bg-panel">
            <tr className="border-b border-border-subtle text-xs text-ink-muted">
              <th className="py-1.5 pr-3 font-medium">#</th>
              <th className="py-1.5 pr-3 font-medium">Port</th>
              <th className="py-1.5 pr-3 font-medium">Country</th>
              <th className="py-1.5 pr-0 font-medium">TEU throughput</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {ports.map((p) => (
              <tr key={p.id}>
                <td className="py-2 pr-3 font-mono text-ink-muted">{p.rank}</td>
                <td className="py-2 pr-3 text-[13px] text-ink-primary">{p.name}</td>
                <td className="py-2 pr-3 text-ink-secondary">{p.country}</td>
                <td className="py-2 pr-0 font-mono text-ink-secondary">
                  {p.teuThroughputM.toLocaleString("en-US", { maximumFractionDigits: 2 })}M TEU
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {period && (
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          Annual TEU throughput, {period} — not a GSCI-modeled figure and not filtered by
          sector/region (ports carry no sector or region field of their own).
        </p>
      )}
    </div>
  );
}
