import { Anchor, Gavel, Handshake, Landmark, Route, Truck, type LucideIcon } from "lucide-react";
import type { AlertItem } from "@/lib/types";
import { CriticalityBadge, TagBadge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";

const ENTITY_ICON: Record<AlertItem["entityType"], LucideIcon> = {
  Port: Anchor,
  Corridor: Route,
  Carrier: Truck,
  Policy: Landmark,
  Court: Gavel,
  Transaction: Handshake,
};

export function AlertCard({ alert }: { alert: AlertItem }) {
  const EntityIcon = ENTITY_ICON[alert.entityType];

  return (
    <article className="flex flex-col rounded-xl border border-border bg-panel p-5 transition-colors hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <CriticalityBadge level={alert.severity} />
        <span className="shrink-0 font-mono text-[11px] text-ink-muted">
          {formatRelativeTime(alert.timestamp)}
        </span>
      </div>

      <h3 className="mt-3 text-[15px] font-medium leading-snug text-ink-primary">{alert.title}</h3>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-secondary">
        <EntityIcon className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2} />
        <span>{alert.entity}</span>
        <span className="text-ink-muted">· {alert.entityType}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-ink-muted">
        <span>
          Severity <span className="text-ink-primary">{alert.severityScore}</span>/100
        </span>
        <span>
          Confidence <span className="text-ink-primary">{alert.confidence}</span>
        </span>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-ink-muted">
        <span className="text-ink-secondary">Affects:</span> {alert.affectedEntities.join(" · ")}
      </p>

      <div className="mt-4 flex-1 rounded-lg border-l-2 border-signal-cyan/40 bg-white/[0.02] px-3 py-2.5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-signal-cyan">
          Recommended action
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-secondary">{alert.recommendedAction}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
        <div className="flex flex-wrap gap-2">
          <TagBadge>{alert.sector}</TagBadge>
          <TagBadge>{alert.region}</TagBadge>
        </div>
        <span className="shrink-0 text-xs italic text-ink-muted">Per industry reporting</span>
      </div>
    </article>
  );
}
