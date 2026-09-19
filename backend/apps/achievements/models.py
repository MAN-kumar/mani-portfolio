from django.db import models
from apps.core.models import TimeStampedModel


class Achievement(TimeStampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    date = models.DateField()
    link = models.URLField(blank=True)
    image = models.ImageField(upload_to="achievements/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ["order", "-date"]

    def __str__(self):
        return self.title
