# Pitfalls Research

**Domain:** Particle Animations for React Landing Pages
**Researched:** 2026-03-05
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Memory Leaks from Uncleaned Animation Frames

**What goes wrong:**
Animation loops continue running after component unmount, accumulating requestAnimationFrame calls and particle data in memory. Particles pile up in garbage collection, causing progressive performance degradation. If users navigate away and return, animations are "super slow because it keeps redrawing particles that are no longer there."

**Why it happens:**
Developers forget that requestAnimationFrame creates a perpetual loop that must be explicitly canceled. Using useEffect without proper cleanup leaves animation frame IDs orphaned. Additionally, storing frame IDs in useState triggers unnecessary re-renders, creating even more animation frames.

**How to avoid:**
- Store animation frame ID in useRef, not useState (refs don't trigger re-renders)
- Return cleanup function from useLayoutEffect (not useEffect) that calls cancelAnimationFrame
- Use useLayoutEffect instead of useEffect to ensure cleanup runs synchronously before new frames queue
- Keep particle arrays in refs, not state, to avoid re-render cycles
- Clear particle data structures explicitly in cleanup

**Warning signs:**
- Increasing memory usage in browser dev tools (Memory tab)
- FPS gradually degrading over time, especially after navigation
- Animation becomes slower on second play compared to first
- CPU usage doesn't drop to baseline after component unmounts

**Phase to address:**
Phase 1: Implementation - Establish cleanup patterns from the start, enforce with code review checklist

---

### Pitfall 2: Ignoring prefers-reduced-motion Accessibility

**What goes wrong:**
Particle animations cause motion sickness, nausea, and disorientation for users with vestibular disorders, migraines, epilepsy, ADHD, autism, traumatic brain injuries, and other conditions. Over 70 million people are affected by vestibular disorders alone. Users are "perpetually one click away from activating an unannounced animation" that makes the site unusable.

**Why it happens:**
Developers test only with default OS settings and overlook accessibility media queries. Common misconception that "decorative" background animations don't need accessibility considerations. Particle effects are often added late in development without accessibility review.

**How to avoid:**
- Create usePrefersReducedMotion hook that checks `(prefers-reduced-motion: no-preference)` media query
- Default to animations DISABLED (critical for SSR - "we don't know what the user's preference is on the server")
- Listen for real-time preference changes with mediaQueryList.addEventListener
- For particles: use fade/dissolve/color-change instead of motion (scaling, rotating, wave effects)
- Provide static alternative or disable particles entirely when reduce-motion is enabled
- Never use aggressive CSS like `* { animation-duration: 0.01ms !important; }` - it paradoxically speeds up JS animations, making them "even more dizzying"

**Warning signs:**
- No @media (prefers-reduced-motion) CSS rules in codebase
- Animation configuration doesn't accept `immediate` or `disabled` props
- Testing only with default browser/OS settings
- No user feedback mechanism for animation preferences

**Phase to address:**
Phase 1: Implementation - Build accessibility into initial particle component, not as afterthought

---

### Pitfall 3: Canvas Rendering on Main Thread Blocking UI

**What goes wrong:**
Particle calculations for 10,000+ particles run on the main JavaScript thread, blocking UI interactions. "Code running on the main thread blocks the UI" - causing frozen scrolls, delayed button clicks, and janky interactions. Mobile devices hit this limit at 200-300 particles; lower-end Android devices max out at 30 simultaneous animated elements per frame.

**Why it happens:**
Canvas 2D context runs synchronously on main thread. Developers test on high-end desktops with dedicated GPUs and vastly overestimate mobile performance. Particle count is set globally without device capability detection. React re-renders trigger full canvas redraws unnecessarily.

**How to avoid:**
- Use requestAnimationFrame with fps limiter (default 60fps) to prevent CPU throttling
- Implement adaptive particle count based on device detection:
  - Desktop: 200-300 particles max for 60 FPS
  - Mobile: 50-100 particles max
  - Low-end devices: 30 particles max or disable entirely
- Avoid React state updates during animation loop (use refs instead)
- Consider WebGL for 10,000+ particles (100,000-500,000 capacity depending on hardware)
- Use OffscreenCanvas and Web Workers for non-interactive particle systems (moves calculations off main thread)
- Profile with browser performance tools on representative devices, not just developer machines

**Warning signs:**
- Scroll lag when particles are active
- Button click delays (>100ms) on hero section with particles
- CPU usage sustained above 50% on landing page idle
- FPS consistently below 60 on mid-range devices
- Lighthouse Performance score drops below 90

**Phase to address:**
Phase 1: Implementation - Start with conservative particle counts; Phase 2: Optimization - Add adaptive performance scaling

---

### Pitfall 4: Massive Bundle Size from Three.js/WebGL Libraries

**What goes wrong:**
Adding react-three-fiber or Three.js for "simple" particle effects inflates bundle size by 170KB (Three.js minified+gzipped) to 250KB+ (with react-three-fiber). Bundle size directly impacts First Contentful Paint (FCP) and Time to Interactive (TTI), harming landing page conversion rates. "Large parallax images impact performance more than library choice" - but heavy libraries compound the problem.

**Why it happens:**
Developers import entire libraries when only basic particle rendering is needed. Three.js "doesn't tree-shake effectively" despite ES6 modules. WebGL capabilities are overkill for simple 2D particle backgrounds. No bundle size budget is enforced during development.

**How to avoid:**
- For 2D particles on landing pages, use Canvas 2D API directly or lightweight libraries:
  - tsParticles: sub-10KB gzipped for basic effects
  - react-particle-animation: minimal Canvas wrapper
  - Native Canvas with custom implementation
- Reserve Three.js/react-three-fiber for truly 3D particle systems requiring depth, lighting, or complex interactions
- Lazy load particle libraries with React.lazy() - particles are below-the-fold decoration, not critical path
- Set bundle size budget: landing page initial JS should be <100KB gzipped
- Use webpack-bundle-analyzer or similar to audit dependencies

**Warning signs:**
- Package.json includes three, @react-three/fiber for simple 2D effects
- Initial bundle exceeds 200KB gzipped
- FCP > 1.8s or TTI > 3.8s on 3G connection
- Lighthouse flags "Avoid enormous network payloads"
- Particle component loads synchronously in App.tsx

**Phase to address:**
Phase 0: Library Selection - Choose minimal library before implementation; Phase 2: Optimization - Lazy load if bundle budget exceeded

---

### Pitfall 5: Particle Layer Z-Index Conflicts with Glass Morphism

**What goes wrong:**
Particle canvas renders above glassmorphic UI elements (backdrop-filter), breaking the depth hierarchy. Particles appear in front of navigation, cards, or CTAs instead of behind them. Alternatively, canvas renders behind all elements, making particles invisible under opaque backgrounds.

**Why it happens:**
Canvas absolute positioning with default z-index: auto creates stacking context conflicts. Glassmorphic elements with backdrop-filter force new stacking contexts. Developers don't test particle layering with various UI components. Animated backgrounds need their own compositing layer for performance but this changes z-index behavior.

**How to avoid:**
- Establish clear z-index hierarchy:
  - Particle canvas: z-index: 0 or -1
  - Background gradients: z-index: -10
  - Content sections: z-index: 1
  - Glassmorphic cards: z-index: 10
  - Navigation/modals: z-index: 1000
- Use position: fixed for full-page particle backgrounds to prevent scroll issues
- Add transform: translateZ(0) or will-change: transform to particle canvas to force GPU layer
- Limit blur layers to 1-2 per screen (each backdrop-filter compounds GPU/CPU usage)
- Test with all glassmorphic components visible simultaneously

**Warning signs:**
- Particles render above navbar or hero CTA buttons
- Glassmorphic cards are invisible against particle background
- Particles flicker or disappear when scrolling past blurred elements
- GPU usage spikes when particles + backdrop-filter are both active

**Phase to address:**
Phase 1: Implementation - Define z-index scale in CSS variables before building components

---

### Pitfall 6: Using Abandoned particles.js Instead of tsParticles

**What goes wrong:**
The original particles.js library was abandoned 5+ years ago, lacking modern features, performance optimizations, bug fixes, and React integration. No FPS limiter means uncapped CPU usage. Missing features like SVG paths, rotating particles, text shapes, and masking.

**Why it happens:**
Outdated tutorials and Stack Overflow answers still reference particles.js. Library name recognition ("particles.js is famous") overrides due diligence. Developers copy-paste old implementations without researching current alternatives.

**How to avoid:**
- Use tsParticles (successor to particles.js) which offers:
  - Backward compatibility: "just change the script source...you're ready"
  - FPS limiter (default 60fps) to prevent CPU overload
  - Active maintenance and bug fixes
  - React wrapper: @tsparticles/react
  - Expanded features: SVG paths, rotation, FontAwesome icons, masking
- Verify library last update date on npm/GitHub before adding dependency
- Search "[library name] alternative 2026" before committing to animation library
- Prefer libraries with React-specific wrappers over vanilla JS adaptations

**Warning signs:**
- Package name is exactly "particles.js" (not tsparticles)
- No GitHub commits in past 12 months
- npm weekly downloads declining year-over-year
- No TypeScript definitions or React examples in documentation

**Phase to address:**
Phase 0: Library Selection - Research and select maintained library before implementation

---

### Pitfall 7: Particle Animations Blocking Largest Contentful Paint (LCP)

**What goes wrong:**
Canvas initialization, particle generation, and first render delay LCP, the critical Core Web Vital for perceived load speed. If particles are rendered in hero section viewport, they may be considered the "largest contentful element." LCP > 2.5s fails Google's performance standards, harming SEO and conversion rates. "LCP tells you the page feels loaded" - slow particle initialization creates perception of slow site.

**Why it happens:**
Particle library loads synchronously in document head or App.tsx. Canvas setup runs during initial render, blocking paint. Large particle counts (1000+) require significant initialization time. Hero image/text waits for particle canvas to render first.

**How to avoid:**
- Lazy load particle component with React.lazy() + Suspense
- Use IntersectionObserver to initialize particles only when hero section enters viewport
- Defer particle initialization until after FCP/LCP:
  ```javascript
  useEffect(() => {
    // Wait for LCP before adding particles
    if (document.readyState === 'complete') {
      initParticles();
    } else {
      window.addEventListener('load', initParticles);
    }
  }, []);
  ```
- Ensure hero text/image renders independently of particle canvas (separate DOM layers)
- Start with 0 particles, fade in gradually (avoids initial calculation spike)
- Monitor Core Web Vitals with web.dev/measure or Lighthouse
- Target: LCP < 2.5s, FCP < 1.8s on 3G

**Warning signs:**
- Lighthouse reports LCP > 2.5s
- LCP element identified as canvas in PageSpeed Insights
- Hero section appears blank for 1+ seconds on slow connections
- Waterfall diagram shows particle library blocking critical resources

**Phase to address:**
Phase 2: Optimization - Implement lazy loading and deferred initialization after MVP works

---

### Pitfall 8: Not Respecting Mobile Performance Constraints

**What goes wrong:**
Particle effects designed for desktop (200-300 particles, complex interactions, 60fps) cause severe FPS drops on mobile devices. Lower-end Android devices max out at 30 animated elements per frame. Mobile CPUs overheat, battery drains rapidly, and users abandon site due to laggy scrolling.

**Why it happens:**
Developers test exclusively on desktop Chrome or high-end iPhones. No performance testing on representative Android devices ($100-150 range). Mobile-specific constraints overlooked:
- Weaker GPUs and single-core JS performance
- Thermal throttling after 10-30 seconds of heavy rendering
- Battery consumption concerns
- Smaller screens make high particle counts unnecessary

**How to avoid:**
- Implement device-tier detection:
  ```javascript
  const getParticleCount = () => {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 2;

    if (isLowEnd) return 20;
    if (isMobile) return 50;
    return 200;
  };
  ```
- Use matchMedia to detect reduced data mode: `(prefers-reduced-data: reduce)`
- Disable particles entirely on connections slower than 3G
- Limit trail effects to 5-10 frames on mobile (vs. 20-50 on desktop)
- Trail effects increase CPU usage 30-50%, disable on mobile
- Test on real devices: mid-range Android (Samsung A series), older iPhones (iPhone 11)
- Monitor FPS with browser devtools on mobile, not desktop responsive mode

**Warning signs:**
- FPS drops below 30 on mobile devices
- Scroll lag of 200ms+ when particles are active
- Mobile users have higher bounce rate than desktop (segment by device)
- Battery drain complaints or overheating
- Chrome Lighthouse mobile score < 70

**Phase to address:**
Phase 1: Implementation - Build adaptive particle counts from start; Phase 2: Optimization - Refine thresholds based on real user monitoring

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using useState for particle positions | Familiar React pattern | Causes re-render on every frame (60/sec), destroys performance | Never - always use refs for animation state |
| Importing full Three.js library | Rich feature set available | 170KB+ bundle size, slow page loads, poor mobile experience | Only if truly building 3D interactive experiences |
| Setting particle count globally | Simple configuration | Terrible mobile performance, no adaptability | Only for internal tools with known hardware |
| Skipping requestAnimationFrame cleanup | Animation works initially | Memory leaks, performance degradation, broken navigation | Never - cleanup is non-negotiable |
| Using inline Canvas manipulation instead of library | No dependencies, minimal code | Reinventing features (FPS limiting, interaction), hard to maintain | Acceptable for <50 particles with basic motion |
| Applying backdrop-filter to multiple layers | Beautiful glassmorphic depth | GPU rendering passes multiply, severe mobile lag | Max 1-2 blur layers per screen |
| Loading particles synchronously in App.tsx | Renders immediately on page load | Blocks FCP/LCP, delays critical content | Never for landing pages - always lazy load |
| Using particles.js because tutorial said so | Quick setup from old tutorial | Abandoned library, no bug fixes, missing modern features | Never - migration to tsParticles is trivial |

## Integration Gotchas

Common mistakes when connecting particle libraries to React.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| tsParticles in React | Importing entire tsparticles package instead of modular bundles | Use @tsparticles/react + specific preset packages only |
| Canvas ref management | Creating new canvas on every render with document.createElement | Use React.useRef to persist canvas element across renders |
| Particle options updates | Passing new config object every render causing reinitialization | Memoize config with useMemo, only update when values truly change |
| Event listeners (mouse move, scroll) | Adding listeners directly to window in component | Add/remove listeners in useEffect cleanup to prevent leaks |
| SSR with Next.js/Remix | Importing particle library at module level (runs on server) | Dynamic import with `const Particles = dynamic(() => import(...), { ssr: false })` |
| Animation loop sync | Calling setState inside requestAnimationFrame callback | Use ref for animation state, only setState for discrete user actions |
| React strict mode | Animation starts twice in development | Check for existing animation ID before initializing in useEffect |
| Image particles | Using large image files (>500KB) as particle textures | Optimize images to <50KB, use SVG or CSS shapes instead |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Linear particle count scaling | Silky smooth at 100 particles | Adaptive particle budget based on measured FPS, fallback to CSS animation | >300 particles on desktop, >100 on mobile |
| Interactivity on every particle | Fun demos with 50 interactive particles | Limit interactivity to subset of particles near cursor (spatial partitioning with quadtrees) | >200 particles with mouse repulsion |
| Full canvas redraw each frame | Works with small canvas or few particles | Use double buffering, dirty rectangles, or layer composition to redraw only changed regions | Canvas >1920x1080 or >500 particles |
| Per-particle blur/shadow | Beautiful glowing effects on small count | Apply blur to entire canvas layer, use opacity gradients instead of shadow filters | >50 particles with filter effects |
| Trail effects storing full history | Nice motion trails on 20 particles | Limit trail to 5-10 frames, use fade-out instead of storing positions | >100 particles with trails |
| React component per particle | Easy to reason about declaratively | Single canvas with imperative drawing, particles as data not components | >30 particle components |
| Color/opacity transitions on all particles | Smooth color waves across field | Batch color updates, use shader uniforms for WebGL | >500 particles with individual color tweening |
| Real-time particle physics | Gravity, collisions, attraction for small demos | Pre-calculate physics for background animations, simplify to velocity+position only | >200 particles with collision detection |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Accepting particle config from URL params | XSS via malicious particle image URLs, script injection through custom particle shapes | Validate and sanitize all config, whitelist allowed particle types, never use eval() on configs |
| Loading particle images from untrusted domains | CORS issues, tracking pixels, malicious content | Use allowlist of trusted image domains, host particle assets on same domain, validate image dimensions |
| Exposing analytics in particle interactions | User tracking without consent, privacy violations | Disable particle interaction tracking in regions with strict privacy laws (GDPR), explicit consent required |
| Allowing user-uploaded particle shapes | Executable SVGs with embedded scripts, XXE attacks | Strip script tags from SVGs, sanitize uploaded files, use img tag not inline SVG for user content |
| Unthrottled API calls on particle events | DDoS vector via rapid particle interactions | Debounce/throttle event handlers, rate limit analytics calls, don't send events on every particle collision |

## UX Pitfalls

Common user experience mistakes with particle animations.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Particles covering clickable elements | CTAs, forms, navigation unusable | Canvas z-index below interactive elements, pointer-events: none on canvas overlay |
| Distracting motion during reading | Content unreadable, users can't focus | Reduce particle velocity/count in content sections, disable in article body, limit to hero only |
| No loading state | White screen until particles initialize | Show static gradient background immediately, fade in particles progressively |
| Particles on every page section | Visual fatigue, "trying too hard" perception | Limit to hero + footer, keep content sections clean and focused |
| Aggressive interaction effects | Particles exploding on every mouse move | Subtle, minimal interactivity - prefer ambient motion over reactive chaos |
| Identical particle motion site-wide | Monotonous, template-like appearance | Vary particle behavior by section (calm header, energetic footer), match content tone |
| Particles interfering with text contrast | Unreadable hero text, accessibility failure | Add solid/gradient overlay between particles and text, ensure WCAG AA contrast (4.5:1) |
| No pause/disable option | Accessibility issue, user frustration | Provide visible toggle or respect system preferences |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Particle animation works**: Often missing cancelAnimationFrame cleanup - verify component unmount doesn't leak memory (check DevTools Memory tab over multiple mount/unmount cycles)
- [ ] **Responsive canvas**: Often missing window resize listener - verify canvas redraws correctly when viewport changes (test browser zoom, mobile rotation)
- [ ] **Accessibility implemented**: Often missing reduced motion check - verify particles disable/simplify when `prefers-reduced-motion: reduce` is set
- [ ] **Mobile tested**: Often missing real device testing - verify on actual Android/iOS devices, not just Chrome DevTools responsive mode
- [ ] **Performance profiled**: Often missing FPS monitoring - verify 60fps maintained during scroll, interaction using browser Performance tab
- [ ] **Bundle size checked**: Often missing webpack-bundle-analyzer - verify particle library didn't bloat bundle beyond budget
- [ ] **Lazy loading configured**: Often missing code splitting - verify particle library not in main bundle (check Network tab on first load)
- [ ] **Z-index tested**: Often missing glassmorphism integration - verify particles layer correctly behind all UI components
- [ ] **Image particles optimized**: Often missing compression - verify particle images are <50KB, using modern formats (WebP, AVIF)
- [ ] **Event listeners cleaned**: Often missing removeEventListener - verify mousemove, scroll, resize handlers removed on unmount
- [ ] **Error boundaries added**: Often missing fallback - verify particle crashes don't break entire page (test with forced error in animation loop)
- [ ] **Web Vitals measured**: Often missing Core Web Vitals check - verify LCP <2.5s, FCP <1.8s on 3G connection

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Memory leak discovered in production | MEDIUM | 1. Deploy hot-fix with proper cleanup functions (useLayoutEffect + cancelAnimationFrame), 2. Add memory monitoring alerts, 3. Implement particle count reduction feature flag |
| LCP degraded by particles | LOW | 1. Wrap particle component in React.lazy(), 2. Add IntersectionObserver to delay init until visible, 3. Monitor LCP in Lighthouse CI |
| Mobile performance complaints | MEDIUM | 1. Implement device detection to reduce particle count, 2. Add feature flag to disable on low-end devices, 3. Set up real user monitoring for FPS tracking |
| Accessibility violation (missing reduced motion) | LOW | 1. Create usePrefersReducedMotion hook, 2. Add disable path to particle component, 3. Audit all animations site-wide |
| Bundle size exceeds budget | MEDIUM-HIGH | 1. Replace Three.js with Canvas 2D or tsParticles if possible, 2. Lazy load particle library, 3. Consider removing if not critical to conversion |
| Z-index conflicts with UI | LOW | 1. Establish CSS variable z-index scale, 2. Set particle canvas to z-index: 0, 3. Add will-change: transform to force layer |
| Using abandoned particles.js | LOW | 1. Replace script source with tsParticles CDN (backward compatible), 2. Test existing config works, 3. Migrate to React wrapper @tsparticles/react |
| Particles covering interactive elements | LOW | 1. Add pointer-events: none to particle canvas, 2. Lower z-index below UI, 3. Test all CTAs are clickable |
| Canvas not responding to resize | LOW | 1. Add window resize listener in useEffect, 2. Debounce resize handler (300ms), 3. Clean up listener on unmount |
| Animation causing motion sickness | MEDIUM | 1. Implement reduced motion immediately, 2. Reduce default particle velocity by 50%, 3. Add user-visible disable toggle |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Memory leaks from animation frames | Phase 1: Implementation | Chrome DevTools Memory tab shows stable heap after 10 mount/unmount cycles |
| Missing prefers-reduced-motion | Phase 1: Implementation | Toggle system setting, particles disable/simplify automatically |
| Main thread blocking | Phase 1: Implementation + Phase 2: Optimization | Lighthouse Performance score >90, scroll FPS >55 during animations |
| Large bundle size | Phase 0: Library Selection | webpack-bundle-analyzer shows particle library <10KB gzipped |
| Z-index conflicts | Phase 1: Implementation | Visual inspection: particles behind all UI, glassmorphic elements render correctly |
| Using abandoned library | Phase 0: Library Selection | GitHub commits in last 3 months, npm downloads trending up |
| Blocking LCP | Phase 2: Optimization | PageSpeed Insights LCP <2.5s, particle library in lazy-loaded chunk |
| Poor mobile performance | Phase 1: Implementation + Phase 2: Optimization | Real device testing on Samsung A-series shows FPS >50, no thermal throttling |

## Sources

### High Confidence (Official Documentation & Current Benchmarks)

- [Comparing the best React animation libraries for 2026 - LogRocket Blog](https://blog.logrocket.com/best-react-animation-libraries/)
- [Accessible Animations in React with "prefers-reduced-motion" - Josh W. Comeau](https://www.joshwcomeau.com/react/prefers-reduced-motion/)
- [Using requestAnimationFrame with React Hooks - CSS-Tricks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/)
- [5 reasons to use tsParticles and not Particles.js - DEV Community](https://dev.to/tsparticles/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)
- [Largest Contentful Paint (LCP) - web.dev](https://web.dev/articles/lcp)
- [prefers-reduced-motion - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

### Medium Confidence (Web Search Verified)

- [Livecoding #14: Mostly-smooth animation up to 4,000 elements with React and canvas - Swizec Teller](https://swizec.com/blog/livecoding-14-mostlysmooth-animation-up-to-4000-elements-with-react-and-canvas/)
- [How to Debug Memory Leaks in React Applications - OneUpTime](https://oneuptime.com/blog/post/2026-01-15-debug-memory-leaks-react-applications/view)
- [JavaScript Particle System: Efficient WebGL Implementation and 2026 Best Practices](https://copyprogramming.com/howto/efficient-particle-system-in-javascript-webgl)
- [JavaScript Particles Background: Complete 2026 Guide with Code Examples](https://copyprogramming.com/howto/javascript-particles-background-js-code-example)
- [SVG vs Canvas Animation: Best Choice for Modern Frontends](https://www.augustinfotech.com/blogs/svg-vs-canvas-animation-what-modern-frontends-should-use-in-2026/)
- [Understanding Success Criterion 2.3.3: Animation from Interactions - W3C WAI](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Reduce bundle size for three.js - React Three Fiber Discussion](https://github.com/pmndrs/react-three-fiber/discussions/812)
- [CSS Backdrop filter causing performance issues - shadcn-ui](https://github.com/shadcn-ui/ui/issues/327)

### Context from Existing Codebase

- .planning/PROJECT.md - Project requirements and constraints
- .planning/codebase/CONCERNS.md - Existing performance and technical debt issues

---
*Pitfalls research for: Particle Animations and High-Tech UI in React Landing Pages*
*Researched: 2026-03-05*
