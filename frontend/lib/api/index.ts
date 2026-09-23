import { fetchApi, ApiError } from "./client";
import {
  ApiProfile,
  ApiProject,
  ApiResearch,
  ApiSkill,
  ApiExperience,
  ApiEducation,
  ApiAchievement,
  ApiSocialLink,
} from "./types";
import {
  normalizeProfile,
  normalizeProject,
  normalizeResearch,
  normalizeSkill,
  normalizeExperience,
  normalizeEducation,
  normalizeAchievement,
  normalizeSocialLink,
} from "./normalizers";
import {
  Profile,
  Project,
  Research,
  Skill,
  Experience,
  Education,
  Achievement,
  SocialLink,
} from "@/types/portfolio";

import { profileData } from "@/content/profile";
import { projectsData } from "@/content/projects";
import { researchData } from "@/content/research";
import { skillsData } from "@/content/skills";
import { experienceData } from "@/content/experience";
import { educationData } from "@/content/education";
import { achievementsData } from "@/content/achievements";
import { socialsData } from "@/content/socials";

// 1. Profile API
export async function getProfileFromApi(): Promise<Profile> {
  try {
    const rawProfiles = await fetchApi<ApiProfile[]>("profile/");
    if (Array.isArray(rawProfiles)) {
      if (rawProfiles.length > 0) {
        return normalizeProfile(rawProfiles[0]);
      }
      return profileData;
    }
    return profileData;
  } catch (error) {
    console.warn("API profile fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return profileData;
  }
}

// 2. Projects API
export async function getProjectsFromApi(): Promise<Project[]> {
  try {
    const rawProjects = await fetchApi<ApiProject[]>("projects/");
    if (Array.isArray(rawProjects)) {
      return rawProjects.map(normalizeProject);
    }
    return projectsData.filter((p) => p.published);
  } catch (error) {
    console.warn("API projects fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return projectsData.filter((p) => p.published);
  }
}

export async function getProjectBySlugFromApi(slug: string): Promise<Project | undefined> {
  try {
    const rawProj = await fetchApi<ApiProject>(`projects/${encodeURIComponent(slug)}/`);
    if (rawProj && rawProj.slug) {
      return normalizeProject(rawProj);
    }
    return undefined;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return undefined;
    }
    console.warn("API project detail fetch failed, checking fallback:", error instanceof Error ? error.message : error);
    const local = projectsData.find((p) => p.slug === slug);
    return local && local.published ? local : undefined;
  }
}

export async function getFeaturedProjectsFromApi(): Promise<Project[]> {
  try {
    const rawFeatured = await fetchApi<ApiProject[]>("projects/featured/");
    if (Array.isArray(rawFeatured)) {
      return rawFeatured.map(normalizeProject);
    }
    const projects = await getProjectsFromApi();
    return projects.filter((p) => p.featured);
  } catch {
    const projects = await getProjectsFromApi();
    return projects.filter((p) => p.featured);
  }
}

// 3. Research API
export async function getResearchFromApi(): Promise<Research[]> {
  try {
    const rawResearch = await fetchApi<ApiResearch[]>("research/");
    if (Array.isArray(rawResearch)) {
      return rawResearch.map(normalizeResearch);
    }
    return researchData.filter((r) => r.published);
  } catch (error) {
    console.warn("API research fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return researchData.filter((r) => r.published);
  }
}

export async function getResearchBySlugFromApi(slug: string): Promise<Research | undefined> {
  try {
    const rawRes = await fetchApi<ApiResearch>(`research/${encodeURIComponent(slug)}/`);
    if (rawRes && rawRes.slug) {
      return normalizeResearch(rawRes);
    }
    return undefined;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return undefined;
    }
    console.warn("API research detail fetch failed, checking fallback:", error instanceof Error ? error.message : error);
    const local = researchData.find((r) => r.slug === slug);
    return local && local.published ? local : undefined;
  }
}

// 4. Skills API
export async function getSkillsFromApi(): Promise<Skill[]> {
  try {
    const rawSkills = await fetchApi<ApiSkill[]>("skills/");
    if (Array.isArray(rawSkills)) {
      return rawSkills.map(normalizeSkill);
    }
    return skillsData.filter((s) => s.active).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn("API skills fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return skillsData.filter((s) => s.active).sort((a, b) => a.order - b.order);
  }
}

// 5. Experience API
export async function getExperiencesFromApi(): Promise<Experience[]> {
  try {
    const rawExp = await fetchApi<ApiExperience[]>("experience/");
    if (Array.isArray(rawExp)) {
      return rawExp.map(normalizeExperience);
    }
    return experienceData.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn("API experience fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return experienceData.sort((a, b) => a.order - b.order);
  }
}

// 6. Education API
export async function getEducationFromApi(): Promise<Education[]> {
  try {
    const rawEdu = await fetchApi<ApiEducation[]>("education/");
    if (Array.isArray(rawEdu)) {
      return rawEdu.map(normalizeEducation);
    }
    return educationData.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn("API education fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return educationData.sort((a, b) => a.order - b.order);
  }
}

// 7. Achievements API
export async function getAchievementsFromApi(): Promise<Achievement[]> {
  try {
    const rawAch = await fetchApi<ApiAchievement[]>("achievements/");
    if (Array.isArray(rawAch)) {
      return rawAch.map(normalizeAchievement);
    }
    return achievementsData.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn("API achievements fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return achievementsData.sort((a, b) => a.order - b.order);
  }
}

// 8. Social Links API
export async function getSocialsFromApi(): Promise<SocialLink[]> {
  try {
    const rawSocials = await fetchApi<ApiSocialLink[]>("social-links/");
    if (Array.isArray(rawSocials)) {
      return rawSocials.map(normalizeSocialLink);
    }
    return socialsData.filter((s) => s.active).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn("API socials fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return socialsData.filter((s) => s.active).sort((a, b) => a.order - b.order);
  }
}
