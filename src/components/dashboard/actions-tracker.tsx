"use client";

import { useMemo, useState } from "react";
import type { ActionItem, ActionStatus, RiskItem } from "@/lib/types";
import { ActionStatusBadge } from "@/components/ui/badge";
import { cn, formatShortDate } from "@/lib/utils";

const FILTERS: (ActionStatus | "All")[] = ["All", "Open", "Closed"];

export function ActionsTracker({ items, risks }: { items: ActionItem[]; risks: RiskItem[] }) {
  const [filter, setFilter] = useState<ActionStatus | "All">("All");

  const riskById = useMemo(() => new Map(risks.map((r) => [r.id, r])), [risks]);

  const openCount = items.filter((a) => a.status === "Open").length;
  const closedCount = items.filter((a) => a.status === "Closed").length;

  const filtered = items
    .filter((a) => filter === "All" || a.status === filter)
    .sort((a, b) => (a.updatedDate < b.updatedDate ? 1 : -1));

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-ink-primary">Actions — open or closed</h3>
          <p className="text-xs text-ink-muted">
            {openCount} open · {closedCount} closed · tracked against the risks above
          </p>
          <p className="mt-1 max-w-md text-[11px] leading-relaxed text-ink-muted">
            Owner, status, related risk and last-updated date are tracked today; due date,
            priority and overdue status aren&apos;t yet in this data model. An action&apos;s
            status reflects progress on that specific response — marking it Closed doesn&apos;t
            change the related risk&apos;s own criticality above.
          </p>
        </div>

        <div className="flex gap-1 rounded-lg border border-border bg-panel-raised p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                filter === f ? "bg-white/[0.08] text-ink-primary" : "text-ink-muted hover:text-ink-secondary"
              )}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 divide-y divide-border-subtle">
        {filtered.map((a) => {
          const risk = riskById.get(a.riskId);
          return (
            <li key={a.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-snug text-ink-primary">{a.title}</p>
                <p className="mt-1 text-[11px] text-ink-muted">
                  {a.owner}
                  {risk && <> · in response to &ldquo;{risk.label}&rdquo;</>}
                  {" · "}
                  {formatShortDate(a.updatedDate)}
                </p>
              </div>
              <ActionStatusBadge status={a.status} className="shrink-0" />
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="py-8 text-center text-sm text-ink-muted">No actions match this filter.</li>
        )}
      </ul>
    </div>
  );
}
