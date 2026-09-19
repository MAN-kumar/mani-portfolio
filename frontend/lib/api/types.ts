export interface ApiSocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon?: string;
  order: number;
  active: boolean;
}

export interface ApiProfile {
  id: string;
  name: string;
  headline: string;
  short_bio: string;
  long_bio: string;
  current_focus: string;
  location: string;
  email: string;
  social_links?: ApiSocialLink[];
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
}

export interface ApiTechnology {
  id: string;
  name: string;
  slug: string;
  category?: string;
  icon?: string;
  description?: string;
  featured: boolean;
  order?: number;
}

export interface ApiProjectMedia {
  id: string;
  type: "image" | "video" | "diagram" | string;
  file: string;
  title?: string;
  alt_text?: string;
  caption?: string;
  order: number;
  featured: boolean;
}

export interface ApiProjectLink {
  id: string;
  type: "github" | "demo" | "paper" | "dataset" | "documentation" | "other" | string;
  label?: string;
  url: string;
}

export interface ApiProjectRelationship {
  id: string;
  relationship_type: string;
  to_project_slug: string;
  to_project_title: string;
}

export interface ApiProject {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description?: string;
  category?: ApiCategory;
  technologies: ApiTechnology[];
  status: "Idea" | "In Progress" | "Completed" | "Research" | "Archived" | string;
  year: number;
  featured: boolean;
  published: boolean;
  order: number;
  thumbnail?: string;
  problem?: string;
  objective?: string;
  approach?: string;
  architecture?: string;
  implementation?: string;
  results?: string;
  challenges?: string;
  learnings?: string;
  future_work?: string;
  media?: ApiProjectMedia[];
  links?: ApiProjectLink[];
  source_relationships?: ApiProjectRelationship[];
}

export interface ApiDataset {
  id: string;
  name: string;
  description?: string;
  source?: string;
  source_url?: string;
  size?: string;
  feature_count?: number;
  format?: string;
}

export interface ApiExperimentResult {
  id: string;
  metric: string;
  value: string;
  unit?: string;
}

export interface ApiExperiment {
  id: string;
  name: string;
  model: string;
  feature_count?: number;
  parameters?: Record<string, string | number | boolean>;
  notes?: string;
  results?: ApiExperimentResult[];
}

export interface ApiPublication {
  id: string;
  title: string;
  venue: string;
  publication_date?: string;
  doi?: string;
  paper_url?: string;
  status: string;
}

export interface ApiResearch {
  id: string;
  title: string;
  slug: string;
  category?: ApiCategory;
  abstract: string;
  motivation?: string;
  research_question?: string;
  methodology?: string;
  limitations?: string;
  future_work?: string;
  year: number;
  status: "researching" | "in_progress" | "completed" | "under_review" | "published" | "archived" | string;
  featured: boolean;
  published: boolean;
  datasets?: ApiDataset[];
  experiments?: ApiExperiment[];
  publications?: ApiPublication[];
  related_projects?: ApiProject[];
}

export interface ApiSkill {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  icon?: string;
  technologies?: ApiTechnology[];
  featured: boolean;
  order: number;
  active: boolean;
}

export interface ApiExperience {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  order: number;
}

export interface ApiEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start: string;
  end?: string;
  description?: string;
  grade?: string;
  order: number;
}

export interface ApiAchievement {
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

export interface ApiResume {
  id: string;
  title: string;
  file: string;
  version: string;
  active: boolean;
  uploaded_at: string;
}
