import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReportFormat } from "@/lib/types";
import { TierBadge } from "@/components/ui/badge";

export function ReportFormatCard({ format }: { format: ReportFormat }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium leading-snug text-ink-primary">{format.name}</h3>
        <TierBadge tier={format.tier} />
      </div>
      <p className="mt-2 text-xs text-ink-secondary">{format.format}</p>
      <p className="mt-3 text-[11px] text-ink-muted">{format.whoBuys}</p>
      {format.href && (
        <Link
          href={format.href}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-signal-cyan hover:opacity-80"
        >
          Read this week&apos;s edition
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}
