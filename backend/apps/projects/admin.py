from django.contrib import admin
from .models import (
    ProjectCategory,
    Technology,
    Project,
    ProjectMedia,
    ProjectLink,
    ProjectRelationship,
)


class ProjectMediaInline(admin.TabularInline):
    model = ProjectMedia
    extra = 1
    fields = ("type", "file", "title", "alt_text", "order", "featured")


class ProjectLinkInline(admin.TabularInline):
    model = ProjectLink
    extra = 1
    fields = ("type", "label", "url")


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "updated_at")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description")
    ordering = ("order", "name")


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "category", "featured", "order")
    list_filter = ("featured", "category")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "category", "description")
    ordering = ("order", "name")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "category",
        "status",
        "year",
        "featured",
        "published",
        "order",
    )
    list_filter = ("status", "featured", "published", "year", "category")
    search_fields = (
        "title",
        "short_description",
        "description",
        "problem",
        "objective",
        "architecture",
    )
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("technologies",)
    inlines = [ProjectMediaInline, ProjectLinkInline]
    ordering = ("order", "-year", "title")
    fieldsets = (
        (
            "General Overview",
            {
                "fields": (
                    "title",
                    "slug",
                    "category",
                    "status",
                    "year",
                    "order",
                    "featured",
                    "published",
                    "thumbnail",
                )
            },
        ),
        ("Descriptions", {"fields": ("short_description", "description")}),
        ("Technologies", {"fields": ("technologies",)}),
        (
            "Engineering Specification",
            {
                "fields": (
                    "problem",
                    "objective",
                    "approach",
                    "architecture",
                    "implementation",
                    "results",
                    "challenges",
                    "learnings",
                    "future_work",
                ),
                "classes": ("collapse",),
            },
        ),
    )


@admin.register(ProjectMedia)
class ProjectMediaAdmin(admin.ModelAdmin):
    list_display = ("project", "title", "type", "file", "order", "featured")
    list_filter = ("type", "featured")
    search_fields = ("project__title", "title", "caption")


@admin.register(ProjectLink)
class ProjectLinkAdmin(admin.ModelAdmin):
    list_display = ("project", "type", "label", "url")
    list_filter = ("type",)
    search_fields = ("project__title", "label", "url")


@admin.register(ProjectRelationship)
class ProjectRelationshipAdmin(admin.ModelAdmin):
    list_display = ("from_project", "to_project", "relationship_type")
    search_fields = ("from_project__title", "to_project__title")
    autocomplete_fields = ("from_project", "to_project")
