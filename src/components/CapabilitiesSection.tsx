import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { CAPABILITIES, type CapabilityId } from '../data/studioData';

export function CapabilitiesSection() {
  const [expandedId, setExpandedId] = useState<CapabilityId | null>('systems');

  const toggleCapability = (id: CapabilityId) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="capabilities"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
            Engineering Capabilities
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
            Four architectural disciplines behind every React release.
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Select any discipline to inspect concrete deliverables, stack standards, and the
            production outcome it supports.
          </p>
        </div>

        {/* Asymmetric bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {CAPABILITIES.map((cap) => {
            const isExpanded = expandedId === cap.id;
            const colClass = cap.span === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <article
                key={cap.id}
                className={`${colClass} rounded-xl border transition-colors duration-150 p-6 sm:p-8 flex flex-col justify-between ${
                  isExpanded
                    ? 'border-blue-700/40 dark:border-blue-500/50 bg-slate-50 dark:bg-slate-900'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs font-medium text-blue-700 dark:text-blue-400 tabular-nums">
                        {cap.index}
                      </span>
                      <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                        {cap.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCapability(cap.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Inspect'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cap.summary}
                  </p>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Measured Outcome
                        </p>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {cap.outcome}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Core Deliverables
                        </p>
                        <ul className="space-y-2">
                          {cap.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                            >
                              <Check
                                className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Unboxed metadata footer with typographic separators */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                  {cap.stack.map((tech, idx) => (
                    <span key={tech} className="inline-flex items-center gap-2">
                      <span>{tech}</span>
                      {idx < cap.stack.length - 1 && (
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
