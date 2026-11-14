import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

type CategoryFilter = 'All Work' | CaseStudy['category'];

export function CaseStudiesSection() {
  const [filter, setFilter] = useState<CategoryFilter>('All Work');
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  const visibleStudies =
    filter === 'All Work'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.category === filter);

  useEffect(() => {
    if (!activeStudy) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStudy(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeStudy]);

  return (
    <section
      id="case-studies"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
              Selected Production Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
              Measurable front-end outcomes across complex products.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter case studies by industry"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg self-start md:self-auto"
          >
            {(['All Work', 'Fintech', 'Commerce', 'Telemetry'] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === category
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleStudies.map((study) => (
            <article
              key={study.id}
              className="group flex flex-col justify-between border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <ResilientImage
                    src={study.image}
                    alt={study.imageAlt}
                    fallbackTitle={study.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-6">
                  {/* Quiet unboxed metadata line */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{study.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{study.timeframe}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    {study.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {study.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-900 space-y-4">
                <p className="font-mono text-xs font-medium text-blue-700 dark:text-blue-400 tabular-nums">
                  {study.headlineMetric}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveStudy(study)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>Read Architecture Notes</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Architecture Drawer / Modal */}
      {activeStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setActiveStudy(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeStudy.client} · {activeStudy.category} · {activeStudy.timeframe}
                </p>
                <h3
                  id="case-study-dialog-title"
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
                >
                  {activeStudy.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveStudy(null)}
                aria-label="Close architecture notes"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
              {activeStudy.results.map((res) => (
                <div key={res.label}>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{res.label}</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-slate-900 dark:text-slate-50 tabular-nums">
                    {res.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Front-End Bottleneck
                </h4>
                <p>{activeStudy.challenge}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  React Architecture
                </h4>
                <p>{activeStudy.architecture}</p>
              </div>
            </div>

            <blockquote className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
                &ldquo;{activeStudy.testimonial.quote}&rdquo;
              </p>
              <footer className="text-xs text-slate-500 dark:text-slate-400">
                <strong className="font-medium text-slate-900 dark:text-slate-100">
                  {activeStudy.testimonial.author}
                </strong>{' '}
                · {activeStudy.testimonial.role}
              </footer>
            </blockquote>
          </div>
        </div>
      )}
    </section>
  );
}
