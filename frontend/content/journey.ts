import { JourneyItem } from "@/types/portfolio";

export const journeyData: JourneyItem[] = [
  {
    id: "j-1",
    title: "Portfolio Platform Architecture",
    subtitle: "Digital Identity & Design System",
    date: "2026",
    description: "Architected a scalable personal digital platform separating content data access from reusable Next.js UI components.",
    category: "Milestone",
    order: 1,
    relatedProjectSlug: "interactive-portfolio-platform",
  },
  {
    id: "j-2",
    title: "Django REST Backend Core",
    subtitle: "API Specification & Relational Schema",
    date: "2025",
    description: "Designed PostgreSQL schema and DRF API specification for persistent content management.",
    category: "Backend",
    order: 2,
    relatedProjectSlug: "django-rest-api-engine",
  },
  {
    id: "j-3",
    title: "Explainable AI Research",
    subtitle: "Feature Importance & Model Visualizations",
    date: "2025",
    description: "Explored model explainability methodologies for complex machine learning models.",
    category: "Research",
    order: 3,
    relatedResearchSlug: "explainable-ai-dashboard",
  },
];
