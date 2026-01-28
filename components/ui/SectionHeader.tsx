'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    className = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const chars = containerRef.current!.querySelectorAll('.flip-char');

            // Initial state
            gsap.set(chars, { rotateX: -90, opacity: 0 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top 80%',
                onEnter: () => {
                    if (hasAnimatedRef.current) return;
                    hasAnimatedRef.current = true;

                    gsap.to(chars, {
                        rotateX: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                        stagger: 0.03
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [title]);

    // Split title into characters
    const characters = title.split('').map((char, i) => (
        <span
            key={i}
            className="flip-char inline-block"
            style={{ transformOrigin: 'center bottom', perspective: '500px' }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    return (
        <div
            ref={containerRef}
            className={`flex flex-col items-center text-center pt-24 md:pt-28 pb-8 ${className}`}
        >
            {subtitle && (
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
                    <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50">
                        {subtitle}
                    </span>
                </div>
            )}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase">
                {characters}
            </h2>
        </div>
    );
};
