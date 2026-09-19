from django.contrib import admin
from .models import (
    ResearchCategory,
    Research,
    Dataset,
    Experiment,
    ExperimentResult,
    Publication,
)


class DatasetInline(admin.StackedInline):
    model = Dataset
    extra = 0
    fields = ("name", "description", "source", "source_url", "size", "feature_count", "format")


class ExperimentResultInline(admin.TabularInline):
    model = ExperimentResult
    extra = 1
    fields = ("metric", "value", "unit", "order")


class PublicationInline(admin.StackedInline):
    model = Publication
    extra = 0
    fields = ("title", "venue", "publication_date", "doi", "paper_url", "status")


@admin.register(ResearchCategory)
class ResearchCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "updated_at")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description")


@admin.register(Research)
class ResearchAdmin(admin.ModelAdmin):
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
    search_fields = ("title", "abstract", "research_question", "methodology")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("related_projects",)
    inlines = [DatasetInline, PublicationInline]
    ordering = ("order", "-year", "title")
    fieldsets = (
        (
            "Overview",
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
                )
            },
        ),
        ("Abstract & Motivation", {"fields": ("abstract", "motivation", "research_question")}),
        (
            "Methodology & Scope",
            {
                "fields": ("methodology", "limitations", "future_work"),
                "classes": ("collapse",),
            },
        ),
        ("Cross Relationships", {"fields": ("related_projects",)}),
    )


@admin.register(Experiment)
class ExperimentAdmin(admin.ModelAdmin):
    list_display = ("name", "research", "model", "feature_count")
    search_fields = ("name", "model", "research__title")
    inlines = [ExperimentResultInline]


@admin.register(Dataset)
class DatasetAdmin(admin.ModelAdmin):
    list_display = ("name", "research", "source", "size", "feature_count", "format")
    search_fields = ("name", "description", "source")


@admin.register(ExperimentResult)
class ExperimentResultAdmin(admin.ModelAdmin):
    list_display = ("experiment", "metric", "value", "unit", "order")
    search_fields = ("metric", "value", "experiment__name")


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ("title", "research", "venue", "publication_date", "status")
    search_fields = ("title", "venue", "doi")
