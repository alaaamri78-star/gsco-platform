import { SignalMap } from "./signal-map";

/**
 * Global Supply Chain Intelligence Map — placed directly beneath the hero so
 * GSCI's global-intelligence positioning registers immediately. Reuses the
 * existing stylized trade-corridor SVG (src/components/landing/signal-map.tsx)
 * rather than a new image or a live-data map, and is labeled as illustrative
 * throughout: it must not read as a live monitoring feed when no such feed
 * is operational.
 */
export function IntelligenceMapBand() {
  return (
    <section className="border-b border-border-subtle bg-panel/40">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Global Supply Chain Intelligence Map
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
              A world of interconnected trade corridors, ports and supplier
              regions.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              Supply chain exposure rarely stays local. A disruption at one
              corridor or port can propagate across sourcing regions and
              transport routes that depend on it.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              Illustrative network — not a live tracking feed
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border-subtle bg-panel/80 p-4 sm:p-6">
              <div className="h-56 sm:h-72">
                <SignalMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
