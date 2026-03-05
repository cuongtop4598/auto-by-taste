# Stack Research

**Domain:** React Particle Animations & High-Tech Visual Effects
**Researched:** 2026-03-05
**Confidence:** MEDIUM-HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| @tsparticles/react | ^3.0.0 | React wrapper for tsParticles particle system | Official React integration for the most actively maintained particle library (particles.js successor). Modular architecture allows importing only needed features. 30M+ monthly downloads. |
| @tsparticles/slim | ^3.0.0 | Slim bundle with most-used particle features | Contains particle links interaction for neural network style connections. Lighter than full bundle while including all essential features (connect, grab, links, collisions). ~60KB gzipped. |
| @tsparticles/engine | ^3.0.0 | Core engine and TypeScript types | Required dependency providing ISourceOptions, Engine, and Container types. Essential for TypeScript projects. |
| framer-motion | ^12.34.5 | UI component animations and transitions | Industry standard for React animations (30M+ downloads/month). Hybrid engine runs at 120fps via Web Animations API. React 19 compatible with v11+ improvements for concurrent rendering. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tsparticles/interaction-particles-links | Included in slim | Creates connection lines between particles | Already bundled in @tsparticles/slim. Essential for neural network visualization style requested. |
| canvas-confetti | ^1.9.x | Lightweight confetti/particle effects | Alternative for simple, one-off particle bursts without full particle system. 8KB library if tsparticles overhead isn't needed. |
| @react-three/fiber | ^9.x | React renderer for Three.js | Only if 3D WebGL effects needed beyond 2D particles. Pairs with react@19. Heavy dependency (~180KB), avoid for landing pages unless 3D is critical. |
| @react-three/drei | ^10.7.7 | Three.js helper components | Only with react-three-fiber. Provides LOD optimization (30-40% FPS improvement). Not recommended for landing page—use Canvas 2D instead. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vite | Build tool and dev server | Already in use. Fast HMR for particle config iteration. |
| TypeScript | Type safety for particle configs | Already in use. @tsparticles/engine provides full type definitions. |
| Webpack Bundle Analyzer | Bundle size monitoring | Critical for landing pages. Target <200KB gzipped total. Particles add ~60-120KB. |

## Installation

```bash
# Core particle system (recommended approach)
npm install @tsparticles/react @tsparticles/slim @tsparticles/engine

# Animation library for UI elements (glass cards, transitions)
npm install framer-motion

# Optional: lightweight alternative for simple effects
npm install canvas-confetti

# Dev: bundle size analysis
npm install -D webpack-bundle-analyzer
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| @tsparticles/slim | @tsparticles/all (full bundle) | Only if you need advanced features like text shapes, emoji shapes, or complex presets. Adds ~40KB more. |
| @tsparticles/react 3.x | react-particles-js | Never. Deprecated 3+ years ago in favor of @tsparticles/react. |
| Canvas 2D particles | React Three Fiber + WebGL | Only for true 3D visualizations or 100K+ particle counts. Massive bundle size (180KB+) and performance overhead inappropriate for landing pages. |
| framer-motion | CSS animations + requestAnimationFrame | Simple fade/slide transitions. Hand-coded RAF for custom particle physics if avoiding libraries entirely. |
| tsparticles | Vanta.js | If you want pre-built 3D backgrounds (WAVES, BIRDS, NET effects). Warning: 120KB+ bundle, slow on mobile, not all effects work on mobile. |
| tsparticles | Custom canvas-particle-network | Building from scratch for learning or extremely custom needs. canvas-particle-network library exists but unmaintained. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| particles.js | Abandoned 5+ years ago. No updates, no React 19 support, security vulnerabilities. | @tsparticles/* (fully backward compatible with particles.js configs) |
| react-particles-js | Deprecated wrapper. Last publish 3+ years ago. Uses old particles.js core. | @tsparticles/react (official, actively maintained) |
| @tsparticles/basic | Too minimal—missing particle links needed for neural network style. Only includes moving dots. | @tsparticles/slim (includes links, connections, grab interactions) |
| Vanta.js | 120KB bundle, WebGL-based, slow on older devices, not all effects work on mobile. Overkill for landing page. | @tsparticles/slim for 2D effects, or custom Canvas if performance critical |
| Three.js direct usage | Requires manual scene setup, camera, renderer. High complexity for simple particle background. | react-three-fiber if 3D needed, or @tsparticles for 2D |
| transform: translateZ(0) hack | Old GPU acceleration trick. Modern browsers optimize automatically. Can cause excess layer promotion and memory issues. | Use will-change sparingly on animated elements only, or let browser optimize |

## Stack Patterns by Variant

**For neural network particle background (your use case):**
- Use @tsparticles/react + @tsparticles/slim
- Enable particle links interaction (included in slim)
- Configure particles with links.enable: true, links.distance: 150, particles.number.value: 80-150
- Because slim bundle includes everything needed, stays under 100KB, and handles 60fps at reasonable particle counts

**For glass morphism UI animations:**
- Use framer-motion for component transitions
- Use CSS backdrop-filter for glass effect (GPU accelerated)
- Use will-change: transform on elements during animation only
- Because framer-motion handles React 19 concurrent rendering, integrates with existing components, and motion.div is declarative

**For high particle counts (500+ particles):**
- Reduce particles on mobile: detect viewport width, use 50-80 particles on mobile vs 150-200 on desktop
- Use requestAnimationFrame for custom physics if tsparticles FPS drops
- Consider WebGL via react-three-fiber if truly need 1000+ particles
- Because Canvas 2D starts struggling above 300-500 particles depending on device

**For minimal bundle size (<50KB particles):**
- Use canvas-confetti for occasional effects
- Or hand-code Canvas 2D particle system with requestAnimationFrame
- Skip tsparticles entirely
- Because tsparticles adds 60-120KB even with slim bundle

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| @tsparticles/react@3.x | React 19.x | Fully compatible. Version 3.0 released 2 years ago, stable. |
| @tsparticles/slim@3.x | @tsparticles/engine@3.x | Must match major version. Install both from @tsparticles/* namespace. |
| framer-motion@12.x | React 19.x | Compatible. Earlier v11 had React 19 issues, now resolved. |
| @react-three/fiber@9.x | React 19.x | Pairs with React 19. v8 was for React 18. |
| @react-three/drei@10.x | @react-three/fiber@9.x | Must match. Drei depends on fiber version. |

## Performance Considerations

**Bundle Size Impact:**
- @tsparticles/react + slim + engine: ~60-80KB gzipped
- framer-motion: ~40KB gzipped
- Total animation stack addition: ~100-120KB
- Existing React app baseline: ~150KB
- New total: ~250-270KB (acceptable for landing page if tree-shaken)

**Runtime Performance:**
- Target 60fps on mid-range mobile devices
- Canvas 2D particles: 100-300 particles at 60fps (device dependent)
- WebGL particles: 500-2000 particles at 60fps (but larger bundle)
- Use transform animations (GPU accelerated), avoid width/height animations (trigger reflow)
- requestAnimationFrame automatically throttles to device refresh rate (60Hz/120Hz)

**Loading Strategy:**
- Lazy load particle background after initial paint (wrap in dynamic import)
- Disable particles on slow devices (detect via connection quality or device memory API)
- Use Vite code splitting to separate particle system from critical path

**GPU Acceleration:**
- CSS transform, opacity, filter are hardware accelerated by default
- will-change: transform on actively animating elements (remove after animation)
- Avoid will-change on too many elements (causes excess memory, GPU layers)
- backdrop-filter for glass morphism (GPU accelerated but can be expensive—test performance)

## Integration with Existing Stack

**Current Stack Compatibility:**
- React 19.2.4: Fully compatible with all recommended libraries
- Vite 6.2.0: Excellent tree-shaking for @tsparticles modular packages
- Tailwind CSS: Works alongside particle canvas (position: fixed background)
- Recharts: No conflicts, particles render as background layer

**Implementation Strategy:**
1. Install @tsparticles/react, @tsparticles/slim, @tsparticles/engine
2. Create ParticleBackground component with useEffect initialization
3. Use loadSlim(engine) to load slim bundle features
4. Configure particles.options with links enabled for neural network style
5. Position as fixed background (z-index below content)
6. Add framer-motion to existing components for UI animations
7. Use motion.div for glass cards, transitions

## Sources

**HIGH Confidence:**
- [tsParticles GitHub](https://github.com/tsparticles/tsparticles) — Official repository, version info, active maintenance (196 commits, 3 open issues)
- [@tsparticles/react npm](https://www.npmjs.com/package/@tsparticles/react) — Version 3.0.0 confirmed, installation instructions
- [@tsparticles/slim npm](https://www.npmjs.com/package/@tsparticles/slim) — Bundle contents, includes particle links interaction
- [framer-motion npm](https://www.npmjs.com/package/framer-motion) — Version 12.34.5 (published 19 hours ago), 30M+ downloads/month
- [Motion.dev React docs](https://motion.dev/docs/react) — React 19 compatibility confirmed, 120fps performance via Web Animations API
- [tsParticles deprecation notice](https://dev.to/tsparticles/tsparticles-1372-released-react-particles-js-deprecation-notice-1g7k) — react-particles-js deprecated in favor of @tsparticles/react

**MEDIUM Confidence:**
- [React animation libraries 2026 comparison](https://blog.logrocket.com/best-react-animation-libraries/) — Industry overview, library popularity
- [WebGL particle systems best practices](https://copyprogramming.com/howto/efficient-particle-system-in-javascript-webgl) — Performance benchmarks (100K-500K particles for WebGL2, 500K-2M for WebGPU)
- [GPU acceleration CSS guide](https://www.lexo.ch/blog/2025/01/boost-css-performance-with-will-change-and-transform-translate3d-why-gpu-acceleration-matters/) — will-change and transform best practices
- [canvas-particle-network GitHub](https://github.com/JulianLaval/canvas-particle-network) — Simple Canvas 2D particle network implementation

**LOW Confidence (WebSearch only):**
- Bundle size targets (<200KB gzipped for landing pages) — general industry practice, not specific to this stack
- Particle count recommendations (80-150 for neural network style) — based on CodePen examples and community discussions, not official benchmarks

---
*Stack research for: React Particle Animations & High-Tech Visual Effects*
*Researched: 2026-03-05*
*Context: Adding animated particle backgrounds (neural network visualization style) to existing React 19 + Vite + Tailwind landing page*
