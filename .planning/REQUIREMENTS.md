# Requirements: v1.0 - High-Tech Landing Page Refactor

**Created:** 2026-03-05
**Status:** Draft

## Scope Definition

Transform the Auto By Taste landing page from a functional business site to a high-tech showcase that visually communicates the power of local AI on Apple Silicon, with an interactive Mac compatibility checker.

## Requirements

### R1: Neural Network Particle Background ✓

**Priority:** P1 - Must Have
**Complexity:** MEDIUM
**Status:** COMPLETE (2026-03-05)

Create an animated particle background that visualizes neural network connections, conveying the AI/tech nature of the product.

**Acceptance Criteria:**
- [x] Particles render as background layer (z-index 0) behind all content
- [x] Particles connect with lines when within proximity (neural network style)
- [x] Desktop: 80-120 particles with link connections (100 particles)
- [x] Mobile: 30-50 particles without link connections (50 particles)
- [x] Respects prefers-reduced-motion (disables or simplifies)
- [x] Lazy loads after initial content paint (doesn't block LCP)
- [x] Cleanup prevents memory leaks on navigation (engine lifecycle managed)
- [x] Colors match brand theme (blue/purple tech aesthetic) (#60a5fa)

**Technical Approach:**
- Use @tsparticles/react + @tsparticles/slim
- External config file for particle options
- useMemo to prevent re-renders
- IntersectionObserver optional for scroll-based pausing

---

### R2: Enhanced Glassmorphism UI ✓

**Priority:** P1 - Must Have
**Complexity:** LOW-MEDIUM
**Status:** COMPLETE (2026-03-05)

Extend existing glass-card styling across all sections for consistent high-tech aesthetic.

**Acceptance Criteria:**
- [x] All card components use glassmorphism (backdrop-filter blur)
- [x] Consistent opacity and blur values (10-20px blur, 10-30% opacity)
- [x] Glass effect visible with particle background showing through
- [x] Fallback for browsers without backdrop-filter support
- [x] Z-index hierarchy maintained (glass above particles, below nav)
- [x] Dark theme optimized (glass works best on dark backgrounds)

**Technical Approach:**
- Extend existing .glass-card class
- Define z-index CSS variables
- Test on Safari/Firefox/Chrome

---

### R3: Mac Model Selector

**Priority:** P1 - Must Have
**Complexity:** MEDIUM-HIGH

Allow users to select their Mac model and see which AI models are compatible.

**Acceptance Criteria:**
- [ ] Visual Mac model selector (cards, not dropdown)
- [ ] Group by chip generation (M1, M2, M3, M4)
- [ ] Show RAM options for each Mac
- [ ] Display compatible AI models after selection
- [ ] Show key specs for selected Mac (GPU cores, memory bandwidth)
- [ ] Filter AI models by selected Mac's RAM capacity
- [ ] Mobile-friendly selector layout
- [ ] Vietnamese language labels

**Data Requirements:**
- Mac models: MacBook Air, MacBook Pro, Mac Mini, Mac Studio, Mac Pro
- Chips: M1, M1 Pro, M1 Max, M1 Ultra, M2, M2 Pro, M2 Max, M2 Ultra, M3, M3 Pro, M3 Max, M4, M4 Pro, M4 Max
- RAM options: 8GB, 16GB, 24GB, 32GB, 48GB, 64GB, 96GB, 128GB, 192GB
- AI models: Llama, Mistral, Phi, Qwen, Gemma with size variants

---

### R4: M-Series Chip Comparison

**Priority:** P1 - Must Have
**Complexity:** LOW-MEDIUM

Display comparative information about M-series chip capabilities.

**Acceptance Criteria:**
- [ ] Visual comparison of M1 vs M2 vs M3 vs M4 generations
- [ ] Key metrics: CPU cores, GPU cores, Neural Engine, max RAM
- [ ] Memory bandwidth comparison (critical for AI performance)
- [ ] Clear visual hierarchy showing progression
- [ ] Performance uplift percentages where relevant
- [ ] Integrates with Mac selector (highlight selected chip)

**Technical Approach:**
- Use existing Recharts infrastructure
- Bar charts or comparison table
- Static data (no API needed)

---

### R5: Unified Memory Architecture Explainer

**Priority:** P1 - Must Have
**Complexity:** MEDIUM

Educate users on why Apple Silicon's Unified Memory matters for AI workloads.

**Acceptance Criteria:**
- [ ] Visual diagram showing UMA architecture
- [ ] Comparison with traditional RAM (CPU vs GPU memory)
- [ ] Memory bandwidth callouts (M1: 200GB/s, M4 Max: 546GB/s)
- [ ] Explanation in Vietnamese targeting non-technical audience
- [ ] Interactive or animated elements (optional)
- [ ] Links to Mac selector for context

**Technical Approach:**
- SVG-based or Canvas diagram
- framer-motion for subtle animations
- Responsive layout for mobile

---

### R6: Performance Data Display

**Priority:** P1 - Must Have
**Complexity:** MEDIUM

Show benchmark data for AI model performance on different Mac configurations.

**Acceptance Criteria:**
- [ ] Token/second metrics for common AI tasks
- [ ] Performance varies by Mac model and AI model
- [ ] Visual chart format (existing Recharts)
- [ ] Categories: Chat, Coding, Vision, Embeddings
- [ ] Real-world context ("Reply to email in 2 seconds")
- [ ] Data updates when Mac selector changes

**Technical Approach:**
- Extend ModelHardwareGraph component
- Static benchmark data (approximate, based on research)
- Bar/line charts with Recharts

---

### R7: Mobile Optimization

**Priority:** P1 - Must Have
**Complexity:** MEDIUM

Ensure all new features work well on mobile devices.

**Acceptance Criteria:**
- [ ] Particle count reduces on mobile (30-50 max)
- [ ] Link connections disabled on mobile
- [ ] Glass effects performant (test on mid-range devices)
- [ ] Mac selector works on touch screens
- [ ] Charts readable on small screens
- [ ] No scroll jank or touch delay
- [ ] Test on real Android/iOS devices

**Technical Approach:**
- Device detection for adaptive rendering
- Touch-friendly tap targets (48px min)
- Performance profiling on real devices

---

## Out of Scope (v1)

- Reverse flow (select AI model → recommend Mac)
- Live token speed simulation/animation
- Privacy/cost calculator widget
- Model recommendation engine ("answer 3 questions")
- Backend API integration
- User accounts or data persistence
- Multi-language support (Vietnamese only for v1)
- A/B testing infrastructure

## Dependencies

| Requirement | Depends On |
|-------------|------------|
| R1 Particles | None (can build first) |
| R2 Glassmorphism | R1 (need particles to see through glass) |
| R3 Mac Selector | None (data structure first) |
| R4 Chip Comparison | R3 (uses same chip data) |
| R5 UMA Explainer | None (standalone content) |
| R6 Performance Data | R3 (responds to Mac selection) |
| R7 Mobile | R1, R2, R3, R6 (test all features on mobile) |

## Success Criteria

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 85 on mobile |
| LCP | < 2.5s on 3G |
| FPS during scroll | > 50 fps |
| Bundle size increase | < 150KB gzipped |
| Mobile usability | No scroll jank, all CTAs tappable |

---
*Requirements for Auto By Taste v1.0 refactor*
