import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, CircleAlert, Minus } from "lucide-react";
import type { ActionStatus, Criticality, GsciTier } from "@/lib/types";

const CONFIG: Record<
  Criticality,
  { dot: string; text: string; ring: string; icon: typeof Minus; label: string }
> = {
  Low: { dot: "bg-status-good", text: "text-status-good", ring: "ring-status-good/25", icon: Minus, label: "Low" },
  Medium: {
    dot: "bg-status-warning",
    text: "text-status-warning",
    ring: "ring-status-warning/25",
    icon: CircleAlert,
    label: "Medium",
  },
  Critical: {
    dot: "bg-status-critical",
    text: "text-status-critical",
    ring: "ring-status-critical/30",
    icon: AlertTriangle,
    label: "Critical",
  },
};

/**
 * Criticality badge. Never relies on color alone — the status hues fail a
 * color-vision-deficiency separation check in isolation (red/green pair), so
 * every instance carries an icon AND a text label as the required mitigation.
 */
export function CriticalityBadge({ level, className }: { level: Criticality; className?: string }) {
  const c = CONFIG[level];
  const Icon = c.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-2.5 py-1 text-xs font-medium ring-1",
        c.text,
        c.ring,
        className
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {c.label}
    </span>
  );
}

const ACTION_CONFIG: Record<ActionStatus, { dot: string; text: string; ring: string; icon: typeof Minus }> = {
  Open: { dot: "bg-status-warning", text: "text-status-warning", ring: "ring-status-warning/25", icon: CircleAlert },
  Closed: { dot: "bg-status-good", text: "text-status-good", ring: "ring-status-good/25", icon: CheckCircle2 },
};

/** Action-tracker status badge — same icon+label mitigation as CriticalityBadge. */
export function ActionStatusBadge({ status, className }: { status: ActionStatus; className?: string }) {
  const c = ACTION_CONFIG[status];
  const Icon = c.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-2.5 py-1 text-xs font-medium ring-1",
        c.text,
        c.ring,
        className
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {status}
    </span>
  );
}

const TIER_CONFIG: Record<GsciTier, string> = {
  Free: "border-border text-ink-muted",
  Professional: "border-signal-cyan/30 text-signal-cyan",
  Enterprise: "border-signal-amber/30 text-signal-amber",
  Strategic: "border-signal-emerald/30 text-signal-emerald",
};

/** Commercial-tier label — shown on every index/report so visitors can see
 *  the real product structure, but never hides content: this demo site's
 *  job is to show the full platform, not paywall it. */
export function TierBadge({ tier, className }: { tier: GsciTier; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        TIER_CONFIG[tier],
        className
      )}
    >
      {tier}
    </span>
  );
}

export function TagBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs text-ink-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
