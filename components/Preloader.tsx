'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const videoLoaded = useRef(false);
    const minTimeElapsed = useRef(false);

    const checkComplete = useCallback(() => {
        if (videoLoaded.current && minTimeElapsed.current && !isComplete) {
            setProgress(100);
            setTimeout(() => {
                setIsComplete(true);
                setTimeout(onComplete, 600);
            }, 400);
        }
    }, [onComplete, isComplete]);

    useEffect(() => {
        // Create video element to preload
        const video = document.createElement('video');
        video.src = '/seq/video.mp4';
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';

        let animatedProgress = 0;

        // Animate progress smoothly
        const progressInterval = setInterval(() => {
            if (!videoLoaded.current) {
                // Slow progress while loading (up to 85%)
                if (animatedProgress < 85) {
                    animatedProgress += 0.3;
                    setProgress(Math.floor(animatedProgress));
                }
            } else if (animatedProgress < 100) {
                // Fast progress when loaded
                animatedProgress += 3;
                setProgress(Math.min(100, Math.floor(animatedProgress)));
            }
        }, 30);

        // Track video loading
        const handleCanPlayThrough = () => {
            videoLoaded.current = true;
            checkComplete();
        };

        const handleProgress = () => {
            if (video.buffered.length > 0 && video.duration > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const loadedPercent = (bufferedEnd / video.duration) * 100;
                if (loadedPercent >= 95) {
                    videoLoaded.current = true;
                    checkComplete();
                }
            }
        };

        video.addEventListener('canplaythrough', handleCanPlayThrough);
        video.addEventListener('progress', handleProgress);
        video.load();

        // Minimum 3 second loading time for effect
        setTimeout(() => {
            minTimeElapsed.current = true;
            checkComplete();
        }, 3000);

        // Fallback: force complete after 8 seconds
        const timeout = setTimeout(() => {
            videoLoaded.current = true;
            minTimeElapsed.current = true;
            setProgress(100);
            setIsComplete(true);
            setTimeout(onComplete, 600);
        }, 8000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timeout);
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
            video.removeEventListener('progress', handleProgress);
        };
    }, [onComplete, checkComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
                >
                    {/* Center loader bar */}
                    <div className="relative w-28 h-[3px] bg-foreground/10 overflow-hidden">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-foreground"
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
                </motion.div>
            )}
        </AnimatePresence>
    );
};
