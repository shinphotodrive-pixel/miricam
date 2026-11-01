import React, { useState } from 'react';
import { CameraTerm } from '../../types/camera';
import { Sparkles, Shield, Grid, Sliders, Cpu, ArrowRight } from 'lucide-react';

interface ComputationalImagingTabProps {
  onSelectTerm: (term: CameraTerm) => void;
  allTerms: CameraTerm[];
}

export const ComputationalImagingTab: React.FC<ComputationalImagingTabProps> = ({
  onSelectTerm,
  allTerms,
}) => {
  // Pixel shift mode state: 4-shot or 16-shot
  const [pixelShiftMode, setPixelShiftMode] = useState<'4-shot' | '16-shot'>('16-shot');

  // Live ND simulation state: ND factor 0, 2, 4, 8, 16, 32, 64, 128
  const [ndStops, setNdStops] = useState<number>(6); // 6 stops = ND64

  // IBIS Simulation: Focal length and stops
  const [ibisFocalLength, setIbisFocalLength] = useState<number>(200);
  const [isIbisOn, setIsIbisOn] = useState<boolean>(true);

  // Safe handheld shutter speed rule: 1 / focalLength (e.g. 1/200s for 200mm)
  // With 8.5 stops IBIS: 1/200s * 2^8.5 = 1/200 * 362 = ~1.8 seconds!
  const baseShutter = 1 / ibisFocalLength;
  const stabilizedShutter = baseShutter * Math.pow(2, isIbisOn ? 8.0 : 0);

  const findTerm = (id: string) => allTerms.find((t) => t.id === id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          컴퓨테이셔널 이미징 &amp; 뉴럴 AI 프로세싱
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          센서를 물리적으로 이동시키는 5축 IBIS 및 픽셀 시프트 서브픽셀 고해상도 합성, 소프트웨어/액정 전자식 라이브 ND, 그리고 NPU 딥러닝 인카메라 초해상도(179MP) 엔진의 원리를 탐구합니다.
        </p>
      </div>

      {/* Grid: 2 Core Simulators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. 5-Axis IBIS & Collaborative Sync IS Simulator */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                5축 센서 시프트 IBIS &amp; Sync IS 실효 셔터 속도 시뮬레이터
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                망원 렌즈 초점 거리와 8.0스톱 협조 보정에 따른 핸드헬드 한계 계산
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">손떨림 보정 제어</span>
              <button
                onClick={() => setIsIbisOn(!isIbisOn)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                  isIbisOn
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {isIbisOn ? '5축 Sync IS 가동 중 (8.0 Stops)' : '보정 OFF (핸드헬드 위험)'}
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-slate-600 dark:text-slate-400">렌즈 초점 거리</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{ibisFocalLength} mm 망원</span>
              </div>
              <input
                type="range"
                min="24"
                max="600"
                step="10"
                value={ibisFocalLength}
                onChange={(e) => setIbisFocalLength(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Calculated Output Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <span className="text-[11px] text-slate-500">기본 안전 셔터 속도</span>
                  <p className="font-mono font-bold text-slate-700 dark:text-slate-300 text-sm mt-0.5">
                    1 / {ibisFocalLength} 초
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500">핸드헬드 가능 셔터 한계</span>
                  <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base mt-0.5">
                    {stabilizedShutter >= 1
                      ? `${stabilizedShutter.toFixed(1)} 초 장노출`
                      : `1 / ${Math.round(1 / stabilizedShutter)} 초`}
                  </p>
                </div>
              </div>

              {/* 5-Axis Distribution Matrix */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-bold text-blue-600 dark:text-blue-400">• 바디 IBIS 담당:</span> Roll(회전), X/Y Shift(매크로 평행)
                </div>
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">• 렌즈 OIS 담당:</span> Pitch(상하), Yaw(좌우 각도)
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                const t = findTerm('five-axis-ibis-sync');
                if (t) onSelectTerm(t);
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>5축 IBIS 기술 문서 보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Pixel Shift Multi-Shot Synthesizer */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Grid className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                픽셀 시프트 멀티 샷 해상도 합성 시뮬레이터
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                4-Shot (단일 픽셀 이동 RGB 복원) vs 16-Shot (0.5픽셀 서브픽셀 4배 초고화소)
              </p>
            </div>
          </div>

          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setPixelShiftMode('4-shot')}
              className={`flex-1 py-2 rounded-lg font-bold transition ${
                pixelShiftMode === '4-shot'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              4-Shot: 풀컬러 RGB 복원 (위색 0%)
            </button>
            <button
              onClick={() => setPixelShiftMode('16-shot')}
              className={`flex-1 py-2 rounded-lg font-bold transition ${
                pixelShiftMode === '16-shot'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              16-Shot: 2억 4천만 화소 초고해상도
            </button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs">
            {pixelShiftMode === '4-shot' ? (
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>작동: 1픽셀 상하좌우 이동 (1.0 Pixel Step)</span>
                  <span className="text-blue-600 dark:text-blue-400">네이티브 6,100만 화소 유지</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  각 픽셀 위치에서 R, G, B 삼원색 정보를 직접 100% 수집하여 디모자이킹 보간을 완전히 생략합니다. 직물이나 텍스처에서 무지갯빛 모아레(Moiré)와 위색이 완전히 사라집니다.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>작동: 0.5픽셀 서브픽셀 16회 이동 (0.5 Pixel Step)</span>
                  <span className="text-purple-600 dark:text-purple-400">2억 4,080만 화소 (19,008 × 12,672)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  센서의 물리적 나이퀴스트 샘플링 한계를 2배 돌파하여 4배의 유효 해상도를 합성합니다. 건축 사진, 고문서 기록, 대형 문화재 아카이브에 사용됩니다.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-[11px] text-slate-500">
              <span>필요 장비: 삼각대 거치 필수</span>
              <span>RAW 파일 용량: 약 1.5 GB ~ 2.0 GB</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                const t = findTerm('pixel-shift-resolution');
                if (t) onSelectTerm(t);
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>픽셀 시프트 멀티 샷 논문 보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Live ND & Neural AI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Live ND */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              인카메라 라이브 ND (Live ND 64) 시뮬레이터
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              초고속 센서 판독 다중 노출 평균 합성으로 광학 필터 없이 모션 블러 생성
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-medium">
              <span className="text-slate-600 dark:text-slate-400">ND 강도 선택</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                ND{Math.pow(2, ndStops)} ({ndStops} Stops 감광)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={ndStops}
              onChange={(e) => setNdStops(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>ND2 (1스톱)</span>
              <span>ND8</span>
              <span>ND32</span>
              <span>ND128 (7스톱)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            광량이 풍부한 한낮에 1/1000초 고속 셔터 64장을 순간 연속 촬영하여 인카메라에서 실시간 이동 평균으로 합성합니다. 계곡물 폭포나 파도의 물결이 비단결처럼 부드러운 궤적으로 실시간 뷰파인더에 나타납니다.
          </div>
        </div>

        {/* Neural NPU Upscaling & Pose Estimation */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              딥러닝 NPU 초해상도 AI 업스케일링 (179MP)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              골격 자세 추정과 딥러닝 디노이징 신경망을 통한 무손실 4배 업스케일
            </p>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500">입력 원본</span>
                <p className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">4,500만 화소 RAW</p>
              </div>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <span className="text-[10px] text-purple-600 dark:text-purple-400">인카메라 NPU 출력</span>
                <p className="font-mono font-bold text-purple-700 dark:text-purple-300 mt-0.5">1억 7,900만 화소</p>
              </div>
            </div>
            <p className="text-[11px]">
              Canon R5 Mark II 등에 탑재된 전용 신경망 프로세서가 단순 보간이 아닌 수백만 장의 광학 고해상도 사전 지식을 토대로 텍스처와 포톤 노이즈를 완벽 분리하여 대형 인쇄용 초고화질 이미지를 즉시 생성합니다.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
