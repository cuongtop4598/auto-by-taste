---
phase: 03-animation-infrastructure
plan: 01
subsystem: ui
tags: [react-hooks, requestAnimationFrame, IntersectionObserver, matchMedia, accessibility, animation]

# Dependency graph
requires:
  - phase: 02-mac-hardware-data
    provides: Chip interface and chip data array
provides:
  - useReducedMotion hook for accessibility-gated animations
  - useInView hook for scroll-triggered animation entry
  - useCountUp hook for animated number count-up with easing
  - TOPS data field on M4 chip entries (38 TOPS)
affects: [04-svg-chip-diagram, 05-hero-integration]

# Tech tracking
tech-stack:
  added: []
  patterns: [custom-react-hooks, browser-native-apis, tdd-red-green]

key-files:
  created:
    - components/hooks/useReducedMotion.ts
    - components/hooks/useReducedMotion.test.ts
    - components/hooks/useInView.ts
    - components/hooks/useInView.test.ts
    - components/hooks/useCountUp.ts
    - components/hooks/useCountUp.test.ts
  modified:
    - components/data/chips.ts
    - components/data/__tests__/chips.test.ts

key-decisions:
  - "tops field kept optional on Chip interface -- only M4 has marketed TOPS values"
  - "useCountUp accepts trigger param for composability with useInView"

patterns-established:
  - "Custom hook pattern: browser API in useEffect with cleanup in return"
  - "IntersectionObserver one-shot: disconnect after first intersection"
  - "rAF animation: store ID in useRef, cancel in useEffect cleanup"

requirements-completed: [CHIP-05, A11Y-01, A11Y-04]

# Metrics
duration: 3min
completed: 2026-03-08
---

# Phase 3 Plan 1: Animation Data & Hooks Summary

**M4 TOPS data (38) added to chip layer, three custom hooks (useReducedMotion, useInView, useCountUp) built with TDD using browser-native APIs**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T02:38:08Z
- **Completed:** 2026-03-08T02:41:02Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Added tops: 38 to all M4 chip entries with test coverage for presence/absence
- Created useReducedMotion hook that reactively tracks prefers-reduced-motion via matchMedia
- Created useInView hook with one-shot IntersectionObserver pattern (observe, trigger, disconnect)
- Created useCountUp hook with rAF-driven ease-out cubic animation and cleanup

## Task Commits

Each task was committed atomically:

1. **Task 1: TOPS data field + useReducedMotion hook** - `b2afac1` (feat)
2. **Task 2: useInView + useCountUp hooks** - `aa5e881` (feat)

_Both tasks followed TDD: tests written first (RED), implementation to pass (GREEN)._

## Files Created/Modified
- `components/data/types.ts` - Already had tops field (no change needed)
- `components/data/chips.ts` - Added tops: 38 to M4 base/Pro/Max entries
- `components/data/__tests__/chips.test.ts` - Added TOPS presence/absence assertions
- `components/hooks/useReducedMotion.ts` - Reactive prefers-reduced-motion detection hook
- `components/hooks/useReducedMotion.test.ts` - 4 tests covering default, active, reactive, cleanup
- `components/hooks/useInView.ts` - One-shot IntersectionObserver viewport detection
- `components/hooks/useInView.test.ts` - 4 tests covering initial, trigger, disconnect, unmount
- `components/hooks/useCountUp.ts` - rAF count-up animation with ease-out cubic
- `components/hooks/useCountUp.test.ts` - 4 tests covering trigger, rAF call, completion, cleanup

## Decisions Made
- tops field kept optional on Chip interface since only M4 has marketed TOPS values
- useCountUp accepts a trigger parameter for composability (consumer passes useInView result)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- IntersectionObserver mock required `function` keyword (not arrow function) for constructor compatibility with `new`
- useCountUp test required non-zero start timestamp to properly verify completion path

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All three hooks ready for Phase 4 SVG chip diagram consumption
- Hook composition pattern: `const inView = useInView(ref); const count = useCountUp(target, duration, inView);`
- Full test suite passes (86 tests, 14 files, zero failures)

## Self-Check: PASSED

- All 9 files verified present on disk
- Commit b2afac1 (Task 1) verified in git log
- Commit aa5e881 (Task 2) verified in git log
- Full test suite: 86 tests, 14 files, 0 failures

---
*Phase: 03-animation-infrastructure*
*Completed: 2026-03-08*
