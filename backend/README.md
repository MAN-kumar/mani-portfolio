# Mani Portfolio Backend

Django REST Framework backend for Mani's Personal Portfolio & Technical Knowledge Platform.

## Stack
- Python 3.11+
- Django 5.2+
- Django REST Framework 3.18+
- PostgreSQL (Primary Database Engine) / SQLite (Local Dev Fallback)

## Prerequisites
- PostgreSQL 14+ Server installed & running.
- Python 3.11+

## Quickstart

### 1. Create & Activate Virtual Environment
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure `DATABASE_URL` in `.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/mani_portfolio
```

### 4. Create Database
Using PostgreSQL `psql` or database administration tool:
```sql
CREATE DATABASE mani_portfolio;
```

### 5. Run Migrations & System Checks
```bash
python manage.py check
python manage.py makemigrations
python manage.py migrate
python manage.py showmigrations
```

### 6. Run Test Suite
```bash
python manage.py test apps.core.tests apps.profile.tests apps.projects.tests apps.research.tests apps.skills.tests apps.experience.tests apps.education.tests apps.achievements.tests apps.contact.tests
```

### 7. Start Development Server
```bash
python manage.py runserver
```

### 8. Health Check Endpoint
Visit: `http://localhost:8000/api/v1/health/`
```json
{
  "status": "ok",
  "service": "mani-portfolio-backend",
  "version": "1.0.0"
}
```
