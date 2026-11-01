import React, { useState } from 'react';
import { CameraTerm } from '../../types/camera';
import { MtfCanvasChart, LENS_PROFILES, LensProfile } from '../calculators/MtfCanvasChart';
import { Layers, HelpCircle, ArrowRight, Activity, Disc } from 'lucide-react';

interface LensOpticsTabProps {
  onSelectTerm: (term: CameraTerm) => void;
  allTerms: CameraTerm[];
  isDark?: boolean;
}

export const LensOpticsTab: React.FC<LensOpticsTabProps> = ({
  onSelectTerm,
  allTerms,
  isDark = false,
}) => {
  const [selectedLens, setSelectedLens] = useState<LensProfile>(LENS_PROFILES[0]);
  const [aperture, setAperture] = useState<number>(2.8);

  const findTerm = (id: string) => allTerms.find((t) => t.id === id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          렌즈 광학 설계, 수차 보정 &amp; MTF 분석기
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          공간 주파수(10 lp/mm 콘트라스트 &amp; 30 lp/mm 미세 해상력)에 따른 동적 MTF 곡선 탐색기, 초정밀 비구면(XA) 연마를 통한 양파링 보케 억제, 아포다이제이션(APD/STF) 필터 및 리니어 초음파 구동계(XD/VXD)를 정밀 분석합니다.
        </p>
      </div>

      {/* Dynamic MTF Interactive Analyzer */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              동적 MTF (변조 전달 함수) 곡선 분석기
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              조리개 수치와 렌즈 설계에 따른 실시간 대비(10 lp/mm) 및 해상력(30 lp/mm) 감쇄 시뮬레이션
            </p>
          </div>

          {/* Lens Profile Selector */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {LENS_PROFILES.map((lens) => (
              <button
                key={lens.id}
                onClick={() => setSelectedLens(lens)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedLens.id === lens.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lens.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Lens Description & Aperture Control */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {selectedLens.name}
            </span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
              {selectedLens.description}
            </p>
          </div>

          {/* Aperture Slider */}
          <div className="w-full md:w-64 space-y-1 text-xs shrink-0">
            <div className="flex justify-between font-medium">
              <span className="text-slate-500">조리개 시뮬레이션</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">F{aperture}</span>
            </div>
            <input
              type="range"
              min="1.2"
              max="16"
              step="0.2"
              value={aperture}
              onChange={(e) => setAperture(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>F1.2 (개방)</span>
              <span>F5.6 (피크)</span>
              <span>F16 (회절 저하)</span>
            </div>
          </div>
        </div>

        {/* Canvas Plotter */}
        <div className="h-[280px] md:h-[320px]">
          <MtfCanvasChart
            lens={selectedLens}
            aperture={aperture}
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3 bg-red-50/60 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/40 text-red-950 dark:text-red-200 leading-relaxed">
            <strong>10 lp/mm (적색 곡선 - 콘트라스트):</strong> 피사체의 전반적인 명암비와 투명감. 0.8(80%) 이상이면 고선명 렌즈. 렌즈를 F5.6으로 조이면 0.95 이상으로 상승합니다.
          </div>
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 text-blue-950 dark:text-blue-200 leading-relaxed">
            <strong>30 lp/mm (청색 곡선 - 미세 해상력):</strong> 나뭇잎 잎맥, 머리카락 등 미세 텍스처 묘사력. 0.6(60%) 이상을 유지해야 4000만 화소 이상 고화소 센서에 대응 가능합니다.
          </div>
        </div>
      </div>

      {/* Optical Elements Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Feature 1: Aspherical & Onion-Ring */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Disc className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              초정밀 비구면 (XA 렌즈) &amp; 보케
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            구면수차를 1장으로 상쇄하지만 금형 가공 절삭흔으로 양파링(Onion-ring) 보케가 생겼던 한계를 0.01μm 원자 단위 연마로 극복하여 맑고 투명한 야경 점광원 보케를 만듭니다.
          </p>
          <button
            onClick={() => {
              const t = findTerm('aspherical-lens-xa');
              if (t) onSelectTerm(t);
            }}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>상세 원리 보기</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Feature 2: Apodization Filter */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Disc className="w-4 h-4 text-purple-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              아포다이제이션 필터 (APD / STF)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            렌즈 주변부로 갈수록 농도가 짙어지는 원형 ND 필터를 통해 착란원의 경계 강도를 가우시안 곡선으로 감쇄시켜 2선 보케 없이 녹아내리는 궁극의 인물 배경 흐림을 구현합니다.
          </p>
          <button
            onClick={() => {
              const t = findTerm('apodization-filter');
              if (t) onSelectTerm(t);
            }}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>상세 원리 보기</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Feature 3: VCM & XD Linear Motor */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Disc className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              리니어 초음파 &amp; VCM 모터
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            기어와 백래시가 없는 전자기적 직진 자기부상력(F = BIL)으로 무거운 대구경 포커스 렌즈군을 직접 미끄러지듯 이동시켜 120fps 고속 연사 추종과 완전 무소음 AF를 지원합니다.
          </p>
          <button
            onClick={() => {
              const t = findTerm('vcm-linear-motor');
              if (t) onSelectTerm(t);
            }}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>상세 원리 보기</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
