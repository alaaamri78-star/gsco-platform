"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { REPORT_FORMATS, REPORT_ITEMS } from "@/lib/mock-data";
import type { ReportItem } from "@/lib/types";
import { ReportCard } from "./report-card";
import { ReportFormatCard } from "./report-format-card";
import { cn } from "@/lib/utils";

const CATEGORIES: (ReportItem["category"] | "All")[] = [
  "All",
  "Situational Note",
  "Sector Deep-Dive",
  "Risk Bulletin",
  "Benchmark Report",
];

export function ReportsClient() {
  const [category, setCategory] = useState<ReportItem["category"] | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REPORT_ITEMS.filter((r) => {
      const matchesCategory = category === "All" || r.category === category;
      const matchesQuery =
        q.length === 0 || r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          GSCI Research &amp; Reports
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Research and analysis covering global supply chains, international trade, logistics,
          procurement and supply chain risk — aiming to explain relevant developments, identify
          emerging trends and provide structured insights for professionals and decision-makers.
        </p>
      </div>

      <h2 className="mt-8 text-sm font-medium text-ink-primary">Report formats</h2>
      <p className="mt-1 text-xs text-ink-muted">
        The formats GSCI publishes, from a free weekly briefing to on-demand and commissioned
        research. The tier chip is a commercial-structure label, not a guarantee of current
        availability — on-demand and commissioned formats are scoped per engagement.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REPORT_FORMATS.map((f) => (
          <ReportFormatCard key={f.id} format={f} />
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-ink-primary">Latest reports</h2>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                category === c
                  ? "border-transparent bg-signal-cyan text-white"
                  : "border-border text-ink-secondary hover:text-ink-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative ml-auto min-w-[220px] flex-1 sm:flex-none">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports"
            className="w-full rounded-lg border border-border bg-panel-raised py-2 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <ReportCard key={r.id} report={r} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-ink-muted">
            No reports match this search.
          </p>
        )}
      </div>
    </div>
  );
}
