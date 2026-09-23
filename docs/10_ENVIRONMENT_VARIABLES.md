# 10. Environment Variables

## 1. Safety & Security Guidelines

> [!CAUTION]
> **NEVER COMMIT REAL SECRETS OR CREDENTIALS TO SOURCE CONTROL.**
> All sensitive configuration must be managed securely through Vercel and Render platform environment variable dashboards.

---

## 2. Environment Variables Matrix

### 2.1. Backend Service (Django / Render)

| Variable Name | Required / Optional | Public or Secret | Purpose | Example / Format (Dev) | Example / Format (Prod) |
|---|---|---|---|---|---|
| `DJANGO_SETTINGS_MODULE` | Required in Prod | Public | Specifies Django settings module path | `config.settings.development` | `config.settings.production` |
| `SECRET_KEY` / `DJANGO_SECRET_KEY` | Required | **SECRET** | Cryptographic key for session/CSRF signing | `dev-insecure-key-12345` | `django-insecure-8f3a9...` (50+ random chars) |
| `DEBUG` / `DJANGO_DEBUG` | Optional | Public | Enables Django debug mode and verbose tracebacks | `True` | `False` |
| `ALLOWED_HOSTS` / `DJANGO_ALLOWED_HOSTS` | Required in Prod | Public | Host/domain headers allowed to serve requests | `localhost,127.0.0.1` | `mani-portfolio-api.onrender.com` |
| `DATABASE_URL` | Optional (Prod req) | **SECRET** | Managed PostgreSQL connection string | `sqlite:///db.sqlite3` | `postgresql://user:pass@host:5432/dbname` |
| `DB_NAME` | Optional | Public | Database name (if `DATABASE_URL` unset) | `mani_portfolio` | `portfolio_prod_db` |
| `DB_USER` | Optional | **SECRET** | Database username (if `DATABASE_URL` unset) | `postgres` | `render_db_user` |
| `DB_PASSWORD` | Optional | **SECRET** | Database password (if `DATABASE_URL` unset) | `postgres` | `secret_password_123` |
| `DB_HOST` | Optional | Public | Database host IP or hostname | `127.0.0.1` | `dpg-xxxxxx.render.com` |
| `DB_PORT` | Optional | Public | Database port | `5432` | `5432` |
| `CORS_ALLOWED_ORIGINS` | Required in Prod | Public | Comma-separated CORS allowed origins | `http://localhost:3000` | `https://mani-portfolio1.vercel.app` |
| `CSRF_TRUSTED_ORIGINS` | Required in Prod | Public | Comma-separated trusted CSRF origins | `http://localhost:3000` | `https://mani-portfolio1.vercel.app` |
| `SECURE_SSL_REDIRECT` | Optional | Public | Forces HTTP-to-HTTPS redirect | `False` | `True` |
| `BOOTSTRAP_ADMIN_ENABLED` | Optional | Public | Enables automatic superuser seeding | `false` | `true` (set temporarily) |
| `BOOTSTRAP_ADMIN_USERNAME` | Optional | Public | Username for superuser creation | `admin` | `mani_admin` |
| `BOOTSTRAP_ADMIN_EMAIL` | Optional | Public | Email address for superuser creation | `admin@example.com` | `admin@mani-portfolio.com` |
| `BOOTSTRAP_ADMIN_PASSWORD` | Optional | **SECRET** | Password for superuser creation | `adminpass123` | `StrongAdminPass!2026` |

---

### 2.2. Frontend Service (Next.js / Vercel)

| Variable Name | Required / Optional | Public or Secret | Purpose | Example / Format (Dev) | Example / Format (Prod) |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Required | Public (Client) | Base URL for REST API requests | `http://127.0.0.1:8000/api/v1` | `https://mani-portfolio-api.onrender.com/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public (Client) | Canonical URL for metadata & OG tags | `http://localhost:3000` | `https://mani-portfolio1.vercel.app` |

---

## 3. Platform Configuration Instructions

### 3.1. Setting Variables on Render (Backend)
1. Navigate to the Render Dashboard -> `mani-portfolio-api` -> **Environment**.
2. Add key-value pairs for `SECRET_KEY`, `DATABASE_URL`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`, and `DJANGO_SETTINGS_MODULE`.
3. Save changes. Render will automatically trigger a new deployment.

### 3.2. Setting Variables on Vercel (Frontend)
1. Navigate to the Vercel Dashboard -> `mani-portfolio1` -> **Settings** -> **Environment Variables**.
2. Add `NEXT_PUBLIC_API_URL` pointing to `https://mani-portfolio-api.onrender.com/api/v1`.
3. Select targets: **Production**, **Preview**, and **Development**.
4. Save and redeploy to apply variables.
