"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CircleAlert, Radio, Search } from "lucide-react";
import { ALERT_ITEMS } from "@/lib/mock-data";
import { REGIONS, SECTORS, type AlertCategory, type Region, type Sector } from "@/lib/types";
import { AlertCard } from "./alert-card";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { STATUS } from "@/lib/colors";
import { cn } from "@/lib/utils";

const CATEGORIES: (AlertCategory | "All")[] = ["All", "Port & Freight", "Trade & Regulatory"];

export function AlertsClient() {
  const [category, setCategory] = useState<AlertCategory | "All">("All");
  const [sector, setSector] = useState<Sector | "All">("All");
  const [region, setRegion] = useState<Region | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALERT_ITEMS.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesSector = sector === "All" || a.sector === sector;
      const matchesRegion = region === "All" || a.region === region;
      const matchesQuery =
        q.length === 0 || a.title.toLowerCase().includes(q) || a.entity.toLowerCase().includes(q);
      return matchesCategory && matchesSector && matchesRegion && matchesQuery;
    }).sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  }, [category, sector, region, query]);

  const criticalCount = filtered.filter((a) => a.severity === "Critical").length;
  const avgScore = filtered.length
    ? Math.round(filtered.reduce((sum, a) => sum + a.severityScore, 0) / filtered.length)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Port & Freight Alerts
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Selected developments on ports, freight corridors and carriers — each with a stated
          severity assessment, source and recommended action. Trade &amp; regulatory alerts are
          next.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
          Severity and confidence reflect GSCI&apos;s assessment of a reported development, not a
          confirmed or guaranteed measure of impact to any individual business. Each alert links
          to its source; check the publication date against your own operational context.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <KpiTile label="Active alerts" value={String(filtered.length)} icon={Radio} accent="#3987e5" />
        <KpiTile label="Critical" value={String(criticalCount)} icon={AlertTriangle} accent={STATUS.Critical} />
        <KpiTile
          label="Avg. severity score"
          value={`${avgScore}/100`}
          icon={CircleAlert}
          accent={STATUS.Medium}
        />
      </div>

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

        <select
          value={sector}
          onChange={(e) => setSector(e.target.value as Sector | "All")}
          className="rounded-lg border border-border bg-panel-raised px-3 py-2 text-sm text-ink-primary focus-visible:outline-none"
          aria-label="Filter by sector"
        >
          <option value="All">All sectors</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as Region | "All")}
          className="rounded-lg border border-border bg-panel-raised px-3 py-2 text-sm text-ink-primary focus-visible:outline-none"
          aria-label="Filter by region"
        >
          <option value="All">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <div className="relative ml-auto min-w-[220px] flex-1 sm:flex-none">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search alerts"
            className="w-full rounded-lg border border-border bg-panel-raised py-2 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <AlertCard key={a.id} alert={a} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-ink-muted">
            {category === "Trade & Regulatory"
              ? "Trade & regulatory alerts are the next build — none live yet."
              : "No alerts match these filters."}
          </p>
        )}
      </div>
    </div>
  );
}
