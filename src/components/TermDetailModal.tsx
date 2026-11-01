import React from 'react';
import { CameraTerm } from '../types/camera';
import { X, CheckCircle2, AlertTriangle, Cpu, Camera, HelpCircle } from 'lucide-react';

interface TermDetailModalProps {
  term: CameraTerm | null;
  onClose: () => void;
  onCompareTerm?: (term: CameraTerm) => void;
  onSelectCategory?: (cat: string) => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({ term, onClose, onCompareTerm }) => {
  if (!term) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800 p-5 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>{term.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">{term.difficulty}</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              {term.nameKr}
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500 font-mono">
                {term.nameEn}
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {/* Summary */}
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl leading-relaxed text-slate-800 dark:text-blue-200">
            {term.shortDesc}
          </div>

          {/* Full Technical Explanation */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-500" />
              심층 물리·반도체 메커니즘
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {term.fullExplanation}
            </p>
          </div>

          {/* Key Mechanisms Checklist */}
          {term.keyMechanism && term.keyMechanism.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                핵심 공학적 동작 원리
              </h3>
              <ul className="space-y-1.5">
                {term.keyMechanism.map((mech, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{mech}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Formula Section if available */}
          {term.formula && (
            <div className="p-4 bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono text-blue-400 flex items-center gap-1.5">
                <span>공학 수식 &amp; 지배 방정식</span>
              </div>
              <div className="font-mono text-sm py-1 overflow-x-auto text-amber-300">
                {term.formula}
              </div>
              {term.formulaDescription && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {term.formulaDescription}
                </p>
              )}
            </div>
          )}

          {/* Applied Flagship Camera Models */}
          {term.appliedCameras && term.appliedCameras.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-purple-500" />
                적용 대표 카메라 기종
              </h3>
              <div className="flex flex-wrap gap-2">
                {term.appliedCameras.map((cam, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-lg font-medium border border-slate-200 dark:border-slate-700"
                  >
                    {cam}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Advantages & Limitations 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Advantages */}
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                광학·화질적 장점 (Advantages)
              </h4>
              <ul className="space-y-1 text-xs text-emerald-900 dark:text-emerald-200/90">
                {term.keyAdvantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>+</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations / Tradeoffs */}
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                한계점 &amp; 트레이드오프 (Trade-offs)
              </h4>
              <ul className="space-y-1 text-xs text-amber-900 dark:text-amber-200/90">
                {term.limitationsOrTradeoffs.map((lim, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>-</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {onCompareTerm ? (
            <button
              onClick={() => {
                onCompareTerm(term);
                onClose();
              }}
              className="px-3.5 py-2 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              <span>1:1 비교함에 추가하기</span>
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-white transition"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

