from datetime import date
from django.test import TestCase
from .models import Achievement


class AchievementsModelTests(TestCase):
    def test_achievement_creation(self):
        achievement = Achievement.objects.create(
            title="First Place Hackathon Winner",
            description="Built an AI portfolio platform",
            date=date(2025, 11, 15),
            featured=True,
        )
        self.assertIsNotNone(achievement.id)
        self.assertEqual(str(achievement), "First Place Hackathon Winner")
