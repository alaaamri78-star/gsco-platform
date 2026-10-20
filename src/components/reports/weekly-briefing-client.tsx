"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, ShieldCheck } from "lucide-react";
import { WEEKLY_BRIEFING } from "@/lib/mock-data";
import { CriticalityBadge, TagBadge } from "@/components/ui/badge";

const PDF_PATH = "/reports/gsci-weekly-risk-briefing-2026-10-17.pdf";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function WeeklyBriefingClient() {
  const b = WEEKLY_BRIEFING;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Link
        href="/reports"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to Research &amp; Reports
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <TagBadge>Free</TagBadge>
        <TagBadge>Weekly Risk Briefing</TagBadge>
        <span className="text-xs text-ink-muted">Published {formatDate(b.publishedDate)}</span>
      </div>

      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
        GSCI Weekly Risk Briefing
      </h1>
      <p className="mt-1 text-sm text-ink-secondary">{b.weekLabel}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{b.executiveSummary}</p>

      <h2 className="mt-10 text-sm font-medium text-ink-primary">Top risk signals this week</h2>
      <div className="mt-4 space-y-4">
        {b.signals.map((s) => (
          <div key={s.id} className="rounded-xl border border-border bg-panel p-5">
            <div className="flex flex-wrap items-center gap-2">
              <CriticalityBadge level={s.severity} />
              <TagBadge>{s.category}</TagBadge>
              <span className="font-mono text-[11px] text-ink-muted">{formatDate(s.dateline)}</span>
            </div>
            <h3 className="mt-3 text-[15px] font-medium leading-snug text-ink-primary">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.summary}</p>
            <div className="mt-3 border-t border-border-subtle pt-3">
              <a
                href={s.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-signal-cyan hover:opacity-80"
              >
                {s.sourceName}
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-ink-primary">Freight &amp; cost snapshot</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {b.freightSnapshot.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-panel p-5">
            <p className="text-xs text-ink-secondary">{stat.label}</p>
            <p className="mt-1 font-mono text-xl font-semibold text-ink-primary">{stat.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">{stat.note}</p>
            <a
              href={stat.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-signal-cyan hover:opacity-80"
            >
              {stat.sourceName}
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </a>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-ink-primary">Watch list for next week</h2>
      <ul className="mt-4 space-y-2.5">
        {b.watchList.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-secondary">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl border border-border-subtle bg-white/[0.02] p-4">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          {b.methodologyNote}
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-signal-cyan/30 bg-signal-cyan/[0.04] p-6">
        <h2 className="text-sm font-medium text-ink-primary">Get this briefing as a PDF</h2>
        <p className="mt-1 text-xs text-ink-secondary">
          A 2-3 page version of the briefing above, formatted to read offline or forward to your team. Free —
          enter your email and we&apos;ll also add you to future weekly editions.
        </p>

        {!submitted ? (
          <form
            className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              className="rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-signal-cyan px-4 py-2 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Get the PDF
            </button>
          </form>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-ink-secondary">Thanks{name ? `, ${name.split(" ")[0]}` : ""} — your download is ready.</p>
            <a
              href={PDF_PATH}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-signal-cyan px-4 py-2 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Download PDF
            </a>
          </div>
        )}
        <p className="mt-3 text-[11px] text-ink-muted">
          This preview form is presentational only — no email is sent or stored by this demo.
        </p>
      </div>
    </div>
  );
}
