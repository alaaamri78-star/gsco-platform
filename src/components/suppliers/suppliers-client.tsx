"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Globe2, MapPin, Search, Users } from "lucide-react";
import { SUPPLIERS } from "@/lib/mock-data";
import { REGIONS, SECTORS, type Region, type Sector, type SupplierTier } from "@/lib/types";
import { SupplierMap } from "./supplier-map";
import { SupplierTable } from "./supplier-table";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { STATUS } from "@/lib/colors";
import { cn, riskLevelFromScore } from "@/lib/utils";

const TIERS: (SupplierTier | "All")[] = ["All", 1, 2, 3];

export function SuppliersClient() {
  const [sector, setSector] = useState<Sector | "All">("All");
  const [region, setRegion] = useState<Region | "All">("All");
  const [tier, setTier] = useState<SupplierTier | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SUPPLIERS.filter((s) => {
      const matchesSector = sector === "All" || s.sector === sector;
      const matchesRegion = region === "All" || s.region === region;
      const matchesTier = tier === "All" || s.tier === tier;
      const matchesQuery = q.length === 0 || s.name.toLowerCase().includes(q) || s.site.toLowerCase().includes(q);
      return matchesSector && matchesRegion && matchesTier && matchesQuery;
    });
  }, [sector, region, tier, query]);

  const criticalCount = filtered.filter((s) => riskLevelFromScore(s.riskScore) === "Critical").length;
  const singleSourceCount = filtered.filter((s) => s.singleSource).length;
  const countryCount = new Set(filtered.map((s) => s.site.split(", ").pop())).size;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Supplier Exposure & Risk Intelligence
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Supplier exposure is influenced by more than the direct supplier relationship —
          geographic concentration, dependence on critical materials, transportation routes and
          developments in supplier operating regions can all affect continuity of supply. This
          illustrative example geolocates and scores (0–100, higher = higher assessed risk) a
          sample client&apos;s own supplier base; single-source dependencies are flagged for
          concentration risk. Sample suppliers and scores are provided for demonstration and
          should not be interpreted as verified supplier assessments.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile label="Suppliers tracked" value={String(filtered.length)} icon={Users} accent="#3987e5" />
        <KpiTile
          label="Critical-risk suppliers"
          value={String(criticalCount)}
          icon={AlertTriangle}
          accent={STATUS.Critical}
        />
        <KpiTile
          label="Single-source"
          value={String(singleSourceCount)}
          icon={Globe2}
          accent={STATUS.Medium}
        />
        <KpiTile label="Countries" value={String(countryCount)} icon={MapPin} accent="#199e70" />
      </div>

      <div className="mt-6">
        <SupplierMap items={filtered} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <button
              key={String(t)}
              onClick={() => setTier(t)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                tier === t
                  ? "border-transparent bg-signal-cyan text-white"
                  : "border-border text-ink-secondary hover:text-ink-primary"
              )}
            >
              {t === "All" ? "All tiers" : `Tier ${t}`}
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
            placeholder="Search suppliers"
            className="w-full rounded-lg border border-border bg-panel-raised py-2 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <SupplierTable items={filtered} />
      </div>
    </div>
  );
}
