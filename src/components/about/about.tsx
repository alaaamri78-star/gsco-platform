import Link from "next/link";
import { ArrowUpRight, Newspaper, Compass, TrendingUp, Share2 } from "lucide-react";

const OBJECTIVES: { icon: typeof Newspaper; accent: string; title: string; body: string }[] = [
  {
    icon: Newspaper,
    accent: "#3987e5",
    title: "Inform industry leaders",
    body: "Deliver timely news, data, and reporting on complex topics like logistics, freight, operations, procurement, regulations, technology, and risk resilience.",
  },
  {
    icon: Compass,
    accent: "#d95926",
    title: "Shape industry agendas",
    body: "Spark ideas and guide strategic discussions for over 13–14 million industry executives, managers, and supply chain professionals.",
  },
  {
    icon: TrendingUp,
    accent: "#199e70",
    title: "Track market trends",
    body: "Monitor major structural shifts — artificial intelligence in supply chains, trade tariffs, freight decarbonization, and inventory management best practices.",
  },
  {
    icon: Share2,
    accent: "#a1a1aa",
    title: "Connect stakeholders",
    body: "Offer targeted daily newsletters, deep-dive special reports, and event coverage to bridge gaps between manufacturers, retailers, logistics providers, and procurement specialists.",
  },
];

export function About() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      {/* Cover — a text-only header in the site's secondary-page pattern
          (matches Top 50 CSCO / Top 50 Organisations), rather than the
          landing page's full-bleed photographic hero. */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-ink-secondary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-1.5 w-1.5 rounded-full bg-signal-cyan pulse-dot" />
          </span>
          Global Supply Chain Index · About
        </div>

        <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          What We Do
        </p>
        <h1 className="mt-2 font-display text-[28px] font-semibold leading-[1.18] tracking-tight text-ink-primary sm:text-4xl">
          Daily signal, verified rankings, and in-depth insight for global trade.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary">
          Global Supply Chain Index is an online industry publication that aims
          to provide in-depth analysis, and daily insights to decision-makers
          across the logistics, supply chain, procurement, operational
          excellence, and artificial intelligence sectors. This console is
          where that reporting becomes a live signal, risk, and exposure feed.
        </p>
      </div>

      <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border-subtle pt-7">
        {[
          ["7", "sectors monitored"],
          ["7", "trade corridors & regions"],
          ["18–36h", "median signal-to-alert time"],
        ].map(([value, label]) => (
          <div key={label}>
            <dt className="font-mono text-2xl font-medium tabular-nums text-ink-primary">
              {value}
            </dt>
            <dd className="mt-1 text-sm text-ink-muted">{label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Our mission
        </h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {OBJECTIVES.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-border-subtle pt-9">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-signal-cyan px-5 py-3 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
        >
          Open the console
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.04] px-5 py-3 text-sm font-medium text-ink-primary backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
        >
          Browse situational notes
        </Link>
      </div>
    </div>
  );
}
