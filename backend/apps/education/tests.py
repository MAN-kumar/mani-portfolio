from datetime import date
from django.test import TestCase
from .models import Education


class EducationModelTests(TestCase):
    def test_education_creation(self):
        edu = Education.objects.create(
            institution="University of Engineering",
            degree="Bachelor of Technology",
            field="Computer Science",
            start=date(2020, 9, 1),
            end=date(2024, 6, 1),
        )
        self.assertIsNotNone(edu.id)
        self.assertEqual(str(edu), "Bachelor of Technology - University of Engineering")
