export type ProjectStatus =
  | "Idea"
  | "In Progress"
  | "Completed"
  | "Research"
  | "Archived";

export type ResearchStatus =
  | "researching"
  | "in_progress"
  | "completed"
  | "under_review"
  | "published"
  | "archived";

export interface ProjectLinks {
  github?: string;
  demo?: string;
  paper?: string;
  dataset?: string;
  documentation?: string;
  other?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  technologies: string[];
  year: number;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  thumbnail?: string;
  gallery?: string[];
  problem?: string;
  objective?: string;
  approach?: string;
  architecture?: string;
  implementation?: string;
  results?: string;
  challenges?: string;
  learnings?: string;
  futureWork?: string;
  links?: ProjectLinks;
  relatedProjects?: string[]; // project slugs
  relatedResearch?: string[]; // research slugs
}

export interface Dataset {
  name: string;
  description: string;
  source: string;
  sourceUrl?: string;
  size?: string;
  featureCount?: number;
  format?: string;
}

export interface Experiment {
  name: string;
  model: string;
  featureCount?: number;
  parameters?: Record<string, string | number | boolean>;
  notes?: string;
  results?: Array<{
    metric: string;
    value: string | number;
    unit?: string;
  }>;
}

export interface Publication {
  title: string;
  venue: string;
  publicationDate?: string;
  doi?: string;
  paperUrl?: string;
  status: string;
}

export interface Research {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  motivation: string;
  researchQuestion: string;
  methodology: string;
  limitations?: string;
  futureWork?: string;
  category: string;
  year: number;
  status: ResearchStatus;
  featured: boolean;
  published: boolean;
  dataset?: Dataset;
  experiments?: Experiment[];
  publications?: Publication[];
  relatedProjects?: string[]; // project slugs
}

export interface Skill {
  name: string;
  slug: string;
  category: string;
  description?: string;
  icon?: string;
  featured: boolean;
  order: number;
  active: boolean;
  technologies?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  description?: string;
  grade?: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  link?: string;
  image?: string;
  featured: boolean;
  order: number;
}

export interface JourneyItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  category: string;
  order: number;
  relatedProjectSlug?: string;
  relatedResearchSlug?: string;
}

export interface Profile {
  name: string;
  headline: string;
  shortBio: string;
  longBio: string;
  currentFocus: string;
  whatIBuild: string[];
  philosophy: string;
  location: string;
  availability: string;
  email: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon?: string;
  order: number;
  active: boolean;
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  ogImage?: string;
  keywords: string[];
  author: string;
}
