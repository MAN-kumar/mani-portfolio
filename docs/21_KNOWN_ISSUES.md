# 21. Known Issues and Limitations

## 1. System Status Summary

> [!NOTE]
> There are **NO CRITICAL OR BLOCKING ISSUES** in the portfolio system. All core features (Projects, Research, Skills, Experience, Education, Achievements, 3D Hero Scene, Search, Contact Form, API Endpoints, Django Admin, Vercel Frontend, and Render Backend) have passed automated testing and manual launch verification.

---

## 2. Active Technical Limitations & Constraints

### 2.1. Provider Limitations (Render Free Instance Cold Starts)
- **Symptom**: Initial HTTP API requests to `https://mani-portfolio-api.onrender.com/api/v1/` after 15+ minutes of inactivity may experience a 30-50 second delay while Render spins up the free container instance.
- **Mitigation / Fallback**: The frontend is resilient against cold start delays. If an API request times out or takes longer than expected, the frontend uses cached or embedded fallback data to maintain uninterrupted UI display.

### 2.2. WebGL Hardware Acceleration Variations
- **Symptom**: On low-end mobile hardware or legacy browser engines lacking WebGL hardware acceleration, 3D Canvas rendering may fail to initialize.
- **Mitigation / Fallback**: `DynamicHeroSceneWrapper` catches WebGL initialization failures and gracefully displays the 2D CSS grid background (`SceneFallback.tsx`).

### 2.3. Ephemeral Media Storage on Free Host Tier
- **Symptom**: Files uploaded directly to `backend/media/` via Django Admin on Render are saved to local container disk storage, which is reset whenever Render restarts or redeploys free instances.
- **Mitigation / Strategy**: Primary image and thumbnail URLs are managed via seeded static asset references or external image host links until an S3 bucket storage provider is attached.

---

## 3. Optional Future Enhancements

- **Object Storage Integration**: Attaching AWS S3 or Cloudflare R2 for persistent user-uploaded image and PDF file storage (`django-storages`).
- **External Uptime Ping Service**: Configuring a free ping service (e.g. UptimeRobot) against `https://mani-portfolio-api.onrender.com/api/v1/health/` every 10 minutes to prevent container cold starts.
- **Analytics Integration**: Adding privacy-focused client-side analytics (Plausible or Cloudflare Web Analytics).
