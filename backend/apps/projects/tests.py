from django.test import TestCase
from django.db import IntegrityError
from .models import ProjectCategory, Technology, Project, ProjectRelationship


class ProjectsModelTests(TestCase):
    def test_project_category_and_technology(self):
        category = ProjectCategory.objects.create(name="Web Apps", slug="web-apps")
        tech = Technology.objects.create(name="Django", slug="django")

        project = Project.objects.create(
            title="Portfolio Platform",
            slug="portfolio-platform",
            short_description="Personal portfolio",
            description="Detailed description",
            category=category,
            year=2026,
            status="Completed",
        )
        project.technologies.add(tech)

        self.assertEqual(project.category.slug, "web-apps")
        self.assertEqual(project.technologies.count(), 1)
        self.assertEqual(str(project), "Portfolio Platform")

    def test_unique_slug_constraint(self):
        ProjectCategory.objects.create(name="AI", slug="ai")
        with self.assertRaises(IntegrityError):
            ProjectCategory.objects.create(name="Artificial Intelligence", slug="ai")

    def test_project_relationship(self):
        p1 = Project.objects.create(
            title="Project Alpha",
            slug="project-alpha",
            short_description="Alpha",
            description="Alpha desc",
            year=2026,
        )
        p2 = Project.objects.create(
            title="Project Beta",
            slug="project-beta",
            short_description="Beta",
            description="Beta desc",
            year=2026,
        )
        rel = ProjectRelationship.objects.create(from_project=p1, to_project=p2)
        self.assertEqual(rel.from_project, p1)
        self.assertEqual(rel.to_project, p2)
