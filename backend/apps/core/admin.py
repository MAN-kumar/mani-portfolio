from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, SiteSetting


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ("key", "value", "description", "updated_at")
    search_fields = ("key", "value", "description")
    ordering = ("key",)
