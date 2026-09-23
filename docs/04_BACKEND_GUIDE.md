# 04 — BACKEND GUIDE

## Architecture Overview
* **Framework**: Django 5.2
* **API Toolkit**: Django REST Framework (DRF) 3.14+
* **Database Driver**: `psycopg2-binary` (PostgreSQL)
* **WSGI Production Server**: `gunicorn` 26.2
* **Static File Engine**: `whitenoise` 6.12 (`CompressedManifestStaticFilesStorage`)
* **Environment Management**: `python-dotenv`

---

## Django Apps Architecture

The backend is modularized into 9 domain applications located in `backend/apps/`:

```text
backend/apps/
├── core/         # Core shared utilities, permissions, renderers, pagination, management commands, tests
├── profile/      # Profile, SocialLink, Resume domain models, serializers, views
├── projects/     # ProjectCategory, Technology, Project, ProjectMedia, ProjectLink, ProjectRelationship
├── research/     # ResearchCategory, Research, Dataset, Experiment, ExperimentResult, Publication
├── skills/       # Skill domain models, serializers, views
├── experience/   # Experience domain models, serializers, views
├── education/    # Education domain models, serializers, views
├── achievements/ # Achievement domain models, serializers, views
└── contact/      # ContactMessage domain model and Django Admin registration
```

---

## Environment-Aware Settings Architecture

Django settings are split under `backend/config/settings/`:

1. **`__init__.py`**: Reads `DJANGO_ENV` environment variable. If `DJANGO_ENV == "production"`, imports `production.py`, otherwise imports `development.py`.
2. **`base.py`**: Shared baseline configuration:
   - `INSTALLED_APPS` (Core, Local apps, DRF, CORS Headers, Django Filters)
   - `MIDDLEWARE` (`SecurityMiddleware`, `WhiteNoiseMiddleware`, `CorsMiddleware`, `SessionMiddleware`, `CsrfViewMiddleware`, `AuthenticationMiddleware`)
   - `REST_FRAMEWORK` configuration (Permissions, Authentication, Throttling rates, Pagination, Custom Renderer, Exception Handler)
   - `STORAGES` configuration for WhiteNoise compressed static assets.
3. **`development.py`**: Development settings (`DEBUG = True`, Console email backend).
4. **`production.py`**: Strict production security overrides (`DEBUG = False`, `SECURE_SSL_REDIRECT = True`, `SESSION_COOKIE_SECURE = True`, `CSRF_COOKIE_SECURE = True`, `SECURE_HSTS_SECONDS = 31536000`).

---

## Custom Permissions & QuerySet Mixins

Located in [backend/apps/core/permissions.py](file:///c:/Users/hp/Desktop/my_portfolio/backend/apps/core/permissions.py):

1. **`IsAdminUserOrReadOnly`**:
   - `GET`, `HEAD`, `OPTIONS` requests allowed for any anonymous visitor.
   - `POST`, `PUT`, `PATCH`, `DELETE` requests require `request.user.is_staff == True`.
2. **`PublishedOnlyQuerySetMixin`**:
   - Applied to all public ViewSets.
   - Unauthenticated visitor requests automatically filter records by `published=True` or `active=True`.
   - Authenticated staff users can view unpublished/draft content for administrative preview.

---

## Response Formatting & Exception Handling

* **Envelope Renderer (`StandardJSONRenderer`)**: Wraps DRF responses into `{ "status": "success", "data": ..., "meta": { "count": ..., "page": ..., "pageSize": ..., "totalPages": ... } }`.
* **Custom Exception Handler (`custom_exception_handler`)**: Formats API errors into structured error objects: `{ "error": { "code": "PERMISSION_DENIED", "message": "...", "fields": {} } }`.

---

## Management Commands

1. **`python manage.py seed_data`**:
   - Idempotently populates PostgreSQL with canonical portfolio content from frontend content files.
2. **`python manage.py bootstrap_admin`**:
   - Idempotently creates the initial production superuser account during PaaS deployment build using `BOOTSTRAP_ADMIN_*` environment variables.
