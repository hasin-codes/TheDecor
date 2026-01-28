'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Refs
    const videoLoaded = useRef(false);
    const minTimeElapsed = useRef(false);
    const completionTriggered = useRef(false); // ✅ Prevent double-trigger
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const minTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // ✅ Stable callback without dependencies
    const checkComplete = useCallback(() => {
        if (
            videoLoaded.current &&
            minTimeElapsed.current &&
            !completionTriggered.current
        ) {
            completionTriggered.current = true;
            setProgress(100);

            setTimeout(() => {
                setIsComplete(true);
                setTimeout(onComplete, 600);
            }, 400);
        }
    }, [onComplete]);

    useEffect(() => {
        // ✅ SSR protection
        if (typeof window === 'undefined') return;

        // Create video element to preload
        const video = document.createElement('video');
        videoRef.current = video;
        video.src = '/seq/video.mp4';
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';

        let animatedProgress = 0;

        // ✅ Smoother progress animation
        progressIntervalRef.current = setInterval(() => {
            if (!videoLoaded.current) {
                // Slow progress while loading (up to 85%)
                if (animatedProgress < 85) {
                    animatedProgress += 0.5;
                    setProgress(Math.round(animatedProgress));
                }
            } else if (animatedProgress < 100) {
                // Fast progress when loaded
                animatedProgress += 4;
                setProgress(Math.min(100, Math.round(animatedProgress)));
            }
        }, 30);

        // Track video loading
        const handleCanPlayThrough = () => {
            if (!videoLoaded.current) {
                videoLoaded.current = true;
                checkComplete();
            }
        };

        const handleProgress = () => {
            if (video.buffered.length > 0 && video.duration > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const loadedPercent = (bufferedEnd / video.duration) * 100;

                if (loadedPercent >= 95 && !videoLoaded.current) {
                    videoLoaded.current = true;
                    checkComplete();
                }
            }
        };

        // ✅ Error handling
        const handleError = () => {
            console.warn('Video preload failed, continuing anyway');
            if (!videoLoaded.current) {
                videoLoaded.current = true;
                checkComplete();
            }
        };

        video.addEventListener('canplaythrough', handleCanPlayThrough);
        video.addEventListener('progress', handleProgress);
        video.addEventListener('error', handleError);

        // Start loading
        video.load();

        // Minimum 3 second loading time for effect
        minTimeoutRef.current = setTimeout(() => {
            minTimeElapsed.current = true;
            checkComplete();
        }, 3000);

        // Fallback: force complete after 8 seconds
        fallbackTimeoutRef.current = setTimeout(() => {
            if (!completionTriggered.current) {
                videoLoaded.current = true;
                minTimeElapsed.current = true;
                completionTriggered.current = true;
                setProgress(100);
                setIsComplete(true);
                setTimeout(onComplete, 600);
            }
        }, 8000);

        // ✅ CLEANUP
        return () => {
            // Clear intervals and timeouts
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            if (minTimeoutRef.current) {
                clearTimeout(minTimeoutRef.current);
            }
            if (fallbackTimeoutRef.current) {
                clearTimeout(fallbackTimeoutRef.current);
            }

            // Remove event listeners
            if (videoRef.current) {
                videoRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
                videoRef.current.removeEventListener('progress', handleProgress);
                videoRef.current.removeEventListener('error', handleError);

                // Clean up video element
                videoRef.current.src = '';
                videoRef.current.load();
                videoRef.current = null;
            }
        };
    }, [onComplete, checkComplete]);

    return (
        <AnimatePresence mode="wait">
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
                >
                    {/* Center loader bar */}
                    <div className="relative w-28 h-[3px] bg-foreground/10 overflow-hidden rounded-full">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-foreground rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.05, ease: 'linear' }}
                        />
                    </div>

                    {/* Progress number - bottom left */}
                    <div className="fixed bottom-8 left-8 md:bottom-12 md:left-12">
                        <div className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-foreground/80 tracking-tighter tabular-nums leading-none">
                            {String(progress).padStart(3, '0')}
                        </div>
                    </div>

                    {/* ✅ Optional: Loading text for accessibility */}
                    <span className="sr-only">Loading: {progress}%</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};