'use client';

import React from 'react';

// ------------------------------------------------------------------
// Base Logo Container
// ------------------------------------------------------------------
const LogoBase = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full flex items-center justify-center text-white">
    {children}
  </div>
);

// ------------------------------------------------------------------
// Hub Logo (Center)
// ------------------------------------------------------------------
export const HubLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF2E2E" stopOpacity="1" />
        <stop offset="100%" stopColor="#880808" stopOpacity="1" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Animated Outer Tech Ring */}
    <circle cx="50" cy="50" r="46" stroke="url(#hubGradient)" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="4 2">
       <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="30s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="10 10">
       <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="20s" repeatCount="indefinite" />
    </circle>

    {/* Decor Logo Content */}
    <g id="logo-content" transform="translate(25 25) scale(0.5)" filter="url(#glow)">
       <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" fill="white" />
       <circle cx="50" cy="50" r="15" fill="url(#hubGradient)" />
    </g>
  </svg>
);

// ------------------------------------------------------------------
// Partner Logos
// ------------------------------------------------------------------
export const CompanyLogos = [
  // 1. AETHER
  <LogoBase key="1">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <path d="M20 10 L25 30 L30 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">AETHER</text>
    </svg>
  </LogoBase>,
  // 2. NEXUS
  <LogoBase key="2">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M20 12 L20 28" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 20 L28 20" stroke="currentColor" strokeWidth="2"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">NEXUS</text>
    </svg>
  </LogoBase>,
  // 3. ORBIT
  <LogoBase key="3">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <ellipse cx="20" cy="20" rx="10" ry="5" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(-45 20 20)"/>
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">ORBIT</text>
    </svg>
  </LogoBase>,
  // 4. PRISM
  <LogoBase key="4">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <path d="M20 10 L12 25 H28 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">PRISM</text>
    </svg>
  </LogoBase>,
  // 5. CORE
  <LogoBase key="5">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect x="12" y="12" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M20 20 L28 28" stroke="currentColor" strokeWidth="2"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">CORE</text>
    </svg>
  </LogoBase>,
  // 6. WAVE
  <LogoBase key="6">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <path d="M10 20 Q20 5 30 20 T50 20" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="60" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">WAVE</text>
    </svg>
  </LogoBase>,
  // 7. VERTEX
  <LogoBase key="7">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <path d="M15 25 L20 15 L25 25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M10 20 L30 20" stroke="currentColor" strokeWidth="1"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">VERTEX</text>
    </svg>
  </LogoBase>,
  // 8. VAULT
  <LogoBase key="8">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect x="12" y="14" width="16" height="12" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M16 14 V10 C16 8 24 8 24 10 V14" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">VAULT</text>
    </svg>
  </LogoBase>,
  // 9. ZENITH
  <LogoBase key="9">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <path d="M15 30 L20 10 L25 30" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">ZENITH</text>
    </svg>
  </LogoBase>,
  // 10. FLUX
  <LogoBase key="10">
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <circle cx="15" cy="20" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="25" cy="20" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="40" y="26" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">FLUX</text>
    </svg>
  </LogoBase>
];
