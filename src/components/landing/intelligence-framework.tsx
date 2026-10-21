import { Fragment } from "react";
import { Radar, BarChart3, ShieldAlert, Compass, ArrowRight, ArrowDown } from "lucide-react";

// GSCI Intelligence Framework — the one original, recognizable diagram meant
// to carry GSCI's identity: four connected stages, Signals → Analysis →
// Exposure → Decision. Deliberately simple (icon + label, one arrow between
// each stage) rather than an animated network, per the "avoid complex
// animated network visualizations" guidance.

const STAGES = [
  { icon: Radar, label: "Signals", accent: "#3987e5" },
  { icon: BarChart3, label: "Analysis", accent: "#199e70" },
  { icon: ShieldAlert, label: "Exposure", accent: "#d95926" },
  { icon: Compass, label: "Decision", accent: "#fafafa" },
] as const;

export function IntelligenceFramework() {
  return (
    <div className="rounded-xl border border-border-subtle bg-panel/80 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
        GSCI Intelligence Framework
      </p>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <Fragment key={stage.label}>
              <div className="flex flex-1 flex-col items-center gap-3 rounded-lg border border-border-subtle bg-panel px-4 py-5 text-center">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset"
                  style={{ backgroundColor: `${stage.accent}1a`, borderColor: stage.accent, boxShadow: `inset 0 0 0 1px ${stage.accent}40` }}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} style={{ color: stage.accent }} />
                </span>
                <span className="font-display text-sm font-semibold tracking-tight text-ink-primary">
                  {stage.label}
                </span>
              </div>

              {i < STAGES.length - 1 && (
                <span className="flex shrink-0 items-center justify-center py-1 text-ink-muted sm:px-1 sm:py-0">
                  <ArrowRight className="hidden h-4 w-4 sm:block" strokeWidth={2} />
                  <ArrowDown className="h-4 w-4 sm:hidden" strokeWidth={2} />
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
