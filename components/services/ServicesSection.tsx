'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const services = [
  {
    id: '01',
    title: 'Branding',
    description: 'We craft a tailored strategic roadmap that maximizes your reach, strengthens community growth, and drives long-term audience retention across all social platforms.',
    tags: ['Execution', 'Planning'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop',
    headline: 'Define your brand identity',
    accent: 'bg-orange-500/20'
  },
  {
    id: '02',
    title: 'Strategy',
    description: "We shape your brand's visual tone, personality, and content style to create consistent, engaging, and memorable impressions across all social platforms.",
    tags: ['Execution', 'Planning'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
    headline: 'Craft your digital presence',
    accent: 'bg-blue-500/20'
  },
  {
    id: '03',
    title: 'Design',
    description: 'We design high-impact posts, reels, carousels, and motion graphics that enhance brand visibility, boost engagement, and attract a wider audience.',
    tags: ['Execution', 'Planning'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    headline: 'Engage with visual impact',
    accent: 'bg-purple-500/20'
  }
];

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const content = contentRef.current;

      if (!section || !content) return;

      const totalServices = services.length;

      // Calculate scroll distance based on service count
      const scrollDistance = 100 * (totalServices - 1);

      // Pin the content while scrolling through the "states"
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}%`,
        pin: content,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        snap: {
          snapTo: 1 / (totalServices - 1), // Snap to each service
          duration: { min: 0.2, max: 0.5 },
          ease: 'power2.inOut'
        },
        onUpdate: (self) => {
          // Map scroll progress (0-1) to index (0-2)
          const progress = self.progress;
          let idx = Math.min(
            Math.floor(progress * totalServices),
            totalServices - 1
          );
          setActiveIndex(idx);
        }
      });

      // Force refresh
      ScrollTrigger.refresh();
    }, sectionRef);

    // Resize handler
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white z-20"
    >
      {/* Fixed height container for proper pinning */}
      <div
        ref={contentRef}
        className="w-full h-screen flex flex-col justify-center overflow-hidden relative"
      >
        <div className="w-full h-full flex flex-col justify-center">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-2 md:mb-4 lg:mb-6 flex-shrink-0 gap-2 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#E31B23]">
                Services
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.9] text-white">
              Services
            </h2>
          </div>

          {/* Progress Indicator - Moved up */}
          <div className="flex-shrink-0 mb-6 md:mb-8 flex justify-center gap-2">
            {services.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex
                  ? 'w-12 bg-white'
                  : 'w-8 bg-white/20'
                  }`}
              />
            ))}
          </div>

          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-16 flex-1 items-center lg:items-center overflow-hidden pb-16 sm:pb-20 pt-8 sm:pt-10">
            {/* Left Column: List */}
            <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center gap-2 md:gap-3">
              {services.map((service, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={service.id}
                    className={`
                      group relative px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 rounded-xl md:rounded-[1.5rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border
                      ${isActive
                        ? 'bg-[#E31B23] text-white border-transparent shadow-[0_0_30px_rgba(227,27,35,0.3)] scale-[1.01] md:scale-[1.02] z-10'
                        : 'bg-zinc-900/50 text-zinc-500 border-white/5 hover:bg-zinc-800/50 hover:text-zinc-300 scale-100 z-0'
                      }
                    `}
                  >
                    {/* Header: ID & Title */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-widest transition-opacity ${isActive ? 'opacity-70 text-white' : 'opacity-40 text-current'}`}>
                        {service.id}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-medium tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    {/* Improved collapsible content with max-height transition */}
                    <div
                      className={`
                        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden
                        ${isActive ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
                      `}
                    >
                      <p className={`font-sans text-xs md:text-sm font-medium leading-relaxed mb-3 md:mb-4 ${isActive ? 'text-white/90' : 'text-current'}`}>
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`
                              px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border transition-colors
                              ${isActive
                                ? 'border-white/20 text-white/90 bg-white/10'
                                : 'border-white/10 text-white/30'
                              }
                            `}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mobile: Show small preview image */}
                    {isActive && (
                      <div className="lg:hidden mt-4 rounded-xl overflow-hidden h-40 sm:h-48 relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Image - Desktop Only */}
            <div className="hidden lg:flex w-full lg:w-[55%] xl:w-[60%] relative pl-4 md:pl-8">
              <div className="relative w-full h-[300px] xl:h-[380px] rounded-xl md:rounded-[1.5rem] overflow-hidden shadow-2xl bg-[#111] border border-white/10">
                {services.map((service, i) => (
                  <div
                    key={`img-${service.id}`}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                      ${i === activeIndex
                        ? 'opacity-100 scale-100 z-10'
                        : i < activeIndex
                          ? 'opacity-0 scale-95 z-0'
                          : 'opacity-0 scale-105 z-0 translate-y-4'
                      }
                    `}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 mix-blend-multiply opacity-60"></div>
                    <div className={`absolute inset-0 mix-blend-overlay opacity-30 ${service.accent}`}></div>

                    {/* Text Overlay */}
                    <div className="absolute bottom-8 md:bottom-10 left-8 md:left-10 right-8 md:right-10">
                      <h3 className={`font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1] transition-all duration-700 delay-100 ${i === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        {service.headline}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
