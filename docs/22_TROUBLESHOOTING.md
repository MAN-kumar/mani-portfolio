# 22. Troubleshooting Guide

## 1. Overview

This troubleshooting guide provides step-by-step resolution procedures for common operational, deployment, and development environment issues.

---

## 2. Common Scenarios & Resolution Procedures

### 2.1. Render Container Cold Starts & Slow Initial Responses
- **Symptom**: Initial request to backend API takes 30-50 seconds.
- **Cause**: Render Free Plan puts web service instances to sleep after 15 minutes of inactivity.
- **Resolution**:
  1. This is expected behavior on Render's free tier.
  2. Send a request to `GET /api/v1/health/` to wake up the service.
  3. The frontend will automatically display fallback content or loading states while waiting.

### 2.2. CORS Errors in Browser Console
- **Symptom**: `Access to fetch at 'https://mani-portfolio-api.onrender.com/api/v1/...' from origin 'https://mani-portfolio1.vercel.app' has been blocked by CORS policy.`
- **Resolution**:
  1. Open Render Dashboard -> `mani-portfolio-api` -> **Environment**.
  2. Verify `CORS_ALLOWED_ORIGINS` contains exact frontend origin with scheme (no trailing slash):
     `https://mani-portfolio1.vercel.app`
  3. Ensure no trailing slashes exist in `CORS_ALLOWED_ORIGINS`.

### 2.3. CSRF Verification Failed
- **Symptom**: `Forbidden (403): CSRF verification failed. Request aborted.` on form submission or Django Admin login.
- **Resolution**:
  1. Verify `CSRF_TRUSTED_ORIGINS` in Render environment settings contains the frontend origin:
     `https://mani-portfolio1.vercel.app`
  2. Ensure cookies are enabled in the browser and `SameSite` settings match.

### 2.4. Django Admin Login Problems
- **Symptom**: Cannot log into `/admin/` with bootstrapped credentials.
- **Resolution**:
  1. Verify `BOOTSTRAP_ADMIN_ENABLED="true"` was set during the last Render build.
  2. Check Render build logs for `Superuser created/updated successfully.` message from `bootstrap_admin`.
  3. Alternatively, trigger manual password reset via CLI:
     ```bash
     python manage.py changepassword <admin_username>
     ```

### 2.5. Frontend Build Failure on Vercel
- **Symptom**: Vercel deployment fails with compilation or lint errors.
- **Resolution**:
  1. Reproduce locally:
     ```bash
     cd frontend
     npx tsc --noEmit
     npm run lint
     npm run build
     ```
  2. Fix any TypeScript type mismatches or unhandled dynamic import errors.

### 2.6. Backend Deployment Failure on Render (`build.sh` Error)
- **Symptom**: Render build fails during `./build.sh` execution.
- **Resolution**:
  1. Inspect Render build log stream.
  2. If migration failed: Verify no conflicting unapplied migrations exist locally (`python manage.py migrate`).
  3. If static collection failed: Ensure `whitenoise` is installed in `requirements.txt`.
  4. Ensure `build.sh` has executable permissions (`chmod +x build.sh`).

### 2.7. Database Connection Failures
- **Symptom**: `psycopg2.OperationalError: could not connect to server: Connection refused`.
- **Resolution**:
  1. Verify `DATABASE_URL` is populated in Render environment settings.
  2. If running locally without PostgreSQL, unset `DATABASE_URL` and `DB_NAME` to use SQLite fallback.

### 2.8. Stale Frontend Data Displayed
- **Symptom**: Data updated in Django Admin does not immediately reflect on the Vercel frontend.
- **Resolution**:
  1. Check browser cache and hard refresh (`Ctrl + Shift + R`).
  2. If Next.js static page cache is active, trigger a new Vercel deployment or clear revalidation cache.

### 2.9. 404 Route Errors on Detail Pages
- **Symptom**: Navigating to `/projects/non-existent-slug` shows 404 page.
- **Resolution**:
  1. Verify slug in database matches URL parameter exactly.
  2. Ensure project or research record has `published=True`.
