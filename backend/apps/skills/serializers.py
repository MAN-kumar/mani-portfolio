from rest_framework import serializers
from apps.projects.serializers import TechnologySerializer
from .models import Skill


class SkillSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Skill
        fields = [
            "id",
            "name",
            "slug",
            "category",
            "description",
            "icon",
            "technologies",
            "featured",
            "order",
            "active",
            "created_at",
            "updated_at",
        ]
