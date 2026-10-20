import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background photo — aerial port/trade-corridor shot, cropped to its
          clean upper portion (no baked-in text) so the headline below is
          live, accessible markup rather than text burned into the image. */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/88 to-void/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div>
          <span className="mb-5 block h-0.5 w-10 bg-signal-amber" />

          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Global Supply Chain Intelligence
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-primary sm:text-5xl lg:text-6xl">
            See the Disruption Before It Reaches Your Supply Chain.
          </h1>

          <p className="mt-4 text-lg font-medium text-ink-secondary">
            Global intelligence. Risk visibility. Better-informed decisions.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-ink-secondary">
            Global Supply Chain Index (GSCI) helps supply chain, procurement,
            logistics and business leaders understand the developments
            shaping global supply networks.
          </p>

          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            From geopolitical shifts and international trade developments to
            logistics constraints, supplier exposure and commodity market
            movements, GSCI brings relevant information into a structured
            intelligence environment designed to support better-informed
            decisions.
          </p>

          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Understand what is changing, assess what it could mean for your
            business and identify where further investigation may be
            needed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
              Discover GSCI Research
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
