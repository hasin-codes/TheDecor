'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Partners } from './Partners';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center px-6 md:px-10 lg:px-14 pt-32 pb-16 z-10 overflow-hidden"
    >
      {/* --- ARTISTIC BACKGROUND ELEMENTS --- */}

      {/* Left Side: Soft Organic Red Glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-[20%] w-[50%] h-[60%] bg-brandRed blur-[120px] rounded-full pointer-events-none mix-blend-screen"
      />

      {/* Right Side: Fading Deep Red Aura */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 -right-[15%] w-[45%] h-[55%] bg-[#880808] blur-[140px] rounded-full pointer-events-none mix-blend-screen"
      />

      {/* Artistic Fluid Line (SVG) - Left */}
      <svg className="absolute top-20 left-0 w-100 h-200 opacity-20 pointer-events-none" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50 100C50 150 150 50 250 150C350 250 250 450 150 550C50 650 -50 600 -50 600" stroke="url(#redGradientLeft)" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="redGradientLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E31B23" stopOpacity="0" />
            <stop offset="50%" stopColor="#E31B23" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E31B23" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Artistic Fluid Line (SVG) - Right */}
      <svg className="absolute bottom-32 right-0 w-125 h-150 opacity-20 pointer-events-none" viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M550 100C450 50 350 150 250 100C150 50 100 250 200 450C300 650 550 550 550 550" stroke="url(#redGradientRight)" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="redGradientRight" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#880808" stopOpacity="0" />
            <stop offset="50%" stopColor="#d70000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d70000" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl text-center mb-12 relative z-20"
      >
        <h2 className="hidden md:block text-4xl md:text-6xl font-medium leading-[1.1] tracking-tight text-foreground drop-shadow-sm font-display">
          We help brands create digital experiences that connect with their audience
        </h2>
      </motion.div>

      {/* The Container - Red Gradient Background */}
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative w-[92%] md:w-[94%] max-w-400 mx-auto aspect-3/4 md:aspect-video lg:aspect-32/9 lg:min-h-75 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden z-10 group"
        style={{
          background: 'linear-gradient(180deg, #880808 0%, #d70000 35%, #ff4d4d 70%, #ffcccc 100%)',
          boxShadow: '0 20px 80px -20px rgba(227, 27, 35, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset'
        }}
      >
        {/* --- FROSTED FLUTED GLASS EFFECT --- */}



        {/* --- PARTNERS CIRCUIT LAYER (Above frosted glass) --- */}
        {containerDimensions.width > 0 && containerDimensions.height > 0 && (
          <div className="absolute inset-0 z-10 overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem]">
            <Partners width={containerDimensions.width} height={containerDimensions.height} />
          </div>
        )}



        {/* Layer 3: Broader waviness for realistic glass depth */}
        <div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.2) 5%,
                    transparent 10%
                )`,
          }}
        />

        {/* Internal Shine/Gloss for finish */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-black/20 mix-blend-overlay pointer-events-none z-30" />

        {/* Ring Border */}
        <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3.5rem] ring-1 ring-white/20 pointer-events-none z-40" />

        {/* Floating Abstract Element (CSS Only) - Figures */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-2 z-5">
          <div className="w-8 h-8 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Bottom Right Badge */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-50">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-xs font-bold text-white border border-white/20 tracking-wider hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg">
            SCROLL TO EXPLORE
          </span>
        </div>
      </motion.div>
    </section>
  );
};
