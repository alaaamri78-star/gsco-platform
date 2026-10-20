import { clsx, type ClassValue } from "clsx";
import type { Criticality } from "./types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Shared 0-100 risk-score banding used by the Supplier Exposure Map and
 *  Corridor Risk Scores pages — Critical >=70, Medium 40-69, Low <40. */
export function riskLevelFromScore(score: number): Criticality {
  if (score >= 70) return "Critical";
  if (score >= 40) return "Medium";
  return "Low";
}

export function formatCompactUsd(valueUsdM: number): string {
  if (valueUsdM >= 1000) {
    return `$${(valueUsdM / 1000).toFixed(1)}B`;
  }
  return `$${Math.round(valueUsdM)}M`;
}

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}
