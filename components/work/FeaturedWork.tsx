'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data/projects';
import { Project, ProjectType } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

const filters: ProjectType[] = ['ALL', 'SAAS', 'AI', 'FINANCE', 'AGENCY', 'E-COMMERCE', 'TRAVEL'];

interface FeaturedWorkProps {
  onProjectClick?: (id: string) => void;
}

// --- 1. 3D Card Component for Hover Effects ---
const ProjectCard: React.FC<{ project: Project; onClick: (id: string) => void }> = ({ project, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Calculate mouse position relative to center (from -1 to 1)
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // 1. Tilt Container (3D Rotate)
    gsap.to(containerRef.current, {
      rotationY: x * 8, // Rotate Y based on X mouse position
      rotationX: -y * 8, // Rotate X based on Y mouse position
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out"
    });

    // 2. Parallax Image (Move opposite to tilt for depth)
    gsap.to(imageRef.current, {
      x: -x * 20,
      y: -y * 20,
      scale: 1.15, // Zoom slightly
      duration: 0.4,
      ease: "power2.out"
    });

    // 3. Float Text slightly
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * 10,
        y: y * 10,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current || !imageRef.current) return;

    // Reset Container
    gsap.to(containerRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });

    // Reset Image
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Reset Text
    if (textRef.current) {
      gsap.to(textRef.current, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <div
      onClick={() => onClick(project.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group cursor-pointer flex flex-col gap-6"
    >
      {/* Header Row: Title & Category */}
      <div ref={textRef} className="flex items-end justify-between px-1 transition-transform will-change-transform">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${project.dotColor || 'bg-red-600'} shadow-[0_0_8px_currentColor] opacity-90`}></div>
          <h3 className="font-display text-xl font-bold text-white leading-none mt-0.5 group-hover:text-red-500 transition-colors">
            {project.title}
          </h3>
        </div>
        <span className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider text-right group-hover:text-white transition-colors">
          {project.category}
        </span>
      </div>

      {/* 3D Container Wrapper */}
      <div className="perspective-1000 w-full aspect-4/3">
        <div
          ref={containerRef}
          className="relative w-full h-full rounded-4xl overflow-hidden bg-neutral-900 shadow-sm border border-white/5 transition-shadow duration-500 group-hover:border-red-500/30 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-neutral-800 overflow-hidden rounded-4xl">
            <Image
              ref={imageRef}
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transform scale-100 will-change-transform opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Gloss/Reflection Effect */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onProjectClick }) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<ProjectType>('ALL');
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter Logic
  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.type === activeFilter);

  // Handle project navigation
  const handleProjectClick = (id: string) => {
    if (onProjectClick) {
      onProjectClick(id);
    } else {
      router.push(`/p/${id}`);
    }
  };

  // --- 2. Warp Speed Transition Handler ---
  const handleFilterClick = useCallback((filter: ProjectType) => {
    if (filter === activeFilter || isAnimating) return;

    setIsAnimating(true);

    // Lock Height before state update to prevent jump
    if (gridContainerRef.current) {
      const h = gridContainerRef.current.offsetHeight;
      gsap.set(gridContainerRef.current, { height: h, overflow: 'hidden' });
    }

    // Step 1: Warp Out Current Items
    // We scale them down and blur them to simulate moving away fast
    gsap.to(".project-card", {
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)",
      y: -50,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setActiveFilter(filter);
      }
    });
  }, [activeFilter, isAnimating]);

  // Step 2: Warp In New Items & Smooth Height Transition
  useEffect(() => {
    const ctx = gsap.context(() => {

      // --- Height Animation Logic ---
      if (gridContainerRef.current) {
        // Unlock height temporarily to measure natural height of new content
        const currentFixed = gsap.getProperty(gridContainerRef.current, "height");
        gsap.set(gridContainerRef.current, { height: "auto" });
        const naturalHeight = gridContainerRef.current.offsetHeight;

        // Reset to fixed previous height
        gsap.set(gridContainerRef.current, { height: currentFixed });

        // Animate to new natural height
        gsap.to(gridContainerRef.current, {
          height: naturalHeight,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            // Release constraint after animation
            gsap.set(gridContainerRef.current, { height: "auto", overflow: "visible" });
            ScrollTrigger.refresh();
          }
        });
      }

      // --- Card Animation Logic ---
      // Reset properties first for the new batch
      gsap.set(".project-card", {
        scale: 1.2, // Start slightly zoomed in
        opacity: 0,
        filter: "blur(10px)",
        y: 50
      });

      // Warp In Animation
      gsap.to(".project-card", {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out", // Smooth landing
        onComplete: () => setIsAnimating(false)
      });

    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter]);


  return (
    <section ref={sectionRef} className="relative z-30 w-full min-h-screen bg-[#050505] text-white py-20 md:py-32">

      {/* Background Elements - Fixed/Absolute wrapper to prevent overflow issues if needed */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main Red Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-200 bg-red-600/10 rounded-full blur-[120px] opacity-40"></div>
        {/* Secondary Accent Glow */}
        <div className="absolute bottom-0 right-0 w-150 h-150 bg-red-800/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center mb-10 px-6">
        {/* Section Title */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-center text-white tracking-tight">
          Proof of Concepts
        </h2>
      </div>

      {/* Filters Bar - Sticky - Moved outside to be direct child or properly structured */}
      <div className="sticky top-20 md:top-24 z-40 w-full mb-12 md:mb-16 px-4 md:px-6 pointer-events-none">
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2.5 bg-neutral-900/60 backdrop-blur-xl px-2 py-2 md:px-3 md:py-3 rounded-full w-fit mx-auto shadow-2xl border border-white/10 pointer-events-auto">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`
                        px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-[8px] md:text-[10px] lg:text-xs font-bold tracking-widest transition-all duration-300 uppercase border border-transparent
                        ${activeFilter === filter
                  ? 'bg-red-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.5)] scale-105 border-red-500'
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'
                }
                    `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Container with Smooth Height Animation */}
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 md:px-10 lg:px-14">
        <div ref={gridContainerRef} className="w-full">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16 pb-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
