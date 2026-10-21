"use client";

import { INDICES, NEARSHORE_SCORES } from "@/lib/mock-data";
import { IndexCard } from "./index-card";
import { NearshoreComparison } from "./nearshore-comparison";

export function IndicesClient() {
  const featured = INDICES.find((i) => i.id === "idx8");
  const cards = INDICES.filter((i) => i.id !== "idx8");

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          GSCI Proprietary Indices
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          GSCI indices organize selected market, logistics and supply chain indicators into
          structured measures that support comparison and trend analysis. Depending on the index,
          the methodology combines relevant observations, indicators or analytical assessments to
          track changes over time. Tier chips show which commercial plan includes each index.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((index) => (
          <IndexCard key={index.id} index={index} />
        ))}
      </div>

      {featured && (
        <div className="mt-8">
          <NearshoreComparison scores={NEARSHORE_SCORES} />
        </div>
      )}

      <div className="mt-10 max-w-3xl border-t border-border-subtle pt-8">
        <h2 className="text-sm font-medium text-ink-primary">Methodology &amp; data transparency</h2>
        <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
          Each index card states what it measures and its publication frequency. In general:
        </p>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-ink-secondary">
          <li>
            <span className="font-medium text-ink-primary">Data classification —</span> values
            combine observed data, reported events and analyst assessments; none are quoted
            real-time market prices.
          </li>
          <li>
            <span className="font-medium text-ink-primary">Scale —</span> every index is reported
            on a consistent 0–100 scale, with higher values indicating greater assessed risk or
            disruption for that index&apos;s subject.
          </li>
          <li>
            <span className="font-medium text-ink-primary">Updates —</span> each index updates on
            the cadence shown on its card (weekly, monthly or quarterly); the chart reflects the
            trailing period available for that cadence.
          </li>
          <li>
            <span className="font-medium text-ink-primary">Limitations —</span> comparisons
            between regions, periods or sectors are meaningful only where coverage and methodology
            are sufficiently consistent. These indices support analysis and decision-making; they
            do not replace organization-specific risk assessment or professional judgment.
          </li>
        </ul>
      </div>
    </div>
  );
}
