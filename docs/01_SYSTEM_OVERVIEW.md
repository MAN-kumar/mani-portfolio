# 01 — SYSTEM OVERVIEW

## Architecture Overview

The **Mani — Engineering Portfolio Platform** is engineered as a decoupled, multi-tier system separating data persistence, backend REST services, and high-performance frontend presentation.

```text
Visitor (Browser)
   │
   ├──► Vercel (Next.js 16 App Router Frontend) [https://mani-portfolio1.vercel.app]
   │       │
   │       ├──► Fetches JSON via Server-Side Fetch & Revalidation (60s)
   │       │
   │       ▼
   ├──► Render (Django 5 REST Framework Backend) [https://mani-portfolio-api.onrender.com/api/v1/]
   │       │
   │       ├──► Evaluates Authentication & Permissions (IsAdminUserOrReadOnly)
   │       ├──► Applies QuerySet Filtering (PublishedOnlyQuerySetMixin)
   │       │
   │       ▼
   └──► Managed PostgreSQL Database (Data Persistence)
```

---

## Core System Characteristics

### 1. 100% Public Visitor Access
* **Zero Barrier Entry**: Visitors to the portfolio do **NOT** require an account, login, signup, JWT token, or API key.
* **Public Content**: All published case studies, research papers, technical skills, career timeline, education, achievements, and active profile details are accessible to anyone globally.
* **Public Write Endpoint**: The public contact form (`/contact`) enables any visitor to send messages without prior authentication.

### 2. Administrator Access Control
* **Single Admin Owner**: Administrative creation, modification, deletion, and publication management exist exclusively for Mani.
* **Django Admin**: Admin authentication occurs securely at `/admin/` via Django's established session authentication framework (`SessionAuthentication`).
* **Server-Side Authorization**: Unauthenticated attempts to perform state-changing HTTP operations (`POST`, `PUT`, `PATCH`, `DELETE`) on protected API endpoints are blocked server-side, returning `HTTP 403 Forbidden` (`PERMISSION_DENIED`).

### 3. Data Integrity & Content Flow
* **Content as Data**: Portfolio content is treated as structured relational data stored in PostgreSQL tables rather than hardcoded HTML strings.
* **Decoupled Fallback Design**: If the backend API service is unreachable due to network downtime, the frontend data layer catches connection exceptions and falls back to static content buffers stored in `frontend/content/`, ensuring continuous application uptime.

---

## Service & Infrastructure Specifications

| Component | Production Hosting Provider | Tech Stack | Entrypoint / Endpoint |
|---|---|---|---|
| **Frontend** | Vercel | Next.js 16 (App Router), React 19, TypeScript, Framer Motion, Three.js | `https://mani-portfolio1.vercel.app` |
| **Backend** | Render | Django 5.2, Django REST Framework, Gunicorn WSGI, WhiteNoise | `https://mani-portfolio-api.onrender.com/api/v1/` |
| **Database** | Managed PostgreSQL Provider | PostgreSQL 15+ | Internal `DATABASE_URL` (SSL mode enabled) |
| **Admin Panel** | Render | Django Admin Interface | `https://mani-portfolio-api.onrender.com/admin/` |

---

## Production Security & Trust Boundaries

* **Database Isolation**: PostgreSQL is hosted on an isolated private cloud network. Direct browser connection to PostgreSQL is impossible.
* **Secret Protection**: `DJANGO_SECRET_KEY`, `DATABASE_URL`, and admin passwords reside strictly in backend environment variables (`Render`) and are never exposed in Git or `NEXT_PUBLIC_*` frontend variables.
* **CORS Policy**: Configured via `CORS_ALLOWED_ORIGINS` to allow requests strictly from `https://mani-portfolio1.vercel.app`. Wildcard CORS (`*`) is disabled.
