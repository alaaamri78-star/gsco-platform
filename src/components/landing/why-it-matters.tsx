import { ShieldCheck, BarChart3, AlertTriangle, Compass } from "lucide-react";

const DIMENSIONS = [
  {
    icon: ShieldCheck,
    accent: "#199e70",
    title: "Protect Continuity",
    body: "Identify developments that may threaten the reliability of supply, transport or operations.",
  },
  {
    icon: BarChart3,
    accent: "#3987e5",
    title: "Understand Cost Exposure",
    body: "Follow relevant market and commodity developments that may influence sourcing conditions and operating costs.",
  },
  {
    icon: AlertTriangle,
    accent: "#d95926",
    title: "Strengthen Risk Awareness",
    body: "Examine supplier dependencies, geographic exposure and emerging external threats.",
  },
  {
    icon: Compass,
    accent: "#a1a1aa",
    title: "Support Strategic Planning",
    body: "Bring external intelligence into discussions about procurement, resilience, operational priorities and supply chain strategy.",
  },
] as const;

export function WhyItMatters() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Business relevance
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
          Better visibility. Stronger preparedness. More informed decisions.
        </h2>
        <p className="mt-3 text-ink-secondary">
          Supply chain intelligence is relevant when it helps organizations
          connect external developments with their operational and
          commercial priorities. GSCI focuses on four business dimensions.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {DIMENSIONS.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-border-subtle pt-8 text-ink-secondary">
          Intelligence does not eliminate uncertainty. It can help
          decision-makers understand uncertainty more clearly and prepare
          more informed responses.
        </p>
      </div>
    </section>
  );
}
