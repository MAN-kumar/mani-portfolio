from django.contrib import admin
from .models import Profile, SocialLink, Resume


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1
    fields = ("platform", "label", "url", "icon", "order", "active")


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "headline", "email", "location", "updated_at")
    search_fields = ("name", "headline", "short_bio", "current_focus", "email")
    inlines = [SocialLinkInline]
    fieldsets = (
        ("Identity & Contact", {"fields": ("name", "headline", "email", "location")}),
        ("Biographical & Philosophy", {"fields": ("short_bio", "long_bio", "current_focus")}),
    )


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "label", "url", "order", "active", "profile")
    list_filter = ("active", "platform")
    search_fields = ("label", "platform", "url")
    ordering = ("order", "platform")


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "version", "active", "uploaded_at", "file")
    list_filter = ("active",)
    search_fields = ("title", "version")
    ordering = ("-uploaded_at",)
