import { Radar, Search, Compass } from "lucide-react";
import { IntelligenceFramework } from "./intelligence-framework";

const STEPS = [
  {
    n: "01",
    icon: Radar,
    title: "Identify the Signals",
    body: "Follow selected developments across international trade, logistics, procurement, commodities and supply chain risk.",
  },
  {
    n: "02",
    icon: Search,
    title: "Understand the Implications",
    body: "Examine the possible effects on sourcing, costs, lead times, supplier continuity, transport reliability and operational performance.",
  },
  {
    n: "03",
    icon: Compass,
    title: "Support Better Decisions",
    body: "Use structured information and analytical perspectives to identify issues that may warrant further investigation, management review or mitigation planning.",
  },
] as const;

export function Approach() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          From signals to insight
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
          Information becomes more valuable when it is put into context.
        </h2>
        <p className="mt-3 text-ink-secondary">
          Global supply chain developments are interconnected. Understanding
          their implications requires more than observing individual events.
          GSCI seeks to connect relevant developments with the supply chain
          themes, sectors and business questions they may affect.
        </p>

        <div className="mt-9">
          <IntelligenceFramework />
        </div>

        <div className="mt-9 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-3">
          {STEPS.map(({ n, icon: Icon, title, body }) => (
            <div key={n} className="bg-panel p-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-ink-muted">{n}</span>
                <Icon className="h-4 w-4 text-signal-cyan" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-border-subtle pt-8 text-ink-secondary">
          The objective is to move beyond fragmented information toward a
          more structured understanding of the issues shaping global supply
          chains.
        </p>
      </div>
    </section>
  );
}
