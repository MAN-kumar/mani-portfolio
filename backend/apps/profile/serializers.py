from rest_framework import serializers
from .models import Profile, SocialLink, Resume


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ["id", "platform", "label", "url", "icon", "order", "active"]


class ProfileSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = [
            "id",
            "name",
            "headline",
            "short_bio",
            "long_bio",
            "current_focus",
            "location",
            "email",
            "social_links",
            "created_at",
            "updated_at",
        ]


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ["id", "title", "file", "version", "active", "uploaded_at"]
