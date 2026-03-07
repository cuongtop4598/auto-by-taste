---
phase: 01-i18n-foundation
plan: 02
subsystem: i18n
tags: [react-context, i18n, localStorage, SEO, accessibility, TDD]

# Dependency graph
requires:
  - phase: 01-i18n-foundation
    plan: 01
    provides: Translation infrastructure with en.ts and vi.ts files
provides:
  - I18nContext provider with language state management
  - useI18n hook for accessing translations
  - localStorage persistence for language preference
  - HTML lang attribute synchronization for SEO/accessibility
affects: [01-03-navbar-translation, 01-04-component-translation]

# Tech tracking
tech-stack:
  added: []
  patterns: [React Context API, custom hooks, localStorage persistence, useEffect for side effects, useMemo/useCallback for optimization]

key-files:
  created: [i18n/I18nContext.tsx, i18n/I18nContext.test.tsx, i18n/persistence.test.tsx, i18n/lang-attribute.test.tsx]
  modified: []

key-decisions:
  - "Memoized context value with useMemo to prevent unnecessary re-renders"
  - "Separated concerns: 3 test files (context, persistence, lang-attribute) for clarity"
  - "SSR-safe localStorage access with typeof window check"
  - "Strict type validation: only 'en' | 'vi' accepted from localStorage"

patterns-established:
  - "TDD workflow: test file first (RED), implementation (GREEN)"
  - "Context provider pattern with error boundary (throws if used outside provider)"
  - "Nested key resolution via string.split('.') for translation lookup"
  - "Graceful fallback: return key as string if translation missing"

requirements-completed: [I18N-04, I18N-05, I18N-06]

# Metrics
duration: 2min
completed: 2026-03-07
---

# Phase 01 Plan 02: I18nContext Provider Summary

**Complete I18nContext system with provider, useI18n hook, localStorage persistence, HTML lang attribute sync, and 15 comprehensive tests**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-07T14:55:56Z
- **Completed:** 2026-03-07T14:58:31Z
- **Tasks:** 3 (all TDD)
- **Files created:** 4
- **Test coverage:** 15 tests across 3 test files

## Accomplishments
- Created I18nContext with I18nProvider component and useI18n hook
- Implemented language state management with 'en' | 'vi' types
- Built translation function t() with nested key resolution (e.g., 'navbar.title')
- Added localStorage persistence - reads on mount, writes on change
- Synced HTML lang attribute via useEffect for SEO/accessibility compliance
- Memoized context value with useMemo/useCallback to prevent re-render thrashing
- Error handling: throws descriptive error when useI18n used outside provider
- All 15 tests pass (7 context + 4 persistence + 4 lang-attribute)
- TypeScript build succeeds with full type safety

## Task Commits

Each task was committed atomically following TDD protocol (test → feat):

1. **Task 1: Create I18nContext provider with useI18n hook**
   - `2af53ba` (test) - Added 7 failing tests for context behavior
   - `d55f625` (feat) - Implemented I18nContext.tsx with provider and hook
2. **Task 2: Create localStorage persistence tests**
   - `1636db9` (test) - Added 4 tests for localStorage read/write/defaults
3. **Task 3: Create HTML lang attribute sync tests**
   - `7135e70` (test) - Added 4 tests for lang attribute synchronization

_Note: Tasks 2 and 3 were test-only commits since the implementation was already complete in I18nContext.tsx from Task 1_

## Files Created/Modified

**Created:**
- `i18n/I18nContext.tsx` - Context provider with language state, persistence, and lang sync (66 lines)
- `i18n/I18nContext.test.tsx` - Core context and hook tests (78 lines, 7 tests)
- `i18n/persistence.test.tsx` - localStorage behavior tests (97 lines, 4 tests)
- `i18n/lang-attribute.test.tsx` - HTML lang attribute sync tests (98 lines, 4 tests)

**Modified:** None

## Decisions Made

**Technical choices:**
- **useMemo for context value:** Prevents re-renders when language hasn't changed, critical for performance in large component trees
- **useCallback for t() and setLanguage:** Ensures stable function references across re-renders
- **Separate test files by concern:** Improves test organization and makes it easier to locate specific test scenarios
- **SSR-safe localStorage check:** `typeof window !== 'undefined'` prevents errors in server-side rendering environments
- **Strict localStorage validation:** Only accepts 'en' or 'vi', falls back to 'en' for invalid values

**API design:**
- **Error boundary pattern:** Throwing error when useI18n used outside provider follows React best practices
- **Fallback to key string:** Missing translations return the key itself (e.g., 'navbar.title') for easy debugging
- **Nested key support:** Allows clean translation organization (navbar.title vs NAVBAR_TITLE)

## Deviations from Plan

None - plan executed exactly as written. All 3 tasks completed with TDD workflow.

## Issues Encountered

None - all tasks completed without errors or blockers.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

I18nContext is complete and ready for consumption:
- **Phase 01 Plan 03:** Navbar can now use `const { t, language, setLanguage } = useI18n()`
- **Phase 01 Plan 04:** All components can access translations via the context
- Language switching will persist across page reloads
- HTML lang attribute will automatically update for SEO/accessibility

## Self-Check

Verifying created files exist:

```bash
[ -f "i18n/I18nContext.tsx" ] && echo "FOUND: I18nContext.tsx" || echo "MISSING: I18nContext.tsx"
[ -f "i18n/I18nContext.test.tsx" ] && echo "FOUND: I18nContext.test.tsx" || echo "MISSING: I18nContext.test.tsx"
[ -f "i18n/persistence.test.tsx" ] && echo "FOUND: persistence.test.tsx" || echo "MISSING: persistence.test.tsx"
[ -f "i18n/lang-attribute.test.tsx" ] && echo "FOUND: lang-attribute.test.tsx" || echo "MISSING: lang-attribute.test.tsx"
```

Verifying commits exist:

```bash
git log --oneline | grep -E "(2af53ba|d55f625|1636db9|7135e70)"
```

### Self-Check Result: PASSED

All files exist and all commits are present in git history.

---
*Phase: 01-i18n-foundation*
*Completed: 2026-03-07*
