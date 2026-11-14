import { useState, type FormEvent, type RefObject } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  nameInputRef: RefObject<HTMLInputElement | null>;
}

interface FormValues {
  name: string;
  email: string;
  scope: 'Design System' | 'Web Application' | 'Performance Audit';
  timeline: 'Immediate (2-4 weeks)' | 'Next Quarter' | 'Flexible';
  brief: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  brief?: string;
}

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  scope: 'Web Application',
  timeline: 'Immediate (2-4 weeks)',
  brief: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection({ nameInputRef }: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const validate = (draft: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (draft.name.trim().length < 2) {
      next.name = 'Enter your full name (at least 2 characters).';
    }
    if (!EMAIL_PATTERN.test(draft.email.trim())) {
      next.email = 'Enter a valid work email address.';
    }
    if (draft.brief.trim().length < 15) {
      next.brief = 'Share at least 15 characters describing your React front-end goals.';
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedData(values);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Process & Expectations */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
              Project Intake
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
              Schedule a technical discovery call.
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Every engagement starts with a 45-minute architecture review with the principal
              engineers who will write your React code.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                01. Repository &amp; Bundle Review
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                We inspect your current component tree, state boundaries, and Core Web Vitals trace.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                02. Fixed-Scope Milestone Plan
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Receive a concrete delivery schedule with weekly staging builds within 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Validated Intake Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-8">
            {submittedData ? (
              <div className="py-6 space-y-5" role="status" aria-live="polite">
                <div className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Discovery request logged</span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  Thank you, {submittedData.name}.
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  We have recorded your <strong className="font-medium text-slate-900 dark:text-slate-100">{submittedData.scope}</strong> brief
                  for <span className="font-mono">{submittedData.email}</span> ({submittedData.timeline}). A principal
                  front-end engineer will follow up within one business day.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      type="text"
                      value={values.name}
                      onChange={(e) => {
                        setValues({ ...values, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="Elena Vance"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-rose-700 dark:text-rose-400"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Work Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      placeholder="elena@company.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-rose-700 dark:text-rose-400"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-scope"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Primary Engagement Scope
                    </label>
                    <select
                      id="contact-scope"
                      value={values.scope}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          scope: e.target.value as FormValues['scope'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-blue-700 focus:outline-none"
                    >
                      <option value="Web Application">Web Application Build</option>
                      <option value="Design System">React Design System</option>
                      <option value="Performance Audit">Performance &amp; A11y Audit</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-timeline"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Target Kickoff
                    </label>
                    <select
                      id="contact-timeline"
                      value={values.timeline}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          timeline: e.target.value as FormValues['timeline'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-blue-700 focus:outline-none"
                    >
                      <option value="Immediate (2-4 weeks)">Immediate (2–4 weeks)</option>
                      <option value="Next Quarter">Next Quarter</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-brief"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Project Context
                  </label>
                  <textarea
                    id="contact-brief"
                    rows={4}
                    value={values.brief}
                    onChange={(e) => {
                      setValues({ ...values, brief: e.target.value });
                      if (errors.brief) setErrors({ ...errors, brief: undefined });
                    }}
                    aria-invalid={Boolean(errors.brief)}
                    aria-describedby={errors.brief ? 'contact-brief-error' : undefined}
                    placeholder="Outline your current React stack, key bottlenecks, or the product surface we are building..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none resize-y"
                  />
                  {errors.brief && (
                    <p
                      id="contact-brief-error"
                      className="mt-1.5 flex items-center gap-1 text-xs text-rose-700 dark:text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.brief}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Direct engineer response within 1 business day.
                  </p>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Schedule Discovery Call
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
