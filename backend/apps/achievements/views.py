from rest_framework import viewsets
from apps.core.permissions import IsAdminUserOrReadOnly
from .models import Achievement
from .serializers import AchievementSerializer


class AchievementViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()
    filterset_fields = ["category", "featured"]
    search_fields = ["title", "description", "category"]
    ordering_fields = ["order", "date"]
    ordering = ["order", "-date"]
