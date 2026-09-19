# 14 — SECURITY

## Objective
Protect:
- Portfolio content
- Admin account
- Database
- Contact messages
- Uploaded media
- API
- Credentials
- Deployment infrastructure
- Secrets

## Principle
> **Protect important assets while keeping the public portfolio fast and simple.**

## Security Layers
```text
Browser
 ↓
Frontend
 ↓
Network
 ↓
API
 ↓
Authentication
 ↓
Authorization
 ↓
Application
 ↓
Database
 ↓
Storage
```

## Threats
- Unauthorized admin access
- Brute force
- Credential theft
- API abuse
- SQL injection
- XSS
- CSRF
- Malicious uploads
- Spam
- Bots
- Dependency vulnerabilities
- Database exposure
- Secret leakage
- CORS misconfiguration
- Server misconfiguration
- Data loss

## Public Security
Only published content should be public.

## Draft Protection
Unpublished content must not appear in public endpoints.

## Admin Security
Admin operations require authentication and authorization.

## HTTPS
Production must use HTTPS.

## Secrets
Never place secrets in:
- Git
- frontend
- `NEXT_PUBLIC_*`
- screenshots
- README

Use environment variables/secret managers.

## XSS
React escaping should be preserved.
Use `dangerouslySetInnerHTML` only for trusted/sanitized content.

Markdown/MDX must be treated as potentially unsafe.

## SQL Injection
Use Django ORM.
Avoid unsafe raw SQL.

## Input Validation
Validate:
- query parameters
- forms
- URLs
- IDs
- uploads
- admin input

## Rate Limiting
Protect:
- login
- contact
- search
- admin APIs
- password reset

## Contact Security
- Validation
- Message limits
- Email validation
- Spam protection
- Rate limiting

## CORS
Restrict to trusted origins.
Do not use unrestricted CORS in production.

## CSRF
Protect cookie-based authenticated state-changing requests.

## Cookies
Use appropriate:
- Secure
- HttpOnly
- SameSite

## File Upload Security
Validate:
- type
- MIME
- size
- filename
- storage path

Prefer object storage in production.

## Database
Do not expose PostgreSQL unnecessarily to the public internet.

Use least-privilege database users.

## Backups
Maintain regular backups and test restoration.

## Error Handling
Production errors should not expose:
- stack traces
- filesystem paths
- credentials
- internal infrastructure

## Dependency Security
Use:
- npm audit
- pip-audit
- Dependabot/GitHub security alerts

## Monitoring
Monitor:
- API errors
- latency
- database failures
- authentication abuse
- storage failures

## Incident Response
```text
Detect
 ↓
Contain
 ↓
Investigate
 ↓
Rotate credentials
 ↓
Patch
 ↓
Verify
 ↓
Document
```

## Production Checklist
```text
□ DEBUG=False
□ HTTPS
□ Secrets protected
□ Authentication
□ Authorization
□ CSRF
□ CORS
□ Input validation
□ XSS protection
□ SQL safety
□ File validation
□ Rate limiting
□ Database protection
□ Backups
□ Security headers
□ Safe errors
□ Sanitized logs
```

## Principle
> **Security should be invisible to visitors but uncompromising behind the scenes.**
