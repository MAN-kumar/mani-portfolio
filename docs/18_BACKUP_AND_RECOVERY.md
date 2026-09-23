# 18. Backup and Recovery

## 1. Overview

This document defines disaster recovery mechanisms across three distinct categories:
1. **IMPLEMENTED**: Active backup features built into repository tooling or platform defaults.
2. **MANUAL PROVIDER CONFIGURATION**: Platform features configured directly on Render or Vercel management dashboards.
3. **RECOMMENDED FUTURE WORK**: Suggested enhancements for multi-region redundancy.

---

## 2. Backup & Recovery Matrix

### 2.1. IMPLEMENTED Infrastructure

#### Source Code & Version Control
- **Mechanism**: Git repository hosted on GitHub.
- **Recovery**: Full repository clone restoring application code, migrations, build scripts, and documentation:
  ```bash
  git clone https://github.com/MAN-kumar/mani-portfolio.git
  ```

#### Database Idempotent Seeding (`seed_data` & `bootstrap_admin`)
- **Mechanism**: Django management commands.
- **Recovery**: If database tables are wiped or recreated, executing `./build.sh` automatically recreates schema and re-seeds core profile, project, research, and skill records.

---

### 2.2. MANUAL PROVIDER CONFIGURATION

#### PostgreSQL Database Backups (Render Managed Postgres)
- **Mechanism**: Render platform automatic database snapshots.
- **Responsibility**: Managed PostgreSQL instance provider (Render).
- **Restore Strategy**:
  1. Open Render Dashboard -> **PostgreSQL Service** -> **Backups**.
  2. Select the target snapshot timestamp.
  3. Click **Restore to New Database** or restore to existing instance.
  4. Update `DATABASE_URL` environment variable if instance host string changes.

#### Frontend Application State (Vercel Instant Rollback)
- **Mechanism**: Vercel deployment history immutability.
- **Restore Strategy**:
  1. Open Vercel Dashboard -> **Deployments**.
  2. Select last known healthy production build.
  3. Click **Promote to Production** (instant zero-downtime rollback).

#### Backend Container State (Render Rollback)
- **Mechanism**: Render build artifact history.
- **Restore Strategy**:
  1. Open Render Dashboard -> **Events**.
  2. Click **Rollback to this deploy** on previous successful build.

---

### 2.3. RECOMMENDED FUTURE WORK

- **Automated S3 Media Backups**: Synchronizing uploaded media files (`backend/media/`) to AWS S3 or Cloudflare R2 bucket storage.
- **Automated Nightly Offsite Database Dumps**: Scheduling an offsite `pg_dump` cron job exporting encrypted SQL backups to external cloud storage.
- **Disaster Recovery Playbook Testing**: Conducting semi-annual simulated recovery drills.
