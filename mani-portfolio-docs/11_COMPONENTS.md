# 11 — COMPONENTS

## Architecture
Components are divided into:
- Layout
- UI
- Feature
- Page-level composition

## Structure
```text
components/
├── layout/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── PageContainer.tsx
│   └── Section.tsx
├── ui/
│   ├── Button.tsx
│   ├── LinkButton.tsx
│   ├── Badge.tsx
│   ├── TechnologyTag.tsx
│   ├── SectionHeading.tsx
│   ├── Divider.tsx
│   ├── Modal.tsx
│   ├── Tooltip.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Skeleton.tsx
│   ├── EmptyState.tsx
│   └── ErrorState.tsx
├── home/
│   ├── Hero.tsx
│   ├── CurrentFocus.tsx
│   ├── FeaturedProjects.tsx
│   ├── SkillsPreview.tsx
│   ├── ResearchPreview.tsx
│   └── ContactCTA.tsx
├── projects/
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── ProjectFilter.tsx
│   ├── ProjectSearch.tsx
│   ├── ProjectHero.tsx
│   ├── ProjectOverview.tsx
│   ├── ProjectArchitecture.tsx
│   ├── ProjectResults.tsx
│   ├── ProjectLinks.tsx
│   └── RelatedProjects.tsx
├── research/
│   ├── ResearchCard.tsx
│   ├── ResearchGrid.tsx
│   ├── ResearchFilter.tsx
│   ├── ResearchHero.tsx
│   ├── ResearchMethodology.tsx
│   ├── ResearchExperiments.tsx
│   ├── ResearchResults.tsx
│   └── PublicationCard.tsx
├── skills/
│   ├── SkillGroup.tsx
│   ├── SkillCard.tsx
│   ├── TechnologyList.tsx
│   └── TechnologyTag.tsx
├── journey/
│   ├── Timeline.tsx
│   ├── TimelineItem.tsx
│   └── JourneyDetail.tsx
├── resume/
│   ├── ResumePreview.tsx
│   ├── ResumeSection.tsx
│   └── ResumeDownload.tsx
├── contact/
│   ├── ContactForm.tsx
│   ├── ContactInfo.tsx
│   └── SocialLinks.tsx
├── feedback/
│   ├── LoadingState.tsx
│   ├── ErrorState.tsx
│   ├── EmptyState.tsx
│   └── NotFoundState.tsx
└── 3d/
    ├── HeroScene.tsx
    ├── BackgroundScene.tsx
    ├── InteractiveObject.tsx
    └── SceneFallback.tsx
```

## Rules
- Components receive structured data.
- Generic UI must not contain portfolio-specific content.
- Server components by default.
- Client components only when needed.
- Props are strongly typed.
- Prefer composition over huge prop lists.
- Lower-level components must not depend on higher-level components.
- Reuse design tokens.
- Use Next Image where appropriate.
- Use Lucide or the established icon system.
- Provide accessibility states.
- Support reduced motion.
- Lazy-load expensive 3D features.

## Critical Components
### ProjectCard
Includes:
- number
- image
- category
- title
- description
- technologies
- status
- year
- CTA

### ProjectGrid
- 3 columns desktop
- 2 tablet
- 1 mobile

### ContactForm
States:
- idle
- editing
- submitting
- success
- error

## Data Flow
```text
Database/JSON
 ↓
Data Layer
 ↓
Page
 ↓
Feature Component
 ↓
UI Component
 ↓
Browser
```

## Definition of Done
A component should have:
- Clear purpose
- Typed props
- Responsive behavior
- States
- Accessibility
- Animation where appropriate
- Design tokens
- Reusability
