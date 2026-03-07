# Research Summary: React i18n for Landing Page

**Project:** AI-Local Hub Landing Page - English/Vietnamese Internationalization
**Researched:** 2026-03-07
**Status:** Ready for Requirements Definition

---

## Executive Summary

Adding internationalization (i18n) to a React 19 + Vite landing page for EN/VI bilingual support should use **React Context API with no additional libraries**. This approach delivers all required functionality (language switching, localStorage persistence, SEO compliance) with zero bundle overhead and minimal implementation complexity. The research confirms this is a low-risk, well-understood pattern suitable for simple landing pages with 2 languages and <50 translation keys.

The recommended implementation spans 4 implementation phases: (1) translation file setup, (2) Context system creation, (3) component integration, and (4) polish and validation. Total estimated effort is 5-6 hours with HIGH confidence that all technical decisions are sound and follow established React patterns. Critical success factors include updating the HTML lang attribute during language switches (accessibility/SEO requirement), preventing Context re-render thrashing via memoization, and establishing validation to ensure English and Vietnamese translation files stay synchronized.

---

## Key Findings

### From STACK.md: Recommended Technology

**Primary Choice: React Context API (0 bytes bundle impact)**
- Use existing React 19.2.4 built-in Context for language state management
- Leverage native browser localStorage API for persistence (no library needed)
- Leverage existing TypeScript 5.8.2 for type-safe translations
- **Rationale:** Zero dependencies, zero bundle bloat, sufficient for 2 languages, proven pattern

**Why NOT heavy libraries:**
- react-i18next: 22.2 KB total (15.1 KB i18next + 7.1 KB react-i18next) — 10-100x overkill
- react-intl: 17.8 KB — designed for enterprise TMS workflows, not simple landing pages
- LinguiJS: 10.4 KB — great for large apps but adds build complexity for this use case
- **Confidence:** HIGH (bundle sizes verified, React 19 compatibility confirmed)

**Fallback Options (if Context Proves Insufficient):**
1. rosetta (~1.3 KB) — if need more languages or basic formatting
2. typesafe-i18n (~3-5 KB) — if type safety becomes critical at scale
3. LinguiJS (~10 KB) — only if complex formatting (dates, plurals) needed

---

### From FEATURES.md: What to Build

**Table Stakes (Must Have) — 5-6 hours total effort:**
1. Basic string translation (hardcoded strings → translation keys)
2. Language switcher UI (EN | VI toggle in navbar)
3. Language persistence (localStorage survives page refresh)
4. Context preservation (switching languages keeps user on same page/section)
5. HTML lang attribute on `<html>` (SEO + accessibility requirement)
6. Fallback language (English as default)
7. Variable interpolation (dynamic values like {{name}}, {{count}})

**Nice-to-Have Differentiators:**
- Browser language detection (auto-detect Vietnamese for VI users, but offer override)
- Number/currency formatting (Intl.NumberFormat for pricing tiers)
- Trans component for mixed content (if translations need embedded links)
- Type-safe translation keys (TypeScript enforcement, can add later)

**Explicitly Out of Scope (Defer to v2+):**
- Lazy loading translations (2 languages × small file = unnecessary)
- Namespace splitting (9 components don't need organization overhead)
- Pluralization rules (add only if displaying counts)
- Date formatting (not needed for marketing landing page)
- URL-based routing (/en/, /vi/) — adds significant complexity, explicitly rejected per PROJECT.md
- Heavy i18n library — bundle size sensitive, no benefit for static content
- TMS (Translation Management System) integration — overkill for hardcoded translations
- RTL support — only for Arabic/Hebrew, not EN/VI

---

### From ARCHITECTURE.md: Build Pattern and Component Boundaries

**Recommended Architecture Pattern: Custom Context-Based i18n**

```
index.html (root)
  ↓
index.tsx (React entry, wraps with I18nProvider)
  ↓
I18nProvider (manages language state, loads localStorage, syncs HTML lang)
  ├─ Navbar (language toggle: EN | VI buttons)
  ├─ Hero (uses t('hero.title'), t('hero.subtitle'), etc.)
  ├─ Product Tiers (uses t('pricing.*'))
  └─ Other Components (9 total, all consume I18nContext)
```

**5 Core Components to Build:**

1. **Translation Data Layer** (`src/i18n/translations/`)
   - `en.ts` — English translation object
   - `vi.ts` — Vietnamese translation object
   - Structure: 2-3 levels max (e.g., `hero.title`, `hero.ctaPrimary`, `pricing.tier1.name`)
   - Type-safe definition of shape prevents mismatches

2. **I18n Context Layer** (`src/contexts/I18nContext.tsx`)
   - Define `Language = 'en' | 'vi'` type
   - Export `useI18n()` convenience hook
   - Implement `I18nProvider` with:
     - Language state via `useState`
     - localStorage read/write
     - `document.documentElement.lang` synchronization
     - `t()` function for key lookup with fallback

3. **Application Entry** (`index.tsx`)
   - Wrap `<App />` with `<I18nProvider>` (inside React.StrictMode)

4. **Component Integration** (existing 9 components)
   - Replace hardcoded strings with `t('key.path')`
   - Use `useContext(I18nContext)` or `useI18n()` hook

5. **Language Toggle UI** (`Navbar.tsx`)
   - Inline EN | VI buttons
   - Call `setLanguage()` on click
   - Style active language for visual feedback

**Build Order (Phased):**
- **Phase 1 (Foundation):** Create translation files + extract all strings (2-3 hours)
- **Phase 2 (Context):** Build I18nContext + useI18n hook (1 hour)
- **Phase 3 (Integration):** Wrap app + update components incrementally (2 hours)
- **Phase 4 (Polish):** Add toggle UI, test persistence, validate lang attribute (30 minutes)

**Patterns to Follow:**
- ✓ Nested translation keys (2-3 levels, e.g., `sections.hero.title`)
- ✓ TypeScript type-safe shape definition for translations
- ✓ Single translation file per language (en.ts, vi.ts)
- ✓ useEffect to sync `document.documentElement.lang` on language change
- ✓ useMemo for context value to prevent unnecessary re-renders
- ✓ localStorage as persistence, read on mount only

**Anti-Patterns to Avoid:**
- ✗ Prop drilling language state (use Context instead)
- ✗ Inline translation objects in components (centralize in translations/)
- ✗ Deeply nested keys >3 levels (keep flat, e.g., `hero.title` not `sections.hero.header.main.title`)
- ✗ Mixing EN/VI in one file (separate en.ts, vi.ts)
- ✗ Passing language as prop to every component (Context solves this)

---

### From PITFALLS.md: Critical Risks and Prevention

**5 Critical Pitfalls to Prevent During Phase 1:**

1. **Missing HTML lang Attribute (SEO/Accessibility Failure)**
   - **Risk:** Google penalizes up to 15% for missing lang in non-English markets; screen readers mispronounce
   - **Prevention:** Sync `document.documentElement.lang = currentLanguage` in useEffect during language switch
   - **Test:** Check DevTools `document.documentElement.lang` value, run Lighthouse accessibility audit
   - **Phase:** Must address in Phase 2 (Context implementation)

2. **Context Re-render Thrashing (Performance Degradation)**
   - **Risk:** Entire component tree re-renders unnecessarily on language change
   - **Prevention:** Memoize context value with `useMemo(() => ({ language, setLanguage }), [language])`
   - **Detection:** React DevTools Profiler, record language switch, check flamegraph
   - **Phase:** Phase 2 during context setup

3. **Missing Translation Keys Breaking Production UI**
   - **Risk:** Key in EN but not VI (or vice versa) → displays raw key string instead of text
   - **Prevention:**
     - Build-time validation script that flattens both files and compares keys
     - Fallback in t() function: return key if missing (not undefined)
     - Add i18n-check to CI pipeline
   - **Phase:** Phase 2-3

4. **Text Expansion Breaking Responsive Layout**
   - **Risk:** Vietnamese text 30-40% longer than English → buttons overflow, mobile layout breaks
   - **Prevention:**
     - Use flexible CSS from start (width: fit-content, padding-based layouts)
     - Allocate 30-40% extra space in containers
     - Test layouts with longest translations during Phase 3
   - **Test:** Visual regression testing both languages at all breakpoints

5. **Incomplete String Extraction in Brownfield Refactor**
   - **Risk:** Miss edge cases: button aria-labels, form placeholders, error messages, alt text, tooltips
   - **Prevention:** Grep codebase for: placeholder=, aria-label=, title=, alt=, all string literals
   - **Phase:** Phase 1 (string extraction step)

**7 Additional Moderate/Minor Pitfalls (Check During Phase 3-4):**
- localStorage hydration (fine for client-only app, flag if SSR added later)
- Inconsistent translation file structure (enforce nested key naming convention)
- No fallback for missing date/number formatting (use Intl API)
- Language switcher state out of sync (single source of truth in context state)
- Forgetting document.title translation (update in useEffect)
- Alt text/contact links not translated (include in translation files)
- No CI validation of translation key completeness (add i18n-check)

---

## Implications for Roadmap

### Suggested Phase Structure

**Phase 1: Data Foundation (2.5 hours)**
- Create `src/i18n/translations/en.ts` with complete English strings
- Create `src/i18n/translations/vi.ts` with matching Vietnamese strings
- Extract all hardcoded strings from 9 components (audit for missing edge cases)
- Define TypeScript TranslationObject interface to enforce matching keys
- **Deliverable:** Translation files validated, no runtime missing keys
- **Pitfalls:** Incomplete extraction (grep for aria-label, placeholder, alt, title), mismatched structure

**Phase 2: Context System (1.5 hours)**
- Create `src/contexts/I18nContext.tsx`
- Implement I18nProvider with language state, localStorage persistence
- Memoize context value to prevent re-renders
- Sync `document.documentElement.lang` in useEffect (SEO + accessibility)
- Export `useI18n()` convenience hook
- Test context isolation with React DevTools
- **Deliverable:** Context system ready, zero console warnings, verified lang attribute updates
- **Pitfalls:** Re-render thrashing (must memoize), missing lang attribute (test in DevTools)

**Phase 3: Component Integration (2 hours)**
- Modify `index.tsx`: wrap `<App />` with `<I18nProvider>`
- Update components one-by-one: replace `"Vietnamese string"` with `t('key.path')`
- Verify each component still renders correctly in both languages
- Test layouts don't break with longer Vietnamese text (30-40% expansion)
- Update `Navbar.tsx` with language toggle UI (EN | VI buttons)
- Add browser language detection fallback (optional, Phase 3b)
- **Deliverable:** Full app translated, language switcher functional, no layout issues
- **Pitfalls:** Text overflow breaking design (use flexible CSS), state out of sync, animations restarting

**Phase 4: Polish & Validation (30 minutes)**
- Verify `document.documentElement.lang` updates on switch (manual check)
- Test localStorage persistence: switch to VI, refresh, verify VI loads
- Run Lighthouse accessibility audit (should pass lang attribute check)
- Add build-time i18n validation script (optional, Phase 4b)
- Add i18n-check to CI pipeline (optional, Phase 4c)
- **Deliverable:** Production-ready, tested, CI/CD integrated
- **Pitfalls:** Validation script not catching all missing keys, CI not enforced

### Phase Dependencies

```
Phase 1: Translation Files (independent, can run in parallel with planning)
  ↓ needs content from
Phase 2: Context System (depends on Phase 1, can run immediately after)
  ↓ needs
Phase 3: Component Integration (depends on Phase 2, can run after)
  ↓ leads to
Phase 4: Polish & Validation (depends on Phase 3, final quality gate)
```

### Research Flags

| Phase | Needs Research? | What | Confidence |
|-------|-----------------|------|-----------|
| **Phase 1** | No | Translation content is domain/marketing | N/A (out of scope for technical research) |
| **Phase 2** | No | React Context API is standard pattern, fully documented | HIGH |
| **Phase 3** | No | Component refactoring is straightforward find/replace | HIGH |
| **Phase 4** | No | Validation scripts are standard tooling, i18n-check is proven | MEDIUM (implementation choice, not critical path) |

**Why no deeper research needed:** React Context API is industry standard for simple i18n, patterns are proven, no emerging tools offer better tradeoff for this use case. If project scales beyond 2 languages or needs pluralization, consider research phase before Phase 2.

---

## Confidence Assessment

| Area | Confidence | Rationale |
|------|-----------|-----------|
| **Stack: React Context** | HIGH | Native React API, built into React 19, no version issues, proven for i18n at this scale |
| **Stack: Zero Dependencies** | HIGH | Verified that Context alone handles all requirements, no hidden gaps |
| **Stack: Bundle Impact** | HIGH | 0 KB for Context, ~5-10 KB for translation files (minimal) vs 22-60 KB for libraries |
| **Features: Table Stakes** | HIGH | All 7 must-haves align with implementation, effort estimates realistic |
| **Features: Out of Scope** | HIGH | URL routing explicitly rejected in PROJECT.md, heavy libraries confirmed overkill |
| **Architecture: Component Boundaries** | HIGH | Clear separation of data/context/consumers, follows established React patterns |
| **Architecture: Build Order** | HIGH | Dependencies properly sequenced, no circular dependencies, parallel work possible in Phase 1 |
| **Pitfalls: Critical Issues** | HIGH | HTML lang attribute, re-render memoization, translation validation all addressed in architecture |
| **Pitfalls: Detection Methods** | MEDIUM-HIGH | Techniques are sound but require manual testing; automated validation (i18n-check) should be added Phase 4 |
| **Overall Roadmap Viability** | HIGH | Clear path from planning → implementation, low risk, well-understood patterns |

### Gaps to Address Before Execution

1. **Translation Content Quality** (Not researched, marketing domain)
   - Who provides Vietnamese translations? (existing translator? professional service? machine translation + review?)
   - Timeline for translation completion before Phase 1 completion?
   - Validation process for translation accuracy (native speaker review)?

2. **Detailed Component Audit** (Out of scope for this research)
   - Exact list of all hardcoded strings in all 9 components
   - Edge case strings: error messages, loading states, aria-labels, alt text, placeholders
   - Create extraction checklist to ensure no missing strings

3. **Visual Design Decisions** (Not researched)
   - How should language toggle appear in Navbar? (dropdown? inline EN|VI buttons? flags?)
   - Default language on first visit: EN or detect from browser?
   - Should page redirect to default language or stay on current URL?

4. **CI/CD Integration** (Out of scope, optional Phase 4)
   - i18n-check integration: will this be enforced pre-merge or post-merge?
   - Visual regression testing for both languages: budget included?
   - Staging environment testing: who validates before production?

5. **Performance Baseline** (Defer to Phase 3)
   - Current landing page bundle size and load time
   - Acceptable impact from adding ~5-10 KB translation files
   - Performance targets for language switch (should be instant, <100ms)

---

## Sources

### Technology Stack (STACK.md)
- [Internationalization (i18n) in React: Complete Guide 2026](https://www.glorywebs.com/blog/internationalization-in-react)
- [Best i18n Libraries for React 2026](https://syntaxhut.tech/blog/best-i18n-libraries-react-2026)
- [Phrase: React i18n Libraries Comparison](https://phrase.com/blog/posts/react-i18n-best-libraries/)
- [Bundle size measurements via Bundlephobia](https://bundlephobia.com/)
- Official NPM packages: react-i18next, react-intl, @lingui/react, typesafe-i18n, rosetta

### Feature Landscape (FEATURES.md)
- [i18next Documentation: Best Practices](https://www.i18next.com/principles/best-practices)
- [i18n Mistakes Developers Make — Translated Right](https://www.translatedright.com/blog/20-i18n-mistakes-developers-make-in-react-apps-and-how-to-fix-them/)
- [Language Switcher Best Practices — Lingo.dev](https://lingo.dev/en/react-router-i18n/switch-languages)
- [Multilingual Landing Page Guide — Attention Insight](https://attentioninsight.com/multilingual-landing-page-for-your-product/)
- React i18next official documentation

### Architecture (ARCHITECTURE.md)
- [React Context API for i18n — Seerat Awan](https://www.seeratawan.me/blog/react-internationalization-using-context-api/)
- [localStorage in React — Robin Wieruch](https://www.robinwieruch.de/local-storage-react/)
- [Multi-language React Apps — Franklin Osei](https://dev.to/franklin030601/building-a-multi-language-app-with-react-js-2och)
- [i18n Key Naming Best Practices — Locize](https://www.locize.com/blog/guide-to-i18n-key-naming/)

### Pitfalls (PITFALLS.md)
- [20 i18n Mistakes in React Apps — Translated Right](https://www.translatedright.com/blog/20-i18n-mistakes-developers-make-in-react-apps-and-how-to-fix-them/)
- [Shopify: i18n Best Practices — Shopify Engineering](https://shopify.engineering/internationalization-i18n-best-practices-front-end-developers)
- [Optimizing React Context Performance](https://www.tenxdeveloper.com/blog/optimizing-react-context-performance)
- [HTML Lang Attribute & SEO — DHiWise](https://www.dhiwise.com/blog/design-converter/html-meta-lang-why-its-important-for-web-development)
- [i18n-check documentation](https://lingual.dev/blog/quality-assurance-for-i18n-in-react/)

---

## Recommendation for Roadmap Planning

**Go forward with 4-phase implementation plan using React Context API.**

**Why this recommendation:**
1. Proven pattern (React Context for i18n is industry standard for simple use cases)
2. Zero risk (no new dependencies, no compatibility issues with React 19)
3. Minimal bundle impact (0 KB added, vs 22+ KB for alternatives)
4. Clear, manageable scope (5-6 hours total, 4 distinct phases)
5. Low technical complexity (all patterns are well-documented, no emerging risks)

**Critical success factors to emphasize in planning:**
- Memoize context value to prevent re-render thrashing
- Synchronize `document.documentElement.lang` for SEO/accessibility
- Build translation validation early (Phase 1-2) to catch key mismatches
- Test all layouts with Vietnamese text (30-40% longer) in Phase 3
- Defer nice-to-haves to Phase 2+ (type-safe keys, browser detection)

**Escalation triggers:**
- If project scope expands to 3+ languages → consider rosetta (~1 KB) instead
- If pluralization/formatting needs emerge → consider LinguiJS (~10 KB)
- If enterprise TMS integration required → consider react-i18next (~22 KB)
- If SEO is critical → may need separate URLs per language (URL-based approach, deferred)

---

**Research Complete: Ready for Requirements Definition**
