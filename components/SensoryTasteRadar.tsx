'use client';

import React from 'react';

interface Axis {
  label: string;
  value: number; // 0-100
}

interface SensoryTasteRadarProps {
  axes: Axis[];
  size?: number;
  className?: string;
}

// design.md §5.C — 5-axis normalized sensory profile
const DEFAULT_AXES: Axis[] = [
  { label: 'Umami', value: 65 },
  { label: 'Spicy', value: 40 },
  { label: 'Crunch', value: 80 },
  { label: 'Sweet', value: 55 },
  { label: 'Sour', value: 30 },
];

export const SensoryTasteRadar: React.FC<SensoryTasteRadarProps> = ({
  axes,
  size = 260,
  className = '',
}) => {
  const data = axes.length ? axes : DEFAULT_AXES;
  const n = data.length;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 34;

  const polar = (i: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [Math.cos(angle), Math.sin(angle)];
  };

  const pointAt = (value: number, i: number) => {
    const [x, y] = polar(i);
    const r = (value / 100) * radius;
    return [cx + x * r, cy + y * r];
  };

  // Grid rings (25 / 50 / 75 / 100)
  const rings = [25, 50, 75, 100];

  const polygonPoints = data.map((d, i) => pointAt(d.value, i).join(',')).join(' ');

  const axisLinePoints = Array.from({ length: n }, (_, i) =>
    pointAt(100, i).map((v) => v.toFixed(1)).join(',')
  ).join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ width: size, height: size }}
    >
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#FFC857" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Grid rings */}
      {rings.map((r) => {
        const pts = Array.from({ length: n }, (_, i) =>
          pointAt(r, i).map((v) => v.toFixed(1)).join(',')
        ).join(' ');
        return (
          <polygon
            key={r}
            points={pts}
            fill="none"
            stroke="#DED7E4"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis spokes */}
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = pointAt(100, i);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#F0EAE1"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled polygon */}
      <polygon
        points={polygonPoints}
        fill="url(#radarFill)"
        stroke="#FF6B35"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Perimeter vertices */}
      {data.map((d, i) => {
        const [x, y] = pointAt(d.value, i);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.5"
            fill="#FF6B35"
          />
        );
      })}

      {/* Axis labels */}
      {data.map((d, i) => {
        const [lx, ly] = polar(i);
        const lr = radius + 20;
        const x = cx + lx * lr;
        const y = cy + ly * lr;
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#6B6675]"
            style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-sans)' }}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
};

export default SensoryTasteRadar;