'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { projects } from '@/lib/data/projects';

interface ProjectProps {
  id?: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  index: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ slug, title, category, image, index }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/p/${slug}`);
  };

  return (
    <div
      className="w-full relative group cursor-pointer"
      onClick={handleClick}
    >
      {/* Background Glow - Accent Color */}
      <div className="absolute -inset-10 bg-red-600/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

      {/* Image Mask - 16:9 Aspect Ratio with shadow */}
      <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-gray-900 shadow-2xl">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* View Indicator - Top Right */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase">View</span>
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Editorial Text Layout */}
      <div className="mt-6 flex flex-col items-start border-t border-current/20 pt-5 transition-all duration-500 group-hover:border-current/50">
        <div className="flex justify-between w-full items-start">
          <div className="flex flex-col gap-1 overflow-hidden w-full">
            <span className="text-xs font-mono font-medium tracking-widest opacity-50 uppercase mb-1">
              {String(index + 1).padStart(2, '0')} / {category}
            </span>

            {/* Title with hover effect */}
            <h3 className="text-2xl md:text-4xl font-display font-medium leading-none group-hover:text-[#E31B23] transition-colors duration-300">
              {title}
            </h3>
          </div>
          <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
        </div>

        {/* Tag pills */}
        <div className="flex gap-2 mt-4 opacity-60">
          {['Design', 'Development'].map((tag, i) => (
            <span key={i} className="px-3 py-1 border border-current rounded-full text-[10px] uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FeaturedWork: React.FC = () => {
  return (
    <section className="relative z-30 w-full overflow-hidden py-16 md:py-24 bg-[#050505] text-white -mt-[1px]">
      {/* Header - Centered */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 mb-16 md:mb-24">
        <div className="flex flex-col items-center text-center pt-16 md:pt-20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50">
              Portfolio
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase">
            Selected Works
          </h2>
        </div>
      </div>

      {/* The Gallery Grid - Aligned 2xN */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-24">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              slug={project.id}
              title={project.title}
              category={project.category}
              image={project.thumbnail}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
