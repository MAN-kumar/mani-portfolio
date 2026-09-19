import django_filters
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.core.permissions import IsAdminUserOrReadOnly, PublishedOnlyQuerySetMixin
from .models import (
    ProjectCategory,
    Technology,
    Project,
    ProjectMedia,
    ProjectLink,
)
from .serializers import (
    ProjectCategorySerializer,
    TechnologySerializer,
    ProjectMediaSerializer,
    ProjectLinkSerializer,
    ProjectListSerializer,
    ProjectDetailSerializer,
)


class ProjectFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category__slug")
    technology = django_filters.CharFilter(field_name="technologies__slug")

    class Meta:
        model = Project
        fields = ["category", "technology", "category__slug", "technologies__slug", "status", "year", "featured", "published"]


class ProjectCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ProjectCategorySerializer
    queryset = ProjectCategory.objects.all()
    lookup_field = "slug"
    search_fields = ["name", "description"]
    ordering_fields = ["order", "name"]


class TechnologyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()
    lookup_field = "slug"
    filterset_fields = ["category", "featured"]
    search_fields = ["name", "description"]
    ordering_fields = ["order", "name"]

    @action(detail=True, methods=["get"])
    def projects(self, request, slug=None):
        technology = self.get_object()
        queryset = technology.projects.select_related("category").prefetch_related("technologies", "media", "links")
        if not request.user.is_staff:
            queryset = queryset.filter(published=True)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProjectListSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = ProjectListSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)


class ProjectViewSet(PublishedOnlyQuerySetMixin, viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    queryset = Project.objects.all().select_related("category").prefetch_related(
        "technologies", "media", "links", "source_relationships__to_project"
    )
    lookup_field = "slug"
    filterset_class = ProjectFilter
    search_fields = ["title", "short_description", "description", "problem", "approach", "results"]
    ordering_fields = ["year", "order", "title", "created_at"]
    ordering = ["order", "-year", "title"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProjectDetailSerializer
        return ProjectListSerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        queryset = self.get_queryset().filter(featured=True)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProjectListSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = ProjectListSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def related(self, request, slug=None):
        project = self.get_object()
        related_qs = Project.objects.filter(
            target_relationships__from_project=project
        ).select_related("category").prefetch_related("technologies", "media", "links")
        if not request.user.is_staff:
            related_qs = related_qs.filter(published=True)
        page = self.paginate_queryset(related_qs)
        if page is not None:
            serializer = ProjectListSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = ProjectListSerializer(related_qs, many=True, context={"request": request})
        return Response(serializer.data)


class ProjectMediaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ProjectMediaSerializer
    queryset = ProjectMedia.objects.all()
    filterset_fields = ["project", "type", "featured"]
    ordering_fields = ["order", "created_at"]


class ProjectLinkViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ProjectLinkSerializer
    queryset = ProjectLink.objects.all()
    filterset_fields = ["project", "type"]
