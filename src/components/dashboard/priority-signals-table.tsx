"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Criticality, FeedItem, Region, Sector } from "@/lib/types";
import { CriticalityBadge, TagBadge } from "@/components/ui/badge";
import { cn, formatShortDate } from "@/lib/utils";

const SEVERITIES: (Criticality | "All")[] = ["All", "Low", "Medium", "Critical"];

export function PrioritySignalsTable({
  items,
  sector,
  region,
}: {
  items: FeedItem[];
  sector: Sector | "All";
  region: Region | "All";
}) {
  const [severity, setSeverity] = useState<Criticality | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...items]
      .filter((f) => {
        const matchesSector = sector === "All" || f.sector === sector;
        const matchesRegion = region === "All" || f.region === region;
        const matchesSeverity = severity === "All" || f.criticality === severity;
        const matchesQuery =
          q.length === 0 ||
          f.title.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q) ||
          f.sourceName.toLowerCase().includes(q);
        return matchesSector && matchesRegion && matchesSeverity && matchesQuery;
      })
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  }, [items, sector, region, severity, query]);

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">Priority intelligence signals</h3>
          <p className="mt-1 text-xs text-ink-muted">
            Sourced developments from GSCI&apos;s tracked trade, logistics and procurement press,
            newest first. &ldquo;Potential implication&rdquo; reflects the cited source&apos;s own
            summary, not a formal GSCI analyst assessment. Each row is an individual news item, not
            a distinct risk — several signals can relate to the same underlying event or to a risk
            already counted once in the risk register above, so signal count and risk count aren&apos;t
            interchangeable. &ldquo;Published&rdquo; is the source&apos;s publication timestamp; GSCI
            does not separately track a distinct event-observed date or a per-item last-updated
            date, and signals carry no modeled exposure figure of their own.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {SEVERITIES.map((s) => (
            <button
              key={s}
              onClick={() => setSeverity(s)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                severity === s
                  ? "border-transparent bg-signal-cyan text-white"
                  : "border-border text-ink-secondary hover:text-ink-primary"
              )}
              aria-pressed={severity === s}
            >
              {s === "All" ? "All severities" : s}
            </button>
          ))}
        </div>

        <div className="relative ml-auto min-w-[220px] flex-1 sm:flex-none">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search signals"
            className="w-full rounded-lg border border-border bg-panel-raised py-2 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-ink-muted">
              <th className="py-2 pr-3 font-medium">Signal</th>
              <th className="py-2 pr-3 font-medium">Sector / category</th>
              <th className="py-2 pr-3 font-medium">Region</th>
              <th className="py-2 pr-3 font-medium">Severity</th>
              <th className="py-2 pr-3 font-medium">Published</th>
              <th className="py-2 pr-3 font-medium">Potential implication</th>
              <th className="py-2 pr-0 font-medium">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((f) => (
              <tr key={f.id} className="align-top">
                <td className="max-w-[220px] py-3 pr-3 text-[13px] leading-snug text-ink-primary">
                  {f.title}
                </td>
                <td className="py-3 pr-3">
                  <TagBadge>{f.sector}</TagBadge>
                </td>
                <td className="py-3 pr-3">
                  <TagBadge>{f.region}</TagBadge>
                </td>
                <td className="py-3 pr-3">
                  <CriticalityBadge level={f.criticality} />
                </td>
                <td
                  className="whitespace-nowrap py-3 pr-3 font-mono text-xs text-ink-muted"
                  title={f.timestamp}
                >
                  {formatShortDate(f.timestamp)}
                </td>
                <td className="max-w-[320px] py-3 pr-3 text-xs leading-relaxed text-ink-secondary">
                  {f.summary}
                </td>
                <td className="whitespace-nowrap py-3 pr-0 text-xs italic text-ink-muted">
                  Per industry reporting
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-sm text-ink-muted">
                  No signals match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
