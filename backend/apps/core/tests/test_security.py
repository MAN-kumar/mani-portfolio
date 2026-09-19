from django.test import TestCase, override_settings
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import status
from rest_framework.test import APIClient

from apps.projects.models import Project, ProjectCategory
from apps.research.models import Research
from apps.skills.models import Skill
from apps.contact.models import ContactMessage

User = get_user_model()


class ComprehensiveSecurityTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create staff user
        self.staff_user = User.objects.create_user(
            username="staff_admin",
            email="staff@example.com",
            password="staffpassword123",
            is_staff=True,
            is_active=True,
        )

        # Create normal non-staff user
        self.normal_user = User.objects.create_user(
            username="normal_user",
            email="user@example.com",
            password="userpassword123",
            is_staff=False,
            is_active=True,
        )

        # Create inactive staff user
        self.inactive_staff = User.objects.create_user(
            username="inactive_admin",
            email="inactive@example.com",
            password="inactivepassword123",
            is_staff=True,
            is_active=False,
        )

        # Content setup
        self.category = ProjectCategory.objects.create(name="Web App", slug="web-app")
        self.pub_project = Project.objects.create(
            title="Published Security Test Project",
            slug="pub-sec-proj",
            short_description="Short pub",
            description="Long pub",
            year=2026,
            published=True,
        )
        self.draft_project = Project.objects.create(
            title="Draft Security Test Project",
            slug="draft-sec-proj",
            short_description="Short draft",
            description="Long draft",
            year=2026,
            published=False,
        )

        self.pub_research = Research.objects.create(
            title="Published Security Test Research",
            slug="pub-sec-res",
            abstract="Pub abstract",
            year=2026,
            published=True,
        )
        self.draft_research = Research.objects.create(
            title="Draft Security Test Research",
            slug="draft-sec-res",
            abstract="Draft abstract",
            year=2026,
            published=False,
        )

    def test_1_anonymous_user_can_read_published_project(self):
        import json
        url = reverse("v1:project-detail", kwargs={"slug": "pub-sec-proj"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        content = json.loads(res.content)
        self.assertEqual(content["data"]["title"], "Published Security Test Project")

    def test_2_anonymous_user_can_read_published_research(self):
        import json
        url = reverse("v1:research-detail", kwargs={"slug": "pub-sec-res"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        content = json.loads(res.content)
        self.assertEqual(content["data"]["title"], "Published Security Test Research")

    def test_3_anonymous_user_cannot_read_unpublished_project(self):
        url = reverse("v1:project-detail", kwargs={"slug": "draft-sec-proj"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_4_anonymous_user_cannot_read_unpublished_research(self):
        url = reverse("v1:research-detail", kwargs={"slug": "draft-sec-res"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_5_anonymous_user_cannot_create_project(self):
        url = reverse("v1:project-list")
        payload = {
            "title": "Hacker Project",
            "slug": "hacker-proj",
            "short_description": "Hacker short",
            "description": "Hacker long",
            "year": 2026,
        }
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_6_anonymous_user_cannot_modify_project(self):
        url = reverse("v1:project-detail", kwargs={"slug": "pub-sec-proj"})
        res = self.client.patch(url, {"title": "Defaced Title"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_7_anonymous_user_cannot_delete_project(self):
        url = reverse("v1:project-detail", kwargs={"slug": "pub-sec-proj"})
        res = self.client.delete(url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_8_authenticated_staff_can_perform_permitted_admin_operation(self):
        self.client.force_authenticate(user=self.staff_user)
        url = reverse("v1:project-list")
        payload = {
            "title": "Staff Created Project",
            "slug": "staff-proj",
            "short_description": "Staff short",
            "description": "Staff long",
            "year": 2026,
            "published": True,
        }
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_9_non_staff_authenticated_user_cannot_perform_write_operation(self):
        self.client.force_authenticate(user=self.normal_user)
        url = reverse("v1:project-list")
        payload = {
            "title": "Normal User Project",
            "slug": "normal-proj",
            "short_description": "Normal short",
            "description": "Normal long",
            "year": 2026,
        }
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_10_password_information_never_returned_by_apis(self):
        url = reverse("v1:profile-list")
        res = self.client.get(url)
        # Verify no password or secret key string in output JSON
        json_str = str(res.content)
        self.assertNotIn("password", json_str.lower())
        self.assertNotIn("password_hash", json_str.lower())
        self.assertNotIn("SECRET_KEY", json_str)

    def test_11_private_fields_never_returned_by_public_serializers(self):
        url = reverse("v1:project-list")
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        proj_data = res.data["data"][0]
        # Ensure no internal DB password fields or secret keys
        self.assertNotIn("is_staff", proj_data)
        self.assertNotIn("is_superuser", proj_data)

    def test_12_contact_messages_not_publicly_readable(self):
        ContactMessage.objects.create(name="Secret Contact", email="secret@example.com", message="Private msg")
        # Ensure no public API endpoint exposes contact message list
        from django.urls.exceptions import NoReverseMatch
        with self.assertRaises(NoReverseMatch):
            reverse("v1:contact-list")

    def test_13_cors_configuration_is_restricted(self):
        self.assertFalse(getattr(settings, "CORS_ALLOW_ALL_ORIGINS", False))
        self.assertTrue(hasattr(settings, "CORS_ALLOWED_ORIGINS"))

    def test_14_pagination_cannot_expose_unpublished_objects(self):
        res = self.client.get(reverse("v1:project-list") + "?page=1")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        slugs = [item["slug"] for item in res.data["data"]]
        self.assertIn("pub-sec-proj", slugs)
        self.assertNotIn("draft-sec-proj", slugs)

    def test_15_search_cannot_expose_unpublished_objects(self):
        res = self.client.get(reverse("v1:project-list") + "?search=Draft")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["data"]), 0)

    def test_16_filter_endpoints_cannot_bypass_publication_rules(self):
        res = self.client.get(reverse("v1:project-list") + "?published=false")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        slugs = [item["slug"] for item in res.data["data"]]
        self.assertNotIn("draft-sec-proj", slugs)

    def test_17_inactive_staff_user_cannot_authenticate(self):
        login_success = self.client.login(username="inactive_admin", password="inactivepassword123")
        self.assertFalse(login_success)

    def test_18_security_headers_configured(self):
        self.assertTrue(settings.SECURE_CONTENT_TYPE_NOSNIFF)
        self.assertTrue(settings.SECURE_BROWSER_XSS_FILTER)
        self.assertEqual(settings.X_FRAME_OPTIONS, "DENY")
        self.assertEqual(settings.SECURE_REFERRER_POLICY, "strict-origin-when-cross-origin")
