import {
  ShieldAlert,
  Globe2,
  Truck,
  Package,
  Share2,
  BarChart3,
} from "lucide-react";
import { RiskMatrix } from "./risk-matrix";

const INTELLIGENCE_AREAS: { icon: typeof ShieldAlert; accent: string; title: string; body: string }[] = [
  {
    icon: ShieldAlert,
    accent: "#d95926",
    title: "Global Supply Chain Risk",
    body: "Examine developments that may influence supply continuity, operational resilience and exposure across interconnected supply networks.",
  },
  {
    icon: Globe2,
    accent: "#3987e5",
    title: "International Trade & Geopolitical Developments",
    body: "Explore trade policy, tariffs, regulatory developments, geopolitical events and other factors that may affect international sourcing and trade flows.",
  },
  {
    icon: Truck,
    accent: "#199e70",
    title: "Logistics & Transportation Performance",
    body: "Follow relevant developments across freight markets, ports, shipping routes, transport corridors and distribution networks.",
  },
  {
    icon: Package,
    accent: "#3987e5",
    title: "Procurement & Commodity Intelligence",
    body: "Understand developments affecting sourcing conditions, commodity markets, industrial inputs, purchasing costs and material availability.",
  },
  {
    icon: Share2,
    accent: "#a1a1aa",
    title: "Supplier & Trade Corridor Exposure",
    body: "Explore geographic concentration, supplier dependencies and transport routes that may create vulnerabilities within supply networks.",
  },
  {
    icon: BarChart3,
    accent: "#199e70",
    title: "Supply Chain Resilience & Benchmarking",
    body: "Examine performance, preparedness and resilience themes through structured analysis and relevant indicators where supporting data is available.",
  },
];

export function IntelligenceCoverage() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Areas of intelligence
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
          From global developments to business decisions.
        </h2>
        <p className="mt-3 text-ink-secondary">
          GSCI connects relevant external developments with supply chain
          priorities, helping professionals examine emerging risks,
          potential exposure and the wider implications for business
          performance.
        </p>

        <div className="mt-9 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {INTELLIGENCE_AREAS.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium leading-snug text-ink-primary">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <RiskMatrix />
        </div>
      </div>
    </section>
  );
}
