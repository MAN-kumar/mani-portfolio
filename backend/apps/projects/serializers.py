from rest_framework import serializers
from .models import (
    ProjectCategory,
    Technology,
    Project,
    ProjectMedia,
    ProjectLink,
    ProjectRelationship,
)


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ["id", "name", "slug", "description", "order"]


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = [
            "id",
            "name",
            "slug",
            "category",
            "icon",
            "description",
            "featured",
            "order",
        ]


class ProjectMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMedia
        fields = [
            "id",
            "type",
            "file",
            "title",
            "alt_text",
            "caption",
            "order",
            "featured",
        ]


class ProjectLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectLink
        fields = ["id", "type", "label", "url"]


class ProjectRelationshipSerializer(serializers.ModelSerializer):
    to_project_slug = serializers.CharField(source="to_project.slug", read_only=True)
    to_project_title = serializers.CharField(source="to_project.title", read_only=True)

    class Meta:
        model = ProjectRelationship
        fields = ["id", "relationship_type", "to_project_slug", "to_project_title"]


class ProjectListSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "category",
            "technologies",
            "status",
            "year",
            "featured",
            "published",
            "order",
            "thumbnail",
            "created_at",
            "updated_at",
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    media = ProjectMediaSerializer(many=True, read_only=True)
    links = ProjectLinkSerializer(many=True, read_only=True)
    source_relationships = ProjectRelationshipSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "category",
            "technologies",
            "status",
            "year",
            "featured",
            "published",
            "order",
            "thumbnail",
            "problem",
            "objective",
            "approach",
            "architecture",
            "implementation",
            "results",
            "challenges",
            "learnings",
            "future_work",
            "media",
            "links",
            "source_relationships",
            "created_at",
            "updated_at",
        ]
