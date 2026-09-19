import json
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.profile.models import Profile, SocialLink, Resume
from apps.skills.models import Skill
from apps.experience.models import Experience
from apps.education.models import Education
from apps.achievements.models import Achievement


class ProfileAndMiscApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.profile = Profile.objects.create(
            name="Mani",
            headline="Full Stack & AI Engineer",
            short_bio="Creative developer",
            current_focus="Deep Learning Systems",
            email="mani@example.com",
        )
        self.social_link = SocialLink.objects.create(
            profile=self.profile,
            platform="GitHub",
            label="GitHub Profile",
            url="https://github.com",
        )
        self.resume = Resume.objects.create(
            title="Software Engineering Resume",
            file="resumes/resume.pdf",
            version="2026.1",
            active=True,
        )
        self.skill = Skill.objects.create(
            name="TypeScript",
            slug="typescript",
            category="Frontend",
            active=True,
            featured=True,
        )
        self.experience = Experience.objects.create(
            company="Tech Corp",
            role="AI Lead",
            start_date="2025-01-01",
            current=True,
        )
        self.education = Education.objects.create(
            institution="University of Technology",
            degree="B.S. Computer Science",
            start="2021-09-01",
        )
        self.achievement = Achievement.objects.create(
            title="Best Paper Award",
            date="2025-11-01",
        )

    def test_profile_and_social_links(self):
        res = self.client.get(reverse("v1:profile-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:social-link-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

    def test_resume_endpoint(self):
        res = self.client.get(reverse("v1:resume-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

    def test_skills_experience_education_achievements(self):
        res = self.client.get(reverse("v1:skill-detail", kwargs={"slug": "typescript"}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        res = self.client.get(reverse("v1:experience-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        res = self.client.get(reverse("v1:education-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        res = self.client.get(reverse("v1:achievement-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_home_aggregate_endpoint(self):
        res = self.client.get(reverse("v1:home"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("profile", res.data)
        self.assertIn("featured_projects", res.data)
        self.assertIn("featured_research", res.data)
        self.assertIn("featured_skills", res.data)

    def test_global_search_endpoint(self):
        res = self.client.get(reverse("v1:search") + "?q=TypeScript")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("results", res.data)
        self.assertEqual(len(res.data["results"]["skills"]), 1)
