# Coding Conventions

**Analysis Date:** 2026-03-05

## Naming Patterns

**Files:**
- PascalCase for React components: `Navbar.tsx`, `Hero.tsx`, `ServicePricing.tsx`
- camelCase for utilities and non-component files: `types.ts`, `index.tsx`, `vite.config.ts`
- All components are `.tsx` files

**Functions:**
- React components are exported as named exports with `React.FC` type annotation
- Internal helper functions use camelCase: `handleScroll`, `setScrolled`
- Event handlers use camelCase: `handleScroll` pattern

**Variables:**
- camelCase for all local and state variables: `scrolled`, `activeIndex`, `activeModel`
- All state variables use camelCase naming

**Types:**
- PascalCase for interfaces: `ProductTier`, `FundingAllocation`, `NavItem`, `ModelData`, `AIAgentPlan`
- Exported from `types.ts` using ES module exports

**Constants:**
- camelCase for local constants: `messagingApps`, `aiTools`, `companyTypes`, `plans`, `benefits`
- Inline arrays and data objects use camelCase naming

## Code Style

**Formatting:**
- No explicit formatter configured (eslint/prettier not in dependencies)
- Consistent 2-space indentation observed throughout
- No trailing semicolons in JSX attributes
- Class names follow Tailwind convention with no spaces

**Linting:**
- No linter configuration detected
- Code relies on TypeScript for type safety
- Manual code review based on observed patterns

## Import Organization

**Order:**
1. External libraries: `import React from 'react'` or `import { useState } from 'react'`
2. React hooks: `useState`, `useEffect` in same import as React
3. External chart/UI libraries: `recharts` components
4. Local type imports: `import { ProductTier } from '../types'`
5. No barrel file exports detected - direct imports from component files

**Path Aliases:**
- Path alias `@/*` configured in `tsconfig.json` pointing to root
- Not actively used in codebase - components use relative imports instead
- Example config: `"@/*": ["./*"]` maps to project root

**Import Examples:**
```typescript
// External libraries first
import React from 'react';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Local type imports
import { ProductTier } from '../types';

// Component imports - relative paths
import { Navbar } from './components/Navbar';
```

## Error Handling

**Patterns:**
- Minimal error handling in rendered components
- Root mount error in `index.tsx`: checks if root element exists before mounting
- Example: `if (!rootElement) { throw new Error("Could not find root element to mount to"); }`
- No try-catch blocks observed in component code
- State initialization prevents null reference errors

**Error Prevention:**
- React.FC type annotation prevents runtime component type errors
- Interface definitions provide type safety for data objects
- Default state values prevent undefined errors

## Logging

**Framework:** None - no logging library detected

**Patterns:**
- No console logging calls found in codebase
- No structured logging implemented
- No error tracking/reporting system detected

## Comments

**When to Comment:**
- Minimal comments observed throughout codebase
- Comments used for high-level section organization: `{/* Dynamic Background Elements */}`
- Comments limited to visual/UI structure explanations

**JSDoc/TSDoc:**
- No JSDoc or TSDoc comments found
- Type annotations via TypeScript interfaces provide documentation
- Component purposes implicit from PascalCase naming

**Comment Examples:**
```typescript
{/* Dynamic Background Elements */}
{/* Floating UI Decorative Elements (resembling the image) */}
{/* Updated Hero Image Container with Holographic Pedestal Look */}
{/* Visual overlay for "Pedestal" feel */}
```

## Function Design

**Size:**
- React components range from ~45 lines (Footer, Navbar) to ~400+ lines (OrgChartAgents)
- Smaller components prefer single responsibility
- Larger components inline data definitions and JSX structure together

**Parameters:**
- React components use `React.FC` type with no props (stateless presentation)
- Example: `export const Navbar: React.FC = () => { ... }`
- Internal helper functions use destructuring: `const Card: React.FC<{ title: string; description: string; icon: string; isProblem?: boolean }>`
- No prop drilling observed - components are largely self-contained

**Return Values:**
- All React components return JSX elements
- JSX always wrapped in single root `<div>`
- No null returns or conditional rendering at top level

## Module Design

**Exports:**
- All components use named exports: `export const ComponentName: React.FC = () => { ... }`
- Single default export in `App.tsx`: `export default App`
- Type definitions exported from `types.ts`: `export interface TypeName { ... }`
- Utility data (arrays, objects) not exported - kept local to components

**Barrel Files:**
- No barrel files (`index.ts` pattern) for component exports
- Components imported directly from individual files
- `index.tsx` is entry point only, not a barrel export file

**Example Patterns:**
```typescript
// Named export component
export const Navbar: React.FC = () => { ... };

// Named export type
export interface ProductTier { ... }

// Internal data not exported
const companyTypes = [ ... ];  // Local to OrgChartAgents.tsx
const plans = [ ... ];         // Local to ServicePricing.tsx
```

## State Management

**Pattern:**
- React hooks (`useState`, `useEffect`) for local component state
- No global state management (Redux, Context API not used)
- State lifted locally to component level only

**Examples:**
```typescript
// Navbar.tsx - scroll detection state
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// ModelHardwareGraph.tsx - active selection state
const [activeIndex, setActiveIndex] = useState(1);
const activeModel = aiModels[activeIndex];
```

## Styling

**Framework:** Tailwind CSS via CDN

**Patterns:**
- Tailwind classes inline in JSX elements
- Custom CSS in `<style>` tag in `index.html`:
  - `.glass-card` - frosted glass effect
  - `.text-gradient` - gradient text effect
  - `.animate-float` - floating animation keyframe
  - `.hologram-glow` - shadow glow effect
- Color scheme: dark theme with blue/purple accents
- No CSS-in-JS or CSS modules

**Example:**
```html
<!-- index.html custom styles -->
<style>
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
</style>
```

---

*Convention analysis: 2026-03-05*
