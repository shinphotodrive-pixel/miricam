import React from 'react';
import { TabKey } from '../types/camera';
import { Sun, Moon, Search, SlidersHorizontal, BookOpen, Layers, Film, Sparkles, Cpu, Eye, ArrowLeftRight } from 'lucide-react';

interface HeaderProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
}) => {
  const navTabs: { id: TabKey; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: '대시보드 & 시뮬레이터', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: 'compare', label: '1:1 기술 비교', icon: <ArrowLeftRight className="w-3.5 h-3.5" /> },
    { id: 'exposure', label: '광학 물리 & 노이즈', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'sensor', label: '센서 아키텍처 & AF', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'cinema', label: '시네마 & DR', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'lens', label: '렌즈 광학 & MTF', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'computational', label: '컴퓨테이셔널 이미징', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'dictionary', label: '용어 통합 사전', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Bar Zone 1, 2, 3 */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => onSelectTab('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              MiriCam Opto-Sensor Lab
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              광학·센서 기술 분석 플랫폼
            </span>
          </div>
        </div>

        {/* Global Search Bar in header */}
        <div className="flex-1 max-w-md hidden sm:block relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="전문 용어 실시간 검색 (글로벌 셔터, MTF, DTI, Dual Gain...)"
            className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1 py-0.5 rounded"
            >
              초기화
            </button>
          )}
        </div>

        {/* Zone 3: Dark/Light Mode Switch */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            aria-label="화면 모드 전환"
            title="다크 / 라이트 모드 전환"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar if small screen */}
      <div className="px-4 pb-2 sm:hidden">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="전문 용어 검색..."
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto">
        <nav className="flex space-x-1.5 py-2 min-w-max">
          {navTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
