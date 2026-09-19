# 08 — DATABASE SCHEMA

## Database
PostgreSQL with Django ORM.

## Core Entities
- Profile
- SocialLink
- Project
- ProjectCategory
- Technology
- ProjectMedia
- ProjectLink
- ProjectRelationship
- Research
- ResearchCategory
- Dataset
- Experiment
- ExperimentResult
- Publication
- Skill
- Experience
- Education
- Achievement
- ContactMessage
- Resume
- SiteSetting

## Common Fields
```text
id
created_at
updated_at
```

Public models may additionally contain:
```text
published
featured
order
```

## Profile
- name
- headline
- short_bio
- long_bio
- current_focus
- location
- email
- resume

## SocialLink
- profile
- platform
- label
- url
- icon
- order
- active

## Project
- title
- slug
- short_description
- description
- status
- year
- featured
- published
- order
- problem
- objective
- approach
- architecture
- implementation
- results
- challenges
- learnings
- future_work

## ProjectMedia
- type
- file
- title
- alt_text
- caption
- order
- featured

## ProjectLink
Types:
- github
- demo
- paper
- dataset
- documentation
- other

## Research
- title
- slug
- abstract
- motivation
- research_question
- methodology
- limitations
- future_work
- year
- status
- featured
- published
- order

## Research Status
- researching
- in_progress
- completed
- published
- under_review
- archived

## Dataset
- name
- description
- source
- source_url
- size
- feature_count
- format

## Experiment
- research
- name
- model
- feature_count
- parameters JSONB
- notes

## ExperimentResult
- experiment
- metric
- value
- unit
- order

## Publication
- research
- title
- venue
- publication_date
- DOI
- paper_url
- status

## Skill
- name
- slug
- category
- description
- icon
- featured
- order
- active

## Experience
- company
- role
- description
- start_date
- end_date
- current
- order

## Education
- institution
- degree
- field
- start
- end
- description
- grade
- order

## Achievement
- title
- description
- category
- date
- link
- image
- order
- featured

## ContactMessage
- name
- email
- message
- status
- created_at

Private data.

## Resume
- title
- file
- version
- active
- uploaded_at

## SiteSetting
Global configuration.

## Indexes
Use indexes for:
- slugs
- published
- featured
- year
- status

## Rules
- UUID primary keys
- Unique slugs
- Deliberate foreign-key behavior
- Prefer archive over destructive deletion
- Database accessed through Django only

## Data Flow
```text
PostgreSQL
 ↓
Django ORM
 ↓
Serializer
 ↓
DRF
 ↓
Next.js
```

## Principle
> **The database is a professional knowledge graph.**
