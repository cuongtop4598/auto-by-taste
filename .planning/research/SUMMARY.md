# Research Summary

**Project:** Auto By Taste - High-Tech Landing Page Refactor
**Synthesized:** 2026-03-05

## Key Findings

### Technology Stack

**Recommended for Particle System:**
- @tsparticles/react + @tsparticles/slim (60-80KB gzipped)
- NOT particles.js (abandoned 5+ years), NOT Three.js (overkill for 2D)
- framer-motion (40KB) for UI animations if needed

**Bundle Impact:** ~100-120KB total for animation stack - acceptable for landing page if lazy loaded

### Architecture Decisions

| Decision | Recommendation | Rationale |
|----------|----------------|-----------|
| Particle rendering | Canvas 2D via tsParticles | WebGL overkill for <300 particles; Canvas sufficient for landing page |
| Layer separation | Particles at z-index 0, content at z-index 10+ | Prevents click-through issues; maintains accessibility |
| Initialization | Lazy load after LCP | Particles are decorative; don't block critical content |
| Configuration | External config file + useMemo | Prevents re-renders; enables A/B testing |

### Performance Constraints

| Device | Max Particles | Links Enabled | Hover Effects |
|--------|--------------|---------------|---------------|
| Desktop | 100-200 | Yes | Yes |
| Mobile | 30-50 | No | No |
| Low-end | 20-30 | No | No |

**Critical:** Use useLayoutEffect + cancelAnimationFrame for cleanup to prevent memory leaks

### MVP Feature Set (v1)

**Must Have:**
1. Neural network particle background (tsParticles)
2. Enhanced glassmorphism UI
3. Mac model selector (pick Mac → see AI models)
4. M-series chip comparison section
5. Unified Memory Architecture explainer
6. Performance data visualization
7. Mobile optimization (adaptive particles)

**Defer:**
- Reverse flow (AI model → Mac recommendations)
- Live token speed simulation
- Privacy/cost calculator
- Model recommendation engine

### Critical Pitfalls to Avoid

1. **Memory leaks** - Must use useLayoutEffect with cancelAnimationFrame cleanup
2. **Accessibility** - Must respect prefers-reduced-motion
3. **Mobile performance** - Adaptive particle counts mandatory
4. **Bundle size** - Use @tsparticles/slim, not full bundle
5. **Z-index conflicts** - Define hierarchy before implementation
6. **LCP blocking** - Lazy load particle library after initial paint

### Implementation Patterns

```typescript
// Pattern: Lazy initialization with proper cleanup
const ParticleBackground = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(loadSlim).then(() => setReady(true));
  }, []);

  const options = useMemo(() => neuralNetworkConfig, []);

  if (!ready) return null;
  return <Particles options={options} style={{ zIndex: 0 }} />;
};

// Pattern: Adaptive particle count
const getParticleCount = () => {
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency <= 4;
  if (isLowEnd) return 20;
  if (isMobile) return 50;
  return 100;
};

// Pattern: Reduced motion respect
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(true); // Safe default
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    mq.addEventListener('change', (e) => setPrefersReduced(e.matches));
    return () => mq.removeEventListener('change', ...);
  }, []);
  return prefersReduced;
};
```

### Mac Hardware Data Structure

```typescript
interface MacModel {
  id: string;
  name: string;           // "MacBook Air M2"
  chip: 'M1' | 'M2' | 'M3' | 'M4';
  ramOptions: number[];   // [8, 16, 24]
  gpuCores: number;
  neuralEngineCores: number;
  memoryBandwidth: number; // GB/s
}

interface AIModel {
  id: string;
  name: string;           // "Llama 3.1 8B"
  minRamGB: number;       // Minimum RAM required
  category: 'chat' | 'coding' | 'vision' | 'embedding';
  tokensPerSecond: { [chipId: string]: number }; // Performance by chip
}
```

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Mobile performance degradation | HIGH | HIGH | Aggressive adaptive particle counts; test on real devices |
| Bundle size exceeds budget | MEDIUM | MEDIUM | Lazy load; use slim bundle; monitor with analyzer |
| Glassmorphism z-index conflicts | MEDIUM | LOW | Define z-index scale before implementation |
| LCP regression | LOW | HIGH | Lazy load particles after hero content renders |

## Confidence Levels

- **Stack recommendations:** HIGH (npm verified, GitHub active)
- **Performance thresholds:** MEDIUM-HIGH (device-dependent, needs real testing)
- **Feature prioritization:** MEDIUM (user value assumed, not validated)
- **M-series specs:** HIGH (official Apple data)

---
*Research synthesis for Auto By Taste landing page refactor*
