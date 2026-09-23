# 03 — FRONTEND GUIDE

## Technology Stack
* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript 5 (Strict Mode)
* **UI Library**: React 19
* **Styling**: Vanilla CSS with Tailwind CSS utilities (`@tailwindcss/postcss`)
* **Motion & Animation**: Framer Motion 13
* **3D Visualizations**: Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
* **Icons**: Lucide React (`lucide-react`)

---

## App Router Architecture & Directory Layout

The frontend application uses Next.js 16 App Router. All routes are located in `frontend/app/`.

```text
frontend/app/
├── layout.tsx              # Root Layout wrapping all pages with Navigation and Footer
├── page.tsx                # Homepage (/)
├── about/page.tsx          # About page (/about)
├── projects/
│   ├── page.tsx            # Projects listing page (/projects)
│   └── [slug]/page.tsx     # Dynamic project detail page (/projects/[slug])
├── research/
│   ├── page.tsx            # Research directory page (/research)
│   └── [slug]/page.tsx     # Dynamic research detail page (/research/[slug])
├── journey/page.tsx        # Journey timeline page (/journey)
├── resume/page.tsx         # Resume view & download page (/resume)
├── contact/page.tsx        # Contact page (/contact)
└── not-found.tsx           # Custom 404 page
```

---

## Server vs. Client Component Strategy

To optimize load speed and bundle size, components are split between Server Components and Client Components:

1. **Server Components (Default)**:
   - All `page.tsx` routes and layout wrappers (`PageContainer`, `Section`, `RootLayout`).
   - Responsible for data fetching at build time or revalidation time.
   - Example: `frontend/app/projects/page.tsx` fetches project list on the server and passes `initialProjects` down to client components.

2. **Client Components (`"use client"`)**:
   - Interactive UI elements requiring React state, event listeners, animation hooks, or WebGL contexts.
   - Examples:
     - `HeroScene.tsx` & `ContentGraph.tsx` (Three.js WebGL canvas)
     - `ProjectsContainer.tsx` (Interactive search and category filtering)
     - `ContactForm.tsx` (Form state management and validation)
     - `Navigation.tsx` (Mobile menu toggle and scroll state)
     - Motion wrappers (`FadeIn`, `Magnetic`, `Parallax`, `Reveal`, `ScaleIn`, `Stagger`)

---

## Data Access & Fallback Architecture

Data fetching follows a strict 3-tier boundary:

```text
Page Component (app/projects/page.tsx)
   │
   ▼
Unified Data Access Layer (lib/data/index.ts)
   │
   ▼
API Integration Layer (lib/api/index.ts)
   │
   ▼
HTTP Client Utility (lib/api/client.ts) -> fetchApi<T>()
```

### Fallback Behavior Rules
1. **API Success**: `fetchApi()` queries `NEXT_PUBLIC_API_URL` (`https://mani-portfolio-api.onrender.com/api/v1/`). If the server returns valid JSON data (including an empty list `[]`), that data is returned directly.
2. **Network/Server Error**: If the API call fails or throws a network exception, `lib/api/index.ts` catches the error, logs a warning, and returns static fallback data from `frontend/content/`.
3. **404 Not Found**: For dynamic slug lookups (`getProjectBySlug`), an HTTP 404 response returns `undefined`, triggering Next.js `notFound()`.

---

## 3D Graphics & Reduced Motion Fallbacks

* **WebGL Detection**: 3D Canvas elements in `components/3d/` check for WebGL support. If WebGL initialization fails or is unsupported, `SceneFallback.tsx` gracefully renders a static CSS gradient mesh.
* **Reduced Motion**: All Framer Motion animation components read the user's OS accessibility preference via `useReducedMotion()`. If reduced motion is requested, entrance transitions and hover transformations are automatically disabled.

---

## Environment Variable Usage

```env
NEXT_PUBLIC_API_URL=https://mani-portfolio-api.onrender.com/api/v1
NEXT_PUBLIC_SITE_URL=https://mani-portfolio1.vercel.app
```
`NEXT_PUBLIC_API_URL` is parsed by `lib/api/client.ts` to construct API endpoints.
