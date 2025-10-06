export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profileImage?: string;
}

export interface ProfessionalExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: 'professional' | 'academic';
  featured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  logoUrl?: string;
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface Education {
  institution: string;
  program: string;
  start_date: string;
  end_date: string | null;
  status?: string;
  location?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  features?: string[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}


