# Phase 5: Hero Integration - Research

**Researched:** 2026-03-08
**Domain:** Hero section redesign -- layout composition, messaging, CTA updates, spec callout badges, ChipDiagram integration
**Confidence:** HIGH

## Summary

Phase 5 is a composition and layout phase. All building blocks already exist: the ChipDiagram component (Phase 4), animation hooks (Phase 3), CSS keyframes (Phase 3), and chip data (Phase 2/3). The work is replacing the current Hero section's content and layout with new messaging focused on Apple Silicon raw power, integrating the ChipDiagram, adding spec callout badges, and updating CTAs.

The current Hero component (`components/Hero.tsx`) is 223 lines with a `ChipCard` subcomponent showing static M3/M4/M5 cards, an AI Agent Layer section, and a Unified Memory Architecture section. Phase 5 replaces much of this with the ChipDiagram and new messaging. The old `ChipCard` component and its hardcoded data become obsolete -- replaced by the data-driven ChipDiagram.

The translation layer (`i18n/translations/en.ts`) already has hero keys (`t.hero.badge`, `t.hero.titleLine1`, etc.) that must be updated to reflect new messaging. The i18n structure remains unchanged -- only content values change.

**Primary recommendation:** Replace the Hero section content in-place. Remove the old ChipCard component and static infographic. Import and render ChipDiagram in its place. Add spec callout badges as simple Tailwind-styled divs outside the diagram. Update translation strings for headline, subtext, and CTAs. Keep the existing Hero layout shell (background glows, container structure).

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Hero section displays new headline communicating Apple Silicon raw power for AI | Update `t.hero.titleLine1` and `t.hero.titleLine2` in en.ts (and vi.ts). Keep existing `<h1>` structure with `text-gradient` span. |
| HERO-02 | Subtext explains unified memory architecture advantage for local AI agents | Update `t.hero.subtitle` and related keys. The existing `<p>` element with `text-slate-400` styling remains, content changes. |
| HERO-03 | CTA buttons updated to match new visual direction | Existing CTA structure (`<a href="#pricing">` and Zalo link) stays. Update button text via translation keys. Optionally refine styling. |
| HERO-04 | Spec callout badges show key numbers (TOPS, memory bandwidth) prominently | New HTML elements (not SVG) positioned outside/above the ChipDiagram. Use chip data from `chips.ts` for the default M4 variant. Styled as pill badges with Tailwind. |
| HERO-05 | Chip diagram integrated with proper visual hierarchy -- headline/CTAs primary, diagram supports | Import `ChipDiagram` component. Place it below CTAs in the existing layout flow. Remove old ChipCard grid and Agent Layer section. The diagram's `max-w-2xl` keeps it subordinate to the full-width headline. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19 | Component rendering | Already in project |
| Tailwind CSS | CDN | Layout, spacing, typography, responsive design | Already in project, all styling via utility classes |
| ChipDiagram | Phase 4 | SVG chip visualization | Already built and tested |
| i18n translations | en.ts/vi.ts | All user-facing text | Established pattern, all components use `useI18n()` |

### Supporting (from earlier phases)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| chips.ts data | Phase 2/3 | Spec numbers for callout badges | HERO-04: read M4 chip data for TOPS, bandwidth display |
| useI18n hook | Phase 1 | Translation access | All text content in Hero |
| CSS glass-card | index.html | Glass morphism styling | Container backgrounds |
| CSS text-gradient | index.html | Gradient text effect | Headline emphasis |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline spec badges | Extend ChipDiagram to render badges | Couples badge layout to SVG component; badges need flexible HTML positioning |
| Hardcoded spec numbers in badges | Dynamic from chips.ts | Hardcoded is simpler but breaks if data changes; use chips.ts for consistency |
| New i18n key structure | Reuse existing hero keys | Reusing existing key names avoids touching I18nContext; just change values |

**Installation:**
```bash
# No new packages needed. Pure composition of existing components and data.
```

## Architecture Patterns

### Recommended Approach: In-Place Hero Replacement

The Hero component is modified directly. No new files needed beyond updating `Hero.tsx`, `en.ts`, and `vi.ts`.

```
components/
  Hero.tsx               # MODIFIED: new layout with ChipDiagram integration
  ChipDiagram.tsx        # FROM PHASE 4 (imported, not modified)
  data/
    chips.ts             # FROM PHASE 2/3 (read for badge data, not modified)
i18n/translations/
  en.ts                  # MODIFIED: updated hero content strings
  vi.ts                  # MODIFIED: updated hero content strings
```

### Pattern 1: Layout Hierarchy (Headline > CTAs > Diagram)
**What:** Visual hierarchy where headline is largest/boldest, CTAs have prominent placement, and diagram is supporting visual below
**When to use:** The entire Hero section layout
**Example:**
```typescript
// The layout flow preserves hierarchy:
// 1. Badge (small, top)
// 2. Headline (h1, largest text)
// 3. Subtext (p, muted color)
// 4. CTAs (buttons, high contrast)
// 5. Spec callout badges (medium prominence)
// 6. ChipDiagram (visual support, contained width)

<div className="container mx-auto px-6 relative z-10 text-center">
  {/* Badge */}
  <div className="inline-flex ...">...</div>

  {/* Headline - HERO-01 */}
  <h1 className="text-5xl lg:text-8xl font-extrabold text-white mb-6">
    {t.hero.titleLine1}<br />
    <span className="text-gradient">{t.hero.titleLine2}</span>
  </h1>

  {/* Subtext - HERO-02 */}
  <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-400 mb-10">
    {t.hero.subtitle}
  </p>

  {/* CTAs - HERO-03 */}
  <div className="flex ... mb-12">
    <a href="#pricing" className="...">...</a>
    <a href="..." className="...">...</a>
  </div>

  {/* Spec callout badges - HERO-04 */}
  <div className="flex justify-center gap-4 mb-8">
    {/* badges */}
  </div>

  {/* Chip Diagram - HERO-05 */}
  <div className="mt-8 relative max-w-3xl mx-auto">
    <ChipDiagram />
  </div>
</div>
```

### Pattern 2: Spec Callout Badges
**What:** Prominent pill-shaped badges showing key numbers outside the diagram for quick scanning
**When to use:** HERO-04 requirement
**Example:**
```typescript
// Badges are simple HTML, positioned between CTAs and diagram
// They pull data from chips.ts for the currently displayed variant
// But for "quick scanning" they can show the range or max values

// Option A: Static badges showing M4 family highlights
const HERO_SPECS = [
  { label: 'TOPS', value: '38', icon: 'brain/bolt emoji or none' },
  { label: 'Max Bandwidth', value: '546 GB/s', suffix: '' },
  { label: 'Max Memory', value: '128GB', suffix: 'Unified' },
  { label: 'GPU Cores', value: 'Up to 40', suffix: '' },
];

// Rendered as:
<div className="flex flex-wrap justify-center gap-3 mb-8">
  {HERO_SPECS.map(spec => (
    <div key={spec.label} className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
      <span className="text-lg font-bold text-white">{spec.value}</span>
      <span className="text-xs text-slate-400 ml-1">{spec.label}</span>
    </div>
  ))}
</div>
```

### Pattern 3: Removing Old Content Safely
**What:** Delete ChipCard component and old infographic sections while preserving Hero shell
**When to use:** When restructuring Hero.tsx
**What to keep:**
- Background glow divs (absolute positioned blur elements)
- Container structure (`container mx-auto px-6 relative z-10 text-center`)
- Badge at top (green dot + text)
- General dark theme styling

**What to remove:**
- `ChipCard` subcomponent (entire function, ~47 lines)
- Old chip card grid (M3/M4/M5 hardcoded cards)
- AI Agent Layer section
- Connection arrows
- Unified Memory Architecture section (the detailed one with grid)
- Floating glass card decorations (optional -- they add visual clutter with the diagram present)

### Anti-Patterns to Avoid
- **Keeping old ChipCard alongside ChipDiagram:** Redundant. The diagram replaces the static cards entirely.
- **Putting spec badges inside the SVG:** They need to be outside for flexible layout and accessibility. HTML badges are easier to style and are naturally accessible.
- **Breaking translation key names without updating both en.ts and vi.ts:** Always update both files in the same task to avoid runtime errors.
- **Making the diagram the visual centerpiece:** The headline and CTAs must remain dominant. Diagram is supporting material. Constrain diagram width (max-w-2xl or max-w-3xl).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Chip visualization | New SVG/HTML chip display | `ChipDiagram` from Phase 4 | Already built, tested, handles responsive, animations, accessibility |
| Animated numbers | Number animation in Hero | ChipDiagram already has useCountUp | Animations are handled inside ChipDiagram |
| Responsive layout | Custom breakpoint logic | Tailwind responsive utilities (sm:, md:, lg:) | Consistent with entire project |
| Translation | Hardcoded English strings | `useI18n()` + `t.hero.*` keys | Established project pattern |
| Badge data | Hardcoded spec numbers | Import from `chips.ts` or define constant array | Maintainable, single source of truth |

**Key insight:** This phase is 90% content and layout work, 10% component wiring. No new logic or hooks needed.

## Common Pitfalls

### Pitfall 1: Forgetting to Update Both Translation Files
**What goes wrong:** Updating en.ts but not vi.ts (or vice versa) causes missing key errors when switching language.
**Why it happens:** Phase 5 focuses on English messaging; Vietnamese gets overlooked.
**How to avoid:** Always modify both en.ts and vi.ts in the same commit. For vi.ts, placeholder translations are acceptable (the key structure must match).
**Warning signs:** Console errors about missing translation keys when switching language.

### Pitfall 2: Diagram Overwhelming the Headline
**What goes wrong:** The ChipDiagram (with its colorful SVG blocks and animations) draws more attention than the headline.
**Why it happens:** Color and motion naturally attract the eye more than static text.
**How to avoid:** Keep diagram width constrained (max-w-2xl or max-w-3xl within a max-w-5xl container). Ensure headline is text-5xl/lg:text-8xl (very large). Add spacing between CTAs and diagram (mb-12 or more). Consider reducing diagram opacity slightly or using a subtle container.
**Warning signs:** Eye-tracking: when you load the page, your eyes go to the diagram first instead of the headline.

### Pitfall 3: Spec Badge Data Getting Stale
**What goes wrong:** Hardcoded badge values don't match what the ChipDiagram shows for the selected variant.
**Why it happens:** Badges are static but diagram is interactive (variant switching).
**How to avoid:** Two approaches: (A) Badges show the M4 family range/maximum (static, always correct), or (B) Badges react to ChipDiagram's selected variant (requires lifting state). Approach A is simpler and recommended -- badges highlight "up to" values that remain true regardless of selected variant.
**Warning signs:** User selects M4 Max showing 546 GB/s in diagram, but badge says "120 GB/s".

### Pitfall 4: Breaking Existing Hero Tests
**What goes wrong:** If Hero has existing tests, restructuring breaks them.
**Why it happens:** Tests may query for removed elements (ChipCard, Agent Layer).
**How to avoid:** Check for Hero test files first. Currently there are none (`Hero.test.tsx` does not exist), so this is not a risk. New tests should cover the updated structure.
**Warning signs:** Test suite failures after Hero modification.

### Pitfall 5: Z-index Conflicts with Particle Background
**What goes wrong:** ChipDiagram or spec badges appear behind the particle background or other overlays.
**Why it happens:** The project uses CSS custom properties for z-index layers. Content should use `--z-content: 10` or `--z-glass-cards: 15`.
**How to avoid:** The Hero already uses `relative z-10` on its content container. ChipDiagram is inside this container, so it inherits the stacking context. No additional z-index needed.
**Warning signs:** Diagram invisible or partially hidden behind particles.

## Code Examples

### New Headline Content (HERO-01)
```typescript
// en.ts hero section - updated values
hero: {
  badge: 'Apple Silicon AI Infrastructure',
  titleLine1: 'Raw Silicon Power',
  titleLine2: 'For Local AI.',
  subtitle: 'Apple Silicon\'s unified memory architecture lets you run powerful AI models locally -- no cloud, no latency, no data leaving your office.',
  // ... rest of keys
}
```

### Spec Callout Badges (HERO-04)
```typescript
// In Hero.tsx - badges showing M4 family highlights
import { chips } from './data/chips';

// Get M4 Max for "up to" values
const m4Max = chips.find(c => c.id === 'm4-max')!;
const m4Base = chips.find(c => c.id === 'm4-base')!;

const HERO_SPECS = [
  { value: `${m4Base.tops}`, label: 'TOPS' },
  { value: `${m4Max.memoryBandwidth}`, label: 'GB/s' },
  { value: `${m4Max.maxMemory}GB`, label: 'Unified Memory' },
  { value: `${m4Max.gpuCores}`, label: 'GPU Cores' },
];
```

### ChipDiagram Integration (HERO-05)
```typescript
import { ChipDiagram } from './ChipDiagram';

// Inside Hero return, after CTAs:
<div className="mt-12 relative max-w-3xl mx-auto">
  <div className="absolute -inset-10 bg-gradient-to-t from-blue-600/10 to-purple-600/5 rounded-full blur-3xl opacity-30"></div>
  <ChipDiagram className="relative" />
</div>
```

### Vietnamese Translation Stub
```typescript
// vi.ts hero section - key structure must match en.ts
hero: {
  badge: 'Apple Silicon AI Infrastructure',  // Can keep English or translate
  titleLine1: 'Suc Manh Silicon',
  titleLine2: 'Cho AI Noi Bo.',
  subtitle: 'Kien truc bo nho thong nhat cua Apple Silicon cho phep chay cac mo hinh AI manh me ngay tai cho...',
  // ... mirror all en.ts hero keys
}
```

## State of the Art

| Old Approach (current Hero) | New Approach (Phase 5) | Impact |
|---|---|---|
| Static ChipCard with hardcoded M3/M4/M5 | Interactive ChipDiagram from chips.ts data | Dynamic, accurate, user-controllable |
| Generic "Hire AI Employees" messaging | Apple Silicon power messaging | Aligned with v2.0 value proposition |
| Agent Layer + Unified Memory infographic | ChipDiagram + spec callout badges | Simpler, more focused, less DOM |
| 6 agent badges (Sales, Support, etc.) | Removed -- focus on hardware story | Reduces visual noise in Hero |

**Removed from Hero (moved or eliminated):**
- `ChipCard` component -- replaced by `ChipDiagram`
- Agent Layer section -- the agent story is told elsewhere on the page
- Detailed Unified Memory grid -- simplified into the ChipDiagram's memory block

## Open Questions

1. **Exact headline copy**
   - What we know: Must communicate "Apple Silicon raw power for AI infrastructure"
   - What's unclear: Exact English/Vietnamese wording
   - Recommendation: Use placeholder copy in implementation, refine later. Suggested: "Raw Silicon Power / For Local AI."

2. **Should spec badges be interactive (update when diagram variant changes)?**
   - What we know: HERO-04 says "prominently display key numbers." HERO-05 says diagram is "supporting" (subordinate).
   - What's unclear: Whether badges should react to tab clicks in ChipDiagram.
   - Recommendation: Keep badges static showing M4 family highlights ("38 TOPS", "up to 546 GB/s"). This avoids coupling Hero state to ChipDiagram state and keeps badges as "quick scan" anchors.

3. **Keep or remove floating glass card decorations?**
   - What we know: Current Hero has two `hidden lg:block` floating cards with `animate-float`.
   - What's unclear: Whether they complement or compete with the ChipDiagram visually.
   - Recommendation: Remove them. The ChipDiagram provides enough visual interest. The floating cards were placeholder decoration.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run components/Hero.test.tsx --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero renders new headline text (from translation keys) | unit | `npx vitest run components/Hero.test.tsx -x` | Wave 0 |
| HERO-02 | Hero renders subtext about unified memory architecture | unit | `npx vitest run components/Hero.test.tsx -x` | Wave 0 |
| HERO-03 | CTA buttons render with updated text and href attributes | unit | `npx vitest run components/Hero.test.tsx -x` | Wave 0 |
| HERO-04 | Spec callout badges display TOPS and bandwidth numbers | unit | `npx vitest run components/Hero.test.tsx -x` | Wave 0 |
| HERO-05 | ChipDiagram component renders within Hero section | unit | `npx vitest run components/Hero.test.tsx -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `components/Hero.test.tsx` -- covers HERO-01 through HERO-05 (file does not exist yet)
- [ ] Mock for `ChipDiagram` component (mock as simple div to isolate Hero tests)
- [ ] Mock for `useI18n` hook (already patterned in existing tests like `I18nContext.test.tsx`)

### Test Strategy Notes
- Mock `ChipDiagram` at module level (`vi.mock('./ChipDiagram', ...)`) to render a simple placeholder. This isolates Hero layout tests from ChipDiagram internals (which are already tested in `ChipDiagram.test.tsx`).
- Mock `useI18n` to return known translation values for assertion.
- Test spec badges by querying for expected text content (TOPS value, bandwidth value).
- Test CTA buttons by querying for link elements with expected href values.
- Test `ChipDiagram` presence by checking the mocked element renders in the DOM.

## Sources

### Primary (HIGH confidence)
- Project codebase: `components/Hero.tsx` (current implementation, 223 lines)
- Project codebase: `components/ChipDiagram.tsx` (Phase 4 output, 170 lines)
- Project codebase: `components/data/chips.ts` (M4 variant data with tops field)
- Project codebase: `i18n/translations/en.ts` (current hero translation keys)
- Project codebase: `index.html` (CSS classes: glass-card, text-gradient, animation keyframes)
- `.planning/phases/04-svg-chip-diagram/04-RESEARCH.md` (ChipDiagram API and patterns)
- `.planning/REQUIREMENTS.md` (HERO-01 through HERO-05 definitions)

### Secondary (MEDIUM confidence)
- None needed -- this phase is pure composition of existing project code

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all components and libraries already exist in the project
- Architecture: HIGH - straightforward layout composition; Hero.tsx structure is well understood
- Pitfalls: HIGH - pitfalls are project-specific and verified against the codebase
- Content/copy: MEDIUM - exact headline wording is a creative decision, not a technical one

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable project -- no external dependencies changing)
