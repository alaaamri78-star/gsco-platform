import { ArrowUpRight, FileText } from "lucide-react";
import type { ReportItem } from "@/lib/types";
import { TagBadge } from "@/components/ui/badge";

const CATEGORY_ACCENT: Record<ReportItem["category"], string> = {
  "Situational Note": "#3987e5",
  "Sector Deep-Dive": "#199e70",
  "Risk Bulletin": "#d03b3b",
  "Benchmark Report": "#d95926",
};

export function ReportCard({ report }: { report: ReportItem }) {
  const accent = CATEGORY_ACCENT[report.category];
  return (
    <article className="flex flex-col rounded-xl border border-border bg-panel p-5 transition-colors hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ color: accent, backgroundColor: `${accent}1a` }}
        >
          {report.category}
        </span>
        <FileText className="h-4 w-4 text-ink-muted" strokeWidth={2} />
      </div>

      <h3 className="mt-3 text-[15px] font-medium leading-snug text-ink-primary">
        {report.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">
        {report.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <TagBadge>{report.sector}</TagBadge>
        <TagBadge>{report.region}</TagBadge>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
        <span className="font-mono text-xs text-ink-muted">
          {new Date(report.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          {" · "}
          {report.sourceName}
        </span>
        <a
          href={report.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-cyan hover:opacity-80"
        >
          Read
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}
