# 15 — ENVIRONMENT

## Purpose
Define configuration across:
- Development
- Testing
- Staging
- Production

## Principle
> **Same application, environment-specific configuration.**

## Environments
```text
Development
Testing
Staging
Production
```

Initial project may start with Development + Production.

## Development
Typical:
```text
Frontend: http://localhost:3000
Backend: http://localhost:8000
Database: local PostgreSQL
```

## Frontend Variables
Example:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Backend Variables
Example:
```env
SECRET_KEY=development-secret
DEBUG=True
DATABASE_URL=postgresql://portfolio_user:password@localhost:5432/mani_portfolio
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000
```

## Production
```env
SECRET_KEY=<production-secret>
DEBUG=False
DATABASE_URL=<production-database-url>
ALLOWED_HOSTS=api.example.com
CORS_ALLOWED_ORIGINS=https://portfolio.example.com
CSRF_TRUSTED_ORIGINS=https://portfolio.example.com
```

## Environment Files
Frontend may use:
```text
.env.local
.env.development
.env.production
.env.example
```

Backend:
```text
.env
.env.example
```

Never commit real secrets.

## Public Variables
Anything beginning with:
```text
NEXT_PUBLIC_
```
should be considered public.

Never put:
- database password
- private API keys
- secret keys
- storage secrets

under `NEXT_PUBLIC_`.

## Configuration Categories
- Application
- Database
- Authentication
- API
- Storage
- Email
- Analytics
- Integrations
- Feature flags

## Feature Flags
Examples:
```env
FEATURE_3D_HERO=true
FEATURE_ANALYTICS=false
FEATURE_GLOBAL_SEARCH=true
FEATURE_AI_ASSISTANT=false
```

Optional features should fail gracefully.

## Django Settings
Scalable:
```text
config/
└── settings/
    ├── base.py
    ├── development.py
    ├── testing.py
    └── production.py
```

A single environment-aware settings file is also acceptable initially.

## Database Separation
```text
Development DB ≠ Testing DB ≠ Production DB
```

## Static vs Media
Static:
- CSS
- JS
- Admin assets

Media:
- Project images
- Research figures
- Resume
- Uploaded content

## Configuration Validation
Required configuration should fail early if missing.

## Environment Parity
Keep database type, API behavior, auth, file handling and build process reasonably consistent across environments.

## Production Requirements
- DEBUG=False
- HTTPS
- secure cookies
- production database
- restricted hosts
- restricted CORS
- production storage
- monitoring

## Deployment Variables
Frontend:
- API URL
- Site URL
- Feature flags

Backend:
- secret key
- database
- hosts
- CORS
- CSRF
- storage
- email

## Principle
> **Environment configuration should control where and how the portfolio runs, while application code controls what the portfolio does.**
