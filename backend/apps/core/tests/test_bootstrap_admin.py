from io import StringIO
from unittest.mock import patch
from django.test import TestCase
from django.core.management import call_command
from django.contrib.auth import get_user_model

User = get_user_model()


class BootstrapAdminCommandTests(TestCase):
    def test_disabled_by_default(self):
        out = StringIO()
        call_command("bootstrap_admin", stdout=out)
        output = out.getvalue()
        self.assertIn("Bootstrap admin disabled", output)
        self.assertEqual(User.objects.filter(is_superuser=True).count(), 0)

    @patch.dict("os.environ", {"BOOTSTRAP_ADMIN_ENABLED": "true"})
    def test_enabled_missing_credentials_warns(self):
        out = StringIO()
        call_command("bootstrap_admin", stdout=out)
        output = out.getvalue()
        self.assertIn("required credentials", output)
        self.assertEqual(User.objects.filter(is_superuser=True).count(), 0)

    @patch.dict(
        "os.environ",
        {
            "BOOTSTRAP_ADMIN_ENABLED": "true",
            "BOOTSTRAP_ADMIN_USERNAME": "render_admin",
            "BOOTSTRAP_ADMIN_EMAIL": "admin@render.com",
            "BOOTSTRAP_ADMIN_PASSWORD": "SecretSuperPassword123!",
        },
    )
    def test_creates_superuser_successfully(self):
        out = StringIO()
        call_command("bootstrap_admin", stdout=out)
        output = out.getvalue()
        self.assertIn("Successfully created superuser 'render_admin'", output)
        self.assertNotIn("SecretSuperPassword123!", output)

        user = User.objects.get(username="render_admin")
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.check_password("SecretSuperPassword123!"))

    @patch.dict(
        "os.environ",
        {
            "BOOTSTRAP_ADMIN_ENABLED": "true",
            "BOOTSTRAP_ADMIN_USERNAME": "render_admin",
            "BOOTSTRAP_ADMIN_EMAIL": "admin@render.com",
            "BOOTSTRAP_ADMIN_PASSWORD": "SecretSuperPassword123!",
        },
    )
    def test_idempotent_existing_superuser(self):
        # Create user first time
        User.objects.create_superuser(
            username="render_admin",
            email="admin@render.com",
            password="SecretSuperPassword123!",
        )

        out = StringIO()
        call_command("bootstrap_admin", stdout=out)
        output = out.getvalue()
        self.assertIn("already exists", output)
        self.assertNotIn("SecretSuperPassword123!", output)
        self.assertEqual(User.objects.filter(username="render_admin").count(), 1)
