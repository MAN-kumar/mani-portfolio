# 16. Error Handling

## 1. System Error Handling Architecture

Error handling is implemented across both tiers to ensure graceful degradation:
- **Backend (Django REST Framework)**: `custom_exception_handler` translates standard Python/Django exceptions into machine-readable JSON envelopes.
- **Frontend (Next.js)**: API client catch blocks (`frontend/lib/api/index.ts`), Next.js `not-found.tsx` boundaries, React Error Boundaries, and `<ErrorState>` UI components.

---

## 2. Backend Exception Handling (`apps.core.exceptions`)

All backend API errors return structured HTTP error status codes and wrapped error payloads formatted by `custom_exception_handler`:

### Envelope Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR | NOT_FOUND | PERMISSION_DENIED | AUTHENTICATION_FAILED | HTTP_ERROR",
    "message": "Human readable summary description.",
    "fields": {
      "field_name": ["Field-specific error details."]
    }
  }
}
```

### Exception Class Mapping

| Python Exception Class | HTTP Status | Error Code | Example Cause |
|---|---|---|---|
| `rest_framework.exceptions.ValidationError` | `400 Bad Request` | `VALIDATION_ERROR` | Missing required payload field or invalid format |
| `django.http.Http404` / `rest_framework.exceptions.NotFound` | `404 Not Found` | `NOT_FOUND` | Invalid project or research slug requested |
| `PermissionDenied` / `NotAuthenticated` | `403 Forbidden` / `401 Unauthorized` | `PERMISSION_DENIED` | Anonymous client attempting POST/PUT/DELETE |
| `AuthenticationFailed` | `401 Unauthorized` | `AUTHENTICATION_FAILED` | Invalid credentials provided |
| Generic unhandled exceptions | `500 Internal Error` | `HTTP_ERROR` | Uncaught server runtime error |

---

## 3. Frontend Error & Fallback Behavior

### 3.1. API Fetching Fallback Strategy (`frontend/lib/api/index.ts`)
- The API client wraps network calls in `try...catch` blocks.
- **Valid API Responses**: Any HTTP 200 response (including empty arrays `[]`) is passed directly to components as the valid server response.
- **Network / HTTP 5xx Failures**: If an API call fails or throws an exception, the client cleanly falls back to embedded static fallback datasets (`frontend/content/`) to ensure page rendering never crashes.

### 3.2. Route Level 404 Handling (`not-found.tsx`)
- Invalid routes trigger Next.js App Router `not-found.tsx` handlers.
- Detail page routes (`/projects/[slug]` and `/research/[slug]`) call `notFound()` if neither the API nor static fallback contains a record matching the requested slug.

### 3.3. React Error Boundaries & UI Feedback
- Failed component loads render `<ErrorState title="..." message="..." onRetry={...} />`.
- `<LoadingState />` skeletons automatically clear upon receiving either API data or fallback data.

---

## 4. Production Error Handling Rules

1. **Stack Trace Masking**: When `DEBUG=False` in production, Django masks detailed internal tracebacks and returns generic error messages to clients.
2. **Safe Input Sanitization**: Form inputs (such as contact submissions) reject dangerous characters and enforce length boundaries before processing.
3. **Graceful WebGL Degradation**: If WebGL canvas creation fails or falls back due to hardware acceleration limits, `DynamicHeroSceneWrapper` displays the static 2D CSS grid (`SceneFallback.tsx`).
