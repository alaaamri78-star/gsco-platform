import Link from "next/link";
import { ArrowUpRight, Newspaper, Compass, TrendingUp, Share2 } from "lucide-react";

const FOCUS_AREAS: { title: string; body: string }[] = [
  {
    title: "Intelligence",
    body: "Monitoring developments and indicators relevant to global supply chains.",
  },
  {
    title: "Research & Indices",
    body: "Organizing information into structured analysis, trends and measurement frameworks.",
  },
  {
    title: "Decision Support",
    body: "Helping professionals explore potential exposure and make better-informed supply chain and procurement decisions.",
  },
];

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
          About Global Supply Chain Index
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary">
          Global Supply Chain Index (GSCI) is developing a supply chain intelligence and research
          platform focused on global trade, logistics, procurement and supply chain risk. Our
          objective is to make relevant information easier to understand and use by bringing
          together selected developments, indicators and analytical perspectives affecting global
          supply networks.
        </p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-secondary">
          As an online industry publication, GSCI also provides in-depth analysis and daily
          insights to decision-makers across logistics, supply chain, procurement, operational
          excellence and artificial intelligence.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          Three complementary areas
        </p>
        <div className="mt-4 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-3">
          {FOCUS_AREAS.map(({ title, body }) => (
            <div key={title} className="bg-panel p-5">
              <h3 className="text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          GSCI&apos;s approach emphasizes clarity, transparent methodology and practical relevance.
          The scope of each analysis depends on the underlying data, sources and coverage.
        </p>
      </div>

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
