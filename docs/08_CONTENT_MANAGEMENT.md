# 08. Content Management

## 1. Content Architecture Overview

The portfolio system uses a hybrid content architecture:
1. **Dynamic / Database-Driven Content**: Managed through Django Admin, stored in PostgreSQL, and served via the REST API (`/api/v1/`).
2. **Static / Hardcoded Content**: Selected static fallbacks (such as journey timeline definitions and core offline fallbacks in `frontend/content/`) ensure high availability even when backend API calls fail or offline.

---

## 2. Dynamic Database Content vs. Static Content

| Entity / Domain | Source of Truth | Admin Management | API Endpoint | Static Fallback Path |
|---|---|---|---|---|
| **Profile & Bio** | PostgreSQL | `Django Admin -> Profile` | `/api/v1/profile/` | `frontend/content/profile.ts` |
| **Social Links** | PostgreSQL | `Django Admin -> Social Links` | `/api/v1/social-links/` | `frontend/content/social.ts` |
| **Resume Version** | PostgreSQL | `Django Admin -> Resumes` | `/api/v1/resume/` | `frontend/content/profile.ts` |
| **Projects & Media** | PostgreSQL | `Django Admin -> Projects` | `/api/v1/projects/` | `frontend/content/projects.ts` |
| **Research & Papers** | PostgreSQL | `Django Admin -> Research` | `/api/v1/research/` | `frontend/content/research.ts` |
| **Skills Catalog** | PostgreSQL | `Django Admin -> Skills` | `/api/v1/skills/` | `frontend/content/skills.ts` |
| **Work Experience** | PostgreSQL | `Django Admin -> Experience` | `/api/v1/experience/` | `frontend/content/experience.ts` |
| **Education** | PostgreSQL | `Django Admin -> Education` | `/api/v1/education/` | `frontend/content/education.ts` |
| **Achievements** | PostgreSQL | `Django Admin -> Achievements` | `/api/v1/achievements/` | `frontend/content/achievements.ts` |
| **Contact Messages** | PostgreSQL | `Django Admin -> Contact Messages` | Form Submission | None |
| **Journey Milestones**| Static TS | N/A (Code File) | N/A | `frontend/content/journey.ts` |

---

## 3. Django Admin Operations

The production Django Admin dashboard is available at:
`https://mani-portfolio-api.onrender.com/admin/`

### Features & Controls
- **Staff Access**: Protected by Django `IsAdminUser` permission and staff authentication (`is_staff=True`).
- **Content Filtering**: Admin interfaces include search bars, filter sidebars by status (`published`, `featured`, `active`), and date range pickers.
- **Inlines**:
  - `ProjectAdmin` includes `ProjectMediaInline`, `ProjectLinkInline`, and `ProjectRelationshipInline`.
  - `ResearchAdmin` includes `DatasetInline`, `ExperimentInline`, and `PublicationInline`.
  - `ProfileAdmin` includes `SocialLinkInline`.

---

## 4. Published vs. Unpublished (Draft) Visibility

- **Projects & Research**: Have a `published` boolean field (default: `True`).
  - When `published=True`, items are visible to all public website visitors.
  - When `published=False`, items are hidden from public API endpoints (`/api/v1/projects/` and `/api/v1/research/`). Authenticated staff users viewing the API will continue to see unpublished items for preview purposes via `PublishedOnlyQuerySetMixin`.
- **Social Links, Resumes & Skills**: Have an `active` boolean field (default: `True`). Only items with `active=True` are returned to public site visitors.

---

## 5. Automatic Data Seeding (`seed_data` Command)

The backend includes a custom Django management command:
`python manage.py seed_data`

### Behavior & Idempotency
- Executed automatically during production deployment inside `backend/build.sh`.
- Seeds realistic portfolio records across all models (Profile, Projects, Research, Skills, Experience, Education, Achievements) if tables are empty.
- **Idempotency**: Checks `Model.objects.exists()` before seeding each entity. Existing database content is preserved and never overwritten.

---

## 6. Admin Bootstrapping (`bootstrap_admin` Command)

The backend includes an automated superuser initialization command:
`python manage.py bootstrap_admin`

### Security Protocol
- Reads credentials from environment variables:
  - `BOOTSTRAP_ADMIN_ENABLED="true"`
  - `BOOTSTRAP_ADMIN_USERNAME`
  - `BOOTSTRAP_ADMIN_EMAIL`
  - `BOOTSTRAP_ADMIN_PASSWORD`
- If `BOOTSTRAP_ADMIN_ENABLED` is not `"true"`, the command safely exits without action.
- Creates or updates the designated superuser idempotently without exposing plaintext credentials in logs or source control.
