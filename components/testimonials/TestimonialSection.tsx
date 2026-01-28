'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Star, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// --- Data Structure with Card Types ---
type CardType = 'visual' | 'editorial' | 'stat';

interface Testimonial {
    id: number;
    type: CardType;
    client?: string;
    quote?: string;
    author?: string;
    role?: string;
    image?: string;
    statVal?: string;
    statLabel?: string;
    accentColor?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        type: 'visual',
        client: "Sophia Lane",
        quote: "Working with this agency has been a game changer. Their content ideas, ad strategies, and responsiveness exceeded expectations.",
        author: "Sophia Lane",
        role: "CEO of Blossom",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
    },
    {
        id: 2,
        type: 'editorial',
        client: "Jakkas",
        quote: "This agency completely transformed our online presence. Their creative content, smart ad planning, and quick support made every campaign perform better than expected.",
        author: "Akkas Mia",
        role: "CEO of Jakkas",
    },
    {
        id: 3,
        type: 'stat',
        statVal: "98%",
        statLabel: "Of our clients see improved engagement within the first 30 days."
    },
    {
        id: 4,
        type: 'visual',
        client: "Nike",
        quote: "A digital experience that stopped people in their tracks. Absolute perfection.",
        author: "Marcus J.",
        role: "Brand Director",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1364&auto=format&fit=crop"
    },
    {
        id: 5,
        type: 'editorial',
        client: "Stripe",
        quote: "The technical execution is unmatched. They pushed the browser to its absolute limits.",
        author: "Patrick C.",
        role: "CTO",
    }
];

export const TestimonialSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<ScrollTrigger | null>(null);
    const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

    useIsomorphicLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const section = sectionRef.current;

            if (!track || !section) return;

            // ✅ Function to calculate scroll distance
            const getScrollAmount = () => {
                const trackWidth = track.scrollWidth;
                const sectionWidth = section.offsetWidth;
                return -(trackWidth - sectionWidth);
            };

            // ✅ Horizontal Scroll Trigger with proper invalidation
            const tween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount())}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // ✅ Recalculates on resize
                    onUpdate: (self) => {
                        // ✅ Progress bar
                        if (progressRef.current) {
                            gsap.set(progressRef.current, { scaleX: self.progress });
                        }

                        // ✅ Velocity Skew
                        const velocity = self.getVelocity();
                        const skew = gsap.utils.clamp(-3, 3, velocity / 600);
                        gsap.to('.t-card', {
                            skewX: skew,
                            duration: 0.15,
                            overwrite: 'auto',
                            ease: "power1.out"
                        });
                    }
                }
            });

            triggerRef.current = tween.scrollTrigger!;

            // ✅ Force refresh after setup
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
            if (scrollTweenRef.current) {
                scrollTweenRef.current.kill();
            }
        };
    }, []);

    // Manual Navigation Helpers
    const scrollNext = () => {
        if (!triggerRef.current) return;

        // Kill existing tween
        if (scrollTweenRef.current) {
            scrollTweenRef.current.kill();
        }

        const currentScroll = triggerRef.current.scroll();
        const scrollAmount = window.innerWidth * 0.8; // Scroll by viewport width

        scrollTweenRef.current = gsap.to(window, {
            scrollTo: {
                y: currentScroll + scrollAmount,
                autoKill: true
            },
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                scrollTweenRef.current = null;
            }
        });
    };

    const scrollPrev = () => {
        if (!triggerRef.current) return;

        // Kill existing tween
        if (scrollTweenRef.current) {
            scrollTweenRef.current.kill();
        }

        const currentScroll = triggerRef.current.scroll();
        const scrollAmount = window.innerWidth * 0.8;

        scrollTweenRef.current = gsap.to(window, {
            scrollTo: {
                y: currentScroll - scrollAmount,
                autoKill: true
            },
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                scrollTweenRef.current = null;
            }
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-[#050505] text-white z-20"
        >
            {/* --- HEADER UI (Fixed absolute to the pinned section) --- */}
            <div className="absolute top-0 left-0 right-0 w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-24 sm:pt-28 md:pt-32 z-30">
                <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 w-full max-w-[1440px] mx-auto text-center">

                    {/* Title */}
                    <div className="max-w-xl text-center">
                        <div className="flex items-center gap-2 mb-3 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
                            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#E31B23]">
                                User Review
                            </span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[0.95]">
                            Client Testimonials
                        </h2>
                    </div>

                    {/* Controls - Centered below title */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6 justify-center">
                        <div className="flex gap-2">
                            <button
                                onClick={scrollPrev}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Previous testimonial"
                            >
                                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Next testimonial"
                            >
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>

                        <button className="h-10 md:h-12 px-4 md:px-6 bg-white text-black rounded-full font-sans font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors shadow-lg flex items-center gap-1 md:gap-2 group">
                            Get Started
                            <div className="w-1 h-1 rounded-full bg-black"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOVING TRACK --- */}
            <div className="absolute inset-x-0 bottom-0 h-[65vh] flex items-end">
                <div ref={trackRef} className="flex items-center gap-3 md:gap-4 pl-4 sm:pl-6 md:pl-10 h-[40vh] sm:h-[45vh] md:h-[55vh] w-max pb-8 sm:pb-12 md:pb-16">

                    {testimonials.map((item) => (
                        <div key={item.id} className="t-card relative h-full flex-shrink-0">

                            {/* TYPE: VISUAL (Image Overlay) */}
                            {item.type === 'visual' && (
                                <div className="w-[60vw] sm:w-[50vw] md:w-[300px] lg:w-[340px] h-full rounded-xl md:rounded-2xl overflow-hidden relative group">
                                    <img
                                        src={item.image}
                                        alt={item.client || 'Testimonial'}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-4 md:gap-6 text-white">
                                        <div className="flex gap-1 text-orange-400">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />)}
                                        </div>
                                        <p className="font-sans text-sm md:text-base font-medium leading-relaxed opacity-90">
                                            &ldquo;{item.quote}&rdquo;
                                        </p>
                                        <div className="border-t border-white/20 pt-3 md:pt-4 mt-2">
                                            <p className="font-display font-bold text-xs md:text-sm">{item.author}</p>
                                            <p className="font-mono text-[8px] md:text-[10px] opacity-60 uppercase">{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TYPE: EDITORIAL (Text Focus) */}
                            {item.type === 'editorial' && (
                                <div className="w-[60vw] sm:w-[50vw] md:w-[300px] lg:w-[340px] h-full bg-[#111] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col justify-between shadow-sm border border-white/5 group hover:border-white/20 transition-colors">
                                    <div className="flex gap-1 text-orange-500">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />)}
                                    </div>

                                    <blockquote className="font-display text-sm sm:text-base md:text-lg font-medium leading-relaxed text-white my-3 md:my-5">
                                        &ldquo;{item.quote}&rdquo;
                                    </blockquote>

                                    <div className="flex items-center justify-between mt-4 md:mt-8">
                                        <div>
                                            <p className="font-display font-bold text-sm md:text-base text-white">{item.author}</p>
                                            <p className="font-mono text-[8px] md:text-[10px] text-white/40 uppercase tracking-wider">{item.role}</p>
                                        </div>
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors flex-shrink-0">
                                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 -rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TYPE: STAT (Bold Box) */}
                            {item.type === 'stat' && (
                                <div className="w-[60vw] sm:w-[50vw] md:w-[300px] lg:w-[340px] h-full rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col justify-between text-white relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#880808] via-[#d70000] to-[#ff4d4d]"></div>

                                    <div className="relative z-10 font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-70 border-b border-white/20 pb-3 md:pb-4">
                                        Facts & Numbers
                                    </div>

                                    <div className="relative z-10 flex flex-col gap-2 md:gap-2 my-2">
                                        <h3 className="font-display text-[2.5rem] sm:text-[3rem] md:text-[4rem] leading-[0.8] font-bold tracking-tighter">
                                            {item.statVal}
                                        </h3>
                                        <p className="font-sans text-sm md:text-base font-medium leading-relaxed opacity-90 max-w-xs">
                                            {item.statLabel}
                                        </p>
                                    </div>

                                    {/* Decor */}
                                    <ArrowUpRight className="absolute top-6 right-6 md:top-8 md:right-8 w-4 h-4 md:w-6 md:h-6 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            )}

                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-[10vw] md:w-[5vw] flex-shrink-0"></div>

                </div>
            </div>

            {/* Progress Line */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-white/5 z-30">
                <div
                    ref={progressRef}
                    className="h-full bg-brandRed origin-left scale-x-0"
                ></div>
            </div>

            {/* Visual Overlays */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-32 lg:w-64 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-32 lg:w-64 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>
        </section>
    );
};