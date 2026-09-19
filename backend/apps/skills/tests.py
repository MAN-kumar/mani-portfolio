from django.test import TestCase
from apps.projects.models import Technology
from .models import Skill


class SkillsModelTests(TestCase):
    def test_skill_creation_and_technology_m2m(self):
        tech = Technology.objects.create(name="Next.js", slug="nextjs")
        skill = Skill.objects.create(
            name="Full-Stack Web Engineering",
            slug="fullstack-web-engineering",
            category="Frontend Architecture",
            description="Modern web app development",
        )
        skill.technologies.add(tech)

        self.assertIsNotNone(skill.id)
        self.assertEqual(skill.technologies.count(), 1)
        self.assertEqual(str(skill), "Full-Stack Web Engineering")
