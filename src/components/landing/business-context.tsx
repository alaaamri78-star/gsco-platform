import { AlertTriangle, Share2, Compass } from "lucide-react";

const CONTEXT_CARDS = [
  {
    icon: AlertTriangle,
    accent: "#d95926",
    title: "Disruption",
    body: "Understand developments that may affect the continuity and reliability of supply.",
  },
  {
    icon: Share2,
    accent: "#3987e5",
    title: "Exposure",
    body: "Examine potential vulnerabilities across suppliers, regions, commodities and transport networks.",
  },
  {
    icon: Compass,
    accent: "#199e70",
    title: "Decisions",
    body: "Use structured intelligence to support risk reviews, procurement discussions and operational planning.",
  },
] as const;

export function BusinessContext() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          The changing global landscape
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
          Supply chain decisions require a broader view of the world.
        </h2>

        <div className="mt-6 space-y-4 text-ink-secondary">
          <p>
            Supply chains do not operate in isolation. Their performance is
            influenced by developments across markets, regions, transport
            networks, supplier ecosystems and regulatory environments.
          </p>
          <p>
            A geopolitical development can change sourcing assumptions. A
            logistics constraint can affect delivery reliability. Commodity
            volatility can reshape purchasing costs. Supplier concentration
            can increase exposure to operational disruption.
          </p>
          <p>
            For business leaders, the challenge is not simply access to more
            information. It is understanding which developments matter, how
            they connect to business priorities and where attention is
            required.
          </p>
          <p>
            GSCI is designed to help professionals organize these signals
            into a clearer view of the global supply chain environment.
          </p>
        </div>

        <div className="mt-9 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-3">
          {CONTEXT_CARDS.map(({ icon: Icon, accent, title, body }) => (
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
