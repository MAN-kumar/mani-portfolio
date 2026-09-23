# 15. Logging and Debugging

## 1. Logging Architecture Overview

Logging is implemented natively across both application tiers:
- **Backend (Django)**: Standard Python `logging` output directed to `stdout`/`stderr` (captured by Gunicorn via `Procfile` command `--log-file -`).
- **Frontend (Next.js)**: Build output, SSR log messages, and client console warnings streamed to Vercel runtime logs.

---

## 2. Production Log Sources

### 2.1. Render Backend Logs
- **Source**: Gunicorn server process stdout/stderr stream.
- **Access**: Render Dashboard -> `mani-portfolio-api` -> **Logs**.
- **Log Format**:
  ```text
  [2026-09-20 11:45:12 +0000] [12] [INFO] Starting gunicorn 21.2.0
  [2026-09-20 11:45:15 +0000] [14] [INFO] Listening at: http://0.0.0.0:10000
  10.244.0.1 - - [20/Sep/2026:11:46:01 +0000] "GET /api/v1/health/ HTTP/1.1" 200 64 "-" "curl/7.68.0"
  ```

### 2.2. Vercel Frontend Logs
- **Source**: Next.js Server Actions, Server Components, and static page hydration logs.
- **Access**: Vercel Dashboard -> `mani-portfolio1` -> **Logs**.

---

## 3. Useful Debugging Commands

### 3.1. Backend Debugging Commands
- **Run Django Server locally with debug output**:
  ```bash
  python manage.py runserver
  ```
- **Inspect SQL Queries Executed by Django ORM**:
  ```bash
  python manage.py shell
  ```
  ```python
  from django.db import connection
  from apps.projects.models import Project
  list(Project.objects.all())
  print(connection.queries)
  ```
- **Execute Backend Test Suite with Verbose Output**:
  ```bash
  python manage.py test apps.core -v 2
  ```

### 3.2. Frontend Debugging Commands
- **Run Development Server with Hot Reload**:
  ```bash
  npm run dev
  ```
- **Run TypeScript Compiler Check**:
  ```bash
  npx tsc --noEmit
  ```
- **Run ESLint Code Verification**:
  ```bash
  npm run lint
  ```

---

## 4. Common Log Messages & Diagnosis

| Log Snippet | Tier | Cause | Resolution |
|---|---|---|---|
| `DisallowedHost at /` | Backend | Incoming `Host` header not present in `ALLOWED_HOSTS` | Add request domain to `DJANGO_ALLOWED_HOSTS` in Render env |
| `CORS header 'Access-Control-Allow-Origin' missing` | Frontend | Request origin not in `CORS_ALLOWED_ORIGINS` | Add frontend URL to `CORS_ALLOWED_ORIGINS` on Render |
| `CSRF Failed: CSRF token missing or incorrect` | Backend | CSRF origin trusted check failed | Update `CSRF_TRUSTED_ORIGINS` with full scheme (`https://...`) |
| `relation "projects_project" does not exist` | Backend | Unapplied database migrations | Run `python manage.py migrate` |
| `Hydration failed because initial UI does not match` | Frontend | SSR output differs from initial client render | Ensure client-only components use `"use client"` or dynamic imports |

---

## 5. Security & What MUST NOT Be Logged

> [!CAUTION]
> **CRITICAL SECURITY REQUIREMENT**:
> The following items must **NEVER** be logged to stdout, stderr, or external log collectors under any circumstances:

- Plaintext user or admin passwords.
- Database connection strings containing user credentials (`DATABASE_URL`).
- Production Django `SECRET_KEY` values.
- Authentication session tokens or CSRF tokens.
- Private personal details submitted via contact forms.
