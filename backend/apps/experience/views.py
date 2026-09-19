from rest_framework import viewsets
from apps.core.permissions import IsAdminUserOrReadOnly
from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()
    filterset_fields = ["current"]
    search_fields = ["company", "role", "description"]
    ordering_fields = ["order", "start_date"]
    ordering = ["order", "-start_date"]
