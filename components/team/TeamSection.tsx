'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '@/lib/data/team';
import { TeamMemberCard } from '@/components/team';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// --- DATA GENERATION ---
const groups = [
  {
    id: 'creative',
    label: 'Creative',
    description: 'Visionaries shaping the unseen.',
    members: teamMembers.map((m, i) => ({
      ...m,
      id: `creative-${i}`
    }))
  },
  {
    id: 'tech',
    label: 'Tech',
    description: 'Architects of digital reality.',
    members: teamMembers.map((m, i) => ({
      ...m,
      id: `tech-${i}`,
      role: ['Lead Dev', 'WebGL Wizard', 'Backend Eng', 'Systems Arch'][i] || 'Developer'
    }))
  },
  {
    id: 'growth',
    label: 'Growth',
    description: 'Strategists expanding horizons.',
    members: teamMembers.map((m, i) => ({
      ...m,
      id: `growth-${i}`,
      role: ['SEO Lead', 'Marketing Dir', 'Content Strat', 'Analyst'][i] || 'Growth'
    }))
  },
  {
    id: 'ops',
    label: 'Ops',
    description: 'The backbone of execution.',
    members: teamMembers.map((m, i) => ({
      ...m,
      id: `ops-${i}`,
      role: ['Producer', 'Ops Manager', 'HR Lead', 'Finance'][i] || 'Ops'
    }))
  }
];

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // IMPORTANT: totalTransitions = number of transitions between groups
      const totalTransitions = groups.length - 1;

      if (totalTransitions < 1) return;

      // --- 1. INITIAL SETUP ---
      groups.forEach((_, i) => {
        const grid = document.getElementById(`group-grid-${i}`);
        const label = document.getElementById(`group-label-${i}`);

        if (i === 0) {
          if (grid) gsap.set(grid, { yPercent: 0, autoAlpha: 1, scale: 1, zIndex: 10 });
          if (label) gsap.set(label, { yPercent: 0, autoAlpha: 1 });
        } else {
          if (grid) gsap.set(grid, { yPercent: 120, autoAlpha: 0, scale: 0.9, zIndex: 1 });
          if (label) gsap.set(label, { yPercent: 100, autoAlpha: 0 });
        }
      });

      // Initialize progress bar
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleY: 0 });
      }

      // --- 2. MASTER TIMELINE with VIEWPORT PIN ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalTransitions * 100}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          snap: {
            snapTo: 1 / totalTransitions,
            duration: { min: 0.2, max: 0.4 },
            delay: 0,
            ease: 'power2.inOut'
          },
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * (groups.length - 0.01)),
              groups.length - 1
            );
            setActiveIndex(idx);

            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleY: self.progress });
            }
          }
        }
      });

      // --- 3. BUILD TRANSITIONS (FIXED POSITIONING) ---
      groups.forEach((_, i) => {
        if (i === groups.length - 1) return;

        const currentGrid = document.getElementById(`group-grid-${i}`);
        const currentLabel = document.getElementById(`group-label-${i}`);
        const currentStep = document.getElementById(`mobile-step-${i}`);

        const nextGrid = document.getElementById(`group-grid-${i + 1}`);
        const nextLabel = document.getElementById(`group-label-${i + 1}`);
        const nextStep = document.getElementById(`mobile-step-${i + 1}`);

        if (!currentGrid || !nextGrid) return;

        // FIX: Use label strings for timeline position
        const startLabel = `transition-${i}`;

        // Add label at this position
        tl.addLabel(startLabel);

        // OUTGOING - use ">" to sequence, or explicit position
        tl.to(currentGrid, {
          yPercent: -120,
          scale: 0.85,
          autoAlpha: 0,
          zIndex: 1,
          duration: 1,
          ease: 'power3.inOut'
        }, startLabel);

        tl.to(currentLabel, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.inOut'
        }, startLabel);

        if (currentStep) {
          tl.to(currentStep, {
            width: '0.5rem',
            backgroundColor: 'rgba(0,0,0,0.1)',
            duration: 0.5
          }, startLabel);
        }

        // INCOMING - same position to overlap animations
        tl.to(nextGrid, {
          yPercent: 0,
          scale: 1,
          autoAlpha: 1,
          zIndex: 10,
          duration: 1,
          ease: 'power3.inOut'
        }, startLabel);

        tl.to(nextLabel, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.inOut'
        }, startLabel);

        if (nextStep) {
          tl.to(nextStep, {
            width: '2rem',
            backgroundColor: '#E31B23',
            duration: 0.5
          }, startLabel);
        }
      });

      // Force refresh after setup
      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-transparent z-20 -mt-[1px]"
    >
      <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col px-6 md:px-10 lg:px-14 pt-0 md:pt-0">

        {/* --- TOP HEADER (Centered) --- */}
        <div className="w-full flex flex-col items-center justify-center relative z-20 shrink-0 pt-20 md:pt-24 pb-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-40">The Minds</span>
          </div>

          {/* Dynamic Labels Container - Centered */}
          <div className="relative h-14 md:h-20 w-full overflow-hidden flex flex-col items-center justify-center">
            {groups.map((group, i) => (
              <div
                key={`label-${i}`}
                id={`group-label-${i}`}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight text-foreground uppercase">
                  {group.label}
                </div>
                <p className="text-[10px] md:text-sm opacity-60 mt-1 max-w-[400px]">
                  {group.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Index Indicator - Centered */}
          <div className="flex md:hidden items-center gap-2 mt-4">
            {groups.map((_, idx) => (
              <div
                key={idx}
                id={`mobile-step-${idx}`}
                className={`h-1 rounded-full transition-all duration-300 ${idx === 0 ? 'w-8 bg-brandRed' : 'w-2 bg-black/10'}`}
              />
            ))}
          </div>

          {/* Desktop Index Indicator - Centered */}
          <div className="hidden md:flex items-center gap-4 mt-4">
            {groups.map((_, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-6 h-px transition-colors duration-300 ${idx === activeIndex ? 'bg-brandRed' : 'bg-current opacity-20'}`}></div>
                <span className={`text-xs ${idx === activeIndex ? 'opacity-100 font-bold' : 'opacity-30'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM CONTENT (Card Stacks) --- */}
        <div ref={containerRef} className="w-full flex-1 relative flex items-center justify-center pointer-events-none">
          {groups.map((group, i) => (
            <div
              key={`group-${i}`}
              id={`group-grid-${i}`}
              className="absolute w-full h-full flex items-center justify-center pointer-events-none pb-4 md:pb-8"
            >
              <div className="w-full h-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pointer-events-auto items-center justify-items-center">
                {group.members.map((member, idx) => (
                  <div key={member.id} className="w-full flex justify-center p-0 h-full max-h-[35dvh] md:max-h-none items-center">
                    <div className="w-full h-full max-w-[200px] md:max-w-[450px] transform origin-center hover:scale-105 transition-transform duration-300 flex items-center relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150 z-0 pointer-events-none"></div>
                      <div className="relative z-10 w-full">
                        <TeamMemberCard member={member} index={idx} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Vertical Progress Bar */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 h-[200px] w-0.5 bg-black/10 hidden md:block">
        <div ref={progressRef} className="w-full h-full bg-brandRed origin-top"></div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center h-full">
        <div className="w-full max-w-[1440px] flex justify-end h-full opacity-[0.03] px-14">
          <div className="w-px h-full bg-black dark:bg-white mr-[18%]"></div>
          <div className="w-px h-full bg-black dark:bg-white mr-[18%]"></div>
          <div className="w-px h-full bg-black dark:bg-white mr-[18%]"></div>
          <div className="w-px h-full bg-black dark:bg-white"></div>
        </div>
      </div>

    </section>
  );
};
