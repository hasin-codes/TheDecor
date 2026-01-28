'use client';

import { useEffect } from 'react';

export const ZoomBlocker = () => {
    useEffect(() => {
        // 1. Prevent Ctrl + Wheel (Zoom on desktop)
        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        // 2. Prevent Keyboard Shortcuts (Ctrl + +, Ctrl + -, Ctrl + 0)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '+' || e.key === '0')) {
                e.preventDefault();
            }
        };

        // 3. Prevent Touch Gestures (Pinch to zoom) - Note: standard touch-action CSS is better, but this adds a layer
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 1) {
                // e.preventDefault(); // Passive listeners cannot preventDefault. We rely on touch-action: none/manipulation in CSS
            }
        };

        // Add non-passive event listener where possible or necessary
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('touchstart', handleTouchStart, { passive: true });

        return () => {
            document.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    return (
        <style jsx global>{`
      /* Disable double-tap zoom on some mobile browsers */
      body {
        touch-action: pan-x pan-y;
      }
    `}</style>
    );
};
