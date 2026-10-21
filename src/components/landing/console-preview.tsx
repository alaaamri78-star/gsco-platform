import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { CriticalityBadge } from "@/components/ui/badge";
import { TREND_DATA, RISK_ITEMS } from "@/lib/mock-data";

const sparkSlice = TREND_DATA.slice(-24);
const maxTotal = Math.max(...sparkSlice.map((d) => d.total));
const topRisks = RISK_ITEMS.filter((r) => r.criticality === "Critical").slice(0, 3);

export function ConsolePreview() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            GSCI Intelligence Console
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
            One view of signals, risks and exposure.
          </h2>
          <p className="mt-3 text-ink-secondary">
            The GSCI Intelligence Console brings selected supply chain
            developments, risk indicators and intelligence feeds into a
            consolidated view. Explore the issues receiving attention,
            examine available risk classifications and review the
            information supporting the platform&apos;s current intelligence
            coverage.
          </p>
          <p className="mt-3 text-ink-secondary">
            Designed as a starting point for structured analysis, the
            console helps users organize relevant developments and identify
            questions that deserve closer attention.
          </p>
        </div>

        <GlassPanel className="overflow-hidden shadow-[0_0_80px_-20px_rgba(57,135,229,0.25)]">
          <div className="flex items-center justify-between border-b border-border-subtle px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-status-critical/70" />
              <span className="h-2 w-2 rounded-full bg-status-warning/70" />
              <span className="h-2 w-2 rounded-full bg-status-good/70" />
              <span className="ml-3 font-mono text-xs text-ink-muted">
                globalsupplychainindex.org/dashboard
              </span>
            </div>
            <span className="rounded-full border border-border-subtle px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
              Illustrative preview
            </span>
          </div>

          <div className="grid gap-px bg-border-subtle md:grid-cols-5">
            <div className="col-span-3 bg-panel p-6">
              <p className="text-sm text-ink-secondary">
                Weak-signal volume · trailing 24 days
              </p>
              <div className="mt-4 flex h-32 items-end gap-1">
                {sparkSlice.map((d, i) => (
                  <div
                    key={d.date}
                    className="flex-1 rounded-t-sm bg-signal-cyan/70"
                    style={{ height: `${Math.max(6, (d.total / maxTotal) * 100)}%` }}
                    title={`${d.date}: ${d.total}`}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between font-mono text-[11px] text-ink-muted">
                <span>{sparkSlice[0].date}</span>
                <span>{sparkSlice[sparkSlice.length - 1].date}</span>
              </div>
            </div>

            <div className="col-span-2 bg-panel p-6">
              <p className="text-sm text-ink-secondary">Top critical risks</p>
              <ul className="mt-4 space-y-3">
                {topRisks.map((r) => (
                  <li key={r.id} className="flex items-start justify-between gap-3">
                    <span className="text-sm leading-snug text-ink-primary">
                      {r.label}
                    </span>
                    <CriticalityBadge level={r.criticality} className="shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassPanel>

        <p className="mt-5 text-xs leading-relaxed text-ink-muted">
          The scope, coverage and interpretation of indicators depend on the
          underlying data, methodology and reporting period.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-signal-cyan px-5 py-3 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
          >
            Explore the Intelligence Console
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
