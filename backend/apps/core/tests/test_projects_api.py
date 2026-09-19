import json
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.projects.models import Project, ProjectCategory, Technology, ProjectMedia, ProjectLink, ProjectRelationship


class ProjectsApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = ProjectCategory.objects.create(name="AI Platform", slug="ai-platform", order=1)
        self.tech_pytorch = Technology.objects.create(name="PyTorch", slug="pytorch", featured=True)
        self.tech_nextjs = Technology.objects.create(name="Next.js", slug="nextjs", featured=False)

        self.project1 = Project.objects.create(
            title="CV Vision Engine",
            slug="cv-vision-engine",
            short_description="Computer Vision Platform",
            description="Detailed vision description",
            category=self.category,
            year=2026,
            status="Completed",
            featured=True,
            published=True,
            order=1,
        )
        self.project1.technologies.add(self.tech_pytorch)

        self.project2 = Project.objects.create(
            title="Interactive Portfolio",
            slug="interactive-portfolio",
            short_description="Creative Developer Site",
            description="Detailed portfolio description",
            category=self.category,
            year=2025,
            status="Completed",
            featured=False,
            published=True,
            order=2,
        )
        self.project2.technologies.add(self.tech_nextjs)

        # Relationship between project1 and project2
        ProjectRelationship.objects.create(
            from_project=self.project1,
            to_project=self.project2,
            relationship_type="related",
        )

    def test_project_list_pagination_and_envelope(self):
        url = reverse("v1:project-list")
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("data", res.data)
        self.assertIn("meta", res.data)
        self.assertEqual(res.data["meta"]["count"], 2)
        self.assertEqual(res.data["meta"]["page"], 1)
        self.assertEqual(res.data["meta"]["page_size"], 10)

    def test_project_detail_valid_slug(self):
        url = reverse("v1:project-detail", kwargs={"slug": "cv-vision-engine"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        content = json.loads(res.content)
        self.assertIn("data", content)
        self.assertEqual(content["data"]["title"], "CV Vision Engine")
        self.assertEqual(content["data"]["category"]["slug"], "ai-platform")
        self.assertEqual(content["data"]["technologies"][0]["slug"], "pytorch")

    def test_project_detail_invalid_slug_returns_404(self):
        url = reverse("v1:project-detail", kwargs={"slug": "invalid-slug-123"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", res.data)
        self.assertEqual(res.data["error"]["code"], "NOT_FOUND")

    def test_project_filtering_by_category_and_technology(self):
        res = self.client.get(reverse("v1:project-list") + "?category=ai-platform")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 2)

        res = self.client.get(reverse("v1:project-list") + "?technology=pytorch")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)
        self.assertEqual(res.data["data"][0]["slug"], "cv-vision-engine")

    def test_project_filtering_by_year_status_featured(self):
        res = self.client.get(reverse("v1:project-list") + "?year=2026")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:project-list") + "?featured=true")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

    def test_project_search(self):
        res = self.client.get(reverse("v1:project-list") + "?search=Portfolio")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)
        self.assertEqual(res.data["data"][0]["slug"], "interactive-portfolio")

    def test_project_ordering(self):
        res = self.client.get(reverse("v1:project-list") + "?ordering=-year")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["data"][0]["slug"], "cv-vision-engine")

        res = self.client.get(reverse("v1:project-list") + "?ordering=year")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["data"][0]["slug"], "interactive-portfolio")

    def test_featured_projects_endpoint(self):
        res = self.client.get(reverse("v1:project-featured"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["data"]), 1)
        self.assertEqual(res.data["data"][0]["slug"], "cv-vision-engine")

    def test_related_projects_endpoint(self):
        res = self.client.get(reverse("v1:project-related", kwargs={"slug": "cv-vision-engine"}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["data"]), 1)
        self.assertEqual(res.data["data"][0]["slug"], "interactive-portfolio")

    def test_categories_and_technologies_endpoints(self):
        res = self.client.get(reverse("v1:project-category-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:technology-projects", kwargs={"slug": "pytorch"}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)
