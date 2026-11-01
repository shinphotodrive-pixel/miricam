import React, { useEffect, useRef } from 'react';

interface AfSystemData {
  id: string;
  name: string;
  color: string;
  scores: number[]; // 5 dimensions: [추적 속도, 수평 패턴, 저조도 EV, 전력 효율, 영상 헌팅 억제] (0 to 100)
}

export const AF_SYSTEMS: AfSystemData[] = [
  {
    id: 'cdaf',
    name: '콘트라스트 AF (CDAF)',
    color: '#3b82f6', // blue
    scores: [38, 92, 55, 90, 30],
  },
  {
    id: 'pdaf',
    name: '센서면 위상차 (OSPDAF)',
    color: '#f59e0b', // amber
    scores: [88, 35, 75, 78, 72],
  },
  {
    id: 'dual-pixel',
    name: '듀얼 픽셀 CMOS AF',
    color: '#a855f7', // purple
    scores: [94, 42, 88, 65, 92],
  },
  {
    id: 'quad-pixel',
    name: '크로스 쿼드 픽셀 AF',
    color: '#10b981', // emerald
    scores: [98, 98, 96, 60, 95],
  },
];

const METRIC_LABELS = [
  '고속 동체 추적 속도',
  '수평 패턴 위상차 검출',
  '저조도 검출 한계 (-EV)',
  '연산 부하 & 전력 효율',
  '동영상 헌팅 억제 & 부드러움',
];

interface AfRadarChartProps {
  activeIndices: number[]; // which datasets are toggled on
  isDark?: boolean;
}

export const AfRadarChart: React.FC<AfRadarChartProps> = ({
  activeIndices,
  isDark = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = Math.min(centerX, centerY) - 52;

    ctx.clearRect(0, 0, width, height);

    const gridColor = isDark ? 'rgba(71, 85, 105, 0.35)' : 'rgba(203, 213, 225, 0.7)';
    const textColor = isDark ? '#94a3b8' : '#475569';

    const numAxes = METRIC_LABELS.length;
    const angleStep = (Math.PI * 2) / numAxes;

    // Draw concentric rings (20, 40, 60, 80, 100)
    const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    rings.forEach((ringRatio) => {
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * ringRatio);
        const y = centerY + Math.sin(angle) * (radius * ringRatio);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    });

    // Draw radial axes & Labels
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Label placement
      const labelDist = radius + 22;
      const lx = centerX + Math.cos(angle) * labelDist;
      const ly = centerY + Math.sin(angle) * labelDist;

      ctx.fillStyle = textColor;
      if (Math.abs(Math.cos(angle)) < 0.2) {
        ctx.textAlign = 'center';
      } else if (Math.cos(angle) > 0) {
        ctx.textAlign = 'left';
      } else {
        ctx.textAlign = 'right';
      }
      ctx.fillText(METRIC_LABELS[i], lx, ly + 3);
    }

    // Draw Datasets
    AF_SYSTEMS.forEach((system, idx) => {
      if (!activeIndices.includes(idx)) return;

      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const score = system.scores[i];
        const r = (score / 100) * radius;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        points.push({ x, y });
      }

      // Fill area with subtle opacity
      ctx.beginPath();
      points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      // Convert hex to rgba
      ctx.fillStyle = `${system.color}22`;
      ctx.fill();

      // Stroke outline
      ctx.strokeStyle = system.color;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Draw vertices dots
      points.forEach((pt) => {
        ctx.fillStyle = system.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    });
  }, [activeIndices, isDark]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-[280px] md:h-[320px] rounded-xl block"
      />
    </div>
  );
};
