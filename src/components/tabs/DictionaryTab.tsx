import React, { useState } from 'react';
import { CameraTerm, CategoryType } from '../../types/camera';
import { CATEGORY_LABELS } from '../../data/terminology';
import { BookOpen, Search, ArrowRight, Filter, Camera } from 'lucide-react';

interface DictionaryTabProps {
  onSelectTerm: (term: CameraTerm) => void;
  onCompareTerm?: (term: CameraTerm) => void;
  allTerms: CameraTerm[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const DictionaryTab: React.FC<DictionaryTabProps> = ({
  onSelectTerm,
  onCompareTerm,
  allTerms,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = Object.keys(CATEGORY_LABELS);

  // Filtering
  const filteredTerms = allTerms.filter((term) => {
    // Category match
    if (selectedCategory !== 'all' && term.category !== selectedCategory) {
      return false;
    }
    // Difficulty match
    if (selectedDifficulty !== 'all') {
      if (selectedDifficulty === 'basic' && !term.difficulty.startsWith('기초')) return false;
      if (selectedDifficulty === 'advanced' && !term.difficulty.startsWith('심화')) return false;
      if (selectedDifficulty === 'expert' && !term.difficulty.startsWith('전문')) return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNameKr = term.nameKr.toLowerCase().includes(q);
      const matchNameEn = term.nameEn.toLowerCase().includes(q);
      const matchDesc = term.shortDesc.toLowerCase().includes(q);
      const matchCameras = term.appliedCameras.some((c) => c.toLowerCase().includes(q));
      return matchNameKr || matchNameEn || matchDesc || matchCameras;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            광학·센서 기술 용어 통합 백과사전
          </h1>
          <span className="text-xs font-mono text-slate-500">
            총 {allTerms.length}개 표제어 등록됨
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          국제 사진 광학 및 반도체 공학(IEEE/CIPA/ISO) 표준에 기반한 최신 디지털 카메라 핵심 기술 용어를 검색하고 상세 물리 수식 및 제조사별 구현 사양을 탐색하세요.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((catKey) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {CATEGORY_LABELS[catKey]}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-500 text-[11px] flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              난이도 필터:
            </span>
            <div className="flex gap-1">
              {[
                { id: 'all', label: '전체' },
                { id: 'basic', label: '기초' },
                { id: 'advanced', label: '심화' },
                { id: 'expert', label: '전문' },
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                    selectedDifficulty === diff.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            검색 결과: <strong className="text-blue-600 dark:text-blue-400">{filteredTerms.length}</strong>개 항목
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            검색 조건에 일치하는 기술 용어가 없습니다.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            모든 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => onSelectTerm(term)}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                {/* Meta line */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate">{CATEGORY_LABELS[term.category] || term.category}</span>
                  <span className="text-[10px] font-mono font-medium text-blue-600 dark:text-blue-400">
                    {term.difficulty.split(' ')[0]}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {term.nameKr}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 truncate">
                    {term.nameEn}
                  </p>
                </div>

                {/* Short Desc */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {term.shortDesc}
                </p>
              </div>

              {/* Bottom camera badges & Link */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {term.appliedCameras && term.appliedCameras.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate">
                    <Camera className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{term.appliedCameras[0]}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 group-hover:underline">
                    <span>상세 원리</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>

                  {onCompareTerm && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompareTerm(term);
                      }}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-white text-slate-600 dark:text-slate-300 transition"
                      title="이 기술을 1:1 비교함에 담기"
                    >
                      1:1 비교
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
