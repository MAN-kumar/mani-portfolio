# 05. Database Guide

## 1. Schema Overview

The database layer for the portfolio system is built on **PostgreSQL** (managed via Render in production and SQLite/PostgreSQL in development) using Django's Object-Relational Mapping (ORM).

### Key Architectural Characteristics
- **Primary Keys**: Every domain model inherits from `TimeStampedModel` (`apps.core.models.TimeStampedModel`), which assigns a UUID (`uuid.uuid4`) as its primary key.
- **Audit Timestamps**: `created_at` (`auto_now_add=True`) and `updated_at` (`auto_now=True`) fields are automatically provided across all entities.
- **Publication & Active Filtering**: Published vs. draft content is controlled via `published` (on `Project` and `Research`) or `active` (on `SocialLink`, `Resume`, `Skill`) boolean flags. Unauthenticated public API consumers only receive records where `published=True` or `active=True`.
- **Ordering**: Models define sensible default ordering using `order` integer fields combined with secondary parameters like `year`, `start_date`, or `created_at`.

---

## 2. Entity-Relationship (ER) Textual Diagram

```
+------------------+         +--------------------+         +-------------------+
|     Profile      | 1 ---- *|    SocialLink      |         |      Resume       |
+------------------+         +--------------------+         +-------------------+
| id (UUID, PK)    |         | id (UUID, PK)      |         | id (UUID, PK)     |
| name, email, etc.|         | profile_id (FK)    |         | title, file, ver  |
+------------------+         +--------------------+         +-------------------+

+------------------+         +--------------------+         +-------------------+
| ProjectCategory  | 1 ---- *|      Project       |* --- *  |    Technology     |
+------------------+         +--------------------+         +-------------------+
| id (UUID, PK)    |         | id (UUID, PK)      |         | id (UUID, PK)     |
| name, slug (UQ)  |         | category_id (FK)   |         | name (UQ), slug   |
+------------------+         +--------------------+         +-------------------+
                               | 1        | 1        | 1
                               | *        | *        | *
                       +-------+   +------+   +------+
                       |           |          |
                       v           v          v
          +----------------+ +--------------+ +---------------------+
          |  ProjectMedia  | | ProjectLink  | | ProjectRelationship |
          +----------------+ +--------------+ +---------------------+
          | id (UUID, PK)  | | id (UUID, PK)| | from_project_id(FK) |
          | project_id (FK)| | project_id   | | to_project_id (FK)  |
          +----------------+ +--------------+ +---------------------+

+------------------+         +--------------------+
| ResearchCategory | 1 ---- *|      Research      |
+------------------+         +--------------------+
| id (UUID, PK)    |         | category_id (FK)   |
| name, slug (UQ)  |         | related_projects*  |
+------------------+         +--------------------+
                               | 1        | 1        | 1        | 1
                               | *        | *        | *        | *
                       +-------+   +------+   +------+   +------+
                       |           |          |          |
                       v           v          v          v
          +----------------+ +--------------+ +-------------+ +---------------+
          |    Dataset     | |  Experiment  | | Publication | | Related Projs |
          +----------------+ +--------------+ +-------------+ +---------------+
          | research_id(FK)| | research_id  | | research_id | | m2m junction  |
          +----------------+ +--------------+ +-------------+ +---------------+
                                    | 1
                                    | *
                                    v
                             +-------------------+
                             | ExperimentResult  |
                             +-------------------+
                             | experiment_id(FK) |
                             +-------------------+

+------------------+         +--------------------+         +-------------------+
|      Skill       |* ---- * |     Experience     |         |     Education     |
+------------------+         +--------------------+         +-------------------+
| id (UUID, PK)    |         | id (UUID, PK)      |         | id (UUID, PK)     |
| technologies*    |         | company, role, etc |         | institution, deg  |
+------------------+         +--------------------+         +-------------------+

+------------------+         +--------------------+         +-------------------+
|   Achievement    |         |   ContactMessage   |         |    SiteSetting    |
+------------------+         +--------------------+         +-------------------+
| id (UUID, PK)    |         | id (UUID, PK)      |         | id (UUID, PK)     |
| title, date, etc |         | name, email, status|         | key (UQ), value   |
+------------------+         +--------------------+         +-------------------+
```

---

## 3. Model Specifications

### 3.1. Core App (`apps.core`)

#### `User` (`apps.core.models.User`)
- **Purpose**: Custom user model inheriting from Django `AbstractUser` for administrative authentication and future authorization extensions.
- **Base Table**: `core_user`
- **Fields**: Standard Django user fields (`username`, `email`, `password`, `is_staff`, `is_superuser`, `is_active`, `last_login`, `date_joined`).
- **Relationships**: None (standalone authentication identity).
- **Constraints / Indexes**: Primary key is integer ID from Django standard AbstractUser. `username` is unique.

#### `SiteSetting` (`apps.core.models.SiteSetting`)
- **Purpose**: Key-value pairs for global application settings.
- **Fields**:
  - `id`: UUID (PK)
  - `key`: CharField(100) — **Unique**, Indexed (`db_index=True`)
  - `value`: TextField()
  - `description`: CharField(255, blank)
  - `created_at`: DateTimeField
  - `updated_at`: DateTimeField
- **Constraints**: `key` must be unique across the table.

---

### 3.2. Profile App (`apps.profile`)

#### `Profile` (`apps.profile.models.Profile`)
- **Purpose**: Top-level developer bio and contact header data.
- **Fields**:
  - `id`: UUID (PK)
  - `name`: CharField(100)
  - `headline`: CharField(255)
  - `short_bio`: TextField()
  - `long_bio`: TextField(blank)
  - `current_focus`: TextField()
  - `location`: CharField(100, blank)
  - `email`: EmailField()

#### `SocialLink` (`apps.profile.models.SocialLink`)
- **Purpose**: Links to external profiles (GitHub, LinkedIn, Kaggle, etc.).
- **Fields**:
  - `id`: UUID (PK)
  - `profile`: ForeignKey(`Profile`, `on_delete=CASCADE`, `related_name="social_links"`)
  - `platform`: CharField(50)
  - `label`: CharField(100)
  - `url`: URLField()
  - `icon`: CharField(50, blank)
  - `order`: PositiveIntegerField(default=0)
  - `active`: BooleanField(default=True)
- **Ordering**: `["order", "created_at"]`

#### `Resume` (`apps.profile.models.Resume`)
- **Purpose**: Downloadable resume PDF files and version records.
- **Fields**:
  - `id`: UUID (PK)
  - `title`: CharField(100)
  - `file`: FileField(upload_to="resumes/")
  - `version`: CharField(20)
  - `active`: BooleanField(default=True)
  - `uploaded_at`: DateTimeField(auto_now_add=True)
- **Ordering**: `["-uploaded_at"]`

---

### 3.3. Projects App (`apps.projects`)

#### `ProjectCategory` (`apps.projects.models.ProjectCategory`)
- **Purpose**: Category classifications for portfolio projects (e.g., "Full-Stack", "Machine Learning").
- **Fields**:
  - `id`: UUID (PK)
  - `name`: CharField(100)
  - `slug`: SlugField(100) — **Unique**, Indexed (`db_index=True`)
  - `description`: TextField(blank)
  - `order`: PositiveIntegerField(default=0)
- **Ordering**: `["order", "name"]`

#### `Technology` (`apps.projects.models.Technology`)
- **Purpose**: Technology tag catalog (e.g., "React", "PyTorch", "PostgreSQL").
- **Fields**:
  - `id`: UUID (PK)
  - `name`: CharField(100) — **Unique**
  - `slug`: SlugField(100) — **Unique**, Indexed (`db_index=True`)
  - `category`: CharField(50, blank)
  - `icon`: CharField(50, blank)
  - `description`: TextField(blank)
  - `featured`: BooleanField(default=False, db_index=True)
  - `order`: PositiveIntegerField(default=0)
- **Ordering**: `["order", "name"]`

#### `Project` (`apps.projects.models.Project`)
- **Purpose**: Detailed portfolio project record with problem statements, architectural details, and results.
- **Fields**:
  - `id`: UUID (PK)
  - `title`: CharField(255)
  - `slug`: SlugField(255) — **Unique**, Indexed (`db_index=True`)
  - `short_description`: TextField()
  - `description`: TextField()
  - `category`: ForeignKey(`ProjectCategory`, `on_delete=SET_NULL`, null/blank, `related_name="projects"`)
  - `technologies`: ManyToManyField(`Technology`, `related_name="projects"`, blank)
  - `status`: CharField(50, choices=["Idea", "In Progress", "Completed", "Research", "Archived"], default="Completed", db_index=True)
  - `year`: IntegerField(db_index=True)
  - `featured`: BooleanField(default=False, db_index=True)
  - `published`: BooleanField(default=True, db_index=True)
  - `order`: PositiveIntegerField(default=0)
  - `thumbnail`: ImageField(upload_to="projects/thumbnails/", null/blank)
  - `problem`, `objective`, `approach`, `architecture`, `implementation`, `results`, `challenges`, `learnings`, `future_work`: TextField(blank)
- **Ordering**: `["order", "-year", "title"]`

#### `ProjectMedia` (`apps.projects.models.ProjectMedia`)
- **Purpose**: Images, videos, and architecture diagrams linked to a project.
- **Fields**:
  - `id`: UUID (PK)
  - `project`: ForeignKey(`Project`, `on_delete=CASCADE`, `related_name="media"`)
  - `type`: CharField(50, choices=["image", "video", "diagram"], default="image")
  - `file`: FileField(upload_to="projects/media/")
  - `title`, `alt_text`: CharField(255, blank)
  - `caption`: TextField(blank)
  - `order`: PositiveIntegerField(default=0)
  - `featured`: BooleanField(default=False)
- **Ordering**: `["order", "created_at"]`

#### `ProjectLink` (`apps.projects.models.ProjectLink`)
- **Purpose**: External links for projects (GitHub, live demo, paper, dataset, documentation).
- **Fields**:
  - `id`: UUID (PK)
  - `project`: ForeignKey(`Project`, `on_delete=CASCADE`, `related_name="links"`)
  - `type`: CharField(50, choices=["github", "demo", "paper", "dataset", "documentation", "other"])
  - `label`: CharField(100, blank)
  - `url`: URLField()

#### `ProjectRelationship` (`apps.projects.models.ProjectRelationship`)
- **Purpose**: Directed relationships between related projects.
- **Fields**:
  - `id`: UUID (PK)
  - `from_project`: ForeignKey(`Project`, `on_delete=CASCADE`, `related_name="source_relationships"`)
  - `to_project`: ForeignKey(`Project`, `on_delete=CASCADE`, `related_name="target_relationships"`)
  - `relationship_type`: CharField(50, default="related")
- **Uniqueness Constraint**: `unique_together = ("from_project", "to_project")`

---

### 3.4. Research App (`apps.research`)

#### `ResearchCategory` (`apps.research.models.ResearchCategory`)
- **Purpose**: Categorization of research topics.
- **Fields**:
  - `id`: UUID (PK)
  - `name`: CharField(100)
  - `slug`: SlugField(100) — **Unique**, Indexed (`db_index=True`)
  - `description`: TextField(blank)
- **Ordering**: `["name"]`

#### `Research` (`apps.research.models.Research`)
- **Purpose**: Research project details, abstracts, methodologies, and limitations.
- **Fields**:
  - `id`: UUID (PK)
  - `title`: CharField(255)
  - `slug`: SlugField(255) — **Unique**, Indexed (`db_index=True`)
  - `category`: ForeignKey(`ResearchCategory`, `on_delete=SET_NULL`, null/blank, `related_name="research_items"`)
  - `abstract`: TextField()
  - `motivation`, `research_question`, `methodology`, `limitations`, `future_work`: TextField(blank)
  - `year`: IntegerField(db_index=True)
  - `status`: CharField(50, choices=["researching", "in_progress", "completed", "published", "under_review", "archived"], default="in_progress", db_index=True)
  - `featured`: BooleanField(default=False, db_index=True)
  - `published`: BooleanField(default=True, db_index=True)
  - `order`: PositiveIntegerField(default=0)
  - `related_projects`: ManyToManyField("projects.Project", `related_name="related_research"`, blank)
- **Ordering**: `["order", "-year", "title"]`

#### `Dataset` (`apps.research.models.Dataset`)
- **Purpose**: Datasets used or published in research.
- **Fields**:
  - `id`: UUID (PK)
  - `research`: ForeignKey(`Research`, `on_delete=CASCADE`, `related_name="datasets"`, null/blank)
  - `name`: CharField(255)
  - `description`: TextField(blank)
  - `source`: CharField(255, blank)
  - `source_url`: URLField(blank)
  - `size`: CharField(50, blank)
  - `feature_count`: IntegerField(null/blank)
  - `format`: CharField(50, blank)

#### `Experiment` (`apps.research.models.Experiment`)
- **Purpose**: Experimental setups and model configuration parameters.
- **Fields**:
  - `id`: UUID (PK)
  - `research`: ForeignKey(`Research`, `on_delete=CASCADE`, `related_name="experiments"`)
  - `name`: CharField(255)
  - `model`: CharField(255)
  - `feature_count`: IntegerField(null/blank)
  - `parameters`: JSONField(default=dict, blank)
  - `notes`: TextField(blank)

#### `ExperimentResult` (`apps.research.models.ExperimentResult`)
- **Purpose**: Quantitative performance metrics recorded from experiments.
- **Fields**:
  - `id`: UUID (PK)
  - `experiment`: ForeignKey(`Experiment`, `on_delete=CASCADE`, `related_name="results"`)
  - `metric`: CharField(100)
  - `value`: CharField(100)
  - `unit`: CharField(50, blank)
  - `order`: PositiveIntegerField(default=0)
- **Ordering**: `["order", "metric"]`

#### `Publication` (`apps.research.models.Publication`)
- **Purpose**: Academic papers or conference publications associated with research.
- **Fields**:
  - `id`: UUID (PK)
  - `research`: ForeignKey(`Research`, `on_delete=CASCADE`, `related_name="publications"`)
  - `title`, `venue`: CharField(255)
  - `publication_date`: DateField(null/blank)
  - `doi`: CharField(100, blank)
  - `paper_url`: URLField(blank)
  - `status`: CharField(50, default="published")

---

### 3.5. Skills, Experience, Education, Achievements & Contact Apps

#### `Skill` (`apps.skills.models.Skill`)
- **Purpose**: Technical capability registry with technology relationships.
- **Fields**: `name`, `slug` (UQ, db_index), `category`, `description`, `icon`, `technologies` (M2M to `Technology`), `featured` (db_index), `order`, `active` (default=True).
- **Ordering**: `["order", "name"]`

#### `Experience` (`apps.experience.models.Experience`)
- **Purpose**: Work history and professional roles.
- **Fields**: `company`, `role`, `description`, `start_date`, `end_date` (null/blank), `current` (BooleanField), `order`.
- **Ordering**: `["order", "-start_date"]`

#### `Education` (`apps.education.models.Education`)
- **Purpose**: Academic credentials and degrees.
- **Fields**: `institution`, `degree`, `field`, `start`, `end` (null/blank), `description`, `grade`, `order`.
- **Ordering**: `["order", "-start"]`

#### `Achievement` (`apps.achievements.models.Achievement`)
- **Purpose**: Honors, awards, and recognitions.
- **Fields**: `title`, `description`, `category`, `date`, `link`, `image`, `order`, `featured` (db_index).
- **Ordering**: `["order", "-date"]`

#### `ContactMessage` (`apps.contact.models.ContactMessage`)
- **Purpose**: Messages submitted via the portfolio contact form.
- **Fields**: `name`, `email`, `message`, `status` (choices=["new", "read", "replied", "archived"], default="new", db_index).
- **Ordering**: `["-created_at"]`

---

## 4. Uniqueness Rules & Database Indexes

| Table | Field(s) | Type | Purpose |
|---|---|---|---|
| `core_sitesetting` | `key` | Unique, B-Tree Index | Fast lookup for global configuration values |
| `projects_projectcategory` | `slug` | Unique, B-Tree Index | Slug routing for project categories |
| `projects_technology` | `name`, `slug` | Unique, B-Tree Index | Deduplication and slug lookup for tech stacks |
| `projects_project` | `slug` | Unique, B-Tree Index | Canonical detail page routing (`/projects/[slug]`) |
| `projects_project` | `status`, `year`, `featured`, `published` | B-Tree Index | Optimized filtering in public list endpoints |
| `projects_projectrelationship` | `("from_project", "to_project")` | Unique Together | Prevents duplicate directional relationship links |
| `research_researchcategory` | `slug` | Unique, B-Tree Index | Category slug routing |
| `research_research` | `slug` | Unique, B-Tree Index | Canonical detail page routing (`/research/[slug]`) |
| `research_research` | `status`, `year`, `featured`, `published` | B-Tree Index | Optimized filtering for research querysets |
| `skills_skill` | `slug` | Unique, B-Tree Index | Fast lookup for skills |
| `skills_skill` | `featured` | B-Tree Index | Fast filtering for homepage featured skills |
| `achievements_achievement` | `featured` | B-Tree Index | Fast filtering for featured honors |
| `contact_contactmessage` | `status` | B-Tree Index | Admin filtering for unread messages |
