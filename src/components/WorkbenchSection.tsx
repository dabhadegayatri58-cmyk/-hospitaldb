import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpDown,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Monitor,
  Moon,
  RotateCcw,
  Search,
  Smartphone,
  Sun,
  Tablet,
} from 'lucide-react';
import { WORKBENCH_MODULES, type ComponentModuleRow } from '../data/studioData';

type WorkbenchTab = 'grid' | 'layout' | 'tokens';
type LayerFilter = 'All' | ComponentModuleRow['layer'];
type SortKey = 'name' | 'bundleKb' | 'renderMs' | 'updatedAt';
type ViewportPreset = 'desktop' | 'tablet' | 'mobile';
type DensityPreset = 'compact' | 'balanced' | 'editorial';

interface AccentOption {
  id: string;
  label: string;
  hex: string;
  contrastLight: string;
  contrastDark: string;
  wcagGrade: string;
}

const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: 'cobalt',
    label: 'Cobalt',
    hex: '#1D4ED8',
    contrastLight: '6.70 : 1',
    contrastDark: '4.85 : 1',
    wcagGrade: 'AA / AAA on Light',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    hex: '#0F172A',
    contrastLight: '17.85 : 1',
    contrastDark: '15.20 : 1',
    wcagGrade: 'AAA Verified',
  },
  {
    id: 'emerald',
    label: 'Forest',
    hex: '#047857',
    contrastLight: '5.48 : 1',
    contrastDark: '5.12 : 1',
    wcagGrade: 'AA Verified',
  },
  {
    id: 'ochre',
    label: 'Ochre',
    hex: '#B45309',
    contrastLight: '5.02 : 1',
    contrastDark: '5.34 : 1',
    wcagGrade: 'AA Verified',
  },
];

interface WorkbenchSectionProps {
  isDark: boolean;
  onToggleTheme: (dark: boolean) => void;
}

export function WorkbenchSection({ isDark, onToggleTheme }: WorkbenchSectionProps) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('grid');

  // Tab 1 state: Data Grid
  const [searchQuery, setSearchQuery] = useState('');
  const [layerFilter, setLayerFilter] = useState<LayerFilter>('All');
  const [sortKey, setSortKey] = useState<SortKey>('bundleKb');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(WORKBENCH_MODULES[0].id);

  // Tab 2 state: Layout & Density
  const [viewport, setViewport] = useState<ViewportPreset>('desktop');
  const [density, setDensity] = useState<DensityPreset>('balanced');

  // Tab 3 state: Tokens & Contrast
  const [selectedAccent, setSelectedAccent] = useState<AccentOption>(ACCENT_OPTIONS[0]);
  const [copiedTokens, setCopiedTokens] = useState(false);

  const filteredModules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return WORKBENCH_MODULES.filter((row) => {
      const matchesLayer = layerFilter === 'All' || row.layer === layerFilter;
      const matchesQuery =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.layer.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q);
      return matchesLayer && matchesQuery;
    }).sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      if (sortKey === 'bundleKb') return (a.bundleKb - b.bundleKb) * dir;
      if (sortKey === 'renderMs') return (a.renderMs - b.renderMs) * dir;
      return a[sortKey].localeCompare(b[sortKey]) * dir;
    });
  }, [searchQuery, layerFilter, sortKey, sortAsc]);

  const selectedModule =
    WORKBENCH_MODULES.find((m) => m.id === selectedModuleId) ?? WORKBENCH_MODULES[0];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const resetGridFilters = () => {
    setSearchQuery('');
    setLayerFilter('All');
    setSortKey('bundleKb');
    setSortAsc(true);
  };

  const handleResetWorkbench = () => {
    resetGridFilters();
    setViewport('desktop');
    setDensity('balanced');
    setSelectedAccent(ACCENT_OPTIONS[0]);
    onToggleTheme(false);
  };

  const tokenSnippet = `:root {
  --surface-canvas: ${isDark ? '#020617' : '#F8FAFC'};
  --surface-panel: ${isDark ? '#0F172A' : '#FFFFFF'};
  --ink-primary: ${isDark ? '#F8FAFC' : '#0F172A'};
  --accent-primary: ${selectedAccent.hex};
  --radius-panel: 0.75rem;
  --density-pad: ${density === 'compact' ? '0.75rem' : density === 'balanced' ? '1.25rem' : '1.75rem'};
}`;

  const handleCopyTokens = async () => {
    try {
      await navigator.clipboard.writeText(tokenSnippet);
      setCopiedTokens(true);
      setTimeout(() => setCopiedTokens(false), 1800);
    } catch {
      setCopiedTokens(false);
    }
  };

  const renderStatusIndicator = (status: ComponentModuleRow['status']) => {
    if (status === 'Verified') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Verified</span>
        </span>
      );
    }
    if (status === 'In Review') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>In Review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-700 dark:text-rose-400">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Deprecated</span>
      </span>
    );
  };

  return (
    <section
      id="workbench"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
              Interactive React Workbench
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
              Inspect live front-end patterns before writing a line of spec.
            </h2>
          </div>

          {/* Workspace toolbar: theme switcher + reset */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Color theme mode"
              className="inline-flex items-center p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg"
            >
              <button
                type="button"
                onClick={() => onToggleTheme(false)}
                aria-pressed={!isDark}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  !isDark
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleTheme(true)}
                aria-pressed={isDark}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isDark
                    ? 'bg-slate-950 text-slate-50 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Dark</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetWorkbench}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Main Workbench Frame */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
          {/* Segmented Tab Header */}
          <div className="px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/70">
            <div
              role="tablist"
              aria-label="Workbench demonstration modes"
              className="inline-flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg overflow-x-auto max-w-full"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'grid'}
                onClick={() => setActiveTab('grid')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'grid'
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Data Grid &amp; State
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'layout'}
                onClick={() => setActiveTab('layout')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'layout'
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Layout &amp; Density
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'tokens'}
                onClick={() => setActiveTab('tokens')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'tokens'
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tokens &amp; Contrast
              </button>
            </div>

            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
              {activeTab === 'grid' && `${filteredModules.length} of ${WORKBENCH_MODULES.length} modules`}
              {activeTab === 'layout' && `Viewport: ${viewport} · Density: ${density}`}
              {activeTab === 'tokens' && `Accent: ${selectedAccent.label} (${selectedAccent.hex})`}
            </div>
          </div>

          {/* TAB 1: Data Grid & State */}
          {activeTab === 'grid' && (
            <div className="p-5 sm:p-6 space-y-6">
              {/* Filter Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-72">
                  <Search
                    className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter modules by name or status..."
                    aria-label="Filter component modules"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div
                  role="group"
                  aria-label="Filter by component layer"
                  className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg"
                >
                  {(['All', 'Primitives', 'Data Display', 'Navigation', 'Forms'] as const).map(
                    (layer) => (
                      <button
                        key={layer}
                        type="button"
                        onClick={() => setLayerFilter(layer)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          layerFilter === layer
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        {layer}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Table + Inspector Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                  {filteredModules.length === 0 ? (
                    <div className="py-12 px-6 text-center space-y-3">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        No component modules match your current filters.
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Clear the search query or switch back to all component layers.
                      </p>
                      <button
                        type="button"
                        onClick={resetGridFilters}
                        className="mt-2 inline-flex items-center px-3.5 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <th className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleSort('name')}
                              className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
                            >
                              <span>Module</span>
                              <ArrowUpDown className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </th>
                          <th className="py-3 px-4">Layer</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleSort('bundleKb')}
                              className="inline-flex items-center gap-1 ml-auto hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
                            >
                              <span>Gzip</span>
                              <ArrowUpDown className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </th>
                          <th className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleSort('renderMs')}
                              className="inline-flex items-center gap-1 ml-auto hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
                            >
                              <span>Render</span>
                              <ArrowUpDown className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                        {filteredModules.map((row) => {
                          const isSelected = row.id === selectedModule.id;
                          return (
                            <tr
                              key={row.id}
                              onClick={() => setSelectedModuleId(row.id)}
                              className={`transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50/70 dark:bg-blue-950/30'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-900/60'
                              }`}
                            >
                              <td className="py-3 px-4 font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
                                {row.name}
                              </td>
                              <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-300">
                                {row.layer}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                {renderStatusIndicator(row.status)}
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-xs text-slate-700 dark:text-slate-300 tabular-nums">
                                {row.bundleKb.toFixed(1)} KB
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-xs text-slate-700 dark:text-slate-300 tabular-nums">
                                {row.renderMs.toFixed(1)} ms
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Selected Module Inspector */}
                <aside
                  aria-label="Selected component details"
                  className="lg:col-span-4 border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-slate-50 dark:bg-slate-900/60 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Module Inspection
                      </p>
                      <h3 className="mt-1 font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                        {selectedModule.name}
                      </h3>
                    </div>
                    {renderStatusIndicator(selectedModule.status)}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedModule.notes}
                  </p>

                  <dl className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Bundle Weight</dt>
                      <dd className="mt-0.5 font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                        {selectedModule.bundleKb.toFixed(1)} KB gzip
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Commit Render</dt>
                      <dd className="mt-0.5 font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                        {selectedModule.renderMs.toFixed(1)} ms
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Accessibility</dt>
                      <dd className="mt-0.5 font-mono font-medium text-slate-900 dark:text-slate-100">
                        WCAG {selectedModule.wcagLevel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Last Audited</dt>
                      <dd className="mt-0.5 font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                        {selectedModule.updatedAt}
                      </dd>
                    </div>
                  </dl>
                </aside>
              </div>
            </div>
          )}

          {/* TAB 2: Layout & Density */}
          {activeTab === 'layout' && (
            <div className="p-5 sm:p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Viewport selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Frame Width
                  </span>
                  <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setViewport('desktop')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewport === 'desktop'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewport('tablet')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewport === 'tablet'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Tablet className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Tablet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewport('mobile')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewport === 'mobile'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>

                {/* Density selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Spacing Density
                  </span>
                  <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                    {(['compact', 'balanced', 'editorial'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDensity(level)}
                        className={`px-3 py-1.5 text-xs font-medium capitalize rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          density === level
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsive Container Preview */}
              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-6 flex justify-center overflow-x-auto">
                <div
                  className={`w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg transition-all duration-200 ${
                    viewport === 'desktop'
                      ? 'max-w-full'
                      : viewport === 'tablet'
                        ? 'max-w-[680px]'
                        : 'max-w-[360px]'
                  } ${
                    density === 'compact'
                      ? 'p-4 space-y-3'
                      : density === 'balanced'
                        ? 'p-6 space-y-5'
                        : 'p-8 space-y-7'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Account Summary · Q4 Settlement
                      </p>
                      <h4 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
                        Operating Cash Ledger
                      </h4>
                    </div>
                    <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                      $1,482,910.40
                    </span>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      viewport === 'mobile'
                        ? 'grid-cols-1'
                        : viewport === 'tablet'
                          ? 'grid-cols-2'
                          : 'grid-cols-3'
                    }`}
                  >
                    {[
                      { name: 'Zurich Operating', amount: '$640,200.00', change: '+4.2% MoM' },
                      { name: 'San Francisco Reserve', amount: '$518,450.40', change: '+1.8% MoM' },
                      { name: 'London Clearing', amount: '$324,260.00', change: '-0.6% MoM' },
                    ].map((account) => (
                      <div
                        key={account.name}
                        className={`border border-slate-200 dark:border-slate-800 rounded-md ${
                          density === 'compact'
                            ? 'p-3'
                            : density === 'balanced'
                              ? 'p-4'
                              : 'p-5'
                        }`}
                      >
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {account.name}
                        </p>
                        <p className="mt-1.5 font-mono text-base font-semibold text-slate-900 dark:text-slate-50 tabular-nums">
                          {account.amount}
                        </p>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 tabular-nums">
                          {account.change}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Tokens & Contrast */}
          {activeTab === 'tokens' && (
            <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    Select Primary Accent Token
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {ACCENT_OPTIONS.map((option) => {
                      const active = selectedAccent.id === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedAccent(option)}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                            active
                              ? 'border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-900'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-sm shrink-0 border border-black/10"
                            style={{ backgroundColor: option.hex }}
                            aria-hidden="true"
                          />
                          <span className="text-xs font-medium text-slate-900 dark:text-slate-100">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live contrast & button preview */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Verified Contrast Ratio
                      </p>
                      <p className="mt-1 font-mono text-lg font-semibold text-slate-900 dark:text-slate-50 tabular-nums">
                        {isDark ? selectedAccent.contrastDark : selectedAccent.contrastLight}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{selectedAccent.wcagGrade}</span>
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      style={{ backgroundColor: selectedAccent.hex }}
                      className="px-4 py-2 text-xs font-medium text-white rounded-lg cursor-default"
                    >
                      Primary Action Preview
                    </button>
                    <span
                      style={{ color: selectedAccent.hex }}
                      className="text-xs font-medium underline underline-offset-4"
                    >
                      Inline Link Sample
                    </span>
                  </div>
                </div>
              </div>

              {/* Copyable CSS Variables */}
              <div className="lg:col-span-6 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-950 text-slate-100">
                <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-slate-400">tokens.css</span>
                  <button
                    type="button"
                    onClick={handleCopyTokens}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                  >
                    {copiedTokens ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Tokens</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-200">
                  <code>{tokenSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
