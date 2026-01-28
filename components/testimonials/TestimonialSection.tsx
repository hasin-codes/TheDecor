'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        client: "Porsche",
        quote: "Lusion didn't just build a website; they crafted a digital legacy that resonates with the speed of our brand.",
        author: "Oliver Blume",
        role: "CEO, Porsche AG",
        year: "2024"
    },
    {
        id: 2,
        client: "Google",
        quote: "The level of technical execution coupled with artistic vision is unmatched. They pushed WebGL to its absolute limits.",
        author: "Sundar Pichai",
        role: "CEO, Google",
        year: "2023"
    },
    {
        id: 3,
        client: "Nike",
        quote: "We needed a campaign that felt like the future of sport. Lusion delivered an experience that stopped people in their tracks.",
        author: "John Donahoe",
        role: "CEO, Nike",
        year: "2024"
    },
    {
        id: 4,
        client: "Meta",
        quote: "Redefining what is possible in the browser. A partner that truly understands the metaverse.",
        author: "Mark Zuckerberg",
        role: "Founder, Meta",
        year: "2023"
    }
];

export const TestimonialSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const slides = slidesRef.current.filter(Boolean);
            const totalSlides = slides.length;

            if (totalSlides < 2) return;

            // 1. HORIZONTAL SCROLL with VIEWPORT PIN
            const scrollTween = gsap.to(trackRef.current, {
                xPercent: -(100 * (totalSlides - 1)) / totalSlides,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${100 * totalSlides}%`,
                    scrub: 1,
                    pin: true,
                    snap: {
                        snapTo: 1 / (totalSlides - 1),
                        duration: { min: 0.2, max: 0.5 },
                        ease: "power2.inOut"
                    },
                    onUpdate: (self) => {
                        // Update progress bar
                        if (progressRef.current) {
                            gsap.set(progressRef.current, { scaleX: self.progress });
                        }

                        // Velocity Skew Effect
                        const velocity = self.getVelocity();
                        const skew = velocity / 300;

                        gsap.to('.testimonial-content', {
                            skewX: skew,
                            overwrite: 'auto',
                            duration: 0.1
                        });
                    }
                }
            });

            // 2. PARALLAX BACKGROUND TEXT
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

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-[#050505] text-white overflow-hidden z-20"
        >
            {/* Section Header (Centered) */}
            <div className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-20 md:pt-24">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse"></div>
                    <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/60">Testimonials</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase text-white text-center">
                    Client Voices
                </h2>
            </div>

            {/* Horizontal Track - Width = 100% * numSlides */}
            <div ref={trackRef} className="flex h-full" style={{ width: `${testimonials.length * 100}vw` }}>
                {testimonials.map((item, i) => (
                    <div
                        key={item.id}
                        ref={el => { slidesRef.current[i] = el; }}
                        className="w-screen h-full flex-shrink-0 relative flex flex-col justify-center px-4 py-16 md:px-14 lg:px-24 overflow-hidden border-r border-white/5"
                    >
                        {/* Background Parallax Element */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none opacity-[0.03] z-0">
                            <h2 className="bg-parallax font-display font-black text-[30vw] md:text-[25vw] text-white leading-none whitespace-nowrap">
                                {item.client}
                            </h2>
                        </div>

                        {/* Content Container */}
                        <div className="testimonial-content relative z-10 max-w-5xl">

                            {/* Rating */}
                            <div className="flex gap-0.5 md:gap-1 mb-4 md:mb-8 text-brandRed">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star key={star} className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="relative">
                                <Quote className="absolute -top-4 -left-2 md:-top-8 md:-left-12 w-6 h-6 md:w-12 md:h-12 text-white/20 rotate-180" />
                                <h3 className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.2] md:leading-[1.1] tracking-tight text-white mb-6 md:mb-10 pr-4">
                                    &ldquo;{item.quote}&rdquo;
                                </h3>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 md:gap-6 border-t border-white/10 pt-4 md:pt-6 mt-4 md:mt-8">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center font-display font-bold text-sm md:text-lg flex-shrink-0">
                                    {item.client.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-display text-base md:text-xl font-bold tracking-wide truncate">{item.author}</div>
                                    <div className="font-mono text-[10px] md:text-xs text-white/50 tracking-widest uppercase mt-0.5 md:mt-1 truncate">{item.role}</div>
                                </div>

                                <div className="flex-1"></div>

                                <div className="hidden md:flex items-center gap-2 font-mono text-xs text-white/30 flex-shrink-0">
                                    <span>EST. {item.year}</span>
                                </div>
                            </div>

                        </div>

                        {/* Slide Counter */}
                        <div className="absolute bottom-4 right-4 md:bottom-10 md:right-14 font-mono text-[10px] md:text-xs font-bold text-white/20 tracking-widest z-10">
                            {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                        </div>

                    </div>
                ))}
            </div>

            {/* Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-white/5 z-30">
                <div ref={progressRef} className="w-full h-full bg-brandRed origin-left scale-x-0"></div>
            </div>

            {/* Visual Overlays */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-32 lg:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 md:w-32 lg:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>

            {/* Subtle Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity: 0.05
            }}></div>
        </section>
    );
};
