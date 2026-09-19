from rest_framework import viewsets
from apps.core.permissions import IsAdminUserOrReadOnly, PublishedOnlyQuerySetMixin
from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(PublishedOnlyQuerySetMixin, viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = SkillSerializer
    queryset = Skill.objects.all().prefetch_related("technologies")
    lookup_field = "slug"
    filterset_fields = ["category", "featured", "active"]
    search_fields = ["name", "category", "description"]
    ordering_fields = ["order", "name"]
    ordering = ["order", "name"]
