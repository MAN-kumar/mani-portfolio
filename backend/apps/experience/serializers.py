from rest_framework import serializers
from .models import Experience


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "company",
            "role",
            "description",
            "start_date",
            "end_date",
            "current",
            "order",
            "created_at",
            "updated_at",
        ]
