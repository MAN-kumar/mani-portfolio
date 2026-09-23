# 02 — FEATURE REGISTRY

This registry documents all currently implemented, functional features across the portfolio platform.

---

## Implemented Feature Matrix

| Feature Name | Status | Frontend Location | Backend / API Location | Database Model | Auth Requirement | Notes |
|---|---|---|---|---|---|---|
| **Dynamic Hero Section** | Complete | `frontend/components/home/Hero.tsx` | `GET /api/v1/profile/` | `Profile` | Public | Displays name, headline, current focus, and CTAs. Includes 3D canvas wrapper. |
| **Interactive 3D Content Graph** | Complete | `frontend/components/3d/ContentGraph.tsx` | None (Client-side R3F) | None | Public | Renders interactive node graph representing skills, technologies, and projects. WebGL fallback integrated. |
| **Philosophy / Data View Toggle** | Complete | `frontend/components/home/PhilosophyDataToggle.tsx` | `GET /api/v1/home/` | None (Client state) | Public | Toggles homepage visual mode between philosophy manifesto and structured system metrics. |
| **Projects Directory & Search** | Complete | `frontend/app/projects/page.tsx` | `GET /api/v1/projects/` | `Project`, `ProjectCategory`, `Technology` | Public | Supports technology filtering, category filtering, search term filtering, and ordering. |
| **Project Case Study Detail** | Complete | `frontend/app/projects/[slug]/page.tsx` | `GET /api/v1/projects/{slug}/` | `Project`, `ProjectMedia`, `ProjectLink`, `ProjectRelationship` | Public | Renders problem statement, objective, approach, architecture, results, challenges, learnings, future work, and links. |
| **Featured Projects Grid** | Complete | `frontend/components/home/FeaturedProjects.tsx` | `GET /api/v1/projects/featured/` | `Project` (`featured=True`) | Public | Highlights top engineering projects on the homepage. |
| **Research Logbook Directory** | Complete | `frontend/app/research/page.tsx` | `GET /api/v1/research/` | `Research`, `ResearchCategory` | Public | Lists research papers, notes, and experimental logs. |
| **Research Paper Detail** | Complete | `frontend/app/research/[slug]/page.tsx` | `GET /api/v1/research/{slug}/` | `Research`, `Dataset`, `Experiment`, `ExperimentResult` | Public | Renders abstract, research question, methodology, dataset specs, experiment metrics table, and limitations. |
| **Interactive Skills Catalog** | Complete | `frontend/components/home/SkillsPreview.tsx` | `GET /api/v1/skills/` | `Skill`, `Technology` | Public | Categorized technical skill blocks showing associated technologies. |
| **Engineering Journey Timeline** | Complete | `frontend/app/journey/page.tsx` | `frontend/content/journey.ts` | Static (`JourneyItem`) | Public | Chronological milestone trace linking key events to projects and research. |
| **Experience & Education Timeline** | Complete | `frontend/app/about/page.tsx` | `GET /api/v1/experience/`, `GET /api/v1/education/` | `Experience`, `Education` | Public | Lists career history and academic engineering background. |
| **Achievements Showcase** | Complete | `frontend/app/about/page.tsx` | `GET /api/v1/achievements/` | `Achievement` | Public | Key awards, releases, and milestones. |
| **Interactive Contact Form** | Complete | `frontend/app/contact/page.tsx` | Client state & Django Admin | `ContactMessage` | Public submission | Form validation for name, email, message. Django Admin manages message status. |
| **Resume Download & Viewer** | Complete | `frontend/app/resume/page.tsx` | `GET /api/v1/resume/` | `Resume` | Public | Active resume version display and PDF download link. |
| **Global Search Endpoint** | Complete | None (API utility) | `GET /api/v1/search/?q=` | Multi-model search | Public | Global search query endpoint scanning projects, research, and skills. |
| **Health Check Endpoint** | Complete | None | `GET /api/v1/health/` | None | Public | System status and service health check (`{"status": "ok"}`). |
| **Django Admin CMS** | Complete | None (Admin Web UI) | `/admin/` | All models | Staff/Superuser | Content management interface for adding, editing, publishing, and deleting portfolio content. |
| **Bootstrap Admin CLI** | Complete | None (PaaS build step) | `python manage.py bootstrap_admin` | `User` | Environment-driven | Idempotently creates initial superuser during Render deployment using `BOOTSTRAP_ADMIN_*` variables. |
| **Seed Data CLI** | Complete | None (PaaS build step) | `python manage.py seed_data` | All models | CLI | Idempotently populates PostgreSQL DB with canonical portfolio content from frontend content models. |
