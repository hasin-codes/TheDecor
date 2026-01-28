import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: 'decors-digital',
    title: 'DecorsDigital',
    category: 'Digital Experience',
    description: 'An immersive digital experience pushing the boundaries of web interaction and visual storytelling.\n\nThis project reimagines how brands connect with their audience through cutting-edge web technologies and artistic expression.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80',
    accentColor: '#E31B23',
    services: ['Web Development', 'Creative Direction', '3D Animation', 'Interaction Design'],
    recognitions: ['AWWWARDS - SOTD', 'FWA - FWA of the Day', 'CSS Design Awards'],
    slides: [
      {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80',
        type: 'fullscreen-image'
      },
      {
        src: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1920&q=80',
        type: 'padded-image'
      }
    ]
  },
  {
    id: 'ultra-think',
    title: 'Ultra Think',
    category: 'Brand Strategy',
    description: 'A revolutionary platform reimagining how we approach digital creativity and innovation.\n\nBlending strategic thinking with bold visual design to create unforgettable brand experiences.',
    thumbnail: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=1920&q=80',
    accentColor: '#8B2232',
    services: ['Brand Strategy', 'UX Design', 'Frontend Development'],
    recognitions: ['Red Dot Award', 'IF Design Award'],
    slides: [
      {
        src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=1920&q=80',
        type: 'fullscreen-image'
      },
      {
        src: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1920&q=80',
        type: 'padded-image'
      }
    ]
  },
  {
    id: 'breach-the-norm',
    title: 'Breach The Norm',
    category: 'Art Direction',
    description: 'Breaking conventional design patterns to create memorable digital experiences.\n\nA bold exploration of visual boundaries that challenges expectations and inspires action.',
    thumbnail: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1920&q=80',
    accentColor: '#FF6B35',
    services: ['Art Direction', 'Motion Design', 'Web Development'],
    recognitions: ['Cannes Lions', 'D&AD Pencil'],
    slides: [
      {
        src: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1920&q=80',
        type: 'fullscreen-image'
      }
    ]
  },
  {
    id: 'synthetic-human',
    title: 'Synthetic Human',
    category: 'R&D',
    description: 'Exploring the intersection of artificial intelligence and human creativity.\n\nA research-driven project that pushes the boundaries of what\'s possible in digital art and interaction.',
    thumbnail: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=1920&q=80',
    accentColor: '#1A1A2E',
    services: ['AI Integration', 'Creative Coding', 'Research & Development'],
    recognitions: ['Ars Electronica', 'SIGGRAPH Selection'],
    slides: [
      {
        src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=1920&q=80',
        type: 'fullscreen-image'
      },
      {
        src: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1920&q=80',
        type: 'padded-image'
      }
    ]
  },
  {
    id: 'nike-air-max',
    title: 'Nike Air Max',
    category: 'Commerce',
    description: 'An e-commerce experience that elevates product presentation to an art form.\n\nImmersive 3D product visualization combined with seamless shopping functionality.',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80',
    accentColor: '#FF4D00',
    services: ['E-commerce', '3D Visualization', 'UX Design'],
    recognitions: ['Webby Award', 'Lovie Award'],
    slides: [
      {
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80',
        type: 'fullscreen-image'
      },
      {
        src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1920&q=80',
        type: 'padded-image'
      }
    ]
  },
  {
    id: 'apple-vision-concept',
    title: 'Apple Vision',
    category: 'Interface • AR',
    description: 'A conceptual exploration of spatial computing interfaces for Apple\'s vision platform.\n\nThis project reimagines how users interact with digital content in a spatial context, focusing on intuitive gestures and seamless integration.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80',
    accentColor: '#F5F5F7',
    services: ['UI/UX', 'Prototyping', 'Motion Design'],
    recognitions: ['Red Dot', 'iF Design Award'],
    slides: [
      {
        src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80',
        type: 'fullscreen-image'
      },
      {
        src: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1920&q=80',
        type: 'padded-image'
      }
    ]
  }
];

// Helper function to get project by slug/id
export const getProject = (slug: string): Project | undefined => {
  return projects.find(p => p.id === slug);
};

// Helper function to get all project slugs for static generation
export const getProjectSlugs = (): string[] => {
  return projects.map(p => p.id);
};

// Helper function to get next project for "Up Next" feature
export const getNextProject = (currentSlug: string): Project | undefined => {
  const currentIndex = projects.findIndex(p => p.id === currentSlug);
  if (currentIndex === -1) return undefined;
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
};
