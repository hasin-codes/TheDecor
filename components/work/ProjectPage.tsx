'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Activity, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/types';

interface ProjectPageProps {
  project: Project;
  nextProject?: Project;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ project, nextProject }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = (project.slides?.length || 0) + 2; // +1 for Hero, +1 for Next Project

  const goBack = () => {
    router.back();
  };

  const goToProject = (projectSlug: string) => {
    router.push(`/p/${projectSlug}`);
  };

  // Horizontal Scroll Wheel Support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If mainly vertical scroll (mouse wheel), translate to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Track active slide for counter
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = window.innerWidth;
    const index = Math.round(scrollLeft / width) + 1;
    setCurrentSlide(index);
  };

  const scrollNext = () => {
    containerRef.current?.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    containerRef.current?.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  };

  // Scroll Progress Bar
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-background w-full h-full overflow-hidden"
    >
      {/* --- CUSTOM HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-14 pointer-events-none mix-blend-difference text-white transition-opacity duration-300">
        <div className="flex-shrink-0 pointer-events-auto">
          <h1 className="font-sans text-2xl font-bold tracking-tight uppercase">
            Decor
          </h1>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={goBack}
            className="h-11 px-6 bg-white text-black rounded-full flex items-center gap-2 font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto text-black">
          <button className="h-11 w-11 flex items-center justify-center rounded-full bg-white hover:scale-105 transition-transform shadow-sm">
            <Activity className="w-5 h-5" />
          </button>
          <button className="h-11 px-6 rounded-full bg-[#2B2B30] text-white font-bold text-xs tracking-widest hover:bg-black transition-colors flex items-center gap-2 uppercase shadow-sm">
            Let&apos;s Talk
          </button>
          <button className="h-11 px-6 rounded-full bg-white font-bold text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors shadow-sm">
            Menu <span className="ml-1">••</span>
          </button>
        </div>
      </header>

      {/* --- FOOTER CONTROLS --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 py-6 md:px-10 md:py-8 lg:px-14 flex items-end justify-between pointer-events-none mix-blend-difference text-white">
        {/* Page Counter */}
        <div className="text-sm font-bold tracking-widest font-mono">
          {String(currentSlide).padStart(2, '0')} — {String(totalSlides).padStart(2, '0')}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={scrollPrev}
            disabled={currentSlide === 1}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            disabled={currentSlide === totalSlides}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* --- PROGRESS BAR --- */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-[60]">
        <motion.div
          className="h-full bg-[#FF4D00]"
          style={{ scaleX, transformOrigin: "0%" }}
        />
      </div>

      {/* --- HORIZONTAL SCROLL CONTAINER --- */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-nowrap overflow-x-auto overflow-y-hidden hide-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >

        {/* --- SLIDE 1: HERO TEXT --- */}
        <div
          className="w-screen h-full flex-shrink-0 snap-start flex items-center relative"
          style={{ backgroundColor: project.accentColor }}
        >
          {/* Text Content Grid */}
          <div className="w-full h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 px-6 md:px-14 pt-32 pb-24 box-border">

            {/* Left: Main Title & Description */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-12 lg:pr-20">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] text-[#2A1B1B]"
              >
                {project.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col gap-8 max-w-xl"
              >
                <p className="text-lg md:text-xl leading-relaxed text-[#2A1B1B]/80 font-medium whitespace-pre-line">
                  {project.description}
                </p>

                <button className="w-fit h-14 px-8 bg-white rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition-transform group">
                  <div className="w-2 h-2 rounded-full bg-[#8B2232] group-hover:scale-125 transition-transform"></div>
                  <span className="text-xs font-bold tracking-widest uppercase text-black">Watch Video</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Meta Data (Services & Recognitions) */}
            <div className="lg:col-span-5 flex flex-col justify-center lg:pl-10 gap-16 mt-10 lg:mt-0">

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xs font-bold tracking-widest uppercase text-[#8B2232] mb-6">Services</h3>
                <ul className="flex flex-col gap-2">
                  {project.services.map(s => (
                    <li key={s} className="text-xl font-medium text-[#2A1B1B]">{s}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Recognitions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-xs font-bold tracking-widest uppercase text-[#8B2232] mb-6">Recognitions</h3>
                <ul className="flex flex-col gap-2">
                  {project.recognitions.map(r => (
                    <li key={r} className="text-xl font-medium text-[#2A1B1B]">{r}</li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>

          {/* Decorative Shadow/Plant Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        {/* --- CONTENT SLIDES --- */}
        {project.slides?.map((slide, index) => (
          <div
            key={index}
            className={`w-screen h-full flex-shrink-0 snap-start flex items-center justify-center bg-black overflow-hidden relative
              ${slide.type.includes('padded') ? 'p-6 md:p-14 lg:p-20' : ''}
            `}
          >
            <div className={`relative w-full h-full overflow-hidden ${slide.type.includes('padded') ? 'rounded-3xl' : ''}`}>

              {/* Enter Animation for Slide */}
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full h-full bg-[#111]"
              >
                {slide.type.includes('video') ? (
                  <video
                    src={slide.src}
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Subtle dark overlay for consistency */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
              </motion.div>
            </div>
          </div>
        ))}

        {/* --- FOOTER / NEXT PROJECT SLIDE --- */}
        {nextProject && (
          <div className="w-screen h-full flex-shrink-0 snap-start flex relative bg-[#F0F1F7]">
            {/* Split Screen Logic */}
            <div className="hidden lg:block w-1/2 h-full relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nextProject.thumbnail}
                alt="Next Project"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
            </div>

            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-10 md:px-20 lg:px-32 relative bg-white">
              <span className="text-sm font-bold tracking-widest uppercase text-black/40 mb-4">Next Project</span>
              <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-foreground mb-12">
                {nextProject.title}
              </h2>

              {/* Link to next project */}
              <button
                onClick={() => goToProject(nextProject.id)}
                className="flex items-center gap-4 cursor-pointer group w-fit"
              >
                <span className="text-xs font-bold tracking-widest uppercase">View Case Study</span>
                <div className="w-32 h-0.5 bg-black/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default ProjectPage;
