# Architecture

**Analysis Date:** 2026-03-05

## Pattern Overview

**Overall:** Single-Page Application (SPA) with component-based UI composition and static rendering

**Key Characteristics:**
- React-based functional component architecture
- Vite as build tool with hot module replacement
- Tailwind CSS for styling with custom design tokens
- Recharts for data visualization
- No backend API integration (static/local data only)
- Browser-based client-side rendering

## Layers

**Presentation Layer:**
- Purpose: UI rendering and user interaction
- Location: `/components/`
- Contains: Functional React components using JSX/TSX
- Depends on: Recharts (charting), Tailwind CSS (styling), React hooks (state)
- Used by: Top-level `App.tsx` orchestrator

**Application/Page Layer:**
- Purpose: Page composition and routing logic
- Location: `App.tsx`
- Contains: Section-based component composition, external contact buttons
- Depends on: All presentation components
- Used by: Entry point `index.tsx`

**Entry Point Layer:**
- Purpose: React application initialization and DOM mounting
- Location: `index.tsx`
- Contains: ReactDOM.createRoot initialization with StrictMode wrapper
- Depends on: React, ReactDOM, App component
- Used by: HTML `index.html` via script tag

**Configuration Layer:**
- Purpose: Build and development tooling configuration
- Location: `vite.config.ts`, `tsconfig.json`
- Contains: Vite plugin setup, TypeScript compilation rules, path aliases
- Depends on: Vite, TypeScript, @vitejs/plugin-react

## Data Flow

**Component Initialization Flow:**

1. HTML loads `/index.html` with Tailwind CDK link and font imports
2. Scripts execute: import map loads React/ReactDOM/Recharts from CDN
3. `/index.tsx` mounts React application to `#root` DOM element
4. `App.tsx` renders section-based page layout
5. Each section imports and renders corresponding component from `/components/`
6. Components manage local state via React hooks (useState, useEffect)
7. Recharts components subscribe to internal data arrays and render visualizations
8. User interactions trigger event handlers that update component state

**State Management:**
- Local component state only (no Redux, Context API, or global state management)
- Individual components manage their own UI state (e.g., active model selection, scroll position)
- Data passed between components via props (composition pattern in `App.tsx`)
- No server state synchronization (all data is hardcoded or computed locally)

## Key Abstractions

**Page Section Component Pattern:**
- Purpose: Encapsulate logical sections of the landing page
- Examples: `Hero.tsx`, `ModelHardwareGraph.tsx`, `OrgChartAgents.tsx`, `AIArchitectureGraph.tsx`
- Pattern: Functional component that returns full-screen section with background, content, and optional interactive elements

**Reusable UI Card Component:**
- Purpose: Standardized card container with glassmorphism styling
- Examples: Used in `ProblemSolution.tsx` (Card subcomponent)
- Pattern: Accepts props (title, description, icon, isProblem) and returns styled div with semantic content

**Data Structure Components:**
- Purpose: Define interfaces and mock data for components
- Examples: `ModelData` interface in `ModelHardwareGraph.tsx`, `companyTypes` array in `OrgChartAgents.tsx`
- Pattern: TypeScript interfaces at component file top, followed by data array constants

**Scroll-Reactive Component:**
- Purpose: Respond to scroll events to change styling/behavior
- Examples: `Navbar.tsx` changes background opacity and padding on scroll
- Pattern: useEffect with scroll event listener, state update triggers re-render with conditional className

## Entry Points

**HTML Entry Point:**
- Location: `index.html`
- Triggers: Browser page load
- Responsibilities: Define DOM structure, load external stylesheets (Tailwind, Google Fonts), define import map, load React scripts, mount root div

**React Entry Point:**
- Location: `index.tsx`
- Triggers: HTML script tag execution
- Responsibilities: Initialize ReactDOM, mount App component to #root, wrap in StrictMode for development checks

**Application Entry Point:**
- Location: `App.tsx`
- Triggers: React component tree initialization
- Responsibilities: Render semantic page structure with section elements, compose all page sections, include fixed floating action button (Zalo contact)

## Error Handling

**Strategy:** Error checking at initialization only, no runtime error handling

**Patterns:**
- `index.tsx` checks for root element existence before mounting: throws Error if #root DOM element not found
- No try-catch blocks in component code
- No error boundaries implemented
- No fallback UI for failed component renders

## Cross-Cutting Concerns

**Styling:** Tailwind CSS with custom extensions defined in `index.html` style block (glass-card, text-gradient, animate-float, hologram-glow classes)

**Validation:** No input validation; all data is hardcoded or read-only

**Authentication:** Not applicable (static landing page with no authentication)

**External Links:** Fixed URLs to Zalo contact (https://zalo.me/0337776435) and external blob storage for images (umxxfeuo5ed9xpid.public.blob.vercel-storage.com)

---

*Architecture analysis: 2026-03-05*
