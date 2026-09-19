from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow read-only access for anonymous/public visitors,
    and require staff authentication for all write operations (POST, PUT, PATCH, DELETE).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class PublishedOnlyQuerySetMixin:
    """
    Mixin for ViewSets to automatically restrict public unauthenticated access
    to published/active items only. Staff users can view draft/unpublished items.
    """
    published_field = "published"

    def get_queryset(self):
        queryset = super().get_queryset()
        user = getattr(self.request, "user", None)
        if user and user.is_staff:
            return queryset

        # Check if model has 'published' or 'active' boolean fields
        model_fields = [f.name for f in queryset.model._meta.get_fields()]
        if "published" in model_fields:
            return queryset.filter(published=True)
        elif "active" in model_fields:
            return queryset.filter(active=True)
        return queryset
