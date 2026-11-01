import React, { useState } from 'react';
import { CameraTerm } from '../../types/camera';
import { Cpu, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';

interface SensorArchitectureTabProps {
  onSelectTerm: (term: CameraTerm) => void;
  allTerms: CameraTerm[];
}

interface SensorLayerInfo {
  id: string;
  name: string;
  nameKr: string;
  depth: string;
  color: string;
  desc: string;
  keyTech: string;
}

const SENSOR_LAYERS: SensorLayerInfo[] = [
  {
    id: 'layer-microlens',
    name: 'On-Chip Micro-Lens (OCL)',
    nameKr: '온칩 마이크로렌즈 & 반사 방지 코팅',
    depth: '최상단 (0.0 ~ 0.8 μm)',
    color: '#38bdf8', // sky
    desc: '입사 광선을 굴절시켜 각 화소의 유효 수광 영역으로 95% 이상 집광하는 미세 광학 렌즈 어레이. 센서 주변부로 갈수록 비스듬히 입사하는 빛을 보정하기 위해 중심축이 비대칭 편향된 오프셋 마이크로렌즈(Offset Microlens) 설계 적용.',
    keyTech: '갭리스(Gapless) 마이크로렌즈 공정, AR 나노 코팅',
  },
  {
    id: 'layer-color-dti',
    name: 'Color Filter & DTI Grid',
    nameKr: '컬러 필터 및 딥 트렌치 격리(DTI) 격벽',
    depth: '상부 광학층 (0.8 ~ 1.6 μm)',
    color: '#34d399', // emerald
    desc: '적(R), 녹(G), 청(B) 파장을 분리하는 안료 필터와 인접 화소 사이를 물리적으로 격리하는 딥 트렌치(DTI) 홈. 대구경 F1.2 렌즈 개방 시 비스듬히 침투하는 광선이 옆 화소로 새어나가는 크로스토크(혼색)를 40% 이상 차단.',
    keyTech: 'Full-depth DTI (Full Trench Isolation), 유전체 전반사(TIR)',
  },
  {
    id: 'layer-photodiode',
    name: 'BSI Silicon Photodiode Array',
    nameKr: '이면조사(BSI) 실리콘 포토다이오드 수광층',
    depth: '광전 변환층 (1.6 ~ 4.2 μm)',
    color: '#fbbf24', // amber
    desc: '금속 배선층을 포토다이오드 뒷면으로 보내어 개구율을 100%에 근접시킨 이면조사(Back-Illuminated) 구조. 광전 효과로 빛을 전자로 변환하고 플로팅 디퓨전(FD)에 전하를 일시 축적. 듀얼 컨버전 게인(DCG) 스위치가 화소 레벨에 직접 통합됨.',
    keyTech: '양자 효율(QE) 90% 이상 달성, 듀얼 컨버전 게인(DCG)',
  },
  {
    id: 'layer-cucu-bonding',
    name: 'Cu-Cu Hybrid Direct Bonding Interface',
    nameKr: 'Cu-Cu 하이브리드 직접 접합층',
    depth: '중간 계면 (4.2 ~ 4.8 μm)',
    color: '#f97316', // orange
    desc: '수광 화소 웨이퍼와 하부 로직 웨이퍼를 구리(Cu) 전극 패드로 원자 단위 직접 융합한 나노 인터페이스. 기존 실리콘 관통 전극(TSV)의 10μm 피치를 1μm 이하로 10배 축소하여 수천만 개의 픽셀과 하부 회로를 1:1 초밀착 연결.',
    keyTech: 'CMP 평탄화(거칠기 0.5nm 이하), 상온 유전체 접합 + 고온 구리 원자 확산',
  },
  {
    id: 'layer-dram',
    name: 'High-Speed DRAM Frame Buffer',
    nameKr: '고속 임베디드 DRAM 버퍼 메모리층',
    depth: '중단 캐시층 (4.8 ~ 6.5 μm)',
    color: '#a855f7', // purple
    desc: '센서 판독 데이터를 1/250초 이내에 일시 저장하는 1Gb~2Gb 용량의 적층 DRAM 메모리. 메인 이미지 프로세서(ISP)로 전송하기 전에 프레임을 초고속 흡수하여 롤링 셔터 왜곡을 소멸시키고 초당 120매 블랙아웃 프리 연사를 지탱.',
    keyTech: '적층 전용 초저지연 DRAM, 고대역폭 메모리 버스',
  },
  {
    id: 'layer-logic-adc',
    name: 'Pixel-Parallel / Column ADC & Logic Wafer',
    nameKr: 'ADC 아날로그-디지털 변환기 및 ISP 로직 웨이퍼',
    depth: '하단 제어층 (6.5 ~ 15.0 μm)',
    color: '#6366f1', // indigo
    desc: '아날로그 전하를 14-bit 디지털 신호로 초고속 변환하는 ADC 회로와 디지털 신호 처리 로직층. 수광부와 완전히 분리된 최신 나노 미세 공정(28nm/14nm)으로 제작되어 고주파 노이즈 유입을 차단하고 극저소비전력 실현.',
    keyTech: '듀얼 CDS(Correlated Double Sampling), 초저 리드 노이즈(1e- 미만)',
  },
];

export const SensorArchitectureTab: React.FC<SensorArchitectureTabProps> = ({
  onSelectTerm,
  allTerms,
}) => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('layer-cucu-bonding');
  const [selectedAfType, setSelectedAfType] = useState<'cdaf' | 'pdaf' | 'dual' | 'quad'>('quad');

  const activeLayer = SENSOR_LAYERS.find((l) => l.id === selectedLayerId) || SENSOR_LAYERS[0];
  const findTerm = (id: string) => allTerms.find((t) => t.id === id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          센서 반도체 아키텍처 &amp; 위상차 AF 혁신
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          3D 적층형 BSI 센서의 원자 단위 수직 구조(Cu-Cu Hybrid Bonding, Pixel-Parallel ADC, DTI)와 100% 전방향 크로스 쿼드 픽셀 위상차 AF의 동작 원리를 해부합니다.
        </p>
      </div>

      {/* 3D Stacked BSI Interactive Layer Explorer */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              3D 적층형 BSI 센서 수직 단면 인터랙티브 분해도 (Cross-Section)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              각 층을 클릭하여 나노 반도체 공정과 광학적 역할을 상세 분석하세요.
            </p>
          </div>
        </div>

        {/* 2-Column Explorer: Left Visual Stack, Right Technical Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Layer Selector Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              센서 표면 (빛 입사) ↓ 반도체 하부 기판
            </span>

            {SENSOR_LAYERS.map((layer) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3.5 h-3.5 rounded-md shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    <div>
                      <p className={`text-xs font-bold ${
                        isSelected ? 'text-blue-900 dark:text-blue-300' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {layer.nameKr}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400">
                        {layer.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {layer.depth.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Layer Spec (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: activeLayer.color }}
                  />
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {activeLayer.nameKr}
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  {activeLayer.depth}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  구조 및 작동 원리
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeLayer.desc}
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="text-slate-400 text-[10px] font-semibold uppercase">
                  적용 핵심 반도체 제조 공정
                </span>
                <p className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                  {activeLayer.keyTech}
                </p>
              </div>
            </div>

            {/* Quick Link to corresponding Term Modal */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  let tid = 'stacked-bsi';
                  if (activeLayer.id === 'layer-cucu-bonding') tid = 'cu-cu-bonding';
                  if (activeLayer.id === 'layer-color-dti') tid = 'deep-trench-isolation';
                  if (activeLayer.id === 'layer-logic-adc') tid = 'pixel-parallel-adc';
                  const t = findTerm(tid);
                  if (t) onSelectTerm(t);
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>관련 전문 용어 상세 논문 열기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Autofocus Evolution: 4-Way Visual Explainer */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              오토포커스(AF) 진화 단계와 4분할 크로스 쿼드 픽셀의 물리적 원리
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              단일 화소 내 포토다이오드 분할 구조에 따른 위상차 검출 사각지대 극복
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'cdaf', label: '1단계: 콘트라스트 AF (CDAF)' },
            { id: 'pdaf', label: '2단계: 마스킹 픽셀 위상차 (OSPDAF)' },
            { id: 'dual', label: '3단계: 2분할 듀얼 픽셀 AF (Dual Pixel)' },
            { id: 'quad', label: '4단계: 4분할 크로스 쿼드 픽셀 (Quad Pixel)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedAfType(item.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedAfType === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* AF Content Visualizer */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/80">
          {selectedAfType === 'cdaf' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <span>원리: 렌즈를 앞뒤로 전후 이동(Wobbling/Hunting)하며 화상의 명암비 피크 탐색</span>
              </div>
              <p>
                단일 포토다이오드에서 나오는 이미지의 경계면 콘트라스트가 최대가 되는 지점을 계산합니다. 정지 피사체에 대해서는 핀포인트 정확도가 높지만, 초점이 어디에 있는지 방향을 알지 못해 렌즈를 앞뒤로 흔들어야 하므로 고속 동체 추적이나 동영상 녹화 시 호흡(워블링) 현상이 심각합니다.
              </p>
            </div>
          )}

          {selectedAfType === 'pdaf' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                <span>원리: 센서 특정 화소의 절반을 금속으로 차광하여 좌/우 위상차 검출</span>
              </div>
              <p>
                센서 표면의 일부 픽셀을 전용 AF 픽셀로 지정하고 금속 쉴드로 빛의 절반을 가려 왼쪽/오른쪽 광선을 분리합니다. 초점이 앞/뒤 어디에 얼마나 어긋나 있는지 위상차로 즉시 계산하지만, 차광 픽셀의 화질 결손(보간 필요)과 수평 패턴(가로 줄무늬)을 감지하지 못하는 치명적 맹점이 있었습니다.
              </p>
            </div>
          )}

          {selectedAfType === 'dual' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400">
                <span>원리: 1개 마이크로렌즈 아래 2개의 포토다이오드(A/B) 배치 (100% 화소 위상차)</span>
              </div>
              <p>
                차광 픽셀 없이 전 화소가 수광과 AF를 동시 수행합니다. A 화소와 B 화소의 시차 신호로 즉각 초점을 잡고 화상 촬영 시에는 A+B를 합산하여 화질 손실이 전혀 없습니다. 그러나 좌우 분할 구조이므로 세로선은 완벽히 잡지만 카메라와 평행한 가로선(수평 패턴)에는 위상차가 생기지 않아 여전히 AF가 불가능했습니다.
              </p>
            </div>
          )}

          {selectedAfType === 'quad' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <span>원리: 1개 마이크로렌즈 아래 4개(2x2) 포토다이오드(A, B, C, D) 십자 크로스 배치</span>
              </div>
              <p>
                (A+C) vs (B+D)로 수평 변위를, (A+B) vs (C+D)로 수직 변위를 동시에 계산합니다. 수평, 수직, 대각선 등 모든 방향의 위상차 벡터를 100% 검출하여 가로 줄무늬나 블라인드, 수풀 속에서도 단 한 번의 헤맴 없이 즉각 락온합니다.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                <Check className="w-3.5 h-3.5" />
                <span>1,053개 전 영역 올-크로스 타입 AF 지원 (OM SYSTEM OM-1 II 탑재)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
