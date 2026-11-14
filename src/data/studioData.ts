import heroStudioImg from '../assets/images/hero_frontend_studio_1794635446737.jpg';
import fintechLedgerImg from '../assets/images/case_fintech_ledger_1794635446186.jpg';
import commerceAtelierImg from '../assets/images/case_commerce_atelier_1794635446811.jpg';
import telemetryConsoleImg from '../assets/images/case_telemetry_console_1794635447737.jpg';

export type CapabilityId = 'systems' | 'grids' | 'a11y' | 'performance';

export interface CapabilityItem {
  id: CapabilityId;
  index: string;
  title: string;
  summary: string;
  span: 'wide' | 'standard';
  outcome: string;
  deliverables: string[];
  stack: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'Fintech' | 'Commerce' | 'Telemetry';
  timeframe: string;
  headlineMetric: string;
  summary: string;
  image: string;
  imageAlt: string;
  challenge: string;
  architecture: string;
  results: { label: string; value: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ComponentModuleRow {
  id: string;
  name: string;
  layer: 'Primitives' | 'Data Display' | 'Navigation' | 'Forms';
  status: 'Verified' | 'In Review' | 'Deprecated';
  bundleKb: number;
  renderMs: number;
  wcagLevel: 'AAA' | 'AA';
  updatedAt: string;
  notes: string;
}

export const HERO_MEDIA = {
  src: heroStudioImg,
  alt: 'Software engineer reviewing a React grid architecture and typography layout in a sunlit design studio',
};

export const HERO_PROOF_METRICS = [
  {
    value: '38 ms',
    label: 'Median interaction latency across shipped React workspaces',
  },
  {
    value: '99.94%',
    label: 'Client-side stability rate monitored across 2.4M monthly sessions',
  },
  {
    value: '18',
    label: 'Multi-brand React & TypeScript design systems in production',
  },
  {
    value: '100%',
    label: 'WCAG 2.2 AA keyboard and screen-reader audit compliance',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'systems',
    index: '01.',
    title: 'Design Systems & Token Architecture',
    summary:
      'Composable React component libraries built with strict TypeScript contracts, semantic CSS variables, and automated visual regression suites.',
    span: 'wide',
    outcome: 'Cut feature UI assembly time by 46% across 4 product squads within 90 days.',
    deliverables: [
      'Typed React primitive API with polymorphic composition',
      'Figma-to-CSS variable token pipeline with dark and high-contrast themes',
      'Automated Playwright visual diffing and Storybook documentation',
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Radix Primitives'],
  },
  {
    id: 'grids',
    index: '02.',
    title: 'High-Density Data Grids & State',
    summary:
      'Virtualized financial ledgers, sortable analytical tables, and deterministic state machines engineered to stay responsive at 50,000+ rows.',
    span: 'standard',
    outcome: 'Maintained 60 fps scrolling and sub-16 ms cell updates under live WebSocket streams.',
    deliverables: [
      'Windowed row/column virtualization with pinned headers',
      'Keyboard cell navigation and multi-column sorting',
      'Optimistic mutation queues with conflict rollback',
    ],
    stack: ['TanStack Table', 'TanStack Query', 'Zustand', 'Web Workers'],
  },
  {
    id: 'a11y',
    index: '03.',
    title: 'Accessibility & Keyboard Ergonomics',
    summary:
      'Focus-trap management, roving tabindex patterns, live-region announcements, and verified 4.5:1 contrast pairings built into the foundation.',
    span: 'standard',
    outcome: 'Zero blocking accessibility findings in independent enterprise VPAT audits.',
    deliverables: [
      'WAI-ARIA roving tabindex for menus, toolbars, and segmented controls',
      'Reduced-motion safe transitions using compositor-only transforms',
      'Automated axe-core CI gates on every pull request',
    ],
    stack: ['WAI-ARIA 1.2', 'axe-core', 'Playwright A11y', 'Semantic HTML5'],
  },
  {
    id: 'performance',
    index: '04.',
    title: 'Bundle Discipline & Core Web Vitals',
    summary:
      'Route-level code splitting, selective hydration, asset preloading, and strict dependency budgets to keep initial payloads lean on slow networks.',
    span: 'wide',
    outcome: 'Reduced initial JavaScript parse weight from 410 KB to 118 KB gzipped.',
    deliverables: [
      'Bundle treemap audits and tree-shaking enforcement',
      'Zero-CLS font loading and intrinsic image aspect reservations',
      'Real-user INP, LCP, and memory leak profiling',
    ],
    stack: ['Vite', 'React Profiler', 'Web Vitals API', 'Rollup Analyzer'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'helvetia-ledger',
    title: 'Multi-Currency Treasury Ledger & Forecasting Workbench',
    client: 'Helvetia Clearing AG',
    category: 'Fintech',
    timeframe: '14 Weeks · 2025',
    headlineMetric: '-64% reconciliation task time across 120 treasury analysts',
    summary:
      'Rebuilt a legacy multi-tab banking portal into a keyboard-first React workspace capable of filtering 85,000 daily settlement rows without frame drops.',
    image: fintechLedgerImg,
    imageAlt: 'Aluminum laptop on slate stone displaying a crisp financial settlement ledger interface',
    challenge:
      'Analysts waited 4.2 seconds per filter change and suffered layout shifts whenever live FX rates updated.',
    architecture:
      'Implemented a Web Worker indexing layer paired with a virtualized React table, tabular-nums formatting, and deterministic optimistic state updates.',
    results: [
      { label: 'Filter Response', value: '4.2 s → 28 ms' },
      { label: 'Bundle Size', value: '390 KB → 124 KB' },
      { label: 'Analyst Throughput', value: '+64% daily clears' },
    ],
    testimonial: {
      quote:
        'Before the rebuild, analysts kept spreadsheets open next to the browser because filtering stalled. Now every reconciliation happens inside one keyboard-navigable React view.',
      author: 'Lukas Meier',
      role: 'VP of Treasury Platforms, Helvetia Clearing AG',
    },
  },
  {
    id: 'nord-atelier',
    title: 'Architectural Furniture Storefront & Material Configurator',
    client: 'Nordform Objects',
    category: 'Commerce',
    timeframe: '10 Weeks · 2025',
    headlineMetric: '+38% mobile checkout completion within 60 days of launch',
    summary:
      'Engineered an editorial storefront and instant timber/stone finish configurator with zero layout shift and sub-second product page transitions.',
    image: commerceAtelierImg,
    imageAlt: 'Glass tablet on travertine stone displaying a minimalist furniture e-commerce storefront',
    challenge:
      'High-resolution product media and bloated third-party scripts pushed mobile Largest Contentful Paint past 5.1 seconds.',
    architecture:
      'Replaced heavy carousel bundles with native CSS scroll-snap, pre-calculated aspect containers, and a declarative React cart drawer backed by URL-synced variant state.',
    results: [
      { label: 'Mobile LCP', value: '5.1 s → 1.2 s' },
      { label: 'Checkout Conversion', value: '+38% uplift' },
      { label: 'Cumulative Layout Shift', value: '0.002 CLS' },
    ],
    testimonial: {
      quote:
        'Our previous storefront felt sluggish on phones. Gridline stripped out three layers of script overhead and gave our timber finishes an immediate, tactile presence.',
      author: 'Astrid Lindqvist',
      role: 'Head of Digital Commerce, Nordform Objects',
    },
  },
  {
    id: 'kestrel-telemetry',
    title: 'Environmental Chamber & Acoustic Test Console',
    client: 'Kestrel Instrumentation',
    category: 'Telemetry',
    timeframe: '12 Weeks · 2026',
    headlineMetric: '60 fps live charting across 16 concurrent hardware channels',
    summary:
      'Designed and built a high-contrast laboratory monitoring console for hardware QA engineers tracking thermal ramp cycles and anomaly logs.',
    image: telemetryConsoleImg,
    imageAlt: 'Engineering workstation monitor displaying clean geometric telemetry charts and monospace tables',
    challenge:
      'Existing browser charts froze after 20 minutes of 10 Hz sensor streaming due to React reconciliation overhead.',
    architecture:
      'Separated ring-buffer sample ingestion from React render cycles using requestAnimationFrame batching and SVG/Canvas hybrid viewports.',
    results: [
      { label: '8-Hour Memory Growth', value: '< 14 MB steady' },
      { label: 'Frame Budget', value: '11.4 ms avg' },
      { label: 'Operator Errors', value: '-52% false flags' },
    ],
    testimonial: {
      quote:
        'Test runs used to crash the browser tab overnight. After Gridline refactored the state pipeline, engineers monitor 16 chambers continuously without a single reload.',
      author: 'Dr. Hannah Cho',
      role: 'Director of Hardware Validation, Kestrel Instrumentation',
    },
  },
];

export const WORKBENCH_MODULES: ComponentModuleRow[] = [
  {
    id: 'mod-datagrid',
    name: 'VirtualizedDataGrid',
    layer: 'Data Display',
    status: 'Verified',
    bundleKb: 8.4,
    renderMs: 4.2,
    wcagLevel: 'AA',
    updatedAt: '2026-10-28',
    notes: 'Supports pinned columns, keyboard cell focus, and 50k virtualized rows with zero layout jitter.',
  },
  {
    id: 'mod-combobox',
    name: 'AsyncCommandSelect',
    layer: 'Forms',
    status: 'Verified',
    bundleKb: 5.1,
    renderMs: 2.1,
    wcagLevel: 'AAA',
    updatedAt: '2026-11-04',
    notes: 'Debounced search listbox with ARIA active-descendant tracking and screen-reader match count announcements.',
  },
  {
    id: 'mod-segmented',
    name: 'SegmentedControl',
    layer: 'Navigation',
    status: 'Verified',
    bundleKb: 2.3,
    renderMs: 1.4,
    wcagLevel: 'AAA',
    updatedAt: '2026-10-19',
    notes: 'Roving tabindex horizontal control with single-line label guarantees and reduced-motion indicator.',
  },
  {
    id: 'mod-drawer',
    name: 'AccessibleSheetDrawer',
    layer: 'Primitives',
    status: 'Verified',
    bundleKb: 4.7,
    renderMs: 3.0,
    wcagLevel: 'AA',
    updatedAt: '2026-11-02',
    notes: 'Focus trap with Escape dismissal, return-focus restoration, and inert background locking.',
  },
  {
    id: 'mod-ledger-input',
    name: 'CurrencyNumericField',
    layer: 'Forms',
    status: 'In Review',
    bundleKb: 3.6,
    renderMs: 1.8,
    wcagLevel: 'AA',
    updatedAt: '2026-11-11',
    notes: 'Intl.NumberFormat locale parsing with caret-position preservation and tabular-nums alignment.',
  },
  {
    id: 'mod-sparkline',
    name: 'TabularSparkline',
    layer: 'Data Display',
    status: 'Verified',
    bundleKb: 2.9,
    renderMs: 1.9,
    wcagLevel: 'AA',
    updatedAt: '2026-10-12',
    notes: 'Pure SVG inline series with pointer scrubbing and accessible tabular data fallback.',
  },
  {
    id: 'mod-legacy-modal',
    name: 'PortalDialogV1',
    layer: 'Primitives',
    status: 'Deprecated',
    bundleKb: 9.8,
    renderMs: 7.6,
    wcagLevel: 'AA',
    updatedAt: '2026-07-09',
    notes: 'Replaced by AccessibleSheetDrawer; scheduled for removal in Q1 2027 migration cycle.',
  },
];
