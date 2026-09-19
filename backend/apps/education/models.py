from django.db import models
from apps.core.models import TimeStampedModel


class Education(TimeStampedModel):
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field = models.CharField(max_length=255, blank=True)
    start = models.DateField()
    end = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    grade = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Education"
        ordering = ["order", "-start"]

    def __str__(self):
        return f"{self.degree} - {self.institution}"
