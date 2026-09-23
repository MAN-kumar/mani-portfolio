# 20. Changelog

## Project Milestones & Evolution History

This changelog records the actual architectural evolution of the portfolio monorepo based on completed project implementation phases.

---

### Phase 1 — Project Foundation & Setup
- Initialized monorepo repository structure containing `frontend/` and `backend/`.
- Configured Next.js 16 App Router with React 19, TypeScript, and Tailwind CSS.
- Configured Django 5 REST Framework backend with modular settings structure (`config/settings/`).
- Established UUID primary key base model (`TimeStampedModel`) and custom `User` auth model.

### Phase 2 — Database Schema & Core Data Architecture
- Designed and migrated PostgreSQL models across domain apps: `Profile`, `SocialLink`, `Resume`, `ProjectCategory`, `Technology`, `Project`, `ProjectMedia`, `ProjectLink`, `ProjectRelationship`, `ResearchCategory`, `Research`, `Dataset`, `Experiment`, `ExperimentResult`, `Publication`, `Skill`, `Experience`, `Education`, `Achievement`, `ContactMessage`, `SiteSetting`.
- Configured database index optimizations (`db_index=True`) on slugs, years, and status flags.

### Phase 3 — REST API Implementation (`/api/v1/`)
- Implemented viewsets and serializers across all entities with `StandardJSONRenderer` envelope formatting.
- Created custom API views: `HealthCheckView` (`/api/v1/health/`), `GlobalSearchView` (`/api/v1/search/`), `HomeAggregateView` (`/api/v1/home/`).
- Enforced `IsAdminUserOrReadOnly` permissions and `PublishedOnlyQuerySetMixin` for draft protection.
- Created `custom_exception_handler` for standardized error code envelopes.

### Phase 4 — Frontend UI & 3D Interactive Components
- Built design system components (`Button`, `Badge`, `TechnologyTag`, `SectionHeading`).
- Developed Three.js / React Three Fiber interactive 3D components (`HeroScene`, `ContentGraph`, `InteractiveObject`) with SSR canvas wrappers (`DynamicHeroSceneWrapper`) and 2D fallbacks (`SceneFallback`).
- Implemented Framer Motion animation primitives (`FadeUp`, `FadeIn`, `Magnetic`, `Stagger`).
- Created responsive page containers and layouts for Projects, Research, Journey, and Contact.

### Phase 5 — Content Management & Data Seeding
- Implemented Django Admin custom model forms and inline inline editors for projects, research, and profiles.
- Developed `python manage.py seed_data` management command for idempotent initial database populating.
- Developed `python manage.py bootstrap_admin` management command for automated environment-based superuser creation.

### Phase 6 — Full System Testing & Security Audit
- Built comprehensive Django unit test suite in `apps/core/tests/` covering permissions, security, N+1 query optimization, content visibility, and API envelopes.
- Resolved N+1 query bottlenecks via `select_related` and `prefetch_related` calls in viewsets.
- Verified zero plaintext secrets in source code and configured HSTS, CORS, and CSRF protection headers.

### Phase 7 — Production Deployment & Cloud Launch
- Added `gunicorn` and `whitenoise` to `backend/requirements.txt` for production static file serving.
- Created `backend/build.sh` and `backend/Procfile` for Render deployment.
- Deployed frontend to Vercel (`https://mani-portfolio1.vercel.app`) with environment configuration (`NEXT_PUBLIC_API_URL`).
- Deployed backend to Render (`https://mani-portfolio-api.onrender.com`) with PostgreSQL database.
- Executed production launch verification and manual smoke tests.
