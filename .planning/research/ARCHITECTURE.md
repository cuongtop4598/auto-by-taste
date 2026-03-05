# Architecture Research: Particle Animations in React SPA

**Domain:** Particle Animation Background for Landing Pages
**Researched:** 2026-03-05
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Content Layer (z-10+)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Hero    │  │  Navbar  │  │ Sections │  │  Footer  │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │             │              │             │          │
├───────┴─────────────┴──────────────┴─────────────┴──────────┤
│                  Particle Animation Layer (z-0)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Canvas-based Particle Engine                │   │
│  │  - requestAnimationFrame loop                        │   │
│  │  - Mouse interaction handler                         │   │
│  │  - Performance monitoring                            │   │
│  └──────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│                  Initialization Layer                        │
│  ┌────────────────┐  ┌──────────────────┐                   │
│  │ Engine Loader  │  │  Config Manager  │                   │
│  │ (tsParticles)  │  │  (ISourceOptions)│                   │
│  └────────────────┘  └──────────────────┘                   │
└──────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **ParticleBackground** | Canvas container, engine initialization, lifecycle management | React functional component with useEffect for init/cleanup, absolute positioning with z-index: 0 |
| **ParticleEngine** | Animation loop, particle physics, rendering | tsParticles 3.0+ with requestAnimationFrame, HTML5 Canvas API with hardware acceleration |
| **ConfigProvider** | Particle behavior configuration, performance presets | JSON/TypeScript object defining particle count, size, speed, interactivity, color schemes |
| **PerformanceMonitor** | FPS tracking, adaptive particle reduction, device detection | IntersectionObserver for viewport visibility, optional FPS counter, mobile detection |
| **ContentWrapper** | Layer separation, z-index management, scroll coordination | CSS positioning wrapper ensuring content layers above particles |

## Recommended Project Structure

For adding particles to existing Auto By Taste React/Vite landing page:

```
src/
├── components/
│   ├── particles/                    # New: Particle system components
│   │   ├── ParticleBackground.tsx    # Main particle container component
│   │   ├── particleConfig.ts         # Particle behavior configuration
│   │   └── useParticleEngine.ts      # Custom hook for engine lifecycle
│   ├── Navbar.tsx                    # Existing (needs z-index verification)
│   ├── Hero.tsx                      # Existing (needs z-index verification)
│   └── [other sections]              # Existing
├── App.tsx                           # Modified: Add ParticleBackground wrapper
└── index.html                        # Modified: Add particle CDN/import if needed
```

### Structure Rationale

- **components/particles/:** Isolates particle system logic from page content, enables lazy loading as a module, keeps config separate for easy tuning
- **ParticleBackground.tsx:** Top-level particle component positioned absolutely at z-index 0, wraps entire app or specific sections
- **particleConfig.ts:** Centralized configuration prevents inline options bloat, enables A/B testing of different effects, separates concerns (behavior vs rendering)
- **useParticleEngine.ts:** Custom hook encapsulates initialization state, engine loading logic, cleanup lifecycle, making the main component cleaner

## Architectural Patterns

### Pattern 1: Lazy Initialization with State Management

**What:** Initialize particle engine asynchronously only after React component mounts, using state to control rendering

**When to use:** Always for particle systems - prevents SSR issues, allows progressive enhancement, ensures DOM is ready before Canvas manipulation

**Trade-offs:**
- **Pros:** Avoids hydration mismatches, reduces initial bundle if code-split, better user experience (content loads first)
- **Cons:** Brief flash before particles appear, requires loading state management

**Example:**
```typescript
import { useEffect, useState, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export const ParticleBackground = () => {
  const [engineReady, setEngineReady] = useState(false);

  // Initialize engine once per app lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load only needed features (slim = basic + common features)
      await loadSlim(engine);
    }).then(() => {
      setEngineReady(true);
    });
  }, []); // Empty deps = run once on mount

  const options = useMemo(
    () => ({
      // Config object here - memoized to prevent re-renders
      particles: {
        number: { value: 80 },
        color: { value: '#60a5fa' }, // blue-400 for Auto By Taste theme
        // ... rest of config
      },
    }),
    []
  );

  if (!engineReady) return null; // Or loading skeleton

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};
```

### Pattern 2: Layer Separation with CSS Positioning

**What:** Use CSS positioning and z-index to create distinct visual layers - particles as background (z-index: 0), content on top (z-index: 10+)

**When to use:** Always for background particle effects - ensures content remains interactive, prevents click-through issues, maintains accessibility

**Trade-offs:**
- **Pros:** Clean separation of concerns, easy to toggle particles on/off, no impact on content layout or interactions
- **Cons:** Requires careful z-index management, potential stacking context issues if not planned

**Example:**
```typescript
// App.tsx structure
function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Particle layer - absolute positioning, z-0 */}
      <ParticleBackground />

      {/* Content layers - relative positioning, z-10+ */}
      <Navbar className="relative z-20" />
      <main className="flex-grow pt-20 relative z-10">
        <Hero />
        {/* Other sections */}
      </main>
      <Footer className="relative z-10" />

      {/* FAB needs highest z-index */}
      <FloatingActionButton className="z-[100]" />
    </div>
  );
}
```

### Pattern 3: Performance-Aware Configuration with Device Detection

**What:** Adapt particle count, effects, and interactivity based on device capabilities and viewport visibility

**When to use:** Essential for production - mobile devices struggle with 100+ particles, invisible particles waste resources

**Trade-offs:**
- **Pros:** Maintains 60fps on all devices, reduces battery drain on mobile, better user experience
- **Cons:** Slightly more complex config, need to test across devices

**Example:**
```typescript
// particleConfig.ts
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isLowEndDevice = navigator.hardwareConcurrency <= 4;

export const particleConfig = {
  particles: {
    number: {
      value: isMobile ? 40 : isLowEndDevice ? 60 : 100,
      density: {
        enable: true,
        area: 800, // Adaptive density
      },
    },
    move: {
      enable: true,
      speed: isMobile ? 1 : 2, // Slower on mobile
    },
    links: {
      enable: !isMobile, // Disable lines on mobile (expensive to render)
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: !isMobile, // Touch devices don't have hover
      },
      onClick: {
        enable: true,
      },
    },
  },
  // Reduce particles when tab not visible (browser handles this, but good practice)
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};
```

### Pattern 4: Canvas Lifecycle Management with Proper Cleanup

**What:** Use `useLayoutEffect` instead of `useEffect` for canvas animations to ensure synchronous cleanup before next frame

**When to use:** When building custom canvas animations (not needed for tsParticles, but critical if rolling your own)

**Trade-offs:**
- **Pros:** Prevents memory leaks, ensures animation stops immediately on unmount, avoids "escaping" requestAnimationFrame
- **Cons:** Slightly more complex than useEffect, runs synchronously (blocks render)

**Example:**
```typescript
// Custom particle animation (if not using tsParticles)
const useCanvasAnimation = (canvasRef) => {
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;

    const animate = () => {
      // Draw particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ... particle rendering logic

      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup runs synchronously BEFORE next render
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []); // useLayoutEffect for synchronous cleanup
};
```

### Pattern 5: Intersection Observer for Lazy Activation

**What:** Only start particle animations when they enter the viewport, pause when scrolled out of view

**When to use:** For section-specific particles, or to reduce CPU usage on long landing pages

**Trade-offs:**
- **Pros:** Significant performance improvement on long pages, battery savings on mobile, only animates what user sees
- **Cons:** Additional code complexity, particles may "pop in" when scrolling

**Example:**
```typescript
import { useEffect, useRef, useState } from 'react';

export const LazyParticleSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Activate when 10% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {isVisible && <ParticleBackground />}
      {/* Section content */}
    </section>
  );
};
```

## Data Flow

### Initialization Flow

```
App Mount
    ↓
ParticleBackground renders
    ↓
useEffect triggers → initParticlesEngine(loadSlim)
    ↓
tsParticles loads modules (async)
    ↓
setState(engineReady: true)
    ↓
<Particles> component renders
    ↓
Canvas element created in DOM
    ↓
tsParticles initializes canvas context
    ↓
requestAnimationFrame loop starts
    ↓
Particles render at 60fps
```

### Interaction Flow

```
User Mouse Move
    ↓
Canvas event listener (if interactivity.events.onHover enabled)
    ↓
tsParticles calculates distance to particles
    ↓
Particle positions update (repel/attract mode)
    ↓
Canvas redraws on next frame
    ↓
User sees particles respond to cursor
```

### Cleanup Flow

```
Component Unmount (navigation, etc.)
    ↓
useEffect cleanup function runs
    ↓
tsParticles.destroy() called
    ↓
cancelAnimationFrame stops loop
    ↓
Canvas event listeners removed
    ↓
Canvas element removed from DOM
    ↓
Memory freed
```

### Key Data Flows

1. **Configuration to Rendering:** Config object (particleConfig.ts) → useMemo wrapper → `<Particles options={}>` prop → tsParticles engine → Canvas rendering
2. **Performance Adaptation:** Device detection → conditional config values → particle count/effects → actual render performance
3. **State Synchronization:** Engine initialization state (useState) → conditional rendering (if engineReady) → particles visible/hidden

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| **Landing page (current)** | Single ParticleBackground in App.tsx, 80-100 particles on desktop/40 on mobile, slim loader (reduces bundle by ~60% vs full), static config file |
| **Multi-section animations** | Intersection Observer per section, lazy load particle modules only when needed, reduce particle count to 40-60 per section to maintain 60fps, consider disabling particles on sections with complex charts (OrgChartAgents, ModelHardwareGraph already render-heavy) |
| **High-traffic landing page** | Code-split particle modules with React.lazy(), preload particle config on link hover (anticipatory loading), consider static particle image as fallback for low-end devices, monitor Core Web Vitals impact on SEO |

### Scaling Priorities

1. **First bottleneck: Mobile performance**
   - **What breaks:** 100 particles + complex Recharts = dropped frames on mid-range phones
   - **How to fix:** Reduce particles to 30-40 on mobile, disable particle links/trails, use Intersection Observer to pause particles when scrolling past Hero section, test on actual devices (not just Chrome DevTools mobile emulation)

2. **Second bottleneck: Bundle size**
   - **What breaks:** Full tsParticles bundle (~120KB) impacts initial load time
   - **How to fix:** Use `@tsparticles/slim` instead of `@tsparticles/all` (saves ~60KB), lazy load particle module with React.lazy + Suspense, consider CDN hosting for tsParticles to leverage browser cache across sites

3. **Third bottleneck: Scroll performance**
   - **What breaks:** Continuous particles animation during scroll = jank on lower-end devices
   - **How to fix:** Use `pauseOnBlur` and `pauseOnOutsideViewport` options, implement scroll throttling if custom scroll effects are added, consider disabling particles entirely on scroll (re-enable on scroll stop)

## Anti-Patterns

### Anti-Pattern 1: Loading Full tsParticles Bundle

**What people do:** Install `tsparticles` package and use `loadFull()` or `loadAll()` to get all features

**Why it's wrong:**
- Adds 60-120KB to bundle for features you don't need (confetti, fireworks, emoji particles, etc.)
- Increases parse/compile time on page load
- Violates the "only load what you use" principle
- Particularly harmful on mobile connections

**Do this instead:**
```typescript
// BAD
import { loadFull } from "tsparticles";
await initParticlesEngine(loadFull);

// GOOD - Use slim (basic + common features)
import { loadSlim } from "@tsparticles/slim";
await initParticlesEngine(loadSlim);

// EVEN BETTER - Use basic and add only what you need
import { loadBasic } from "@tsparticles/basic";
import { loadLineLinksInteraction } from "@tsparticles/interaction-external-trail";
await initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadLineLinksInteraction(engine); // Only if you need linked particles
});
```

### Anti-Pattern 2: Inline Configuration in Component

**What people do:** Define particle options directly in the component JSX or inside the component function body

**Why it's wrong:**
- Causes unnecessary re-renders (new object reference on every render)
- Makes config hard to A/B test or swap out
- Clutters component with 50-100 lines of config
- Prevents sharing config across multiple particle instances

**Do this instead:**
```typescript
// BAD
const ParticleBackground = () => {
  return (
    <Particles
      options={{
        particles: {
          number: { value: 80 },
          color: { value: '#ffffff' },
          // ... 80 more lines
        }
      }}
    />
  );
};

// GOOD - Separate config file + useMemo
// particleConfig.ts
export const neuralNetworkConfig = {
  particles: { /* ... */ },
  interactivity: { /* ... */ },
};

// ParticleBackground.tsx
import { neuralNetworkConfig } from './particleConfig';

const ParticleBackground = () => {
  const options = useMemo(() => neuralNetworkConfig, []);
  return <Particles options={options} />;
};
```

### Anti-Pattern 3: No Mobile Optimization

**What people do:** Same particle count and effects for desktop and mobile

**Why it's wrong:**
- Mobile devices have weaker GPUs (especially mid-range Android phones)
- 100+ particles can drop to 20-30fps on mobile
- Battery drain from continuous canvas animation
- Poor user experience - users associate jank with unprofessional sites

**Do this instead:**
```typescript
// BAD
const config = {
  particles: {
    number: { value: 150 },
    links: { enable: true },
  }
};

// GOOD - Adaptive config
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const config = {
  particles: {
    number: {
      value: isMobile ? 30 : 100,
    },
    links: {
      enable: !isMobile, // Expensive to render
    },
    move: {
      speed: isMobile ? 0.5 : 2, // Slower = less CPU
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: !isMobile, // No hover on touch devices anyway
      },
    },
  },
};
```

### Anti-Pattern 4: Not Using Intersection Observer for Off-Screen Particles

**What people do:** Let particles animate continuously even when scrolled out of view

**Why it's wrong:**
- Wastes CPU cycles animating invisible elements
- Drains battery on mobile devices
- Increases memory usage unnecessarily
- Can cause scroll jank if particles + scrolling both running

**Do this instead:**
```typescript
// BAD - Always running
const ParticleBackground = () => {
  return <Particles options={config} />;
};

// GOOD - Pause when not visible
const ParticleBackground = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {isVisible && <Particles options={config} />}
    </div>
  );
};
```

### Anti-Pattern 5: Blocking Content Interactivity

**What people do:** Forget to set `pointer-events: none` on particle canvas, or use incorrect z-index

**Why it's wrong:**
- Users can't click buttons/links underneath particles
- Hover effects on content don't work
- Breaks accessibility (keyboard navigation)
- Creates frustrating UX

**Do this instead:**
```typescript
// BAD - Particles block clicks
<Particles
  style={{
    position: 'absolute',
    zIndex: 10, // Above content - WRONG
  }}
/>

// GOOD - Particles in background, content interactive
<Particles
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0, // Behind content
    pointerEvents: 'none', // Click-through
  }}
/>

// Content layer
<div className="relative z-10">
  {/* Buttons, links, etc. - fully interactive */}
</div>
```

## Integration Points

### tsParticles Library Integration

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **@tsparticles/react** | NPM package, React component wrapper | Official React bindings, use v3.0+ for latest features, TypeScript types included |
| **@tsparticles/slim** | NPM package, feature loader | Recommended loader (basic + common features), ~40KB smaller than loadFull |
| **@tsparticles/engine** | Peer dependency | Core engine, automatically installed with @tsparticles/react |

### Performance Monitoring Integration

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **FPS Meter** | Optional tsParticles plugin | Built-in FPS counter via `fpsLimit` option, can display on screen for debugging |
| **Intersection Observer API** | Native browser API | Use for lazy activation/pause when particles leave viewport |
| **React DevTools Profiler** | Built-in React tool | Monitor re-renders caused by particle state changes |

### Existing Auto By Taste Architecture Integration

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **App.tsx ↔ ParticleBackground** | Direct import/composition | ParticleBackground wraps entire app or sits as sibling to main content |
| **Tailwind CSS ↔ Particle Config** | Color value sharing | Extract Tailwind colors (blue-400, purple-600) into particle config for consistent theme |
| **Recharts (ModelHardwareGraph, etc.) ↔ Particles** | Z-index layering only | No direct interaction - ensure particles don't impact chart performance |
| **Vite Build ↔ tsParticles** | NPM dependency bundling | Vite tree-shakes unused tsParticles features automatically if using slim/basic loaders |

## Neural Network Visualization Specific Patterns

### Pattern: Connected Nodes with Dynamic Links

**What:** Particles represent neurons, lines connect nearby particles to simulate neural network connections

**Implementation:**
```typescript
export const neuralNetworkConfig = {
  particles: {
    number: { value: 80 },
    color: { value: '#60a5fa' }, // Blue nodes
    shape: { type: 'circle' },
    size: { value: 3 },
    links: {
      enable: true,
      distance: 150, // Max distance to draw connections
      color: '#60a5fa',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: false,
      straight: false,
      outModes: { default: 'bounce' },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab', // Draw connections to cursor
      },
      onClick: {
        enable: true,
        mode: 'push', // Add particles on click
      },
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.6,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
};
```

### Pattern: Gradient Colors for "Activation" Effect

**What:** Use gradient colors on particles to simulate neural activation waves

**Implementation:**
```typescript
{
  particles: {
    color: {
      value: ['#60a5fa', '#a78bfa', '#ec4899'], // Blue → Purple → Pink
      animation: {
        enable: true,
        speed: 20,
        sync: false, // Different particles animate at different rates
      },
    },
    opacity: {
      value: { min: 0.3, max: 0.8 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
  }
}
```

## Build Order and Implementation Dependencies

### Phase 1: Setup and Configuration (No dependencies)
1. Install dependencies: `npm install @tsparticles/react @tsparticles/slim`
2. Create `components/particles/particleConfig.ts` with neural network config
3. Create `components/particles/ParticleBackground.tsx` with basic structure
4. Test in isolation (render ParticleBackground in a blank page)

### Phase 2: Integration with Existing App (Depends on Phase 1)
1. Import ParticleBackground into `App.tsx`
2. Add as first child of root div (before Navbar)
3. Verify z-index layering (particles behind content)
4. Test scroll behavior and content interactivity

### Phase 3: Performance Optimization (Depends on Phase 2)
1. Add device detection to `particleConfig.ts`
2. Implement mobile-specific particle counts
3. Add Intersection Observer for Hero section (optional)
4. Test on real mobile devices (not just DevTools emulation)

### Phase 4: Visual Refinement (Depends on Phase 3)
1. Tune particle colors to match Auto By Taste branding
2. Adjust particle count for visual balance
3. Test interactivity (hover/click effects)
4. A/B test different configs (connected vs floating particles)

### Critical Path Dependencies:
- **Engine initialization must complete before Particles component renders** (enforced by `if (!engineReady)` guard)
- **Z-index coordination must be done before visual testing** (prevents wasted time debugging click-through issues)
- **Mobile optimization should be done before deploying to production** (performance regressions are hard to roll back after users complain)
- **Config separation (particleConfig.ts) should be done first** (refactoring inline config later is tedious)

## Sources

### High Confidence (Official Documentation & Libraries)
- [tsParticles Official Documentation](https://particles.js.org/)
- [tsParticles React GitHub Repository](https://github.com/tsparticles/react)
- [@tsparticles/react NPM Package](https://www.npmjs.com/package/@tsparticles/react)
- [Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Medium Confidence (Current Best Practices 2026)
- [JavaScript Particles Background: Complete 2026 Guide](https://copyprogramming.com/howto/javascript-particles-background-js-code-example)
- [React Particles Background - shadcn/ui](https://www.shadcn.io/background/particles)
- [10 Best Particles Animation JavaScript Libraries (2026 Update)](https://www.cssscript.com/best-particles-animation/)
- [How to use Particles Js in React with react-tsparticles - DEV](https://dev.to/tauleshwar/how-to-use-particles-js-in-react-with-react-tsparticles-3dpl)
- [SVG vs Canvas Animation: Best Choice for Modern Frontends](https://www.augustinfotech.com/blogs/svg-vs-canvas-animation-what-modern-frontends-should-use-in-2026/)

### Performance & Lifecycle Patterns
- [Using requestAnimationFrame with React Hooks - CSS-Tricks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/)
- [RequestAnimationFrame and UseEffect vs UseLayoutEffect - Jakub Arnold](https://blog.jakuba.net/request-animation-frame-and-use-effect-vs-use-layout-effect/)
- [Animation with Canvas and requestAnimationFrame() in React - DEV](https://dev.to/ptifur/animation-with-canvas-and-requestanimationframe-in-react-5ccj)
- [React Intersection Observer: Lazy Load & Animations - SitePoint](https://www.sitepoint.com/react-intersection-observer-lazy-load-infinite-scroll-animations/)
- [How to Lazy Load React Components with Intersection Observer - HackerNoon](https://hackernoon.com/how-to-lazy-load-react-components-with-an-intersection-observer)

### Neural Network Visualization
- [Neural Network Visualization - CodePen](https://codepen.io/towc/pen/wGjXGY)
- [Canvas Particle Network - GitHub](https://github.com/JulianLaval/canvas-particle-network)
- [Building a Real-Time Neural Network Visualizer with React Three Fiber](https://www.erikjs.com/blog/building-neural-network-visualizer)

---
*Architecture research for: Particle Animation Backgrounds in React SPAs*
*Researched: 2026-03-05*
*Project: Auto By Taste Landing Page Enhancement*
