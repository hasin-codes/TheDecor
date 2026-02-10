import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: 'behinder-ai',
    title: 'Behinder AI',
    category: 'Dashboard',
    type: 'AI',
    description: 'A comprehensive AI-powered dashboard for modern analytics.',
    thumbnail: '/Thumbnail.jpg',
    accentColor: '#DC2626',
    services: ['AI Integration', 'Dashboard Design', 'Data Visualization'],
    recognitions: [],
    slides: [{ src: '/Thumbnail.jpg', type: 'fullscreen-image' }],
    dotColor: 'bg-red-600'
  },
  {
    id: 'yadfae-go',
    title: 'Yadfae Go',
    category: 'Mobile App',
    type: 'FINANCE',
    description: 'A seamless finance mobile application for managing modern assets.',
    thumbnail: '/Thumbnail.jpg',
    accentColor: '#DC2626',
    services: ['Mobile App', 'Fintech', 'UX Design'],
    recognitions: [],
    slides: [{ src: '/Thumbnail.jpg', type: 'fullscreen-image' }],
    dotColor: 'bg-red-600'
  },
  {
    id: 'ecobase',
    title: 'Ecobase',
    category: 'Dashboard',
    type: 'SAAS',
    description: 'Sustainable SaaS dashboard for enterprise management.',
    thumbnail: '/Thumbnail.jpg',
    accentColor: '#DC2626',
    services: ['SaaS', 'Dashboard', 'Enterprise'],
    recognitions: [],
    slides: [{ src: '/Thumbnail.jpg', type: 'fullscreen-image' }],
    dotColor: 'bg-red-600'
  },
  {
    id: 'appointy',
    title: 'Appointy',
    category: 'Landing Page & Dev',
    type: 'AGENCY',
    description: 'High-conversion landing page and appointment styling system.',
    thumbnail: '/Thumbnail.jpg',
    accentColor: '#DC2626',
    services: ['Web Development', 'Lead Gen', 'Design'],
    recognitions: [],
    slides: [{ src: '/Thumbnail.jpg', type: 'fullscreen-image' }],
    dotColor: 'bg-red-600'
  },
  {
    id: 'miletask',
    title: 'Miletask',
    category: 'Web Application',
    type: 'SAAS',
    description: 'Efficient task management web application for remote teams.',
    thumbnail: '/Thumbnail.jpg',
    accentColor: '#DC2626',
    services: ['Web App', 'Productivity', 'Collaboration'],
    recognitions: [],
    slides: [{ src: '/Thumbnail.jpg', type: 'fullscreen-image' }],
    dotColor: 'bg-red-600'
  },
  {
    id: 'arhala',
    title: 'Arhala',
    category: 'Mobile App Design',
    type: 'TRAVEL',
    description: 'Immersive travel companion app design.',
    thumbnail: '/Thumbnail.jpg',
    accentColor: '#DC2626',
    services: ['Mobile Design', 'Travel Tech', 'User Research'],
    recognitions: [],
    slides: [{ src: '/Thumbnail.jpg', type: 'fullscreen-image' }],
    dotColor: 'bg-red-600'
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
