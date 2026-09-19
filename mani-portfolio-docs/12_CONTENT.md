# 12 — CONTENT

## Purpose
Define the content architecture separately from UI.

## Content Sources
### V1
- TypeScript
- JSON
- MDX

### V2
- Django REST API

### V3
- PostgreSQL + Django Admin

### V4
- Database
- GitHub
- Research
- Analytics
- AI

## Content Layers
- Identity
- Profile
- Projects
- Research
- Skills
- Experience
- Education
- Achievements
- Journey
- Resume
- Social Links
- Media
- Site Configuration

## Profile
Fields:
- name
- headline
- short bio
- long bio
- current focus
- what I build
- philosophy
- location
- availability

## Project
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
- problem
- objective
- approach
- architecture
- implementation
- results
- challenges
- learnings
- futureWork
- links
- relatedProjects
- relatedResearch

## Project Categories
- AI/ML
- Full Stack
- Research
- Computer Vision
- Cybersecurity
- Web
- Experimental

## Project Status
- Idea
- In Progress
- Completed
- Research
- Archived

`featured` and `published` are separate.

## Project Content Rule
Every project should answer:
- What?
- Why?
- How?
- Result?

Never invent metrics.

## Research
Fields:
- title
- slug
- abstract
- motivation
- research question
- methodology
- limitations
- future work
- category
- year
- status
- datasets
- experiments
- publications
- related projects

## Research Status
- researching
- in_progress
- completed
- under_review
- published
- archived

## Dataset
Structured dataset information.

## Experiment
Structured model/feature/parameter/result information.

## Explainability
Can store:
- method
- explanation
- feature importance
- visualizations
- interpretation

SHAP is a method/tool, not hard-coded into the UI.

## Skills
Skills represent capabilities.

Technologies represent tools.

Example:
```text
Skill: Machine Learning
Technology: Python / XGBoost
```

## Experience / Education / Achievement
Structured, reusable data.

## Resume
Resume is concise.
Portfolio is detailed.

## Content Lifecycle
```text
Idea
 ↓
Draft
 ↓
Review
 ↓
Published
 ↓
Updated
 ↓
Archived
```

## V1 Content Structure
```text
content/
├── profile.ts
├── projects.ts
├── research.ts
├── skills.ts
├── experience.ts
├── education.ts
├── achievements.ts
├── journey.ts
├── socials.ts
└── site.ts
```

Optional MDX:
```text
content/
├── projects/
├── research/
```

## Data Access
```text
lib/data/
```

Pages should call stable data functions rather than depend directly on storage implementation.

## Principle
> **Write content once, structure it properly, connect it intelligently, and let the system decide where and how it appears.**
