from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.projects.models import Project, ProjectCategory, Technology, ProjectMedia, ProjectLink
from apps.research.models import Research, ResearchCategory, Dataset, Experiment, Publication


class PerformanceAndQueryCountTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = ProjectCategory.objects.create(name="AI Platform", slug="ai-platform")
        self.tech1 = Technology.objects.create(name="Python", slug="python")
        self.tech2 = Technology.objects.create(name="PyTorch", slug="pytorch")

        # Create 10 projects with associated technologies, media, and links
        for i in range(10):
            proj = Project.objects.create(
                title=f"Project {i}",
                slug=f"project-{i}",
                short_description=f"Short description {i}",
                description=f"Long description {i}",
                category=self.category,
                year=2026,
                published=True,
            )
            proj.technologies.add(self.tech1, self.tech2)
            ProjectMedia.objects.create(project=proj, title=f"Media {i}", file="media/img.jpg")
            ProjectLink.objects.create(project=proj, type="github", url="https://github.com")

    def test_project_list_query_count_is_bounded(self):
        url = reverse("v1:project-list")
        # Ensure query count does not grow linearly with number of items (N+1 check)
        with self.assertNumQueries(6):
            res = self.client.get(url)
            self.assertEqual(res.status_code, status.HTTP_200_OK)
            self.assertEqual(len(res.data["data"]), 10)
