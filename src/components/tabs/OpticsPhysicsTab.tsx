import React, { useState } from 'react';
import { CameraTerm } from '../../types/camera';
import { Eye, Calculator, Info, Zap, AlertCircle } from 'lucide-react';

interface OpticsPhysicsTabProps {
  onSelectTerm: (term: CameraTerm) => void;
  allTerms: CameraTerm[];
}

export const OpticsPhysicsTab: React.FC<OpticsPhysicsTabProps> = ({
  onSelectTerm,
  allTerms,
}) => {
  // Airy Disk Calculator State
  const [aperture, setAperture] = useState<number>(8.0);
  const [wavelength] = useState<number>(550); // 550nm green light
  const [pixelPitch, setPixelPitch] = useState<number>(3.76); // 3.76μm (e.g. Sony A7R V)

  // DOF Calculator State
  const [sensorCoC, setSensorCoC] = useState<number>(0.030); // 0.030mm for Full Frame
  const [focalLength, setFocalLength] = useState<number>(50); // 50mm
  const [dofAperture, setDofAperture] = useState<number>(2.8);
  const [subjectDist, setSubjectDist] = useState<number>(2.0); // 2 meters

  // Airy disk calculation: d = 2.44 * lambda * N
  // lambda in um: 550nm = 0.55um
  const airyDiameter = 2.44 * (wavelength / 1000) * aperture; // um
  const isDiffractionLimited = airyDiameter > pixelPitch;

  // Hyperfocal distance H = f^2 / (N * c) in mm, convert to meters
  const hyperfocalM = (focalLength * focalLength) / (dofAperture * sensorCoC * 1000);
  const subjectDistMm = subjectDist * 1000;
  
  // Near limit: Dn = (H * s) / (H + (s - f))
  const nearLimitMm = (hyperfocalM * 1000 * subjectDistMm) / (hyperfocalM * 1000 + (subjectDistMm - focalLength));
  // Far limit: Df = (H * s) / (H - (s - f))
  const farLimitMm = subjectDistMm >= (hyperfocalM * 1000) 
    ? Infinity 
    : (hyperfocalM * 1000 * subjectDistMm) / (hyperfocalM * 1000 - (subjectDistMm - focalLength));

  const nearLimitM = nearLimitMm / 1000;
  const farLimitM = farLimitMm === Infinity ? Infinity : farLimitMm / 1000;
  const totalDofM = farLimitMm === Infinity ? Infinity : farLimitM - nearLimitM;

  const findTerm = (id: string) => allTerms.find((t) => t.id === id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          광학 물리, 노출 및 센서 노이즈 메커니즘
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          빛이 렌즈 구경을 통과하여 피사계 심도(DOF)와 회절 한계(Airy Disk)를 형성하고, 셔터 메커니즘을 거쳐 양자역학적 노이즈(Photon Shot Noise, Read Noise, FWC)로 변환되는 엄밀한 물리 법칙과 계산기를 제공합니다.
        </p>
      </div>

      {/* Grid: 2 Simulators / Calculators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Calculator 1: Airy Disk & Diffraction Limited Aperture */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-amber-500" />
                에어리 디스크 직경 &amp; 회절 한계 조리개 (DLA) 계산기
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                수식: d = 2.44 × λ × F (녹색 파장 λ = 550nm 기준)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-400 font-medium block">
                조리개 값 (F-number): <span className="font-mono font-bold text-blue-600 dark:text-blue-400">F{aperture}</span>
              </label>
              <input
                type="range"
                min="1.2"
                max="22"
                step="0.2"
                value={aperture}
                onChange={(e) => setAperture(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>F1.2</span>
                <span>F4</span>
                <span>F8</span>
                <span>F16</span>
                <span>F22</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-400 font-medium block">
                센서 픽셀 피치 (Pixel Pitch): <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{pixelPitch} μm</span>
              </label>
              <select
                value={pixelPitch}
                onChange={(e) => setPixelPitch(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="3.76">3.76 μm (61MP 풀프레임 / A7R V)</option>
                <option value="4.35">4.35 μm (45MP 풀프레임 / R5 II, Z8)</option>
                <option value="5.94">5.94 μm (24MP 풀프레임 / A7 IV, Z6 III)</option>
                <option value="8.40">8.40 μm (12MP 풀프레임 / A7S III)</option>
                <option value="3.34">3.34 μm (M4/3 20MP / OM-1, GH7)</option>
              </select>
            </div>
          </div>

          {/* Results Box */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">에어리 디스크 직경 (d)</span>
                <p className="text-xl font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {airyDiameter.toFixed(2)} <span className="text-xs font-normal text-slate-500">μm</span>
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">회절 상태 (Diffraction Status)</span>
                <p className={`text-xs font-bold mt-1.5 flex items-center justify-center gap-1 ${
                  isDiffractionLimited ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {isDiffractionLimited ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>회절 한계 초과 (화질 저하)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>픽셀 분해능 범위 내 (선명)</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Visual Representation of Spot vs Pixel */}
            <div className="flex flex-col items-center justify-center pt-2">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">
                1개 픽셀 면적(녹색 사각형) 대비 에어리 디스크 회절 광점(주황 원) 크기 비율
              </span>
              <div className="w-36 h-36 bg-slate-200 dark:bg-slate-700/60 rounded-xl relative flex items-center justify-center border border-slate-300 dark:border-slate-600">
                {/* Pixel Square */}
                <div 
                  className="border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center"
                  style={{
                    width: `${Math.min(100, (pixelPitch / Math.max(pixelPitch, airyDiameter)) * 100)}px`,
                    height: `${Math.min(100, (pixelPitch / Math.max(pixelPitch, airyDiameter)) * 100)}px`,
                  }}
                >
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">1 Pixel</span>
                </div>
                {/* Airy Disk Circle */}
                <div
                  className="absolute rounded-full border-2 border-amber-500 bg-amber-500/20 pointer-events-none"
                  style={{
                    width: `${Math.min(120, (airyDiameter / Math.max(pixelPitch, airyDiameter)) * 100)}px`,
                    height: `${Math.min(120, (airyDiameter / Math.max(pixelPitch, airyDiameter)) * 100)}px`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong>광학 가이드:</strong> 조리개를 F11 이상으로 조이면 피사계 심도는 깊어지지만, 회절로 인해 빛이 1개 픽셀을 넘어 주변 4~9개 픽셀로 퍼져나가 미세 해상력이 흐려집니다. 풍경 촬영 시 F5.6~F8 스위트 스팟 권장.
          </div>
        </div>

        {/* Calculator 2: Depth of Field & Hyperfocal Distance */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                피사계 심도 (DOF) 및 과초점 거리 (Hyperfocal) 계산기
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                과초점 공식: H = f² / (N × c), 전방/후방 피사계 심도 정밀 연산
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium">센서 포맷 (허용 착란원 CoC)</label>
              <select
                value={sensorCoC}
                onChange={(e) => setSensorCoC(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="0.030">풀프레임 35mm (CoC 0.030mm)</option>
                <option value="0.020">APS-C 크롭 (CoC 0.020mm)</option>
                <option value="0.015">마이크로 포서드 (CoC 0.015mm)</option>
                <option value="0.038">중형 44x33mm (CoC 0.038mm)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium">
                초점 거리 (f): <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{focalLength} mm</span>
              </label>
              <input
                type="range"
                min="14"
                max="200"
                step="2"
                value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium">
                조리개 (F-number): <span className="font-mono font-bold text-amber-600 dark:text-amber-400">F{dofAperture}</span>
              </label>
              <input
                type="range"
                min="1.2"
                max="16"
                step="0.2"
                value={dofAperture}
                onChange={(e) => setDofAperture(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium">
                피사체 거리: <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{subjectDist.toFixed(1)} m</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={subjectDist}
                onChange={(e) => setSubjectDist(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>

          {/* DOF Output Box */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">전방 한계 (Near Limit)</span>
                <p className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                  {nearLimitM.toFixed(2)} m
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">후방 한계 (Far Limit)</span>
                <p className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                  {farLimitM === Infinity ? '무한대 (∞)' : `${farLimitM.toFixed(2)} m`}
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">총 심도 (Total DOF)</span>
                <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                  {totalDofM === Infinity ? '무한대 (∞)' : `${(totalDofM * 100).toFixed(1)} cm`}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">과초점 거리 (Hyperfocal Distance, H)</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {hyperfocalM.toFixed(2)} m
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong>풍경 촬영 팁:</strong> 초점을 과초점 거리({hyperfocalM.toFixed(1)}m)에 맞추면, 과초점 거리의 절반({(hyperfocalM / 2).toFixed(1)}m)부터 무한대(∞)까지 모든 피사체가 선명하게 상이 맺히는 팬포커스를 얻을 수 있습니다.
          </div>
        </div>

      </div>

      {/* Shutter Mechanism Comparison Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              셔터 메커니즘 3대 방식 심층 비교 (기계식 vs 롤링 vs 글로벌)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              센서 주사 지연 시간과 고속 움직임 피사체 왜곡(젤로 현상), 플래시 동조 속도 한계
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Shutter 1 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white">기계식 포컬 플레인 셔터</span>
              <span className="text-[10px] text-slate-500 font-mono">1/250s 동조</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              선막과 후막의 물리적 블라인드가 위에서 아래로 주사. 고속 셔터 시 슬릿(Slit) 형태로 노출하여 젤로 왜곡은 적으나 셔터 충격(Shutter Shock)과 기계적 수명 한계(20~50만 회) 존재.
            </p>
            <div className="text-[10px] text-slate-400">
              특징: 기계 구동 소음 발생, 최대 1/8,000초
            </div>
          </div>

          {/* Shutter 2 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white">전자 롤링 셔터 (일반/적층)</span>
              <span className="text-[10px] text-amber-500 font-mono">1/30s ~ 1/250s 판독</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              센서 행(Row)을 위에서 아래로 순차 판독. 일반 센서는 1/15~1/30초로 느려 골프채가 휘어 보이는 젤로 왜곡 발생. 3D 적층 BSI 센서는 1/250초까지 단축하여 젤로 대폭 억제.
            </p>
            <div className="text-[10px] text-slate-400">
              특징: 완전 무소음, 고속 연사 가능, LED 플리커 가능성
            </div>
          </div>

          {/* Shutter 3 */}
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-900 dark:text-blue-200">글로벌 셔터 (Global Shutter)</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">1/80,000s 전속도</span>
            </div>
            <p className="text-blue-950 dark:text-blue-200 text-[11px] leading-relaxed">
              수천만 개 전 화소가 동시에 빛을 받아들이고 일제히 닫힘. 젤로 왜곡 0%, 플래시 전속도 동조(1/80,000초), LED 조명 밴딩 100% 완전 소거.
            </p>
            <div className="text-[10px] text-blue-700 dark:text-blue-300">
              대표 기종: Sony α9 III
            </div>
          </div>
        </div>

        {/* Action Link to Full Term Modal */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              const t = findTerm('global-shutter');
              if (t) onSelectTerm(t);
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            글로벌 셔터 반도체 원리 상세 보기 →
          </button>
        </div>
      </div>
    </div>
  );
};
