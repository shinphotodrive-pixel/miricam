import React, { useState } from 'react';
import { NoiseCanvasChart } from '../calculators/NoiseCanvasChart';
import { AfRadarChart, AF_SYSTEMS } from '../calculators/AfRadarChart';
import { CameraTerm, TabKey } from '../../types/camera';
import { ArrowRight, Sliders, ShieldCheck, Gauge, Zap } from 'lucide-react';

interface DashboardTabProps {
  onSelectTerm: (term: CameraTerm) => void;
  onNavigateTab: (tab: TabKey) => void;
  allTerms: CameraTerm[];
  isDark?: boolean;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  onSelectTerm,
  onNavigateTab,
  allTerms,
  isDark = false,
}) => {
  // Noise Simulator state
  const [photons, setPhotons] = useState<number>(1000);
  const [readNoise, setReadNoise] = useState<number>(2.0);

  // AF Radar state (indices 0, 1, 2, 3)
  const [activeAfIndices, setActiveAfIndices] = useState<number[]>([1, 2, 3]);

  const toggleAfIndex = (idx: number) => {
    setActiveAfIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Calculations
  const shotNoise = Math.sqrt(photons);
  const totalNoise = Math.sqrt(photons + readNoise * readNoise);
  const snrRatio = photons / Math.max(0.0001, totalNoise);
  const snrDb = 20 * Math.log10(Math.max(1, snrRatio));

  const findTerm = (id: string) => allTerms.find((t) => t.id === id);

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-blue-300 font-mono">
            <span>MiriCam Technical Report Executive Overview</span>
            <span aria-hidden="true">·</span>
            <span>2026 차세대 하이브리드 이미징</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            차세대 디지털 카메라 광학·센서 기술 종합 관제 &amp; 시뮬레이터
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            나노 단위 반도체 공학(3D Stacked BSI, Cu-Cu Hybrid Bonding, Pixel-Parallel ADC), 위상차 오토포커스(Cross Quad Pixel AF), 시네마 계조 처리(Dual Conversion Gain, Log Gamma) 및 컴퓨테이셔널 이미징(5축 IBIS, AI Upscaling)의 핵심 물리를 인터랙티브 시뮬레이터로 정밀 분석합니다.
          </p>
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigateTab('compare')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              <span>기술 1:1 비교 (Side-by-Side)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('sensor')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              <span>센서 아키텍처 심층 탐색</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('lens')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition"
            >
              MTF 렌즈 곡선 분석기
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => {
            const t = findTerm('dr-boost') || findTerm('dual-conversion-gain');
            if (t) onSelectTerm(t);
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>최대 DR 확장폭</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">Dual Gain</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            15+ <span className="text-xs font-normal text-slate-500">Stops</span>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            V-Log / DR Boost 단일 노출 HDR 관용도
          </p>
        </div>

        <div 
          onClick={() => {
            const t = findTerm('five-axis-ibis-sync');
            if (t) onSelectTerm(t);
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>손떨림 보정 한계치</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Sync IS</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            8.5 <span className="text-xs font-normal text-slate-500">Stops</span>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            5축 센서 시프트 + 렌즈 광학식 협조 보정
          </p>
        </div>

        <div 
          onClick={() => {
            const t = findTerm('cross-quad-pixel-af');
            if (t) onSelectTerm(t);
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>전방향 크로스 AF</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">Quad Pixel</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            100% <span className="text-xs font-normal text-slate-500">Cross-type</span>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            4분할 포토다이오드 4방향 위상차 검출
          </p>
        </div>

        <div 
          onClick={() => {
            const t = findTerm('neural-npu-upscale');
            if (t) onSelectTerm(t);
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-amber-400 dark:hover:border-amber-600 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>인카메라 AI 업스케일</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">Neural NPU</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            179 <span className="text-xs font-normal text-slate-500">MP</span>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            45MP RAW → 179MP 초해상도 즉각 변환
          </p>
        </div>
      </div>

      {/* Interactive Simulators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simulator 1: ISO Invariance & Noise */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                ISO 불변성 &amp; 광자 노이즈 시뮬레이터
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                광자 샷 노이즈(√S)와 센서 판독 리드 노이즈(R)의 SNR 영향도 실시간 계산
              </p>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-slate-600 dark:text-slate-400">입사 광자 수 (S)</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{photons} e-</span>
              </div>
              <input
                type="range"
                min="20"
                max="5000"
                step="20"
                value={photons}
                onChange={(e) => setPhotons(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">어두운 암부 (20e-) ~ 밝은 명부 (5,000e-)</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-slate-600 dark:text-slate-400">센서 리드 노이즈 (R)</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{readNoise.toFixed(1)} e-</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.5"
                value={readNoise}
                onChange={(e) => setReadNoise(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-[10px] text-slate-400">현대 적층 BSI (1~2e-) ~ 구형 센서 (12~15e-)</span>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">샷 노이즈 (√S)</p>
              <p className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">
                {shotNoise.toFixed(1)} e-
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">총 노이즈 (√(S+R²))</p>
              <p className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm mt-0.5">
                {totalNoise.toFixed(1)} e-
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">신호대 잡음비 (SNR)</p>
              <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                {snrDb.toFixed(1)} dB
              </p>
            </div>
          </div>

          {/* Canvas Chart */}
          <div className="h-[280px]">
            <NoiseCanvasChart
              currentPhotons={photons}
              currentReadNoise={readNoise}
              isDark={isDark}
            />
          </div>

          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>핵심 물리 해석:</strong> 빛이 충분한 명부(S &gt; 1000e-)에서는 리드 노이즈가 총 노이즈에 주는 영향이 미미합니다. 반면 암부(S &lt; 100e-)에서는 리드 노이즈가 SNR을 지배합니다. 현대 센서는 리드 노이즈를 1~2e-로 낮춤으로써 <strong>ISO 불변성(ISO Invariance)</strong>을 확보했습니다.
          </div>
        </div>

        {/* Simulator 2: AF Architecture Comparison */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                오토포커스(AF) 시스템 5대 차원 비교 레이더
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                CDAF, OSPDAF, Dual Pixel, Cross Quad Pixel 아키텍처 비교
              </p>
            </div>
          </div>

          {/* Toggle buttons for datasets */}
          <div className="flex flex-wrap gap-2 text-xs">
            {AF_SYSTEMS.map((system, idx) => {
              const active = activeAfIndices.includes(idx);
              return (
                <button
                  key={system.id}
                  onClick={() => toggleAfIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all text-xs flex items-center gap-1.5 ${
                    active
                      ? 'text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  style={{
                    backgroundColor: active ? system.color : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: active ? '#ffffff' : system.color }}
                  />
                  <span>{system.name}</span>
                </button>
              );
            })}
          </div>

          {/* Radar Chart */}
          <div className="h-[280px]">
            <AfRadarChart activeIndices={activeAfIndices} isDark={isDark} />
          </div>

          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>기술 분석:</strong> 기존 2분할 듀얼 픽셀은 수평 선형 피사체에서 위상차가 0이 되어 검출하지 못하는 한계가 있었습니다. <strong>크로스 쿼드 픽셀 AF</strong>는 화소를 4분할(2x2)하여 상하좌우 모든 방향의 위상차 벡터를 계산하여 사각지대 없는 100% 전천후 초점 추종을 보장합니다.
          </div>
        </div>

      </div>

      {/* Featured Core Topics Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            핵심 플래그십 기술 하이라이트
          </h2>
          <button
            onClick={() => onNavigateTab('dictionary')}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>전체 35+ 용어 사전 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'global-shutter',
              title: '글로벌 셔터 (Global Shutter)',
              badge: 'Sony α9 III',
              desc: '모든 픽셀 동시 노출로 1/80,000초 플래시 동조 및 젤로 왜곡 0% 실현.',
            },
            {
              id: 'stacked-bsi',
              title: '3D 적층형 BSI 센서 (Stacked BSI)',
              badge: 'Sony A1 / Nikon Z9',
              desc: 'DRAM과 고속 로직을 3단 수직 접합하여 1/250초 초고속 판독 및 120fps 연사.',
            },
            {
              id: 'dr-boost',
              title: '다이내믹 레인지 부스트 (DR Boost)',
              badge: 'Lumix GH7 / ARRI DGO',
              desc: '단일 노출에서 고게인과 저게인을 실시간 분기 판독해 모션 아티팩트 없는 15스톱 HDR.',
            },
          ].map((item) => {
            const term = findTerm(item.id);
            return (
              <div
                key={item.id}
                onClick={() => term && onSelectTerm(term)}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer transition space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-1 flex items-center text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                  <span>상세 물리 메커니즘 확인</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
