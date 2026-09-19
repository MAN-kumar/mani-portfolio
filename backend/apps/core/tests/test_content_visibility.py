from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from apps.projects.models import Project
from apps.research.models import Research
from apps.skills.models import Skill
from apps.profile.models import Resume

User = get_user_model()


class ContentVisibilityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff_user = User.objects.create_user(
            username="staff_user",
            email="staff@example.com",
            password="staffpassword123",
            is_staff=True,
        )

        self.pub_project = Project.objects.create(
            title="Public Project",
            slug="public-project",
            short_description="Public short",
            description="Public long",
            year=2026,
            published=True,
        )
        self.draft_project = Project.objects.create(
            title="Draft Project",
            slug="draft-project",
            short_description="Draft short",
            description="Draft long",
            year=2026,
            published=False,
        )

        self.pub_research = Research.objects.create(
            title="Public Research",
            slug="public-research",
            abstract="Public abstract",
            year=2026,
            published=True,
        )
        self.draft_research = Research.objects.create(
            title="Draft Research",
            slug="draft-research",
            abstract="Draft abstract",
            year=2026,
            published=False,
        )

        self.active_skill = Skill.objects.create(
            name="Active Skill",
            slug="active-skill",
            category="Frontend",
            active=True,
        )
        self.inactive_skill = Skill.objects.create(
            name="Inactive Skill",
            slug="inactive-skill",
            category="Frontend",
            active=False,
        )

    def test_public_user_cannot_view_draft_projects(self):
        res = self.client.get(reverse("v1:project-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)
        self.assertEqual(res.data["data"][0]["slug"], "public-project")

        res = self.client.get(reverse("v1:project-detail", kwargs={"slug": "draft-project"}))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_public_user_cannot_view_draft_research(self):
        res = self.client.get(reverse("v1:research-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:research-detail", kwargs={"slug": "draft-research"}))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_public_user_cannot_view_inactive_skills(self):
        res = self.client.get(reverse("v1:skill-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:skill-detail", kwargs={"slug": "inactive-skill"}))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_staff_user_can_view_draft_content(self):
        self.client.force_authenticate(user=self.staff_user)

        res = self.client.get(reverse("v1:project-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 2)

        res = self.client.get(reverse("v1:project-detail", kwargs={"slug": "draft-project"}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        res = self.client.get(reverse("v1:research-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 2)
