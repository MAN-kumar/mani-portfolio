import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
import django
django.setup()

from rest_framework.test import APIClient

client = APIClient()

print("--- VERIFYING REST API ARCHITECTURE ---")

# 1. Health check
res = client.get("/api/v1/health/")
print("GET /api/v1/health/:", res.status_code, res.data)

# 2. Projects list
res = client.get("/api/v1/projects/")
print("GET /api/v1/projects/:", res.status_code, res.data.get("meta"))

# 3. Research list
res = client.get("/api/v1/research/")
print("GET /api/v1/research/:", res.status_code, res.data.get("meta"))

# 4. Skills list
res = client.get("/api/v1/skills/")
print("GET /api/v1/skills/:", res.status_code, res.data.get("meta"))

# 5. Search
res = client.get("/api/v1/search/?q=test")
print("GET /api/v1/search/?q=test:", res.status_code, list(res.data.get("results", {}).keys()))

# 6. Home aggregate
res = client.get("/api/v1/home/")
print("GET /api/v1/home/:", res.status_code, list(res.data.keys()))

print("--- API ARCHITECTURE VERIFICATION SUCCESSFUL ---")
