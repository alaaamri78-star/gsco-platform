import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="rounded-xl border border-border-subtle bg-panel/60 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
            The world changes. Your supply chain intelligence should keep
            pace.
          </h2>
          <p className="mt-4 text-ink-secondary">
            Explore the intelligence and research being developed by GSCI to
            help professionals understand emerging developments, examine
            potential exposure and navigate an increasingly complex global
            supply chain environment.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-signal-cyan px-5 py-3 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
            >
              Explore the Intelligence Console
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.04] px-5 py-3 text-sm font-medium text-ink-primary backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
            >
              Discover GSCI Research
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
