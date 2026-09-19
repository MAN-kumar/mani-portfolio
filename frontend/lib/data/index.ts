import { journeyData } from "@/content/journey";
import { siteConfig } from "@/content/site";
import {
  Profile,
  Project,
  Research,
  Skill,
  JourneyItem,
  Experience,
  Education,
  Achievement,
  SocialLink,
  SiteConfig,
} from "@/types/portfolio";
import {
  getProfileFromApi,
  getProjectsFromApi,
  getProjectBySlugFromApi,
  getFeaturedProjectsFromApi,
  getResearchFromApi,
  getResearchBySlugFromApi,
  getSkillsFromApi,
  getExperiencesFromApi,
  getEducationFromApi,
  getAchievementsFromApi,
  getSocialsFromApi,
} from "@/lib/api";

export async function getProfile(): Promise<Profile> {
  return getProfileFromApi();
}

export async function getProjects(): Promise<Project[]> {
  return getProjectsFromApi();
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return getProjectBySlugFromApi(slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return getFeaturedProjectsFromApi();
}

export async function getProjectsByTechnology(technology: string): Promise<Project[]> {
  const projects = await getProjects();
  const normalizedTech = technology.toLowerCase();
  return projects.filter((p) =>
    p.technologies.some((tech) => tech.toLowerCase() === normalizedTech)
  );
}

export async function getResearch(): Promise<Research[]> {
  return getResearchFromApi();
}

export async function getResearchBySlug(slug: string): Promise<Research | undefined> {
  return getResearchBySlugFromApi(slug);
}

export async function getSkills(): Promise<Skill[]> {
  return getSkillsFromApi();
}

export async function getJourney(): Promise<JourneyItem[]> {
  return journeyData.sort((a, b) => a.order - b.order);
}

export async function getExperiences(): Promise<Experience[]> {
  return getExperiencesFromApi();
}

export async function getEducation(): Promise<Education[]> {
  return getEducationFromApi();
}

export async function getAchievements(): Promise<Achievement[]> {
  return getAchievementsFromApi();
}

export async function getSocials(): Promise<SocialLink[]> {
  return getSocialsFromApi();
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return siteConfig;
}
