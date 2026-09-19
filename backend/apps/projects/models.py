from django.db import models
from apps.core.models import TimeStampedModel


class ProjectCategory(TimeStampedModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Project Categories"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Technology(TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    category = models.CharField(max_length=50, blank=True)
    icon = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    featured = models.BooleanField(default=False, db_index=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Technologies"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Project(TimeStampedModel):
    STATUS_CHOICES = [
        ("Idea", "Idea"),
        ("In Progress", "In Progress"),
        ("Completed", "Completed"),
        ("Research", "Research"),
        ("Archived", "Archived"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    short_description = models.TextField()
    description = models.TextField()
    category = models.ForeignKey(
        ProjectCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="projects",
    )
    technologies = models.ManyToManyField(
        Technology,
        related_name="projects",
        blank=True,
    )
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="Completed",
        db_index=True,
    )
    year = models.IntegerField(db_index=True)
    featured = models.BooleanField(default=False, db_index=True)
    published = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0)

    thumbnail = models.ImageField(upload_to="projects/thumbnails/", blank=True, null=True)

    # Detailed specification sections
    problem = models.TextField(blank=True)
    objective = models.TextField(blank=True)
    approach = models.TextField(blank=True)
    architecture = models.TextField(blank=True)
    implementation = models.TextField(blank=True)
    results = models.TextField(blank=True)
    challenges = models.TextField(blank=True)
    learnings = models.TextField(blank=True)
    future_work = models.TextField(blank=True)

    class Meta:
        ordering = ["order", "-year", "title"]

    def __str__(self):
        return self.title


class ProjectMedia(TimeStampedModel):
    MEDIA_TYPES = [
        ("image", "Image"),
        ("video", "Video"),
        ("diagram", "Diagram"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="media")
    type = models.CharField(max_length=50, choices=MEDIA_TYPES, default="image")
    file = models.FileField(upload_to="projects/media/")
    title = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    caption = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Project Media"
        ordering = ["order", "created_at"]

    def __str__(self):
        return f"{self.project.title} - {self.title or self.type}"


class ProjectLink(TimeStampedModel):
    LINK_TYPES = [
        ("github", "GitHub"),
        ("demo", "Demo"),
        ("paper", "Paper"),
        ("dataset", "Dataset"),
        ("documentation", "Documentation"),
        ("other", "Other"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="links")
    type = models.CharField(max_length=50, choices=LINK_TYPES)
    label = models.CharField(max_length=100, blank=True)
    url = models.URLField()

    def __str__(self):
        return f"{self.project.title} - {self.type}"


class ProjectRelationship(TimeStampedModel):
    from_project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="source_relationships"
    )
    to_project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="target_relationships"
    )
    relationship_type = models.CharField(max_length=50, default="related")

    class Meta:
        unique_together = ("from_project", "to_project")

    def __str__(self):
        return f"{self.from_project.title} -> {self.to_project.title}"
