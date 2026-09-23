# 06. API Reference

## 1. Overview

The backend exposes a RESTful API versioned under `/api/v1/`.

### Key Specifications
- **Base URL**: `https://mani-portfolio-api.onrender.com/api/v1/` (Production) | `http://127.0.0.1:8000/api/v1/` (Development)
- **Response Format**: JSON wrapped in a standard envelope (`apps.core.renderers.StandardJSONRenderer`).
- **Authentication**: Session Authentication (`rest_framework.authentication.SessionAuthentication`).
- **Permissions**: Read-only access (`GET`, `HEAD`, `OPTIONS`) is allowed for anonymous users. Write operations (`POST`, `PUT`, `PATCH`, `DELETE`) require Django staff authentication (`IsAdminUserOrReadOnly`).
- **Pagination**: Default page size is 10 (`PortfolioPagination`). Paginated responses include `count`, `next`, `previous`, and `results` within the envelope `data` attribute.
- **Throttling**: Anonymous users: 100 requests/minute (`anon`). Authenticated staff: 1000 requests/minute (`user`).

---

## 2. Standard Envelope & Error Protocols

### 2.1. Success Envelope Format
```json
{
  "status": "success",
  "message": "Operation completed successfully.",
  "data": { ... }
}
```

### 2.2. Error Envelope Format
```json
{
  "status": "error",
  "message": "Validation error or request failed.",
  "errors": {
    "field_name": ["Specific error description."]
  }
}
```

### 2.3. Common HTTP Status Codes
| Code | Meaning | Cause / Description |
|---|---|---|
| `200 OK` | Request succeeded | Standard response for GET, PUT, PATCH, DELETE |
| `201 Created` | Resource created | Returned on successful POST creation |
| `400 Bad Request` | Validation failure | Invalid parameters or malformed payload |
| `401 Unauthorized` | Unauthenticated | Modifying data without Django session login |
| `403 Forbidden` | Permission denied | Non-staff user attempting write operation |
| `404 Not Found` | Resource missing | Invalid ID or slug provided |
| `429 Too Many Requests` | Throttled | Rate limit exceeded |
| `500 Internal Error` | Server failure | Unhandled backend exception |

---

## 3. Endpoints

### 3.1. System & Utility Endpoints

#### `GET /api/v1/health/`
- **Purpose**: Health check endpoint returning machine-readable status.
- **Auth**: None (Public)
- **Response**:
```json
{
  "status": "ok",
  "service": "mani-portfolio-backend",
  "version": "1.0.0"
}
```

#### `GET /api/v1/search/`
- **Purpose**: Global search across projects, research, skills, and experience.
- **Auth**: None (Public)
- **Query Parameters**:
  - `q` (string, required): Search query string
- **Response Example**:
```json
{
  "status": "success",
  "message": "Global search executed.",
  "data": {
    "query": "learning",
    "results": {
      "projects": [...],
      "research": [...],
      "skills": [...],
      "experience": [...]
    }
  }
}
```

#### `GET /api/v1/home/`
- **Purpose**: Aggregated payload for initial home page hydration.
- **Auth**: None (Public)
- **Response Structure**:
```json
{
  "status": "success",
  "message": "Home data retrieved.",
  "data": {
    "profile": { ... },
    "featured_projects": [...],
    "featured_research": [...],
    "featured_skills": [...]
  }
}
```

---

### 3.2. Profile & Contact Endpoints

#### `GET /api/v1/profile/` | `POST /api/v1/profile/`
- **Purpose**: Retrieve or update top-level developer profile.
- **Auth**: Public GET | Staff-only POST/PUT/PATCH/DELETE
- **Response Attributes**: `id`, `name`, `headline`, `short_bio`, `long_bio`, `current_focus`, `location`, `email`, `social_links`.

#### `GET /api/v1/social-links/`
- **Purpose**: List active social links (GitHub, LinkedIn, etc.).
- **Query Params**: `platform`, `active`
- **Ordering**: `order`, `created_at`

#### `GET /api/v1/resume/`
- **Purpose**: Retrieve active resume PDF download metadata.
- **Query Params**: `active`

---

### 3.3. Projects Endpoints

#### `GET /api/v1/projects/`
- **Purpose**: Paginated list of portfolio projects.
- **Auth**: Public GET (returns published projects only for anonymous users)
- **Query Parameters**:
  - `category` or `category__slug`: Filter by category slug
  - `technology` or `technologies__slug`: Filter by technology slug
  - `status`: `Idea`, `In Progress`, `Completed`, `Research`, `Archived`
  - `year`: Integer filter
  - `featured`: `true` / `false`
  - `search`: Full-text search across `title`, `short_description`, `description`, `problem`, `approach`, `results`
  - `ordering`: Ordering field (`order`, `year`, `title`, `created_at`)

#### `GET /api/v1/projects/featured/`
- **Purpose**: Custom action returning only featured published projects.

#### `GET /api/v1/projects/{slug}/`
- **Purpose**: Retrieve complete details of a single project by slug. Returns detailed sections (`problem`, `objective`, `approach`, `architecture`, `implementation`, `results`, `challenges`, `learnings`, `future_work`), media, links, and related projects.

#### `GET /api/v1/projects/{slug}/related/`
- **Purpose**: Retrieve related projects defined via `ProjectRelationship`.

#### `GET /api/v1/categories/`
- **Purpose**: List project categories.
- **Lookup Field**: `slug`

#### `GET /api/v1/technologies/`
- **Purpose**: List technology tags.
- **Custom Action**: `GET /api/v1/technologies/{slug}/projects/` — returns all projects associated with a given technology.

#### `GET /api/v1/project-media/` | `GET /api/v1/project-links/`
- **Purpose**: List standalone media files and link items attached to projects.

---

### 3.4. Research Endpoints

#### `GET /api/v1/research/`
- **Purpose**: List research projects.
- **Query Parameters**: `category`, `status`, `year`, `featured`, `published`, `search`
- **Lookup Field**: `slug`

#### `GET /api/v1/research/featured/`
- **Purpose**: Custom action returning featured research items.

#### `GET /api/v1/research/{slug}/`
- **Purpose**: Detailed view of a research project including datasets, experiments with results, publications, and linked projects.

#### `GET /api/v1/research-categories/`
- **Purpose**: Categorization for research domain items.

#### `GET /api/v1/datasets/` | `GET /api/v1/experiments/` | `GET /api/v1/publications/`
- **Purpose**: Sub-entities attached to research projects. `experiments` prefetch nested `results`.

---

### 3.5. Skills, Experience, Education & Achievements

#### `GET /api/v1/skills/`
- **Purpose**: Technical skill catalog.
- **Query Parameters**: `category`, `featured`, `active`, `search`

#### `GET /api/v1/experience/`
- **Purpose**: Work history and professional roles.
- **Query Parameters**: `current`, `search`

#### `GET /api/v1/education/`
- **Purpose**: Educational credentials and degrees.
- **Query Parameters**: `search`

#### `GET /api/v1/achievements/`
- **Purpose**: Honors, awards, and certifications.
- **Query Parameters**: `category`, `featured`, `search`

---

## 4. Example Request & Response

### Request
```http
GET /api/v1/projects/?featured=true HTTP/1.1
Host: mani-portfolio-api.onrender.com
Accept: application/json
```

### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "success",
  "message": "Operation completed successfully.",
  "data": {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": "c1f7b880-9289-4b68-963d-4c382101e4a1",
        "title": "Real-Time Multi-Camera Edge Vision Pipeline",
        "slug": "realtime-edge-vision",
        "short_description": "High-throughput edge computing vision system supporting concurrent inference across 4 streaming inputs.",
        "category": {
          "id": "e441fdfa-45a8-4228-a53d-24e5b9d31102",
          "name": "Machine Learning Systems",
          "slug": "ml-systems"
        },
        "technologies": [
          {
            "id": "a901f4c7-1234-4567-8901-abcdef123456",
            "name": "PyTorch",
            "slug": "pytorch"
          }
        ],
        "status": "Completed",
        "year": 2025,
        "featured": true,
        "published": true,
        "thumbnail": null
      }
    ]
  }
}
```
