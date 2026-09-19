from django.contrib import admin
from .models import Achievement


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "date", "featured", "order")
    list_filter = ("featured", "category")
    search_fields = ("title", "description", "category")
    ordering = ("order", "-date")
