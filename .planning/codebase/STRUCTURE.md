# Codebase Structure

**Analysis Date:** 2026-03-05

## Directory Layout

```
auto-by-taste/
├── components/                  # React functional components for page sections
├── .planning/
│   └── codebase/               # GSD planning documents
├── node_modules/               # Installed dependencies (generated)
├── .git/                        # Git repository metadata
├── .env.local                   # Environment variables (Vercel blob storage config)
├── .gitignore                   # Git ignore rules
├── App.tsx                      # Main application component and page layout
├── index.tsx                    # React DOM initialization entry point
├── index.html                   # HTML template with Tailwind, fonts, root div
├── types.ts                     # Shared TypeScript interfaces
├── vite.config.ts               # Vite build configuration
├── tsconfig.json                # TypeScript compiler configuration
├── package.json                 # NPM dependencies and scripts
├── yarn.lock                    # Yarn dependency lock file
├── README.md                    # Project overview
└── metadata.json                # Project metadata (possibly for CMS/deployment)
```

## Directory Purposes

**`components/`:**
- Purpose: All React functional components for the landing page
- Contains: Section components (Hero, ModelHardwareGraph, OrgChartAgents, etc.), utility components (Navbar, Footer)
- Key files: `Hero.tsx`, `Navbar.tsx`, `ModelHardwareGraph.tsx`, `OrgChartAgents.tsx`, `AIArchitectureGraph.tsx`

**`.planning/codebase/`:**
- Purpose: GSD (Glow's System Design) analysis and planning documents
- Contains: ARCHITECTURE.md, STRUCTURE.md, and future CONVENTIONS.md, TESTING.md, CONCERNS.md
- Key files: Auto-generated documentation for codebase navigation

**`node_modules/`:**
- Purpose: Installed npm/yarn dependencies
- Contains: React, React DOM, Recharts, Tailwind CSS, TypeScript, Vite, and transitive dependencies
- Generated: Yes (via `yarn install`)
- Committed: No (.gitignore)

## Key File Locations

**Entry Points:**
- `index.html`: HTML bootstrap with DOM root, stylesheets, and React mount point
- `index.tsx`: React application initialization and root component rendering
- `App.tsx`: Main application component that composes all page sections

**Configuration:**
- `package.json`: Project metadata, dependencies, and build scripts
- `tsconfig.json`: TypeScript compilation options (target ES2022, JSX, path aliases)
- `vite.config.ts`: Vite build configuration (dev server port 3000, React plugin, env variable loading)
- `.env.local`: Environment variables for Gemini API key and external blob storage

**Core Logic:**
- `types.ts`: Shared TypeScript interfaces (`ProductTier`, `FundingAllocation`, `NavItem`)
- `components/`: All functional components with internal state and data structures

**Testing:**
- No test files detected (testing not implemented)

## Naming Conventions

**Files:**
- PascalCase for component files: `Hero.tsx`, `Navbar.tsx`, `ModelHardwareGraph.tsx`
- camelCase for utility/config files: `vite.config.ts`, `tsconfig.json`, `index.tsx`
- ALL_CAPS for environment files: `.env.local`

**Directories:**
- kebab-case not used; single lowercase directory: `components/`, `node_modules/`
- Hidden directories prefixed with dot: `.git/`, `.planning/`, `.gitignore`

**Components:**
- PascalCase function names matching file names: `export const Navbar: React.FC = () => { ... }`
- Descriptive, semantic names reflecting content: `ModelHardwareGraph`, `AIArchitectureGraph`, `OrgChartAgents`

**Internal Functions:**
- camelCase for utility functions: `handleScroll`, `setActiveIndex`
- camelCase for state setters: `setScrolled`, `setSelectedCompany`, `setActiveIndex`

**Constants:**
- camelCase for arrays and objects: `aiModels[]`, `companyTypes[]`, `messagingApps[]`, `aiTools[]`
- ALL_CAPS for configuration values inside objects: `icon`, `color`, `name` properties match data schema

## Where to Add New Code

**New Section/Page Component:**
- Primary code: Create `components/NewSection.tsx` as functional component exporting `React.FC`
- Import in: `App.tsx` in both imports and section composition
- Pattern: Follow structure of existing components (use glass-card classes, Tailwind styling, local state if needed)
- Example: To add a testimonials section, create `components/Testimonials.tsx` with component definition, import it in App.tsx

**New Reusable Component:**
- Implementation: `components/ComponentName.tsx` using React.FC pattern
- Export: Named export `export const ComponentName: React.FC<Props> = (...) => { ... }`
- Props: Define interface within file or in `types.ts` if shared across multiple components
- Example: To create a reusable button component, define it in a new file or add to existing component as subcomponent

**New Shared Types/Interfaces:**
- Location: `types.ts`
- Pattern: Export interfaces following existing pattern (ProductTier, FundingAllocation, NavItem)
- Usage: Import with `import { InterfaceName } from '@/types'` using path alias

**New Chart/Data Visualization:**
- Implementation: Create component in `components/` using Recharts library
- Data: Define data structure as interface and mock data as const array within component
- Pattern: Follow `ModelHardwareGraph.tsx` pattern (local state for active selection, ResponsiveContainer wrapper)

**Utility Functions:**
- Location: Create `utils/` directory if multiple utilities, or define inline in component
- Pattern: Export functions with camelCase names, TypeScript types for parameters
- Example: For shared calculations or formatting, create `utils/helpers.ts` and import in components

**Environment Configuration:**
- Location: `.env.local` (git-ignored, local only)
- Pattern: Define variables with SCOPED_NAME format (GEMINI_API_KEY)
- Access: Via `process.env.VARIABLE_NAME` after defining in `vite.config.ts` define block

## Special Directories

**`node_modules/`:**
- Purpose: Contains all installed npm/yarn dependencies
- Generated: Yes (created by `yarn install`)
- Committed: No (listed in .gitignore)
- Management: Updated via `yarn add` or `yarn install` from lock file

**`.planning/`:**
- Purpose: GSD codebase analysis and planning documents
- Generated: Yes (created by `/gsd:map-codebase` command)
- Committed: Yes (part of repository for team reference)
- Structure: `codebase/` subdirectory contains .md analysis files

**`.git/`:**
- Purpose: Git version control metadata and history
- Generated: Yes (created by `git init` or `git clone`)
- Committed: N/A (special directory)
- Management: Automatic via git commands

---

*Structure analysis: 2026-03-05*
