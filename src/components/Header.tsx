import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onStartProject: () => void;
}

const NAV_ITEMS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Workbench', href: '#workbench' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Contact', href: '#contact' },
];

export function Header({ onStartProject }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileAction = () => {
    setMobileOpen(false);
    onStartProject();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 whitespace-nowrap shrink-0"
        >
          Gridline Studio
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-slate-950 dark:hover:text-white underline-offset-4 hover:underline transition-colors duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onStartProject}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Start a Project
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleMobileAction}
              className="mt-2 w-full py-2.5 px-4 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              Start a Project
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
