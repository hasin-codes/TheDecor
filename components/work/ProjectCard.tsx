'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
    id?: string;
    slug: string;
    title: string;
    tags: string;
    image: string;
    className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, slug, title, tags, image, className }) => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const cardInnerRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        router.push(`/p/${slug}`);
    };

    useEffect(() => {
        if (!containerRef.current || !cardInnerRef.current) return;

        const card = cardInnerRef.current;

        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.2,
            onUpdate: (self) => {
                const p = self.progress;

                // Cylindrical Warp Logic
                const edgeThreshold = 0.15;
                let rX = 0;
                let scale = 1.0;

                const maxRot = 8;
                const maxScale = 1.02;

                if (p < edgeThreshold) {
                    // ENTERING (Bottom)
                    const factor = (edgeThreshold - p) / edgeThreshold;
                    rX = factor * maxRot;
                    scale = 1.0 + (factor * (maxScale - 1.0));
                } else if (p > (1 - edgeThreshold)) {
                    // EXITING (Top)
                    const factor = (p - (1 - edgeThreshold)) / edgeThreshold;
                    rX = factor * -maxRot;
                    scale = 1.0 + (factor * (maxScale - 1.0));
                } else {
                    // STABLE (Middle)
                    rX = 0;
                    scale = 1.0;
                }

                gsap.set(card, {
                    rotateX: rX,
                    scale: scale,
                    transformPerspective: 1200,
                    transformOrigin: 'center center',
                    force3D: true,
                    overwrite: 'auto'
                });
            }
        });

        return () => {
            st.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-full ${className || ''}`}
        >
            {/* Anchor Point for ConnectedLine */}
            {id && <div id={id} className="absolute top-1/2 left-1/2 w-1 h-1 pointer-events-none" />}

            <div
                ref={cardInnerRef}
                onClick={handleClick}
                className="group cursor-pointer flex flex-col gap-6 will-change-transform"
            >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden bg-gray-200 shadow-2xl transform-gpu">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                    />

                    {/* Floating Action Button */}
                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                            <ArrowUpRight className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-3 px-2">
                    <span className="text-xs font-bold tracking-widest text-black/60 uppercase">{tags}</span>
                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-black group-hover:text-[#FF4D00] transition-colors duration-300">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};
