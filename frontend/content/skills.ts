import { Skill } from "@/types/portfolio";

export const skillsData: Skill[] = [
  {
    name: "Full-Stack Web Development",
    slug: "full-stack-web-development",
    category: "Engineering",
    description: "Building end-to-end web applications with Next.js, React, TypeScript, and modern CSS architecture.",
    featured: true,
    order: 1,
    active: true,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    name: "Backend & API Architecture",
    slug: "backend-api-architecture",
    category: "Engineering",
    description: "Designing RESTful APIs, relational databases, authentication schemes, and scalable server backends.",
    featured: true,
    order: 2,
    active: true,
    technologies: ["Django", "Django REST Framework", "PostgreSQL", "Python", "REST APIs"],
  },
  {
    name: "Machine Learning & AI",
    slug: "machine-learning-ai",
    category: "Artificial Intelligence",
    description: "Developing machine learning pipelines, model training experiments, and explainability visualizations.",
    featured: true,
    order: 3,
    active: true,
    technologies: ["Python", "PyTorch", "Scikit-Learn", "OpenCV", "NumPy", "Pandas"],
  },
  {
    name: "Interactive Motion & UI Design",
    slug: "interactive-motion-ui-design",
    category: "Design & UX",
    description: "Crafting dark-first responsive interfaces, smooth motion transitions, and interactive visual components.",
    featured: true,
    order: 4,
    active: true,
    technologies: ["Framer Motion", "Three.js", "Tailwind CSS", "Figma"],
  },
];
