from django.contrib import admin
from .models import Experience


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "start_date", "end_date", "current", "order")
    list_filter = ("current",)
    search_fields = ("company", "role", "description")
    ordering = ("order", "-start_date")
