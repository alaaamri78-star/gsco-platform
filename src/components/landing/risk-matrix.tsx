import { Fragment } from "react";
import { RISK_ITEMS } from "@/lib/mock-data";

// GSCI Supply Chain Risk & Exposure Matrix™ — a recognizable, proprietary-
// looking framework for likelihood-vs-impact discussions. The cell COUNTS
// below are computed live from RISK_ITEMS — the same impact/probability
// fields that power the dashboard's own risk list — so this reflects the
// risk items currently tracked in the GSCI console, not a hardcoded
// illustration. What stays illustrative is the 3x3 BUCKETING itself: GSCI
// has not yet formally defined and validated a scoring methodology, so the
// tier thresholds and the Low/Medium/High/Critical labeling are a
// transparent, mechanical convention (next to each cell's own level, a
// simple sum of its row+column weight), not a validated GSCI risk score.
// Color is never the only signal — every non-empty cell also carries its
// text label.

type Level = "Low" | "Medium" | "High" | "Critical";

const LEVEL_STYLES: Record<Level, string> = {
  Low: "bg-status-good/10 text-status-good ring-status-good/25",
  Medium: "bg-status-warning/10 text-status-warning ring-status-warning/25",
  High: "bg-signal-amber/10 text-signal-amber ring-signal-amber/25",
  Critical: "bg-status-critical/10 text-status-critical ring-status-critical/30",
};

const LEVEL_FROM_WEIGHT: Level[] = ["Low", "Low", "Medium", "High", "Critical"];

// Likelihood = RiskItem.probability (0-100); Impact = RiskItem.impact (1-10).
// Thresholds are a transparent bucketing convention, applied uniformly.
function likelihoodTier(probability: number): 0 | 1 | 2 {
  if (probability > 65) return 2; // High
  if (probability > 40) return 1; // Medium
  return 0; // Low
}

function impactTier(impact: number): 0 | 1 | 2 {
  if (impact >= 8) return 2; // High
  if (impact >= 5) return 1; // Medium
  return 0; // Low
}

const TIER_LABEL = ["Low", "Medium", "High"] as const;

// rows: likelihood tier (2=High → 0=Low); columns: impact tier (0=Low → 2=High)
const counts: number[][] = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

for (const item of RISK_ITEMS) {
  const l = likelihoodTier(item.probability);
  const i = impactTier(item.impact);
  counts[2 - l][i] += 1;
}

const ROWS = [2, 1, 0].map((likelihoodRow) => ({
  label: `${TIER_LABEL[likelihoodRow]} likelihood`,
  cells: [0, 1, 2].map((impactCol) => ({
    count: counts[2 - likelihoodRow][impactCol],
    level: LEVEL_FROM_WEIGHT[likelihoodRow + impactCol],
  })),
}));

const COLUMNS = TIER_LABEL.map((t) => `${t} impact`);

export function RiskMatrix() {
  return (
    <div className="rounded-xl border border-border-subtle bg-panel/80 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink-primary">
            GSCI Supply Chain Risk &amp; Exposure Matrix™
          </h3>
          <p className="mt-1 text-sm text-ink-secondary">
            {RISK_ITEMS.length} risk items currently tracked in the GSCI
            console, placed by likelihood and business impact.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border-subtle px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
          Illustrative framework
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[480px]">
          <div
            className="grid gap-px overflow-hidden rounded-lg bg-border-subtle"
            style={{ gridTemplateColumns: "140px repeat(3, 1fr)" }}
          >
            <div className="bg-panel p-3" />
            {COLUMNS.map((col) => (
              <div
                key={col}
                className="bg-panel p-3 text-center font-mono text-[11px] uppercase tracking-wide text-ink-muted"
              >
                {col}
              </div>
            ))}

            {ROWS.map((row) => (
              <Fragment key={row.label}>
                <div className="flex items-center bg-panel p-3 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                  {row.label}
                </div>
                {row.cells.map(({ count, level }, i) => (
                  <div
                    key={`${row.label}-${i}`}
                    className="flex items-center justify-center bg-panel p-4"
                  >
                    {count > 0 ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ring-1 ${LEVEL_STYLES[level]}`}
                      >
                        <span className="font-mono tabular-nums">{count}</span>
                        {level}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium text-ink-muted ring-1 ring-border-subtle">
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

      <p className="mt-5 text-xs leading-relaxed text-ink-muted">
        Counts are computed from each risk item&apos;s own tracked impact and
        probability fields and update as that underlying data changes. The
        likelihood/impact tiers and Low/Medium/High/Critical labels are an
        illustrative, mechanical bucketing — not a validated GSCI scoring
        methodology. Actual risk assessment requires defined criteria,
        evidence, assessment periods and governance.
      </p>
    </div>
  );
}
