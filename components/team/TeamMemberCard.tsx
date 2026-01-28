'use client';

import React from 'react';
import { TopoShape, InfoCard } from '@/components/ui';
import { TeamMember } from '@/lib/data/team';

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

// --- BACK FACE SUB-COMPONENTS (Adapted from User Request) ---

const LogoIcon: React.FC = () => {
  const uniqueId = React.useId();
  const gradientId = `logoGradient-${uniqueId}`;
  const filterId = `glow-${uniqueId}`;

  return (
    <div className="w-8 h-8 relative">
      {/* Abstract 3D shape mimicking the reference */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,100,255,0.5)]">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9a9e" />
            <stop offset="100%" stopColor="#fecfef" />
          </linearGradient>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Add a specific pattern for the back card specifically */}
          <pattern id="grid-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke="rgba(40, 40, 40, 0.5)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* stylized geometric flower/chip shape */}
        <path
          d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d="M50 50 L80 35 M50 50 L80 65 M50 50 L50 80 M50 50 L20 65 M50 50 L20 35 M50 50 L50 20"
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Center accent */}
        <circle cx="50" cy="50" r="10" fill={`url(#${gradientId})`} filter={`url(#${filterId})`} />

        {/* Petal-like highlights */}
        <path d="M50 50 Q70 30 80 35" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M50 50 Q30 70 20 65" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
      </svg>
    </div>
  );
};

const GradientHeader: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff3333] via-[#ff6b6b] to-[#ffcc00]">
        {/* Overlay gradients to create the specific 'blobs' seen in the reference */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent mix-blend-overlay"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-blue-600 rounded-full blur-2xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Brand Text - Rotated */}
      <div className="absolute top-0 left-0 h-full flex flex-col justify-end pb-6 pl-[14px]">
        <h1
          className="text-white text-[clamp(1.5rem,6vw,2.5rem)] font-display font-medium tracking-wide origin-bottom-left -rotate-90"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
        >
          Decor
        </h1>
      </div>
    </div>
  );
};

interface GridContentProps {
  member: TeamMember;
}

const GridContent: React.FC<GridContentProps> = ({ member }) => {
  // Inline style for the grid pattern to make the component self-contained
  const gridStyle: React.CSSProperties = {
    backgroundSize: '24px 24px',
    backgroundImage: `
      linear-gradient(to right, rgba(40, 40, 40, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(40, 40, 40, 0.5) 1px, transparent 1px)
    `
  };

  return (
    <div className="w-full h-full relative bg-[#121214] flex flex-col justify-between p-6 pt-4">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={gridStyle}
      />

      {/* Top Row: Logo & Name */}
      <div className="relative z-10 flex justify-between items-start mt-2 px-[2%]">
        <div className="mt-1">
          <LogoIcon />
        </div>
        <div className="text-right">
          <h2 className="text-white text-[clamp(1.1rem,4vw,1.6rem)] leading-tight font-display font-medium tracking-tight uppercase">
            {member.name.split(' ')[0]}<br />
            {member.name.split(' ').slice(1).join(' ')}
          </h2>
        </div>
      </div>

      {/* Middle/Bottom Layout */}
      <div className="relative z-10 flex flex-col gap-6 mb-2 px-[2%]">

        {/* Title & Address Row */}
        <div className="flex justify-between items-end">
          <div className="text-white/80 text-[clamp(0.45rem,1.4vw,0.65rem)] font-mono font-normal tracking-wide uppercase opacity-90 max-w-[60%]">
            <span className="text-brandBlue opacity-60 block text-[clamp(0.35rem,1vw,0.5rem)] mb-0.5">POSITION_ID /</span>
            {member.role}<br />
            {member.sector}
          </div>
          <div className="text-right text-white/80 text-[clamp(0.45rem,1.4vw,0.65rem)] leading-relaxed font-mono font-normal opacity-90">
            <span className="text-white/40 block text-[clamp(0.35rem,1vw,0.5rem)] mb-0.5">LOCATION /</span>
            UK Headquarters<br />
            London, SW1A 1AA
          </div>
        </div>

        {/* Phone & Email Row */}
        <div className="flex justify-between items-end border-t border-white/5 pt-4">
          <div className="text-white text-[clamp(0.5rem,1.5vw,0.75rem)] font-mono font-bold tracking-wider">
            <span className="text-white/30 block text-[clamp(0.35rem,1vw,0.5rem)] font-normal mb-0.5">SERIAL_NO</span>
            {member.baseUnit}
          </div>
          <div className="text-right text-white text-[clamp(0.5rem,1.5vw,0.75rem)] font-mono font-bold tracking-wide">
            <span className="text-white/30 block text-[clamp(0.35rem,1vw,0.5rem)] font-normal mb-0.5">COMPOSTION</span>
            {member.material}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN CARD ---

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    // Outer CONTAINER: Controls size and perspective
    <div className="group [perspective:1000px] w-full aspect-[17/26] max-w-[400px] mx-auto">

      {/* INNER CONTAINER: The flipper */}
      <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-3xl">

        {/* --- FRONT FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#121214] border border-zinc-800/50"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none z-50 mix-blend-overlay"></div>

          {/* Top Section: Header & Image */}
          <div className="w-full flex-1 flex flex-col relative p-[4%] pt-[10%] pb-0 h-[65%]">

            {/* Header - Company & Logo */}
            <div className="flex justify-between items-center mb-[4%] z-20 px-[1%]">
              <h1 className="text-white text-[clamp(0.9rem,3.5vw,1.5rem)] tracking-tighter font-medium flex items-baseline font-sans leading-none uppercase">
                Decor&apos;s<span className="text-brandBlue">.</span>digital
              </h1>
              <div className="w-[12%] min-w-[28px] max-w-[40px] aspect-square rounded flex items-center justify-center p-1">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert opacity-90" />
              </div>
            </div>

            {/* Center Visuals */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-end">
              {/* Abstract Background Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] z-0 pointer-events-none opacity-60 mix-blend-screen">
                <TopoShape />
              </div>

              {/* User Image Square - Increased Height to touch bottom info */}
              <div className="relative z-10 w-[85%] aspect-[9/13] bg-zinc-900 rounded-t-sm shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] border-x border-t border-zinc-700/50 group overflow-hidden -mb-1">
                {/* Image Filter: Grayscale + Contrast */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-110"
                />

                {/* Tech overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent mix-blend-overlay"></div>

                {/* Red Light Leak Effect - Thin & Sharp */}
                <div className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-64 bg-red-500 blur-[15px] rounded-full mix-blend-screen pointer-events-none z-20"></div>
                <div className="absolute top-[40%] -right-16 w-80 h-4 bg-red-500 blur-[10px] -rotate-[35deg] mix-blend-screen pointer-events-none z-20"></div>

                {/* Corners - Aspect preserved */}
                <div className="absolute top-0 left-0 w-[3%] min-w-[6px] aspect-square border-t-2 border-l-2 border-white/40"></div>
                <div className="absolute bottom-0 right-0 w-[3%] min-w-[6px] aspect-square border-b-2 border-r-2 border-white/40"></div>
              </div>
            </div>
          </div>

          {/* Bottom Info Section - Independent Component with Gap */}
          <div className="w-full p-[4%] pt-0 pb-[5%] z-20 relative h-[35%] flex flex-col justify-end">
            <InfoCard
              role={member.role}
              name={member.name}
              sector={String(member.sector)}
              material={member.material}
              baseUnit={String(member.baseUnit)}
            />
          </div>

          {/* Subtle "Flip" Hint */}
          <div className="absolute bottom-2 right-2 opacity-30 text-[10px] text-zinc-500 font-mono pointer-events-none">
            &gt;&gt; FLIP
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#121214] shadow-2xl border border-white/10 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)' // Small Z shift to ensure it's on top when flipped
          }}
        >

          {/* Top Gradient Section with Inset Gap */}
          <div className="h-[38%] w-full p-2.5 pb-1.5">
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative border border-white/5 shadow-inner ring-1 ring-white/5">
              <GradientHeader />
            </div>
          </div>

          {/* Bottom Grid Section */}
          <div className="flex-1 w-full relative">
            <GridContent member={member} />
          </div>
        </div>

      </div>
    </div>
  );
};
