---
phase: 04-svg-chip-diagram
plan: 01
subsystem: ui
tags: [react, svg, inline-svg, viewBox, aria-tablist, chip-diagram, animation-hooks, tdd]

# Dependency graph
requires:
  - phase: 03-animation-infrastructure
    provides: useInView, useCountUp, useReducedMotion hooks and CSS animation classes
  - phase: 02-mac-hardware-data
    provides: Chip interface and chips array with M4 TOPS data
provides:
  - ChipDiagram component with inline SVG block diagram and variant selector tabs
affects: [05-hero-integration]

# Tech tracking
tech-stack:
  added: []
  patterns: [data-driven-svg-blocks, viewBox-responsive, defs-use-element-budget, html-tabs-outside-svg]

key-files:
  created:
    - components/ChipDiagram.tsx
    - components/ChipDiagram.test.tsx
  modified: []

key-decisions:
  - "Mocked hooks in component tests rather than rAF -- cleaner separation of concerns"
  - "Block regions with text labels (not per-core rects) to stay under 100 DOM elements"
  - "No re-animation on variant switch -- instant value updates after initial viewport animation"

patterns-established:
  - "SVG viewBox='0 0 400 300' with width='100%' for responsive scaling"
  - "HTML tab buttons outside SVG for keyboard accessibility"
  - "defs/use pattern for reusable SVG shapes to manage element budget"

requirements-completed: [CHIP-01, CHIP-02, CHIP-03, CHIP-04, A11Y-03]

# Metrics
duration: 2min
completed: 2026-03-08
---

# Phase 4 Plan 1: SVG Chip Diagram Summary

**Inline SVG chip block diagram with M4/Pro/Max variant tabs, animated spec count-up via Phase 3 hooks, responsive viewBox scaling, and under-100 DOM element budget**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-08T03:08:36Z
- **Completed:** 2026-03-08T03:11:01Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Built ChipDiagram component rendering 4 SVG block regions (CPU, GPU, Neural Engine, Unified Memory) with spec labels driven by chips.ts data
- Variant selector tabs (M4/M4 Pro/M4 Max) with ARIA tablist/tab/aria-selected for accessibility
- Composed all three Phase 3 hooks (useInView, useCountUp, useReducedMotion) for viewport-triggered animated spec numbers
- SVG uses viewBox responsive scaling and stays well under 100 DOM element budget

## Task Commits

Each task was committed atomically:

1. **Task 1: Test scaffold (RED)** - `c8ca7e3` (test)
2. **Task 2: Implement ChipDiagram (GREEN)** - `cc11d05` (feat)

_Both tasks followed TDD: tests written first (RED), implementation to pass (GREEN)._

## Files Created/Modified
- `components/ChipDiagram.tsx` - Inline SVG chip diagram with variant tabs, animated specs, responsive viewBox
- `components/ChipDiagram.test.tsx` - 7 tests covering CHIP-01 through CHIP-04, A11Y-03, and ARIA accessibility

## Decisions Made
- Mocked hooks (useCountUp, useInView, useReducedMotion) in component tests rather than mocking rAF/IntersectionObserver -- prevents infinite rAF loops and provides cleaner separation of unit test concerns
- Block regions with text labels instead of per-core rectangles keeps SVG element count well under 100
- After initial viewport animation, variant switches show final values instantly (no re-animation)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed rAF mock causing infinite recursion in tests**
- **Found during:** Task 2 (initial test run)
- **Issue:** Mocking requestAnimationFrame with immediate callback execution caused useCountUp to loop infinitely (rAF -> setCurrent -> re-render -> rAF -> ...)
- **Fix:** Switched to mocking useCountUp/useInView/useReducedMotion at module level instead of browser APIs, since hooks are already unit-tested separately
- **Files modified:** components/ChipDiagram.test.tsx
- **Committed in:** cc11d05 (Task 2 commit)

**2. [Rule 1 - Bug] Fixed double-render in accessible role test**
- **Found during:** Task 2 (initial test run)
- **Issue:** Test called render() twice, creating duplicate DOM elements that confused getByRole queries
- **Fix:** Used single render() call and verified aria-label updates after fireEvent.click
- **Files modified:** components/ChipDiagram.test.tsx
- **Committed in:** cc11d05 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 bugs in test setup)
**Impact on plan:** Both fixes necessary for tests to run correctly. No scope creep.

## Issues Encountered
None beyond the test mock issues documented as deviations above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- ChipDiagram component ready for Phase 5 Hero integration via `import { ChipDiagram } from './ChipDiagram'`
- Accepts optional `className` prop for container styling
- Full test suite: 93 tests, 15 files, 0 failures

## Self-Check: PASSED

- All 3 files verified present on disk
- Commit c8ca7e3 (Task 1) verified in git log
- Commit cc11d05 (Task 2) verified in git log
- ChipDiagram export verified
- Full test suite: 93 tests, 15 files, 0 failures

---
*Phase: 04-svg-chip-diagram*
*Completed: 2026-03-08*
