from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.profile.views import ProfileViewSet, SocialLinkViewSet, ResumeViewSet
from apps.projects.views import (
    ProjectCategoryViewSet,
    TechnologyViewSet,
    ProjectViewSet,
    ProjectMediaViewSet,
    ProjectLinkViewSet,
)
from apps.research.views import (
    ResearchCategoryViewSet,
    ResearchViewSet,
    DatasetViewSet,
    ExperimentViewSet,
    PublicationViewSet,
)
from apps.skills.views import SkillViewSet
from apps.experience.views import ExperienceViewSet
from apps.education.views import EducationViewSet
from apps.achievements.views import AchievementViewSet
from .views import HealthCheckView, GlobalSearchView, HomeAggregateView

app_name = "core"

router = DefaultRouter()
router.register(r"profile", ProfileViewSet, basename="profile")
router.register(r"social-links", SocialLinkViewSet, basename="social-link")
router.register(r"resume", ResumeViewSet, basename="resume")

router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"categories", ProjectCategoryViewSet, basename="project-category")
router.register(r"technologies", TechnologyViewSet, basename="technology")
router.register(r"project-media", ProjectMediaViewSet, basename="project-media")
router.register(r"project-links", ProjectLinkViewSet, basename="project-link")

router.register(r"research", ResearchViewSet, basename="research")
router.register(r"research-categories", ResearchCategoryViewSet, basename="research-category")
router.register(r"datasets", DatasetViewSet, basename="dataset")
router.register(r"experiments", ExperimentViewSet, basename="experiment")
router.register(r"publications", PublicationViewSet, basename="publication")

router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"experience", ExperienceViewSet, basename="experience")
router.register(r"education", EducationViewSet, basename="education")
router.register(r"achievements", AchievementViewSet, basename="achievement")

urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="health"),
    path("search/", GlobalSearchView.as_view(), name="search"),
    path("home/", HomeAggregateView.as_view(), name="home"),
    path("", include(router.urls)),
]
