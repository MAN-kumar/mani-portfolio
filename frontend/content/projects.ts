import { Project } from "@/types/portfolio";

export const projectsData: Project[] = [
  {
    id: "proj-1",
    slug: "interactive-portfolio-platform",
    title: "Mani — Digital Identity & Portfolio",
    shortDescription:
      "A dark-first, highly responsive portfolio platform built with Next.js App Router, TypeScript, and Framer Motion.",
    description:
      "A product-grade personal portfolio engineered as a structured data system. Features modular component design, URL-based state sync, and strict accessibility standards.",
    category: "Full Stack",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Django",
    ],
    year: 2026,
    status: "Completed",
    featured: true,
    published: true,
    problem:
      "Traditional developer portfolios often mix UI presentation with hardcoded text, making content updates fragile and maintenance cumbersome.",
    objective:
      "Engineered a scalable architecture where structured JSON/API data feeds reusable component layouts across 9 interactive routes.",
    approach:
      "Implemented a strict multi-layer separation between content data access, feature containers, and atomic UI design system primitives.",
    architecture:
      "Next.js App Router with React Server Components, TypeScript strong interfaces, and a stable abstraction layer ready for Django REST integration.",
    implementation:
      "Designed reusable tokens, dark-first color system, accessible form controls, and subtle micro-animations for responsive desktop & mobile screens.",
    results:
      "Achieved 100% type safety, zero lint warnings, fast static rendering, and instant filter state updates.",
    challenges:
      "Maintaining strict accessibility focus states while supporting custom visual tokens and clean dark mode aesthetics.",
    learnings:
      "Decoupling the data access abstraction from the presentation layer makes future CMS or database migration seamless.",
    futureWork:
      "Integrate PostgreSQL backend database with Django Admin CMS for real-time live content updates.",
    links: {
      github: "https://github.com/example/mani-portfolio",
      demo: "https://mani.dev",
    },
    relatedProjects: ["django-rest-api-engine"],
    relatedResearch: ["explainable-ai-dashboard"],
  },
  {
    id: "proj-2",
    slug: "django-rest-api-engine",
    title: "Django REST Content Management Core",
    shortDescription:
      "Scalable Django REST Framework API powering dynamic data management and PostgreSQL persistence.",
    description:
      "A robust backend infrastructure with custom user model authentication, structured content serialization, CORS/CSRF security, and automated database indexing.",
    category: "Full Stack",
    technologies: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Python",
      "Docker",
    ],
    year: 2026,
    status: "In Progress",
    featured: true,
    published: true,
    problem:
      "Static content configuration requires redeployment whenever portfolio case studies or research items are updated.",
    objective:
      "Provide a secure, authenticated REST API powering dynamic GET endpoints for public consumption and write access for content owners.",
    approach:
      "Utilized Django ORM models with UUID keys, custom serializers, select_related query optimizations, and rate-limited endpoints.",
    architecture:
      "PostgreSQL storage engine connected via Django ORM to Django REST Framework endpoints protected by rate limiting and CORS policies.",
    results:
      "Delivered sub-50ms API response times with efficient SQL queries avoiding N+1 join overhead.",
    links: {
      github: "https://github.com/example/django-portfolio-core",
    },
    relatedProjects: ["interactive-portfolio-platform"],
  },
  {
    id: "proj-3",
    slug: "computer-vision-research-lab",
    title: "Real-Time Visual Analysis System",
    shortDescription:
      "Computer vision pipeline for image classification, feature extraction, and real-time object identification.",
    description:
      "An experimental machine learning environment for training, testing, and evaluating deep visual perception models.",
    category: "AI/ML",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "Scikit-Learn",
    ],
    year: 2025,
    status: "Completed",
    featured: false,
    published: true,
    problem:
      "High computational costs and latency when performing multi-class visual inference on continuous video frames.",
    objective:
      "Optimize model inference pipeline for real-time responsiveness without dropping accuracy metrics.",
    approach:
      "Applied model quantization, feature map pruning, and tensor batch optimization.",
    results:
      "Reduced latency by 42% while retaining 94.5% classification accuracy across benchmark validation splits.",
    links: {
      github: "https://github.com/example/cv-research-lab",
    },
    relatedResearch: ["explainable-ai-dashboard"],
  },
];
