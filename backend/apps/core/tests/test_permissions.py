from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from apps.projects.models import Project, ProjectCategory
from apps.skills.models import Skill

User = get_user_model()


class PermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff_user = User.objects.create_user(
            username="staff_admin",
            email="staff_admin@example.com",
            password="staffpassword123",
            is_staff=True,
        )
        self.category = ProjectCategory.objects.create(name="AI Systems", slug="ai-systems")

    def test_unauthenticated_post_returns_403(self):
        url = reverse("v1:project-list")
        payload = {
            "title": "Unauthenticated Project",
            "slug": "unauth-project",
            "short_description": "Short",
            "description": "Long",
            "year": 2026,
        }
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("error", res.data)
        self.assertEqual(res.data["error"]["code"], "PERMISSION_DENIED")

    def test_unauthenticated_put_and_delete_returns_403(self):
        project = Project.objects.create(
            title="Existing Project",
            slug="existing-project",
            short_description="Short",
            description="Long",
            year=2026,
        )
        url = reverse("v1:project-detail", kwargs={"slug": "existing-project"})

        res = self.client.put(url, {"title": "Hacked Title"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

        res = self.client.delete(url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_user_can_create_update_delete(self):
        self.client.force_authenticate(user=self.staff_user)

        url = reverse("v1:skill-list")
        payload = {
            "name": "Rust",
            "slug": "rust",
            "category": "Systems",
            "active": True,
        }
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        skill_url = reverse("v1:skill-detail", kwargs={"slug": "rust"})
        res = self.client.patch(skill_url, {"description": "Systems programming"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        res = self.client.delete(skill_url)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
