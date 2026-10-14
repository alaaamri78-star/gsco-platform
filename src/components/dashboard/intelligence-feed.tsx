import type { FeedItem } from "@/lib/types";
import { CriticalityBadge, TagBadge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export function IntelligenceFeed({ items }: { items: FeedItem[] }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-panel">
      <div className="border-b border-border-subtle p-5 pb-4">
        <h3 className="text-sm font-medium text-ink-primary">
          Real-time intelligence feed
        </h3>
        <p className="text-xs text-ink-muted">{items.length} items matching current filters</p>
      </div>

      <ul className="flex-1 divide-y divide-border-subtle overflow-y-auto">
        {items.map((item) => (
          <li key={item.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <CriticalityBadge level={item.criticality} />
              <span className="shrink-0 font-mono text-[11px] text-ink-muted">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 block text-sm font-medium leading-snug text-ink-primary hover:text-signal-cyan"
            >
              {item.title}
            </a>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-secondary">
              {item.summary}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <TagBadge>{item.sector}</TagBadge>
              <TagBadge>{item.region}</TagBadge>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-signal-cyan"
              >
                <ExternalLink className="h-3 w-3" strokeWidth={2} />
                {item.sourceName}
              </a>
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <li className="p-8 text-center text-sm text-ink-muted">
            No signals match these filters. Try widening sector or region.
          </li>
        )}
      </ul>
    </div>
  );
}
