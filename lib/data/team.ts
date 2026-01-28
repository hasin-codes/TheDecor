export interface TeamMember {
  id: string;
  name: string;
  role: string;
  sector: number;
  material: string;
  baseUnit: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alex Chen',
    role: 'Art Director',
    sector: 8,
    material: 'Plasma',
    baseUnit: 'MK-1',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'member-2',
    name: 'Sarah Miller',
    role: '3D Artist',
    sector: 6,
    material: 'Neon',
    baseUnit: 'MK-2',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'member-3',
    name: 'James Wilson',
    role: 'Motion Designer',
    sector: 5,
    material: 'Flux',
    baseUnit: 'MK-3',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'member-4',
    name: 'Emma Davis',
    role: 'Concept Artist',
    sector: 7,
    material: 'Aether',
    baseUnit: 'MK-4',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  },
];
