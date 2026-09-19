from rest_framework import viewsets
from apps.core.permissions import IsAdminUserOrReadOnly, PublishedOnlyQuerySetMixin
from .models import Profile, SocialLink, Resume
from .serializers import ProfileSerializer, SocialLinkSerializer, ResumeSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all().prefetch_related("social_links")
    ordering = ["created_at"]


class SocialLinkViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = SocialLinkSerializer
    queryset = SocialLink.objects.all()
    filterset_fields = ["platform", "active"]
    ordering_fields = ["order", "created_at"]


class ResumeViewSet(PublishedOnlyQuerySetMixin, viewsets.ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ResumeSerializer
    queryset = Resume.objects.all()
    filterset_fields = ["active"]
    ordering_fields = ["uploaded_at"]
