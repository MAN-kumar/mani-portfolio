# 12. Deployment Guide

## 1. Production Architecture Overview

The system is deployed using a decoupled serverless/managed infrastructure model:

```
                  +------------------------+
                  |  GitHub Repository     |
                  |  (MAIN Branch)         |
                  +-----------+------------+
                              |
              +---------------+---------------+
              |                               |
              v                               v
  +-----------------------+       +-----------------------+
  |    Vercel Cloud       |       |    Render Cloud       |
  |  (Next.js Frontend)   |       |   (Django Backend)    |
  +-----------+-----------+       +-----------+-----------+
              |                               |
              v                               v
  https://mani-portfolio1.vercel.app  https://mani-portfolio-api.onrender.com
                                              |
                                              v
                                  +-----------------------+
                                  |   Managed PostgreSQL  |
                                  |  (Render Database)    |
                                  +-----------------------+
```

---

## 2. Backend Deployment on Render

### 2.1. Render Service Specification
- **Service Type**: Web Service (Free Tier)
- **Environment**: Python 3
- **Root Directory**: `backend`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn config.wsgi:application --log-file -`

### 2.2. Build Script (`backend/build.sh`) Execution Flow
```bash
#!/usr/bin/env bash
set -o errexit

# 1. Install production dependencies
pip install -r requirements.txt

# 2. Collect static files for WhiteNoise
python manage.py collectstatic --noinput

# 3. Apply database migrations to PostgreSQL
python manage.py migrate

# 4. Seed initial content idempotently if tables are empty
python manage.py seed_data

# 5. Idempotently bootstrap superuser if env vars are present
python manage.py bootstrap_admin
```

### 2.3. Process Management (`backend/Procfile`)
```procfile
web: gunicorn config.wsgi:application --log-file -
```

### 2.4. Required Render Environment Variables
- `DJANGO_SETTINGS_MODULE="config.settings.production"`
- `SECRET_KEY="<production-random-secret>"`
- `DATABASE_URL="<managed-postgres-internal-uri>"`
- `CORS_ALLOWED_ORIGINS="https://mani-portfolio1.vercel.app"`
- `CSRF_TRUSTED_ORIGINS="https://mani-portfolio1.vercel.app"`
- `SECURE_SSL_REDIRECT="True"`

---

## 3. Frontend Deployment on Vercel

### 3.1. Vercel Project Specification
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.2. Required Vercel Environment Variables
- `NEXT_PUBLIC_API_URL="https://mani-portfolio-api.onrender.com/api/v1"`
- `NEXT_PUBLIC_SITE_URL="https://mani-portfolio1.vercel.app"`

---

## 4. Verification & Health Checks

Following automated build completion on Vercel and Render, run the verification sequence:

1. **Backend Health Endpoint**:
   ```bash
   curl -i https://mani-portfolio-api.onrender.com/api/v1/health/
   ```
   *Expected Output*: HTTP 200 OK with `{"status": "ok", "service": "mani-portfolio-backend", "version": "1.0.0"}`

2. **Backend API Data Integrity**:
   ```bash
   curl -i https://mani-portfolio-api.onrender.com/api/v1/projects/
   ```
   *Expected Output*: HTTP 200 OK returning seeded projects array.

3. **Frontend Hydration Check**:
   Open `https://mani-portfolio1.vercel.app` in a browser. Confirm featured projects, research, and skills load correctly without error banners.

4. **Django Admin Verification**:
   Navigate to `https://mani-portfolio-api.onrender.com/admin/` and verify staff login using bootstrapped credentials.

---

## 5. Rollback Procedures

### 5.1. Vercel Frontend Rollback
1. Go to Vercel Dashboard -> `mani-portfolio1` -> **Deployments**.
2. Locate the previously verified working build.
3. Click **...** -> **Promote to Production**.
4. Propagation occurs instantly without rebuild delay.

### 5.2. Render Backend Rollback
1. Go to Render Dashboard -> `mani-portfolio-api` -> **Events**.
2. Select the previous successful deployment.
3. Click **Rollback to this deploy**.
4. If a recent database migration caused an issue, revert the migration first before rolling back backend code:
   ```bash
   python manage.py migrate core <previous_migration_number>
   ```
