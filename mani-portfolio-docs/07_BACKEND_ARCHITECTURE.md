# 07 — BACKEND ARCHITECTURE

## Stack
- Django
- Django REST Framework
- PostgreSQL
- Authentication
- Object storage
- Redis/cache later
- Render/Railway/VPS

## Structure
```text
backend/
├── manage.py
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── apps/
│   ├── core/
│   ├── projects/
│   ├── research/
│   ├── skills/
│   ├── experience/
│   ├── education/
│   ├── achievements/
│   ├── profile/
│   ├── contact/
│   └── media/
├── requirements.txt
├── .env
└── README.md
```

## Responsibilities
- Content management
- Validation
- Authentication
- Authorization
- Media
- Search
- Filtering
- Relationships
- Contact
- Analytics
- API

## Project Fields
- id
- title
- slug
- short_description
- description
- category
- status
- year
- featured
- published
- thumbnail
- problem
- objective
- approach
- architecture
- implementation
- results
- challenges
- learnings
- future_work
- created_at
- updated_at

## Project Status
- Idea
- In Progress
- Completed
- Research
- Archived

## Technology
Technology is a separate entity with Project ↔ Technology many-to-many.

## Research
Research supports:
- datasets
- experiments
- publications
- related projects

## API
Base:
```text
/api/v1/
```

Public:
- GET published content

Admin:
- authenticated writes

## Media
Use:
- Cloudinary
- S3
- R2
- Supabase Storage

## Contact Security
- Validation
- Rate limiting
- Spam protection
- Email validation
- Message limits

## Deployment
```text
Vercel
 ↓
Next.js

Render/Railway
 ↓
Django

Managed PostgreSQL
```

## Principle
> **Mani should manage the content. The system should manage the presentation.**
