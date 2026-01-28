'use client';

import React from 'react';

export const TopoShape: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-full opacity-60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8">
        {/* Generative-style topographic lines */}
        <path d="M200,50 C280,50 350,120 350,200 C350,280 280,350 200,350 C120,350 50,280 50,200 C50,120 120,50 200,50 Z" />
        <path d="M200,60 C270,60 340,125 340,200 C340,275 270,340 200,340 C130,340 60,275 60,200 C60,125 130,60 200,60 Z" />
        <path d="M200,75 C260,75 325,130 325,200 C325,270 260,325 200,325 C140,325 75,270 75,200 C75,130 140,75 200,75 Z" />

        {/* Distorted inner shapes */}
        <path d="M200,90 C250,90 310,140 305,200 C300,260 250,310 200,310 C150,310 100,260 95,200 C90,140 150,90 200,90 Z" />
        <path d="M195,110 C240,105 290,150 285,200 C280,250 240,290 195,295 C150,300 110,250 115,200 C120,150 150,115 195,110 Z" />

        {/* More organic waves */}
        <path d="M180,130 C220,120 270,160 260,200 C250,240 220,270 180,280 C140,290 130,240 135,200 C140,160 140,140 180,130 Z" />
        <path d="M190,145 C210,140 250,170 240,200 C230,230 210,255 190,260 C170,265 150,230 155,200 C160,170 170,150 190,145 Z" />

        {/* Vertical Grid Lines for tech feel */}
        <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(255,255,255,0.05)" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(255,255,255,0.05)" />
      </svg>
    </div>
  );
};
