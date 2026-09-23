# 09. Configuration

## 1. Architecture Overview

Configuration across the monorepo is split into distinct layers:
- **Frontend (Next.js)**: Configured via `next.config.ts`, TypeScript compiler options (`tsconfig.json`), ESLint, and client-side environment variables (`NEXT_PUBLIC_API_URL`).
- **Backend (Django)**: Modular configuration pattern in `backend/config/settings/` (`base.py`, `development.py`, `production.py`). Selection is determined by the `DJANGO_SETTINGS_MODULE` environment variable.

---

## 2. Django Settings Hierarchy

```
backend/config/settings/
├── __init__.py        # Defaults DJANGO_SETTINGS_MODULE to config.settings.development if unset
├── base.py            # Core shared configuration (Installed Apps, Middleware, DB engine, DRF, Security)
├── development.py     # Local dev settings (DEBUG=True, console EmailBackend)
└── production.py      # Production settings (DEBUG=False, HSTS headers, secure cookies)
```

### Module Loading Logic
- **Development Default**: `export DJANGO_SETTINGS_MODULE=config.settings.development`
- **Production Setting**: `export DJANGO_SETTINGS_MODULE=config.settings.production`

---

## 3. Database & Connection Configuration

The database backend is dynamically selected in `base.py` based on available environment variables:

1. **Production URI (`DATABASE_URL`)**:
   If `DATABASE_URL` is set (e.g. Render PostgreSQL managed URL), `urllib.parse` parses the host, port, credentials, and database name.
2. **Explicit Parameters (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`)**:
   Used if individual database credentials are set without a single URI.
3. **Local Fallback (SQLite)**:
   If neither `DATABASE_URL` nor `DB_NAME` is defined, Django falls back to local SQLite storage at `BASE_DIR / "db.sqlite3"`.

---

## 4. Static & Media Asset Configuration

### Static Files (`STATIC_URL`, `STATIC_ROOT`)
- **Config**:
  - `STATIC_URL = "/static/"`
  - `STATIC_ROOT = BASE_DIR / "staticfiles"`
  - `STORAGES = { "staticfiles": { "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage" } }`
- **Serving Mechanism**: `WhiteNoiseMiddleware` serves statically collected files directly through Gunicorn in production, eliminating the requirement for a separate Nginx container on Render.

### Media Uploads (`MEDIA_URL`, `MEDIA_ROOT`)
- **Config**:
  - `MEDIA_URL = "/media/"`
  - `MEDIA_ROOT = BASE_DIR / "media"`
- **Storage**: Uploaded project thumbnails, PDF resumes, and achievement images are stored under `MEDIA_ROOT`.

---

## 5. Security & Network Configuration

### 5.1. CORS (Cross-Origin Resource Sharing)
Configured via `django-cors-headers` package in `base.py`:
- Parses comma-separated `CORS_ALLOWED_ORIGINS` environment variable.
- **Default (Dev)**: `http://localhost:3000,http://127.0.0.1:3000`
- **Production Value**: `https://mani-portfolio1.vercel.app`

### 5.2. CSRF (Cross-Site Request Forgery)
- Parses comma-separated `CSRF_TRUSTED_ORIGINS` environment variable.
- **Default (Dev)**: `http://localhost:3000,http://127.0.0.1:3000`
- **Production Value**: `https://mani-portfolio1.vercel.app`
- **Cookie Security**: `CSRF_COOKIE_HTTPONLY = True`, `CSRF_COOKIE_SAMESITE = "Lax"`, `CSRF_COOKIE_SECURE = True` (in production).

### 5.3. HTTPS & Header Enforcements (Production)
In `config/settings/production.py`:
- `SECURE_SSL_REDIRECT = True` (controlled via env var)
- `SECURE_HSTS_SECONDS = 31536000` (1 year)
- `SECURE_HSTS_INCLUDE_SUBDOMAINS = True`
- `SECURE_HSTS_PRELOAD = True`
- `X_FRAME_OPTIONS = "DENY"`
- `SECURE_CONTENT_TYPE_NOSNIFF = True`
- `SECURE_BROWSER_XSS_FILTER = True`

---

## 6. Frontend Next.js Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Points to the backend REST API base URL.
  - Development: `http://127.0.0.1:8000/api/v1`
  - Production: `https://mani-portfolio-api.onrender.com/api/v1`
- `NEXT_PUBLIC_SITE_URL`: Base URL of the deployed frontend (`https://mani-portfolio1.vercel.app`).
