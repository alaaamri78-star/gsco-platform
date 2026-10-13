import { Newspaper, Compass, TrendingUp, Share2 } from "lucide-react";

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

export function Mission() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            About Global Supply Chain Index
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
            In-depth daily insight for the people who run global trade.
          </h2>
          <p className="mt-3 text-ink-secondary">
            Global Supply Chain Index is an online industry publication that aims
            to provide in-depth analysis, and daily insights to
            decision-makers across the logistics, supply chain, procurement,
            operational excellence, and artificial intelligence sectors. This
            console is where that reporting becomes a live signal, risk, and
            exposure feed.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {OBJECTIVES.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
