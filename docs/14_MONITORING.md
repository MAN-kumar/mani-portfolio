# 14. Monitoring

## 1. Implemented Monitoring Capabilities

The system currently uses platform-native logging and custom API health check endpoints for operational monitoring.

---

### 1.1. Backend System Health Endpoint
- **URL**: `GET /api/v1/health/`
- **Implementation Status**: **IMPLEMENTED**
- **File Location**: [backend/apps/core/views.py](file:///c:/Users/hp/Desktop/my_portfolio/backend/apps/core/views.py#L16-L32)
- **Behavior**: Returns an unauthenticated JSON status envelope confirming backend service availability:
  ```json
  {
    "status": "ok",
    "service": "mani-portfolio-backend",
    "version": "1.0.0"
  }
  ```
- **Use Case**: Used by external uptime checkers or health ping monitors to verify container readiness.

---

### 1.2. Render Service Logs & Metrics
- **Implementation Status**: **IMPLEMENTED**
- **Interface**: Render Dashboard -> `mani-portfolio-api` -> **Logs** / **Metrics**
- **Monitored Metrics**:
  - Gunicorn stdout/stderr request streams and tracebacks.
  - HTTP response status distribution (2xx, 4xx, 5xx).
  - CPU & Memory utilization metrics.
  - Deployment build output and static collection logs.

---

### 1.3. Vercel Deployment & Runtime Monitoring
- **Implementation Status**: **IMPLEMENTED**
- **Interface**: Vercel Dashboard -> `mani-portfolio1` -> **Deployments** / **Logs**
- **Monitored Metrics**:
  - Next.js build compilation outputs, bundle chunk sizes, and static page generation.
  - Serverless function invocation logs and execution timing.
  - Client-side build warning and error metrics.

---

### 1.4. Managed PostgreSQL Database Health
- **Implementation Status**: **IMPLEMENTED**
- **Interface**: Render Database Dashboard
- **Monitored Metrics**:
  - Connection pool allocation and active client counts.
  - Storage space utilization.
  - Database availability and instance uptime.

---

## 2. Optional Future Monitoring (Not Currently Implemented)

> [!NOTE]
> The following services are **NOT currently installed or active** in this codebase. They represent potential future enhancements if telemetry needs expand:

- **Sentry / APM Error Tracking**: Application Performance Monitoring for automatic exception capturing and alerting. (Status: **OPTIONAL FUTURE**)
- **Google Analytics / Plausible**: Client-side website traffic and user engagement analytics. (Status: **OPTIONAL FUTURE**)
- **UptimeRobot / Better Stack**: Automated external 60-second ping alerts against `/api/v1/health/`. (Status: **OPTIONAL FUTURE**)
- **Prometheus / Grafana**: Custom metric collection for database query timing. (Status: **OPTIONAL FUTURE**)
