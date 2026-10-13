"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Route, Search, TrendingUp } from "lucide-react";
import { CORRIDORS } from "@/lib/mock-data";
import { REGIONS, SECTORS, type CorridorMode, type Region, type Sector } from "@/lib/types";
import { CorridorTable } from "./corridor-table";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { STATUS } from "@/lib/colors";
import { cn, riskLevelFromScore } from "@/lib/utils";

const MODES: (CorridorMode | "All")[] = ["All", "Ocean", "Air", "Rail", "Road"];

export function CorridorsClient() {
  const [mode, setMode] = useState<CorridorMode | "All">("All");
  const [sector, setSector] = useState<Sector | "All">("All");
  const [region, setRegion] = useState<Region | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CORRIDORS.filter((c) => {
      const matchesMode = mode === "All" || c.mode === mode;
      const matchesSector = sector === "All" || c.sector === sector;
      const matchesRegion = region === "All" || c.region === region;
      const matchesQuery =
        q.length === 0 || c.name.toLowerCase().includes(q) || c.statusNote.toLowerCase().includes(q);
      return matchesMode && matchesSector && matchesRegion && matchesQuery;
    });
  }, [mode, sector, region, query]);

  const criticalCount = filtered.filter((c) => riskLevelFromScore(c.riskScore) === "Critical").length;
  const worseningCount = filtered.filter((c) => c.riskTrend === "Up").length;
  const avgScore = filtered.length
    ? Math.round(filtered.reduce((sum, c) => sum + c.riskScore, 0) / filtered.length)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Corridor Risk Scores
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          A sample client&apos;s own trade lanes, with a live risk status for each — scored from the
          same tracked chokepoint events as the risk cockpit and alerts above.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <KpiTile label="Lanes tracked" value={String(filtered.length)} icon={Route} accent="#3987e5" />
        <KpiTile
          label="Critical lanes"
          value={String(criticalCount)}
          icon={AlertTriangle}
          accent={STATUS.Critical}
        />
        <KpiTile
          label="Worsening"
          value={String(worseningCount)}
          icon={TrendingUp}
          accent={STATUS.Medium}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                mode === m
                  ? "border-transparent bg-signal-cyan text-white"
                  : "border-border text-ink-secondary hover:text-ink-primary"
              )}
            >
              {m === "All" ? "All modes" : m}
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
            placeholder="Search corridors"
            className="w-full rounded-lg border border-border bg-panel-raised py-2 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <CorridorTable items={filtered} />
      </div>

      <p className="mt-3 text-[11px] text-ink-muted">
        Avg. risk score across tracked lanes: <span className="font-mono text-ink-secondary">{avgScore}/100</span>
      </p>
    </div>
  );
}
