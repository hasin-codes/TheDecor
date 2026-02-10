'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const principles = [
    {
        id: '01',
        label: 'SYSTEM',
        heading: 'Digital Ecology',
        desc: 'We view digital interfaces not as static pages, but as living ecosystems. Components interact, states evolve, and the system responds organically.',
        rotation: -3,
        yOffset: -40, // Negative to pull up
        align: 'self-end'
    },
    {
        id: '02',
        label: 'PRECISION',
        heading: 'Atomic Design',
        desc: 'Complexity arises from simplicity. We engineer from the atomic level—typography, spacing, motion—ensuring coherence across every viewport.',
        rotation: 2,
        yOffset: 10, // ✅ Increased from -20 to prevent overlap with header
        align: 'self-start'
    },
    {
        id: '03',
        label: 'FUTURE',
        heading: 'Next Paradigm',
        desc: 'We do not iterate on current trends. We seek the breaking point of web technologies to define what comes after the modern internet.',
        rotation: -2,
        yOffset: 50, // ✅ Increased from 30
        align: 'self-center'
    }
];

export const PhilosophySection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useIsomorphicLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {

            // ✅ 1. PINNING & MAIN TIMELINE
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%", // 200% extra scroll height
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 0.8,
                    snap: {
                        snapTo: 1 / (principles.length - 1),
                        duration: { min: 0.2, max: 0.5 },
                        ease: "power2.inOut"
                    },
                    onUpdate: (self) => {
                        // ✅ Progressive activation - keeps previous cards lit
                        const progress = self.progress;
                        const idx = Math.min(Math.floor(progress * principles.length), principles.length - 1);
                        setActiveIndex(idx);
                    }
                }
            });

            // ✅ 2. LINE DRAWING ANIMATION
            if (pathRef.current) {
                const length = pathRef.current.getTotalLength();
                gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

                tl.to(pathRef.current, {
                    strokeDashoffset: 0,
                    ease: "none",
                });
            }

            // ✅ 3. BACKGROUND PARALLAX (Subtle movement for bg elements)
            gsap.to(".philo-bg-shape", {
                y: -50,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // ✅ Force refresh
            ScrollTrigger.refresh();

        }, sectionRef);

        // ✅ Resize handler
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] text-white overflow-hidden z-20">

            {/* --- Background Elements --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* ✅ 1. Tech Grid - Removed mask-image ellipse */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-50" />

                {/* ✅ 2. Ambient Glows */}
                <div className="philo-bg-shape absolute top-[-10%] left-[20%] w-125 h-125 bg-red-600/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="philo-bg-shape absolute bottom-[-10%] right-[10%] w-150 h-150 bg-red-600/10 blur-[100px] rounded-full mix-blend-screen" />

                {/* ✅ 3. Floating Particles (Static visual for texture) */}
                <div className="absolute top-1/3 left-10 w-2 h-2 bg-red-500/30 rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-red-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-20 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

            </div>

            <div className="relative w-full h-full max-w-360 mx-auto flex flex-col justify-center z-10">

                {/* Section Header */}
                <div className="absolute top-24 sm:top-28 md:top-32 lg:top-40 left-0 w-full px-4 sm:px-6 md:px-14 text-center z-20">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
                        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase opacity-50">
                            Our Philosophy
                        </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
                        Here's how we think
                    </h2>
                </div>

                {/* ✅ Cards Container - Increased top margin significantly */}
                <div ref={containerRef} className="relative w-full max-w-4xl mx-auto h-auto md:h-[45vh] lg:h-[50vh] flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 md:gap-3 lg:gap-6 mt-32 sm:mt-40 md:mt-48 lg:mt-56 mb-12 md:mb-0 px-4 sm:px-6">

                    {/* ✅ Connecting SVG Line (Desktop) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0 overflow-visible" viewBox="0 0 1000 600" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#E31B23" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="#ff4444" stopOpacity="1" />
                                <stop offset="100%" stopColor="#E31B23" stopOpacity="0.1" />
                            </linearGradient>
                            <filter id="glowLineRed">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <path
                            ref={pathRef}
                            d="M 150 400 C 300 400, 300 200, 500 200 S 700 350, 850 350"
                            fill="none"
                            stroke="url(#redGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            filter="url(#glowLineRed)"
                        />
                    </svg>

                    {principles.map((item, i) => {
                        // ✅ Progressive activation - card is active if current index >= i
                        const isActive = activeIndex >= i;
                        const isCurrent = activeIndex === i;

                        return (
                            <div
                                key={item.id}
                                id={`philo-node-${i + 1}`}
                                ref={el => { cardsRef.current[i] = el; }}
                                className={`
                                relative z-10 w-full md:w-55 lg:w-60
                                flex flex-col gap-3 md:gap-3 p-4 md:p-4 rounded-2xl md:rounded-3xl
                                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                                border backdrop-blur-md
                                ${item.align}
                                ${isActive
                                        ? 'bg-zinc-900 border-red-500/50 shadow-[0_0_60px_-15px_rgba(227,27,35,0.2)] opacity-100'
                                        : 'bg-zinc-900/40 border-white/5 opacity-40 grayscale-[0.8]'
                                    }
                                ${isCurrent ? 'scale-105 md:scale-110' : isActive ? 'scale-100 md:scale-105' : 'scale-95'}
                            `}
                                style={{
                                    transform: window.innerWidth >= 768
                                        ? `rotate(${item.rotation}deg) translateY(${item.yOffset}px) scale(${isCurrent ? 1.1 : isActive ? 1.05 : 0.95})`
                                        : undefined,
                                }}
                            >
                                {/* ✅ Connector Dot */}
                                <div className={`
                                absolute w-4 h-4 rounded-full border-2 transition-colors duration-500 z-20
                                ${isActive ? 'bg-black border-red-500' : 'bg-black border-zinc-700'}
                                ${i === 0 ? 'top-1/2 -right-2' : i === 1 ? 'top-1/2 -left-2' : 'top-1/2 -left-2'}
                                hidden md:block
                             `}
                                    style={isActive ? { boxShadow: '0 0 10px #E31B23' } : {}}
                                ></div>

                                {/* Header Group */}
                                <div className="flex justify-between items-start">
                                    <span className={`font-display text-2xl md:text-3xl font-medium transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                                        {item.id}
                                    </span>
                                    <span className={`font-mono text-[9px] font-bold tracking-widest uppercase border px-2 py-1 rounded-full transition-colors duration-500 ${isActive ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-zinc-800 text-zinc-600'}`}>
                                        {item.label}
                                    </span>
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h3 className={`font-display text-base md:text-lg font-medium mb-1 md:mb-2 transition-colors duration-500 ${isActive ? 'text-red-50' : 'text-zinc-400'}`}>
                                        {item.heading}
                                    </h3>
                                    <p className={`font-sans text-xs md:text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                        {item.desc}
                                    </p>
                                </div>

                                {/* ✅ Decorative Corner Line - Shows on current card */}
                                {isCurrent && (
                                    <div className="absolute bottom-4 md:bottom-5 right-4 md:right-5 w-5 h-5 border-b border-r border-red-500/30 rounded-br-lg" />
                                )}

                            </div>
                        );
                    })}

                </div>

                {/* ✅ Progress Indicator */}
                <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {principles.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${activeIndex >= i
                                ? 'w-12 bg-red-500'
                                : 'w-8 bg-white/20'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};