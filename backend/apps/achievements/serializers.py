from rest_framework import serializers
from .models import Achievement


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = [
            "id",
            "title",
            "description",
            "category",
            "date",
            "link",
            "image",
            "order",
            "featured",
            "created_at",
            "updated_at",
        ]
