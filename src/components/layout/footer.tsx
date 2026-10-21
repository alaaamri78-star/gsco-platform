export function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm leading-relaxed text-ink-secondary">
          Global Supply Chain Index (GSCI) is a supply chain intelligence
          and research platform focused on global trade, logistics,
          procurement, market developments and supply chain risk. GSCI aims
          to make relevant intelligence more accessible and structured for
          professionals navigating an increasingly interconnected global
          supply chain environment.
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} GSCI. All rights reserved.</p>
          <p>www.globalsupplychainindex.org</p>
        </div>
      </div>
    </footer>
  );
}
