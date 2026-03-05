# Feature Research

**Domain:** High-tech AI/Hardware Landing Page with Mac Compatibility Checker
**Researched:** 2026-03-05
**Confidence:** MEDIUM-HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Animated particle/neural network background | Industry standard for high-tech/AI landing pages in 2026; users expect visual sophistication | MEDIUM | Must not impact performance; 10-20px blur radius typical; GPU-accelerated |
| Glassmorphism UI (frosted glass effect) | Defining aesthetic for tech landing pages in 2026; conveys modernity and sophistication | LOW-MEDIUM | 10-40% opacity, blur radius 10-20px; already partially implemented |
| Dark mode with proper contrast | Tech products expected to default to dark themes; light mode often secondary | LOW | Already present; ensure all new components maintain dark theme |
| Hardware specification selector | Mac compatibility checkers require model/spec selection as primary interaction | MEDIUM | Dropdown/visual selector for Mac models (M1/M2/M3/M4 variants) |
| Visual performance data display | Users expect to see benchmarks, speeds, capabilities in graphical format | MEDIUM | Token speeds, inference benchmarks, RAM utilization charts |
| Mobile responsive design | 50%+ traffic from mobile; non-responsive = immediate bounce | MEDIUM | Glass effects and particles must work on mobile without performance degradation |
| Trust indicators (social proof) | Landing pages without testimonials/logos/certifications feel incomplete | LOW | Privacy badges, client logos, security indicators for local AI benefits |
| Clear CTA (Call to Action) | Every section needs obvious next step; Zalo integration already present | LOW | Already implemented; maintain visibility throughout |
| Fast load times (<3s) | Users expect instant page loads; particles and animations can't block rendering | HIGH | Progressive loading, lazy loading for heavy components |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable for competitive positioning.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Interactive Mac model selector with real-time AI model filtering | Users pick their Mac → instantly see which AI models work | MEDIUM-HIGH | "Pick Mac model, see compatible AI" - reverse of current flow; unique value prop |
| Unified Memory Architecture visualization | Explains Apple Silicon advantage visually; educates while selling | MEDIUM | Interactive infographic showing UMA vs traditional architecture; memory bandwidth comparisons (M1 Max: 400GB/s vs Intel: 41.6GB/s) |
| Live token speed simulation | Show actual typing speed of AI inference for different models/hardware combinations | HIGH | Real-time animation of token generation at realistic speeds (10-20 t/s chat, 50-70 t/s coding) |
| M-series chip generation comparison matrix | Side-by-side specs: CPU cores, GPU cores, RAM capacity, Neural Engine performance | MEDIUM | M1 (8 CPU, 7-8 GPU, 16GB) → M2 (8 CPU, 8-10 GPU, 24GB) → M3 (3nm, 30-40 GPU) → M4 (16 CPU, 64GB, 273GB/s) |
| Privacy calculator | "Cloud AI costs X/month + your data. Local AI costs 0 + keeps data private" | MEDIUM | Cost comparison widget; emphasizes data privacy unique to local AI |
| GPU computing theme throughout | Consistent visual metaphor of parallel processing, GPU cores, neural acceleration | LOW-MEDIUM | Already aligned with brand; extend to all sections |
| Liquid/fluid micro-interactions | 2026 trend: glassmorphism + fluid animations on hover/click | MEDIUM | Enhance glass cards with subtle liquid morphing effects |
| Model recommendation engine | Answer 3 questions → get Mac + AI model recommendation | HIGH | "What's your use case?" → "How many users?" → "Budget?" → Recommendation |
| Benchmark heatmaps | Visual representation of performance across Mac models and AI workloads | MEDIUM | Scrollmaps/heatmaps showing where different models excel |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems or distract from core value.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Every section with heavy 3D animations | "Make it look futuristic" | Performance killer; accessibility nightmare; distracts from content | Use particles sparingly; glassmorphism provides "tech" feel without performance cost |
| Real-time cloud pricing comparison API | "Show live competitor prices" | API dependencies; price changes break page; maintenance burden | Static comparison with "as of [date]" disclaimer; manual updates quarterly |
| Video backgrounds on hero section | "Make it more dynamic" | Massive bandwidth; slow load times; accessibility issues; mobile performance killer | Particle animation background provides motion without video weight |
| Dropdown for every Mac model variant | "Show every possible configuration" | 50+ Mac variants = overwhelming choice paralysis | Group by chip generation (M1/M2/M3/M4) with RAM tiers; keep it under 12 options |
| Auto-playing demo videos | "Show the product in action" | Users hate auto-play; bandwidth waste; distraction from reading | Click-to-play videos; or animated SVG/Lottie demonstrations |
| Real-time hardware detection | "Detect user's Mac automatically" | Privacy concerns; unreliable detection; desktop-only; complexity | Manual selection with visual Mac model picker; more reliable and universal |
| Chatbot on every page | "AI product needs AI chat" | Distracting; users know it's limited; Zalo integration already provides human contact | Keep Zalo floating button; add FAQ section instead |
| Parallax scrolling everywhere | "Make it feel premium" | Motion sickness; performance issues; mobile problems; accessibility concerns | Subtle fade-in animations on scroll; reserve parallax for one hero section max |

## Feature Dependencies

```
[Mac Model Selector]
    └──requires──> [Hardware Specs Database]
                       └──requires──> [AI Model Compatibility Matrix]

[Token Speed Visualization]
    └──requires──> [Performance Benchmark Data]
    └──requires──> [Animation Engine (Canvas/WebGL)]

[Particle Background]
    └──requires──> [Performance Monitoring]
    └──enhances──> [Glassmorphism UI] (particles visible through glass)

[Unified Memory Visualization]
    └──enhances──> [Mac Model Selector] (explains why specs matter)
    └──requires──> [Interactive SVG/Animation Library]

[Privacy Calculator]
    └──requires──> [Cost Data] (cloud pricing, Mac prices)
    └──enhances──> [Trust Indicators] (reinforces privacy value prop)

[Mobile Responsive Design]
    └──conflicts──> [Complex 3D Animations] (performance)
    └──requires──> [Conditional Feature Loading] (disable heavy features on mobile)

[Glassmorphism UI]
    └──requires──> [Backdrop Filter Support Check] (fallback for older browsers)
    └──conflicts──> [Light Mode] (glass effect optimized for dark backgrounds)
```

### Dependency Notes

- **Mac Model Selector requires Hardware Specs Database:** Cannot display compatible models without structured data about Mac specifications (chip, RAM, GPU cores, Neural Engine).
- **Token Speed Visualization requires Animation Engine:** Canvas or WebGL needed for smooth, performant character-by-character animation at 10-100 tokens/second.
- **Particle Background enhances Glassmorphism UI:** Particles behind frosted glass create depth and "neural network" tech aesthetic.
- **Mobile Responsive Design conflicts with Complex 3D Animations:** Heavy animations cause mobile browsers to lag; need conditional loading or simplified mobile versions.
- **Unified Memory Visualization enhances Mac Model Selector:** Explains WHY RAM matters differently on Apple Silicon (shared between CPU/GPU/Neural Engine).
- **Privacy Calculator requires Cost Data:** Needs current cloud AI pricing (OpenAI, Anthropic) and Mac hardware costs to calculate ROI.

## MVP Definition

### Launch With (v1 - Current Milestone)

Minimum viable feature set to validate the enhanced landing page concept.

- [x] **Particle/neural network animated background** - Core visual differentiator; defines "high-tech" aesthetic
- [x] **Enhanced glassmorphism across all sections** - Consistent modern UI; already partially implemented
- [ ] **Mac model selector (forward flow: Mac → AI models)** - Essential for "see what your Mac can run" value prop
- [ ] **M-series chip comparison section** - Educates users on M1/M2/M3/M4 differences; informs hardware decisions
- [ ] **Unified Memory Architecture explainer** - Core educational content explaining Apple Silicon advantage
- [ ] **Performance data visualization** - Show token speeds, benchmark comparisons; makes capabilities tangible
- [ ] **Mobile optimization for new features** - Ensure particles and glass effects work on mobile without lag
- [ ] **Trust indicators for local AI privacy** - Security badges, privacy certifications, data locality messaging

**Why these are essential:** These features directly address the project's core value proposition (local AI on Apple Silicon) and meet 2026 design expectations for high-tech landing pages.

### Add After Validation (v1.x)

Features to add once core Mac selector and visual enhancements are proven.

- [ ] **Interactive Mac selector (reverse flow: AI model → Mac recommendations)** - Trigger: Users asking "what Mac do I need for model X?"
- [ ] **Live token speed simulation** - Trigger: Users want to see actual inference speed, not just numbers
- [ ] **Privacy/cost calculator widget** - Trigger: Users questioning ROI of local vs cloud AI
- [ ] **Model recommendation engine** - Trigger: Users expressing confusion about which AI model to choose
- [ ] **Liquid/fluid micro-interactions** - Trigger: After core features stable; polish phase
- [ ] **Benchmark heatmaps** - Trigger: Power users wanting detailed performance comparisons

### Future Consideration (v2+)

Features to defer until product-market fit is established and landing page traffic validates demand.

- [ ] **GPU core utilization visualization** - Why defer: Complex, niche audience (developers only)
- [ ] **Neural Engine performance deep-dive** - Why defer: Most users don't understand Neural Engine; education content better elsewhere
- [ ] **Interactive 3D Mac model showcase** - Why defer: High development cost, minimal conversion impact, performance risk
- [ ] **A/B testing infrastructure** - Why defer: Need baseline traffic first; premature optimization
- [ ] **Multi-language support** - Why defer: Currently Vietnamese only; expand after local market validation
- [ ] **Admin CMS for updating specs** - Why defer: Static data sufficient for MVP; low update frequency

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Particle/neural network background | HIGH | MEDIUM | P1 |
| Glassmorphism UI enhancement | HIGH | LOW-MEDIUM | P1 |
| Mac model selector (forward flow) | HIGH | MEDIUM | P1 |
| M-series chip comparison | HIGH | LOW | P1 |
| Unified Memory visualization | MEDIUM-HIGH | MEDIUM | P1 |
| Performance data display | HIGH | MEDIUM | P1 |
| Mobile optimization | HIGH | MEDIUM | P1 |
| Trust indicators (privacy focus) | MEDIUM | LOW | P1 |
| Interactive selector (reverse flow) | MEDIUM-HIGH | HIGH | P2 |
| Token speed simulation | MEDIUM | HIGH | P2 |
| Privacy/cost calculator | MEDIUM | MEDIUM | P2 |
| Liquid micro-interactions | LOW-MEDIUM | MEDIUM | P2 |
| Model recommendation engine | MEDIUM | HIGH | P2 |
| Benchmark heatmaps | MEDIUM | MEDIUM | P2 |
| GPU core visualization | LOW | HIGH | P3 |
| Neural Engine deep-dive | LOW | MEDIUM | P3 |
| 3D Mac model showcase | LOW | HIGH | P3 |
| A/B testing infrastructure | LOW | HIGH | P3 |
| Multi-language support | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for current milestone - essential for "high-tech AI landing page with Mac search" goal
- P2: Should have after P1 validated - enhances value prop but not blocking launch
- P3: Nice to have for future - deferred until traffic validates demand

## Competitor Feature Analysis

| Feature | Apple (apple.com/mac-studio) | Hugging Face (HF Spaces) | Our Approach |
|---------|------------------------------|--------------------------|--------------|
| Hardware selector | Clean dropdown, visual product cards | No hardware selection; model-centric | Hybrid: visual Mac cards + AI model filtering |
| Performance visualization | Static specs tables, no charts | Benchmark leaderboards (text) | Interactive charts (already have Recharts) + token speed simulations |
| Background design | Clean, minimal, product photos | White/minimal, no animations | Neural network particles + glassmorphism = differentiated tech aesthetic |
| Educational content | Marketing copy, feature lists | Technical docs, model cards | Visual explainers (UMA diagram, chip comparisons) - middle ground |
| Mobile experience | Excellent, responsive | Good, text-heavy | Must match Apple quality; particles work on mobile |
| Trust indicators | Brand itself = trust | Community votes, downloads | Emphasize privacy (local AI), security badges, no data leaves device |
| Call to action | "Buy" buttons | "Try model" buttons | Zalo consultation (service model, not product sale) |
| Technical depth | Surface-level specs | Deep technical (model architectures) | Middle ground: enough to inform decision without overwhelming |

## Real-World Implementation Notes

### Particle Animation Best Practices (2026)

Based on research, particle animations should:
- Use Canvas or WebGL for performance (not DOM manipulation)
- Limit to 50-150 particles on desktop, 20-50 on mobile
- Implement frame throttling (target 30fps for particles, not 60fps)
- Provide "reduce motion" accessibility option
- Use `requestAnimationFrame` for smooth animation
- Lazy load particle engine after critical content renders

**Libraries to consider:** particles.js, tsparticles, or custom Canvas implementation

### Glassmorphism Technical Implementation (2026)

From research, optimal glassmorphism settings:
- `backdrop-filter: blur(10-20px)` - standard range
- `background: rgba(255,255,255,0.1-0.4)` - opacity between 10-40%
- `border: 1px solid rgba(255,255,255,0.1-0.2)` - subtle border
- Fallback for Safari/older browsers: solid semi-transparent background
- Avoid glass effect on text containers (readability issues)

**Already implemented:** Project uses `.glass-card` class; extend to new sections

### Mac Model Selection UX

Research shows dropdown best practices:
- Keyboard navigation (arrow keys, Enter, Escape)
- Type-ahead search for >10 options
- Visual state indicators (open/closed/selected)
- Group by category (M1 family, M2 family, M3, M4)
- Show key specs in dropdown (8GB / 16GB / 32GB, not just model name)

**Recommended:** Visual card selector rather than plain dropdown for better UX

### Performance Metrics Display

Research indicates users expect:
- Tokens per second (t/s) as primary metric
- Time to first token (TTFT) for responsiveness perception
- Use case context: "Chat: 10-20 t/s" "Coding: 50-70 t/s" "Analysis: 100+ t/s"
- Visual comparison (bar charts, speedometers) not just numbers
- Real-world examples: "Generate email response in 2 seconds"

**Current capability:** Recharts already implemented; extend for benchmark data

## Sources

**High-tech AI Landing Page Features:**
- [AI Landing Page Generator 2026: 15 Best Tools](https://www.nxcode.io/resources/news/ai-landing-page-generator-2026)
- [Best Landing Page Design Trends for 2026](https://www.moburst.com/blog/landing-page-design-trends-2026/)
- [10 Best Landing Page Designs in 2026](https://www.thethunderclap.com/blog/best-landing-page-designs)
- [Landing Page Conversions 2026](https://www.b12.io/resource-center/website-conversions/things-to-add-to-your-landing-page-for-more-conversions-2026/)

**Mac Hardware Compatibility:**
- [macOS Compatibility Guide](https://setapp.com/how-to/macos-compatibility-guide)
- [Mac Specs, Prices, Comparison: EveryMac.com](https://everymac.com/)
- [Macworld Compatibility Guide](https://www.macworld.com/article/673697/what-version-of-macos-can-my-mac-run.html)

**Apple Silicon AI Features:**
- [Ollama on Mac Silicon: Local AI for M-Series Macs](https://johnwlittle.com/ollama-on-mac-silicon-local-ai-for-m-series-macs/)
- [Benefits of Using a Mac with Apple Silicon for AI](https://mbsdirect.com/featured-solutions/apple-for-business/benefits-of-apple-silicon-for-artificial-intelligence)
- [Apple Intelligence Device Compatibility Guide](https://macreview.com/apple-intelligence-full-device-compatibility-guide/)
- [Apple M5 Performance Announcement](https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/)

**Particle Animation Examples:**
- [Free Template 597 Neural Glass](https://templatemo.com/tm-597-neural-glass)
- [10 Beautiful Examples of Particle Animation in Web Design](https://speckyboy.com/particle-animation-code-snippets/)
- [Best Particles Animation JavaScript Libraries (2026)](https://www.cssscript.com/best-particles-animation/)

**UI/UX Best Practices:**
- [Dropdown Menu UI: Best Practices](https://www.eleken.co/blog-posts/dropdown-menu-ui)
- [10 UX Best Practices to Follow in 2026](https://uxpilot.ai/blogs/ux-best-practices)
- [Best Practices for Designing Selection Controls](https://app.uxcel.com/courses/ui-components-n-patterns/selection-controls-best-practices-324)

**Apple M-Series Specifications:**
- [M1 vs M2 vs M3 vs M4 vs M5 - Low End Mac](https://lowendmac.com/2025/m1-vs-m2-vs-m3-vs-m4-vs-m5/)
- [Apple M-series Chips Explained](https://www.simplymac.com/macbooks/apple-m-series-chips-explained)
- [Apple Chip Comparison (March 2026)](https://www.ofzenandcomputing.com/apple-chip-comparison/)

**Glassmorphism Design:**
- [UI Design Trend 2026: Glassmorphism and Liquid Design](https://medium.com/design-bootcamp/ui-design-trend-2026-2-glassmorphism-and-liquid-design-make-a-comeback-50edb60ca81e)
- [10 Mind-Blowing Glassmorphism Examples For 2026](https://onyx8agency.com/blog/glassmorphism-inspiring-examples/)
- [What is Glassmorphism? Modern UI Design Explained](https://www.designstudiouiux.com/blog/what-is-glassmorphism-ui-trend/)
- [Dark Glassmorphism: The Aesthetic That Will Define UI in 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)

**Unified Memory Architecture:**
- [What is Unified Memory on Apple Silicon](https://www.xda-developers.com/apple-silicon-unified-memory/)
- [Understanding Unified Memory: The Heart of Apple Silicon Performance](https://www.oreateai.com/blog/understanding-unified-memory-the-heart-of-apple-silicon-performance/f823502bc538249b90a052e79a3caa3a)
- [Understanding Apple's Unified Memory Architecture](https://www.macobserver.com/analysis/understanding-apples-unified-memory-architecture/)

**LLM Performance Metrics:**
- [LLM Token Generation Speed Simulator & Benchmark](https://kamilstanuch.github.io/LLM-token-generation-simulator/)
- [Beyond Tokens-per-Second: Speed, Cost, and Quality in LLM Inference](https://www.bentoml.com/blog/beyond-tokens-per-second-how-to-balance-speed-cost-and-quality-in-llm-inference)
- [Key metrics for LLM inference](https://bentoml.com/llm/inference-optimization/llm-inference-metrics)

---
*Feature research for: Auto By Taste - High-tech AI Landing Page with Mac Compatibility Checker*
*Researched: 2026-03-05*
*Confidence: MEDIUM-HIGH (Context7 not available for this domain; relied on WebSearch verified with multiple sources and official documentation)*
