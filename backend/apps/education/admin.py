from django.contrib import admin
from .models import Education


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "field", "start", "end", "grade", "order")
    search_fields = ("institution", "degree", "field", "description")
    ordering = ("order", "-start")
