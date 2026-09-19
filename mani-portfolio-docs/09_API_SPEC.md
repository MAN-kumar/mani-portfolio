# 09 — API SPECIFICATION

## API
REST API using Django REST Framework.

Base URL:
```text
/api/v1/
```

## Resources
- profile
- social-links
- projects
- categories
- technologies
- skills
- research
- datasets
- experiments
- publications
- experience
- education
- achievements
- resume
- contact
- search

## HTTP Methods
- GET
- POST
- PUT
- PATCH
- DELETE

## Standard Response
```json
{
  "data": {}
}
```

Collections:
```json
{
  "data": [],
  "meta": {}
}
```

## Projects
```text
GET /api/v1/projects/
GET /api/v1/projects/{slug}/
GET /api/v1/projects/featured/
```

Filters:
- category
- technology
- status
- year
- featured
- published

Search and sorting are supported.

## Technologies
```text
GET /api/v1/technologies/
GET /api/v1/technologies/{slug}/
GET /api/v1/technologies/{slug}/projects/
```

## Skills
Similar resource structure, including project/research relationships.

## Research
```text
GET /api/v1/research/
GET /api/v1/research/{slug}/
GET /api/v1/research/featured/
```

Research responses can include:
- datasets
- experiments
- publications

## Contact
```text
POST /api/v1/contact/
```

Must include:
- validation
- rate limiting
- spam protection

## Search
```text
GET /api/v1/search/?q=python
```

## Related
```text
GET /api/v1/projects/{slug}/related/
```

## Optional Home Aggregate
```text
GET /api/v1/home/
```

## Query Parameters
- search
- category
- technology
- status
- year
- featured
- published
- ordering
- page
- page_size

## Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request.",
    "fields": {}
  }
}
```

## Status Codes
- 200
- 201
- 204
- 400
- 401
- 403
- 404
- 409
- 429
- 500

## Security
- Public GET endpoints
- Authenticated admin writes
- Restricted CORS
- HTTPS
- Rate limiting

## Performance
Use:
- select_related
- prefetch_related
- pagination
- indexes
- caching where useful

## Frontend
API client lives under:
```text
lib/api/
```

## Principle
> **The database stores truth, the API exposes truth, and the frontend presents truth.**
