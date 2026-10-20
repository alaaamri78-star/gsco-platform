# GSCI — Global Supply Chain Index

Economic Intelligence platform: weak-signal detection, risk & threat mapping,
and a situational-note report center.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS (custom dark "cyber-SaaS" theme — see `tailwind.config.ts`)
- Recharts for all data visualization
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
src/
  app/
    page.tsx            Landing page (hero + console preview)
    dashboard/page.tsx  Dashboard / demo space
    reports/page.tsx    Report Center
    layout.tsx          Root layout, fonts, globals
    globals.css
  components/
    layout/             Navbar, Footer
    landing/            Hero, SignalMap (SVG corridor network), ConsolePreview
    dashboard/          FilterBar, KpiTile, TrendChart, RiskMatrix, IntelligenceFeed
    reports/            ReportCard, ReportsClient
    ui/                 GlassPanel, Badge (CriticalityBadge/TagBadge), Button
  lib/
    types.ts            Domain types (Sector, Region, RiskItem, FeedItem, ReportItem…)
    mock-data.ts        Mock Economic Intelligence dataset
    colors.ts            Chart color roles, validated for contrast & color-blind safety
    utils.ts            cn(), formatCompactUsd(), formatRelativeTime(), formatShortDate()
```

## Data

All data in `src/lib/mock-data.ts` is fictional, generated deterministically
(no `Math.random`, so server and client always render the same values —
no hydration mismatches). Replace it with a real feed/API by keeping the
same shapes from `src/lib/types.ts`.

## Color & accessibility

Chart colors are picked and validated against the dark surface for contrast
and color-vision-deficiency separation (see comments in `src/lib/colors.ts`):
a 3-slot categorical set
for the trend chart's topic lines, and a status set for criticality that is
**always** paired with an icon + text label (the red/green pair fails
colorblind-separation in isolation by design — this is the documented
mitigation, not an oversight).
