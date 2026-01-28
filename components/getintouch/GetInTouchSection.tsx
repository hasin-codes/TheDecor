'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '@/components/footer';

gsap.registerPlugin(ScrollTrigger);

export const GetInTouchSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    // No animations needed, just a wrapper
    useEffect(() => {
        // Cleanup if any old triggers exist
        ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);


    return (
        <section ref={sectionRef} className="relative w-full h-auto bg-[#050505] overflow-hidden z-30">
            {/* Direct render of Footer since it now contains the main CTA */}
            <div className="relative w-full z-40">
                <Footer />
            </div>
        </section>
    );
};
