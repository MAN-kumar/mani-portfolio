# 10 — AUTHENTICATION

## Purpose
Authentication protects the private management system while keeping the public portfolio open.

## Security Levels
### Public Visitor
Can:
- View published content
- Search
- Submit contact

Cannot:
- Manage content
- View private messages

### Admin
Can:
- Manage projects
- Manage research
- Manage skills
- Manage experience
- Manage education
- Manage achievements
- Manage profile

### Superuser
Highest system-level access.

## V1
Use Django Admin and built-in authentication.

## V2
Custom Next.js admin with Django authentication API.

## V3
Possible:
- 2FA
- Audit logs
- Session management
- Password reset
- Advanced permissions

## User Model
Use a custom User model early via Django `AbstractUser`.

## Passwords
- Never store plaintext
- Use Django password hashing
- Never log passwords

## Authentication Methods
Session authentication is preferred for first-party admin.

JWT is only used when genuinely needed.

## Authorization
Authentication asks:
> Who are you?

Authorization asks:
> What can you do?

## Future Roles
- ADMIN
- SUPERADMIN
- EDITOR
- RESEARCHER
- CONTENT_MANAGER

## Permissions
Examples:
```text
projects.view
projects.add
projects.change
projects.delete
projects.publish
```

## Security
- CSRF for cookie authentication
- Restricted CORS
- Secure/HttpOnly/SameSite cookies
- HTTPS
- Login rate limiting
- Optional lockout
- Password reset later
- 2FA/passkeys later

## Frontend
Frontend route protection is UX.

Backend authorization is the actual security boundary.

## Status Codes
- 401 = unauthenticated
- 403 = authenticated but forbidden

## Secrets
Use environment variables.

Do not store sensitive auth information in localStorage.

## Principle
> **Frontend authentication is UX. Backend authorization is security.**
