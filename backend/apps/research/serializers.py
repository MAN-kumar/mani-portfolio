from rest_framework import serializers
from apps.projects.serializers import ProjectListSerializer
from .models import (
    ResearchCategory,
    Research,
    Dataset,
    Experiment,
    ExperimentResult,
    Publication,
)


class ResearchCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchCategory
        fields = ["id", "name", "slug", "description"]


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = [
            "id",
            "name",
            "description",
            "source",
            "source_url",
            "size",
            "feature_count",
            "format",
        ]


class ExperimentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperimentResult
        fields = ["id", "metric", "value", "unit", "order"]


class ExperimentSerializer(serializers.ModelSerializer):
    results = ExperimentResultSerializer(many=True, read_only=True)

    class Meta:
        model = Experiment
        fields = ["id", "name", "model", "feature_count", "parameters", "notes", "results"]


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = [
            "id",
            "title",
            "venue",
            "publication_date",
            "doi",
            "paper_url",
            "status",
        ]


class ResearchListSerializer(serializers.ModelSerializer):
    category = ResearchCategorySerializer(read_only=True)

    class Meta:
        model = Research
        fields = [
            "id",
            "title",
            "slug",
            "category",
            "abstract",
            "year",
            "status",
            "featured",
            "published",
            "order",
            "created_at",
            "updated_at",
        ]


class ResearchDetailSerializer(serializers.ModelSerializer):
    category = ResearchCategorySerializer(read_only=True)
    datasets = DatasetSerializer(many=True, read_only=True)
    experiments = ExperimentSerializer(many=True, read_only=True)
    publications = PublicationSerializer(many=True, read_only=True)
    related_projects = ProjectListSerializer(many=True, read_only=True)

    class Meta:
        model = Research
        fields = [
            "id",
            "title",
            "slug",
            "category",
            "abstract",
            "motivation",
            "research_question",
            "methodology",
            "limitations",
            "future_work",
            "year",
            "status",
            "featured",
            "published",
            "order",
            "datasets",
            "experiments",
            "publications",
            "related_projects",
            "created_at",
            "updated_at",
        ]
