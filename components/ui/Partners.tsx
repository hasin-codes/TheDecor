'use client';

import React, { useMemo } from 'react';
import { CompanyLogos, HubLogo } from './Logos';

interface PartnersProps {
  width: number;
  height: number;
}

const CARD_W = 120;
const CARD_H = 60;

// ------------------------------------------------------------------
// UTILS: Circuit Path Generation
// ------------------------------------------------------------------
const getCircuitPath = (cx: number, cy: number, tx: number, ty: number) => {
  const dx = tx - cx;
  const dy = ty - cy;

  let ex, ey;
  let rectPath = "";

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      ex = tx - CARD_W / 2;
      ey = ty;
      rectPath = `L ${tx - CARD_W / 2} ${ty - CARD_H / 2} L ${tx + CARD_W / 2} ${ty - CARD_H / 2} L ${tx + CARD_W / 2} ${ty + CARD_H / 2} L ${tx - CARD_W / 2} ${ty + CARD_H / 2} L ${tx - CARD_W / 2} ${ty}`;
    } else {
      ex = tx + CARD_W / 2;
      ey = ty;
      rectPath = `L ${tx + CARD_W / 2} ${ty - CARD_H / 2} L ${tx - CARD_W / 2} ${ty - CARD_H / 2} L ${tx - CARD_W / 2} ${ty + CARD_H / 2} L ${tx + CARD_W / 2} ${ty + CARD_H / 2} L ${tx + CARD_W / 2} ${ty}`;
    }
  } else {
    if (dy > 0) {
      ex = tx;
      ey = ty - CARD_H / 2;
      rectPath = `L ${tx + CARD_W / 2} ${ty - CARD_H / 2} L ${tx + CARD_W / 2} ${ty + CARD_H / 2} L ${tx - CARD_W / 2} ${ty + CARD_H / 2} L ${tx - CARD_W / 2} ${ty - CARD_H / 2} L ${tx} ${ty - CARD_H / 2}`;
    } else {
      ex = tx;
      ey = ty + CARD_H / 2;
      rectPath = `L ${tx + CARD_W / 2} ${ty + CARD_H / 2} L ${tx + CARD_W / 2} ${ty - CARD_H / 2} L ${tx - CARD_W / 2} ${ty - CARD_H / 2} L ${tx - CARD_W / 2} ${ty + CARD_H / 2} L ${tx} ${ty + CARD_H / 2}`;
    }
  }

  let linePath = "";
  const ldx = ex - cx;
  const ldy = ey - cy;
  const absLdx = Math.abs(ldx);
  const absLdy = Math.abs(ldy);

  if (absLdx > absLdy) {
    const xDiff = absLdx - absLdy;
    const xMid = cx + (ldx > 0 ? xDiff : -xDiff);
    linePath = `M ${cx} ${cy} L ${xMid} ${cy} L ${ex} ${ey}`;
  } else {
    const yDiff = absLdy - absLdx;
    const yMid = cy + (ldy > 0 ? yDiff : -yDiff);
    linePath = `M ${cx} ${cy} L ${cx} ${yMid} L ${ex} ${ey}`;
  }

  return linePath + " " + rectPath;
};

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
export function Partners({ width, height }: PartnersProps) {
  // Determine device mode based on width
  const deviceMode = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';

  const layout = useMemo(() => {
    if (width === 0) return [];

    const logoCount = CompanyLogos.length;
    const positions: { x: number; y: number; id: number }[] = [];

    let cols = 4;
    let rows = 3;

    if (deviceMode === 'mobile') {
      cols = 2;
      rows = 5;
    } else if (deviceMode === 'tablet') {
      cols = 4;
      rows = 3;
    } else {
      cols = 5;
      rows = 2;
    }

    const cellW = width / cols;
    const cellH = height / rows;

    const centerCol = Math.floor(cols / 2);
    const centerRow = Math.floor(rows / 2);

    let logoIndex = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (logoIndex >= logoCount) break;

        const isCenterRow = r === centerRow || (rows % 2 === 0 && r === centerRow - 1);
        const isCenterCol = c === centerCol || (cols % 2 === 0 && c === centerCol - 1);

        if (isCenterRow && isCenterCol) continue;

        positions.push({
          x: (c * cellW) + (cellW / 2),
          y: (r * cellH) + (cellH / 2),
          id: logoIndex
        });
        logoIndex++;
      }
    }

    return positions;
  }, [deviceMode, width, height]);

  const centerX = width / 2;
  const centerY = height / 2;
  const CYCLE_DURATION = 12;
  const BEAM_LENGTH = 0.2;

  return (
    <div
      className="absolute inset-0 overflow-hidden flex items-center justify-center"
    >
      <style>{`
        @keyframes circuit-travel {
          0% { stroke-dashoffset: 1; opacity: 0; }
          1% { opacity: 1; }
          40% { stroke-dashoffset: -${BEAM_LENGTH}; opacity: 1; }
          45% { stroke-dashoffset: -${BEAM_LENGTH}; opacity: 0; }
          100% { stroke-dashoffset: -${BEAM_LENGTH}; opacity: 0; }
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-900/10" />
      </div>

      {/* SVG Circuit Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
            <stop offset="50%" stopColor="rgba(20, 20, 20, 0.9)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </linearGradient>
        </defs>

        {layout.map((pos, index) => {
          const d = getCircuitPath(centerX, centerY, pos.x, pos.y);
          const delay = (index / layout.length) * CYCLE_DURATION;

          return (
            <g key={`circuit-${pos.id}`}>
              <path
                d={d}
                stroke="white"
                strokeOpacity="0.03"
                strokeWidth="1"
                fill="none"
              />
              <path
                d={d}
                stroke="url(#beam-gradient)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${BEAM_LENGTH} 1`}
                pathLength="1"
                shapeRendering="optimizeSpeed"
                style={{
                  willChange: 'stroke-dashoffset',
                  animation: `circuit-travel ${CYCLE_DURATION}s linear infinite`,
                  animationDelay: `${delay}s`
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Central Hub */}
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="The Decor"
            className="w-full h-full object-contain p-1 opacity-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>

      {/* Partner Logos */}
      {layout.map((pos) => (
        <div
          key={pos.id}
          className="absolute flex items-center justify-center z-10"
          style={{
            left: pos.x,
            top: pos.y,
            width: CARD_W,
            height: CARD_H,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-md rounded border border-white/10 p-2 overflow-hidden">
            <div className="opacity-80 hover:opacity-100 transition-opacity duration-300 scale-[0.7] md:scale-[0.85] origin-center w-full h-full flex items-center justify-center">
              {CompanyLogos[pos.id]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
