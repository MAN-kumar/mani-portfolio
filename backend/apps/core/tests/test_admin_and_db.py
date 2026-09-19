from django.test import TestCase
from django.urls import reverse
from django.db import connection
from django.contrib import admin
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from apps.core.models import SiteSetting
from apps.profile.models import Profile, SocialLink, Resume
from apps.projects.models import Project, Technology, ProjectCategory, ProjectMedia, ProjectLink, ProjectRelationship
from apps.research.models import Research, ResearchCategory, Dataset, Experiment, ExperimentResult, Publication
from apps.skills.models import Skill
from apps.experience.models import Experience
from apps.education.models import Education
from apps.achievements.models import Achievement
from apps.contact.models import ContactMessage

User = get_user_model()


class SiteSettingModelTests(TestCase):
    def test_sitesetting_creation(self):
        setting = SiteSetting.objects.create(
            key="FEATURE_3D_HERO",
            value="true",
            description="Enable 3D Hero scene",
        )
        self.assertIsNotNone(setting.id)
        self.assertEqual(str(setting), "FEATURE_3D_HERO")


class PostgreSQLIntegrationTests(TestCase):
    def test_database_engine(self):
        engine = connection.vendor
        self.assertEqual(engine, "postgresql", f"Expected postgresql vendor, got {engine}")

    def test_postgresql_uuid_json_and_relationships(self):
        category = ProjectCategory.objects.create(name="AI Platform", slug="ai-platform")
        tech = Technology.objects.create(name="PyTorch", slug="pytorch")
        project = Project.objects.create(
            title="CV Research Lab",
            slug="cv-research-lab",
            short_description="Computer vision research",
            description="Deep learning research",
            category=category,
            year=2026,
        )
        project.technologies.add(tech)

        research = Research.objects.create(
            title="Explainable AI",
            slug="explainable-ai",
            abstract="Model interpretability",
            year=2026,
        )
        experiment = Experiment.objects.create(
            research=research,
            name="ResNet Evaluation",
            model="ResNet-50",
            parameters={"batch_size": 32, "lr": 0.001},
        )

        db_project = Project.objects.get(id=project.id)
        db_experiment = Experiment.objects.get(id=experiment.id)

        self.assertEqual(db_project.category.slug, "ai-platform")
        self.assertEqual(db_project.technologies.first().slug, "pytorch")
        self.assertEqual(db_experiment.parameters.get("batch_size"), 32)


class DjangoAdminTests(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="adminpassword123",
        )
        self.client = APIClient()

    def test_unauthenticated_admin_redirect(self):
        url = reverse("admin:index")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)

    def test_authenticated_admin_access(self):
        self.client.login(username="admin", password="adminpassword123")
        url = reverse("admin:index")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_all_models_registered_in_admin(self):
        registered_models = admin.site._registry
        models_to_check = [
            User, SiteSetting, Profile, SocialLink, Resume,
            Project, ProjectCategory, Technology, ProjectMedia, ProjectLink, ProjectRelationship,
            Research, ResearchCategory, Dataset, Experiment, ExperimentResult, Publication,
            Skill, Experience, Education, Achievement, ContactMessage
        ]

        for model in models_to_check:
            self.assertIn(model, registered_models, f"{model.__name__} is not registered in Django Admin")
