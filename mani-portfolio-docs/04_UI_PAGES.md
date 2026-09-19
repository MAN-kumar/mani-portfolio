# 04 — UI PAGES

## Routes
```text
/
 /about
 /projects
 /projects/[slug]
 /research
 /research/[slug]
 /journey
 /resume
 /contact
 /not-found
```

Future admin:
```text
/admin
/admin/projects
/admin/research
/admin/skills
/admin/experience
/admin/education
/admin/achievements
/admin/profile
/admin/settings
```

## Home
- Hero
- Current Focus
- Featured Projects
- Skills Snapshot
- Research Preview
- Journey Preview
- Contact CTA

## About
- Introduction
- What I Do
- Current Focus
- Philosophy
- Skills
- Education
- CTAs

## Projects
- Header
- Category/technology filters
- Search
- Sorting
- Project grid
- Empty state

## Project Detail
- Hero
- Visual
- Overview
- Problem
- Objective
- Approach
- Technology
- Architecture
- Implementation
- Experiments
- Results
- Challenges
- Learnings
- Future work
- Links
- Related projects

## Research
- Header
- Categories
- Research cards
- Status

## Research Detail
- Research question
- Motivation
- Dataset
- Methodology
- Experiments
- Model comparison
- Explainability
- Results
- Publication

## Journey
Interactive timeline.

## Resume
- Summary
- Education
- Skills
- Projects
- Research
- Experience
- Achievements
- Download

## Contact
- Header
- Contact information
- Form

## Data Flow
```text
Content
 ↓
Data Access
 ↓
Page
 ↓
Components
 ↓
UI
```

## Cross-Linking
- Project ↔ Research
- Project ↔ Skills
- Related projects

## Required States
- Loading
- Success
- Empty
- Error
- Not Found
