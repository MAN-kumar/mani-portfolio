# 23. AI Coding Context & Agent Instructions

> [!IMPORTANT]
> **READ THIS DOCUMENT FIRST BEFORE MAKING ANY CODE OR CONFIGURATION MODIFICATIONS.**
> This document summarizes key architecture, conventions, constraints, and source-of-truth rules for future AI coding agents.

---

## 1. Project Purpose & High-Level Architecture

This project is a high-performance, production-ready portfolio monorepo for a Software Engineer & Machine Learning Specialist.

### Architecture Overview
```
Frontend (Next.js 16 App Router on Vercel)
       │
       ▼ REST API Calls (HTTP / JSON Envelopes)
Backend (Django 5 REST Framework on Render)
       │
       ▼ Django ORM Queries
Database (Managed PostgreSQL on Render)
```

---

## 2. Technology Stack & Key Tooling

| Component | Framework / Technology | Primary Location |
|---|---|---|
| **Frontend Framework** | Next.js 16 (App Router), React 19, TypeScript | `frontend/` |
| **Styling & Motion** | Vanilla CSS / CSS Modules, Framer Motion | `frontend/app/`, `frontend/components/motion/` |
| **3D Canvas & Graphics** | Three.js, React Three Fiber (`@react-three/fiber`, `drei`) | `frontend/components/3d/` |
| **Backend Framework** | Python 3, Django 5.2, Django REST Framework | `backend/` |
| **Database & ORM** | PostgreSQL (Production) / SQLite (Dev fallback) | `backend/apps/*/models.py` |
| **Static File Serving** | WhiteNoise (`CompressedManifestStaticFilesStorage`) | `backend/config/settings/base.py` |
| **Deployment Targets** | Vercel (Frontend) & Render Web Service (Backend) | `frontend/`, `backend/build.sh`, `backend/Procfile` |

---

## 3. Directory Structure Quick Reference

```
my_portfolio/
├── docs/                        # Complete production documentation system (25 Markdown files)
├── frontend/                    # Next.js frontend application
│   ├── app/                     # App Router routes (projects, research, journey, contact)
│   ├── components/              # Modular UI components (ui, layout, motion, 3d, feedback)
│   ├── content/                 # Static content fallbacks (projects.ts, research.ts, etc.)
│   ├── lib/                     # API client integration (lib/api/index.ts)
│   └── package.json             # Frontend dependency manifest
└── backend/                     # Django backend application
    ├── apps/                    # Modular Django apps (core, projects, research, profile, etc.)
    ├── config/                  # Django settings (base.py, development.py, production.py)
    ├── build.sh                 # Production deployment script for Render
    ├── Procfile                 # Production process manager definition
    └── requirements.txt         # Python dependency manifest
```

---

## 4. Fundamental Rules & Constraints for AI Coding Agents

### 4.1. Source-of-Truth & Code Inspection Rules
1. **Never Assume or Invent Code**: Always inspect actual source files using viewing and grep tools before making assertions or edits.
2. **Preserve Existing Functionality**: Do NOT redesign the UI, rewrite working architecture, or add arbitrary third-party services unless explicitly requested by the user.

### 4.2. Immutable Architectural Safeguards (DO NOT CHANGE CASUALLY)
- **Primary Key Format**: All models inherit from `TimeStampedModel` with UUID primary keys. Do NOT convert to auto-incrementing integer IDs.
- **REST Envelope Structure**: Responses must maintain the `StandardJSONRenderer` envelope format (`{"status": "...", "data": ...}`).
- **Draft Protection**: The public API MUST preserve `PublishedOnlyQuerySetMixin` filtering (`published=True`, `active=True`).

### 4.3. Security & Secret Rules
- **No Hardcoded Secrets**: Secrets MUST NEVER be committed in code or `.env` files. Read from `os.getenv()`.
- **Admin Access Protection**: Django Admin writes require `IsAdminUserOrReadOnly` permissions.
- **HTTPS & Cookie Flags**: `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, and `SECURE_SSL_REDIRECT` MUST remain enabled in `production.py`.

### 4.4. Verification Rules
- **Verification Requirement**: Never claim a change is complete without verifying build/test status:
  - Backend: `python manage.py test apps.core --noinput`
  - Frontend: `npx tsc --noEmit && npm run lint && npm run build`
