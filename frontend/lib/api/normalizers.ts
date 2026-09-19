import {
  Profile,
  Project,
  Research,
  Skill,
  Experience,
  Education,
  Achievement,
  SocialLink,
  ProjectLinks,
  ProjectStatus,
  ResearchStatus,
  Dataset,
  Experiment,
  Publication,
} from "@/types/portfolio";
import {
  ApiProfile,
  ApiProject,
  ApiResearch,
  ApiSkill,
  ApiExperience,
  ApiEducation,
  ApiAchievement,
  ApiSocialLink,
  ApiProjectLink,
} from "./types";

export function normalizeProfile(apiProfile: ApiProfile): Profile {
  return {
    name: apiProfile.name,
    headline: apiProfile.headline,
    shortBio: apiProfile.short_bio,
    longBio: apiProfile.long_bio || apiProfile.short_bio,
    currentFocus: apiProfile.current_focus,
    whatIBuild: [
      "Scalable Full-Stack Systems",
      "Deep Learning & Computer Vision Engines",
      "Interactive 3D Web Experiences",
    ],
    philosophy:
      "Architecture before code. Simplicity over cleverness. Every system should be fast, correct, and intentional.",
    location: apiProfile.location || "Remote",
    availability: "Available for engineering leadership and high-impact AI/Systems contracts",
    email: apiProfile.email,
  };
}

export function normalizeSocialLink(apiSocial: ApiSocialLink): SocialLink {
  return {
    platform: apiSocial.platform,
    label: apiSocial.label,
    url: apiSocial.url,
    icon: apiSocial.icon,
    order: apiSocial.order,
    active: apiSocial.active,
  };
}

export function normalizeProject(apiProj: ApiProject): Project {
  // Normalize links array [{ type: "github", url: "..." }] to ProjectLinks object
  const linksObj: ProjectLinks = {};
  if (apiProj.links && Array.isArray(apiProj.links)) {
    apiProj.links.forEach((l: ApiProjectLink) => {
      const typeKey = l.type.toLowerCase() as keyof ProjectLinks;
      if (typeKey in linksObj || ["github", "demo", "paper", "dataset", "documentation", "other"].includes(typeKey)) {
        linksObj[typeKey] = l.url;
      }
    });
  }

  // Extract related project slugs
  const relatedProjects = apiProj.source_relationships
    ? apiProj.source_relationships.map((r) => r.to_project_slug)
    : [];

  // Media gallery extraction
  const gallery = apiProj.media
    ? apiProj.media.map((m) => m.file)
    : [];

  return {
    id: apiProj.id,
    slug: apiProj.slug,
    title: apiProj.title,
    shortDescription: apiProj.short_description,
    description: apiProj.description || apiProj.short_description,
    category: apiProj.category?.name || "AI Systems",
    technologies: apiProj.technologies
      ? apiProj.technologies.map((t) => t.name)
      : [],
    year: apiProj.year,
    status: (apiProj.status as ProjectStatus) || "Completed",
    featured: apiProj.featured,
    published: apiProj.published,
    thumbnail: apiProj.thumbnail || gallery[0],
    gallery,
    problem: apiProj.problem,
    objective: apiProj.objective,
    approach: apiProj.approach,
    architecture: apiProj.architecture,
    implementation: apiProj.implementation,
    results: apiProj.results,
    challenges: apiProj.challenges,
    learnings: apiProj.learnings,
    futureWork: apiProj.future_work,
    links: Object.keys(linksObj).length > 0 ? linksObj : undefined,
    relatedProjects,
  };
}

export function normalizeResearch(apiRes: ApiResearch): Research {
  const datasets: Dataset[] | undefined = apiRes.datasets?.map((d) => ({
    name: d.name,
    description: d.description || "",
    source: d.source || "",
    sourceUrl: d.source_url,
    size: d.size,
    featureCount: d.feature_count,
    format: d.format,
  }));

  const experiments: Experiment[] | undefined = apiRes.experiments?.map((e) => ({
    name: e.name,
    model: e.model,
    featureCount: e.feature_count,
    parameters: e.parameters,
    notes: e.notes,
    results: e.results?.map((r) => ({
      metric: r.metric,
      value: r.value,
      unit: r.unit,
    })),
  }));

  const publications: Publication[] | undefined = apiRes.publications?.map((p) => ({
    title: p.title,
    venue: p.venue,
    publicationDate: p.publication_date,
    doi: p.doi,
    paperUrl: p.paper_url,
    status: p.status,
  }));

  const relatedProjects = apiRes.related_projects
    ? apiRes.related_projects.map((p) => p.slug)
    : [];

  return {
    id: apiRes.id,
    title: apiRes.title,
    slug: apiRes.slug,
    abstract: apiRes.abstract,
    motivation: apiRes.motivation || "",
    researchQuestion: apiRes.research_question || "",
    methodology: apiRes.methodology || "",
    limitations: apiRes.limitations,
    futureWork: apiRes.future_work,
    category: apiRes.category?.name || "Machine Learning",
    year: apiRes.year,
    status: (apiRes.status as ResearchStatus) || "completed",
    featured: apiRes.featured,
    published: apiRes.published,
    dataset: datasets && datasets.length > 0 ? datasets[0] : undefined,
    experiments,
    publications,
    relatedProjects,
  };
}

export function normalizeSkill(apiSkill: ApiSkill): Skill {
  return {
    name: apiSkill.name,
    slug: apiSkill.slug,
    category: apiSkill.category,
    description: apiSkill.description,
    icon: apiSkill.icon,
    featured: apiSkill.featured,
    order: apiSkill.order,
    active: apiSkill.active,
    technologies: apiSkill.technologies
      ? apiSkill.technologies.map((t) => t.name)
      : [],
  };
}

export function normalizeExperience(apiExp: ApiExperience): Experience {
  return {
    id: apiExp.id,
    company: apiExp.company,
    role: apiExp.role,
    description: apiExp.description,
    startDate: apiExp.start_date,
    endDate: apiExp.end_date,
    current: apiExp.current,
    order: apiExp.order,
  };
}

export function normalizeEducation(apiEdu: ApiEducation): Education {
  const startYear = apiEdu.start ? new Date(apiEdu.start).getFullYear() : 2020;
  const endYear = apiEdu.end ? new Date(apiEdu.end).getFullYear() : undefined;

  return {
    id: apiEdu.id,
    institution: apiEdu.institution,
    degree: apiEdu.degree,
    field: apiEdu.field,
    startYear: isNaN(startYear) ? 2020 : startYear,
    endYear: endYear && !isNaN(endYear) ? endYear : undefined,
    description: apiEdu.description,
    grade: apiEdu.grade,
    order: apiEdu.order,
  };
}

export function normalizeAchievement(apiAch: ApiAchievement): Achievement {
  return {
    id: apiAch.id,
    title: apiAch.title,
    description: apiAch.description,
    category: apiAch.category,
    date: apiAch.date,
    link: apiAch.link,
    image: apiAch.image,
    featured: apiAch.featured,
    order: apiAch.order,
  };
}
