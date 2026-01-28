"use client";
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const principles = [
    {
        id: '01',
        label: 'SYSTEM',
        heading: 'Digital Ecology',
        desc: 'We view digital interfaces not as static pages, but as living ecosystems. Components interact, states evolve, and the system responds organically to user presence.',
        stat: '98% INTERACTIVITY'
    },
    {
        id: '02',
        label: 'PRECISION',
        heading: 'Atomic Design',
        desc: 'Complexity arises from simplicity. We engineer from the atomic level—typography, spacing, motion—ensuring coherence across every viewport dimension.',
        stat: '0.01s LATENCY'
    },
    {
        id: '03',
        label: 'FUTURE',
        heading: 'Next Paradigm',
        desc: 'We do not iterate on current trends. We seek the breaking point of web technologies to define what comes after the modern internet.',
        stat: 'WEBGL / GLSL'
    }
];

export const PhilosophySection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            const slides = slidesRef.current.filter(Boolean);
            const totalSlides = slides.length;

            if (totalSlides < 2 || !trackRef.current || !sectionRef.current) return;

            // Ensure proper width
            gsap.set(trackRef.current, {
                width: `${totalSlides * 100}vw`
            });

            // HORIZONTAL SCROLL with VIEWPORT PIN
            const scrollTween = gsap.to(trackRef.current, {
                x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / (totalSlides - 1),
                        duration: { min: 0.2, max: 0.5 },
                        ease: "power2.inOut"
                    },
                    onUpdate: (self) => {
                        if (progressRef.current) {
                            gsap.set(progressRef.current, { scaleX: self.progress });
                        }
                    }
                }
            });

            // PARALLAX BACKGROUND TEXT
            slides.forEach((slide) => {
                const bgText = slide?.querySelector('.bg-parallax');
                if (bgText) {
                    gsap.to(bgText, {
                        xPercent: 50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: slide,
                            containerAnimation: scrollTween,
                            start: "left right",
                            end: "right left",
                            scrub: true
                        }
                    });
                }
            });

            // Force refresh
            ScrollTrigger.refresh();

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-[#0a0a0a] text-white z-20">

            {/* Background Grid Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 flex justify-center h-full">
                <div className="w-full max-w-[1440px] flex justify-between h-full px-14">
                    <div className="w-px h-full bg-white"></div>
                    <div className="w-px h-full bg-white hidden md:block"></div>
                    <div className="w-px h-full bg-white hidden md:block"></div>
                    <div className="w-px h-full bg-white"></div>
                </div>
            </div>

            {/* Section Header (Centered) */}
            <div className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-20 md:pt-24">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse"></div>
                    <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/60">DNA_Sequence</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase text-white text-center">
                    Operating System
                </h2>
            </div>

            {/* Horizontal Track - Width = 100% * numSlides */}
            <div ref={trackRef} className="flex h-full" style={{ width: `${principles.length * 100}vw` }}>
                {principles.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(el) => { slidesRef.current[index] = el; }}
                        className="w-screen h-full flex-shrink-0 relative flex flex-col justify-center px-6 md:px-14 lg:px-24 overflow-hidden border-r border-white/5"
                    >
                        {/* Background Parallax Element */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none opacity-[0.03] z-0">
                            <h2 className="bg-parallax font-display font-black text-[30vw] md:text-[25vw] text-white leading-none whitespace-nowrap">
                                {item.heading.split(' ')[0]}
                            </h2>
                        </div>

                        {/* Visual Accent - Unique per card */}
                        <div className="absolute top-1/2 right-0 md:right-[10%] -translate-y-1/2 opacity-10 pointer-events-none select-none z-0">
                            {index === 0 && (
                                <svg width="400" height="400" viewBox="0 0 100 100" className="w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] stroke-brandRed fill-none stroke-[0.5]">
                                    <circle cx="50" cy="50" r="45" strokeDasharray="4 2" className="animate-[spin_20s_linear_infinite]" />
                                    <circle cx="50" cy="50" r="30" strokeOpacity="0.5" />
                                    <path d="M50 5 L50 95 M5 50 L95 50" strokeOpacity="0.2" />
                                </svg>
                            )}
                            {index === 1 && (
                                <svg width="400" height="400" viewBox="0 0 100 100" className="w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] stroke-brandRed fill-none stroke-[0.5]">
                                    <rect x="20" y="20" width="60" height="60" strokeDasharray="10 5" className="animate-[spin_15s_linear_infinite_reverse]" />
                                    <rect x="35" y="35" width="30" height="30" strokeOpacity="0.5" />
                                    <line x1="0" y1="0" x2="100" y2="100" strokeOpacity="0.2" />
                                    <line x1="100" y1="0" x2="0" y2="100" strokeOpacity="0.2" />
                                </svg>
                            )}
                            {index === 2 && (
                                <svg width="400" height="400" viewBox="0 0 100 100" className="w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] stroke-brandRed fill-none stroke-[0.5]">
                                    <path d="M0 50 Q 25 10, 50 50 T 100 50" className="animate-pulse" />
                                    <path d="M0 60 Q 25 20, 50 60 T 100 60" opacity="0.5" />
                                    <path d="M0 40 Q 25 0, 50 40 T 100 40" opacity="0.5" />
                                </svg>
                            )}
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 max-w-4xl">
                            {/* ID Indicator */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-sm md:text-base font-bold text-brandRed">{item.id}</span>
                                <div className="h-px w-12 bg-white/20"></div>
                                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-brandRed/80">
                                    {item.label}
                                </span>
                            </div>

                            {/* Heading */}
                            <h3 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.95] text-white tracking-tighter uppercase mb-8">
                                {item.heading.split(' ').map((word, i) => (
                                    <React.Fragment key={i}>
                                        {word}
                                        {i === 0 && <br />}
                                    </React.Fragment>
                                ))}
                            </h3>

                            {/* Description */}
                            <p className="max-w-lg text-base md:text-lg text-white/50 leading-relaxed font-medium mb-10">
                                {item.desc}
                            </p>

                            {/* Stat */}
                            <div className="flex items-center justify-between border-t border-white/10 pt-6 w-full max-w-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">Metric_Output</span>
                                    <span className="font-mono text-sm md:text-base font-bold text-white uppercase tracking-wider">
                                        {item.stat}
                                    </span>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group overflow-hidden relative transition-colors duration-500 hover:border-brandRed cursor-pointer">
                                    <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>

                        {/* Slide Counter */}
                        <div className="absolute bottom-10 right-6 md:right-14 font-mono text-[10px] md:text-xs font-bold text-white/20 tracking-widest z-10">
                            {String(index + 1).padStart(2, '0')} / {String(principles.length).padStart(2, '0')}
                        </div>

                    </div>
                ))}
            </div>

            {/* Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-white/5 z-30">
                <div ref={progressRef} className="w-full h-full bg-brandRed origin-left scale-x-0"></div>
            </div>

            {/* Visual Overlays */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-32 lg:w-64 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 md:w-32 lg:w-64 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none"></div>

        </section>
    );
};
