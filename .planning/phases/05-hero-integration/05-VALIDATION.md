---
phase: 05
slug: hero-integration
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 05 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run components/Hero.test.tsx --reporter=verbose` |
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
| 05-01-01 | 01 | 1 | HERO-01, HERO-02, HERO-03, HERO-04, HERO-05 | unit | `npx vitest run components/Hero.test.tsx -x` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | HERO-01, HERO-02, HERO-03, HERO-04, HERO-05 | unit | `npx vitest run components/Hero.test.tsx -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `components/Hero.test.tsx` — stubs for HERO-01 through HERO-05
- [ ] Mock for `ChipDiagram` component (mock as simple div to isolate Hero tests)
- [ ] Mock for `useI18n` hook (reuse pattern from existing tests)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual hierarchy (headline > CTAs > diagram) | HERO-05 | Layout/visual judgment | Open browser, verify headline is most prominent, diagram supports |
| Spec badge visual prominence | HERO-04 | Visual judgment | Verify badges are scannable at a glance |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
