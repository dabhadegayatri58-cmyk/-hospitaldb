import { ArrowRight } from 'lucide-react';
import { HERO_MEDIA, HERO_PROOF_METRICS } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

export function Hero() {
  return (
    <section
      id="top"
      className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Value proposition */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-normal mb-5">
                Zurich &amp; San Francisco <span aria-hidden="true">·</span> React Front-End Engineering
              </p>

              <h1
                className="font-display font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
              >
                Precision web front ends engineered in React.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[54ch]">
                We partner with product and engineering teams to build high-density React
                interfaces, typed component systems, and accessible web applications that stay
                responsive under real production data.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#workbench"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>Explore the Workbench</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#case-studies"
                className="inline-flex items-center px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                View Case Studies
              </a>
            </div>
          </div>

          {/* Right column: Dominant 16:9 focal media */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <ResilientImage
                src={HERO_MEDIA.src}
                alt={HERO_MEDIA.alt}
                fallbackTitle="Gridline Studio Engineering Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column proof strip directly below the hero split */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HERO_PROOF_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1.5">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-50 tabular-nums tracking-tight">
                {metric.value}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
