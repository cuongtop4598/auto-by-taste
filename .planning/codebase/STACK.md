# Technology Stack

**Analysis Date:** 2026-03-05

## Languages

**Primary:**
- TypeScript ~5.8.2 - Frontend application, component definitions, type safety
- JSX/TSX - React component markup

**Secondary:**
- HTML5 - Template in `index.html`
- CSS - Via Tailwind CDN and inline styles

## Runtime

**Environment:**
- Node.js (required for development, specified in README)

**Package Manager:**
- Yarn (lockfile present: `yarn.lock`)
- npm also supported (scripts use npm convention in package.json)

## Frameworks

**Core:**
- React 19.2.4 - UI rendering and component framework
- React DOM 19.2.4 - React rendering to DOM

**Data Visualization:**
- Recharts 3.7.0 - Chart components for business metrics and model data visualization

**Build/Dev:**
- Vite 6.2.0 - Build tool and dev server
  - Config: `vite.config.ts`
  - Vitejs React Plugin 5.0.0 - JSX/TSX transformation and HMR
- TypeScript 5.8.2 - Type checking and compilation

**Styling:**
- Tailwind CSS (loaded via CDN from `index.html`)
- Inter font family from Google Fonts

## Key Dependencies

**Critical:**
- recharts 3.7.0 - Data visualization for hardware models, pricing comparisons, and business metrics
- react 19.2.4 - Core UI framework, required for all component rendering
- react-dom 19.2.4 - DOM mounting and React rendering

**Development Only:**
- @types/node 22.14.0 - Node.js type definitions
- @vitejs/plugin-react 5.0.0 - React support in Vite

## Configuration

**Environment:**
- `.env.local` file present - contains environment configuration
- GEMINI_API_KEY - Configured as environment variable but only referenced in Vite config, not used in current frontend code
- Variables injected at build time via `vite.config.ts` define block

**Build:**
- `tsconfig.json` - TypeScript compilation config
  - Target: ES2022
  - Module: ESNext
  - JSX: react-jsx
  - Path alias: `@/*` maps to root directory
  - moduleResolution: bundler
- `vite.config.ts` - Vite development server and build configuration
  - Dev server: localhost:3000, host 0.0.0.0
  - React plugin enabled for fast refresh
  - Environment variable loading and define injection

**Package Config:**
- `package.json` - Project metadata and script definitions
  - Type: "module" (ES modules)
  - Private project

## Platform Requirements

**Development:**
- Node.js (required)
- Yarn or npm package manager
- Modern browser with ES2022+ support

**Production:**
- Vite build output (static assets in `dist/`)
- Any static file server (Apache, Nginx, Node.js, CDN)
- No server-side runtime required - fully static frontend

## Build & Deployment

**Development Scripts:**
```bash
npm run dev       # Start dev server on port 3000
npm run build     # Compile TypeScript and bundle with Vite
npm run preview   # Preview production build locally
```

**Build Output:**
- Location: `dist/` directory
- Type: Static assets (HTML, CSS, JavaScript)
- No server-side processing required

---

*Stack analysis: 2026-03-05*
