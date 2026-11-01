import React, { useEffect, useRef } from 'react';

interface NoiseCanvasChartProps {
  currentPhotons: number;
  currentReadNoise: number;
  isDark?: boolean;
}

export const NoiseCanvasChart: React.FC<NoiseCanvasChartProps> = ({
  currentPhotons,
  currentReadNoise,
  isDark = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Padding for axes
    const padLeft = 52;
    const padRight = 24;
    const padTop = 24;
    const padBottom = 40;
    const plotWidth = width - padLeft - padRight;
    const plotHeight = height - padTop - padBottom;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Color definitions
    const axisColor = isDark ? '#475569' : '#cbd5e1';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(71, 85, 105, 0.25)' : 'rgba(226, 232, 240, 0.8)';
    const shotColor = '#3b82f6'; // Blue
    const curTotalColor = '#10b981'; // Emerald
    const legacyNoiseColor = '#f59e0b'; // Amber (legacy sensor with 12e- read noise)

    // Data ranges: Photons from 10 to 5000 (log scale on X, dB on Y from 0 to 45 dB)
    const minP = 10;
    const maxP = 5000;
    const logMinP = Math.log10(minP);
    const logMaxP = Math.log10(maxP);

    const minDb = 0;
    const maxDb = 42;

    const xToPx = (p: number) => {
      const logP = Math.log10(p);
      const ratio = (logP - logMinP) / (logMaxP - logMinP);
      return padLeft + ratio * plotWidth;
    };

    const yToPx = (db: number) => {
      const ratio = (db - minDb) / (maxDb - minDb);
      return height - padBottom - ratio * plotHeight;
    };

    // Draw Grids and Y labels (0, 10, 20, 30, 40 dB)
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = textColor;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let db = 0; db <= 40; db += 10) {
      const y = yToPx(db);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillText(`${db}dB`, padLeft - 8, y + 4);
    }

    // Draw X labels (Photons: 10, 100, 1000, 5000)
    const xTicks = [10, 50, 100, 500, 1000, 5000];
    xTicks.forEach((p) => {
      const x = xToPx(p);
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, height - padBottom);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillText(`${p}`, x, height - padBottom + 16);
    });

    // Axis titles
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('입사 광자 수 (Photons, log scale)', padLeft + plotWidth / 2, height - 8);
    ctx.save();
    ctx.translate(14, padTop + plotHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('신호 대 잡음비 SNR (dB)', 0, 0);
    ctx.restore();

    // Helper to calculate SNR dB = 20 * log10( S / sqrt(S + R^2) )
    const calcSnrDb = (s: number, r: number) => {
      const totalNoise = Math.sqrt(s + r * r);
      const snr = s / Math.max(0.0001, totalNoise);
      return 20 * Math.log10(Math.max(1, snr));
    };

    // Curve 1: Pure Photon Shot Noise limit (R = 0)
    ctx.beginPath();
    ctx.strokeStyle = shotColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    for (let p = minP; p <= maxP; p += 20) {
      const db = calcSnrDb(p, 0);
      const x = xToPx(p);
      const y = yToPx(db);
      if (p === minP) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Curve 2: High Read Noise (Legacy sensor R = 12e-)
    ctx.beginPath();
    ctx.strokeStyle = legacyNoiseColor;
    ctx.lineWidth = 1.5;
    for (let p = minP; p <= maxP; p += 20) {
      const db = calcSnrDb(p, 12.0);
      const x = xToPx(p);
      const y = yToPx(db);
      if (p === minP) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Curve 3: Current Selected Sensor (R = currentReadNoise)
    ctx.beginPath();
    ctx.strokeStyle = curTotalColor;
    ctx.lineWidth = 2.5;
    for (let p = minP; p <= maxP; p += 15) {
      const db = calcSnrDb(p, currentReadNoise);
      const x = xToPx(p);
      const y = yToPx(db);
      if (p === minP) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Current State Point
    const curX = xToPx(currentPhotons);
    const curDb = calcSnrDb(currentPhotons, currentReadNoise);
    const curY = yToPx(curDb);

    // Indicator ring
    ctx.fillStyle = curTotalColor;
    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Guide lines to axes
    ctx.strokeStyle = isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(padLeft, curY);
    ctx.lineTo(curX, curY);
    ctx.lineTo(curX, height - padBottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Tooltip Box at point
    const tooltipText = `${curDb.toFixed(1)} dB (S=${currentPhotons}e-, R=${currentReadNoise.toFixed(1)}e-)`;
    ctx.font = '11px "JetBrains Mono", monospace';
    const textW = ctx.measureText(tooltipText).width;
    const boxX = Math.min(width - padRight - textW - 14, Math.max(padLeft, curX - textW / 2));
    const boxY = Math.max(padTop + 4, curY - 26);

    ctx.fillStyle = isDark ? '#1e293b' : '#0f172a';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, textW + 12, 20, 4);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(tooltipText, boxX + 6, boxY + 14);

    // Legend on top
    const legendY = padTop - 10;
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';

    // Shot limit
    ctx.fillStyle = shotColor;
    ctx.fillText('-- 광자 샷 한계 (R=0)', padLeft, legendY);

    // Current
    ctx.fillStyle = curTotalColor;
    ctx.fillText(`- 현재 센서 (R=${currentReadNoise.toFixed(1)}e-)`, padLeft + 130, legendY);

    // Legacy
    ctx.fillStyle = legacyNoiseColor;
    ctx.fillText('- 구형 센서 (R=12e-)', padLeft + 270, legendY);
  }, [currentPhotons, currentReadNoise, isDark]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-[280px] md:h-[320px] rounded-xl block"
      />
    </div>
  );
};
