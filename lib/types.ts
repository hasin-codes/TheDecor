export interface ProjectSlide {
  src: string;
  type: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  accentColor: string;
  services: string[];
  recognitions: string[];
  slides?: ProjectSlide[];
}
