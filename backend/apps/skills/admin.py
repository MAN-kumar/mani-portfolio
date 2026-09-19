from django.contrib import admin
from .models import Skill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "category", "featured", "active", "order")
    list_filter = ("featured", "active", "category")
    search_fields = ("name", "category", "description")
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("technologies",)
    ordering = ("order", "name")
