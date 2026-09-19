import django_filters
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.core.permissions import IsAdminUserOrReadOnly, PublishedOnlyQuerySetMixin
from .models import (
    ResearchCategory,
    Research,
    Dataset,
    Experiment,
    Publication,
)
from .serializers import (
    ResearchCategorySerializer,
    DatasetSerializer,
    ExperimentSerializer,
    PublicationSerializer,
    ResearchListSerializer,
    ResearchDetailSerializer,
)


class ResearchFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category__slug")

    class Meta:
        model = Research
        fields = ["category", "category__slug", "status", "year", "featured", "published"]


class ResearchCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ResearchCategorySerializer
    queryset = ResearchCategory.objects.all()
    lookup_field = "slug"
    search_fields = ["name", "description"]
    ordering_fields = ["name"]


class ResearchViewSet(PublishedOnlyQuerySetMixin, viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    queryset = Research.objects.all().select_related("category").prefetch_related(
        "datasets", "experiments__results", "publications", "related_projects"
    )
    lookup_field = "slug"
    filterset_class = ResearchFilter
    search_fields = ["title", "abstract", "motivation", "research_question", "methodology"]
    ordering_fields = ["year", "order", "title", "created_at"]
    ordering = ["order", "-year", "title"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ResearchDetailSerializer
        return ResearchListSerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        queryset = self.get_queryset().filter(featured=True)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ResearchListSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = ResearchListSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)


class DatasetViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = DatasetSerializer
    queryset = Dataset.objects.all()
    filterset_fields = ["research", "format"]
    search_fields = ["name", "description", "source"]
    ordering = ["created_at"]


class ExperimentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ExperimentSerializer
    queryset = Experiment.objects.all().prefetch_related("results")
    filterset_fields = ["research", "model"]
    search_fields = ["name", "model", "notes"]
    ordering = ["created_at"]


class PublicationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = PublicationSerializer
    queryset = Publication.objects.all()
    filterset_fields = ["research", "status"]
    search_fields = ["title", "venue", "doi"]
    ordering_fields = ["publication_date"]
    ordering = ["-publication_date", "created_at"]
