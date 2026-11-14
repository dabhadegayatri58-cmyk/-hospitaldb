/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { WorkbenchSection } from './components/WorkbenchSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleStartProject = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col">
      <Header onStartProject={handleStartProject} />

      <main className="flex-1">
        <Hero />
        <CapabilitiesSection />
        <WorkbenchSection isDark={isDark} onToggleTheme={setIsDark} />
        <CaseStudiesSection />
        <ContactSection nameInputRef={nameInputRef} />
      </main>

      <Footer />
    </div>
  );
}
