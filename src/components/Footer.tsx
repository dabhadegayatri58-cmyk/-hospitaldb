export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Gridline Studio
          </span>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Zurich · San Francisco · hello@gridlinestudio.dev
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          <a href="#capabilities" className="hover:text-slate-900 dark:hover:text-slate-100">
            Capabilities
          </a>
          <a href="#workbench" className="hover:text-slate-900 dark:hover:text-slate-100">
            Workbench
          </a>
          <a href="#case-studies" className="hover:text-slate-900 dark:hover:text-slate-100">
            Case Studies
          </a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-slate-100">
            Contact
          </a>
        </nav>

        <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          © 2026 Gridline Studio
        </p>
      </div>
    </footer>
  );
}
