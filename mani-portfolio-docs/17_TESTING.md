# 17 — TESTING

## Objective
Ensure the portfolio is:
- Correct
- Reliable
- Secure
- Responsive
- Accessible
- Performant
- Maintainable
- Production-ready

## Testing Pyramid
```text
        E2E
         ↑
 Integration/API
         ↑
       Unit
```

## Testing Levels
1. Static analysis
2. Unit
3. Component
4. Integration
5. API
6. Database
7. E2E
8. Visual
9. Accessibility
10. Security
11. Performance
12. Deployment

## Static Checks
Frontend:
```bash
npx tsc --noEmit
npm run lint
```

Backend:
```bash
python manage.py check
python manage.py check --deploy
```

## Unit Tests
Test:
- slug generation
- filtering
- sorting
- transformations
- validation
- utilities

## Data Layer
Test:
```text
getProjects()
getProjectBySlug()
getFeaturedProjects()
getProjectsByTechnology()
getResearch()
getResearchBySlug()
getSkills()
getProfile()
```

## Content Validation
Check:
- required fields
- unique slugs
- valid statuses
- valid URLs
- valid relationships

## Component Tests
Important:
- Navigation
- Button
- ProjectCard
- ProjectGrid
- ProjectFilter
- ProjectSearch
- ResearchCard
- Timeline
- ContactForm
- Modal

Test behavior rather than implementation details.

## Project Tests
Verify:
- title
- description
- technologies
- status
- year
- image
- links

## Search Tests
Test:
- exact title
- partial title
- technology
- category
- case differences
- empty search
- no results
- long input
- special characters

## Contact Tests
Test:
- valid name
- valid email
- valid message
- empty fields
- invalid email
- long message
- submission
- success
- error

## API Testing
Test:
- status codes
- response shape
- validation
- filters
- pagination
- search
- authentication
- authorization
- errors

## Status Codes
- 200
- 201
- 204
- 400
- 401
- 403
- 404
- 409
- 429
- 500

## API Security
Test:
- unauthenticated admin requests
- unauthorized actions
- CSRF
- CORS
- rate limiting

## Database Testing
Test:
- models
- constraints
- relationships
- indexes
- migrations
- queries

## N+1 Prevention
Use:
```text
select_related()
prefetch_related()
```

where appropriate.

## Integration
Example:
```text
Create project
 ↓
Database
 ↓
API
 ↓
Frontend
 ↓
Project page
```

## E2E
Recommended:
```text
Playwright
```

## Core E2E
```text
Homepage
 ↓
Projects
 ↓
Filter
 ↓
Project
 ↓
Research
 ↓
Research detail
 ↓
Resume
 ↓
Contact
```

## Recruiter Flow
```text
Home → Projects → Skills → Resume → Contact
```

## Developer Flow
```text
Home → Projects → Technology → Project → Architecture → GitHub
```

## Researcher Flow
```text
Home → Research → Detail → Methodology → Experiments → Results → Publication
```

## Error States
Test:
- API unavailable
- network timeout
- invalid response
- missing page

## Loading States
Verify:
- skeleton
- loading indicator
- stable layout

## Empty States
Test:
- no projects
- no research
- no search results
- no filtered results

## Responsive Testing
Suggested widths:
```text
320
375
768
1024
1280
1440
1920
```

## Accessibility
Test:
- keyboard
- focus
- semantic HTML
- labels
- alt text
- contrast
- reduced motion
- screen readers

## 3D Testing
Verify:
- scene
- fallback
- interaction
- WebGL failure
- mobile
- reduced motion

## Visual Regression
Important pages:
```text
/
/about
/projects
/projects/[slug]
/research
/research/[slug]
/journey
/resume
/contact
```

## Browser Testing
- Chrome
- Firefox
- Safari
- Edge
- Mobile Safari
- Android Chrome

## Performance
Test:
- page load
- JS
- images
- fonts
- 3D
- API
- database

Track:
- LCP
- INP
- CLS

## Security Testing
Test:
- XSS
- SQL injection
- CSRF
- CORS
- rate limits
- uploads
- secrets

## Example Security Inputs
```text
<script>alert("test")</script>
' OR '1'='1
```

Expected: unsafe behavior is rejected/escaped.

## Tools
| Area | Tool |
|---|---|
| Frontend unit | Vitest |
| React | Testing Library |
| E2E | Playwright |
| Backend | Django Test Framework |
| API | DRF APIClient |
| Coverage | Coverage.py / Vitest coverage |
| Accessibility | axe |
| Security | npm audit / pip-audit |
| CI | GitHub Actions |

## CI Pipeline
```text
Git Push
 ↓
Install
 ↓
Lint
 ↓
Type Check
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
Build
 ↓
E2E
 ↓
Deploy
```

## Quality Gate
A release should pass:
- lint
- type check
- unit tests
- integration tests
- build
- critical E2E
- security checks
- smoke test

## Definition of Done
```text
✓ Static checks pass
✓ Unit tests pass
✓ Component tests pass
✓ API tests pass
✓ Database tests pass
✓ Integration tests pass
✓ Critical E2E passes
✓ Responsive behavior verified
✓ Accessibility verified
✓ Security verified
✓ Production build succeeds
✓ Smoke test succeeds
✓ No unresolved P0 defects
```

## Principle
> **Testing creates enough confidence to change the product without breaking it.**
