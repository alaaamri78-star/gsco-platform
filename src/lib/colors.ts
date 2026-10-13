/**
 * Chart color roles — checked for contrast and color-vision-deficiency
 * separation against our dark surface (#09090b).
 *
 * Categorical (trend lines, adjacent-pairlist, first 3 slots only — a scatter
 * or any all-pairs context must not borrow past slot 3 without re-checking):
 *   "#3987e5,#d95926,#199e70" against #09090b -> passes contrast + CVD checks.
 *
 * Status (criticality — always paired with an icon + text label, never color
 * alone: the red/green pair fails CVD separation by design, which is why the
 * mitigation is mandatory, not optional):
 *   "#0ca30c,#fab219,#d03b3b" against #09090b -> lightness/CVD checks fail in
 *   isolation; mitigated by icon+label pairing.
 */

export const CATEGORICAL = {
  redSea: "#3987e5", // slot 1 — "Red Sea rerouting"
  cbam: "#d95926", // slot 2 — "EU carbon tariff (CBAM)"
  rareEarth: "#199e70", // slot 3 — "Rare earth export curbs"
} as const;

export const STATUS = {
  Low: "#0ca30c",
  Medium: "#fab219",
  Critical: "#d03b3b",
} as const;

export const CHART_CHROME = {
  surface: "#0e0e11",
  gridline: "rgba(255,255,255,0.08)",
  axis: "#3f3f46",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
} as const;
