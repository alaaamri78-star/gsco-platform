"use client";

import { INDICES, NEARSHORE_SCORES } from "@/lib/mock-data";
import { IndexCard } from "./index-card";
import { NearshoreComparison } from "./nearshore-comparison";

export function IndicesClient() {
  const featured = INDICES.find((i) => i.id === "idx8");
  const cards = INDICES.filter((i) => i.id !== "idx8");

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-primary">
          Proprietary Indices
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          GSCI&apos;s composite benchmarks, each published on its own real-world cadence. Tier chips
          show the commercial product structure — every index is shown in full here.
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
    </div>
  );
}
