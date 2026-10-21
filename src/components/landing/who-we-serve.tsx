import { Truck, Package, Globe2, Compass } from "lucide-react";

const AUDIENCES = [
  {
    icon: Truck,
    accent: "#3987e5",
    title: "Supply Chain & Operations Leaders",
    body: "Explore external developments that may influence continuity, cost, service and operational performance.",
  },
  {
    icon: Package,
    accent: "#199e70",
    title: "Procurement & Sourcing Professionals",
    body: "Understand supplier dependencies, sourcing exposure, commodity developments and market conditions.",
  },
  {
    icon: Globe2,
    accent: "#d95926",
    title: "Logistics & Trade Professionals",
    body: "Follow relevant developments across international trade, freight, ports and transport networks.",
  },
  {
    icon: Compass,
    accent: "#a1a1aa",
    title: "Strategy & Risk Teams",
    body: "Use structured intelligence to support risk reviews, scenario discussions and strategic planning.",
  },
] as const;

export function WhoWeServe() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          For supply chain professionals and business leaders
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
          Intelligence for the decisions that matter.
        </h2>
        <p className="mt-3 text-ink-secondary">
          GSCI is intended for professionals responsible for understanding
          and managing the forces that influence global supply chains.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium leading-snug text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
