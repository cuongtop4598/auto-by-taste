# Testing Patterns

**Analysis Date:** 2026-03-05

## Test Framework

**Runner:**
- No test runner detected
- No testing framework in package.json (jest, vitest, mocha not present)
- No test files in project source code (`.test.ts`, `.spec.ts` patterns not used)

**Assertion Library:**
- Not applicable - no testing framework configured

**Run Commands:**
```bash
# No test commands present in package.json
# Only development commands available:
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

## Test File Organization

**Location:**
- Not applicable - no test files in codebase

**Naming:**
- No test files present

**Structure:**
- No testing directory structure established

## Test Structure

**Not Implemented:**
This is a presentation/landing page application with no test suite infrastructure. All testing would be manual or require setting up:
- Test framework (Jest, Vitest, React Testing Library)
- Test configuration files
- Test file organization pattern
- Assertion and mocking libraries

## Mocking

**Not Applicable:**
- No testing framework configured means no mocking setup needed
- Components are largely presentational (no external API calls to mock)
- No state management that would require mocking

**Current State:**
- All data is hard-coded in components or local state
- No API integration requiring mocks
- No external service calls to mock

## Fixtures and Factories

**Test Data:**
- No test fixtures or factories configured
- Data is stored inline in components as constants

**Component Data Examples:**
```typescript
// Hard-coded data in OrgChartAgents.tsx
const companyTypes = [
  {
    id: 'cosmetics',
    name: 'Công ty Thương mại Mỹ phẩm',
    icon: '💄',
    color: 'pink',
    // ...
  },
  // ...
];

// Hard-coded pricing in ServicePricing.tsx
const plans: AIAgentPlan[] = [
  {
    name: "Starter",
    price: "3.000.000đ",
    priceNote: "/tháng",
    // ...
  },
  // ...
];

// Hard-coded AI models in ModelHardwareGraph.tsx
const aiModels: ModelData[] = [
  {
    name: "Phi-3 / Gemma 2B",
    ram: 8,
    // ...
  },
  // ...
];
```

**Location:**
- Data defined locally at top of component files
- Not in separate fixture/factory files (none exist)

## Coverage

**Requirements:** Not enforced

**View Coverage:**
- Not applicable - no testing framework configured

## Test Types

**Unit Tests:**
- Not implemented
- Would test individual component rendering and state updates
- Example areas for testing: scroll detection in Navbar, active model selection in ModelHardwareGraph

**Integration Tests:**
- Not implemented
- Would test component interactions and page navigation
- Example: Test Navbar links scroll to correct sections

**E2E Tests:**
- Not implemented
- Testing framework not present
- Would test full user flows through landing page

## Current Testing Approach

**Manual Testing Only:**
- Visual inspection in browser during development (`npm run dev`)
- Manual clicking through navigation links
- Manual testing of scroll effects and state changes
- No automated test coverage

## Components Needing Test Coverage

**High Priority (if testing were to be added):**

**Navbar.tsx** (`/home/anonymouse/workspace/startup/auto-by-taste/components/Navbar.tsx`):
- Scroll detection: verify `.scrolled` class applies when `window.scrollY > 20`
- Event listener cleanup: verify scroll listener removed on unmount
- Mobile responsiveness: navigation visibility on different screen sizes

**ModelHardwareGraph.tsx** (`/home/anonymouse/workspace/startup/auto-by-taste/components/ModelHardwareGraph.tsx`):
- State management: `activeIndex` updates when model selected
- Active model display: correct model data shown based on index
- Chart rendering: BarChart renders with correct data

**OrgChartAgents.tsx** (`/home/anonymouse/workspace/startup/auto-by-taste/components/OrgChartAgents.tsx`):
- Company type selection: state updates when different type selected
- Conditional rendering: correct agent structure displays for selected company
- Data structure integrity: all departments and agents render correctly

**Medium Priority:**

**ServicePricing.tsx** (`/home/anonymouse/workspace/startup/auto-by-taste/components/ServicePricing.tsx`):
- Plan display: all three plans render with correct pricing
- Highlighted plan: Business plan marked as highlighted
- Feature lists: each plan shows correct feature array

**ProblemSolution.tsx** (`/home/anonymouse/workspace/startup/auto-by-taste/components/ProblemSolution.tsx`):
- Card component rendering: problem and solution cards display with correct styling
- Conditional styling: `isProblem` prop applies correct colors
- Content rendering: titles, descriptions, and icons display correctly

## Setup for Testing

**Required Dependencies:**
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "vitest": "^0.34.0",
    "@vitejs/plugin-react": "^5.0.0"
  }
}
```

**Recommended Test Framework:** Vitest (works with existing Vite setup)

**Example Test File Pattern:**
```typescript
// components/Navbar.test.tsx
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Tổng quan')).toBeInTheDocument();
  });

  it('applies scrolled class when scrolled', () => {
    // Test would verify scroll behavior
  });
});
```

## Quality Gaps

**No Type Safety Tests:**
- TypeScript provides compile-time safety but no runtime validation
- No tests ensure props match interface definitions at runtime

**No Visual Regression Testing:**
- Styling changes not caught by automated tests
- Manual review required for CSS/Tailwind changes

**No Accessibility Testing:**
- No a11y validation (`@testing-library/jest-dom` rules not enforced)
- Manual accessibility review needed

**No Performance Testing:**
- Component render performance not monitored
- State update performance not measured
- Large component files (400+ lines) not profiled for re-renders

---

*Testing analysis: 2026-03-05*
