# 13. Maintenance Guide

## 1. Overview

This maintenance guide outlines routine operational procedures required to maintain system stability, security, dependency freshness, and performance over time.

---

## 2. Dependency Management & Security Patches

### 2.1. Frontend Package Updates
Run dependency security checks inside `frontend/`:
```bash
cd frontend
npm audit
```
To update non-breaking patch dependencies:
```bash
npm update
```

### 2.2. Backend Dependency Updates
Check for outdated or vulnerable packages inside `backend/`:
```bash
cd backend
pip list --outdated
```
When updating a Python package, test locally and regenerate `requirements.txt`:
```bash
pip install <package> --upgrade
pip freeze > requirements.txt
```

---

## 3. Django Database Migrations

Whenever modifying Django models in `backend/apps/*/models.py`:

1. **Create Migrations**:
   ```bash
   cd backend
   python manage.py makemigrations
   ```
2. **Review Migration Files**: Inspect generated SQL to ensure schema modifications are safe and non-destructive:
   ```bash
   python manage.py sqlmigrate <app_name> <migration_number>
   ```
3. **Apply Locally & Test**:
   ```bash
   python manage.py migrate
   python manage.py test apps.core --noinput
   ```
4. **Deploy**: Committing migration files automatically triggers `python manage.py migrate` on Render via `build.sh`.

---

## 4. Admin Account & Access Management

- **Superuser Password Rotation**:
  Superuser passwords should be updated regularly via Django Admin (`/admin/password_change/`) or via `python manage.py changepassword <username>`.
- **Deactivating Inactive Staff**: Ensure former administrative users are deactivated (`is_active=False`) rather than deleted, preserving audit log entries.
- **Bootstrap Admin Cleanup**: After initial production setup, unset or set `BOOTSTRAP_ADMIN_ENABLED="false"` in Render environment settings to deactivate automated credential bootstrapping.

---

## 5. Log Auditing & Performance Monitoring

- **Render Service Logs**: Inspect Render dashboard HTTP logs weekly for recurring `500 Internal Server Error` statuses or database timeout warnings.
- **Vercel Deployment Logs**: Check Vercel build logs for deprecation warnings or bundle size growth.
- **Unread Contact Messages**: Log into Django Admin periodically to check for new messages with `status="new"`. Update status to `"read"` or `"replied"`.

---

## 6. Backup & Recovery Routines

- **PostgreSQL Backups**: Render managed PostgreSQL automatically performs daily logical backups. Verify point-in-time recovery availability in the Render dashboard.
- **Manual Database Export**:
  ```bash
  pg_dump -U <user> -h <host> -d <dbname> > backup_$(date +%Y%m%d).sql
  ```
- **Code Assets**: Source code history is maintained on GitHub.

---

## 7. Operational Checklist

| Task | Frequency | Target Command / Interface |
|---|---|---|
| Security Audit | Monthly | `npm audit`, `pip audit` |
| Django Admin Audit | Bi-weekly | `https://mani-portfolio-api.onrender.com/admin/` |
| Render Logs Inspection | Weekly | Render Dashboard -> Logs |
| Database Migration Test | Per release | `python manage.py makemigrations && python manage.py migrate` |
| Local Build Verification | Per release | `npm run build` && `python manage.py test apps.core` |
