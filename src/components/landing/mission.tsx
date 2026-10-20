import Link from "next/link";

export function Mission() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Our mission
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
          Make global supply chain intelligence more accessible, relevant and
          actionable.
        </h2>

        <div className="mt-6 space-y-4 text-ink-secondary">
          <p>
            GSCI&apos;s mission is to help supply chain, procurement,
            logistics and business professionals better understand the
            developments shaping global supply networks.
          </p>
          <p>
            We aim to organize relevant information, examine emerging risks
            and market trends, and provide analytical perspectives that
            support informed decisions across sourcing, operations,
            logistics and supply chain strategy.
          </p>
          <p>
            Through structured intelligence and a commitment to clarity,
            GSCI seeks to help professionals move from fragmented
            information toward a more complete understanding of the
            challenges and opportunities facing their organizations.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.04] px-5 py-3 text-sm font-medium text-ink-primary backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
          >
            About GSCI
          </Link>
        </div>
      </div>
    </section>
  );
}
