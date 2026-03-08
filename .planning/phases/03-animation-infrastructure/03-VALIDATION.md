---
phase: 3
slug: animation-infrastructure
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CHIP-05 | unit | `npx vitest run components/data/__tests__/chips.test.ts -x` | Exists | pending |
| 03-01-02 | 01 | 1 | A11Y-04 | unit | `npx vitest run components/hooks/useInView.test.ts -x` | W0 | pending |
| 03-01-03 | 01 | 1 | A11Y-01 | unit | `npx vitest run components/hooks/useReducedMotion.test.ts -x` | W0 | pending |
| 03-01-04 | 01 | 1 | CHIP-03 prep | unit | `npx vitest run components/hooks/useCountUp.test.ts -x` | W0 | pending |
| 03-02-01 | 02 | 1 | A11Y-02 | unit | `npx vitest run components/hooks/animations.test.ts -x` | W0 | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `components/hooks/useCountUp.test.ts` — stubs for useCountUp hook behavior
- [ ] `components/hooks/useInView.test.ts` — stubs for IntersectionObserver integration
- [ ] `components/hooks/useReducedMotion.test.ts` — stubs for matchMedia integration
- [ ] IntersectionObserver mock helper (inline in test files)

*Existing infrastructure covers CHIP-05 (chips.test.ts exists).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CSS keyframe visual effect | A11Y-02 | Visual appearance can't be unit tested | Inspect in browser DevTools, verify only opacity/transform/stroke-dashoffset animated |
| Reduced motion in real browser | A11Y-01 | jsdom can't render CSS | Toggle prefers-reduced-motion in DevTools, verify animations stop |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
