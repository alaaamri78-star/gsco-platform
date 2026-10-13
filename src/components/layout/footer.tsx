export function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} GSCI. All rights reserved.</p>
        <p>www.globalsupplychainindex.org</p>
      </div>
    </footer>
  );
}
