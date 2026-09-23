# 19. Testing Guide

## 1. Automated Verification Suite

The codebase utilizes a multi-layered verification strategy across both backend Python and frontend TypeScript/React components.

```
+-------------------------------------------------------------------+
|                        VERIFICATION SUITE                         |
+---------------------------------+---------------------------------+
|        Backend Tests            |         Frontend Checks         |
| (Django TestCase & DRF Client)  |   (TypeScript, ESLint, Next)    |
+---------------------------------+---------------------------------+
| • Model & Database Constraints  | • Type Safety (tsc)             |
| • API Endpoints & Serials       | • Linter Rules (eslint)         |
| • Security & Permissions        | • Build Integrity (next build)  |
| • Performance & Query Counts    | • Component Fallback Checks     |
+---------------------------------+---------------------------------+
```

---

## 2. Backend Automated Test Suite (Django)

Backend tests utilize Django's `TestCase` framework and DRF's `APIClient`. Test modules are distributed across `apps/core/tests/` and domain app `tests.py` files.

### 2.1. Test Suites & Focus Areas
- **Security & Permissions (`test_security.py`, `test_permissions.py`)**: Validates read-only access for anonymous users, staff write protection, CORS/CSRF headers, and SQL/XSS injection resistance.
- **Content Visibility (`test_content_visibility.py`)**: Ensures `published=False` draft items are excluded from public API responses.
- **API Endpoints (`test_projects_api.py`, `test_research_api.py`, `test_profile_api.py`)**: Tests serialization, pagination, ordering, and query filters.
- **Performance & N+1 Queries (`test_performance.py`)**: Verifies `select_related` and `prefetch_related` optimizations to maintain low query counts.
- **Management Commands (`test_seed_data.py`, `test_bootstrap_admin.py`)**: Tests idempotent seeding and superuser bootstrapping.
- **Database Integration (`test_admin_and_db.py`)**: Verifies UUID primary keys, timestamping, and model constraints.
- **Health Check (`test_health.py`)**: Verifies `/api/v1/health/` response payload.

### 2.2. Execution Commands
Run full backend test suite:
```bash
cd backend
python manage.py test apps.core --noinput
```
Run tests with verbose output:
```bash
python manage.py test apps.core -v 2
```

---

## 3. Frontend Static Analysis & Build Verification

Frontend quality is enforced via static type checking, linter checks, and Next.js compilation:

1. **TypeScript Type Safety**:
   ```bash
   cd frontend
   npx tsc --noEmit
   ```
   *Ensures strict type checking across API clients, component props, and page routes.*

2. **ESLint Static Code Analysis**:
   ```bash
   cd frontend
   npm run lint
   ```
   *Validates React hooks rules, Next.js optimization rules, and import patterns.*

3. **Next.js Production Build Test**:
   ```bash
   cd frontend
   npm run build
   ```
   *Verifies server component rendering, SSR page compilation, static route generation, and WebGL dynamic import bundles.*

---

## 4. Manual Production Smoke Test Checklist

Following production deployments to Vercel and Render, execute the following manual smoke tests:

| Step | Target URL | Expected Behavior |
|---|---|---|
| **1. API Health** | `https://mani-portfolio-api.onrender.com/api/v1/health/` | Returns HTTP 200 OK with `status: ok` envelope |
| **2. Home Page Hydration** | `https://mani-portfolio1.vercel.app/` | Hero scene renders or displays 2D fallback; featured projects load |
| **3. Project Detail Page** | `https://mani-portfolio1.vercel.app/projects/realtime-edge-vision` | Full project specification renders with problem, architecture, results |
| **4. Contact Form Submission**| `https://mani-portfolio1.vercel.app/contact` | Valid submission shows success feedback; honeypot blocks bots |
| **5. Admin Authentication** | `https://mani-portfolio-api.onrender.com/admin/` | Staff login succeeds with bootstrapped superuser credentials |
