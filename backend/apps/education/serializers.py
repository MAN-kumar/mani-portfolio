from rest_framework import serializers
from .models import Education


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            "id",
            "institution",
            "degree",
            "field",
            "start",
            "end",
            "description",
            "grade",
            "order",
            "created_at",
            "updated_at",
        ]
