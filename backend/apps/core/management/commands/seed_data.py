import datetime
from django.core.management.base import BaseCommand
from apps.profile.models import Profile, SocialLink
from apps.projects.models import (
    ProjectCategory,
    Technology,
    Project,
    ProjectLink,
    ProjectRelationship,
)
from apps.research.models import (
    ResearchCategory,
    Research,
    Dataset,
    Experiment,
    ExperimentResult,
)
from apps.skills.models import Skill
from apps.experience.models import Experience
from apps.education.models import Education
from apps.achievements.models import Achievement


class Command(BaseCommand):
    help = "Seed initial canonical portfolio content into PostgreSQL database."

    def handle(self, *args, **options):
        self.stdout.write("Seeding canonical portfolio data...")

        # 1. Profile
        profile, created = Profile.objects.update_or_create(
            email="contact@mani.dev",
            defaults={
                "name": "Mani",
                "headline": "Full Stack & AI Engineer",
                "short_bio": (
                    "Building intelligent, highly-interactive digital products "
                    "with Next.js, TypeScript, Django, and Machine Learning."
                ),
                "long_bio": (
                    "I focus on engineering high-performance Web applications, "
                    "scalable API systems, and intelligent machine learning models. "
                    "My approach treats content as structured data and UI as a predictable design system."
                ),
                "current_focus": (
                    "Architecting full-stack applications with Next.js App Router, "
                    "Django REST Framework, PostgreSQL, and modern web motion."
                ),
                "location": "India",
            },
        )
        self.stdout.write(f"  Profile: {'created' if created else 'updated'} ({profile.name})")

        # 2. Social Links
        socials_data = [
            {"platform": "GitHub", "label": "GitHub Profile", "url": "https://github.com", "icon": "github", "order": 1},
            {"platform": "LinkedIn", "label": "LinkedIn Profile", "url": "https://linkedin.com", "icon": "linkedin", "order": 2},
            {"platform": "Twitter", "label": "Twitter / X", "url": "https://x.com", "icon": "twitter", "order": 3},
            {"platform": "Email", "label": "Send Email", "url": "mailto:contact@mani.dev", "icon": "mail", "order": 4},
        ]

        for s in socials_data:
            SocialLink.objects.update_or_create(
                profile=profile,
                platform=s["platform"],
                defaults={
                    "label": s["label"],
                    "url": s["url"],
                    "icon": s["icon"],
                    "order": s["order"],
                    "active": True,
                },
            )

        # 3. Project Categories
        cat_fullstack, _ = ProjectCategory.objects.update_or_create(
            slug="full-stack",
            defaults={"name": "Full Stack", "description": "End-to-end applications", "order": 1},
        )
        cat_aiml, _ = ProjectCategory.objects.update_or_create(
            slug="ai-ml",
            defaults={"name": "AI/ML", "description": "Machine Learning and Artificial Intelligence", "order": 2},
        )

        # 4. Technologies
        tech_data = [
            {"name": "Next.js", "slug": "nextjs", "category": "Frontend", "featured": True, "order": 1},
            {"name": "React", "slug": "react", "category": "Frontend", "featured": True, "order": 2},
            {"name": "TypeScript", "slug": "typescript", "category": "Language", "featured": True, "order": 3},
            {"name": "Tailwind CSS", "slug": "tailwind-css", "category": "Frontend", "featured": False, "order": 4},
            {"name": "Framer Motion", "slug": "framer-motion", "category": "Frontend", "featured": False, "order": 5},
            {"name": "Django", "slug": "django", "category": "Backend", "featured": True, "order": 6},
            {"name": "Django REST Framework", "slug": "django-rest-framework", "category": "Backend", "featured": True, "order": 7},
            {"name": "PostgreSQL", "slug": "postgresql", "category": "Database", "featured": True, "order": 8},
            {"name": "Python", "slug": "python", "category": "Language", "featured": True, "order": 9},
            {"name": "Docker", "slug": "docker", "category": "DevOps", "featured": False, "order": 10},
            {"name": "PyTorch", "slug": "pytorch", "category": "AI/ML", "featured": True, "order": 11},
            {"name": "OpenCV", "slug": "opencv", "category": "AI/ML", "featured": False, "order": 12},
            {"name": "NumPy", "slug": "numpy", "category": "Data Science", "featured": False, "order": 13},
            {"name": "Scikit-Learn", "slug": "scikit-learn", "category": "AI/ML", "featured": False, "order": 14},
        ]

        tech_map = {}
        for t in tech_data:
            tech_obj, _ = Technology.objects.update_or_create(
                slug=t["slug"],
                defaults={
                    "name": t["name"],
                    "category": t["category"],
                    "featured": t["featured"],
                    "order": t["order"],
                },
            )
            tech_map[t["name"]] = tech_obj

        # 5. Projects
        p1, _ = Project.objects.update_or_create(
            slug="interactive-portfolio-platform",
            defaults={
                "title": "Mani — Digital Identity & Portfolio",
                "short_description": "A dark-first, highly responsive portfolio platform built with Next.js App Router, TypeScript, and Framer Motion.",
                "description": "A product-grade personal portfolio engineered as a structured data system. Features modular component design, URL-based state sync, and strict accessibility standards.",
                "category": cat_fullstack,
                "year": 2026,
                "status": "Completed",
                "featured": True,
                "published": True,
                "order": 1,
                "problem": "Traditional developer portfolios often mix UI presentation with hardcoded text, making content updates fragile and maintenance cumbersome.",
                "objective": "Engineered a scalable architecture where structured JSON/API data feeds reusable component layouts across 9 interactive routes.",
                "approach": "Implemented a strict multi-layer separation between content data access, feature containers, and atomic UI design system primitives.",
                "architecture": "Next.js App Router with React Server Components, TypeScript strong interfaces, and a stable abstraction layer ready for Django REST integration.",
                "implementation": "Designed reusable tokens, dark-first color system, accessible form controls, and subtle micro-animations for responsive desktop & mobile screens.",
                "results": "Achieved 100% type safety, zero lint warnings, fast static rendering, and instant filter state updates.",
                "challenges": "Maintaining strict accessibility focus states while supporting custom visual tokens and clean dark mode aesthetics.",
                "learnings": "Decoupling the data access abstraction from the presentation layer makes future CMS or database migration seamless.",
                "future_work": "Integrate PostgreSQL backend database with Django Admin CMS for real-time live content updates.",
            },
        )
        p1.technologies.set([tech_map[name] for name in ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Django"] if name in tech_map])
        ProjectLink.objects.update_or_create(project=p1, type="github", defaults={"url": "https://github.com/example/mani-portfolio", "label": "GitHub"})
        ProjectLink.objects.update_or_create(project=p1, type="demo", defaults={"url": "https://mani.dev", "label": "Live Demo"})

        p2, _ = Project.objects.update_or_create(
            slug="django-rest-api-engine",
            defaults={
                "title": "Django REST Content Management Core",
                "short_description": "Scalable Django REST Framework API powering dynamic data management and PostgreSQL persistence.",
                "description": "A robust backend infrastructure with custom user model authentication, structured content serialization, CORS/CSRF security, and automated database indexing.",
                "category": cat_fullstack,
                "year": 2026,
                "status": "In Progress",
                "featured": True,
                "published": True,
                "order": 2,
                "problem": "Static content configuration requires redeployment whenever portfolio case studies or research items are updated.",
                "objective": "Provide a secure, authenticated REST API powering dynamic GET endpoints for public consumption and write access for content owners.",
                "approach": "Utilized Django ORM models with UUID keys, custom serializers, select_related query optimizations, and rate-limited endpoints.",
                "architecture": "PostgreSQL storage engine connected via Django ORM to Django REST Framework endpoints protected by rate limiting and CORS policies.",
                "results": "Delivered sub-50ms API response times with efficient SQL queries avoiding N+1 join overhead.",
            },
        )
        p2.technologies.set([tech_map[name] for name in ["Django", "Django REST Framework", "PostgreSQL", "Python", "Docker"] if name in tech_map])
        ProjectLink.objects.update_or_create(project=p2, type="github", defaults={"url": "https://github.com/example/django-portfolio-core", "label": "GitHub"})

        p3, _ = Project.objects.update_or_create(
            slug="computer-vision-research-lab",
            defaults={
                "title": "Real-Time Visual Analysis System",
                "short_description": "Computer vision pipeline for image classification, feature extraction, and real-time object identification.",
                "description": "An experimental machine learning environment for training, testing, and evaluating deep visual perception models.",
                "category": cat_aiml,
                "year": 2025,
                "status": "Completed",
                "featured": False,
                "published": True,
                "order": 3,
                "problem": "High computational costs and latency when performing multi-class visual inference on continuous video frames.",
                "objective": "Optimize model inference pipeline for real-time responsiveness without dropping accuracy metrics.",
                "approach": "Applied model quantization, feature map pruning, and tensor batch optimization.",
                "results": "Reduced latency by 42% while retaining 94.5% classification accuracy across benchmark validation splits.",
            },
        )
        p3.technologies.set([tech_map[name] for name in ["Python", "PyTorch", "OpenCV", "NumPy", "Scikit-Learn"] if name in tech_map])
        ProjectLink.objects.update_or_create(project=p3, type="github", defaults={"url": "https://github.com/example/cv-research-lab", "label": "GitHub"})

        # Project Relationships
        ProjectRelationship.objects.update_or_create(
            from_project=p1,
            to_project=p2,
            defaults={"relationship_type": "related"},
        )

        # 6. Research Categories & Items
        res_cat_aiml, _ = ResearchCategory.objects.update_or_create(
            slug="ai-ml",
            defaults={"name": "AI/ML", "description": "Artificial Intelligence & Machine Learning Research"},
        )

        r1, _ = Research.objects.update_or_create(
            slug="explainable-ai-dashboard",
            defaults={
                "title": "Feature Importance & Model Explainability Visualizer",
                "category": res_cat_aiml,
                "abstract": "Investigating techniques for interpreting complex machine learning predictions through feature contribution analysis and transparent model inspection.",
                "motivation": "Black-box machine learning models require transparent explanations to establish user trust and facilitate clinical or technical debugging.",
                "research_question": "How effectively can model-agnostic feature attribution algorithms represent non-linear feature interactions in tabular and vision datasets?",
                "methodology": "Conducted comparative experiments measuring SHAP value convergence speed, local attribution consistency, and feature interaction rankings across synthetic and real-world benchmark datasets.",
                "limitations": "Exact Shapley value computation scales exponentially with feature dimensionality, requiring sampling approximations for high-dimensional feature spaces.",
                "future_work": "Extend local interpretation methods to real-time streaming time-series data.",
                "year": 2025,
                "status": "completed",
                "featured": True,
                "published": True,
                "order": 1,
            },
        )
        r1.related_projects.set([p1, p3])

        dataset, _ = Dataset.objects.update_or_create(
            research=r1,
            name="Tabular & Benchmark Evaluation Callset",
            defaults={
                "description": "Standardized multi-feature benchmark dataset for testing model explainability metrics.",
                "source": "Open Data Science Repository",
                "feature_count": 42,
                "format": "CSV / Parquet",
            },
        )

        exp, _ = Experiment.objects.update_or_create(
            research=r1,
            name="Feature Attribution Benchmark",
            defaults={
                "model": "Gradient Boosted Decision Trees & Random Forests",
                "feature_count": 42,
                "notes": "Evaluated stability of local feature importance attribution across 1000 validation runs.",
            },
        )

        ExperimentResult.objects.update_or_create(
            experiment=exp,
            metric="Attribution Consistency",
            defaults={"value": "96.4", "unit": "%", "order": 1},
        )
        ExperimentResult.objects.update_or_create(
            experiment=exp,
            metric="Inference Overhead",
            defaults={"value": "14.2", "unit": "ms", "order": 2},
        )

        # 7. Skills
        skills_data = [
            {
                "name": "Full-Stack Web Development",
                "slug": "full-stack-web-development",
                "category": "Engineering",
                "description": "Building end-to-end web applications with Next.js, React, TypeScript, and modern CSS architecture.",
                "featured": True,
                "order": 1,
                "active": True,
                "techs": ["Next.js", "React", "TypeScript", "Tailwind CSS"],
            },
            {
                "name": "Backend & API Architecture",
                "slug": "backend-api-architecture",
                "category": "Engineering",
                "description": "Designing RESTful APIs, relational databases, authentication schemes, and scalable server backends.",
                "featured": True,
                "order": 2,
                "active": True,
                "techs": ["Django", "Django REST Framework", "PostgreSQL", "Python"],
            },
            {
                "name": "Machine Learning & AI",
                "slug": "machine-learning-ai",
                "category": "Artificial Intelligence",
                "description": "Developing machine learning pipelines, model training experiments, and explainability visualizations.",
                "featured": True,
                "order": 3,
                "active": True,
                "techs": ["Python", "PyTorch", "Scikit-Learn", "OpenCV", "NumPy"],
            },
            {
                "name": "Interactive Motion & UI Design",
                "slug": "interactive-motion-ui-design",
                "category": "Design & UX",
                "description": "Crafting dark-first responsive interfaces, smooth motion transitions, and interactive visual components.",
                "featured": True,
                "order": 4,
                "active": True,
                "techs": ["Framer Motion", "Tailwind CSS"],
            },
        ]

        for sk in skills_data:
            sk_obj, _ = Skill.objects.update_or_create(
                slug=sk["slug"],
                defaults={
                    "name": sk["name"],
                    "category": sk["category"],
                    "description": sk["description"],
                    "featured": sk["featured"],
                    "order": sk["order"],
                    "active": sk["active"],
                },
            )
            sk_obj.technologies.set([tech_map[name] for name in sk["techs"] if name in tech_map])

        # 8. Experience
        Experience.objects.update_or_create(
            company="Software & AI Solutions",
            role="Full Stack & AI Engineer",
            defaults={
                "description": (
                    "Architecting modular React & Next.js web applications, "
                    "integrating Django REST API backends, and developing machine learning visual workflows."
                ),
                "start_date": datetime.date(2024, 1, 1),
                "current": True,
                "order": 1,
            },
        )

        # 9. Education
        Education.objects.update_or_create(
            institution="University Institute of Technology",
            degree="Bachelor of Technology (B.Tech)",
            defaults={
                "field": "Computer Science & Engineering",
                "start": datetime.date(2021, 8, 1),
                "end": datetime.date(2025, 5, 31),
                "description": "Specialized in Computer Science, Algorithm Analysis, Software Engineering, and Artificial Intelligence.",
                "order": 1,
            },
        )

        # 10. Achievement
        Achievement.objects.update_or_create(
            title="Full-Stack Portfolio Engine Release",
            defaults={
                "description": "Designed and implemented a scalable, multi-layered portfolio architecture with Next.js App Router and TypeScript.",
                "category": "Engineering",
                "date": datetime.date(2026, 1, 1),
                "featured": True,
                "order": 1,
            },
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded all canonical portfolio data into database!"))
