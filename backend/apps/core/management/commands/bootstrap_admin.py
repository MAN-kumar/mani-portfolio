import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Bootstrap the initial admin superuser from environment variables if enabled."

    def handle(self, *args, **options):
        enabled = os.getenv("BOOTSTRAP_ADMIN_ENABLED", "false").lower() in ("true", "1", "t")

        if not enabled:
            self.stdout.write(
                self.style.SUCCESS("Bootstrap admin disabled (BOOTSTRAP_ADMIN_ENABLED != 'true'). Skipping.")
            )
            return

        username = os.getenv("BOOTSTRAP_ADMIN_USERNAME", "").strip()
        email = os.getenv("BOOTSTRAP_ADMIN_EMAIL", "").strip()
        password = os.getenv("BOOTSTRAP_ADMIN_PASSWORD", "").strip()

        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    "BOOTSTRAP_ADMIN_ENABLED is true, but required credentials "
                    "(BOOTSTRAP_ADMIN_USERNAME, BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_PASSWORD) are missing. Skipping."
                )
            )
            return

        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
            self.stdout.write(
                self.style.SUCCESS(f"Admin user '{username}' or email '{email}' already exists. Skipping creation.")
            )
            return

        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )
        self.stdout.write(self.style.SUCCESS(f"Successfully created superuser '{username}'."))
