# 18 — AI CODING RULES

## Purpose
Define how AI coding assistants should work on the Mani portfolio.

## Core Principle
> **AI should accelerate development without destroying consistency, maintainability, security, or architecture.**

## AI Workflow
```text
Understand
 ↓
Inspect
 ↓
Plan
 ↓
Implement
 ↓
Test
 ↓
Review
 ↓
Refine
```

## Read Before Modifying
Inspect:
- relevant page
- component
- types
- data source
- data access
- API
- styles
- tests
- configuration

## Reuse Before Creating
Check for existing:
- buttons
- modals
- cards
- filters
- forms
- API clients
- animation components

## Single Source of Truth
Do not duplicate portfolio content inside UI components.

Prefer:
```text
Content
 ↓
Data Layer
 ↓
Components
```

## Architecture Before Code
For meaningful features:
```text
Requirement
 ↓
Architecture
 ↓
Data Model
 ↓
Components
 ↓
Implementation
 ↓
Testing
```

## Minimal Change
Fix the smallest amount of code necessary.

Do not perform unrelated refactors.

## No Unrequested Features
Do not add unrelated:
- analytics
- AI
- authentication
- animations
- databases
- dependencies

unless required.

## Design System
Reuse:
- colors
- typography
- spacing
- borders
- motion tokens
- components

Do not introduce random visual systems.

## Responsive
Every UI feature should consider:
- mobile
- tablet
- desktop
- large desktop

## Accessibility
Consider:
- semantic HTML
- keyboard navigation
- focus
- labels
- alt text
- reduced motion
- contrast

## Server Components
Use Next.js server components by default.

Use `"use client"` only when needed for:
- state
- event handlers
- browser APIs
- interactive animation
- 3D

## Data Access
Use stable functions such as:
```text
getProjects()
getProjectBySlug()
getFeaturedProjects()
getResearch()
getResearchBySlug()
getSkills()
getProfile()
```

Avoid scattered direct API calls.

## Type Safety
Use explicit TypeScript types.

Avoid unnecessary:
```text
any
```

Prefer:
```text
unknown
```
with validation where appropriate.

## Error Handling
Do not use empty catches.

Handle:
- loading
- success
- empty
- error
- not found

## Security
AI-generated code must consider:
- authentication
- authorization
- CSRF
- CORS
- XSS
- SQL injection
- rate limiting
- uploads
- secrets

## Secrets
Never expose:
- `SECRET_KEY`
- database passwords
- private API keys
- JWT secrets
- storage secrets

Never put them in `NEXT_PUBLIC_*`.

## Database
Frontend must never connect directly to PostgreSQL.

Correct:
```text
Next.js
 ↓
Django API
 ↓
PostgreSQL
```

## Django
Prefer ORM over unsafe raw SQL.

## Performance
Consider:
- N+1 queries
- indexes
- pagination
- lazy loading
- bundle size
- 3D cost
- image optimization

## Dependencies
Before adding a package ask:
- Is it necessary?
- Can existing dependencies solve it?
- Is it maintained?
- Does it add bundle/security cost?

## No Generic AI UI
Avoid automatically generating:
- generic SaaS dashboards
- excessive cards
- random gradients
- huge glass panels
- generic hero sections

The portfolio must retain its own visual identity.

## Content Integrity
Never invent:
- achievements
- companies
- metrics
- users
- awards
- publications
- certifications
- research results

## Research Integrity
Only use actual:
- datasets
- experiments
- feature counts
- models
- metrics
- results

## API Changes
Before changing API responses:
```text
Find consumers
 ↓
Update types
 ↓
Update backend
 ↓
Update tests
 ↓
Verify integration
```

## Database Changes
Before changing models:
```text
Check API
Check serializers
Check admin
Check frontend
Check migrations
Check existing data
```

## Bug Fixing
```text
Reproduce
 ↓
Find root cause
 ↓
Write regression test
 ↓
Fix
 ↓
Run tests
```

## No Random Patching
Do not repeatedly guess at fixes.
Read the complete error and trace the failing layer.

## No Shortcut Security
Never solve problems by:
- disabling authentication
- allowing all CORS
- skipping validation
- exposing secrets
- trusting client input

## Documentation
Update relevant docs after architecture changes:
- frontend
- backend
- database
- API
- authentication
- content
- security
- environment
- deployment
- testing

## Human Review
Human approval is required before:
- production deployment
- destructive database actions
- secret rotation
- major architecture changes
- large data deletion
- authentication architecture changes

## Definition of Complete
AI-generated code is complete when relevant dimensions are satisfied:
```text
Works
+
Typed
+
Tested
+
Accessible
+
Responsive
+
Secure
+
Documented
```

## Final AI Contract
1. Understand before changing.
2. Reuse before creating.
3. Structure before styling.
4. Data before duplication.
5. Types before shortcuts.
6. Security before convenience.
7. Tests before completion.
8. Minimal changes before refactors.
9. Existing architecture before generic patterns.
10. Human review before production.

## Final Principle
> **The architecture remains the source of truth. AI is the accelerator.**
