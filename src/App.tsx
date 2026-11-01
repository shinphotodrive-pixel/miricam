import React, { useState, useEffect } from 'react';
import { TabKey, CameraTerm } from './types/camera';
import { CAMERA_TERMS } from './data/terminology';
import { Header } from './components/Header';
import { TermDetailModal } from './components/TermDetailModal';
import { DashboardTab } from './components/tabs/DashboardTab';
import { ComparisonTab } from './components/tabs/ComparisonTab';
import { OpticsPhysicsTab } from './components/tabs/OpticsPhysicsTab';
import { SensorArchitectureTab } from './components/tabs/SensorArchitectureTab';
import { CinemaWorkflowTab } from './components/tabs/CinemaWorkflowTab';
import { LensOpticsTab } from './components/tabs/LensOpticsTab';
import { ComputationalImagingTab } from './components/tabs/ComputationalImagingTab';
import { DictionaryTab } from './components/tabs/DictionaryTab';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<CameraTerm | null>(null);

  // Comparison State
  const [compareTermAId, setCompareTermAId] = useState<string>('global-shutter');
  const [compareTermBId, setCompareTermBId] = useState<string>('stacked-bsi');

  // Dark Mode Support
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('miricam-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('miricam-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('miricam-theme', 'light');
    }
  }, [isDark]);

  // When user types in search bar, if not currently in dictionary or dashboard, redirect to dictionary
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 0 && currentTab !== 'dictionary' && currentTab !== 'dashboard') {
      setCurrentTab('dictionary');
    }
  };

  const handleSelectTerm = (term: CameraTerm) => {
    setSelectedTerm(term);
  };

  const handleCompareTerm = (term: CameraTerm) => {
    setCompareTermAId(term.id);
    setCurrentTab('compare');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex-grow w-full">
        {currentTab === 'dashboard' && (
          <DashboardTab
            onSelectTerm={handleSelectTerm}
            onNavigateTab={setCurrentTab}
            allTerms={CAMERA_TERMS}
            isDark={isDark}
          />
        )}

        {currentTab === 'compare' && (
          <ComparisonTab
            allTerms={CAMERA_TERMS}
            onSelectTerm={handleSelectTerm}
            initialTermAId={compareTermAId}
            initialTermBId={compareTermBId}
          />
        )}

        {currentTab === 'exposure' && (
          <OpticsPhysicsTab
            onSelectTerm={handleSelectTerm}
            allTerms={CAMERA_TERMS}
          />
        )}

        {currentTab === 'sensor' && (
          <SensorArchitectureTab
            onSelectTerm={handleSelectTerm}
            allTerms={CAMERA_TERMS}
          />
        )}

        {currentTab === 'cinema' && (
          <CinemaWorkflowTab
            onSelectTerm={handleSelectTerm}
            allTerms={CAMERA_TERMS}
          />
        )}

        {currentTab === 'lens' && (
          <LensOpticsTab
            onSelectTerm={handleSelectTerm}
            allTerms={CAMERA_TERMS}
            isDark={isDark}
          />
        )}

        {currentTab === 'computational' && (
          <ComputationalImagingTab
            onSelectTerm={handleSelectTerm}
            allTerms={CAMERA_TERMS}
          />
        )}

        {currentTab === 'dictionary' && (
          <DictionaryTab
            onSelectTerm={handleSelectTerm}
            onCompareTerm={handleCompareTerm}
            allTerms={CAMERA_TERMS}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
      </main>

      {/* Detail Modal */}
      <TermDetailModal
        term={selectedTerm}
        onClose={() => setSelectedTerm(null)}
        onCompareTerm={handleCompareTerm}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">MiriCam Opto-Sensor Lab</span>
            <span>·</span>
            <span>디지털 카메라 광학 &amp; 센서 기술 엔지니어링 분석기</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>IEEE / CIPA / ISO 12233 표준 기반 분석</span>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('dictionary')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              용어 색인 (Index)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
