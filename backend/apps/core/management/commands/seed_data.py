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
    Publication,
)
from apps.skills.models import Skill
from apps.experience.models import Experience
from apps.education.models import Education
from apps.achievements.models import Achievement


class Command(BaseCommand):
    help = "Seed initial verified portfolio content for Mani Kumar into PostgreSQL database."

    def handle(self, *args, **options):
        self.stdout.write("Seeding verified portfolio data for Mani Kumar...")

        # 1. Profile
        profile, created = Profile.objects.update_or_create(
            email="arnabgoswami518@gmail.com",
            defaults={
                "name": "Mani Kumar",
                "headline": "Computer Science Student | Full-Stack Developer | AI/ML Enthusiast",
                "short_bio": (
                    "I’m a Computer Science student and developer interested in building "
                    "full-stack applications and AI/ML systems. I work primarily with "
                    "Python, Django, and machine learning technologies, with a focus on "
                    "practical projects and research."
                ),
                "long_bio": (
                    "Computer Science student and full-stack developer with hands-on experience "
                    "building web applications and AI/ML systems. Specializing in Python, Django, "
                    "Django REST Framework, and machine learning workflows with a focus on "
                    "explainable AI and practical software engineering."
                ),
                "current_focus": "B.Tech Computer Science student",
                "location": "Bhubaneswar",
            },
        )
        self.stdout.write(f"  Profile: {'created' if created else 'updated'} ({profile.name})")

        # 2. Social Links
        socials_data = [
            {"platform": "GitHub", "label": "GitHub Profile", "url": "https://github.com/MAN-kumar", "icon": "github", "order": 1},
            {"platform": "LinkedIn", "label": "LinkedIn Profile", "url": "https://www.linkedin.com/in/manikumar007", "icon": "linkedin", "order": 2},
            {"platform": "LeetCode", "label": "LeetCode Profile", "url": "https://leetcode.com/u/Manikyam007mani/", "icon": "code", "order": 3},
            {"platform": "Twitter", "label": "Twitter / X", "url": "https://x.com/Manikyam0007", "icon": "twitter", "order": 4},
            {"platform": "Email", "label": "Send Email", "url": "mailto:arnabgoswami518@gmail.com", "icon": "mail", "order": 5},
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
            defaults={"name": "Full Stack", "description": "Full-stack web applications and APIs", "order": 1},
        )
        cat_aiml, _ = ProjectCategory.objects.update_or_create(
            slug="ai-ml",
            defaults={"name": "AI/ML", "description": "Machine Learning and Artificial Intelligence Systems", "order": 2},
        )

        # 4. Technologies
        tech_data = [
            {"name": "Python", "slug": "python", "category": "Language", "featured": True, "order": 1},
            {"name": "C", "slug": "c", "category": "Language", "featured": False, "order": 2},
            {"name": "C++", "slug": "cpp", "category": "Language", "featured": False, "order": 3},
            {"name": "JavaScript", "slug": "javascript", "category": "Language", "featured": True, "order": 4},
            {"name": "HTML", "slug": "html", "category": "Frontend", "featured": False, "order": 5},
            {"name": "CSS", "slug": "css", "category": "Frontend", "featured": False, "order": 6},
            {"name": "Django", "slug": "django", "category": "Backend", "featured": True, "order": 7},
            {"name": "Django REST Framework", "slug": "django-rest-framework", "category": "Backend", "featured": True, "order": 8},
            {"name": "Django Channels", "slug": "django-channels", "category": "Backend", "featured": True, "order": 9},
            {"name": "PostgreSQL", "slug": "postgresql", "category": "Database", "featured": True, "order": 10},
            {"name": "MySQL", "slug": "mysql", "category": "Database", "featured": False, "order": 11},
            {"name": "Redis", "slug": "redis", "category": "Database", "featured": True, "order": 12},
            {"name": "TensorFlow", "slug": "tensorflow", "category": "AI/ML", "featured": True, "order": 13},
            {"name": "Keras", "slug": "keras", "category": "AI/ML", "featured": False, "order": 14},
            {"name": "OpenCV", "slug": "opencv", "category": "AI/ML", "featured": True, "order": 15},
            {"name": "XGBoost", "slug": "xgboost", "category": "AI/ML", "featured": True, "order": 16},
            {"name": "LightGBM", "slug": "lightgbm", "category": "AI/ML", "featured": False, "order": 17},
            {"name": "CatBoost", "slug": "catboost", "category": "AI/ML", "featured": False, "order": 18},
            {"name": "Scikit-learn", "slug": "scikit-learn", "category": "AI/ML", "featured": True, "order": 19},
            {"name": "SHAP", "slug": "shap", "category": "ML/Research", "featured": True, "order": 20},
            {"name": "Optuna", "slug": "optuna", "category": "ML/Research", "featured": True, "order": 21},
            {"name": "RandomizedSearchCV", "slug": "randomizedsearchcv", "category": "ML/Research", "featured": False, "order": 22},
            {"name": "Git", "slug": "git", "category": "Tools", "featured": True, "order": 23},
            {"name": "GitHub", "slug": "github", "category": "Tools", "featured": True, "order": 24},
            {"name": "VS Code", "slug": "vscode", "category": "Tools", "featured": False, "order": 25},
            {"name": "Anaconda", "slug": "anaconda", "category": "Tools", "featured": False, "order": 26},
            {"name": "FFmpeg", "slug": "ffmpeg", "category": "Tools", "featured": False, "order": 27},
            {"name": "Vercel", "slug": "vercel", "category": "Deployment", "featured": True, "order": 28},
            {"name": "Render", "slug": "render", "category": "Deployment", "featured": True, "order": 29},
            {"name": "Next.js", "slug": "nextjs", "category": "Frontend", "featured": True, "order": 30},
            {"name": "React", "slug": "react", "category": "Frontend", "featured": True, "order": 31},
            {"name": "Tailwind CSS", "slug": "tailwind-css", "category": "Frontend", "featured": False, "order": 32},
            {"name": "Three.js", "slug": "threejs", "category": "Frontend", "featured": False, "order": 33},
            {"name": "React Three Fiber", "slug": "react-three-fiber", "category": "Frontend", "featured": False, "order": 34},
            {"name": "Framer Motion", "slug": "framer-motion", "category": "Frontend", "featured": False, "order": 35},
            {"name": "JWT", "slug": "jwt", "category": "Backend", "featured": False, "order": 36},
            {"name": "MediaPipe", "slug": "mediapipe", "category": "AI/ML", "featured": False, "order": 37},
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

        # 5. The 6 Approved Projects
        # Project 1: Phishing Detection
        p1, _ = Project.objects.update_or_create(
            slug="explainable-phishing-detection",
            defaults={
                "title": "Explainable Machine Learning for Phishing Website Detection Using URL-Based Features",
                "short_description": "A machine-learning based phishing website detection system using URL-based features and explainable AI techniques.",
                "description": "A machine-learning based phishing website detection system using URL-based features and explainable AI techniques. Evaluates multiple classifier algorithms across varying feature subsets selected via Information Gain, tuned with Optuna and RandomizedSearchCV, and explained using SHAP values.",
                "category": cat_aiml,
                "year": 2026,
                "status": "Completed",
                "featured": True,
                "published": True,
                "order": 1,
                "problem": "Detects potentially malicious/phishing websites from URL-based characteristics using machine learning classification.",
                "objective": "Develop a robust classification pipeline comparing multiple ML models across 5, 8, 10, 20, and 30-feature sets with transparent SHAP explainability.",
                "approach": "Extracted URL-based features, performed Information Gain feature selection, tuned hyperparameters via Optuna and RandomizedSearchCV, and validated across independent datasets.",
                "architecture": "Modular Python ML pipeline with cross-dataset validation splits, Optuna search loops, and SHAP summary/waterfall plot generation.",
                "implementation": "Implemented models using Scikit-learn, XGBoost, LightGBM, and CatBoost; optimized hyperparameters and computed SHAP attributions.",
                "results": "Achieved high detection accuracy across cross-dataset benchmarks with detailed SHAP feature attribution rankings.",
                "challenges": "Managing feature subset trade-offs and ensuring consistent SHAP explanation stability across diverse dataset distributions.",
                "learnings": "Combining feature selection with model explainability provides transparent insight into security risk indicators beyond raw accuracy.",
                "future_work": "Expand URL feature extraction pipeline to capture dynamic network signals and real-time browser extension integration.",
            },
        )
        p1.technologies.set([tech_map[name] for name in ["Python", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "SHAP", "Optuna"] if name in tech_map])
        ProjectLink.objects.update_or_create(project=p1, type="github", defaults={"url": "https://github.com/MAN-kumar/phishing_detector", "label": "GitHub"})

        # Project 2: AI Interview Coach
        p2, _ = Project.objects.update_or_create(
            slug="ai-interview-coach",
            defaults={
                "title": "AI Interview Coach",
                "short_description": "An AI-powered interview preparation platform designed around resume analysis, ATS scoring, interview preparation, and candidate analysis.",
                "description": "An AI-powered interview preparation platform designed around resume analysis, ATS scoring, interview preparation, and candidate analysis. Features resume parsing, ATS scoring algorithms, face detection via MediaPipe, and custom JWT authentication.",
                "category": cat_fullstack,
                "year": 2026,
                "status": "In Progress",
                "featured": True,
                "published": True,
                "order": 2,
                "problem": "Helps candidates prepare for interviews and understand how their resume performs against ATS-style evaluation.",
                "objective": "Build an end-to-end web application combining automated resume analysis, ATS scoring, face detection, and interview guidance.",
                "approach": "Designed a Django REST API backend backed by PostgreSQL, paired with a React frontend and MediaPipe computer vision modules.",
                "architecture": "React single-page application communicating with Django REST Framework endpoints protected by JWT authentication tokens.",
                "implementation": "Implemented custom user authentication, resume file upload parsing, ATS scoring logic, and MediaPipe face detection for video interview analysis.",
                "results": "Platform currently in active development with core ATS resume scoring and user authentication subsystems operational.",
            },
        )
        p2.technologies.set([tech_map[name] for name in ["Django", "Django REST Framework", "React", "PostgreSQL", "JWT", "MediaPipe"] if name in tech_map])

        # Project 3: Real-Time Social Media Platform
        p3, _ = Project.objects.update_or_create(
            slug="realtime-social-media-platform",
            defaults={
                "title": "Real-Time Social Media Platform",
                "short_description": "A real-time social media application with real-time communication and backend-driven functionality.",
                "description": "A real-time social media application with real-time communication and backend-driven functionality. Powered by Django Channels and Redis for low-latency WebSocket messaging.",
                "category": cat_fullstack,
                "year": 2025,
                "status": "Completed",
                "featured": True,
                "published": True,
                "order": 3,
                "problem": "Enabling instant bidirectional communication and real-time updates for social platform interactions.",
                "objective": "Architect a scalable real-time messaging and feed system using WebSockets.",
                "approach": "Utilized Django Channels and Redis channel layers to manage asynchronous WebSocket connections and push events.",
                "architecture": "ASGI application server running Django Channels backed by Redis in-memory pub/sub message broker.",
                "implementation": "Developed real-time chat rooms, activity notifications, and WebSocket event handlers connected to a relational database backend.",
                "results": "Delivered instant message delivery with low latency across concurrent client WebSocket connections.",
            },
        )
        p3.technologies.set([tech_map[name] for name in ["Django", "Django Channels", "Redis", "Python", "PostgreSQL"] if name in tech_map])

        # Project 4: Fake AI Image Detector
        p4, _ = Project.objects.update_or_create(
            slug="fake-ai-image-detector",
            defaults={
                "title": "Fake AI Image Detector",
                "short_description": "An AI-based system for detecting potentially AI-generated or manipulated images.",
                "description": "An AI-based system for detecting potentially AI-generated or manipulated images using computer vision preprocessing and deep learning classification models.",
                "category": cat_aiml,
                "year": 2025,
                "status": "Completed",
                "featured": True,
                "published": True,
                "order": 4,
                "problem": "Identifies synthetic, AI-generated, or digitally altered images to combat digital misattribution.",
                "objective": "Create a deep learning image analysis model integrated into a Django web interface.",
                "approach": "Preprocessed incoming image and media files using OpenCV and FFmpeg before feeding tensor representations to a TensorFlow classification model.",
                "architecture": "Django web backend receiving image uploads, triggering OpenCV/FFmpeg extraction routines, and executing TensorFlow model inference.",
                "implementation": "Trained CNN classifier on image artifacts, integrated media decoding via FFmpeg, and exposed web upload interface.",
                "results": "Successfully classified synthetic image patterns with high accuracy on evaluation splits.",
            },
        )
        p4.technologies.set([tech_map[name] for name in ["TensorFlow", "OpenCV", "FFmpeg", "Django", "Python"] if name in tech_map])

        # Project 5: Face Mask Detection
        p5, _ = Project.objects.update_or_create(
            slug="face-mask-detection",
            defaults={
                "title": "Face Mask Detection",
                "short_description": "A computer-vision project for detecting whether a person is wearing a face mask.",
                "description": "A computer-vision project for detecting whether a person is wearing a face mask using deep learning models and real-time video frame processing.",
                "category": cat_aiml,
                "year": 2025,
                "status": "Completed",
                "featured": False,
                "published": True,
                "order": 5,
                "problem": "Automated detection of face mask compliance from video streams and image inputs.",
                "objective": "Train a real-time binary image classifier identifying masked vs. unmasked facial frames.",
                "approach": "Combined OpenCV facial detection cascades with a custom Keras/TensorFlow convolutional neural network.",
                "architecture": "Real-time frame capture pipeline passing cropped facial regions to a lightweight CNN classifier.",
                "implementation": "Trained model on masked/unmasked image datasets, integrated camera feed capturing via OpenCV, and rendered bounding boxes with status labels.",
                "results": "Achieved smooth real-time detection on live video streams with high classification confidence.",
            },
        )
        p5.technologies.set([tech_map[name] for name in ["TensorFlow", "Keras", "OpenCV", "Python"] if name in tech_map])

        # Project 6: Personal Portfolio
        p6, _ = Project.objects.update_or_create(
            slug="personal-portfolio",
            defaults={
                "title": "Personal Portfolio",
                "short_description": "An interactive developer portfolio showcasing projects, research, education, skills, and professional information.",
                "description": "An interactive developer portfolio showcasing projects, research, education, skills, and professional information. Features an interactive 3D frontend built with Next.js App Router and dynamic Django REST API integration backed by PostgreSQL.",
                "category": cat_fullstack,
                "year": 2026,
                "status": "Completed",
                "featured": True,
                "published": True,
                "order": 6,
                "problem": "Showcasing engineering projects, research papers, and technical capabilities in a cohesive, interactive workspace.",
                "objective": "Build a dark-first responsive web platform integrating a modern Next.js frontend with a Django REST API backend.",
                "approach": "Decoupled UI presentation from data fetching, utilizing TypeScript strong types, dynamic 3D knowledge graph visualizers, and structured REST API fallback mechanisms.",
                "architecture": "Next.js 16 App Router hosted on Vercel communicating with Django 5 REST Framework hosted on Render backed by PostgreSQL.",
                "implementation": "Developed responsive page layouts across 9 routes, Three.js knowledge graph canvas, smooth Framer Motion transitions, and idempotent data seeding commands.",
                "results": "Delivered a fast, accessible, 100% type-safe portfolio platform deployed live to production cloud servers.",
            },
        )
        p6.technologies.set([tech_map[name] for name in ["Next.js", "React", "Tailwind CSS", "Three.js", "React Three Fiber", "Framer Motion", "Django REST Framework", "PostgreSQL"] if name in tech_map])
        ProjectLink.objects.update_or_create(project=p6, type="github", defaults={"url": "https://github.com/MAN-kumar", "label": "GitHub"})
        ProjectLink.objects.update_or_create(project=p6, type="demo", defaults={"url": "https://mani-portfolio1.vercel.app", "label": "Live Demo"})

        # Relationships
        ProjectRelationship.objects.update_or_create(
            from_project=p6,
            to_project=p1,
            defaults={"relationship_type": "related"},
        )

        # 6. Research Categories & Phishing Research Item
        res_cat_aiml, _ = ResearchCategory.objects.update_or_create(
            slug="ai-ml",
            defaults={"name": "AI/ML", "description": "Artificial Intelligence & Machine Learning Research"},
        )

        r1, _ = Research.objects.update_or_create(
            slug="explainable-phishing-detection-research",
            defaults={
                "title": "Explainable Machine Learning for Phishing Website Detection Using URL-Based Features",
                "category": res_cat_aiml,
                "abstract": (
                    "Investigating machine-learning based phishing website detection using URL-based features "
                    "and explainable AI techniques. Evaluates multiple classifier algorithms across varying feature "
                    "subsets (5, 8, 10, 20, 30 features) selected via Information Gain, tuned with Optuna and "
                    "RandomizedSearchCV, and interpreted using SHAP values."
                ),
                "motivation": (
                    "Phishing attacks pose significant cybersecurity threats. Black-box machine learning models "
                    "require transparent feature attribution explanations to establish trust and help security analysts "
                    "understand URL risk signals."
                ),
                "research_question": (
                    "How effectively can URL-based feature selection combined with SHAP explainability identify "
                    "phishing websites across diverse machine learning classification models and cross-dataset benchmarks?"
                ),
                "methodology": (
                    "Extracted URL-based features from phishing website datasets. Applied Information Gain feature selection "
                    "across 5, 8, 10, 20, and 30-feature subsets. Evaluated 9 machine learning models (XGBoost, LightGBM, CatBoost, "
                    "Random Forest, Gradient Boosting, Extra Trees, SVM, Logistic Regression, Decision Tree). Optimized "
                    "hyperparameters using Optuna and RandomizedSearchCV, computed SHAP attributions, and validated performance "
                    "via cross-dataset validation."
                ),
                "limitations": (
                    "URL-based feature extraction relies on structural characteristics of URL strings, requiring complementary "
                    "content or network analysis for dynamic zero-day cloaked domains."
                ),
                "future_work": (
                    "Expand URL feature extraction pipeline to include dynamic page DOM features and real-time browser "
                    "extension integration."
                ),
                "year": 2026,
                "status": "in_progress",
                "featured": True,
                "published": True,
                "order": 1,
            },
        )
        r1.related_projects.set([p1])

        Dataset.objects.update_or_create(
            research=r1,
            name="Phishing Website Datasets",
            defaults={
                "description": "Phishing website datasets with 31 URL-based features targeting binary classification ('Result').",
                "source": "Phishing Website Benchmark Datasets",
                "feature_count": 31,
                "format": "Tabular / CSV",
                "size": "Training: 5849 × 31 | Testing: 2456 × 31",
            },
        )

        exp, _ = Experiment.objects.update_or_create(
            research=r1,
            name="URL Feature Selection & Model Comparison",
            defaults={
                "model": "XGBoost, LightGBM, CatBoost, Random Forest, Gradient Boosting, Extra Trees, SVM, Logistic Regression, Decision Tree",
                "feature_count": 30,
                "notes": "Evaluated 5, 8, 10, 20, and 30-feature subsets selected via Information Gain. Hyperparameters tuned with Optuna and RandomizedSearchCV.",
            },
        )

        ExperimentResult.objects.update_or_create(experiment=exp, metric="Training Split", defaults={"value": "5849 × 31", "unit": "samples", "order": 1})
        ExperimentResult.objects.update_or_create(experiment=exp, metric="Testing Split", defaults={"value": "2456 × 31", "unit": "samples", "order": 2})
        ExperimentResult.objects.update_or_create(experiment=exp, metric="Feature Subsets", defaults={"value": "5, 8, 10, 20, 30", "unit": "features", "order": 3})
        ExperimentResult.objects.update_or_create(experiment=exp, metric="Feature Selection", defaults={"value": "Information Gain", "unit": "method", "order": 4})
        ExperimentResult.objects.update_or_create(experiment=exp, metric="Optimization", defaults={"value": "Optuna & RandomizedSearchCV", "unit": "framework", "order": 5})
        ExperimentResult.objects.update_or_create(experiment=exp, metric="Explainability", defaults={"value": "SHAP Values", "unit": "method", "order": 6})

        Publication.objects.update_or_create(
            research=r1,
            title="Explainable Machine Learning for Phishing Website Detection Using URL-Based Features",
            defaults={
                "venue": "IEEE Conference (Intended Publication)",
                "status": "In Preparation / Not Published Yet",
            },
        )

        # 7. Skills
        skills_data = [
            {
                "name": "Programming Languages",
                "slug": "programming-languages",
                "category": "Languages",
                "description": "Core programming languages used for software development, systems engineering, and machine learning.",
                "featured": True,
                "order": 1,
                "active": True,
                "techs": ["Python", "C", "C++", "JavaScript"],
            },
            {
                "name": "Frontend Development",
                "slug": "frontend-development",
                "category": "Frontend",
                "description": "Building responsive web interfaces and user components.",
                "featured": True,
                "order": 2,
                "active": True,
                "techs": ["HTML", "CSS", "JavaScript"],
            },
            {
                "name": "Backend Frameworks & Real-Time APIs",
                "slug": "backend-frameworks",
                "category": "Backend",
                "description": "Developing RESTful APIs, web applications, and real-time WebSocket communication backends.",
                "featured": True,
                "order": 3,
                "active": True,
                "techs": ["Django", "Django REST Framework", "Django Channels"],
            },
            {
                "name": "Databases & In-Memory Stores",
                "slug": "databases",
                "category": "Database",
                "description": "Managing relational databases and caching layers for web and ML applications.",
                "featured": True,
                "order": 4,
                "active": True,
                "techs": ["PostgreSQL", "MySQL", "Redis"],
            },
            {
                "name": "AI & Machine Learning Frameworks",
                "slug": "ai-machine-learning",
                "category": "AI/ML",
                "description": "Building machine learning models, computer vision pipelines, and deep learning architectures.",
                "featured": True,
                "order": 5,
                "active": True,
                "techs": ["TensorFlow", "Keras", "OpenCV", "XGBoost", "LightGBM", "CatBoost", "Scikit-learn"],
            },
            {
                "name": "ML Explainability & Optimization",
                "slug": "ml-explainability-research",
                "category": "ML/Research",
                "description": "Model interpretability, hyperparameter tuning, feature selection, and explainable AI techniques.",
                "featured": True,
                "order": 6,
                "active": True,
                "techs": ["SHAP", "Optuna", "RandomizedSearchCV"],
            },
            {
                "name": "Developer Tools & Media Utilities",
                "slug": "developer-tools",
                "category": "Tools",
                "description": "Development environments, version control, and multimedia processing libraries.",
                "featured": True,
                "order": 7,
                "active": True,
                "techs": ["Git", "GitHub", "VS Code", "Anaconda", "FFmpeg"],
            },
            {
                "name": "Deployment & Cloud Hosting",
                "slug": "deployment-hosting",
                "category": "Deployment",
                "description": "Deploying production web applications and APIs to serverless and managed cloud platforms.",
                "featured": True,
                "order": 8,
                "active": True,
                "techs": ["Vercel", "Render"],
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

        # 8. Experience (OCAC Internship)
        Experience.objects.update_or_create(
            company="OCAC",
            role="Full Stack Python Intern",
            defaults={
                "description": (
                    "Worked on full-stack Python development during a 12-month internship "
                    "(July 2025 – June 2026). Built web applications using Python and worked with "
                    "frontend, backend, and database concepts."
                ),
                "start_date": datetime.date(2025, 7, 1),
                "end_date": datetime.date(2026, 6, 30),
                "current": False,
                "order": 1,
            },
        )

        # 9. Education (GITA B.Tech, GP Jagannathpur Diploma, D.A.V High School Class 10)
        Education.objects.update_or_create(
            institution="GITA University, Bhubaneswar, Odisha",
            degree="Bachelor of Technology (B.Tech)",
            defaults={
                "field": "Computer Science",
                "start": datetime.date(2024, 8, 1),
                "end": datetime.date(2027, 5, 31),
                "description": "Lateral Entry student in Computer Science. Semester CGPAs: 3rd: 6.3 | 4th: 7.2 | 5th: 7.65 | 6th: 7.85.",
                "grade": "Sem 3-6: 6.3, 7.2, 7.65, 7.85",
                "order": 1,
            },
        )

        Education.objects.update_or_create(
            institution="Government Polytechnic Jagannathpur, West Singhbhum, Jharkhand",
            degree="Diploma in Engineering",
            defaults={
                "field": "Engineering",
                "start": datetime.date(2020, 8, 1),
                "end": datetime.date(2023, 5, 31),
                "description": "Completed Diploma in Engineering with an aggregate percentage of 67.69%.",
                "grade": "67.69%",
                "order": 2,
            },
        )

        Education.objects.update_or_create(
            institution="D.A.V High School, Jharia",
            degree="Class 10",
            defaults={
                "field": "CBSE",
                "start": datetime.date(2020, 1, 1),
                "end": datetime.date(2020, 5, 31),
                "description": "Passed Class 10 CBSE Board Examination with 80%.",
                "grade": "80%",
                "order": 3,
            },
        )

        # 10. Achievements
        Achievement.objects.update_or_create(
            title="Internal Hackathon — Rank 6",
            defaults={
                "description": "Secured 6th rank in the internal coding hackathon.",
                "category": "Competitive Programming",
                "date": datetime.date(2025, 1, 1),
                "featured": True,
                "order": 1,
            },
        )

        Achievement.objects.update_or_create(
            title="25+ LeetCode Problems Solved",
            defaults={
                "description": "Solved 25+ algorithmic problems across data structures and algorithms on LeetCode.",
                "category": "Problem Solving",
                "date": datetime.date(2025, 1, 1),
                "link": "https://leetcode.com/u/Manikyam007mani/",
                "featured": True,
                "order": 2,
            },
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded verified Mani Kumar portfolio data into database!"))
