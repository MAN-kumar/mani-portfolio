from io import StringIO
from django.test import TestCase
from django.core.management import call_command
from apps.profile.models import Profile, SocialLink
from apps.projects.models import ProjectCategory, Technology, Project, ProjectLink, ProjectRelationship
from apps.research.models import ResearchCategory, Research, Dataset, Experiment, ExperimentResult
from apps.skills.models import Skill
from apps.experience.models import Experience
from apps.education.models import Education
from apps.achievements.models import Achievement


class SeedDataCommandTests(TestCase):
    def test_seed_data_first_run_creates_records(self):
        out = StringIO()
        call_command("seed_data", stdout=out)
        output = out.getvalue()
        self.assertIn("Successfully seeded verified Mani Kumar portfolio data into database!", output)

        # Verify Profile and SocialLinks
        self.assertEqual(Profile.objects.count(), 1)
        profile = Profile.objects.first()
        self.assertEqual(profile.name, "Mani Kumar")
        self.assertEqual(profile.social_links.count(), 5)

        # Verify Projects, Categories, Technologies, Links, and Relationships
        self.assertEqual(ProjectCategory.objects.count(), 2)
        self.assertGreaterEqual(Technology.objects.count(), 14)
        self.assertEqual(Project.objects.count(), 6)
        self.assertTrue(Project.objects.filter(slug="personal-portfolio").exists())

        p1 = Project.objects.get(slug="personal-portfolio")
        self.assertGreater(p1.technologies.count(), 0)
        self.assertGreater(p1.links.count(), 0)
        self.assertEqual(ProjectRelationship.objects.filter(from_project=p1).count(), 1)

        # Verify Research, Datasets, Experiments
        self.assertEqual(ResearchCategory.objects.count(), 1)
        self.assertEqual(Research.objects.count(), 1)
        r1 = Research.objects.get(slug="explainable-phishing-detection-research")
        self.assertEqual(r1.related_projects.count(), 1)
        self.assertEqual(Dataset.objects.filter(research=r1).count(), 1)
        self.assertEqual(Experiment.objects.filter(research=r1).count(), 1)
        exp = Experiment.objects.get(research=r1)
        self.assertEqual(ExperimentResult.objects.count(), 6)

        # Verify Skills, Experience, Education, Achievements
        self.assertEqual(Skill.objects.count(), 8)
        self.assertEqual(Experience.objects.count(), 1)
        self.assertEqual(Education.objects.count(), 3)
        self.assertEqual(Achievement.objects.count(), 2)

    def test_seed_data_second_run_is_idempotent(self):
        out1 = StringIO()
        call_command("seed_data", stdout=out1)

        # Run command a second time
        out2 = StringIO()
        call_command("seed_data", stdout=out2)
        output2 = out2.getvalue()
        self.assertIn("Successfully seeded verified Mani Kumar portfolio data into database!", output2)

        # Verify counts remain identical (no duplicate records)
        self.assertEqual(Profile.objects.count(), 1)
        self.assertEqual(SocialLink.objects.count(), 5)
        self.assertEqual(ProjectCategory.objects.count(), 2)
        self.assertEqual(Project.objects.count(), 6)
        self.assertEqual(ResearchCategory.objects.count(), 1)
        self.assertEqual(Research.objects.count(), 1)
        self.assertEqual(Dataset.objects.count(), 1)
        self.assertEqual(Experiment.objects.count(), 1)
        self.assertEqual(ExperimentResult.objects.count(), 6)
        self.assertEqual(Skill.objects.count(), 8)
        self.assertEqual(Experience.objects.count(), 1)
        self.assertEqual(Education.objects.count(), 3)
        self.assertEqual(Achievement.objects.count(), 2)
