# 13 — ANIMATIONS

## Purpose
Define the motion language using:
- Framer Motion
- Three.js / R3F
- CSS transitions

## Motion Should Communicate
- Hierarchy
- Interaction
- Navigation
- State
- Relationship
- Progress
- Depth

## Feel
- Smooth
- Intentional
- Responsive
- Technical
- Premium
- Subtle
- Interactive

Avoid:
- Chaotic animation
- Slow transitions
- Gimmicks
- Distraction

## Motion Hierarchy
```text
Micro
 ↓
Component
 ↓
Section
 ↓
Page
 ↓
3D
```

## Timing
- Micro: 150–250ms
- Component: 250–450ms
- Section: 400–800ms
- Page: short enough not to delay navigation

## Motion Tokens
```text
instant: 0.10s
fast: 0.18s
normal: 0.30s
medium: 0.45s
slow: 0.70s
dramatic: 1.00s
```

Suggested:
```text
micro: 0.18
component: 0.35
section: 0.60
page: 0.70
```

Distances:
```text
small: 8px
medium: 24px
large: 48px
```

Scale:
```text
subtle: 1.02
medium: 1.05
```

## Easing
Preferred:
```text
ease-out
ease-in-out
cubic-bezier(0.22, 1, 0.36, 1)
```

Use spring motion when physical movement makes sense.

## Basic Animations
- Fade In
- Fade Up
- Fade Down
- Scale In
- Slide In

## Stagger
40–100ms.
Avoid long sequences.

## Page Load
Suggested:
```text
Navigation: 0ms
Headline: 0ms
Subheading: 100ms
CTA: 180ms
Visual: 250ms
```

Keep entrance under roughly one second.

## Hero
Use subtle motion and optional 3D.

## 3D
- Slow rotation: roughly 20–60s
- Damped mouse interaction
- Subtle parallax
- Mobile simplification
- Fallback
- Lazy loading

## Project Cards
Hover:
- Image scale 1 → 1.03
- Arrow translate 0 → 4px
- Subtle border/background change

## Buttons
Use transitions.
Arrow can move approximately 3px.
Optional magnetic CTA: maximum roughly 4–8px.

## Navigation
Mobile menu can use:
- opacity
- slide
- small stagger

## Section Reveal
Use viewport-based reveal with:
- opacity
- y translation

Prefer once-only reveals.

## Timeline
Reveal line first, then items.

## Research
Experiment/chart animations can be 500–900ms where useful.

## Filters
Animate changed results subtly.
Do not replay the entire page animation.

## Modal
Backdrop:
```text
opacity
```

Modal:
```text
scale 0.97 → 1
```

## Page Transitions
Subtle, approximately 300–600ms.
Never block navigation.

## Scroll
Parallax only in selected zones.
Optional scroll progress for long case studies.

## Custom Cursor
Optional desktop-only.
Must not block clicks.

## Reduced Motion
Respect:
```text
prefers-reduced-motion
```

## Anti-Patterns
Avoid:
- Excessive bouncing
- Long transitions
- Constant text movement
- Flashing
- Huge zooms
- Everything flying
- Heavy parallax
- Unnecessary 3D
- Cursor blocking
- Animation before content

## Motion Components
```text
components/motion/
├── FadeIn
├── FadeUp
├── ScaleIn
├── Stagger
├── PageTransition
├── Reveal
├── Magnetic
└── Parallax
```

## Principle
> **Motion should explain the interface, reinforce hierarchy, and make interaction feel natural—not compete with Mani's actual work.**
