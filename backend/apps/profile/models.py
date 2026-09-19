from django.db import models
from apps.core.models import TimeStampedModel


class Profile(TimeStampedModel):
    name = models.CharField(max_length=100)
    headline = models.CharField(max_length=255)
    short_bio = models.TextField()
    long_bio = models.TextField(blank=True)
    current_focus = models.TextField()
    location = models.CharField(max_length=100, blank=True)
    email = models.EmailField()

    def __str__(self):
        return self.name


class SocialLink(TimeStampedModel):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="social_links")
    platform = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
    url = models.URLField()
    icon = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self):
        return f"{self.platform} ({self.label})"


class Resume(TimeStampedModel):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to="resumes/")
    version = models.CharField(max_length=20)
    active = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"{self.title} (v{self.version})"
