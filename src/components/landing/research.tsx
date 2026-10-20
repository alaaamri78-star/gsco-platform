import Link from "next/link";
import { ArrowUpRight, Globe2, Building2, ShieldAlert, TrendingUp } from "lucide-react";

const RESEARCH_AREAS = [
  {
    icon: Globe2,
    accent: "#3987e5",
    title: "Global Trade & Market Developments",
    body: "Explore relevant changes in trade conditions, market dynamics and the external environment influencing supply chains.",
  },
  {
    icon: Building2,
    accent: "#199e70",
    title: "Sector & Regional Analysis",
    body: "Understand selected developments affecting industries, countries and supply chain ecosystems.",
  },
  {
    icon: ShieldAlert,
    accent: "#d95926",
    title: "Risk & Exposure Perspectives",
    body: "Examine risk indicators, potential vulnerabilities and issues requiring additional assessment.",
  },
  {
    icon: TrendingUp,
    accent: "#3987e5",
    title: "Strategic Supply Chain Trends",
    body: "Explore the implications of technology, artificial intelligence, operational transformation and changing supply chain strategies.",
  },
] as const;

export function Research() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Research &amp; analysis
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
          Understand the trends behind the headlines.
        </h2>

        <div className="mt-6 space-y-4 text-ink-secondary">
          <p>
            Individual developments provide only part of the picture.
            Understanding broader supply chain dynamics requires context,
            comparison and structured analysis.
          </p>
          <p>
            GSCI&apos;s research direction focuses on examining developments
            across sectors, regions, logistics networks and procurement
            markets to help professionals understand potential business
            implications.
          </p>
          <p>
            Depending on the subject and evidence available, research may
            cover:
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2">
          {RESEARCH_AREAS.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-cyan hover:opacity-80"
          >
            Browse Research &amp; Reports
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
