from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.profile.models import Profile
from apps.profile.serializers import ProfileSerializer
from apps.projects.models import Project
from apps.projects.serializers import ProjectListSerializer
from apps.research.models import Research
from apps.research.serializers import ResearchListSerializer
from apps.skills.models import Skill
from apps.skills.serializers import SkillSerializer
from apps.experience.models import Experience
from apps.experience.serializers import ExperienceSerializer


class HealthCheckView(APIView):
    """
    Health check endpoint returning machine-readable system status.
    GET /api/v1/health/
    """
    permission_classes = []
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        return Response(
            {
                "status": "ok",
                "service": "mani-portfolio-backend",
                "version": "1.0.0",
            },
            status=status.HTTP_200_OK,
        )


class GlobalSearchView(APIView):
    """
    Global search endpoint across portfolio entities.
    GET /api/v1/search/?q=query
    """
    permission_classes = []
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        query = request.query_params.get("q", "").strip()
        if not query:
            return Response(
                {
                    "query": "",
                    "results": {
                        "projects": [],
                        "research": [],
                        "skills": [],
                        "experience": [],
                    },
                }
            )

        is_staff = request.user and request.user.is_staff

        projects_qs = Project.objects.filter(
            title__icontains=query
        ) | Project.objects.filter(short_description__icontains=query)
        if not is_staff:
            projects_qs = projects_qs.filter(published=True)

        research_qs = Research.objects.filter(
            title__icontains=query
        ) | Research.objects.filter(abstract__icontains=query)
        if not is_staff:
            research_qs = research_qs.filter(published=True)

        skills_qs = Skill.objects.filter(
            name__icontains=query
        ) | Skill.objects.filter(category__icontains=query)
        if not is_staff:
            skills_qs = skills_qs.filter(active=True)

        experience_qs = Experience.objects.filter(
            company__icontains=query
        ) | Experience.objects.filter(role__icontains=query)

        return Response(
            {
                "query": query,
                "results": {
                    "projects": ProjectListSerializer(projects_qs[:10], many=True, context={"request": request}).data,
                    "research": ResearchListSerializer(research_qs[:10], many=True, context={"request": request}).data,
                    "skills": SkillSerializer(skills_qs[:10], many=True, context={"request": request}).data,
                    "experience": ExperienceSerializer(experience_qs[:10], many=True, context={"request": request}).data,
                },
            }
        )


class HomeAggregateView(APIView):
    """
    Aggregated payload for initial home page rendering.
    GET /api/v1/home/
    """
    permission_classes = []
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        is_staff = request.user and request.user.is_staff

        profile = Profile.objects.first()
        profile_data = ProfileSerializer(profile, context={"request": request}).data if profile else None

        projects_qs = Project.objects.filter(featured=True)
        if not is_staff:
            projects_qs = projects_qs.filter(published=True)

        research_qs = Research.objects.filter(featured=True)
        if not is_staff:
            research_qs = research_qs.filter(published=True)

        skills_qs = Skill.objects.filter(featured=True)
        if not is_staff:
            skills_qs = skills_qs.filter(active=True)

        return Response(
            {
                "profile": profile_data,
                "featured_projects": ProjectListSerializer(projects_qs[:6], many=True, context={"request": request}).data,
                "featured_research": ResearchListSerializer(research_qs[:6], many=True, context={"request": request}).data,
                "featured_skills": SkillSerializer(skills_qs[:10], many=True, context={"request": request}).data,
            }
        )
