# The Decor Project Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Slug System Architecture](#slug-system-architecture)
3. [Featured Work Component Integration](#featured-work-component-integration)
4. [Data Flow and Structure](#data-flow-and-structure)
5. [Styling and Theming](#styling-and-theming)
6. [Code Snippets and Implementation](#code-snippets-and-implementation)
7. [How to Replicate](#how-to-replicate)

## Overview

The Decor is a Next.js-based portfolio website showcasing creative projects with a sophisticated slug-based routing system. The architecture follows Next.js App Router conventions with dynamic route segments for individual project pages.

### Key Technologies Used
- Next.js 16+

- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP (GreenSock Animation Platform)
- Lucide React Icons

## Slug System Architecture

### Route Structure
```
app/
 └── p/
     └── [slug]/
         ├── page.tsx
         └── layout.tsx
```

The `[slug]` directory creates a dynamic route segment that captures the project identifier from the URL. For example:
- `/p/apple-vision-concept` → `slug = "apple-vision-concept"`
- `/p/nike-air-max-2090` → `slug = "nike-air-max-2090"`

### Dynamic Route Implementation

The `page.tsx` file in the `[slug]` directory implements several key Next.js features:

```typescript
// app/p/[slug]/page.tsx
import ProjectPage from '@/components/ProjectPage';
import { getProject, getProjectSlugs, getNextProject } from '@/data/projects';
import { notFound } from 'next/navigation';

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | The Decor`,
    description: project.description.split('\n')[0],
  };
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const nextProject = getNextProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} nextProject={nextProject} />;
}
```

### Key Functions in Slug System

1. **`generateStaticParams()`**: Pre-builds all project pages at build time using the available project slugs
2. **`generateMetadata()`**: Dynamically generates SEO metadata for each project page
3. **`getProject()`**: Retrieves project data based on the slug
4. **`getNextProject()`**: Gets the next project in sequence for "Up Next" functionality

## Featured Work Component Integration

### Component Structure
```
components/
 ├── FeaturedWork.tsx
 ├── ProjectCard.tsx
 └── ProjectPage.tsx
```

### FeaturedWork Component

The `FeaturedWork.tsx` component displays a grid of projects and connects to the slug system through the `ProjectCard` component:

```typescript
// components/FeaturedWork.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/utils/gsap-config';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';

interface FeaturedWorkProps {
  projects: Project[];
}

export const FeaturedWork = ({ projects }: FeaturedWorkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Title Animation
      gsap.fromTo(titleRef.current,
        { y: 150, skewY: 5, opacity: 0 },
        {
          y: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 95%'
          }
        }
      );

      // 2. Description Animation
      gsap.fromTo(descRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 95%'
          }
        }
      );

      // 3. Projects Entrance
      const cards = projectsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top 85%'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full pb-0 pt-0 md:pb-0 md:pt-0 px-4 md:px-10 lg:px-14 bg-white z-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24 md:mb-32">
        <div className="overflow-hidden">
          <h2 ref={titleRef} className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter leading-[0.85] text-black origin-bottom-left">
            Featured Work
          </h2>
        </div>

        <div className="lg:w-1/3 flex justify-start lg:justify-end">
          <p ref={descRef} className="max-w-xs text-xs md:text-sm font-bold tracking-widest leading-relaxed text-black/70 uppercase lg:text-right lg:pb-4">
            A selection of our most passionately crafted works with forward-thinking clients and friends over the years.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 lg:gap-x-16 gap-y-8 md:gap-y-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            id={`project-node-${index}`}
            slug={project.id}
            title={project.title}
            tags={project.category}
            image={project.thumbnail}
          />
        ))}
      </div>
    </section>
  );
};
```

### ProjectCard Component

The `ProjectCard.tsx` component serves as the bridge between the featured work display and individual project pages:

```typescript
// components/ProjectCard.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectProps {
  id?: string;
  slug?: string;
  title: string;
  tags: string;
  image: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectProps> = ({ id, slug, title, tags, image, className }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (slug) {
      router.push(`/p/${slug}`);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !cardInnerRef.current) return;

    const card = cardInnerRef.current;

    ScrollTrigger.create({
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
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
```

## Data Flow and Structure

### Project Data Structure

The project data follows a consistent structure defined in the TypeScript types:

```typescript
// types/index.ts
export interface Project {
  id: string;           // Unique identifier used as slug
  title: string;        // Project title
  category: string;     // Project category/tags
  thumbnail: string;    // Thumbnail image URL
  accentColor: string;  // Accent color for theming
  description: string;  // Project description
  services: string[];   // Array of services provided
  recognitions: string[]; // Array of awards/recognition
  slides: ProjectSlide[]; // Array of project slides
}

export interface ProjectSlide {
  type: string;         // Type of slide (e.g., "fullscreen-image", "padded-image")
  src: string;          // Source URL for image/video
}
```

### Sample Project Data

```json
{
  "id": "apple-vision-concept",
  "title": "Apple: Vision Concept",
  "category": "Concept • AR • Interface",
  "thumbnail": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
  "accentColor": "#F5F5F7",
  "description": "A conceptual exploration of spatial computing interfaces for Apple's vision platform.\n\nThis project reimagines how users interact with digital content in a spatial context, focusing on intuitive gestures and seamless integration.",
  "services": ["UI/UX", "Prototyping", "Motion Design"],
  "recognitions": ["Red Dot", "iF Design Award"],
  "slides": [
    {
      "type": "fullscreen-image",
      "src": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop"
    },
    {
      "type": "padded-image",
      "src": "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=2574&auto=format&fit=crop"
    }
  ]
}
```

### Data Loading Strategy

The project uses two different data loading strategies:

#### Client-Side Data Loading (`projects.ts`)
```typescript
// data/projects.ts
import { Project } from '../types';
// Import project data directly from JSON files
import appleVisionConcept from '../content/projects/apple-vision-concept.json';
import devinAi from '../content/projects/devin-ai.json';
// ... other imports

// Export all projects as a plain array (safe for client components)
export const projects: Project[] = [
  appleVisionConcept,
  devinAi,
  // ... other projects
];

// Helper function to get project by slug/id
export const getProject = (slug: string): Project | undefined => {
  return projects.find(p => p.id === slug);
};

// Helper function to get all project slugs for static generation
export const getProjectSlugs = (): string[] => {
  return projects.map(p => p.id);
};

// Helper function to get next project
export const getNextProject = (currentId: string): Project | undefined => {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
};
```

#### Server-Side Data Loading (`projects-server.ts`)
```typescript
// data/projects-server.ts
import { Project } from '../types';
import fs from 'fs';
import path from 'path';

// Server-side function to load all projects from JSON files
export function loadProjects(): Project[] {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = fs.readdirSync(projectsDirectory);
  const projectFiles = filenames.filter(name => name.endsWith('.json'));

  const projects: Project[] = projectFiles.map(filename => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Project;
  });

  return projects;
}
```

## Styling and Theming

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom configurations in `tailwind.config.ts` (though not visible in the file structure, it's implied by the usage).

### Key Styling Patterns

1. **Consistent Border Radius**: `rounded-[2rem]` and `rounded-[2.5rem]` for modern aesthetics
2. **Color Palette**: 
   - Primary: `#FF4D00` (orange accent)
   - Secondary: Various shades of black and gray
   - Backgrounds: White with accent colors from project data
3. **Typography**: 
   - Large headings with tight tracking
   - Uppercase text for certain elements
   - Responsive font sizes
4. **Shadows**: Consistent `shadow-2xl` for depth
5. **Transitions**: Smooth hover effects with `transition-transform` and `transition-colors`

### Theme Integration

Each project page dynamically applies the project's accent color:

```typescript
// In ProjectPage.tsx
<div
  ref={containerRef}
  onScroll={handleScroll}
  className="w-full h-full flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none"
  style={{
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: project.accentColor  // Dynamic background color
  }}
>
```

## Code Snippets and Implementation

### 1. Horizontal Scrolling with Smooth Animation

The project page implements a horizontal scrolling experience with smooth animations:

```typescript
// GSAP Smooth Horizontal Scroll
useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const ctx = gsap.context(() => {
    ScrollTrigger.observe({
      target: container,
      type: "wheel,touch",
      onChange: (self) => {
        const currentScroll = container.scrollLeft;
        const targetScroll = currentScroll + (self.deltaY + self.deltaX) * 2;

        const maxScroll = container.scrollWidth - container.clientWidth;
        const clampedTarget = Math.max(0, Math.min(targetScroll, maxScroll));

        gsap.to(container, {
          scrollLeft: clampedTarget,
          duration: 1,
          ease: "power3.out",
          overwrite: true
        });
      },
      preventDefault: true
    });
  }, container);

  return () => ctx.revert();
}, []);
```

### 2. Progress Bar Animation

The progress bar at the bottom of the project page shows scroll progress:

```typescript
const { scrollXProgress } = useScroll({ container: containerRef });
const scaleX = useSpring(scrollXProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
});

// In JSX:
<motion.div
  className="h-full bg-[#FF4D00]"
  style={{ scaleX, transformOrigin: "0%" }}
/>
```

### 3. Slide Navigation Tracking

The system tracks which slide is currently visible:

```typescript
const handleScroll = () => {
  if (!containerRef.current) return;
  const scrollLeft = containerRef.current.scrollLeft;
  const width = containerRef.current.clientWidth || window.innerWidth;
  const index = Math.round(scrollLeft / width) + 1;
  setCurrentSlide(Math.min(Math.max(1, index), totalSlides));
};
```

### 4. Next Project Navigation

The system cycles through projects with the next project functionality:

```typescript
const goToProject = (projectId: string) => {
  router.push(`/p/${projectId}`);
};

// In JSX:
{nextProject && (
  <button
    onClick={() => goToProject(nextProject.id)}
    className="flex items-center gap-6 cursor-pointer group w-full"
  >
    <span className="text-xs font-bold tracking-widest uppercase text-black">NEXT PROJECT</span>
    <div className="flex-1 h-[1px] bg-black/20 relative overflow-hidden group-hover:bg-black/40 transition-colors">
      <div className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
    </div>
    <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-500" />
  </button>
)}
```

## How to Replicate

### Step 1: Set Up the Project Structure

Create the following directory structure:

```
app/
 └── p/
     └── [slug]/
         ├── page.tsx
         └── layout.tsx
content/
 └── projects/
     ├── project-1.json
     ├── project-2.json
     └── ...
components/
 ├── FeaturedWork.tsx
 ├── ProjectCard.tsx
 └── ProjectPage.tsx
data/
 ├── projects.ts
 └── projects-server.ts
types/
 └── index.ts
```

### Step 2: Define Project Types

Create `types/index.ts`:

```typescript
export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  accentColor: string;
  description: string;
  services: string[];
  recognitions: string[];
  slides: ProjectSlide[];
}

export interface ProjectSlide {
  type: string;
  src: string;
}
```

### Step 3: Create Project Data Files

Create JSON files in `content/projects/` with the structure described above.

### Step 4: Implement Data Loading

Create `data/projects.ts` with the helper functions as shown above.

### Step 5: Create the Slug Page

Create `app/p/[slug]/page.tsx` with the implementation shown above.

### Step 6: Create the Project Card Component

Create `components/ProjectCard.tsx` with the implementation shown above.

### Step 7: Create the Featured Work Component

Create `components/FeaturedWork.tsx` with the implementation shown above.

### Step 8: Create the Project Page Component

Create `components/ProjectPage.tsx` with the implementation shown above.

### Step 9: Integrate into Your Layout

Add the FeaturedWork component to your main page:

```typescript
// app/page.tsx
import { FeaturedWork } from '@/components/FeaturedWork';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <main>
      <FeaturedWork projects={projects} />
    </main>
  );
}
```

### Step 10: Configure Dependencies

Make sure to install the required dependencies:

```bash
npm install next react react-dom
npm install -D typescript @types/react @types/node
npm install framer-motion lucide-react gsap
```

### Additional Notes

- The `generateStaticParams` function ensures all project pages are pre-built at build time
- The project uses a circular navigation system where the last project links back to the first
- Each project page has a unique accent color that affects the background
- Animations are handled by both Framer Motion and GSAP for different purposes
- The horizontal scrolling experience is enhanced with smooth scroll behavior
- Project cards have interactive hover effects and animated transitions

This architecture creates a seamless connection between the featured work section and individual project pages through the slug system, providing an engaging user experience with smooth transitions and consistent styling.