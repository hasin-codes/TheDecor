'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const wrapperRef = useRef<HTMLElement>(null);

    useIsomorphicLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        // ✅ Global ScrollTrigger configuration
        ScrollTrigger.config({
            autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
            // ✅ Better mobile handling - only ignore toolbar resize, not orientation
            ignoreMobileResize: true,
            limitCallbacks: true  // Improve performance
        });

        // ✅ Normalize scroll on mount
        ScrollTrigger.normalizeScroll(true);

        // ✅ Initial refresh after a brief delay to ensure DOM is ready
        const initTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        // ✅ Debounced resize handler with orientation check
        let resizeTimer: NodeJS.Timeout;
        let lastOrientation = window.orientation;

        const handleResize = () => {
            clearTimeout(resizeTimer);

            // Check if it's an actual orientation change (should refresh immediately)
            const currentOrientation = window.orientation;
            if (lastOrientation !== currentOrientation) {
                lastOrientation = currentOrientation;
                ScrollTrigger.refresh();
                return;
            }

            // Otherwise, debounce
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        // ✅ Handle visibility change (tab switching)
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                // Refresh when tab becomes visible again
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // ✅ Cleanup
        return () => {
            clearTimeout(initTimer);
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            // ✅ Kill all ScrollTrigger instances
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            // ✅ Disable normalize scroll
            ScrollTrigger.normalizeScroll(false);
        };
    }, []);

    return (
        <main
            ref={wrapperRef}
            className="relative w-full min-h-screen overflow-x-hidden"
            style={{
                isolation: 'isolate'
                // ✅ REMOVED willChange - let individual animated components handle this
            }}
        >
            {children}
        </main>
    );
};