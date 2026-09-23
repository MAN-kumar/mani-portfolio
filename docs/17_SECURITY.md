# 17. Security Architecture

## 1. Core Security Model

The portfolio security model enforces strict read/write segregation:
- **Public Audience**: Granted read-only (`GET`, `HEAD`, `OPTIONS`) access to published portfolio data.
- **Administrative Staff**: Granted full CRUD (`POST`, `PUT`, `PATCH`, `DELETE`) control via Django Session Authentication and Django Admin (`/admin/`).

---

## 2. Authentication & Authorization

### 2.1. API Permission Policy
Custom permission class `IsAdminUserOrReadOnly` (`apps.core.permissions`):
- **Safe Methods** (`GET`, `HEAD`, `OPTIONS`): Allowed for all unauthenticated clients.
- **Unsafe Methods** (`POST`, `PUT`, `PATCH`, `DELETE`): Require `request.user.is_authenticated` and `request.user.is_staff`.
- **Throttling**:
  - Anonymous users: 100 requests/minute (`anon`).
  - Authenticated staff: 1000 requests/minute (`user`).

### 2.2. Draft / Unpublished Content Protection
QuerySet mixin `PublishedOnlyQuerySetMixin` (`apps.core.permissions`):
- Public API requests (`request.user.is_staff == False`) automatically append `.filter(published=True)` or `.filter(active=True)`.
- Authenticated staff requests preserve access to unpublished drafts for live preview.

---

## 3. Network & Transport Security

### 3.1. HTTPS Enforcements
In production (`config/settings/production.py`):
- `SECURE_SSL_REDIRECT = True`: Redirects all HTTP traffic to HTTPS.
- `SECURE_HSTS_SECONDS = 31536000`: Enforces HTTP Strict Transport Security (HSTS) for 1 year.
- `SECURE_HSTS_INCLUDE_SUBDOMAINS = True` & `SECURE_HSTS_PRELOAD = True`.

### 3.2. Cross-Origin Resource Sharing (CORS)
- `CORS_ALLOWED_ORIGINS`: Explicitly restricted to designated frontend domains (`https://mani-portfolio1.vercel.app` in production). Wildcard (`*`) origin access is disabled.

### 3.3. CSRF Protection & Cookie Security
- `CSRF_TRUSTED_ORIGINS`: Restricted to trusted frontend domain.
- `SESSION_COOKIE_HTTPONLY = True` & `CSRF_COOKIE_HTTPONLY = True`: Prevents client-side JavaScript from accessing session/CSRF cookies.
- `SESSION_COOKIE_SECURE = True` & `CSRF_COOKIE_SECURE = True`: Restricts cookie transmission to HTTPS connections.
- `SESSION_COOKIE_SAMESITE = "Lax"` & `CSRF_COOKIE_SAMESITE = "Lax"`.

### 3.4. Browser Security Headers
- `X_FRAME_OPTIONS = "DENY"`: Prevents clickjacking by blocking iframe embedding.
- `SECURE_CONTENT_TYPE_NOSNIFF = True`: Prevents MIME-type sniffing.
- `SECURE_BROWSER_XSS_FILTER = True`: Enables legacy browser XSS filtering.

---

## 4. Input Validation & Form Protection

- **Django ORM Parameterization**: All SQL queries use parameterized queries through Django ORM, mitigating SQL Injection risks.
- **DRF Serializers**: Request bodies pass through typed ModelSerializers validating character lengths, choices, and URL formats.
- **Contact Form Honeypot**: The frontend contact form includes a hidden honeypot input field to catch automated bot submissions.

---

## 5. Secret Management & Database Isolation

- **Secret Isolation**: Production database credentials, `SECRET_KEY`, and superuser credentials are provided via platform environment variables on Render and Vercel.
- **Source Control Safety**: Zero production secrets exist in source code or `.env.example` templates.
- **Database Access Control**: Managed PostgreSQL database instance is isolated within Render's internal network mesh.
