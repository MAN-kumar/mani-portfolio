# 11. Dependencies

## 1. Overview

This document categorizes all runtime, development, and build/deployment dependencies used across the frontend and backend applications based strictly on `frontend/package.json` and `backend/requirements.txt`.

---

## 2. Frontend Dependencies (`frontend/package.json`)

### 2.1. Runtime Dependencies
| Package | Version Range | Category / Purpose |
|---|---|---|
| `next` | `16.3.5` | Next.js App Router full-stack web framework |
| `react` | `19.2.8` | Core UI component rendering library |
| `react-dom` | `19.2.8` | DOM rendering adapter for React |
| `framer-motion` | `^13.4.0` | Motion graphics and layout animation primitives |
| `lucide-react` | `^1.47.0` | Iconography suite for navigational and status UI |
| `three` | `^0.186.0` | 3D WebGL rendering engine |
| `@react-three/fiber` | `^9.7.0` | React renderer wrapper for Three.js |
| `@react-three/drei` | `^10.7.8` | Helper utilities for React Three Fiber (controls, cameras) |
| `@types/three` | `^0.186.0` | TypeScript definitions for Three.js engine |

### 2.2. Development & Testing Dependencies
| Package | Version Range | Category / Purpose |
|---|---|---|
| `typescript` | `^5` | Static type checking and compiler support |
| `@types/node` | `^20` | Node.js runtime type declarations |
| `@types/react` | `^19` | React type declarations |
| `@types/react-dom` | `^19` | React DOM type declarations |
| `eslint` | `^9` | JavaScript and TypeScript code linter |
| `eslint-config-next` | `16.3.5` | Next.js specific linting rules |
| `tailwindcss` | `^4` | Utility-first CSS styling engine |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin for Tailwind CSS processing |

---

## 3. Backend Dependencies (`backend/requirements.txt`)

### 3.1. Runtime Dependencies
| Package | Version Specifier | Purpose |
|---|---|---|
| `Django` | `>=5.0,<6.0` | Core Python web framework and ORM |
| `djangorestframework` | `>=3.14.0` | REST API creation, serialization, viewsets, and permissions |
| `django-cors-headers` | `>=4.3.0` | Cross-Origin Resource Sharing middleware |
| `django-filter` | `>=24.1` | Declarative URL query parameter filtering for DRF querysets |
| `python-dotenv` | `>=1.0.0` | Environment variable loader from `.env` files |
| `psycopg2-binary` | `>=2.9.9` | PostgreSQL database adapter for Python |
| `Pillow` | `>=10.0.0` | Python Imaging Library (PIL) for Django ImageField processing |

### 3.2. Build & Production Deployment Dependencies
| Package | Version Specifier | Purpose |
|---|---|---|
| `gunicorn` | `>=21.2.0` | WSGI HTTP server for production Python deployments on Render |
| `whitenoise` | `>=6.6.0` | Embedded static asset serving middleware for Python web apps |

---

## 4. Package Audit & Version Maintenance

- **Security Auditing**:
  - Frontend: `npm audit` (run inside `frontend/`)
  - Backend: `pip audit` or `safety check`
- **Updates**: Major version upgrades for core dependencies (`next`, `react`, `Django`) should be executed strictly in isolated development branches following the project [Change Protocol](file:///c:/Users/hp/Desktop/my_portfolio/docs/24_CHANGE_PROTOCOL.md).
