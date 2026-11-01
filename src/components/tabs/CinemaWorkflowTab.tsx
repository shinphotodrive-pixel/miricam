import React, { useState } from 'react';
import { CameraTerm } from '../../types/camera';
import { Film, HardDrive, Check, ArrowRight, ToggleLeft, ToggleRight, Layers } from 'lucide-react';

interface CinemaWorkflowTabProps {
  onSelectTerm: (term: CameraTerm) => void;
  allTerms: CameraTerm[];
}

export const CinemaWorkflowTab: React.FC<CinemaWorkflowTabProps> = ({
  onSelectTerm,
  allTerms,
}) => {
  // DCG Switch State
  const [dcgMode, setDcgMode] = useState<'lcg' | 'hcg'>('lcg');

  // Codec Calculator State
  const [res, setRes] = useState<'4k' | '6k' | '8k'>('4k');
  const [fps, setFps] = useState<number>(60);
  const [codec, setCodec] = useState<'long-gop' | 'all-i' | 'prores' | 'raw'>('all-i');

  // Estimate Bitrate in Mbps
  const calculateBitrate = () => {
    let base = 150; // 4K 24p Long GOP
    if (res === '4k') base = 150;
    if (res === '6k') base = 320;
    if (res === '8k') base = 550;

    const fpsMult = fps / 24;

    let codecMult = 1.0;
    if (codec === 'long-gop') codecMult = 1.0;
    if (codec === 'all-i') codecMult = 3.5;
    if (codec === 'prores') codecMult = 6.2;
    if (codec === 'raw') codecMult = 12.0;

    return Math.round(base * fpsMult * codecMult);
  };

  const bitrateMbps = calculateBitrate();
  const gbPerHour = (bitrateMbps * 3600) / (8 * 1024);

  let recMedia = 'SD UHS-I (V30)';
  if (bitrateMbps > 200) recMedia = 'SD UHS-II (V60)';
  if (bitrateMbps > 450) recMedia = 'SD UHS-II (V90)';
  if (bitrateMbps > 800) recMedia = 'CFexpress Type A / B 또는 외장 SSD';

  const findTerm = (id: string) => allTerms.find((t) => t.id === id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Film className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          시네마토그래피 워크플로우 &amp; 다이내믹 레인지 (DR)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          듀얼 컨버전 게인(DCG / Dual Native ISO), DR Boost 단일 노출 15스톱 HDR, Log 감마 프로파일, 10-bit 4:2:2 크로마 서브샘플링 및 ALL-Intra vs RAW 코덱 처리 기술을 분석합니다.
        </p>
      </div>

      {/* DCG Interactive Circuit Switcher */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ToggleRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              듀얼 컨버전 게인 (DCG / Dual Native ISO) 회로 스위칭 시뮬레이터
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              플로팅 디퓨전(FD) 커패시터 연결 상태에 따른 노이즈 및 다이내믹 레인지 변화
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setDcgMode('lcg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                dcgMode === 'lcg'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              저게인 모드 (LCG - 기본 ISO)
            </button>
            <button
              onClick={() => setDcgMode('hcg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                dcgMode === 'hcg'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              고게인 모드 (HCG - 2차 네이티브 ISO)
            </button>
          </div>
        </div>

        {/* Dynamic Circuit Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">
              FD 정전용량 (Capacitance, C)
            </span>
            <p className="text-xl font-mono font-black text-slate-900 dark:text-white">
              {dcgMode === 'lcg' ? 'C_high (대용량)' : 'C_low (극소용량)'}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              {dcgMode === 'lcg'
                ? '스위치가 닫혀 추가 커패시터가 병렬 연결됨. 전하를 대량 저장 가능.'
                : '스위치가 개방되어 기생 용량만 남김. 미세한 전하도 높은 전압으로 증폭.'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">
              최대 포화 전하량 (FWC)
            </span>
            <p className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">
              {dcgMode === 'lcg' ? '80,000 e- (최대 DR)' : '18,000 e- (고감도 최적화)'}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              {dcgMode === 'lcg'
                ? '대낮 야외 직사광선에서도 하이라이트가 하얗게 타지 않고 15스톱 보존.'
                : '어두운 야경 실내에서 암부 리드 노이즈가 1e- 수준으로 소멸.'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">
              센서 실효 리드 노이즈
            </span>
            <p className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
              {dcgMode === 'lcg' ? '4.8 e-' : '1.2 e- (초저노이즈)'}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              {dcgMode === 'lcg'
                ? '아날로그 전하가 커서 기본 리드 노이즈는 보통 수준.'
                : '변환 감도(μV/e-)가 4배 승압되어 증폭기 노이즈가 감쇄됨.'}
            </p>
          </div>
        </div>

        {/* Link to Term */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              const t = findTerm('dual-conversion-gain');
              if (t) onSelectTerm(t);
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Dual Native ISO 및 DR Boost 심층 원리 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chroma Subsampling & Bit Depth Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chroma Subsampling Visual Matrix */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              크로마 서브샘플링 (4:4:4 vs 4:2:2 vs 4:2:0) 구조
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              휘도(Y) 대비 색차(Cb, Cr) 정보 샘플링 밀도와 크로마키(Green Screen) 에지 선명도
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* 4:4:4 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-900 dark:text-white">4:4:4 (무압축 색상)</span>
                <span className="font-mono text-slate-400">100% 대역폭</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                모든 1개 픽셀마다 휘도와 두 색차 신호를 1:1로 기록. 최상급 극장 영화 VFX 마스터링 포맷.
              </p>
            </div>

            {/* 4:2:2 */}
            <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-blue-900 dark:text-blue-200">4:2:2 (프로페셔널 방송·시네마 표준)</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">66.7% 대역폭 (33% 절감)</span>
              </div>
              <p className="text-blue-950 dark:text-blue-200 text-[11px]">
                수평 2개 화소마다 1개의 색차 샘플 공유. 인물 머리카락 윤곽선 크로마키 키잉 시 색 번짐(Chroma Bleed) 없음.
              </p>
            </div>

            {/* 4:2:0 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-900 dark:text-white">4:2:0 (웹 스트리밍 &amp; 일반 소비자용)</span>
                <span className="font-mono text-slate-400">50% 대역폭 (반토막)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                수평/수직 2x2 블록(4개 픽셀)당 단 1개의 색차 샘플만 보존. 유튜브, 넷플릭스 등 전송 용량 최우선 포맷.
              </p>
            </div>
          </div>
        </div>

        {/* Codec Bitrate & Storage Calculator */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              시네마 비디오 코덱 대역폭 &amp; 미디어 용량 계산기
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              해상도, 프레임레이트, 압축 방식에 따른 실효 전송률 및 시간당 용량 연산
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            {/* Resolution */}
            <div>
              <label className="text-slate-500 block mb-1">해상도</label>
              <select
                value={res}
                onChange={(e) => setRes(e.target.value as any)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="4k">4K UHD / DCI</option>
                <option value="6k">6K Open Gate</option>
                <option value="8k">8K DCI</option>
              </select>
            </div>

            {/* Framerate */}
            <div>
              <label className="text-slate-500 block mb-1">프레임레이트</label>
              <select
                value={fps}
                onChange={(e) => setFps(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="24">24 fps (영화)</option>
                <option value="30">30 fps (방송)</option>
                <option value="60">60 fps (슬로우)</option>
                <option value="120">120 fps (초고속)</option>
              </select>
            </div>

            {/* Codec */}
            <div>
              <label className="text-slate-500 block mb-1">코덱 압축</label>
              <select
                value={codec}
                onChange={(e) => setCodec(e.target.value as any)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="long-gop">H.265 Long GOP</option>
                <option value="all-i">ALL-Intra (All-I)</option>
                <option value="prores">Apple ProRes 422 HQ</option>
                <option value="raw">12-bit RAW (N-RAW/BRAW)</option>
              </select>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="text-[11px] text-slate-500">실효 비트레이트 (Bitrate)</span>
                <p className="text-xl font-mono font-black text-slate-900 dark:text-white mt-0.5">
                  {bitrateMbps} <span className="text-xs font-normal text-slate-500">Mbps</span>
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500">1시간 녹화 용량 (Storage)</span>
                <p className="text-xl font-mono font-black text-purple-600 dark:text-purple-400 mt-0.5">
                  {gbPerHour.toFixed(1)} <span className="text-xs font-normal text-slate-500">GB / hr</span>
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500">권장 메모리 카드 등급</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {recMedia}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed">
            <strong>현업 팁:</strong> ALL-I는 모든 프레임을 독립 압축하므로 다빈치 리졸브나 파이널 컷 타임라인에서 프레임 지연 없이 즉각 반응하며 멀티캠 컷편집에 최적입니다.
          </div>
        </div>

      </div>
    </div>
  );
};
