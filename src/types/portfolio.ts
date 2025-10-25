export interface Portfolio {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
  about: string[];
  education: Education[];
  experience: Experience[];
  skills: Skills;
  projects: Project[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  highlights: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  year: string;
  highlights: string[];
}

export interface Skills {
  languages: string[];
  ml_ai: string[];
  cloud: string[];
  devops: string[];
  databases: string[];
  tools: string[];
}
