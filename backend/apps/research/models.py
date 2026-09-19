from django.db import models
from apps.core.models import TimeStampedModel


class ResearchCategory(TimeStampedModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Research Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Research(TimeStampedModel):
    STATUS_CHOICES = [
        ("researching", "Researching"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("published", "Published"),
        ("under_review", "Under Review"),
        ("archived", "Archived"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    category = models.ForeignKey(
        ResearchCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="research_items",
    )
    abstract = models.TextField()
    motivation = models.TextField(blank=True)
    research_question = models.TextField(blank=True)
    methodology = models.TextField(blank=True)
    limitations = models.TextField(blank=True)
    future_work = models.TextField(blank=True)

    year = models.IntegerField(db_index=True)
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="in_progress",
        db_index=True,
    )
    featured = models.BooleanField(default=False, db_index=True)
    published = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0)

    related_projects = models.ManyToManyField(
        "projects.Project",
        related_name="related_research",
        blank=True,
    )

    class Meta:
        verbose_name_plural = "Research"
        ordering = ["order", "-year", "title"]

    def __str__(self):
        return self.title


class Dataset(TimeStampedModel):
    research = models.ForeignKey(
        Research,
        on_delete=models.CASCADE,
        related_name="datasets",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    source = models.CharField(max_length=255, blank=True)
    source_url = models.URLField(blank=True)
    size = models.CharField(max_length=50, blank=True)
    feature_count = models.IntegerField(null=True, blank=True)
    format = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class Experiment(TimeStampedModel):
    research = models.ForeignKey(
        Research,
        on_delete=models.CASCADE,
        related_name="experiments",
    )
    name = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    feature_count = models.IntegerField(null=True, blank=True)
    parameters = models.JSONField(default=dict, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.research.title} - {self.name}"


class ExperimentResult(TimeStampedModel):
    experiment = models.ForeignKey(
        Experiment,
        on_delete=models.CASCADE,
        related_name="results",
    )
    metric = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    unit = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "metric"]

    def __str__(self):
        return f"{self.metric}: {self.value} {self.unit or ''}".strip()


class Publication(TimeStampedModel):
    research = models.ForeignKey(
        Research,
        on_delete=models.CASCADE,
        related_name="publications",
    )
    title = models.CharField(max_length=255)
    venue = models.CharField(max_length=255)
    publication_date = models.DateField(null=True, blank=True)
    doi = models.CharField(max_length=100, blank=True)
    paper_url = models.URLField(blank=True)
    status = models.CharField(max_length=50, default="published")

    def __str__(self):
        return self.title
