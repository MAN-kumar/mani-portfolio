# 19 — FRONTEND DESIGN SYSTEM

> **Single Source of Truth for the Visual Architecture & UI Design System**  
> *Mani — Engineering Portfolio Platform*

---

## 1. Design Philosophy

The visual identity of the **Mani — Engineering Portfolio Platform** is built around a single core concept:  
**"An Interactive Digital Workspace & High-Precision Engineering Laboratory."**

It is designed to feel like an advanced developer console, an interactive research dashboard, and a digital laboratory—**NOT** a generic developer template.

### Core Principles
1. **Utility & Precision First**: Every visual element serves functional clarity, structural hierarchy, or interaction feedback. No gratuitous decorative bloat.
2. **Dark-First Architecture**: Deep obsidian and carbon backgrounds layer with translucent glass surfaces to create tangible depth and visual focus.
3. **Dynamic Chromatic Spectrum**: A real-time theme engine dynamically shifts primary accents across CSS custom properties (`--accent-primary`, `--accent-glow`), updating buttons, 3D WebGL light sources, cursor rings, borders, and interactive highlights synchronously.
4. **Tactile Micro-Physics**: Motion uses natural spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`), magnetic cursor pulling, and smooth staggers to provide tactile feedback.
5. **Modern Hybrid Aesthetics**: Combines:
   - **Haikei**: Generative organic background vectors, smooth multi-layered mesh gradients, and subtle vector curves.
   - **Manus**: Ultra-clean SaaS product surfaces, generous spatial rhythm, refined 1px translucent glass borders, and tactical typography.
   - **Motion Primitives**: Polished reactive hover micro-interactions and smooth scroll-driven entrance reveals.

---

## 2. Dark-First Visual Language

The design system uses a 4-tier elevation model to establish structural depth:

```text
┌─────────────────────────────────────────────────────────────────┐
│ Layer 3: Elevated Floating Modal / Command Palette              │
│ (--surface-elevated: rgba(26, 35, 54, 0.85) + 1px border)       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Layer 2: Surface / Card Base                              │  │
│  │ (--surface: rgba(18, 24, 38, 0.70) + backdrop-filter)     │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Layer 1: Secondary Shell / Container                │  │  │
│  │  │ (--background-secondary: #0d111a)                   │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │ Layer 0: Deep Canvas Base Void               │  │  │  │
│  │  │  │ (--background: #07090e)                      │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

- **Layer 0 (Canvas Base)**: `--background` (`#07090e`) — Deep void canvas.
- **Layer 1 (Secondary Structure)**: `--background-secondary` (`#0d111a`) — Section containers, nav header shells, footer boundaries.
- **Layer 2 (Surface / Card Base)**: `--surface` (`rgba(18, 24, 38, 0.70)`) — Translucent cards with `backdrop-filter: blur(16px)`.
- **Layer 3 (Elevated / Modal)**: `--surface-elevated` (`rgba(26, 35, 54, 0.85)`) — Floating command palette, active dropdowns, popovers.

### Contrast Standards
- Body copy on cards: Minimum **WCAG AA** contrast ratio (>= 4.5:1).
- Headings & Primary Buttons: Minimum **WCAG AAA** contrast ratio (>= 7.0:1).

---

## 3. Color Tokens

The visual foundation is expressed through semantic CSS variables:

```css
:root {
  /* Surface Elevation Hierarchy */
  --background: #07090e;
  --background-secondary: #0d111a;
  --surface: rgba(18, 24, 38, 0.70);
  --surface-elevated: rgba(26, 35, 54, 0.85);
  --surface-hover: rgba(34, 46, 70, 0.90);

  /* Typography Colors */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Border Tokens */
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.20);

  /* Active Theme Variables (Default: Indigo) */
  --accent-primary: #6366f1;
  --accent-secondary: #818cf8;
  --accent-soft: rgba(99, 102, 241, 0.15);
  --accent-glow: rgba(99, 102, 241, 0.35);

  /* Functional Status Tokens */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

---

## 4. Dynamic Accent Color System & 5. Theme System

Changing the active theme updates `--accent-primary`, `--accent-secondary`, `--accent-soft`, and `--accent-glow` across the application in real time.

### Available Color Themes
| Theme Name | `--accent-primary` | `--accent-secondary` | `--accent-soft` | `--accent-glow` | WebGL Light Color |
|---|---|---|---|---|---|
| **Indigo** (Default) | `#6366f1` | `#818cf8` | `rgba(99, 102, 241, 0.15)` | `rgba(99, 102, 241, 0.35)` | `#6366f1` |
| **Electric Blue** | `#3b82f6` | `#60a5fa` | `rgba(59, 130, 246, 0.15)` | `rgba(59, 130, 246, 0.35)` | `#3b82f6` |
| **Cyan** | `#06b6d4` | `#22d3ee` | `rgba(6, 182, 212, 0.15)` | `rgba(6, 182, 212, 0.35)` | `#06b6d4` |
| **Emerald** | `#10b981` | `#34d399` | `rgba(16, 185, 129, 0.15)` | `rgba(16, 185, 129, 0.35)` | `#10b981` |
| **Violet** | `#8b5cf6` | `#a78bfa` | `rgba(139, 92, 246, 0.15)` | `rgba(139, 92, 246, 0.35)` | `#8b5cf6` |
| **Amber** | `#f59e0b` | `#fbbf24` | `rgba(245, 158, 11, 0.15)` | `rgba(245, 158, 11, 0.35)` | `#f59e0b` |

### Elements Affected Synchronously by Theme Switch:
1. **Buttons**: Primary background gradient, outline border hover color.
2. **Links**: Accent hover underline and text color shift.
3. **Borders**: Active input focus rings, card hover glowing edges.
4. **Glows**: Box shadows, radial mouse spotlight centers, blurred background halos.
5. **Gradients**: Linear text heading gradients, hero badge accents.
6. **Badges**: Category status indicator background tint and text color.
7. **Navigation**: Active link underline indicator pill, logo gradient accent.
8. **Cards**: Active card top highlight line and hover ring.
9. **Hero Section**: Headline gradient shift, background glow halo.
10. **Custom Cursor**: Outer ring border color and inner trailing dot fill.
11. **3D Scene Accents**: Three.js point light color, particle node glowing material.
12. **Timeline**: Active node ring glow, vertical scroll progress line color.
13. **Interactive Components**: Command palette item selection highlight, form focus ring.

---

## 6. Typography, 7. Font Sizes, 8. Font Weights, 9. Line Heights

- **Primary Display & Body Font**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
- **Code & Technical Data Font**: `JetBrains Mono`, `Fira Code`, `Consolas`, `monospace`.

### Typography Scale Table
| Token / Class | Size | Line Height | Weight | Application Site |
|---|---|---|---|---|
| `display-2xl` | `4.5rem` (72px) | `1.05` | 800 (Bold) | Hero main headline |
| `display-xl` | `3.75rem` (60px) | `1.1` | 700 (Bold) | Section lead titles |
| `display-lg` | `3.0rem` (48px) | `1.15` | 700 (Bold) | Page header titles (`/projects`, `/research`) |
| `heading-1` | `2.25rem` (36px) | `1.2` | 600 (SemiBold) | `<h2>` Section headings |
| `heading-2` | `1.75rem` (28px) | `1.25` | 600 (SemiBold) | `<h3>` Card headings, subsection titles |
| `heading-3` | `1.25rem` (20px) | `1.3` | 600 (SemiBold) | `<h4>` Feature & metric titles |
| `body-lg` | `1.125rem` (18px) | `1.6` | 400 / 500 | Hero subtext, lead intro paragraphs |
| `body-md` | `1.0rem` (16px) | `1.5` | 400 (Regular) | Primary text content, card description |
| `body-sm` | `0.875rem` (14px) | `1.5` | 400 / 500 | Secondary metadata, dates, footers |
| `caption` | `0.75rem` (12px) | `1.4` | 500 (Medium) | Badges, technology tags, metric labels |
| `code-md` | `0.875rem` (14px) | `1.5` | 400 (Regular) | Inline code, technical specifications |

---

## 10. Spacing Scale, 11. Border Radius, 12. Border System

### 8-Point Multiplier Spacing Scale
- `space-1`: `0.25rem` (4px)
- `space-2`: `0.5rem` (8px)
- `space-3`: `0.75rem` (12px)
- `space-4`: `1.0rem` (16px)
- `space-6`: `1.5rem` (24px)
- `space-8`: `2.0rem` (32px)
- `space-12`: `3.0rem` (48px)
- `space-16`: `4.0rem` (64px)
- `space-24`: `6.0rem` (96px)
- `space-32`: `8.0rem` (128px)

### Border Radius Hierarchy
- `radius-sm`: `0.375rem` (6px) — Badges, technology tags, inline code blocks.
- `radius-md`: `0.5rem` (8px) — Buttons, form inputs, dropdown items.
- `radius-lg`: `0.75rem` (12px) — Standard project cards, research cards, container boxes.
- `radius-xl`: `1.25rem` (20px) — Hero feature cards, modal dialogs.
- `radius-full`: `9999px` — Avatars, status pills, circular icon action buttons.

### Border Rules
- **Standard Border**: `1px solid var(--border)` (`rgba(255, 255, 255, 0.08)`).
- **Hover Border**: `1px solid var(--border-hover)` (`rgba(255, 255, 255, 0.20)`).
- **Active Focus Border**: `1px solid var(--accent-primary)`.
- **Glow Border**: `1px solid var(--accent-glow)`.

---

## 13. Shadows, 14. Glow System, 15. Glass / Translucent Surfaces

### Shadow Scale
- `shadow-sm`: `0 2px 4px rgba(0, 0, 0, 0.4)`
- `shadow-md`: `0 4px 12px rgba(0, 0, 0, 0.6)`
- `shadow-lg`: `0 12px 32px rgba(0, 0, 0, 0.8)`
- `shadow-glass`: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`

### Glow System Tokens
- `glow-sm`: `0 0 15px var(--accent-glow)`
- `glow-md`: `0 0 30px var(--accent-glow)`
- `glow-lg`: `0 0 60px var(--accent-glow)`

### Glass Surface Specifications
```css
/* Standard Translucent Glass Card */
.glass-card {
  background: rgba(18, 24, 38, 0.70);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Elevated Translucent Glass Modal / Floating Container */
.glass-elevated {
  background: rgba(26, 35, 54, 0.85);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

---

## 16. Gradients, 17. Background System, 18. Haikei-Style Generative Shapes, 19. Noise / Grain

- **Text Headline Gradient**: `linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%)`
- **Surface Shimmer**: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)`
- **Haikei Generative Vectors**:
  - Smooth organic vector wave blobs layered into section backgrounds with low opacity (`opacity: 0.10 - 0.15`).
  - Low-poly mesh SVGs positioned behind main section headers.
- **Noise / Grain Overlay**:
  - Fixed pseudo-element overlaying the page: `opacity: 0.025`, `pointer-events: none`, `mix-blend-mode: overlay` using SVG fractal noise filter.

---

## 20. Grid System, 21. Spotlight Effects, 22. Cursor System

- **Layout Grid**: 12-column responsive fluid grid (`gap: 24px` desktop, `gap: 16px` mobile). Max content width: `1280px` (`max-w-7xl`).
- **Card Mouse Spotlight**:
  - Cards track mouse coordinates (`--mouse-x`, `--mouse-y`) to render a radial spotlight fill:
    `background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--accent-soft), transparent 40%)`.
- **Interactive Cursor System**:
  - Outer pointer ring (`32px` diameter, `border: 1px solid var(--accent-primary)`).
  - Inner trailing dot (`6px` solid fill, `background: var(--accent-primary)`).
  - Interactive expand mode: ring expands to `48px` with `background: var(--accent-soft)` when hovering buttons or links.

---

## 23. Navigation, 24. Hero Section, 25. Buttons

- **Navigation (`components/layout/Navigation.tsx`)**:
  - Top sticky header, glass backdrop blur (`16px`).
  - Active route tab pill animated via Framer Motion `layoutId="active-nav-pill"`.
  - Theme picker dropdown button + mobile nav drawer toggle.
- **Hero Section (`components/home/Hero.tsx`)**:
  - Left column: Status indicator badge ("Available for Software Roles & ML Engineering"), High-impact headline, bio lead, CTA buttons.
  - Right column: Interactive 3D Canvas (`DynamicHeroSceneWrapper`) with fallback CSS gradient mesh.
- **Buttons (`components/ui/Button.tsx`)**:
  - `Primary`: `background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: #ffffff; box-shadow: 0 4px 14px var(--accent-glow);`
  - `Secondary`: `background: var(--surface-elevated); color: var(--text-primary); border: 1px solid var(--border);`
  - `Outline`: `background: transparent; color: var(--text-primary); border: 1px solid var(--accent-primary);`
  - `Ghost`: `background: transparent; color: var(--text-secondary); hover: background: var(--accent-soft);`

---

## 26. Cards, 27. Project Cards, 28. Research Cards, 29. Technology Tags

- **Project Cards (`components/projects/ProjectCard.tsx`)**:
  - Image preview container with smooth image scale on hover (`transform: scale(1.03)`).
  - Category pill badge + Year tag.
  - Title with color shift to `--accent-primary` on hover.
  - Description, Technology tag row, GitHub & Live Demo link icons.
- **Research Cards (`components/research/ResearchCard.tsx`)**:
  - Monospace identifier eyebrow tag (`IEEE-2026-PHISH-01`).
  - Abstract snippet, Research question highlight box.
  - Key experiment results grid (Accuracy, Precision, Recall, F1 metrics).
- **Technology Tags (`components/ui/TechnologyTag.tsx`)**:
  - Compact rounded badge (`radius-sm`), `background: rgba(255, 255, 255, 0.04)`, `border: 1px solid rgba(255, 255, 255, 0.08)`, `hover: border-color: var(--accent-primary)`.

---

## 30. Timeline, 31. Skills Visualization, 32. 3D Visual Rules

- **Timeline (`components/journey/Timeline.tsx`)**:
  - Vertical central scroll-progress line filled with `--accent-primary` gradient.
  - Chronological event nodes with glowing pulse rings on hover.
- **Skills Catalog (`components/home/SkillsPreview.tsx`)**:
  - Grouped into 8 categorized technical skill blocks.
  - Interactive skill pills displaying associated tech stack icons and proficiency tags.
- **3D Visual Rules (`components/3d/`)**:
  - Target frame rate: 60 FPS.
  - Lighting setup: Ambient light (`intensity: 0.5`), Directional key light (`intensity: 1.0`), Theme-colored Point light (`color: var(--accent-primary)`).
  - Automatic fallback to `SceneFallback.tsx` on WebGL initialization failure or reduced motion preference.

---

## 33. Contact Form, 34. Resume Section, 35. Command Palette, 36. Footer

- **Contact Form (`components/contact/ContactForm.tsx`)**:
  - Text fields with floating focus labels and glowing active border rings.
  - Success state notification card with checkmark animation.
- **Resume Section (`app/resume/page.tsx`)**:
  - Interactive PDF viewer canvas container + PDF Download primary button.
- **Command Palette (`components/ui/CommandPalette.tsx`)**:
  - Triggered via `Cmd+K` / `Ctrl+K`.
  - Search input scanning projects, research, skills, and theme options with arrow-key keyboard navigation.
- **Footer (`components/layout/Footer.tsx`)**:
  - Real-time API status indicator dot (Green = API Connected, Amber = Static Fallback Mode).
  - Social media icon row, copyright label, back-to-top button.

---

## 37. Loading States, 38. Empty States, 39. Error States, 40. Page Transitions

- **Loading States (`components/feedback/LoadingState.tsx`)**:
  - Skeleton loading blocks with animated shimmer gradient (`1.5s infinite`).
- **Empty States (`components/feedback/EmptyState.tsx`)**:
  - 0-result search graphic, "Clear Filters" action button.
- **Error States (`components/feedback/ErrorState.tsx`)**:
  - Red glass card with alert icon, human-readable error description, "Retry" action button.
- **Page Transitions (`components/motion/PageTransition.tsx`)**:
  - Framer Motion route wrapper (`opacity: 0 -> 1`, `y: 8px -> 0px`, `duration: 0.25s`).

---

## Motion System Specifications

```text
Animation Property       Specification Value
─────────────────────────────────────────────────────────────────────────────
Entrance Duration        0.3s to 0.5s (Max cap: 0.6s)
Entrance Easing          cubic-bezier(0.16, 1, 0.3, 1) [out-expo spring]
Stagger Delay            0.05s between child cards (Max total stagger: 0.4s)
Y-Distance Offset        16px to 24px (never larger than 32px)
Hover Scale              scale(1.02) to scale(1.04)
Magnetic Lerp            0.15lerp speed factor
```

---

## Accessibility Standards

- **Reduced Motion**: All motion components query `useReducedMotion()`. If enabled: `duration = 0`, `transforms = none`, opacity transitions only.
- **Keyboard Navigation**: All interactive elements have visible `2px solid var(--accent-primary)` focus rings (`outline-offset: 2px`).
- **Screen Readers**: Skeletons include `role="status"` and `aria-live="polite"`. Drawer menus include `aria-expanded` and `aria-label`.

---

## Performance Rules

1. **GPU Acceleration**: Animate **ONLY** `transform`, `opacity`, and `filter`. Never animate `width`, `height`, `margin`, `padding`, `top`, or `left`.
2. **WebGL Protection**: Handle `webglcontextlost` events automatically by unmounting canvas and rendering `SceneFallback.tsx`.
3. **Lazy Loading**: 3D scenes and heavy dynamic components use Next.js dynamic import (`dynamic(() => import(...), { ssr: false })`).

---

## Responsive Breakpoints

| Breakpoint Name | Width Range | Navigation Mode | 3D Canvas | Grid Layout |
|---|---|---|---|---|
| **Mobile** | `< 640px` | Slide-over Drawer | Low-poly / CSS fallback | Single column (1col) |
| **Tablet** | `640px - 1024px` | Compact Header | Reduced particle count | 2-column grid |
| **Desktop** | `1024px - 1280px` | Full Navbar + Theme Switch | Standard 3D scene | 3-column grid |
| **Large Desktop** | `> 1280px` | Full Navbar + Theme Switch | High-detail 3D scene | 3-column / 4-column grid |

---

## Explicit Anti-Patterns Prohibited

- ❌ **No Light Mode Solid White Cards**: Dark-first architecture strictly enforced.
- ❌ **No Low-Contrast Gray Body Copy**: All text must pass WCAG AA contrast standards.
- ❌ **No Layout-Thrashing Animations**: `margin`, `padding`, `width`, `height` animations are forbidden.
- ❌ **No Desktop-Only Navigation**: Every single route and feature must be fully functional on mobile touch devices.
- ❌ **No Unthrottled WebGL Loops**: 3D canvas must pause when out of viewport (`IntersectionObserver`).
- ❌ **No Hardcoded Accent Colors**: All components must reference `--accent-primary`, `--accent-glow`, etc.

---

## Architecture Implementation Mapping

```text
Design System Concept            Target Component Mapping
─────────────────────────────────────────────────────────────────────────────
Theme System Provider            → components/theme/ThemeProvider.tsx
Design Primitives                → components/ui/ (Button, Badge, TechnologyTag, SectionHeading)
Motion Primitives                → components/motion/ (FadeUp, Reveal, Stagger, Magnetic)
Background Visual Effects        → components/effects/ (HaikeiMesh, GrainOverlay, Spotlight)
3D Canvas & WebGL Fallbacks      → components/3d/ (HeroScene, ContentGraph, SceneFallback)
Command Palette                  → components/ui/CommandPalette.tsx
Domain Cards & Detail Views      → components/projects/, components/research/, components/journey/
Feedback & State Wrappers        → components/feedback/ (LoadingState, EmptyState, ErrorState)
```
