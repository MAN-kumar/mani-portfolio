import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


class TimeStampedModel(models.Model):
    """
    Abstract base model providing UUID primary key and automatic timestamps.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    """
    Custom User model for future-proof authentication and authorization architecture.
    """
    pass


class SiteSetting(TimeStampedModel):
    """
    Global configuration key-value pair settings.
    """
    key = models.CharField(max_length=100, unique=True, db_index=True)
    value = models.TextField()
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.key}"
