"use client";

import { useMemo } from "react";
import { AlertTriangle, Boxes, Gavel, TrendingUp } from "lucide-react";
import { ALERT_ITEMS, COMMODITY_PRICES, SUPPLIERS } from "@/lib/mock-data";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { STATUS } from "@/lib/colors";
import { riskLevelFromScore } from "@/lib/utils";
import { CommodityCard } from "./commodity-card";
import { SupplierTable } from "@/components/suppliers/supplier-table";
import { AlertCard } from "@/components/alerts/alert-card";

export function ProcurementClient() {
  const distressedSuppliers = useMemo(
    () => SUPPLIERS.filter((s) => riskLevelFromScore(s.riskScore) === "Critical"),
    []
  );
  const tariffAlerts = useMemo(
    () => ALERT_ITEMS.filter((a) => a.category === "Trade & Regulatory"),
    []
  );
  const avgVolatility = useMemo(() => {
    const pcts = COMMODITY_PRICES.map((c) => {
      const first = c.history[0]?.value ?? 0;
      const latest = c.history[c.history.length - 1]?.value ?? 0;
      return first !== 0 ? Math.abs(((latest - first) / first) * 100) : 0;
    });
    return Math.round((pcts.reduce((s, v) => s + v, 0) / pcts.length) * 10) / 10;
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Procurement Intelligence
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Commodity prices, supplier distress, and tariff &amp; regulatory changes in one view for
          sourcing and category teams.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile label="Commodities tracked" value={String(COMMODITY_PRICES.length)} icon={Boxes} accent="#3987e5" />
        <KpiTile
          label="Suppliers flagged distressed"
          value={String(distressedSuppliers.length)}
          icon={AlertTriangle}
          accent={STATUS.Critical}
        />
        <KpiTile label="Active tariff & regulatory alerts" value={String(tariffAlerts.length)} icon={Gavel} accent={STATUS.Medium} />
        <KpiTile label="Avg. commodity volatility" value={`${avgVolatility}%`} icon={TrendingUp} accent="#3987e5" />
      </div>

      <h2 className="mt-10 text-sm font-medium text-ink-primary">Commodity prices</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMMODITY_PRICES.map((c) => (
          <CommodityCard key={c.id} commodity={c} />
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-ink-primary">
        Supplier distress ({distressedSuppliers.length})
      </h2>
      <p className="mt-1 text-xs text-ink-muted">
        Suppliers from the Supplier Exposure Map at or above the Critical risk threshold.
      </p>
      <div className="mt-4">
        <SupplierTable items={distressedSuppliers} />
      </div>

      <h2 className="mt-10 text-sm font-medium text-ink-primary">
        Active trade &amp; regulatory changes ({tariffAlerts.length})
      </h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tariffAlerts.map((a) => (
          <AlertCard key={a.id} alert={a} />
        ))}
      </div>
    </div>
  );
}
