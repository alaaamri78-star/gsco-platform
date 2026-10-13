"use client";

import { Search } from "lucide-react";
import { REGIONS, SECTORS, type Region, type Sector } from "@/lib/types";

interface FilterBarProps {
  sector: Sector | "All";
  region: Region | "All";
  query: string;
  onSectorChange: (v: Sector | "All") => void;
  onRegionChange: (v: Region | "All") => void;
  onQueryChange: (v: string) => void;
}

export function FilterBar({
  sector,
  region,
  query,
  onSectorChange,
  onRegionChange,
  onQueryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-panel p-3">
      <select
        value={sector}
        onChange={(e) => onSectorChange(e.target.value as Sector | "All")}
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
        onChange={(e) => onRegionChange(e.target.value as Region | "All")}
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
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search the feed"
          className="w-full rounded-lg border border-border bg-panel-raised py-2 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
          aria-label="Search intelligence feed"
        />
      </div>
    </div>
  );
}
