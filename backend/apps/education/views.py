from rest_framework import viewsets
from apps.core.permissions import IsAdminUserOrReadOnly
from .models import Education
from .serializers import EducationSerializer


class EducationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = EducationSerializer
    queryset = Education.objects.all()
    search_fields = ["institution", "degree", "field", "description"]
    ordering_fields = ["order", "start"]
    ordering = ["order", "-start"]
