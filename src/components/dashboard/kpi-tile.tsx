import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiTileProps {
  label: string;
  value: string;
  delta?: { value: string; direction: "up" | "down"; tone: "good" | "bad" };
  icon: LucideIcon;
  accent?: string;
  /** Optional one-line method/source note rendered under the value — used
   *  where a KPI's methodology isn't self-evident from its label alone. */
  note?: string;
}

export function KpiTile({ label, value, delta, icon: Icon, accent = "#3987e5", note }: KpiTileProps) {
  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-secondary">{label}</span>
        <Icon className="h-4 w-4" strokeWidth={2} style={{ color: accent }} />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-3xl font-semibold text-ink-primary">{value}</span>
        {delta && (
          <span
            className={cn(
              "text-xs font-medium",
              delta.tone === "good" ? "text-status-good" : "text-status-critical"
            )}
          >
            {delta.direction === "up" ? "+" : "−"}
            {delta.value}
          </span>
        )}
      </div>
      {note && <p className="mt-2 text-[10.5px] leading-snug text-ink-muted">{note}</p>}
    </div>
  );
}
