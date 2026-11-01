import React, { useEffect, useRef, useState } from 'react';

export interface LensProfile {
  id: string;
  name: string;
  maxAperture: number;
  base10S: number;
  base10M: number;
  base30S: number;
  base30M: number;
  edgeDropRate: number;
  astigmatismSpread: number;
  description: string;
}

export const LENS_PROFILES: LensProfile[] = [
  {
    id: 'prime-50',
    name: '50mm F1.2 Ultra Prime (최상급 단렌즈)',
    maxAperture: 1.2,
    base10S: 0.96,
    base10M: 0.94,
    base30S: 0.88,
    base30M: 0.84,
    edgeDropRate: 0.12,
    astigmatismSpread: 0.05,
    description: 'XA 비구면 3매 및 ED 렌즈로 최대 개방에서도 중앙 96%, 주변부 84% 이상의 극한 선예도 유지.',
  },
  {
    id: 'zoom-2470',
    name: '24-70mm F2.8 Standard Zoom (표준 줌)',
    maxAperture: 2.8,
    base10S: 0.92,
    base10M: 0.89,
    base30S: 0.80,
    base30M: 0.74,
    edgeDropRate: 0.22,
    astigmatismSpread: 0.10,
    description: '전 구간 균일한 고화질이지만 대각선 극주변부(18~21.6mm)에서 비점수차로 인한 약간의 저하 존재.',
  },
  {
    id: 'prime-85',
    name: '85mm F1.4 Portrait Prime (인물 단렌즈)',
    maxAperture: 1.4,
    base10S: 0.94,
    base10M: 0.93,
    base30S: 0.84,
    base30M: 0.82,
    edgeDropRate: 0.15,
    astigmatismSpread: 0.04,
    description: '사짓탈과 메리디오날 곡선이 거의 일치하여 배경 흐림(보케)이 극도로 부드럽고 수차가 적음.',
  },
  {
    id: 'superzoom-28300',
    name: '28-200mm F2.8-5.6 Superzoom (고배율 줌)',
    maxAperture: 2.8,
    base10S: 0.85,
    base10M: 0.78,
    base30S: 0.65,
    base30M: 0.52,
    edgeDropRate: 0.40,
    astigmatismSpread: 0.20,
    description: '편의성을 위한 7배 줌 설계로 인해 주변부로 갈수록 S/M 곡선 간격이 벌어지며 해상력 급감.',
  },
];

interface MtfCanvasChartProps {
  lens: LensProfile;
  aperture: number;
  isDark?: boolean;
}

export const MtfCanvasChart: React.FC<MtfCanvasChartProps> = ({
  lens,
  aperture,
  isDark = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverDist, setHoverDist] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const padLeft = 48;
    const padRight = 24;
    const padTop = 28;
    const padBottom = 40;
    const plotWidth = width - padLeft - padRight;
    const plotHeight = height - padTop - padBottom;

    ctx.clearRect(0, 0, width, height);

    const gridColor = isDark ? 'rgba(71, 85, 105, 0.25)' : 'rgba(226, 232, 240, 0.8)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    // X Range: 0 to 21.6mm (Full Frame Image Height)
    const maxDistance = 21.6;

    const xToPx = (dist: number) => padLeft + (dist / maxDistance) * plotWidth;
    const yToPx = (val: number) => height - padBottom - val * plotHeight;

    // Draw Y Grids (0.0, 0.2, 0.4, 0.6, 0.8, 1.0)
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = textColor;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let v = 0; v <= 1.0; v += 0.2) {
      const y = yToPx(v);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillText(v.toFixed(1), padLeft - 6, y + 3);
    }

    // Benchmark line at 0.6 (Standard high resolution threshold)
    ctx.strokeStyle = isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.35)';
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, yToPx(0.6));
    ctx.lineTo(width - padRight, yToPx(0.6));
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw X Grids (0, 5, 10, 15, 20, 21.6mm)
    const xTicks = [0, 5, 10, 15, 20, 21.6];
    xTicks.forEach((d) => {
      const x = xToPx(d);
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, height - padBottom);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillText(`${d}`, x, height - padBottom + 16);
    });

    // Axis Labels
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('센서 중심으로부터의 거리 (Image Height, mm)', padLeft + plotWidth / 2, height - 6);

    ctx.save();
    ctx.translate(14, padTop + plotHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('변조도 Contrast (0.0 ~ 1.0)', 0, 0);
    ctx.restore();

    // Compute Aperture Modifier Factor
    // Best sweet spot around F5.6 (+0.08). At F16, diffraction pulls everything down by -0.22!
    let apFactor = 0;
    if (aperture <= 1.4) apFactor = -0.05;
    else if (aperture <= 2.8) apFactor = 0.02;
    else if (aperture <= 5.6) apFactor = 0.08;
    else if (aperture <= 8) apFactor = 0.04;
    else if (aperture <= 11) apFactor = -0.06;
    else apFactor = -0.22; // F16 diffraction drop

    // Calculator for curve value at distance r (0..21.6)
    const getVal = (base: number, isMeridional: boolean, freq: 10 | 30, r: number) => {
      const normR = r / maxDistance;
      const drop = Math.pow(normR, 1.8) * lens.edgeDropRate * (freq === 30 ? 1.4 : 1.0);
      const astig = isMeridional ? Math.pow(normR, 1.6) * lens.astigmatismSpread : 0;
      const raw = base + apFactor - drop - astig;
      return Math.min(0.99, Math.max(0.05, raw));
    };

    // Plot curves:
    // 10 lp/mm Sagittal (Solid Red)
    // 10 lp/mm Meridional (Dashed Red)
    // 30 lp/mm Sagittal (Solid Blue)
    // 30 lp/mm Meridional (Dashed Blue)
    const drawCurve = (color: string, dashed: boolean, base: number, isM: boolean, freq: 10 | 30) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = dashed ? 1.6 : 2.2;
      if (dashed) ctx.setLineDash([4, 4]);
      else ctx.setLineDash([]);

      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const dist = (i / steps) * maxDistance;
        const val = getVal(base, isM, freq, dist);
        const x = xToPx(dist);
        const y = yToPx(val);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    drawCurve('#ef4444', false, lens.base10S, false, 10);
    drawCurve('#ef4444', true, lens.base10M, true, 10);
    drawCurve('#3b82f6', false, lens.base30S, false, 30);
    drawCurve('#3b82f6', true, lens.base30M, true, 30);

    // Legend on top
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('— 10 lp/mm S (대비)', padLeft + 6, padTop - 10);
    ctx.fillText('- - 10 lp/mm M', padLeft + 120, padTop - 10);

    ctx.fillStyle = '#3b82f6';
    ctx.fillText('— 30 lp/mm S (해상력)', padLeft + 210, padTop - 10);
    ctx.fillText('- - 30 lp/mm M', padLeft + 330, padTop - 10);

    // Hover Indicator
    if (hoverDist !== null) {
      const hx = xToPx(hoverDist);
      const v10S = getVal(lens.base10S, false, 10, hoverDist);
      const v30S = getVal(lens.base30S, false, 30, hoverDist);

      ctx.strokeStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(hx, padTop);
      ctx.lineTo(hx, height - padBottom);
      ctx.stroke();
      ctx.setLineDash([]);

      const tooltip = `r=${hoverDist.toFixed(1)}mm: 10S=${(v10S * 100).toFixed(0)}%, 30S=${(v30S * 100).toFixed(0)}%`;
      ctx.font = '10px "JetBrains Mono", monospace';
      const tw = ctx.measureText(tooltip).width;
      const tx = Math.min(width - padRight - tw - 10, Math.max(padLeft, hx - tw / 2));
      ctx.fillStyle = isDark ? '#0f172a' : '#1e293b';
      ctx.beginPath();
      ctx.roundRect(tx, padTop + 10, tw + 12, 20, 4);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(tooltip, tx + 6, padTop + 24);
    }
  }, [lens, aperture, hoverDist, isDark]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padLeft = 48;
    const padRight = 24;
    const plotWidth = rect.width - padLeft - padRight;
    const ratio = (x - padLeft) / plotWidth;
    if (ratio >= 0 && ratio <= 1) {
      setHoverDist(ratio * 21.6);
    } else {
      setHoverDist(null);
    }
  };

  const handleMouseLeave = () => setHoverDist(null);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-[280px] md:h-[320px] rounded-xl block cursor-crosshair"
      />
    </div>
  );
};
