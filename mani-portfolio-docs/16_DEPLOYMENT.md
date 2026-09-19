# 16 — DEPLOYMENT

## Objective
Deploy the portfolio reliably from GitHub to production.

## Target Architecture
```text
Internet
 ↓
portfolio.example.com
 ↓
Vercel / Next.js
 ↓ HTTPS
api.example.com
 ↓
Django / DRF
 ↓
Managed PostgreSQL
 ↓
Object Storage
```

## Deployment Principle
> **Push code → verify → build → deploy → migrate → health check → monitor.**

## Repository
Recommended monorepo:
```text
mani-portfolio/
├── frontend/
├── backend/
├── docs/
├── deployment/
└── README.md
```

## Git Workflow
```text
Feature
 ↓
Local development
 ↓
Test
 ↓
Commit
 ↓
Push
 ↓
Review
 ↓
Merge
 ↓
Deploy
```

## Branches
```text
main
feature/*
fix/*
```

`main` represents deployable code.

## Frontend
Deploy Next.js to Vercel.

Typical:
```bash
npm run build
```

Production runtime is managed by Vercel.

## Frontend Variables
```env
NEXT_PUBLIC_API_URL=https://api.example.com/api/v1
NEXT_PUBLIC_SITE_URL=https://portfolio.example.com
```

## Backend
Deploy Django to Render, Railway, or VPS PaaS environment.

### Actual Build Command (`backend/build.sh`):
```bash
#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
```

### Actual Start Command (`backend/Procfile`):
```bash
gunicorn config.wsgi:application --log-file -
```

### Static Files Strategy:
Django serves static files in production via `WhiteNoise` middleware (`whitenoise.middleware.WhiteNoiseMiddleware`) using `CompressedManifestStaticFilesStorage`. Running `python manage.py collectstatic --noinput` compiles static assets to `backend/staticfiles`.

### Production Environment Variables (`backend/.env.example`):
```env
DJANGO_ENV=production
DJANGO_SECRET_KEY=<generate-strong-random-production-key>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=api.example.com
DATABASE_URL=postgresql://user:password@host:5432/dbname
CORS_ALLOWED_ORIGINS=https://portfolio.example.com
CSRF_TRUSTED_ORIGINS=https://portfolio.example.com
```

## Database
Use managed PostgreSQL.

Do not connect local development directly to production unnecessarily.

## Migrations
Before production:
```bash
python manage.py makemigrations
```

Review migrations.

Production:
```bash
python manage.py migrate
```

Back up before significant schema changes.

## Static Files
```bash
python manage.py collectstatic --noinput
```

## Media
Use object storage in production.

## Domains
```text
portfolio.example.com → frontend
api.example.com → backend
```

## HTTPS
Required for:
- frontend
- backend
- admin
- API

## Health Endpoint
```text
/api/v1/health/
```

Example:
```json
{
  "status": "ok"
}
```

## CI/CD
Future:
```text
GitHub
 ↓
Lint
 ↓
Type check
 ↓
Tests
 ↓
Build
 ↓
Deploy
```

## Preview Deployments
Pull requests can produce preview builds for:
- UI
- responsive behavior
- API integration
- SEO

## Rollback
```text
Detect
 ↓
Investigate
 ↓
Rollback application
 ↓
Verify database compatibility
 ↓
Health check
```

## Monitoring
Monitor:
- availability
- HTTP errors
- API latency
- database
- deployment failures
- build failures

## Smoke Test
After deployment:
- Homepage
- Navigation
- Projects
- Project detail
- Research
- Research detail
- Resume
- Contact
- API
- Admin

## First Deployment
```text
1. Create GitHub repository
2. Push project
3. Create PostgreSQL
4. Configure backend
5. Deploy Django
6. Run migrations
7. Create admin
8. Verify API
9. Deploy Next.js
10. Configure frontend
11. Connect domain
12. Configure HTTPS
13. Test frontend/API
14. Test contact
15. Test admin
16. Enable monitoring
```

## Definition of Done
```text
✓ GitHub configured
✓ Frontend deployed
✓ Backend deployed
✓ PostgreSQL connected
✓ Environment variables configured
✓ Migrations successful
✓ Static files work
✓ Media works
✓ API works
✓ Frontend/API integration works
✓ HTTPS works
✓ Domain works
✓ CORS works
✓ CSRF works
✓ Admin works
✓ Contact works
✓ Health check works
✓ Monitoring works
✓ Backups exist
✓ Rollback documented
```

## Principle
> **Build once, deploy consistently, monitor continuously, and keep a safe path back to the last known-good release.**
