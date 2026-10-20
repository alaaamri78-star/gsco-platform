import type { WciRoute } from "@/lib/types";

/** GSCI's World Container Index tracker — exactly the 8 real East-West
 *  lanes the source index publishes, not a padded "top 20" list: the
 *  source index has no 20-route edition. Real, externally reported rates,
 *  cross-confirmed across independent freight-news republications for the
 *  4 lanes not directly extractable from the index owner's own page (see
 *  WCI_ROUTES in mock-data.ts for the full sourcing note) — not GSCI-
 *  modeled figures. rateUsdPer40ft/weeklyChangePct still render "Not
 *  available" for any lane without a corroborated figure, rather than an
 *  estimated number. */
export function WciTracker({
  routes,
  composite,
}: {
  routes: WciRoute[];
  composite: { asOfDate: string; rateUsdPer40ft: number; weeklyChangePct: number };
}) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">World Container Index</h3>
          <p className="mt-1 text-xs text-ink-muted">
            All 8 East-West lanes GSCI tracks, week ending{" "}
            {new Date(composite.asOfDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            . Not a top-20 index.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border-subtle px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
          Composite ${composite.rateUsdPer40ft.toLocaleString("en-US")}/40ft (
          {composite.weeklyChangePct >= 0 ? "+" : ""}
          {composite.weeklyChangePct}%)
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-ink-muted">
              <th className="py-1.5 pr-3 font-medium">Lane</th>
              <th className="py-1.5 pr-3 font-medium">Rate (per 40ft)</th>
              <th className="py-1.5 pr-0 font-medium">Weekly change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {routes.map((r) => (
              <tr key={r.id}>
                <td className="py-2 pr-3 text-[13px] text-ink-primary">
                  {r.origin} → {r.destination}
                </td>
                <td className="py-2 pr-3 font-mono text-ink-secondary">
                  {r.rateUsdPer40ft !== null ? `$${r.rateUsdPer40ft.toLocaleString("en-US")}` : "Not available"}
                </td>
                <td
                  className={`py-2 pr-0 font-mono ${
                    r.weeklyChangePct === null
                      ? "text-ink-muted"
                      : r.weeklyChangePct >= 0
                        ? "text-status-critical"
                        : "text-status-good"
                  }`}
                >
                  {r.weeklyChangePct !== null
                    ? `${r.weeklyChangePct >= 0 ? "+" : ""}${r.weeklyChangePct}%`
                    : "Not available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        Lane rates and the composite figure are real, externally reported market rates for the
        stated week, not GSCI-modeled figures. A lane without a corroborated public rate reads
        &ldquo;Not available&rdquo; rather than an estimated number.
      </p>
    </div>
  );
}
