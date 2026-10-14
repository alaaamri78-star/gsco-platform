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
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/75 to-void/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <span className="mb-5 block h-0.5 w-10 bg-signal-amber" />

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-primary sm:text-5xl">
            See the disruption before it reaches your supply chain.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-secondary">
            Global Supply Chain Index (GSCI) provides supply chain
            intelligence, risk monitoring and market insights to help
            businesses understand global developments, anticipate potential
            disruptions and make better-informed operational and procurement
            decisions.
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary">
            We monitor developments across international trade, logistics,
            procurement, commodities and geopolitical risk, translating
            relevant information into practical insights for supply chain
            professionals and business leaders.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
      </div>
    </section>
  );
}
