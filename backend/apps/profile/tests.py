from django.test import TestCase
from .models import Profile, SocialLink, Resume


class ProfileModelTests(TestCase):
    def test_profile_and_social_link_creation(self):
        profile = Profile.objects.create(
            name="Mani",
            headline="Full Stack Architect",
            short_bio="Building web systems",
            current_focus="AI and Web",
            email="mani@example.com",
        )
        self.assertIsNotNone(profile.id)
        self.assertEqual(str(profile), "Mani")

        social = SocialLink.objects.create(
            profile=profile,
            platform="GitHub",
            label="Profile",
            url="https://github.com",
        )
        self.assertEqual(social.profile, profile)
        self.assertIn("GitHub", str(social))

    def test_resume_creation(self):
        resume = Resume.objects.create(
            title="Mani Resume",
            version="1.0.4",
        )
        self.assertIsNotNone(resume.id)
        self.assertEqual(str(resume), "Mani Resume (v1.0.4)")
