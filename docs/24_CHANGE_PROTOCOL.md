# 24. System Change Protocol

## 1. Official Standard Change Workflow

All system changes, feature additions, bug fixes, refactorings, or configuration updates must adhere strictly to the 9-stage engineering workflow:

```
UNDERSTAND
   │
   ▼
INSPECT
   │
   ▼
 PLAN
   │
   ▼
IMPLEMENT
   │
   ▼
  TEST
   │
   ▼
 REVIEW
   │
   ▼
DOCUMENT
   │
   ▼
 DEPLOY
   │
   ▼
 VERIFY
```

---

## 2. Stage Breakdown & Requirements

### Stage 1: UNDERSTAND
- Read the explicit user request or task specification completely.
- Clarify goal scope and identify affected application tiers (Frontend, Backend, Database, Cloud Deployment).

### Stage 2: INSPECT
- Inspect existing codebase implementation using viewing and grep tools before proposing changes.
- Identify reusable components in `frontend/components/` and utility functions in `frontend/lib/` or `backend/apps/core/`.
- Review existing documentation in `docs/` to prevent introducing architectural contradictions.

### Stage 3: PLAN
- Draft an implementation plan covering affected files, database migration needs, API contract impacts, and test strategy.
- Confirm backwards compatibility for public API endpoints and database fields.

### Stage 4: IMPLEMENT
- Write clean, modular, typed code adhering to existing project style.
- **Reuse Before Rewrite**: Reuse existing design system primitives (`Button`, `Badge`, `SectionHeading`) and ORM helper mixins.
- Maintain existing model base classes (`TimeStampedModel` with UUID primary keys).

### Stage 5: TEST
- Execute automated verification commands:
  - **Backend**: `cd backend && python manage.py test apps.core --noinput`
  - **Frontend**: `cd frontend && npx tsc --noEmit && npm run lint && npm run build`
- Ensure 100% test pass rate with zero unresolved compiler or linter errors.

### Stage 6: REVIEW & SECURITY AUDIT
- Conduct a security review:
  - Verify no secret keys or passwords were introduced into source code.
  - Verify CORS, CSRF, and permission checks (`IsAdminUserOrReadOnly`) remain intact.
  - Verify draft protection mixins (`PublishedOnlyQuerySetMixin`) remain active.

### Stage 7: DOCUMENT
- Update corresponding documentation files inside `docs/` to reflect schema additions, new API parameters, or environment variables.

### Stage 8: DEPLOY
- Trigger automated production deployment by pushing verified changes to `main` branch.
- Monitor Render deployment logs (`./build.sh`) and Vercel build output.

### Stage 9: VERIFY
- Execute post-deployment verification smoke tests against production endpoints (`/api/v1/health/`, live pages, Django admin).
- Confirm zero runtime regressions.
