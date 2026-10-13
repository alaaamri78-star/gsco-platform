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
            GSCI continuously reads the trade, logistics, and procurement
            press to surface weak signals, map risk and probability, and
            benchmark exposure across sector and geography — for
            decision-makers who can&apos;t afford to find out last.
          </p>

          <div className="mb-6 mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-ink-secondary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-status-good pulse-dot" />
            </span>
            247 signals tracked in the last 24 hours
          </div>

          <div className="flex flex-wrap items-center gap-4">
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

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border-subtle pt-8">
            {[
              ["7", "sectors monitored"],
              ["7", "trade corridors & regions"],
              ["18–36h", "median signal-to-alert time"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-mono text-2xl font-medium tabular-nums text-ink-primary">
                  {value}
                </dt>
                <dd className="mt-1 text-sm text-ink-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
