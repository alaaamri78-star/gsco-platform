import { Fragment } from "react";
import type { RiskItem } from "@/lib/types";

// Compact dashboard variant of the homepage's GSCI Supply Chain Risk &
// Exposure Matrix™ — same honest convention: cell COUNTS are computed live
// from the filtered risk items' real impact/probability fields; the 3x3
// BUCKETING and Low/Medium/High/Critical labeling is a transparent,
// mechanical convention GSCI has not formally validated as a scoring
// methodology, disclosed as such rather than presented as a certified score.

type Level = "Low" | "Medium" | "High" | "Critical";

const LEVEL_STYLES: Record<Level, string> = {
  Low: "bg-status-good/10 text-status-good ring-status-good/25",
  Medium: "bg-status-warning/10 text-status-warning ring-status-warning/25",
  High: "bg-signal-amber/10 text-signal-amber ring-signal-amber/25",
  Critical: "bg-status-critical/10 text-status-critical ring-status-critical/30",
};

const LEVEL_FROM_WEIGHT: Level[] = ["Low", "Low", "Medium", "High", "Critical"];

function likelihoodTier(probability: number): 0 | 1 | 2 {
  if (probability > 65) return 2;
  if (probability > 40) return 1;
  return 0;
}

function impactTier(impact: number): 0 | 1 | 2 {
  if (impact >= 8) return 2;
  if (impact >= 5) return 1;
  return 0;
}

const TIER_LABEL = ["Low", "Medium", "High"] as const;

export function DashboardRiskMatrix({ items }: { items: RiskItem[] }) {
  const cells: { count: number; labels: string[] }[][] = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => ({ count: 0, labels: [] as string[] }))
  );

  for (const item of items) {
    const l = likelihoodTier(item.probability);
    const i = impactTier(item.impact);
    cells[2 - l][i].count += 1;
    cells[2 - l][i].labels.push(item.label);
  }

  const rows = [2, 1, 0].map((likelihoodRow) => ({
    label: `${TIER_LABEL[likelihoodRow]} likelihood`,
    cells: [0, 1, 2].map((impactCol) => ({
      ...cells[2 - likelihoodRow][impactCol],
      level: LEVEL_FROM_WEIGHT[likelihoodRow + impactCol],
    })),
  }));

  const columns = TIER_LABEL.map((t) => `${t} impact`);

  return (
    <div className="min-w-0 rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">Global risk matrix</h3>
          <p className="mt-1 text-xs text-ink-muted">
            {items.length} risk item{items.length === 1 ? "" : "s"} matching filters, placed by
            likelihood × impact.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border-subtle px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
          Illustrative bucketing
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[420px]">
          <div
            className="grid gap-px overflow-hidden rounded-lg bg-border-subtle"
            style={{ gridTemplateColumns: "110px repeat(3, 1fr)" }}
          >
            <div className="bg-panel p-2" />
            {columns.map((col) => (
              <div
                key={col}
                className="bg-panel p-2 text-center font-mono text-[10px] uppercase tracking-wide text-ink-muted"
              >
                {col}
              </div>
            ))}

            {rows.map((row) => (
              <Fragment key={row.label}>
                <div className="flex items-center bg-panel p-2 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                  {row.label}
                </div>
                {row.cells.map((cell, i) => (
                  <div
                    key={`${row.label}-${i}`}
                    className="flex items-center justify-center bg-panel p-3"
                    title={cell.labels.length ? cell.labels.join(" · ") : undefined}
                  >
                    {cell.count > 0 ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${LEVEL_STYLES[cell.level]}`}
                      >
                        <span className="font-mono tabular-nums">{cell.count}</span>
                        {cell.level}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium text-ink-muted ring-1 ring-border-subtle">
                        0
                      </span>
                    )}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        Counts come from each risk item&apos;s own tracked impact and probability fields and
        update with the filters above — hover a cell to see which risks it contains. The
        likelihood/impact tiers and Low/Medium/High/Critical labels are an illustrative,
        mechanical bucketing, not a validated GSCI scoring methodology. Individual risk items do
        not currently carry their own assessment date — this reflects the risk register&apos;s
        current snapshot, not a dated historical assessment.
      </p>
    </div>
  );
}
