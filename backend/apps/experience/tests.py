from datetime import date
from django.test import TestCase
from .models import Experience


class ExperienceModelTests(TestCase):
    def test_experience_creation(self):
        exp = Experience.objects.create(
            company="Tech Corp",
            role="Senior Software Engineer",
            start_date=date(2024, 1, 1),
            current=True,
        )
        self.assertIsNotNone(exp.id)
        self.assertEqual(str(exp), "Senior Software Engineer at Tech Corp")
