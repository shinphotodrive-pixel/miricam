import React, { useState, useMemo } from 'react';
import { CameraTerm, CategoryType } from '../../types/camera';
import { CATEGORY_LABELS } from '../../data/terminology';
import { 
  ArrowLeftRight, 
  Sparkles, 
  Cpu, 
  Eye, 
  Film, 
  Layers, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ComparisonTabProps {
  allTerms: CameraTerm[];
  onSelectTerm: (term: CameraTerm) => void;
  initialTermAId?: string;
  initialTermBId?: string;
}

interface PresetPair {
  id: string;
  title: string;
  subtitle: string;
  termAId: string;
  termBId: string;
}

const PRESET_PAIRS: PresetPair[] = [
  {
    id: 'shutter-rivals',
    title: '글로벌 셔터 vs 3D 적층형 BSI',
    subtitle: '1/80,000s 왜곡 제로 vs 1/250s 고화소 초고속 판독',
    termAId: 'global-shutter',
    termBId: 'stacked-bsi',
  },
  {
    id: 'dr-tech',
    title: '듀얼 컨버전 게인(DCG) vs DR Boost',
    subtitle: '하드웨어 듀얼 네이티브 ISO vs 단일 노출 실시간 듀얼게인 HDR',
    termAId: 'dual-conversion-gain',
    termBId: 'dr-boost',
  },
  {
    id: 'video-codecs',
    title: 'ALL-Intra vs 시네마 RAW',
    subtitle: '쾌적한 편집 프레임 압축 vs 무손실 센서 원시 데이터',
    termAId: 'alli-vs-longgop',
    termBId: 'cinema-raw-codecs',
  },
  {
    id: 'color-arrays',
    title: '베이어/비닝 vs 후지 X-Trans',
    subtitle: '전통 RGGB & 픽셀 비닝 vs 6x6 비주기 무광학필터 센서',
    termAId: 'bayer-vs-quad-bayer-nonacell',
    termBId: 'fuji-xtrans-sensor',
  },
  {
    id: 'noise-physics',
    title: '광자 샷 노이즈 vs ISO 불변성',
    subtitle: '양자역학적 광자 요동 vs 센서 리드 노이즈 소멸 메커니즘',
    termAId: 'photon-shot-noise',
    termBId: 'iso-invariance',
  },
  {
    id: 'optics-duo',
    title: '비구면(XA) 렌즈 vs 아포다이제이션(APD)',
    subtitle: '초정밀 0.01μm 양파링 억제 vs 가우시안 엣지 감쇄 극상 보케',
    termAId: 'aspherical-lens-xa',
    termBId: 'apodization-filter',
  },
  {
    id: 'resolution-limits',
    title: '에어리 디스크(회절) vs 렌즈 MTF',
    subtitle: '파동광학적 분해능 한계 vs 공간 주파수별 대비 전달율',
    termAId: 'airy-disk-diffraction',
    termBId: 'mtf-modulation-transfer-function',
  },
];

export const ComparisonTab: React.FC<ComparisonTabProps> = ({
  allTerms,
  onSelectTerm,
  initialTermAId = 'global-shutter',
  initialTermBId = 'stacked-bsi',
}) => {
  const [termAId, setTermAId] = useState<string>(initialTermAId);
  const [termBId, setTermBId] = useState<string>(initialTermBId);
  const [copied, setCopied] = useState<boolean>(false);

  const termA = useMemo(() => allTerms.find((t) => t.id === termAId) || allTerms[0], [allTerms, termAId]);
  const termB = useMemo(() => allTerms.find((t) => t.id === termBId) || allTerms[1], [allTerms, termBId]);

  // Swap terms
  const handleSwap = () => {
    const temp = termAId;
    setTermAId(termBId);
    setTermBId(temp);
  };

  // Helper to determine imaging impact based on term category/id
  const getImagingImpact = (term: CameraTerm) => {
    switch (term.id) {
      case 'global-shutter':
        return {
          snrAndDr: '화소 내 추가 메모리 노드로 인해 기본 ISO(ISO 250)가 다소 높으며 DR이 일반 BSI 대비 약 0.5~1스톱 감소할 수 있음.',
          resolutionAndArtifacts: '젤로 왜곡(Rolling Shutter Artifact) 0%, 인공조명 플리커 밴딩 완전 제거.',
          speedAndWorkflow: '1/80,000초 전구간 플래시 동조, 초당 120fps 블랙아웃 프리 연사 가능.',
          idealScenario: '고속 스포츠, 날아가는 조류/비행체, 상업 패션 플래시 동조 촬영.',
        };
      case 'stacked-bsi':
        return {
          snrAndDr: '순수 BSI 수광면적 보존으로 14~15스톱 광역 DR과 뛰어난 기본 감도 노이즈 비율 유지.',
          resolutionAndArtifacts: '1/250초 초고속 판독으로 젤로 현상을 기계식 셔터 수준으로 억제, 6000만 화소 고해상도 지원.',
          speedAndWorkflow: '고속 DRAM 버퍼로 30~120fps 무제한 RAW 연사, 8K 60p 동영상 오버샘플링.',
          idealScenario: '야생동물, 프레스 보도, 올라운드 하이브리드 고화소 상업 촬영.',
        };
      case 'dual-conversion-gain':
        return {
          snrAndDr: '베이스 ISO에서는 최대 FWC(80,000e-)로 하이라이트 보존, 2차 감도(HCG)에서는 리드 노이즈가 1e-로 급감.',
          resolutionAndArtifacts: '픽셀 물리 구조 변화가 없으므로 본래 렌즈 해상력을 100% 온전히 유지.',
          speedAndWorkflow: '카메라 ISO 다이얼에서 특정 감도 도달 시 회로가 자동 전환되어 별도 후처리 불필요.',
          idealScenario: '저조도 실내 웨딩, 야경 다큐멘터리, 섀도우 노이즈 억제가 필수적인 시네마 촬영.',
        };
      case 'dr-boost':
        return {
          snrAndDr: '단일 노출로 LCG(명부)와 HCG(암부)를 실시간 픽셀 합성하여 15스톱 이상의 초광역 DR 확보.',
          resolutionAndArtifacts: '다중 프레임 노출이 아니므로 움직이는 피사체에 동체 고스트(Motion Artifacts)가 전혀 발생하지 않음.',
          speedAndWorkflow: '센서 판독 연산 부하로 인해 베이스 감도가 ISO 500~2000부터 작동하며 초고속 연사 시 제한 가능.',
          idealScenario: '고대비 야외 일몰 풍경, 야외-실내 명암비가 극심한 영화 및 다큐멘터리.',
        };
      case 'alli-vs-longgop':
        return {
          snrAndDr: '모든 프레임을 독립된 단일 정지 화상으로 압축하여 복잡한 고속 움직임에서도 매크로블록 아티팩트 방어.',
          resolutionAndArtifacts: '시간축 압축 손실이 없어 10-bit 4:2:2 컬러 그레이딩 및 크로마키 합성 에지 보존 우수.',
          speedAndWorkflow: '프레임 간 역연산(B-Frame 예측)이 없어 NLE 타임라인 스크러빙 및 컷편집 부하 제로. 단, 파일 용량 3~4배 증가.',
          idealScenario: '멀티카메라 예능/공연 편집, 빠른 컷편집이 필요한 방송 프로덕션.',
        };
      case 'cinema-raw-codecs':
        return {
          snrAndDr: '12-bit 원시 센서 데이터로 687억 색 계조 표현, 하이라이트 롤오프 복원력 극대화.',
          resolutionAndArtifacts: '인카메라 비가역 디모자이킹 및 샤프닝을 거치지 않아 광학계 본연의 순수 디테일 보존.',
          speedAndWorkflow: '촬영 후 편집 소프트웨어에서 화이트 밸런스(켈빈도)와 ISO를 100% 무손실로 재조정 가능. 고속 CFexpress 필수.',
          idealScenario: '영화 마스터링, 고급 상업 광고, VFX 그린스크린 합성 프로덕션.',
        };
      case 'cross-quad-pixel-af':
        return {
          snrAndDr: '4분할 화소를 화상 캡처 시 완전 합산(A+B+C+D)하여 단일 화소 수준의 SNR 유지.',
          resolutionAndArtifacts: '화소 내 4분할 격벽(DTI)으로 크로스토크 억제, 전 영역 균일한 해상력.',
          speedAndWorkflow: '수평/수직/대각선 4방향 위상차 동시 연산으로 가로 줄무늬 및 저조도(-8EV)에서도 즉시 락온.',
          idealScenario: '수풀 속의 조류, 잔디 위 스포츠 선수, 불규칙 패턴의 동물 추적.',
        };
      case 'five-axis-ibis-sync':
        return {
          snrAndDr: '핸드헬드 셔터 속도를 8스톱 이상 연장하여 야경에서 고감도 ISO를 올리지 않고 저감도로 촬영 가능하므로 극강의 SNR 달성.',
          resolutionAndArtifacts: '미세 손떨림으로 인한 블러를 완전히 차단해 고화소 센서의 100% 등배 픽셀 선예도 보존.',
          speedAndWorkflow: '삼각대 없이도 1~2초 장노출 사진 촬영 가능, 짐벌 없는 핸드헬드 영상 안정화.',
          idealScenario: '야경 도시 풍경, 박물관 내부 촬영, 가벼운 기동성의 여행 다큐멘터리.',
        };
      case 'photon-shot-noise':
        return {
          snrAndDr: '빛의 양자적 입자성에 기인하여 신호 크기 $S$의 제곱근($\\sqrt{S}$)만큼 발생. 오직 빛을 더 많이 모아야만 개선 가능.',
          resolutionAndArtifacts: '암부에서 고주파 자글거림을 발생시키며 디노이징 시 미세 질감 뭉개짐을 유발하는 근원.',
          speedAndWorkflow: '대구경 렌즈(F1.2~F1.4) 개방 및 긴 셔터 스피드를 확보하여 수광량을 늘리는 물리적 근거.',
          idealScenario: '천체 은하수 사진, 극한의 저조도 스냅 촬영.',
        };
      case 'iso-invariance':
        return {
          snrAndDr: '센서 리드 노이즈가 1~2e-로 극소화되어, 카메라 본체 증폭과 RAW 현상 밝기 올림의 SNR 차이가 없음.',
          resolutionAndArtifacts: '하이라이트 화이트홀을 방지하기 위해 4스톱 언더로 촬영해도 암부 노이즈 페널티가 없음.',
          speedAndWorkflow: '풍경 촬영 시 하이라이트 우선 노출을 설정하고 암부는 라이트룸에서 안전하게 복원.',
          idealScenario: '명암비가 극심한 일몰 역광 풍경, 야외 콘서트 무대 조명.',
        };
      case 'aspherical-lens-xa':
        return {
          snrAndDr: '빛의 투과 손실 없이 최대 개방 F1.2~F1.4에서 구면수차를 상쇄하여 주변부 콘트라스트 보존.',
          resolutionAndArtifacts: '0.01μm 초정밀 표면 연마로 절삭흔에 의한 동심원 양파링 보케를 완전히 소멸시키고 면도날 선예도 완성.',
          speedAndWorkflow: '렌즈 구성 매수를 줄여 대구경 렌즈의 전체 무게와 크기를 비약적으로 경량화.',
          idealScenario: '야경 점광원 인물 사진, 천체 별자리 사진, 상업 패션.',
        };
      case 'apodization-filter':
        return {
          snrAndDr: '렌즈 주변부 감광 필터로 인해 실효 광량(T-Stop)이 F값 대비 1~1.5스톱 손실되어 실내 저조도에서 셔터 확보 필요.',
          resolutionAndArtifacts: '착란원 에지 투과율을 가우시안 곡선으로 감쇄시켜 2선 보케(이중선) 없이 솜사탕처럼 녹아내리는 극상의 배경 흐림 실현.',
          speedAndWorkflow: '초점이 맞은 주피사체는 극도로 날카로우면서도 배경만 부드럽게 분리되어 입체감 극대화.',
          idealScenario: '웨딩 인물 촬영, 복잡한 나뭇잎 배경 야외 포트레이트.',
        };
      default:
        return {
          snrAndDr: '해당 아키텍처는 센서 전하 보존율 및 암부 S/N비 향상에 직접 기여함.',
          resolutionAndArtifacts: '광학 수차 억제 및 센서 해상력(MTF) 보존에 최적화된 설계.',
          speedAndWorkflow: '고속 판독 및 실시간 영상 처리 파이프라인의 효율성 극대화.',
          idealScenario: '고품질 스틸 및 시네마 비디오 제작 전반.',
        };
    }
  };

  const impactA = getImagingImpact(termA);
  const impactB = getImagingImpact(termB);

  // Copy comparison summary to clipboard
  const handleCopySummary = () => {
    const text = `[MiriCam 광학·센서 기술 1:1 비교 분석]
1. ${termA.nameKr} (${termA.nameEn})
- 분류: ${CATEGORY_LABELS[termA.category]} (${termA.difficulty})
- 핵심 원리: ${termA.shortDesc}
- 이미징 영향: ${impactA.snrAndDr}
- 추천 기종: ${termA.appliedCameras.join(', ')}

2. ${termB.nameKr} (${termB.nameEn})
- 분류: ${CATEGORY_LABELS[termB.category]} (${termB.difficulty})
- 핵심 원리: ${termB.shortDesc}
- 이미징 영향: ${impactB.snrAndDr}
- 추천 기종: ${termB.appliedCameras.join(', ')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              기술 1:1 심층 비교 (Side-by-Side Comparison)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              두 가지 광학·센서 기술을 선택하여 반도체 물리 메커니즘, 이미징 성능(DR/SNR/선예도), 운용 워크플로우 및 플래그십 카메라 적용 사양을 정밀 대조합니다.
            </p>
          </div>

          <button
            onClick={handleCopySummary}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '비교 요약 복사됨!' : '비교 요약 복사'}</span>
          </button>
        </div>
      </div>

      {/* Preset Pairs Strip */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>추천 엔지니어링 비교 프리셋 (Recommended Comparisons)</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PRESET_PAIRS.map((pair) => {
            const isActive = termAId === pair.termAId && termBId === pair.termBId;
            return (
              <button
                key={pair.id}
                onClick={() => {
                  setTermAId(pair.termAId);
                  setTermBId(pair.termBId);
                }}
                className={`p-2.5 rounded-xl border text-left whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="text-xs font-bold">{pair.title}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{pair.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Term Selectors (Side-by-Side Dual Dropdowns) */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Term A Selector (5 cols) */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              비교 기술 A (Subject A)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {termA.difficulty.split(' ')[0]}
            </span>
          </div>

          <div className="relative">
            <select
              value={termAId}
              onChange={(e) => setTermAId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allTerms.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === termBId}>
                  {t.nameKr} ({t.nameEn})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {termA.shortDesc}
          </p>
        </div>

        {/* Swap Button (1 col) */}
        <div className="md:col-span-1 flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition group"
            title="A/B 위치 바꾸기 (Swap)"
            aria-label="A와 B 기술 위치 전환"
          >
            <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Term B Selector (5 cols) */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              비교 기술 B (Subject B)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {termB.difficulty.split(' ')[0]}
            </span>
          </div>

          <div className="relative">
            <select
              value={termBId}
              onChange={(e) => setTermBId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {allTerms.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === termAId}>
                  {t.nameKr} ({t.nameEn})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {termB.shortDesc}
          </p>
        </div>
      </div>

      {/* Main Comparative Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-bold">
          <div className="md:col-span-3 p-4 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            비교 평가 항목 (Comparison Matrix)
          </div>
          <div className="md:col-span-4 p-4 text-blue-700 dark:text-blue-300 flex items-center justify-between border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700">
            <span>{termA.nameKr}</span>
            <button
              onClick={() => onSelectTerm(termA)}
              className="text-[11px] font-normal hover:underline flex items-center gap-1 text-blue-600 dark:text-blue-400"
            >
              <span>상세</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="md:col-span-5 p-4 text-purple-700 dark:text-purple-300 flex items-center justify-between border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700">
            <span>{termB.nameKr}</span>
            <button
              onClick={() => onSelectTerm(termB)}
              className="text-[11px] font-normal hover:underline flex items-center gap-1 text-purple-600 dark:text-purple-400"
            >
              <span>상세</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          
          {/* Row 1: Technical Category & Domain */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            <div className="md:col-span-3 p-4 font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
              기술 도메인 &amp; 공학 난이도
            </div>
            <div className="md:col-span-4 p-4 text-slate-800 dark:text-slate-200 md:border-l border-slate-100 dark:border-slate-800">
              <span className="font-medium">{CATEGORY_LABELS[termA.category]}</span>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono mt-0.5">{termA.difficulty}</div>
            </div>
            <div className="md:col-span-5 p-4 text-slate-800 dark:text-slate-200 md:border-l border-slate-100 dark:border-slate-800">
              <span className="font-medium">{CATEGORY_LABELS[termB.category]}</span>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 font-mono mt-0.5">{termB.difficulty}</div>
            </div>
          </div>

          {/* Row 2: Core Engineering Mechanisms */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            <div className="md:col-span-3 p-4 font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
              핵심 물리·반도체 동작 원리
            </div>
            <div className="md:col-span-4 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 space-y-1.5">
              {termA.keyMechanism.map((m, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs leading-relaxed">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
            <div className="md:col-span-5 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 space-y-1.5">
              {termB.keyMechanism.map((m, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs leading-relaxed">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Mathematical Formula */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            <div className="md:col-span-3 p-4 font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
              지배 수학 공식 &amp; 모델
            </div>
            <div className="md:col-span-4 p-4 md:border-l border-slate-100 dark:border-slate-800 space-y-1">
              <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg overflow-x-auto">
                {termA.formula || '경험적 광학 모델'}
              </div>
              {termA.formulaDescription && (
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{termA.formulaDescription}</p>
              )}
            </div>
            <div className="md:col-span-5 p-4 md:border-l border-slate-100 dark:border-slate-800 space-y-1">
              <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg overflow-x-auto">
                {termB.formula || '경험적 광학 모델'}
              </div>
              {termB.formulaDescription && (
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{termB.formulaDescription}</p>
              )}
            </div>
          </div>

          {/* Row 4: Impact on DR & S/N Ratio */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start bg-blue-50/30 dark:bg-blue-950/10">
            <div className="md:col-span-3 p-4 font-semibold text-slate-700 dark:text-slate-300">
              이미징 영향: 다이내믹 레인지 &amp; 노이즈 (DR / SNR)
            </div>
            <div className="md:col-span-4 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 leading-relaxed">
              {impactA.snrAndDr}
            </div>
            <div className="md:col-span-5 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 leading-relaxed">
              {impactB.snrAndDr}
            </div>
          </div>

          {/* Row 5: Impact on Sharpness & Resolution */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            <div className="md:col-span-3 p-4 font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
              이미징 영향: 해상력 &amp; 화상 아티팩트
            </div>
            <div className="md:col-span-4 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 leading-relaxed">
              {impactA.resolutionAndArtifacts}
            </div>
            <div className="md:col-span-5 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 leading-relaxed">
              {impactB.resolutionAndArtifacts}
            </div>
          </div>

          {/* Row 6: Impact on Speed & Operational Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            <div className="md:col-span-3 p-4 font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
              운용 속도 &amp; 프로덕션 워크플로우
            </div>
            <div className="md:col-span-4 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 leading-relaxed">
              {impactA.speedAndWorkflow}
            </div>
            <div className="md:col-span-5 p-4 text-slate-700 dark:text-slate-300 md:border-l border-slate-100 dark:border-slate-800 leading-relaxed">
              {impactB.speedAndWorkflow}
            </div>
          </div>

          {/* Row 7: Recommended Shooting Scenario */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start bg-emerald-50/30 dark:bg-emerald-950/10">
            <div className="md:col-span-3 p-4 font-semibold text-emerald-800 dark:text-emerald-300">
              최적 추천 촬영 시나리오 (Best Use Cases)
            </div>
            <div className="md:col-span-4 p-4 text-slate-800 dark:text-slate-200 md:border-l border-slate-100 dark:border-slate-800 font-medium leading-relaxed">
              {impactA.idealScenario}
            </div>
            <div className="md:col-span-5 p-4 text-slate-800 dark:text-slate-200 md:border-l border-slate-100 dark:border-slate-800 font-medium leading-relaxed">
              {impactB.idealScenario}
            </div>
          </div>

          {/* Row 8: Applied Camera Flagships */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            <div className="md:col-span-3 p-4 font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-purple-500" />
              <span>대표 탑재 플래그십 카메라</span>
            </div>
            <div className="md:col-span-4 p-4 md:border-l border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {termA.appliedCameras.map((cam, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 rounded text-[11px] font-medium border border-blue-200 dark:border-blue-900"
                  >
                    {cam}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 p-4 md:border-l border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {termB.appliedCameras.map((cam, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 rounded text-[11px] font-medium border border-purple-200 dark:border-purple-900"
                  >
                    {cam}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 9: Advantages & Trade-offs */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            <div className="md:col-span-3 p-4 font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
              핵심 장점 vs 한계점 (Trade-offs)
            </div>
            <div className="md:col-span-4 p-4 md:border-l border-slate-100 dark:border-slate-800 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  주요 장점
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {termA.keyAdvantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  한계 / 트레이드오프
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {termA.limitationsOrTradeoffs.map((lim, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 p-4 md:border-l border-slate-100 dark:border-slate-800 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  주요 장점
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {termB.keyAdvantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  한계 / 트레이드오프
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {termB.limitationsOrTradeoffs.map((lim, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
