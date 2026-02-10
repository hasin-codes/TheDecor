export type ProjectType = 'ALL' | 'SAAS' | 'AI' | 'FINANCE' | 'AGENCY' | 'E-COMMERCE' | 'TRAVEL';

export type ProjectSlideType = 'fullscreen-image' | 'padded-image' | 'fullscreen-video' | 'padded-video';

export interface ProjectSlide {
  src: string;
  type: ProjectSlideType;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  type: ProjectType;
  description: string;
  thumbnail: string;
  accentColor: string;
  services: string[];
  recognitions: string[];
  slides?: ProjectSlide[];
  dotColor?: string;
}
