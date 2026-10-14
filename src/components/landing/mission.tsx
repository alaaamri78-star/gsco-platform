import {
  ShieldAlert,
  Globe2,
  Truck,
  Package,
  Share2,
  BarChart3,
} from "lucide-react";

const INTELLIGENCE_AREAS: { icon: typeof ShieldAlert; accent: string; title: string }[] = [
  {
    icon: ShieldAlert,
    accent: "#d95926",
    title: "Global Supply Chain Risk",
  },
  {
    icon: Globe2,
    accent: "#3987e5",
    title: "International Trade & Geopolitical Developments",
  },
  {
    icon: Truck,
    accent: "#199e70",
    title: "Logistics & Transportation Performance",
  },
  {
    icon: Package,
    accent: "#3987e5",
    title: "Procurement & Commodity Intelligence",
  },
  {
    icon: Share2,
    accent: "#a1a1aa",
    title: "Supplier & Trade Corridor Exposure",
  },
  {
    icon: BarChart3,
    accent: "#199e70",
    title: "Supply Chain Resilience & Benchmarking",
  },
];

export function Mission() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Our areas of intelligence
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
            From global developments to business decisions
          </h2>
          <p className="mt-3 text-ink-secondary">
            GSCI connects external market signals with supply chain
            priorities, helping organizations identify emerging risks,
            understand potential exposure and support more informed
            decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {INTELLIGENCE_AREAS.map(({ icon: Icon, accent, title }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium leading-snug text-ink-primary">
                {title}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl border-t border-border-subtle pt-8">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Our mission
          </p>
          <p className="mt-3 text-ink-secondary">
            To make global supply chain intelligence more accessible,
            relevant and actionable for the professionals and organizations
            responsible for managing supply chain performance and
            resilience.
          </p>
        </div>
      </div>
    </section>
  );
}
