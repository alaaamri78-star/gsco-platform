"use client";

import { useState } from "react";
import Link from "next/link";
import { Radar, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/alerts", label: "Alerts" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/corridors", label: "Corridors" },
  { href: "/indices", label: "Indices" },
  { href: "/procurement", label: "Procurement" },
  { href: "/logistics", label: "Logistics" },
  { href: "/resilience", label: "Resilience" },
  { href: "/alert-performance", label: "Alert Log" },
  { href: "/reports", label: "Report Center" },
  { href: "/rankings/top-50-organizations", label: "Top 50 Supply Chain Organizations" },
  { href: "/rankings/top-50-csco", label: "Top 50 CSCO" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-cyan/10 ring-1 ring-signal-cyan/30">
            <Radar className="h-4 w-4 text-signal-cyan" strokeWidth={2} />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            GSCI
          </span>
          <span className="hidden text-xs text-ink-muted sm:inline">
            Global Supply Chain Index
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="rounded-lg bg-signal-cyan px-4 py-2 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
          >
            Open console
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.02] text-ink-primary"
          >
            {open ? <X className="h-4 w-4" strokeWidth={2} /> : <Menu className="h-4 w-4" strokeWidth={2} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid grid-cols-1 gap-0.5 border-t border-border-subtle px-6 py-3 sm:grid-cols-3 lg:grid-cols-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-[15px] text-ink-secondary transition-colors hover:bg-white/[0.04] hover:text-ink-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
