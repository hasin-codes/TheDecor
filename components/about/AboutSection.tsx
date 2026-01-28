'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const pinWrapperRef = useRef<HTMLDivElement>(null);

    // Elements
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Text Elements
    const leftContentRef = useRef<HTMLDivElement>(null);
    const rightContentRef = useRef<HTMLDivElement>(null);
    const overlayTextRef = useRef<HTMLDivElement>(null);

    // State refs
    const isPlayingRef = useRef(false);
    const isReversingRef = useRef(false);
    const isPinnedRef = useRef(false);
    const hasCompletedRef = useRef(false);
    const shuttersOpenRef = useRef(false);

    useEffect(() => {
        if (!sectionRef.current || !videoRef.current) return;

        const video = videoRef.current;
        const section = sectionRef.current;

        // Lock scroll during pinned state
        const lockScroll = () => {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        };

        const unlockScroll = () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };

        // Open shutters animation
        const openShutters = () => {
            if (shuttersOpenRef.current) return;
            shuttersOpenRef.current = true;

            const tl = gsap.timeline();
            tl.to(leftPanelRef.current, { xPercent: -100, duration: 1, ease: "power2.inOut" }, 0);
            tl.to(rightPanelRef.current, { xPercent: 100, duration: 1, ease: "power2.inOut" }, 0);

            tl.fromTo(leftContentRef.current,
                { skewX: 0 }, { skewX: 8, duration: 0.4, ease: "power2.in" }, 0
            ).to(leftContentRef.current,
                { skewX: 0, duration: 0.4, ease: "power2.out" }, 0.4
            );

            tl.fromTo(rightContentRef.current,
                { skewX: 0 }, { skewX: -8, duration: 0.4, ease: "power2.in" }, 0
            ).to(rightContentRef.current,
                { skewX: 0, duration: 0.4, ease: "power2.out" }, 0.4
            );

            tl.fromTo(videoRef.current,
                { scale: 1.15, filter: "brightness(0.6) saturate(0.6)" },
                { scale: 1.0, filter: "brightness(1.1) saturate(1.2)", duration: 0.8, ease: "power2.inOut" },
                0
            );

            return tl;
        };

        // Close shutters animation
        const closeShutters = () => {
            if (!shuttersOpenRef.current) return;
            shuttersOpenRef.current = false;

            const tl = gsap.timeline();
            tl.to(leftPanelRef.current, { xPercent: 0, duration: 0.8, ease: "power2.inOut" }, 0);
            tl.to(rightPanelRef.current, { xPercent: 0, duration: 0.8, ease: "power2.inOut" }, 0);

            tl.fromTo(videoRef.current,
                { filter: "brightness(1.1) saturate(1.2)" },
                { filter: "brightness(0.6) saturate(0.6)", duration: 0.6, ease: "power2.inOut" },
                0
            );

            return tl;
        };

        // Play video forward at 2.2x
        const playForward = () => {
            if (isPlayingRef.current) return;
            isPlayingRef.current = true;
            isReversingRef.current = false;

            video.playbackRate = 2.2;
            video.play();
        };

        // Play video in reverse
        const playReverse = () => {
            if (isReversingRef.current) return;
            isReversingRef.current = true;
            isPlayingRef.current = false;
            video.pause();

            const reverseInterval = setInterval(() => {
                if (video.currentTime <= 0.1) {
                    clearInterval(reverseInterval);
                    video.currentTime = 0;
                    isReversingRef.current = false;

                    // Close shutters and unpin
                    closeShutters()?.eventCallback('onComplete', () => {
                        isPinnedRef.current = false;
                        hasCompletedRef.current = false;
                        unlockScroll();

                        // Scroll back to section start
                        gsap.to(window, {
                            scrollTo: { y: section.offsetTop, autoKill: false },
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    });
                } else {
                    video.currentTime = Math.max(0, video.currentTime - 0.05);
                }
            }, 16);
        };

        // Handle video timeupdate
        const handleTimeUpdate = () => {
            if (!isPlayingRef.current) return;

            // 1 second before end - scroll to next section
            if (video.duration - video.currentTime <= 1 && !hasCompletedRef.current) {
                hasCompletedRef.current = true;
                isPlayingRef.current = false;
                isPinnedRef.current = false;
                unlockScroll();

                const nextSection = section.nextElementSibling as HTMLElement;
                if (nextSection) {
                    gsap.to(window, {
                        scrollTo: { y: nextSection.offsetTop, autoKill: false },
                        duration: 1.2,
                        ease: "power2.inOut"
                    });
                }
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        // Handle scroll/wheel events
        const handleWheel = (e: WheelEvent) => {
            const rect = section.getBoundingClientRect();
            const isAtSection = rect.top <= 50 && rect.top >= -50;

            if (!isAtSection && !isPinnedRef.current) return;

            // First scroll down at section - pin and start
            if (e.deltaY > 0 && isAtSection && !isPinnedRef.current && !hasCompletedRef.current) {
                e.preventDefault();
                isPinnedRef.current = true;

                // Scroll to section top to hide navbar, then lock
                gsap.to(window, {
                    scrollTo: { y: section.offsetTop, autoKill: false },
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        lockScroll();
                        openShutters()?.eventCallback('onComplete', () => {
                            playForward();
                        });
                    }
                });
                return;
            }

            // During pinned state
            if (isPinnedRef.current) {
                e.preventDefault();

                // Scroll up - reverse
                if (e.deltaY < 0 && !hasCompletedRef.current) {
                    playReverse();
                }
            }
        };

        // Touch handlers
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = section.getBoundingClientRect();
            const isAtSection = rect.top <= 50 && rect.top >= -50;
            const deltaY = touchStartY - e.touches[0].clientY;

            if (!isAtSection && !isPinnedRef.current) return;

            // Swipe up - start
            if (deltaY > 30 && isAtSection && !isPinnedRef.current && !hasCompletedRef.current) {
                e.preventDefault();
                isPinnedRef.current = true;
                lockScroll();

                openShutters()?.eventCallback('onComplete', () => {
                    playForward();
                });
            }

            // During pinned - swipe down to reverse
            if (isPinnedRef.current && deltaY < -30 && !hasCompletedRef.current) {
                e.preventDefault();
                playReverse();
            }

            touchStartY = e.touches[0].clientY;
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            unlockScroll();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-screen z-20">
            <div ref={pinWrapperRef} className="relative w-full h-screen">
                <div ref={stickyRef} className="relative w-full h-screen overflow-hidden">

                    {/* --- VIDEO LAYER --- */}
                    <div className="absolute inset-0 z-0 bg-background flex items-center justify-center">
                        <video
                            ref={videoRef}
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover will-change-transform"
                            style={{ filter: 'brightness(0.6) saturate(0.6)' }}
                        >
                            <source src="/seq/video.mp4" type="video/mp4" />
                        </video>

                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(220,50,50,0.08) 0%, rgba(50,100,220,0.06) 50%, rgba(180,100,255,0.05) 100%)',
                                mixBlendMode: 'overlay',
                            }}
                        />

                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                                mixBlendMode: 'soft-light',
                            }}
                        />

                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay pointer-events-none" />
                    </div>

                    {/* --- LEFT SHUTTER --- */}
                    <div
                        ref={leftPanelRef}
                        className="absolute top-0 left-0 w-[50%] h-full bg-background z-10 border-r border-foreground/5 flex flex-col justify-center px-6 md:px-12 lg:pl-20 overflow-hidden will-change-transform"
                    >
                        <div ref={leftContentRef} className="flex flex-col gap-6 max-w-lg origin-right will-change-transform">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-2 h-2 bg-brandRed rounded-full animate-pulse" />
                                <span className="font-mono text-xs font-bold tracking-widest text-brandRed uppercase">[ System.Init ]</span>
                            </div>

                            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.9] text-foreground tracking-tighter uppercase">
                                Breach<br />The<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-foreground">Norm</span>
                            </h2>

                            <div className="w-12 h-1 bg-brandRed mt-2" />

                            <p className="font-sans text-lg md:text-xl font-medium text-foreground/70 leading-relaxed mt-4">
                                We dismantle the barrier between digital function and artistic expression.
                            </p>
                        </div>

                        <div className="absolute bottom-10 left-10 md:left-20 font-mono text-xs text-foreground/30">
                            COORD: 34.0522° N, 118.2437° W
                        </div>
                    </div>

                    {/* --- RIGHT SHUTTER --- */}
                    <div
                        ref={rightPanelRef}
                        className="absolute top-0 right-0 w-[50%] h-full bg-background z-10 border-l border-foreground/5 flex flex-col justify-center px-6 md:px-12 lg:pr-20 items-end text-right overflow-hidden will-change-transform"
                    >
                        <div ref={rightContentRef} className="flex flex-col gap-6 max-w-lg origin-left items-end will-change-transform">
                            <span className="font-mono text-xs font-bold tracking-widest text-brandRed/60 uppercase mb-4 border border-brandRed/20 px-3 py-1 rounded-full">
                                Est. 2024 — Future
                            </span>

                            <p className="font-display text-sm md:text-base font-bold tracking-widest leading-loose text-foreground uppercase max-w-[200px]">
                                Decor is an advanced digital production studio based in the UK.
                            </p>

                            <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-xs mt-4">
                                Obsessed with performance, interaction, and the spaces in between. We build what hasn&apos;t been named yet.
                            </p>

                            <div className="mt-8">
                                <button className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group">
                                    <ArrowRight className="w-6 h-6 group-hover:-rotate-45 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        <div className="absolute top-10 right-10 md:right-20 flex flex-col gap-1 items-end opacity-20">
                            <div className="flex gap-1">
                                <div className="w-1 h-8 bg-foreground" />
                                <div className="w-2 h-8 bg-foreground" />
                                <div className="w-1 h-8 bg-foreground" />
                                <div className="w-4 h-8 bg-foreground" />
                                <div className="w-1 h-8 bg-foreground" />
                            </div>
                            <span className="font-mono text-[10px]">ID_89201</span>
                        </div>
                    </div>

                    {/* --- OVERLAY --- */}
                    <div
                        ref={overlayTextRef}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
                    >
                        <div id="about-reactor-target" className="absolute top-1/2 left-1/2 w-1 h-1" />
                    </div>

                </div>
            </div>
        </section>
    );
};