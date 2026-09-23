# 07. Component Catalog

## 1. Catalog Architecture Overview

The frontend UI is organized into structured, modular directories under `frontend/components/`:
- `ui/`: Foundation design system primitives (Buttons, Badges, Inputs, Tags).
- `layout/`: Layout shell containers (Navigation, Footer, Section, PageContainer).
- `motion/`: Framer Motion animation primitives (FadeIn, Reveal, Stagger, Magnetic).
- `3d/`: Three.js / React Three Fiber interactive scenes and WebGL canvas fallbacks.
- `feedback/`: State handling wrappers (LoadingState, ErrorState, EmptyState).
- `home/`: Specialized home page section modules.
- `projects/` & `research/`: Domain cards, grids, containers, and detail views.
- `contact/`: Contact forms and metadata displays.
- `journey/`: Interactive timeline components.

---

## 2. Design System Primitives (`components/ui/`)

### 2.1. `Button` (`components/ui/Button.tsx`)
- **Purpose**: Primary interactive button component supporting variants and loading states.
- **Client/Server**: Client Component (`"use client"`)
- **Props**:
  - `variant`: `"primary" | "secondary" | "outline" | "ghost"` (default: `"primary"`)
  - `size`: `"sm" | "md" | "lg"` (default: `"md"`)
  - `isLoading`: `boolean`
  - `disabled`: `boolean`
  - `children`: `React.ReactNode`
  - Standard HTML button attributes
- **Dependencies**: Lucide React icons, Vanilla CSS button classes.
- **Usage**:
```tsx
<Button variant="primary" size="md" isLoading={submitting} onClick={handleSubmit}>
  Send Message
</Button>
```
- **Accessibility**: Includes `disabled={disabled || isLoading}`, proper ARIA focus ring indicators, and keyboard focus states.

### 2.2. `Badge` (`components/ui/Badge.tsx`)
- **Purpose**: Status pill tag for categorizing items, featuring status color variants.
- **Client/Server**: Server / Client Component
- **Props**:
  - `variant`: `"default" | "success" | "warning" | "error" | "accent"`
  - `children`: `React.ReactNode`
- **Accessibility**: High contrast contrast-tested text colors.

### 2.3. `TechnologyTag` (`components/ui/TechnologyTag.tsx`)
- **Purpose**: Displays a technology icon and label tag.
- **Client/Server**: Server Component
- **Props**:
  - `name`: `string`
  - `icon`: `string` (optional)
  - `size`: `"sm" | "md"`

### 2.4. `SectionHeading` (`components/ui/SectionHeading.tsx`)
- **Purpose**: Standardized section title with eyebrow tag line and title `<h2>`.
- **Client/Server**: Server Component
- **Props**:
  - `eyebrow`: `string` (optional)
  - `title`: `string`
  - `description`: `string` (optional)
  - `align`: `"left" | "center"`

---

## 3. Layout Components (`components/layout/`)

### 3.1. `Navigation` (`components/layout/Navigation.tsx`)
- **Purpose**: Top sticky navigation header with mobile drawer toggle and link highlights.
- **Client/Server**: Client Component (`"use client"`)
- **Props**: None
- **Dependencies**: Next.js `usePathname`, Lucide icons, Framer Motion.
- **Accessibility**: Semantic `<header>` and `<nav>`, keyboard nav drawer toggle with `aria-expanded` and `aria-label`.

### 3.2. `Footer` (`components/layout/Footer.tsx`)
- **Purpose**: Footer container with social links, copyright info, and API status indicator.
- **Client/Server**: Client Component (`"use client"`)

### 3.3. `PageContainer` (`components/layout/PageContainer.tsx`)
- **Purpose**: Consistent max-width page shell wrapper with responsive padding.
- **Client/Server**: Server Component

---

## 4. Animation Primitives (`components/motion/`)

### 4.1. `FadeUp` (`components/motion/FadeUp.tsx`)
- **Purpose**: Smoothly animates children upward with opacity fade on scroll into view.
- **Client/Server**: Client Component (`"use client"`)
- **Props**:
  - `delay`: `number` (seconds, default: 0)
  - `duration`: `number` (default: 0.5)
  - `children`: `React.ReactNode`
- **Dependencies**: `framer-motion`
- **Accessibility**: Automatically respects reduced motion settings via `useReducedMotion()`.

### 4.2. `Magnetic` (`components/motion/Magnetic.tsx`)
- **Purpose**: Magnetic mouse cursor pull effect for primary interactive elements.
- **Client/Server**: Client Component (`"use client"`)

---

## 5. 3D Graphics & Canvas (`components/3d/`)

### 5.1. `DynamicHeroSceneWrapper` (`components/3d/DynamicHeroSceneWrapper.tsx`)
- **Purpose**: Dynamically imports WebGL Canvas component with `ssr: false` to prevent server-side hydration mismatches.
- **Client/Server**: Client Component (`"use client"`)
- **Fallback**: Displays `SceneFallback` CSS grid when WebGL is unsupported or reduced motion is active.

### 5.2. `ContentGraph` (`components/3d/ContentGraph.tsx`)
- **Purpose**: Interactive 3D force-directed knowledge graph displaying relationships between projects, research, and skills.
- **Client/Server**: Client Component (`"use client"`)
- **Dependencies**: `@react-three/fiber`, `@react-three/drei`, `three`

---

## 6. Feedback & State Display Components (`components/feedback/`)

### 6.1. `LoadingState` (`components/feedback/LoadingState.tsx`)
- **Purpose**: Accessible loading skeleton or spinner display during async data fetching.
- **Accessibility**: Includes `role="status"` and visually hidden `aria-live="polite"` loading label.

### 6.2. `ErrorState` (`components/feedback/ErrorState.tsx`)
- **Purpose**: Error message container with retry action button.
- **Props**:
  - `title`: `string`
  - `message`: `string`
  - `onRetry`: `() => void` (optional)

### 6.3. `EmptyState` (`components/feedback/EmptyState.tsx`)
- **Purpose**: Display when search results or API querysets yield no items.

---

## 7. Domain Specific Components

### 7.1. `ProjectCard` (`components/projects/ProjectCard.tsx`)
- **Purpose**: Feature summary card for projects with image preview, tags, and detail link.
- **Props**: `project: Project`

### 7.2. `ProjectDetailView` (`components/projects/ProjectDetailView.tsx`)
- **Purpose**: Full-page layout for displaying deep project specifications (problem, approach, architecture, results).

### 7.3. `ResearchCard` (`components/research/ResearchCard.tsx`)
- **Purpose**: Academic research paper summary card with citation info and metrics.

### 7.4. `Timeline` (`components/journey/Timeline.tsx`)
- **Purpose**: Chronological timeline displaying career milestones and linked project references.

### 7.5. `ContactForm` (`components/contact/ContactForm.tsx`)
- **Purpose**: Interactive message form with client-side validation, anti-spam honeypot, and state feedback.
