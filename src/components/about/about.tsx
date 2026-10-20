import Link from "next/link";
import {
  ArrowUpRight,
  Radar,
  BarChart3,
  Target,
  Globe2,
  Ship,
  ShieldAlert,
  Factory,
  Gauge,
  BrainCircuit,
  Compass,
  Layers,
  TrendingUp,
  MessageSquare,
  Eye,
  ShieldCheck,
  RefreshCw,
  Lock,
  Users,
  ClipboardCheck,
  Truck,
  GraduationCap,
} from "lucide-react";

const DIMENSIONS: { title: string; body: string }[] = [
  {
    title: "Intelligence",
    body: "Understand relevant developments and emerging signals across global supply chains.",
  },
  {
    title: "Research & Indices",
    body: "Organize information into structured analysis, trends and measurement frameworks.",
  },
  {
    title: "Decision Support",
    body: "Connect insights with business questions, potential exposure and areas requiring further assessment.",
  },
];

const WHAT_WE_DO: {
  icon: typeof Radar;
  title: string;
  headline: string;
  body: string;
  themes?: string[];
}[] = [
  {
    icon: Radar,
    title: "Intelligence",
    headline: "Monitor the Signals Shaping Global Supply Chains",
    body: "Follow selected developments across international trade, freight and logistics, procurement, commodities, geopolitics, industrial operations and supply chain technology. GSCI's intelligence approach seeks to identify developments that may influence supplier continuity, transport reliability, sourcing decisions, operating costs and business resilience. The objective is to help professionals identify relevant issues, understand their context and determine where additional analysis may be necessary.",
    themes: [
      "Global trade and regulatory developments",
      "Logistics networks and transport corridors",
      "Procurement and supplier exposure",
      "Commodity and industrial market developments",
      "Geopolitical and operational risk",
      "Digital supply chains and artificial intelligence",
    ],
  },
  {
    icon: BarChart3,
    title: "Research & Indices",
    headline: "Structure Information. Identify Trends. Support Comparison.",
    body: "GSCI develops a research-oriented approach to understanding supply chain developments through structured analysis, selected indicators and measurement frameworks. Research and index-related initiatives are intended to organize relevant information into formats that make trends, differences and potential exposure easier to examine. Depending on the subject and available evidence, this work may include sector analysis, regional assessments, corridor perspectives, risk classifications, benchmarking frameworks and thematic reports. Every published indicator or index is accompanied by a clear explanation of its scope, data sources, calculation approach and limitations.",
  },
  {
    icon: Target,
    title: "Decision Support",
    headline: "Connect Intelligence with Business Priorities",
    body: "Information becomes more valuable when it helps decision-makers frame the right questions and assess potential implications. GSCI seeks to support structured thinking around supplier exposure, sourcing concentration, logistics constraints, operational continuity, cost pressures and emerging supply chain opportunities, helping professionals identify areas requiring further investigation, support management discussions and prioritize risk-review activities. GSCI intelligence is intended to complement — not replace — organization-specific data, professional judgment, due diligence and operational decision-making.",
  },
];

const AREAS_OF_FOCUS: { icon: typeof Globe2; title: string; body: string }[] = [
  {
    icon: Globe2,
    title: "Global Trade & Geopolitics",
    body: "Examine trade policy, tariffs, regulatory changes, geopolitical developments and other factors that may influence international sourcing and the movement of goods.",
  },
  {
    icon: Ship,
    title: "Logistics & Transport Networks",
    body: "Explore freight markets, ports, maritime routes, transport corridors, logistics constraints and developments affecting the reliability and efficiency of global distribution networks.",
  },
  {
    icon: ShieldAlert,
    title: "Procurement & Supplier Risk",
    body: "Understand sourcing concentration, supplier dependencies, material availability and other factors that may influence continuity of supply and procurement decisions.",
  },
  {
    icon: Factory,
    title: "Commodities & Industrial Markets",
    body: "Follow relevant developments in raw materials, energy, industrial inputs and market conditions that may influence purchasing costs, production economics and supply availability.",
  },
  {
    icon: Gauge,
    title: "Operational Excellence & Performance",
    body: "Explore the relationship between supply chain strategy, process efficiency, planning, inventory, service levels, productivity and operational resilience.",
  },
  {
    icon: BrainCircuit,
    title: "Digital Supply Chains & Artificial Intelligence",
    body: "Examine the evolving role of AI, advanced analytics, digital technologies and automation in forecasting, planning, procurement, risk analysis and supply chain decision-making.",
  },
];

const APPROACH_STEPS: { icon: typeof Compass; n: string; title: string; body: string }[] = [
  {
    icon: Compass,
    n: "01",
    title: "Identify Relevant Developments",
    body: "Select developments and indicators that are relevant to the supply chain themes, sectors, regions or business questions being examined.",
  },
  {
    icon: Layers,
    n: "02",
    title: "Establish Context",
    body: "Understand the source, timing, geographic scope and business context of each development before interpreting its potential implications.",
  },
  {
    icon: TrendingUp,
    n: "03",
    title: "Assess Potential Implications",
    body: "Examine how a development may affect supply availability, lead times, costs, supplier exposure, transport reliability, operational continuity or other relevant business dimensions.",
  },
  {
    icon: MessageSquare,
    n: "04",
    title: "Communicate Clearly",
    body: "Present findings in a structured format that distinguishes reported facts, analytical interpretation, estimates and areas of uncertainty.",
  },
];

const PRINCIPLES: { icon: typeof Eye; title: string; body: string }[] = [
  {
    icon: Eye,
    title: "Analytical Clarity",
    body: "Present information in a structured, accessible way. Focus on the issues that matter and distinguish evidence from interpretation.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    body: "Explain the scope, sources, assumptions and limitations of analytical outputs wherever they materially affect interpretation.",
  },
  {
    icon: Target,
    title: "Practical Relevance",
    body: "Connect developments and research with the operational, commercial and strategic questions faced by supply chain professionals.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    body: "Recognize that supply chain conditions evolve. Encourage regular reassessment of assumptions, indicators and emerging developments.",
  },
  {
    icon: Lock,
    title: "Responsible Use of Data",
    body: "Represent information accurately, acknowledge uncertainty and avoid presenting estimates, illustrative examples or unverified assessments as established facts.",
  },
];

const AUDIENCES: { icon: typeof Users; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Chief Supply Chain Officers & Operations Executives",
    body: "Understand emerging risks, structural changes and developments that may affect resilience, cost, service and operational performance.",
  },
  {
    icon: ClipboardCheck,
    title: "Procurement & Sourcing Leaders",
    body: "Explore supplier exposure, sourcing dependencies, market developments and potential risks affecting supply continuity and purchasing decisions.",
  },
  {
    icon: Truck,
    title: "Logistics & Trade Professionals",
    body: "Follow relevant developments across freight, transport networks, ports, trade corridors and international trade.",
  },
  {
    icon: ShieldAlert,
    title: "Strategy & Risk Teams",
    body: "Use structured analysis to inform scenario discussions, risk reviews, strategic planning and management decision-making.",
  },
  {
    icon: Factory,
    title: "Manufacturers & Industrial Organizations",
    body: "Explore developments affecting material availability, production continuity, industrial inputs and the broader operating environment.",
  },
  {
    icon: GraduationCap,
    title: "Researchers & Supply Chain Professionals",
    body: "Access relevant research themes, analytical perspectives and structured information to support professional learning and industry understanding.",
  },
];

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
      {children}
    </p>
  );
}

export function About() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      {/* Cover — full-width text header spanning the page container. */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-ink-secondary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-1.5 w-1.5 rounded-full bg-signal-cyan pulse-dot" />
          </span>
          Global Supply Chain Index · About
        </div>

        <p className="mt-5 font-mono text-xs uppercase tracking-wider text-ink-muted">
          Our Purpose
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-primary sm:text-4xl lg:text-5xl">
          Intelligence for a More Resilient, Connected and Competitive Global
          Supply Chain
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-primary">
          See the signals. Understand the exposure. Make better-informed
          decisions.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          Global Supply Chain Index (GSCI) is developing a supply chain
          intelligence and research platform focused on the forces shaping
          global trade, logistics, procurement and industrial operations.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          In an increasingly interconnected and uncertain business
          environment, supply chain leaders need more than fragmented
          information. They need structured perspectives on emerging
          developments, potential exposure, market dynamics and the
          operational implications of change.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          GSCI brings together selected industry developments, data
          indicators and analytical perspectives to help professionals
          understand what is changing, why it matters and where further
          investigation may be needed.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Our ambition is to make supply chain intelligence more accessible,
          structured and relevant to the decisions that shape business
          performance and resilience.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-signal-cyan px-5 py-3 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
          >
            Explore the Intelligence Console
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.04] px-5 py-3 text-sm font-medium text-ink-primary backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
          >
            Discover Our Research
          </Link>
        </div>
      </div>

      {/* Who We Are */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          A New Perspective on Global Supply Chain Intelligence
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          Supply chains have become a strategic determinant of business
          performance. Their effectiveness influences cost competitiveness,
          customer service, working capital, business continuity and the
          ability to respond to market change.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          At the same time, decision-makers face an increasingly complex
          information environment. Geopolitical developments, trade
          regulations, transport constraints, commodity volatility, supplier
          concentration, technological advances and sustainability
          requirements can create risks and opportunities across
          interconnected networks.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Global Supply Chain Index is being developed to help professionals
          navigate this complexity through structured intelligence, focused
          research and practical analytical perspectives. GSCI connects
          relevant developments across supply chain disciplines and seeks to
          translate information into insights that support clearer risk
          assessment, stronger strategic discussions and more informed
          business decisions.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Our approach combines three complementary dimensions.
        </p>
      </div>

      <div className="mt-6">
        <div className="grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-3">
          {DIMENSIONS.map(({ title, body }) => (
            <div key={title} className="bg-panel p-5">
              <h3 className="text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          The objective is not simply to report what is happening, but to
          help professionals understand its potential significance for their
          supply chains.
        </p>
      </div>

      {/* Mission */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Our Mission
        </h2>
        <p className="mt-3 font-display text-lg font-semibold tracking-tight text-ink-primary">
          Make Supply Chain Intelligence More Accessible, Structured and
          Actionable.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          Our mission is to help supply chain, procurement, logistics and
          business leaders better understand the developments shaping global
          supply networks.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          We aim to organize relevant information, examine emerging risks and
          market trends, and provide analytical perspectives that support
          informed decisions across sourcing, operations, logistics,
          resilience and supply chain strategy.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          By emphasizing clarity, practical relevance and transparent
          analytical methods, GSCI seeks to help professionals move from
          fragmented information toward a more structured understanding of
          the issues that matter to their organizations.
        </p>
      </div>

      {/* Vision */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Our Vision
        </h2>
        <p className="mt-3 font-display text-lg font-semibold tracking-tight text-ink-primary">
          Become a Recognized Reference for Global Supply Chain Intelligence.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          GSCI aspires to build a trusted intelligence platform connecting
          global supply chain developments with the decisions faced by
          professionals and organizations.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Our long-term vision is to develop a structured knowledge and
          intelligence ecosystem covering international trade, logistics,
          procurement, industrial operations, supply chain risk and emerging
          technologies.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Through progressively developed research, indicators, comparative
          analysis and risk perspectives, GSCI aims to contribute to a more
          informed, resilient and performance-oriented global supply chain
          community.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Our ambition is to create value through analytical discipline,
          relevant information and a clear focus on the practical challenges
          facing modern supply chains.
        </p>
      </div>

      {/* What We Do */}
      <div className="mt-16">
        <SectionKicker>What We Do</SectionKicker>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-primary">
          From Global Developments to Supply Chain Insight
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          GSCI organizes its activities around three complementary
          capabilities designed to help professionals explore the changing
          supply chain environment.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border-subtle lg:grid-cols-3">
          {WHAT_WE_DO.map(({ icon: Icon, title, headline, body, themes }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5 text-signal-cyan" strokeWidth={2} />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                {title}
              </p>
              <h3 className="mt-1.5 text-[15px] font-medium leading-snug text-ink-primary">
                {headline}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">
                {body}
              </p>
              {themes && themes.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-t border-border-subtle pt-3">
                  {themes.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Areas of Focus */}
      <div className="mt-16">
        <SectionKicker>Our Areas of Focus</SectionKicker>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-primary">
          A Multidimensional View of the Global Supply Chain
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Supply chain performance and resilience are influenced by
          developments across multiple interconnected domains. GSCI focuses
          on selected themes that can help professionals understand these
          connections and their potential business implications.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {AREAS_OF_FOCUS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5 text-signal-cyan" strokeWidth={2} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          These themes represent GSCI&apos;s intended areas of focus. Actual
          coverage reflects the information and research available on the
          platform at any given time.
        </p>
      </div>

      {/* How We Approach Intelligence */}
      <div className="mt-16">
        <SectionKicker>How We Approach Intelligence</SectionKicker>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-primary">
          A Structured Approach to Supply Chain Intelligence
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Useful intelligence requires more than collecting information. It
          requires a disciplined approach to context, evidence,
          interpretation and communication. GSCI aims to organize its
          analytical work around four principles.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH_STEPS.map(({ icon: Icon, n, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-signal-cyan" strokeWidth={2} />
                <span className="font-mono text-[11px] text-ink-muted">{n}</span>
              </div>
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          The scope and reliability of each analysis depend on the underlying
          evidence, source quality, data availability and methodology
          applied.
        </p>
      </div>

      {/* Principles */}
      <div className="mt-16">
        <SectionKicker>Our Principles</SectionKicker>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-primary">
          The Principles Behind Our Work
        </h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5 text-signal-cyan" strokeWidth={2} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          These principles describe the intended standards guiding
          GSCI&apos;s work, not an independently certified governance
          framework.
        </p>
      </div>

      {/* Who We Serve */}
      <div className="mt-16">
        <SectionKicker>Who We Serve</SectionKicker>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-primary">
          Built Around the Questions Supply Chain Leaders Face
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          GSCI is intended for professionals who need a broader understanding
          of the forces affecting global supply networks and the business
          decisions connected to them.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5 text-signal-cyan" strokeWidth={2} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          GSCI&apos;s content is intended to be useful across these
          audiences while clearly distinguishing general industry
          intelligence from tailored organizational assessments.
        </p>
      </div>

      {/* Transparency */}
      <div className="mt-16">
        <SectionKicker>Our Commitment to Transparency</SectionKicker>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-primary">
          Credibility Begins with Clear Evidence
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          Supply chain intelligence is only useful when its limitations are
          understood. GSCI aims to communicate the basis of its research and
          analytical outputs clearly, including the sources used, the period
          covered, the definitions applied and any material assumptions
          affecting interpretation.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Depending on the specific publication or indicator, information may
          include source-reported facts, GSCI analysis, estimates,
          illustrative data or forward-looking scenarios. These categories
          are distinguished wherever relevant.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Risk classifications and exposure estimates should not be
          interpreted as guarantees of future outcomes or as substitutes for
          direct verification. Where information is incomplete, uncertain or
          illustrative, that limitation is stated explicitly.
        </p>
        <p className="mt-5 border-l-2 border-signal-cyan/40 pl-4 text-sm italic leading-relaxed text-ink-secondary">
          The credibility of an intelligence platform depends not only on the
          insights it presents, but also on the transparency with which those
          insights are developed and communicated.
        </p>
      </div>

      {/* Closing CTA */}
      <div className="mt-16 border-t border-border-subtle pt-10">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Understand the Forces Shaping Your Supply Chain.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Explore the intelligence, research and analytical perspectives
          being developed by GSCI to help professionals navigate an
          increasingly complex global supply chain environment.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          Whether your focus is procurement, logistics, trade, operational
          performance or risk resilience, GSCI provides a starting point for
          exploring the developments that may matter to your organization.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-signal-cyan px-5 py-3 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
          >
            Explore the Intelligence Console
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.04] px-5 py-3 text-sm font-medium text-ink-primary backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
          >
            Browse Research &amp; Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
