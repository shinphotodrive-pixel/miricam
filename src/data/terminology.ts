import { CameraTerm } from '../types/camera';

export const CAMERA_TERMS: CameraTerm[] = [
  {
    id: 'global-shutter',
    nameKr: '글로벌 셔터',
    nameEn: 'Global Shutter',
    category: 'sensor-architecture',
    difficulty: '전문 (Expert)',
    shortDesc: '센서 내 모든 픽셀의 광전하를 동시에 노출 및 판독하여 롤링 셔터 왜곡과 플리커를 100% 제거하는 셔터 방식.',
    fullExplanation: '글로벌 셔터는 센서의 모든 픽셀이 동일한 순간에 빛을 축적하기 시작하여 동일한 순간에 축적을 종료하는 메커니즘입니다. 기존 롤링 셔터가 위에서 아래로 행(Row) 단위로 순차 주사하면서 발생하는 젤로 왜곡(Rolling Shutter Distortion), 플래시 동조 속도 한계, LED 조명 밴딩(Banding) 문제를 근본적으로 해결합니다. 이를 위해 각 화소마다 전하를 임시 보관하는 아날로그 메모리 노드 또는 초고속 픽셀 병렬 ADC가 통합되어야 하므로 설계 난이도와 공정 원가가 매우 높습니다.',
    keyMechanism: [
      '모든 화소의 전하 축적 시작과 종료가 나노초 단위 동기화로 일제히 수행됨',
      '화소 내 전하를 보존하기 위한 차광 메모리 노드(In-pixel Storage Node) 배치',
      '초고속 플래시 동조 지원 (최대 1/80,000초 전 구간 동조 달성)',
      '고속 비행체, 골프 스윙, 헬리콥터 블레이드 등의 기하학적 형상 왜곡 제로'
    ],
    formula: 't_{readout} = 0 \\text{ s (Simultaneous readout across all pixel rows)}',
    formulaDescription: '센서 판독 시차로 인한 지연 시간이 0이며, 노출 시작 및 차단이 전 픽셀에 대해 동시에 성립합니다.',
    appliedCameras: ['Sony α9 III (Exmor RS Global Shutter)', 'Red Komodo 6K', 'Canon C500 Mark II (특수 라인업)', 'Sony F55'],
    keyAdvantages: [
      '기계식 셔터 완전 배제 및 1/80,000초 플래시 전속도 동조',
      '패닝 및 고속 피사체 촬영 시 젤로 왜곡(Jello effect) 원천 차단',
      '인공조명(LED, 형광등) 하에서의 수평 줄무늬 플리커 완전 억제'
    ],
    limitationsOrTradeoffs: [
      '픽셀 내 추가 트랜지스터 점유로 인한 유효 개구율 및 기저 감도(기본 ISO 250) 저하 가능성',
      '제조 단가 급증 및 발열 제어 복잡도 증가'
    ]
  },
  {
    id: 'stacked-bsi',
    nameKr: '3D 적층형 BSI 센서',
    nameEn: 'Stacked Back-Illuminated (BSI) CMOS Sensor',
    category: 'sensor-architecture',
    difficulty: '전문 (Expert)',
    shortDesc: '수광 화소층, 초고속 DRAM 버퍼층, 로직 처리층을 수직 3단 적층하여 데이터 전송 대역폭을 비약적으로 증대시킨 구조.',
    fullExplanation: '전통적인 FSI(전면조사) 및 일반 단일 평면 BSI(이면조사) 센서와 달리, 포토다이오드가 위치한 픽셀 어레이 하단에 고속 DRAM 캐시와 병렬 ADC 로직 회로 웨이퍼를 구리-구리(Cu-Cu) 하이브리드 본딩 기술로 수직 접합한 최첨단 반도체 아키텍처입니다. 센서 내부 배선 길이를 마이크로미터 단위로 축소하여 판독 속도를 기존 대비 4~5배 이상 가속화함으로써 1/250초 이상의 롤링 셔터 판독 속도와 초당 120매 이상의 블랙아웃 프리 연속 촬영을 실현합니다.',
    keyMechanism: [
      '상단: 마이크로렌즈 + 컬러필터 + 실리콘 기판 후면 포토다이오드 (수광률 극대화)',
      '중단: 1Gb~2Gb 용량의 고속 내장 DRAM 프레임 메모리 버퍼층',
      '하단: 컬럼 병렬 ADC(Analog-to-Digital Converter) 및 ISP 고속 신호 처리 로직층',
      'TSV(Through-Silicon Via) 및 Cu-Cu 직접 접합 기술로 상하 층간 1,000만 개 이상의 마이크로 범프 연결'
    ],
    formula: '\\text{Readout Rate} \\propto \\frac{\\text{Interconnect Density}}{\\text{RC Parasitic Delay}}',
    formulaDescription: '층간 배선 밀도 증가와 기생 RC 지연 감소로 판독 클럭과 대역폭이 극대화됩니다.',
    appliedCameras: ['Sony α1', 'Nikon Z8 / Z9', 'Canon EOS R5 Mark II / EOS R1', 'Sony α9 II / α7R V'],
    keyAdvantages: [
      '판독 속도 1/250초~1/400초 수준 달성으로 전자셔터 젤로 왜곡을 기계셔터 수준으로 억제',
      '초당 최대 120fps RAW 버스트 및 실시간 4K/120p, 8K/60p 오버샘플링 가능',
      'EVF 디스플레이와 센서 판독의 완전 비동기화로 100% 블랙아웃 없는 라이브뷰 제공'
    ],
    limitationsOrTradeoffs: [
      '3중 웨이퍼 공정으로 인한 높은 생산 비용',
      '고속 데이터 스트리밍 시 소비 전력 및 발열 증가로 방열 설계 필수'
    ]
  },
  {
    id: 'cu-cu-bonding',
    nameKr: 'Cu-Cu 직접 접합 (하이브리드 본딩)',
    nameEn: 'Cu-Cu Direct Hybrid Bonding',
    category: 'sensor-architecture',
    difficulty: '전문 (Expert)',
    shortDesc: '화소층과 회로층 웨이퍼의 구리(Cu) 전극 패드를 나노미터 정밀도로 직접 융합 연결하는 적층 반도체 패키징 기술.',
    fullExplanation: '과거 실리콘 관통 전극(TSV, Through-Silicon Via) 방식은 픽셀 어레이 외곽부에 비아 홀을 뚫어 배선했기 때문에 칩 크기가 커지고 배선 밀도에 한계가 있었습니다. Cu-Cu 직접 하이브리드 본딩은 웨이퍼 표면에 산화막(SiO2)과 구리(Cu) 패드를 원자 수준 평탄화(CMP)한 후 상온에서 유전체 접합 후 열처리를 거쳐 구리 원자 확산으로 금속 패드를 일체화합니다. 이를 통해 화소 바로 아래에 ADC 회로를 1:1로 밀착 연결하는 픽셀 병렬 아키텍처가 가능해집니다.',
    keyMechanism: [
      'CMP(Chemical Mechanical Planarization) 공정으로 웨이퍼 표면 거칠기 0.5nm 이하 유지',
      '유전체(SiO2/SiCN) 선접합 후 300~400℃ 열처리로 구리(Cu) 열팽창 및 원자간 고체 확산 접합',
      '접합 피치(Pitch)를 기존 10μm(TSV)에서 1μm 이하로 10배 이상 축소',
      '기생 용량(Parasitic Capacitance)과 신호 왜곡을 극소화하여 초저노이즈 실현'
    ],
    formula: 'R_{contact} \\propto \\frac{\\rho}{A_{contact}}, \\quad C_{parasitic} \\ll C_{TSV}',
    formulaDescription: '접촉 저항과 기생 용량이 획기적으로 낮아져 고주파 신호 무결성이 보장됩니다.',
    appliedCameras: ['Sony 최신 Exmor RS 탑재 센서', 'Canon Accelerated Capture 시스템', 'Nikon Z9 센서 어레이'],
    keyAdvantages: [
      '센서 다이 크기 축소 및 극한의 소형화 가능',
      '픽셀당 직접 배선 개수가 10배 이상 증가하여 병렬 판독 속도 비약적 향상',
      '전력 소모 감소 및 발열 분산 효율 개선'
    ],
    limitationsOrTradeoffs: [
      '클린룸 환경의 나노미터 단위 정렬 오차 허용치(0.1μm 이하)로 인한 고비용 수율 관리',
      '열팽창 계수(CTE) 불일치로 인한 웨이퍼 휨 제어 필요'
    ]
  },
  {
    id: 'deep-trench-isolation',
    nameKr: '딥 트렌치 격리 (DTI)',
    nameEn: 'Deep Trench Isolation (DTI)',
    category: 'sensor-architecture',
    difficulty: '심화 (Advanced)',
    shortDesc: '인접한 포토다이오드 사이에 물리적 절연 깊은 홈을 파서 빛과 전하의 누설(크로스토크)을 차단하는 기술.',
    fullExplanation: '픽셀 크기가 미세화될수록(예: 2~4μm 이하) 한 화소로 입사된 비스듬한 광선이나 포토다이오드 내부에서 생성된 전자(Photoelectron)가 인접 화소로 침범하는 크로스토크(Crosstalk)가 발생합니다. 이는 색순도 저하, 해상력 손실, 색수차 유발 및 고감도 노이즈의 원인이 됩니다. DTI는 실리콘 기판 내부 화소 경계면에 깊은 홈(Trench)을 파고 굴절률이 낮은 산화물이나 금속 장벽을 채워 광학적 반사와 전기적 격리를 동시에 구현합니다.',
    keyMechanism: [
      'Front-Side DTI (FDTI) 및 Full-Depth B-DTI (Backside DTI) 구조 적용',
      '실리콘 기판(굴절률 ~3.9)과 트렌치 충진재(SiO2, 굴절률 ~1.46) 간 전반사(TIR) 유도',
      '인접 화소 간의 캐리어(전자) 재결합 및 확산 누설 원천 차단',
      '사선으로 입사하는 대구경 렌즈 주변부 광선의 혼색 억제'
    ],
    formula: '\\theta_c = \\arcsin\\left(\\frac{n_{SiO_2}}{n_{Si}}\\right) \\approx \\arcsin\\left(\\frac{1.46}{3.9}\\right) \\approx 22^\\circ',
    formulaDescription: '약 22도 이상의 입사각을 갖는 광선이 픽셀 경계벽에서 전반사되어 본래 포토다이오드에 갇히게 됩니다.',
    appliedCameras: ['Fujifilm GFX100 II / X-T5', 'Sony α7R V (61MP 고화소)', 'Samsung ISOCELL 고화소 센서'],
    keyAdvantages: [
      '고화소 미세 피치 센서에서 인접 화소 간 색 혼합(Chroma Crosstalk) 30~50% 감소',
      '색 재현 정확도 및 선예도(MTF) 대폭 향상',
      'F1.2~F1.4 대구경 렌즈 개방 시 주변부 감광 및 비네팅 개선'
    ],
    limitationsOrTradeoffs: [
      '트렌치 표면 결함(Surface State)에 의한 암전류(Dark Current) 생성 가능성 증가',
      '원자층 증착(ALD) 공정 난이도 상승'
    ]
  },
  {
    id: 'pixel-parallel-adc',
    nameKr: '픽셀 병렬 ADC',
    nameEn: 'Pixel-Parallel Analog-to-Digital Converter',
    category: 'sensor-architecture',
    difficulty: '전문 (Expert)',
    shortDesc: '열(Column)마다 배치되던 ADC 회로를 모든 픽셀마다 1:1로 수직 배치하여 병렬 동시 변환을 수행하는 구조.',
    fullExplanation: '기존 센서는 한 행씩 데이터를 순차적으로 읽어와 센서 하단의 컬럼 ADC에서 변환했습니다. 픽셀 병렬 ADC는 Cu-Cu 하이브리드 본딩을 통해 모든 화소 바로 밑에 ADC를 배치하여 수천만 개의 아날로그 신호를 단 1회 클럭으로 동시에 디지털 코드로 변환합니다. 이를 통해 아날로그 신호가 긴 배선을 지나며 겪는 노이즈 유입을 극적으로 차단하고, 100만분의 1초 수준의 전체 프레임 디지털 판독을 구현합니다.',
    keyMechanism: [
      '센서 화소 수(예: 2,400만 개)와 동일한 개수의 서브마이크론 단일 슬로프(Single-Slope) ADC 배열',
      '아날로그 전하 이동 거리를 1μm 이하로 단축하여 선로 저항 및 열잡음 배제',
      '디지털 카운트 데이터를 고속 버스 라인으로 동시 출력',
      '디지털 도메인 CDS(Correlated Double Sampling)로 kTC 리셋 노이즈 완전 소거'
    ],
    formula: 't_{conv} = t_{pixel} \\quad (\\text{vs Column ADC: } t_{conv} = t_{pixel} \\times N_{rows})',
    formulaDescription: '행 수에 비례하던 총 변환 시간이 단일 화소 변환 시간으로 압축됩니다.',
    appliedCameras: ['Sony 산업용 센서 및 첨단 차세대 미러리스 센서 연구', 'Sony α9 III 아키텍처 기반 요소 기술'],
    keyAdvantages: [
      '초고속 판독으로 글로벌 셔터 및 초고속 동체 추적에 이상적',
      '아날로그 버스 배선 노이즈가 제거되어 리드 노이즈 1e- 미만으로 하락',
      '다이내믹 레인지(DR) 극대화'
    ],
    limitationsOrTradeoffs: [
      '센서 내 수천만 개의 ADC 동시 구동 시 순간 피크 전류 및 전력 소비 증가',
      '화소별 ADC 특성 불균일성에 따른 FPN(Fixed Pattern Noise) 보정 알고리즘 필수'
    ]
  },
  {
    id: 'dual-conversion-gain',
    nameKr: '듀얼 컨버전 게인 (DCG / Dual Native ISO)',
    nameEn: 'Dual Conversion Gain (DCG) / Dual Native ISO',
    category: 'cinema-dr',
    difficulty: '심화 (Advanced)',
    shortDesc: '플로팅 디퓨전(FD)의 정전 용량을 가변 스위칭하여 저감도에서는 최대 DR을, 고감도에서는 초저노이즈를 구현하는 회로 기술.',
    fullExplanation: '포토다이오드에서 생성된 전자를 전압으로 변환하는 노드(Floating Diffusion, FD)에 아날로그 스위치를 추가한 기술입니다. 저감도(LCG, Low Conversion Gain) 모드에서는 커패시턴스를 크게 만들어 많은 전하를 수용함으로써 포화 전하 용량(Full Well Capacity)과 하이라이트 다이내믹 레인지를 보존합니다. 어두운 환경(HCG, High Conversion Gain) 모드에서는 스위치를 열어 커패시턴스를 극소화함으로써 전자 1개당 생성되는 전압($V = Q/C$)을 증폭시켜 증폭기 이후의 판독 노이즈(Read Noise) 영향을 극적으로 낮춥니다.',
    keyMechanism: [
      'LCG 모드: FD 커패시턴스($C_{FD}$)를 높여 하이라이트 클리핑 방지 및 최대 계조 확보',
      'HCG 모드: FD 스위치를 개방하여 $C_{FD}$를 최소화, 변환 감도($\\mu V/e^-$)를 3~4배 승압',
      '아날로그 증폭 전 단계에서 전압 감도를 높이므로 증폭기 자체 노이즈가 상대적으로 감쇄됨',
      '특정 ISO 기준점(예: ISO 100과 ISO 800)에서 노이즈가 계단식으로 급감하는 듀얼 네이티브 ISO 형성'
    ],
    formula: '\\Delta V = \\frac{q}{C_{FD}}, \\quad \\text{SNR}_{HCG} > \\text{SNR}_{LCG} \\text{ at low light}',
    formulaDescription: '정전 용량($C$)이 작을수록 미세 전하($q$)에 의해 발생하는 전압 변위($\\Delta V$)가 커집니다.',
    appliedCameras: ['Sony α7S III / FX3 / FX6 (ISO 800 & 12800)', 'Panasonic Lumix S5 II / S5 IIX (ISO 640 & 4000)', 'Canon EOS R5 C', 'Nikon Z8 / Z6 III'],
    keyAdvantages: [
      '암부 노이즈 대폭 감소로 저조도 야경 및 실내 촬영 퀄리티 비약적 향상',
      '베이스 ISO뿐 아니라 2차 네이티브 ISO에서도 동등한 수준의 14~15스톱 DR 유지',
      '시네마 워크플로우에서 추가 조명 없이도 깨끗한 섀도우 디테일 복원'
    ],
    limitationsOrTradeoffs: [
      'LCG와 HCG 모드 전환 지점(스위칭 ISO) 바로 직전 단계에서는 상대적으로 노이즈가 눈에 띌 수 있음',
      '카메라 수동 운용 시 두 기준 감도의 작동 특성을 이해해야 최적 노출 설정 가능'
    ]
  },
  {
    id: 'dr-boost',
    nameKr: '다이내믹 레인지 부스트 (DR Boost)',
    nameEn: 'Dynamic Range Boost (DR Boost)',
    category: 'cinema-dr',
    difficulty: '전문 (Expert)',
    shortDesc: '단일 노출 순간에 저게인(LCG)과 고게인(HCG) 두 경로를 동시 판독하여 실시간으로 픽셀 단위 합성하는 HDR 기술.',
    fullExplanation: '일반적인 HDR 촬영은 서로 다른 셔터 속도로 2장 이상의 프레임을 연속 촬영해 합성하므로 동체 고스트(Motion Ghosting) 왜곡이 생깁니다. 파나소닉 및 최신 시네마 센서에 탑재된 DR Boost는 단 한 번의 셔터 노출 동안 센서의 포토다이오드에서 나오는 전하를 저게인 회로(하이라이트 우선)와 고게인 회로(암부 초저노이즈 우선)로 분기시켜 동시 출력한 뒤, 인카메라 프로세서에서 단일 프레임으로 픽셀 합성합니다. 그 결과 움직이는 피사체 왜곡 없이 순수한 15스톱 이상의 초광역 DR을 동영상 및 사진에서 실시간 확보합니다.',
    keyMechanism: [
      '단일 노출로 센서 포토다이오드의 광전하를 실시간 분할 샘플링',
      '경로 A: 하이라이트 포화를 방지하는 LCG 경로 (최대 Full Well Capacity 계조 유지)',
      '경로 B: 섀도우 노이즈를 억제하는 HCG 경로 (초고감도 저노이즈 계조)',
      '실시간 하드웨어 FPGA/ISP가 두 신호의 경계값을 픽셀 가중치 블렌딩으로 즉각 16-bit 융합'
    ],
    formula: '\\text{DR}_{boost} = 20 \\log_{10}\\left(\\frac{\\text{FWC}_{LCG}}{\\sigma_{\\text{read}, HCG}}\\right)',
    formulaDescription: '최대 전하량은 LCG의 천장을 취하고 노이즈 바닥은 HCG의 극저노이즈를 취하여 DR을 2스톱 이상 확장합니다.',
    appliedCameras: ['Panasonic Lumix GH6 / GH7', 'Panasonic Lumix G9 II', 'ARRI ALEXA 35 (Dual Gain Output, DGO)', 'Canon C300 Mark III / C70 (DGO)'],
    keyAdvantages: [
      '동체 고스트(Motion Artifacts)가 전혀 발생하지 않는 완벽한 단일 프레임 리얼타임 HDR',
      'V-Log 및 Log 워크플로우에서 15스톱 이상의 시네마 카메라급 관용도 실현',
      '하이라이트 롤오프가 부드럽고 섀도우 밴딩 노이즈 완전 억제'
    ],
    limitationsOrTradeoffs: [
      '두 경로 동시 판독으로 인해 베이스 지원 감도가 다소 높아짐 (예: GH6 기준 ISO 2000 이상, GH7/G9II 기준 ISO 500 이상)',
      '초고속 프레임레이트(예: 4K 120p)에서는 센서 발열 및 대역폭 제약으로 기능이 비활성화될 수 있음'
    ]
  },
  {
    id: 'iso-invariance',
    nameKr: 'ISO 불변성',
    nameEn: 'ISO Invariance',
    category: 'optics-exposure',
    difficulty: '심화 (Advanced)',
    shortDesc: '카메라 내 하드웨어 아날로그 게인 증폭과 촬영 후 RAW 현상 소프트웨어 밝기 올림의 노이즈 차이가 없는 센서 특성.',
    fullExplanation: '구형 센서는 센서 판독 회로(Readout circuit)의 아날로그 리드 노이즈가 컸기 때문에 카메라 본체에서 ISO를 높여 아날로그 신호를 먼저 증폭해야 하류단 노이즈를 이길 수 있었습니다. 반면 현대의 최첨단 CMOS 센서는 컬럼 ADC 및 온칩 구조 덕분에 리드 노이즈가 전자 1~2개 수준(1~2e-)으로 지극히 낮습니다. 따라서 촬영 시 ISO 100으로 저노출 언더 촬영한 뒤 라이트룸 등에서 노출을 +4~5스톱 끌어올린 결과물과, 처음부터 ISO 1600~3200으로 촬영한 결과물의 노이즈 및 SNR이 사실상 동일한 현상을 ISO 불변성이라 부릅니다.',
    keyMechanism: [
      '판독 노이즈(Read Noise)가 광자 샷 노이즈(Shot Noise)보다 현저히 작은 초저노이즈 플로어 달성',
      '아날로그 도메인 증폭과 디지털 곱셈 증폭 간의 노이즈 페널티 차이 소멸',
      'ISO를 낮추어 하이라이트 날림을 100% 방지하고 암부는 후보정에서 끌어올리는 ETTR(Expose To The Right)의 반대 기법 가능'
    ],
    formula: 'N_{total} = \\sqrt{S + \\sigma_{read}^2} \\approx \\sqrt{S} \\quad (\\text{when } \\sigma_{read} \\to 0)',
    formulaDescription: '리드 노이즈가 0에 수렴하면 총 노이즈는 순수 광자 신호의 제곱근(샷 노이즈)에만 종속됩니다.',
    appliedCameras: ['Sony α7R IV / α7R V', 'Nikon Z7 II / Z8', 'Fujifilm X-T5 / GFX100 II', 'Leica M11'],
    keyAdvantages: [
      '일몰, 콘서트, 고대비 풍경에서 하이라이트 화이트홀 방지를 위한 극적 언더 노출 가능',
      '단 한 장의 RAW 파일에서 암부와 명부를 모두 완벽히 살려내는 풍경 사진 테크닉 제공'
    ],
    limitationsOrTradeoffs: [
      'EVF나 LCD 모니터 프리뷰 화면이 어둡게 보여 구도 및 초점 확인이 어려울 수 있음',
      '듀얼 네이티브 ISO 센서의 경우 1차 게인 영역과 2차 게인 영역 사이의 점프 구간에서는 불변성이 단절됨'
    ]
  },
  {
    id: 'cross-quad-pixel-af',
    nameKr: '크로스 쿼드 픽셀 AF',
    nameEn: 'Cross Quad Pixel AF (QPA / Quad Bayer AF)',
    category: 'autofocus',
    difficulty: '심화 (Advanced)',
    shortDesc: '하나의 마이크로렌즈 아래에 포토다이오드를 4분할(2x2)하여 상하·좌우 및 대각선 모든 방향의 위상차를 검출하는 크로스 AF.',
    fullExplanation: '캐논의 듀얼 픽셀 AF는 화소를 좌/우 2분할하여 세로선(수직 패턴)에는 민감하지만 가로선(수평 패턴) 위상차를 검출하지 못하는 물리적 한계가 있었습니다. 크로스 쿼드 픽셀 AF는 단일 픽셀을 4분할(좌상, 우상, 좌하, 우하)하여 좌우 신호차(세로선 검출)와 상하 신호차(가로선 검출), 대각선 신호차를 모두 획득합니다. 이를 통해 피사체의 패턴 방향이나 카메라 그립 방향(가로/세로 촬영)에 무관하게 화면 전체 100% 영역에서 즉각적이고 완벽한 크로스 타입 위상차 검출을 수행합니다.',
    keyMechanism: [
      '단일 온칩 마이크로렌즈(OCL) 아래에 4개의 독립 포토다이오드 배치',
      '좌(A+C) vs 우(B+D) 신호 비교로 수평 변위 검출',
      '상(A+B) vs 하(C+D) 신호 비교로 수직 변위 검출',
      '화상 캡처 시 4개의 신호를 완전히 합산(A+B+C+D)하여 1개 픽셀의 화질 신호로 변환'
    ],
    formula: '\\Delta_{horizontal} = (A+C) - (B+D), \\quad \\Delta_{vertical} = (A+B) - (C+D)',
    formulaDescription: '4분할 신호의 행렬 감산을 통해 2차원 공간 상의 전방향 위상차 벡터를 계산합니다.',
    appliedCameras: ['OM SYSTEM OM-1 / OM-1 Mark II (Cross Quad Pixel AF)', '최신 플래그십 모바일 이미지 센서 (Samsung ISOCELL HP2, Sony LYT-900)'],
    keyAdvantages: [
      '수평 줄무늬, 잔디, 블라인드 등 기존 위상차 AF가 헤매던 피사체에서도 100% 락온',
      '저조도 검출 한계 대폭 개선 (최대 -8EV 이하 검출 지원)',
      '1,053개 이상의 전 영역 올-크로스 AF 포인트 구현'
    ],
    limitationsOrTradeoffs: [
      '픽셀당 4배의 신호 판독 및 전송량으로 센서 엔진의 연산 부하 증가',
      '4분할 화소 간 미세한 크로스토크 제어를 위한 DTI 기술 필수'
    ]
  },
  {
    id: 'airy-disk-diffraction',
    nameKr: '에어리 디스크 & 회절 한계',
    nameEn: 'Airy Disk & Diffraction Limited Aperture (DLA)',
    category: 'optics-exposure',
    difficulty: '기초 (Fundamental)',
    shortDesc: '빛의 파동성으로 인해 렌즈 조리개를 좁힐수록 점광원이 넓은 동심원 패턴으로 퍼지며 해상력이 급격히 저하되는 물리 현상.',
    fullExplanation: '빛이 원형 조리개 개구부를 통과할 때 빛의 파동 회절 현상으로 인해 무한히 작은 이상적인 점으로 모이지 못하고 중심의 밝은 원판과 이를 둘러싼 동심원 고리 패턴을 만듭니다. 이를 에어리 디스크(Airy Disk)라 부릅니다. 조리개를 조일수록(F값이 커질수록) 에어리 디스크의 직경($d$)은 선형적으로 커집니다. 에어리 디스크 직경이 센서의 픽셀 피치(Pixel Pitch)를 초과하는 조리개 값을 회절 한계 조리개(DLA, Diffraction Limited Aperture)라 하며, 이 지점을 넘어서면 조리개를 조여도 피사계 심도는 깊어지나 이미지의 미세 선예도는 오히려 급격히 뿌옇게 흐려집니다.',
    keyMechanism: [
      '빛의 파장($\\lambda$)과 렌즈 조리개 값($F$)의 상호작용으로 회절 무늬 형성',
      '중심 디스크 영역에 전체 빛 에너지의 약 84%가 집중됨',
      '센서 고화소화로 픽셀 피치가 3μm 이하로 줄어들수록 회절 한계가 일찍 도래 (F5.6~F8부터 회절 시작)'
    ],
    formula: 'd = 2.44 \\lambda N \\quad (d: \\text{Airy Disk Diameter}, \\lambda: \\text{Wavelength}, N: \\text{F-number})',
    formulaDescription: '녹색광(550nm) 기준 에어리 디스크 직경(μm)은 대략 1.34 × F값으로 계산됩니다. F8일 때 직경은 약 10.7μm입니다.',
    appliedCameras: ['고화소 센서 탑재 전 기종 (Sony α7R V, Nikon Z7 II, Fujifilm GFX100 II, Canon R5)'],
    keyAdvantages: [
      '광학 렌즈 설계 시 광학계의 이론적 최대 해상력(회절 한계) 지표로 활용',
      '최적 해상력을 내는 스위트 스팟(Sweet Spot, 주로 F4~F8) 판단의 기준'
    ],
    limitationsOrTradeoffs: [
      '풍경 촬영 시 팬포커스를 얻기 위해 F16~F22로 과도하게 조일 경우 미세 텍스처 디테일 영구 붕괴',
      '소프트웨어 회절 보정(Digital Lens Optimizer)으로 일부 역컨볼루션(Deconvolution) 복원 가능하나 광학적 한계 존재'
    ]
  },
  {
    id: 'mtf-modulation-transfer-function',
    nameKr: '변조 전달 함수 (MTF)',
    nameEn: 'Modulation Transfer Function (MTF)',
    category: 'lens-mechanics',
    difficulty: '심화 (Advanced)',
    shortDesc: '피사체의 원래 콘트라스트를 렌즈가 공간 주파수(lp/mm)별로 센서 면에 얼마나 충실하게 전달하는지 나타내는 광학 평가지표.',
    fullExplanation: 'MTF는 렌즈의 광학적 성능을 객관적 숫자로 검증하는 국제 표준 규격입니다. 백색광에서 1mm당 10쌍의 흑백 선(10 line pairs/mm)의 대비 전달율은 렌즈의 전반적인 "콘트라스트와 투명감"을 평가하고, 30 lp/mm 이상의 고주파수 대비 전달율은 렌즈의 "미세 해상력(해상도)"을 평가합니다. 또한 렌즈 중심에서 방사상 방향의 사짓탈(Sagittal, 실선) 선과 원주 접선 방향의 메리디오날(Meridional, 점선) 선이 일치할수록 비점수차와 코마수차가 적어 배경 흐림(보케)이 자연스럽고 왜곡이 없습니다.',
    keyMechanism: [
      '공간 주파수(Spatial Frequency: 10, 30, 50 lp/mm)에 따른 콘트라스트 보존율 측정',
      'Y축: 전달율(0%~100% 또는 0.0~1.0), X축: 센서 중심(0mm)부터 대각선 모서리(약 21.6mm)까지의 거리',
      '10 lp/mm 곡선이 0.8(80%) 이상이면 고콘트라스트 렌즈, 30 lp/mm 곡선이 0.6(60%) 이상이면 고해상력 렌즈로 판정',
      'Sagittal(S)과 Meridional(M) 곡선 간의 이격이 작을수록 비점수차가 적고 주변부 묘사력이 뛰어남'
    ],
    formula: '\\text{MTF}(f) = \\frac{C_{\\text{image}}(f)}{C_{\\text{object}}(f)} = \\frac{(I_{\\max}-I_{\\min})/(I_{\\max}+I_{\\min})}{(O_{\\max}-O_{\\min})/(O_{\\max}+O_{\\min})}',
    formulaDescription: '상(Image)의 콘트라스트와 원본 물체(Object) 콘트라스트의 주파수 $f$에 대한 비입니다.',
    appliedCameras: ['모든 교환식 렌즈 평가 (Sony GM, Canon RF L, Nikon S-Line, Sigma Art, Zeiss Otus)'],
    keyAdvantages: [
      '렌즈 구매 및 설계 시 렌즈의 해상력과 콘트라스트를 정밀 계측 가능',
      '주변부 화질 저하율과 비점수차 특성을 미리 파악하여 풍경/인물 렌즈 용도 분류 용이'
    ],
    limitationsOrTradeoffs: [
      '기하광학적 이론치(Geometrical MTF)와 실제 회절 및 가공 오차를 반영한 회절 MTF(Diffraction MTF) 간의 차이 인지 필요'
    ]
  },
  {
    id: 'apodization-filter',
    nameKr: '아포다이제이션 필터 (APD / STF)',
    nameEn: 'Apodization (APD) Filter / Smooth Trans Focus (STF)',
    category: 'lens-mechanics',
    difficulty: '전문 (Expert)',
    shortDesc: '렌즈 중심부는 투명하고 주변부로 갈수록 농도가 짙어지는 광학 ND 필터를 배치해 완벽하게 부드러운 원형 보케를 만드는 기술.',
    fullExplanation: '일반적인 렌즈는 착란원의 경계면이 또렷하고 밝게 맺히는 구면수차 특성으로 인해 배경 흐림(보케)의 테두리가 딱딱해지거나(Nisen-bokeh, 이중 보케) 지저분해지기 쉽습니다. APD 필터(소니의 STF, 후지필름의 APD, 캐논의 DS-Defocus Smoothing)는 렌즈 내부에 원형 그라데이션 광학 필터를 삽입하여 빛의 전달율을 바깥쪽으로 갈수록 매끄럽게 감쇄시킵니다. 그 결과 점광원 보케의 경계가 솜사탕처럼 부드럽게 페이드아웃되는 궁극의 인물 묘사력을 제공합니다.',
    keyMechanism: [
      '광학계 조리개 부근에 동심원형 광학 농도 필터(Radial Neutral Density Filter) 배치',
      '착란원의 엣지(Edge) 투과 강도를 가우시안 프로파일(Gaussian curve)로 변환',
      '초점이 맞은 주피사체는 극도로 선명한 샤프니스를 유지하면서 전경/배경 보케만 부드럽게 융합'
    ],
    formula: 'T(r) = \\exp\\left( -\\frac{r^2}{2\\sigma^2} \\right)',
    formulaDescription: '반경 $r$에 따른 빛 투과율 $T$가 가우시안 곡선을 따라 점진적으로 감쇄합니다.',
    appliedCameras: ['Sony FE 100mm F2.8 STF GM OSS', 'Fujifilm XF 56mm F1.2 R APD', 'Canon RF 85mm F1.2 L USM DS'],
    keyAdvantages: [
      '나뭇가지나 복잡한 배경에서도 2선 보케 없이 녹아내리는 극상의 배경 흐림',
      '인물 윤곽선과 보케 간의 분리감 및 입체감 극대화'
    ],
    limitationsOrTradeoffs: [
      '주변부 감광 필터로 인해 실효 빛 투과량(T-Stop)이 F값 대비 1~1.5스톱 손실 (예: F2.8 구경이나 실효 밝기는 T5.6)',
      '위상차 AF 센서로 들어가는 빛의 각도 제한으로 일부 기종에서 콘트라스트 AF로 제한'
    ]
  },
  {
    id: 'vcm-linear-motor',
    nameKr: '리니어 초음파 & 보이스 코일 모터 (VCM / XD Linear)',
    nameEn: 'Voice Coil Motor (VCM) & Extreme Dynamic (XD) Linear Motor',
    category: 'lens-mechanics',
    difficulty: '심화 (Advanced)',
    shortDesc: '기어 연결 없이 전자기적 자기부상력으로 무거운 대구경 포커스 렌즈군을 직접 직진 구동하는 비접촉 무소음 초고속 모터.',
    fullExplanation: '과거 회전 운동을 기어와 헬리코이드 링을 통해 직선 운동으로 바꾸던 스크류/스테핑 모터(STM)나 링타입 USM은 기계적 마찰, 유격(Backlash), 구동 소음 및 반응 지연이 존재했습니다. 리니어 모터(VCM, 소니 XD Linear, 탐론 VXD, 시그마 HLA)는 스피커의 보이스 코일 원리를 응용하여 네오디뮴 영구자석과 코일 사이의 로렌츠 힘($F = I \\cdot L \\times B$)으로 포커스 렌즈군을 자기력으로 공중에 띄워 직접 미끄러지듯 밀고 당깁니다. 마찰이 없어 0.01mm 단위 정밀 제어와 나노초 단위 순간 가감속이 가능합니다.',
    keyMechanism: [
      '로렌츠 전자기력($F = B \\cdot I \\cdot L$)에 의한 비접촉 다이렉트 직진 구동',
      '기어와 감속기가 전혀 없어 백래시(Backlash) 및 마모 제로',
      '포커스 트래킹 120fps 초고속 연사 추종 및 동영상 촬영 시 완전 무소음 AF 구현'
    ],
    formula: 'F = m \\cdot a = B \\cdot I \\cdot L \\implies a = \\frac{B I L}{m}',
    formulaDescription: '강력한 자속밀도 $B$와 전류 $I$를 제어하여 무거운 대구경 렌즈군($m$)에 극도의 가속도 $a$를 인가합니다.',
    appliedCameras: ['Sony G Master 렌즈군 (XD Linear)', 'Tamron VXD (Voice-coil eXtreme-torque Drive)', 'Sigma HLA (High-response Linear Actuator)', 'Canon Nano USM'],
    keyAdvantages: [
      '초점 이동 반응 속도 최대 5배 이상 가속화 (동물 눈동자, 고속 스포츠 즉각 락온)',
      '동영상 녹음 시 마이크에 유입되는 모터 기계 구동음 100% 제거',
      '미세 떨림 없이 부드러운 랙 포커스(Rack Focus) 트랜지션'
    ],
    limitationsOrTradeoffs: [
      '전원 차단 시 렌즈 내부 포커스군이 고정되지 않고 덜컹거리는 현상 발생 가능',
      '순간 구동 시 고전류 소모에 따른 렌즈 소비 전력 증가'
    ]
  },
  {
    id: 'focus-breathing',
    nameKr: '포커스 브리딩 및 전자 보정',
    nameEn: 'Focus Breathing & Breathing Compensation',
    category: 'lens-mechanics',
    difficulty: '기초 (Fundamental)',
    shortDesc: '초점을 근거리에서 원거리로 변경할 때 화각(화면 크기)이 마치 줌 렌즈처럼 팽창·수축하는 현상과 이를 잡는 보정 기술.',
    fullExplanation: '렌즈 내부의 초점군이 이동하면서 렌즈의 유효 초점 거리(Focal Length)가 미세하게 변화하여 화면 테두리의 화각이 들숨·날숨처럼 흔들리는 현상을 포커스 브리딩이라 합니다. 사진에서는 문제되지 않으나, 영화나 영상 촬영에서 피사체 간 초점을 옮길 때(Rack Focus) 관객의 몰입을 심각하게 방해합니다. 시네마 렌즈는 기계적 플로팅 엘리먼트 설계로 이를 억제하며, 최신 미러리스 카메라는 렌즈 통신 데이터와 실시간 센서 크롭/스케일링 ISP 알고리즘을 결합하여 브리딩을 100% 무효화하는 전자 보정을 지원합니다.',
    keyMechanism: [
      '광학적 원인: 내부 포커스 렌즈 이동에 따른 주점 위치 변화 및 결상 배율($m$) 변동',
      '광학 보정: 리어 포커스 및 보정 렌즈군을 반대 방향으로 연동시키는 이중 헬리코이드 메커니즘',
      '전자 보정(Breathing Compensation): 초점 거리별 렌즈 화각 변화 프로파일을 읽어와 프레임을 미세 크롭 및 보간 처리'
    ],
    formula: '\\text{Breathing (\\%)} = \\frac{\\text{FOV}_{\\text{infinity}} - \\text{FOV}_{\\text{MOD}}}{\\text{FOV}_{\\text{infinity}}} \\times 100',
    formulaDescription: '무한대 초점에서의 화각과 최단 촬영 거리(MOD)에서의 화각 차이를 백분율로 산출합니다.',
    appliedCameras: ['Sony α7 IV / α7R V / FX3 (Breathing Comp 지원)', 'Panasonic Lumix S5 II / GH7 (인카메라 억제)', 'Canon EOS R5 Mark II'],
    keyAdvantages: [
      '영상 촬영 시 시네마 렌즈 수준의 안정적인 화면 구도 및 프로급 트랜지션 실현',
      '일반 스틸용 렌즈로도 브리딩 없는 고품질 비디오 프로덕션 가능'
    ],
    limitationsOrTradeoffs: [
      '전자 보정 적용 시 최대 화각이 5~10% 미세하게 크롭됨',
      '초점 변동 시 인카메라 화상 리스케일링 처리에 따른 약간의 처리 지연 발생 가능'
    ]
  },
  {
    id: 'five-axis-ibis-sync',
    nameKr: '5축 센서 시프트 IBIS & Sync IS',
    nameEn: '5-Axis In-Body Image Stabilization & Collaborative Sync IS',
    category: 'computational-ai',
    difficulty: '심화 (Advanced)',
    shortDesc: '센서를 자력으로 공중에 띄워 5개 회전축 및 병진축을 보정하고, 렌즈 OIS와 협력 제어하여 최대 8.5스톱을 보정하는 시스템.',
    fullExplanation: '카메라 본체 내부의 센서 유닛을 초고정밀 자이로 센서 및 홀(Hall) 소자와 자기 액추에이터를 통해 피치(Pitch), 요(Yaw), 롤(Roll)의 3축 회전 흔들림과 X, Y축 매크로 시프트 흔들림의 5개 자유도를 역방향으로 이동시켜 상의 떨림을 상쇄합니다. 특히 망원 영역에서는 각도 흔들림(Pitch/Yaw)을 렌즈 광학식 보정계(OIS)가 분담하고 센서가 롤(Roll)과 시프트를 보정하는 Sync IS(캐논 Coordinated IS, 파나소닉 Dual I.S. 2)를 통해 삼각대 없이도 수 초 단위의 핸드헬드 장노출을 가능하게 합니다.',
    keyMechanism: [
      '초당 수천 회 샘플링하는 고정밀 각속도 자이로 센서와 가속도계 장착',
      '보정 축: Pitch(상하 틸트), Yaw(좌우 팬), Roll(회전 롤링), X-Shift(수평 병진), Y-Shift(수직 병진)',
      '렌즈 OIS 유닛과 센서 IBIS 유닛 간의 초고속 시리얼 버스 실시간 협조 연산',
      '최대 8.5스톱(CIPA 표준)의 초경이적 셔터 속도 보정 마진 확보'
    ],
    formula: '\\theta_{\\text{sensor}} = - \\theta_{\\text{shake}}, \\quad \\Delta x_{\\text{sensor}} = - f \\cdot \\tan(\\theta_{\\text{yaw}})',
    formulaDescription: '외부 흔들림 각도와 이동량을 역위상으로 센서 모듈에 즉시 인가합니다.',
    appliedCameras: ['Canon EOS R5 II (최대 8.5스톱)', 'Sony α7R V / α9 III (8.0스톱)', 'Panasonic Lumix GH7 / G9 II (Dual I.S. 2 7.5스톱)', 'OM SYSTEM OM-1 II (Sync IS 8.5스톱)'],
    keyAdvantages: [
      '광학 손떨림 보정이 없는 수동 빈티지 렌즈에서도 강력한 5축 안정화 제공',
      '핸드헬드 야경 스냅 및 동영상 짐벌 없이도 부드러운 핸드헬드 패닝 워크플로우 실현'
    ],
    limitationsOrTradeoffs: [
      '센서 모듈 냉각 방열판과의 접촉 면적 제약으로 인한 장시간 고해상도 녹화 시 발열 누적',
      '광각 렌즈 모서리 주변부에서 젤로 현상 같은 왜곡 워핑(Edge Warping) 가능성'
    ]
  },
  {
    id: 'pixel-shift-resolution',
    nameKr: '픽셀 시프트 멀티 샷',
    nameEn: 'Pixel Shift Multi-Shot Resolution',
    category: 'computational-ai',
    difficulty: '심화 (Advanced)',
    shortDesc: 'IBIS 기구를 이용해 센서를 0.5~1픽셀 단위로 미세 이동하며 다중 촬영 후 합성해 위색과 모아레를 제거하고 극초고해상도를 생성.',
    fullExplanation: '일반적인 베이어 센서는 1개 화소가 R, G, B 중 하나의 색상 정보만 수집하므로 주변 화소의 값을 보간하는 디모자이킹(Demosaicing)을 거치며 해상도 손실과 위색(False Color), 모아레(Moiré)가 발생합니다. 픽셀 시프트 4-Shot은 센서를 정확히 1화소씩 상하좌우로 이동하여 모든 위치에서 R, G, B 순수 파장을 100% 측정하여 완벽한 풀컬러 충실도를 달성합니다. 16-Shot 모드는 0.5화소 서브픽셀 단위로 이동하여 기존 6천만 화소를 2억 4천만 화소로 물리적 샘플링 한계를 4배 돌파합니다.',
    keyMechanism: [
      '압전 액추에이터 및 전자석으로 센서를 나노미터 정밀도로 1픽셀 / 0.5픽셀 스텝 이동',
      '4-Shot 모드: 디모자이킹 없는 화소당 순수 RGB 삼원색 완전 복원 (위색 0%)',
      '16-Shot 모드: 공간 주파수 샘플링 한계(Nyquist limit) 2배 확장으로 실효 해상도 4배 증대',
      '최신 인카메라/PC 소프트웨어에서 움직이는 물체를 자동 감지하여 아티팩트만 단일 컷으로 블렌딩'
    ],
    formula: 'f_{\\text{Nyquist, Subpixel}} = 2 \\times f_{\\text{Nyquist, Single}} = \\frac{1}{\\text{Pixel Pitch}}',
    formulaDescription: '0.5픽셀 시프트를 통해 나이퀴스트 샘플링 주파수 한계를 2배로 확장합니다.',
    appliedCameras: ['Sony α7R V (2억 4,080만 화소)', 'Fujifilm GFX100 II (4억 화소)', 'Panasonic Lumix S5 II / G9 II (핸드헬드 하이레조)', 'OM SYSTEM OM-1 II'],
    keyAdvantages: [
      '건축, 박물관 문화재 기록, 정밀 제품 촬영에서 중형 카메라를 압도하는 극상의 디테일',
      '인위적인 샤프닝 후처리 없이도 원단 직물이나 미세 패턴의 모아레 완전 제거'
    ],
    limitationsOrTradeoffs: [
      '삼각대 필수 (핸드헬드 모드 제외), 바람에 흔들리는 나뭇잎이나 파도 등 동체 아티팩트 발생 가능',
      '합성 후 RAW 파일 용량이 수백 MB에서 수 GB로 급증'
    ]
  },
  {
    id: 'live-nd-variable',
    nameKr: '전자식 가변 ND 및 라이브 ND',
    nameEn: 'Electronic Variable ND & Live ND',
    category: 'computational-ai',
    difficulty: '기초 (Fundamental)',
    shortDesc: '물리적 필터 장착 없이 액정 전압 제어나 다중 노출 디지털 합성을 통해 인카메라로 ND 필터 효과를 시뮬레이션하는 기능.',
    fullExplanation: '야외 밝은 대낮에 셔터 스피드를 1/48초로 유지해야 하는 영상 촬영이나, 폭포수의 비단결 궤적을 담으려는 장노출 풍경 사진에서는 렌즈 앞에 값비싼 광학 ND 필터를 탈부착해야 했습니다. 전자식 가변 ND(소니 FX6/FX30 등)는 센서 앞 액정 층에 인가하는 전압을 조절하여 1/4(ND4)에서 1/128(ND128)까지 농도를 무단 전자식으로 연속 제어합니다. 라이브 ND(OM SYSTEM 등)는 초고속 센서 판독으로 여러 장을 촬영하여 실시간 평균 합성(Averaging)함으로써 ND2부터 ND128까지의 모션 블러를 광학 필터 없이 구현합니다.',
    keyMechanism: [
      '하드웨어 액정 방식: 액정 분자의 배열 각도를 전압으로 제어하여 투과 광량 연속 감쇄',
      '소프트웨어 합성 방식: 1/1000초 고속 셔터 수십 장을 인카메라 버퍼에서 실시간 이동평균 합성',
      'EVF에서 블러 효과와 최종 노출 상태를 실시간 라이브뷰로 확인 가능'
    ],
    formula: '\\text{Exposure Multiplier} = 2^{\\Delta \\text{stops}} = \\text{ND Factor}',
    formulaDescription: 'ND64는 빛을 $1/64$ ($2^{-6}$, 6스톱)로 감쇄시켜 셔터 시간을 64배 연장합니다.',
    appliedCameras: ['Sony FX6 / FX9 / Cinema Line (하드웨어 전자식 가변 ND)', 'OM SYSTEM OM-1 II / OM-5 (Live ND 128 / Live GND)', 'Panasonic Lumix GH7'],
    keyAdvantages: [
      '고가의 대구경 광학 필터 구입 비용 및 필터 장착 시 화질 왜곡/색틀어짐 배제',
      '조리개 값을 고정한 채 급변하는 야외 채광 변화에 맞춰 노출을 매끄럽게 자동 추종'
    ],
    limitationsOrTradeoffs: [
      '소프트웨어 라이브 ND의 경우 광량이 지나치게 넘치면 개별 컷이 화이트홀로 클리핑되어 합성 실패 가능',
      '하드웨어 가변 ND는 센서 앞 광학 블록 두께 증가로 초박형 바디 설계에 제약'
    ]
  },
  {
    id: 'neural-npu-upscale',
    nameKr: '뉴럴 AI 엔진 및 딥러닝 디노이즈',
    nameEn: 'Neural AI Processing Unit & Deep Learning Denoising',
    category: 'computational-ai',
    difficulty: '전문 (Expert)',
    shortDesc: '딥러닝 전용 NPU를 카메라에 탑재하여 피사체 형태학적 인식, 노이즈와 텍스처의 지능형 분리, 인카메라 업스케일을 수행.',
    fullExplanation: '과거 전통적인 영상 처리는 수학적 바이큐빅 보간이나 엣지 감지 필터에 의존해 고감도 노이즈를 지우면 미세 텍스처(수염, 잔디, 직물)가 뭉개지는 딜레마가 있었습니다. 최신 미러리스 카메라는 딥러닝 NPU를 탑재하여 수백만 장의 고해상도 광학 훈련 데이터를 기반으로 인체 골격, 동물, 곤충, 차량, 항공기의 3차원 형태를 포즈 추정(Pose Estimation)하고, 고감도 RAW 데이터에서 무작위 포톤 노이즈 패턴만을 선택적으로 분리 소거합니다. 심지어 인카메라에서 4500만 화소 이미지를 1억 8000만 화소로 AI 초해상도(Super-Resolution) 변환합니다.',
    keyMechanism: [
      '초소형 저전력 NPU 코어가 ISP와 고속 PCIe 버스로 직접 연동',
      '인체 자세 추정(Deep Pose Estimation): 얼굴이 가려지거나 뒤돌아선 피사체의 머리/몸통 위치 즉각 예측',
      'CNN/Transformer 기반 디노이징 모델로 고주파 텍스처와 포톤 샷 노이즈 분리 복원',
      '인카메라 뉴럴 네트워크 가속으로 RAW에서 2배~4배 초해상도 JPEG 즉시 렌더링'
    ],
    formula: '\\hat{I} = \\arg\\min_I \\left( \\| I - Y \\|_2^2 + \\lambda \\mathcal{R}_{\\text{neural}}(I) \\right)',
    formulaDescription: '관측 이미지 $Y$로부터 사전 학습된 신경망 정규화기 $\\mathcal{R}$을 통해 깨끗한 원형 상 $\\hat{I}$를 복원합니다.',
    appliedCameras: ['Sony α7R V / α9 III (AI Processing Unit)', 'Canon EOS R5 Mark II / EOS R1 (딥러닝 인카메라 업스케일링 179MP & 뉴럴 디노이즈)', 'Nikon Z8 / Z9 (딥러닝 AF 인식)'],
    keyAdvantages: [
      '피사체가 장애물 뒤로 사라지거나 순간적으로 고개를 돌려도 초점 추적 절대 놓치지 않음',
      'ISO 12800 이상의 초고감도에서도 디테일 뭉개짐 없는 선명한 저조도 묘사',
      'PC 후처리 소프트웨어 없이 현장에서 바로 클라이언트에 전송 가능한 대형 인쇄용 초고화소 파일 생성'
    ],
    limitationsOrTradeoffs: [
      '연산 복잡도로 인해 인카메라 AI 업스케일 시 컷당 수 초의 처리 시간 소요',
      '학습 데이터에 없는 미지의 극단적 패턴에서 가상 텍스처(환각 아티팩트) 생성 가능성 미세 존재'
    ]
  },
  {
    id: 'log-gamma-curves',
    nameKr: '로그 감마 커브 & 3D LUT',
    nameEn: 'Logarithmic Gamma Profiles & 3D LUTs',
    category: 'cinema-dr',
    difficulty: '심화 (Advanced)',
    shortDesc: '인간의 시각 반응(대수적 감응)에 맞추어 센서의 광역 다이내믹 레인지를 10비트 데이터 공간에 균등 압축 기록하는 곡선.',
    fullExplanation: '선형(Linear) 센서 데이터는 광량이 2배 증가할 때마다 전하가 2배 생성되므로 데이터 비트의 절반 이상이 극히 밝은 하이라이트에 낭비되고 암부 계조는 극심하게 빈약해집니다. Log 감마 곡선(Sony S-Log3, Panasonic V-Log, Canon C-Log3, ARRI LogC4)은 센서의 물리적 14~16스톱 밝기 단계를 인간의 시각 인지 특성(베버-페히너 법칙)에 부합하는 대수(Log) 함수로 재배치합니다. 이를 통해 하이라이트가 하얗게 타버리거나 암부가 뭉개지는 것을 방지하며, 촬영 후 3D LUT(Look-Up Table)를 통해 원하는 영화적 컬러 그레이딩 룩을 정밀하게 구현합니다.',
    keyMechanism: [
      '센서의 광범위한 14+스톱 선형 밝기를 10-bit(0~1023 코드값) 정규화 범위 내에 균등 분배',
      'Cineon 필름 농도 특성을 모사하여 부드러운 하이라이트 롤오프(Highlight Roll-off) 제공',
      'REC.709 표준 디스플레이와 광색역(REC.2020) 간의 색 변환을 33x33x33 또는 65x65x65 3D 입체 격자 LUT로 매핑'
    ],
    formula: 'y = c \\cdot \\log_{10}(a \\cdot x + b) + d',
    formulaDescription: '입력 선형 광량 $x$에 대수 함수를 취하여 출력 디지털 코드 $y$로 압축합니다.',
    appliedCameras: ['Sony FX3 / FX6 / A7S III (S-Log3)', 'Panasonic GH7 / S5 IIX (V-Log)', 'Canon C70 / R5 C (C-Log2 / C-Log3)', 'ARRI ALEXA 35 (LogC4)'],
    keyAdvantages: [
      '카메라가 담아낼 수 있는 최대 다이내믹 레인지(15스톱+)를 단 1비트의 손실 없이 완벽 보존',
      '색보정(Color Grading) 시 하늘의 구름 디테일과 실내 어두운 그림자를 자유자재로 복원'
    ],
    limitationsOrTradeoffs: [
      '카메라 모니터에서 Log 원본은 채도가 빠지고 뿌옇게 보이므로 View Assist(LUT 프리뷰) 필수',
      '노출을 언더로 찍고 암부를 무리하게 올리면 S-Log 특유의 컬러 노이즈가 폭발하므로 정밀한 노출 측정 필요'
    ]
  },
  {
    id: 'chroma-subsampling-quantization',
    nameKr: '10비트 및 4:2:2 크로마 서브샘플링',
    nameEn: '10-bit Depth & 4:2:2 Chroma Subsampling',
    category: 'cinema-dr',
    difficulty: '기초 (Fundamental)',
    shortDesc: '인간의 눈이 밝기 변화에 비해 색상 변화에 둔감한 점을 이용해 데이터 대역폭을 절약하면서도 10억 색 계조를 표현하는 기술.',
    fullExplanation: '8비트 영상은 색상 채널(R, G, B)당 256단계(총 1,677만 색)만 표현할 수 있어 하늘이나 그라데이션에서 색이 계단처럼 쪼개지는 밴딩(Color Banding) 현상이 발생합니다. 10비트는 채널당 1,024단계(총 10억 7천만 색)로 64배 더 정밀하여 Log 촬영 후 색보정을 강하게 가해도 밴딩이 전혀 생기지 않습니다. 또한 4:2:2 크로마 서브샘플링은 4:4:4 대비 색차 정보(Cb, Cr)를 수평 2픽셀마다 절반으로 압축하여 데이터 용량을 33% 절감하면서도 그린스크린 크로마키 합성이나 컬러 그레이딩 시 가장자리가 번지는 크로마 블리딩을 차단합니다.',
    keyMechanism: [
      '양자화(Quantization): 8-bit(256 레벨) vs 10-bit(1,024 레벨) vs 12-bit(4,096 레벨)',
      '4:4:4: 모든 픽셀마다 휘도(Y)와 두 개의 색차(Cb, Cr)를 1:1로 완전 보존',
      '4:2:2: 수평 2픽셀마다 색상 샘플을 공유 (Y: 4개 샘플당 Cb: 2개, Cr: 2개)',
      '4:2:0: 수평/수직 모두 2x2 블록당 단 1쌍의 색차 샘플만 보존 (인터넷 스트리밍 및 일반 소비자용 규격)'
    ],
    formula: '\\text{Levels} = 2^B, \\quad \\text{Bandwidth Ratio} = \\frac{Y + Cb + Cr}{4+4+4} \\quad (4:2:2 = \\frac{4+2+2}{12} = 66.7\\%)',
    formulaDescription: '비트 심도 $B$에 따른 계조 레벨 수와 크로마 포맷에 따른 비압축 대역폭 절감 비율입니다.',
    appliedCameras: ['Sony FX3 / A7S III (4:2:2 10-bit All-I)', 'Panasonic GH7 / S5 IIX', 'Canon R5 C / R6 Mark II', 'Nikon Z8 / Z6 III'],
    keyAdvantages: [
      '매끄러운 하늘 계조 렌더링 및 Log 프로파일 컬러 그레이딩 필수 전제 조건',
      'VFX 크로마키 합성 시 피사체 머리카락 경계선의 색 번짐 없는 정밀 키잉(Keying)'
    ],
    limitationsOrTradeoffs: [
      '8비트 파일 대비 데이터 처리 비트레이트가 2~3배 상승하여 고속 SD V60/V90 또는 CFexpress 카드 요구',
      '구형 PC 환경에서 10-bit 4:2:2 하드웨어 디코딩 가속 미지원 시 타임라인 재생 버벅임 발생'
    ]
  },
  {
    id: 'alli-vs-longgop',
    nameKr: 'ALL-Intra vs Long GOP 압축',
    nameEn: 'ALL-Intra (All-I) vs Long GOP Compression',
    category: 'cinema-dr',
    difficulty: '기초 (Fundamental)',
    shortDesc: '모든 프레임을 독립된 단일 사진으로 압축(ALL-I)할지, 프레임 간의 움직임 변화량만 추적해 높은 압축률을 얻을지(Long GOP)의 방식.',
    fullExplanation: 'ALL-Intra(All-I)는 영상의 매 1프레임마다 온전한 정지 화상(I-프레임)으로 개별 압축합니다. 프레임 간의 의존성이 없어 영상 편집 시 타임라인을 앞뒤로 고속 스크러빙하거나 프레임 바이 프레임으로 정밀 커팅할 때 CPU 부하가 전혀 없어 매우 쾌적합니다. 반면 Long GOP(IPB 구조)는 첫 프레임(I)만 온전하게 기록하고 이후 수십 프레임은 이전 프레임과의 예측 차이(P-프레임) 및 양방향 차이(B-프레임)만 기록합니다. Long GOP는 압축 효율이 압도적으로 뛰어나 파일 용량이 작지만 편집 시 압축을 푸는 연산 부하가 큽니다.',
    keyMechanism: [
      'ALL-I: I-Frame만으로 구성. 데이터 레이트 높음(200~800Mbps), 편집 친화적',
      'Long GOP: Group of Pictures 구조. I-Frame, P-Frame, B-Frame 순환 구성',
      '모션 벡터(Motion Vector) 예측을 통해 정지된 배경 데이터 중복을 제거하여 용량 극소화',
      '고속 패닝이나 복잡한 물결, 불꽃 등 화면 전체가 격변하는 씬에서는 ALL-I가 압축 노이즈(매크로블록) 방어에 유리'
    ],
    formula: '\\text{Bitrate}_{\\text{ALL-I}} \\approx 3 \\sim 5 \\times \\text{Bitrate}_{\\text{Long GOP}}',
    formulaDescription: '동일 화질 기준 ALL-I가 3~5배 높은 비트레이트를 요구하나 편집 재생 퍼포먼스가 월등합니다.',
    appliedCameras: ['Sony A7S III / FX3 (XAVC S-I 4K)', 'Panasonic GH7 / S5 IIX (ALL-Intra 800Mbps)', 'Canon EOS R5 C (All-I)'],
    keyAdvantages: [
      'ALL-I: 4K/60p 10-bit 멀티캠 편집 시에도 버벅임 없는 즉각적인 실시간 재생 및 컷편집',
      'Long GOP: 장시간 다큐멘터리, 웨딩 본식 등 대용량 장시간 녹화 시 메모리 카드 절약'
    ],
    limitationsOrTradeoffs: [
      'ALL-I 선택 시 128GB 메모리 카드가 20~30분 만에 가득 찰 수 있어 고용량 CFexpress/외장 SSD 필수'
    ]
  },
  {
    id: 'cinema-raw-codecs',
    nameKr: '시네마 RAW 비디오 (ProRes RAW / BRAW / N-RAW)',
    nameEn: 'Cinema RAW Video Codecs',
    category: 'cinema-dr',
    difficulty: '전문 (Expert)',
    shortDesc: '센서에서 판독된 컬러 원시 데이터를 디모자이킹 없이 무압축 또는 부분 압축 상태로 그대로 레코딩하는 최고봉 포맷.',
    fullExplanation: '일반 비디오는 카메라 내부 ISP에서 디모자이킹, 화이트 밸런스, 픽처 프로파일, 샤프닝, 노이즈 리덕션을 모두 거쳐 비가역적(압축 손실)으로 구워진 채 저장됩니다. 시네마 RAW는 센서 픽셀 하나하나가 받아들인 원시 광전하 값 그대로를 파일로 저장합니다. 따라서 촬영이 끝난 후 편집실 소프트웨어(다빈치 리졸브, 파이널 컷 등)에서 화이트 밸런스(켈빈도), 틴트, ISO 노출, 디모자이킹 알고리즘을 촬영 순간과 물리적으로 완전히 동일한 품질로 재지정할 수 있는 궁극의 자유도를 제공합니다.',
    keyMechanism: [
      'Bayer 패턴 원시 데이터 그대로 보존 (인카메라 디모자이킹 프로세스 생략)',
      '12-bit 선형/로그 공간 양자화로 무려 687억 가지의 색상 스펙트럼 수록',
      'Apple ProRes RAW: GPU 하드웨어 가속 최적화 RAW',
      'Blackmagic RAW (BRAW): 부분 디모자이킹을 센서 단에서 분담하여 극강의 CPU 효율과 파라미터 제어 동시 달성',
      'Nikon N-RAW: 8.3K 60p 초고해상도를 콤팩트한 12-bit 파일로 인카메라 내부 녹화'
    ],
    formula: '\\text{Data Rate} = W \\times H \\times \\text{fps} \\times \\text{BitDepth} \\times \\frac{1}{\\text{Compression Ratio}}',
    formulaDescription: '예: 8K(7680x4320) × 60fps × 12bit = 초당 약 23.8Gbps(비압축) → N-RAW 압축 시 약 2.6Gbps로 저장',
    appliedCameras: ['Nikon Z9 / Z8 (인카메라 8.3K N-RAW / ProRes RAW)', 'Panasonic GH7 (인카메라 5.7K ProRes RAW)', 'Blackmagic Cinema Camera 6K (BRAW)', 'Sony FX3 + Ninja V (ProRes RAW HDMI 출력)'],
    keyAdvantages: [
      '촬영 시 화이트 밸런스나 노출에 실수가 있어도 원본 손상 없이 100% 무손실 완벽 보정',
      '12-bit 컬러 계조로 극한의 하이라이트 및 섀도우 복원력'
    ],
    limitationsOrTradeoffs: [
      '초고속 CFexpress Type B 카드 필수 및 테라바이트(TB) 단위의 방대한 스토리지 인프라 요구',
      '전용 색보정 워크플로우(Color Management)에 대한 전문 지식 필수'
    ]
  },
  {
    id: 'full-well-capacity',
    nameKr: '포화 전하 용량 (FWC)',
    nameEn: 'Full Well Capacity (FWC)',
    category: 'optics-exposure',
    difficulty: '전문 (Expert)',
    shortDesc: '단일 화소의 포토다이오드가 클리핑(포화)되기 전까지 최대로 저장할 수 있는 광전자(Electron)의 총량 한계치.',
    fullExplanation: '포토다이오드는 빛을 받아 광전 효과로 전자를 생성하는 미세한 물통에 비유할 수 있습니다. 물통이 가득 차면 더 이상 물을 담지 못하고 넘쳐흐르듯(블루밍), 포토다이오드가 최대로 담을 수 있는 전자의 한계 수를 Full Well Capacity(FWC)라 합니다. 픽셀 물리 면적이 넓을수록 FWC가 비례하여 커집니다. FWC가 클수록 강한 빛에도 하이라이트가 하얗게 타지 않고 버틸 수 있으며, 최대 신호대 잡음비($\\text{SNR}_{\\max}$)와 기본 다이내믹 레인지(DR)가 비약적으로 높아집니다.',
    keyMechanism: [
      '포토다이오드 고갈 영역(Depletion region)의 체적과 커패시턴스에 비례',
      '픽셀 피치가 클수록(예: 소니 A7S III 8.4μm 화소 vs A7R V 3.76μm 화소) FWC가 급격히 증가',
      '전하가 가득 차면 아날로그 전압이 최대 포화치에 도달하여 ADC 상한값(100% 흰색)으로 클리핑'
    ],
    formula: '\\text{DR} = 20 \\log_{10}\\left(\\frac{\\text{FWC}}{\\sigma_{\\text{read}}}\\right), \\quad \\text{SNR}_{\\max} = 20 \\log_{10}(\\sqrt{\\text{FWC}})',
    formulaDescription: '다이내믹 레인지는 FWC를 리드 노이즈로 나눈 비율의 데시벨(dB) 값입니다.',
    appliedCameras: ['Sony α7S III (초대형 8.4μm 화소, 거대 FWC)', 'Phase One / Hasselblad 중형 디지털 백', 'Leica M11 (트리플 레졸루션 픽셀 비닝)'],
    keyAdvantages: [
      '풍부한 하이라이트 디테일과 부드러운 화이트 롤오프',
      '풍경 및 역광 인물 촬영에서 광역 다이내믹 레인지 보장'
    ],
    limitationsOrTradeoffs: [
      '고화소 미세 피치 센서일수록 FWC가 작아져 하이라이트 클리핑이 상대적으로 일찍 발생'
    ]
  },
  {
    id: 'photon-shot-noise',
    nameKr: '광자 샷 노이즈 & 푸아송 분포',
    nameEn: 'Photon Shot Noise & Poisson Statistics',
    category: 'optics-exposure',
    difficulty: '전문 (Expert)',
    shortDesc: '빛 자체의 양자화 입자성(Photon)으로 인해 발생하는 불가항력적인 자연 물리 법칙 노이즈.',
    fullExplanation: '카메라 센서나 회로가 100% 이상적인 무결점 완벽체라 할지라도 노이즈는 결코 0이 될 수 없습니다. 빛은 일정한 연속체가 아니라 광자(Photon)라는 개별 에너지 알갱이들의 이산적 흐름이기 때문입니다. 일정한 광원 아래에서도 매 단위 시간당 센서에 도달하는 광자의 개수는 통계적 흔들림(푸아송 분포, Poisson Distribution)을 따릅니다. 평균 $S$개의 광자가 도달할 때 그 변동 표준편차는 정확히 $\\sqrt{S}$가 됩니다. 즉, 빛을 많이 모을수록(신호 $S$가 커질수록) 샷 노이즈의 절대량은 늘어나지만, 신호 대비 노이즈의 비율인 $\\text{SNR} = S / \\sqrt{S} = \\sqrt{S}$는 비약적으로 개선됩니다.',
    keyMechanism: [
      '광자의 도착 확률은 독립 사건이며 시간당 푸아송 확률 질량 함수를 따름',
      '신호 크기 $S$에 대해 노이즈 크기는 $\\sqrt{S}$',
      '신호가 100 e-일 때 노이즈 10 e- (SNR = 10, 20dB)',
      '신호가 10,000 e-일 때 노이즈 100 e- (SNR = 100, 40dB)'
    ],
    formula: 'N_{\\text{shot}} = \\sqrt{S}, \\quad \\text{SNR}_{\\text{shot}} = \\frac{S}{\\sqrt{S}} = \\sqrt{S} = 10 \\log_{10}(S) \\text{ dB}',
    formulaDescription: '광자 샷 노이즈는 광자 수의 제곱근이며, SNR은 모인 광자 수에 직접 비례합니다.',
    appliedCameras: ['우주 및 모든 이미징 센서의 근원적 물리 법칙'],
    keyAdvantages: [
      '빛을 많이 모을 수 있는 대구경 렌즈(F1.2~F1.4) 및 긴 셔터 스피드의 물리적 당위성 제공'
    ],
    limitationsOrTradeoffs: [
      '어떠한 반도체 공정 혁신으로도 소멸시킬 수 없는 양자역학적 우주 물리 한계'
    ]
  },
  {
    id: 'aspherical-lens-xa',
    nameKr: '초정밀 비구면 렌즈 (XA Lens)',
    nameEn: 'Extreme Aspherical (XA) Lens Element',
    category: 'lens-mechanics',
    difficulty: '심화 (Advanced)',
    shortDesc: '완전한 구면이 아닌 복합 곡면으로 구면수차와 왜곡을 제거하고, 0.01마이크론 초정밀 연마로 양파링 보케를 억제한 렌즈.',
    fullExplanation: '기존의 구면 렌즈는 렌즈의 중심을 통과하는 빛과 주변부를 통과하는 빛의 굴절 각도가 일치하지 않아 상이 한 점에 맺히지 못하는 구면수차(Spherical Aberration)가 발생합니다. 비구면(Aspherical) 렌즈는 가장자리의 곡률을 점진적으로 완만하게 설계하여 구면수차를 1장의 렌즈로 상쇄합니다. 그러나 금형 가공 시 남는 미세한 동심원 절삭 흔적 때문에 원형 보케 내부에 나이테 같은 줄무늬(양파링 보케, Onion-ring bokeh)가 남았습니다. 소니 XA 렌즈 등 최신 기술은 표면 거칠기를 0.01μm(10나노미터) 이하로 초정밀 연마하여 초고선예도와 양파링 없는 청아한 보케를 동시 완성합니다.',
    keyMechanism: [
      '다항식 곡면 방정식 $z(r) = \\frac{c r^2}{1 + \\sqrt{1 - (1+k) c^2 r^2}} + \\sum A_i r^i$ 채택',
      '복수의 구면 렌즈를 단 1장의 비구면 렌즈로 대체하여 렌즈 구경과 무게를 획기적으로 경량화',
      '초정밀 유리 몰드 성형(Glass Molding) 기술로 원자 단위 표면 균일도 유지'
    ],
    formula: '\\text{Surface Roughness} < 0.01 \\,\\mu m \\implies \\text{No Onion-ring interference pattern}',
    formulaDescription: '가시광선 파장(0.4~0.7μm)보다 훨씬 작은 나노미터 단위 연마로 빛의 간섭 패턴을 제거합니다.',
    appliedCameras: ['Sony G Master 렌즈군 (XA 렌즈)', 'Canon RF L 렌즈군 (연삭 비구면)', 'Nikon NIKKOR Z S-Line'],
    keyAdvantages: [
      '조리개 최대 개방(F1.2, F1.4)에서도 중앙부터 극주변부까지 칼같은 면도날 선예도',
      '야경 점광원 보케 내부가 티끌 없이 맑고 투명하게 표현됨',
      '렌즈 구성 매수 축소로 소형 경량화 달성'
    ],
    limitationsOrTradeoffs: [
      '초정밀 금형 제작 및 렌즈 성형 단가가 극도로 높아 프리미엄 렌즈에만 제한적 적용'
    ]
  },
  {
    id: 'bayer-vs-quad-bayer-nonacell',
    nameKr: '베이어 vs 쿼드 베이어 vs 노나셀',
    nameEn: 'Bayer vs Quad Bayer vs Nonacell Array',
    category: 'sensor-architecture',
    difficulty: '기초 (Fundamental)',
    shortDesc: '단일 RGGB 배열에서 4개 픽셀(Tetracell), 9개 픽셀(Nonacell)을 동일 색상으로 묶어 비닝과 고해상도를 오가는 배열 기술.',
    fullExplanation: '전통적인 베이어(Bayer) 배열은 2x2 그리드에 R 1개, G 2개, B 1개를 교차 배치하여 디모자이킹으로 색을 보간합니다. 쿼드 베이어(Quad Bayer / Sony Quad Quad)는 동일한 색상 필터를 2x2(4픽셀) 단위로 묶고, 노나셀(Nonacell)은 3x3(9픽셀) 단위로 묶습니다. 대낮의 밝은 환경에서는 리모자이크(Remosaic) 알고리즘을 통해 수억 화소의 초고해상도 사진을 출력하고, 어두운 저조도 환경에서는 인접한 4개 또는 9개의 픽셀을 하나의 거대한 가상 픽셀로 비닝(Pixel Binning) 합산하여 노이즈 없는 고감도 사진을 출력합니다.',
    keyMechanism: [
      '기존 베이어: RGGB가 1화소 단위로 엇갈려 배치 (고해상도 디모자이킹 최적화)',
      '쿼드 베이어(4-in-1): 4개 화소가 같은 색상 필터 공유 (고화소 모드와 4배 면적 저노이즈 모드 스위칭)',
      '노나셀(9-in-1): 9개 화소가 같은 색상 필터 공유 (예: 2억 화소 0.6μm 픽셀 → 2,200만 화소 1.8μm 픽셀로 변환)',
      '스마트 ISO 프로(Smart-ISO Pro): 인접 화소 간 서로 다른 노출 시간 적용으로 원샷 하드웨어 HDR 구현'
    ],
    formula: '\\text{Pixel Binning SNR} \\propto \\sqrt{N_{\\text{combined}}} \\quad (4\\text{-in-}1: 2\\times, \\, 9\\text{-in-}1: 3\\times)',
    formulaDescription: '화소를 합산 비닝할 때 신호는 $N$배, 샷 노이즈는 $\\sqrt{N}$배 증가하여 순수 SNR이 $\\sqrt{N}$배 향상됩니다.',
    appliedCameras: ['스마트폰 플래그십 (Samsung Galaxy S Ultra 2억화소, Xiaomi Ultra 1인치 센서)', '일부 중형 센서 및 시네마 센서'],
    keyAdvantages: [
      '단일 센서로 극한의 해상도(주간)와 극한의 저조도 감도(야간)를 양립',
      '하드웨어 엇갈림 노출(Staggered HDR)로 고스트 없는 실시간 HDR 비디오'
    ],
    limitationsOrTradeoffs: [
      '리모자이크(Remosaic) 처리 시 네이티브 베이어 센서 대비 해상력 복원율이 70~80% 수준으로 다소 저하',
      '색상 경계면에서 인공적인 윤곽선 아티팩트 발생 가능'
    ]
  },
  {
    id: 'fuji-xtrans-sensor',
    nameKr: '후지필름 X-Trans CMOS 센서',
    nameEn: 'Fujifilm X-Trans CMOS Color Filter Array',
    category: 'sensor-architecture',
    difficulty: '심화 (Advanced)',
    shortDesc: '필름의 은염 입자 무작위 배열에서 착안하여 6x6 주기의 비주기적 컬러 필터를 적용해 광학 로우패스 필터를 배제한 센서.',
    fullExplanation: '일반적인 2x2 베이어 배열은 수평·수직 방향으로 규칙적인 격자 패턴을 이루어 직물이나 창문 블라인드 등 격자 주파수와 간섭을 일으켜 모아레(Moiré)와 위색을 쉽게 발생시킵니다. 이를 막기 위해 센서 앞에 해상력을 깎아먹는 광학 로우패스 필터(OLPF)를 덧대야 했습니다. 후지필름의 X-Trans 센서는 6x6 단위의 불규칙한 매트릭스를 채택하여 모든 가로/세로 픽셀 라인에 R, G, B 삼원색이 반드시 포함되도록 설계했습니다. 따라서 로우패스 필터가 전혀 없어도 모아레가 발생하지 않으며, 센서가 가진 100% 본연의 렌즈 해상력을 완전히 뿜어냅니다.',
    keyMechanism: [
      '6x6 비정형 컬러 필터 배열 구조 채택',
      '모든 수평/수직 라인에 적, 녹, 청 삼원색 화소가 최소 1개 이상 존재하여 색 보간 정밀도 향상',
      '광학 저역 통과 필터(Optical Low-Pass Filter, OLPF)의 물리적 제거로 해상력 극대화',
      '아날로그 필름 그레인(Film Grain)과 유사한 자연스러운 노이즈 텍스처 재현'
    ],
    formula: '\\text{Periodicity} = 6 \\times 6 \\quad (\\text{vs Bayer } 2 \\times 2)',
    formulaDescription: '주기성이 3배 길고 복잡하여 고주파 격자 패턴과의 공간적 공진(모아레 간섭)이 소멸합니다.',
    appliedCameras: ['Fujifilm X-T5', 'Fujifilm X-H2S / X-H2', 'Fujifilm X100VI', 'Fujifilm X-Pro3'],
    keyAdvantages: [
      '동일 화소수의 베이어 센서 대비 눈으로 체감되는 샤프니스와 미세 질감 표현력 압도적 우위',
      '후지필름 전설의 클래식 크롬, 벨비아 등 필름 시뮬레이션의 근간 기술'
    ],
    limitationsOrTradeoffs: [
      '복잡한 6x6 배열로 인해 서드파티 RAW 현상 프로그램(라이트룸 등)에서 워터컬러(수채화) 디모자이킹 아티팩트 이슈 발생 가능',
      '센서 프로세서의 디모자이킹 계산 복잡도 증가'
    ]
  },
  {
    id: 'flange-focal-distance',
    nameKr: '플랜지 백 및 후초점 거리',
    nameEn: 'Flange Focal Distance (FFD) & Back Focus',
    category: 'lens-mechanics',
    difficulty: '기초 (Fundamental)',
    shortDesc: '카메라 렌즈 마운트 결합면에서부터 센서 촬상면까지의 물리적 법선 거리.',
    fullExplanation: '과거 DSLR 카메라는 센서와 렌즈 사이에 45도 반사 거울(미러 박스)이 위치해야 했기 때문에 플랜지 백(FFD)이 40~46mm 이상으로 길 수밖에 없었습니다. 미러리스 카메라는 미러 박스를 제거하면서 플랜지 백을 16~20mm 수준(소니 E: 18mm, 캐논 RF: 20mm, 니콘 Z: 16mm)으로 대폭 축소했습니다. 짧아진 플랜지 백 덕분에 렌즈의 최후단 렌즈알(후옥)을 센서 바로 코앞까지 밀착 배치할 수 있게 되어, 광선이 꺾이는 각도를 완만하게 만들어 주변부 왜곡과 수차를 극적으로 줄이고 대구경 고화질 렌즈의 소형화를 가능하게 했습니다.',
    keyMechanism: [
      '마운트 결합 금속 기준면으로부터 센서 표면까지의 기계적 공차 0.005mm 이내 정밀 거리',
      '짧은 플랜지 백 $\\to$ 렌즈 설계의 자유도 급증 및 대구경 마운트 직경과 결합하여 F1.2 렌즈 경량화 실현',
      '마운트 어댑터를 장착하여 과거 거의 모든 기종의 이종교배 수동 빈티지 렌즈 사용 가능'
    ],
    formula: '\\text{Adapter Thickness} = \\text{FFD}_{\\text{old}} - \\text{FFD}_{\\text{new}}',
    formulaDescription: '예: 캐논 EF(44mm) 렌즈를 소니 E(18mm)에 장착 시 어댑터 두께는 정확히 26mm가 되어야 무한대 초점이 맞습니다.',
    appliedCameras: ['Nikon Z 마운트 (16mm, 세계 최단 플랜지백 + 55mm 대구경)', 'Sony E 마운트 (18mm)', 'Canon RF 마운트 (20mm)', 'Leica L 마운트 (20mm)'],
    keyAdvantages: [
      '광각 렌즈에서 왜곡을 억제하는 레트로포커스(Retrofocus) 복합 구성 간소화로 고화질 경량화',
      '전 세계 모든 규격의 올드 렌즈를 어댑터 하나로 센서 손상 없이 호환'
    ],
    limitationsOrTradeoffs: [
      '센서 주변부로 입사하는 광선의 각도가 가팔라질 수 있어 센서 마이크로렌즈의 경사각 최적화(Offset Microlens) 설계 필수'
    ]
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  'all': '전체 보기',
  'optics-exposure': '광학 물리 & 노이즈',
  'sensor-architecture': '센서 반도체 공학',
  'autofocus': '오토포커스 (AF)',
  'cinema-dr': '시네마 & 다이내믹 레인지',
  'lens-mechanics': '렌즈 광학 & 기구',
  'computational-ai': '컴퓨테이셔널 이미징 & AI'
};
