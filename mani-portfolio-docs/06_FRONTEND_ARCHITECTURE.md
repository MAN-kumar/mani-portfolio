# 06 — FRONTEND ARCHITECTURE

## Stack
- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber

## Structure
```text
mani-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── research/page.tsx
│   ├── research/[slug]/page.tsx
│   ├── journey/page.tsx
│   ├── resume/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   ├── ui/
│   ├── projects/
│   ├── research/
│   ├── skills/
│   ├── journey/
│   ├── home/
│   └── 3d/
├── content/
├── lib/
├── types/
├── public/
├── config/
├── package.json
├── tsconfig.json
└── README.md
```

## Layers
```text
Routes
 ↓
Page Layout
 ↓
Feature Components
 ↓
UI Components
 ↓
Data Layer
 ↓
Utilities
```

## Rules
- Pages stay thin.
- Feature components handle portfolio functionality.
- UI components remain generic.
- Content is information, not UI.
- Server components by default.
- Client components only when state/browser APIs/interactivity/3D are required.
- Filters/search use URL parameters.
- 3D is isolated and has a fallback.
- Animation configuration is centralized.
- SEO is generated from content where possible.
- Static rendering is preferred initially.
- Use loading/error/not-found states.
- Use path aliases such as `@/...`.

## Project Model
Fields:
- id
- slug
- title
- shortDescription
- description
- category
- technologies
- year
- status
- featured
- published
- thumbnail
- gallery
- links
- content sections
- relatedProjects
- relatedResearch

## Research Model
Fields:
- title
- slug
- abstract
- category
- year
- status
- featured
- published
- dataset
- methodology
- experiments
- results
- links

## Data Access
Examples:
```text
getProjects()
getProjectBySlug(slug)
getFeaturedProjects()
getProjectsByTechnology()
getResearch()
getResearchBySlug()
getSkills()
getJourney()
getProfile()
```

## Core Architecture
```text
Content/Config
 ↓
Data Access
 ↓
Routes/Features
 ↓
UI/Motion/3D
 ↓
Browser
```
