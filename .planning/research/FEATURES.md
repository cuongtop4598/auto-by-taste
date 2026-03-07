# Feature Landscape: React i18n for Landing Pages

**Domain:** React Internationalization (i18n) for Static Landing Pages
**Researched:** 2026-03-07
**Confidence:** HIGH (verified with official docs, multiple sources, current year practices)

## Table Stakes

Features users expect. Missing = product feels incomplete or broken.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Basic string translation** | Core purpose of i18n—display content in user's language | Low | Hardcoded strings make localization impossible. Use translation keys instead. [Source](https://www.translatedright.com/blog/20-i18n-mistakes-developers-make-in-react-apps-and-how-to-fix-them/) |
| **Language switcher UI** | Users must be able to change language | Low | Should be "very easy to locate" or you lose customers. Typically in header/navbar as dropdown or inline buttons. [Source](https://attentioninsight.com/multilingual-landing-page-for-your-product/) |
| **Language persistence** | Preference survives page refresh | Low | localStorage is standard for static sites—simpler than cookies, no backend needed. [Source](https://felixgerschau.com/react-localstorage/) |
| **Context preservation on language switch** | Switching languages keeps user on same page/section | Low | Users expect to see "this same page in Spanish," not redirect to homepage. [Source](https://lingo.dev/en/react-router-i18n/switch-languages) |
| **`lang` attribute on `<html>`** | SEO and accessibility requirement | Low | Screen readers need this for correct pronunciation. Google penalizes missing lang by up to 15% in non-English markets. [Source](https://copyprogramming.com/howto/html-data-lang-not-working-in-html) |
| **Fallback language** | Prevents blank strings when translation missing | Low | Always define fallback (usually English) to prevent missing translations. [Source](https://www.i18next.com/translation-function/interpolation) |
| **Variable interpolation** | Dynamic values (names, numbers) in translations | Low-Medium | Essential for runtime values like "Welcome, {{name}}" or "{{count}} items". Use sparingly—only for truly runtime values. [Source](https://www.i18next.com/translation-function/interpolation) |

## Differentiators

Features that set implementation apart. Not expected, but valuable for specific use cases.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Type-safe translation keys** | Autocomplete + compile-time error detection | Medium | TypeScript users benefit from catching typos/missing keys at dev time vs runtime. Requires .ts files or type generation from JSON. [Source](https://zwyx.dev/blog/typesafe-translations) |
| **Lazy loading translations** | Faster initial page load | Medium | Load only needed language on demand. Valuable for large apps, overkill for small landing pages (2 languages × small file = negligible). [Source](https://www.glorywebs.com/blog/internationalization-in-react) |
| **Namespace splitting** | Organize translations by feature/section | Low-Medium | Separate common.json, hero.json, pricing.json. Helps teams work independently. For 9-component landing page: probably overkill, single file is simpler. [Source](https://react.i18next.com/guides/multiple-translation-files) |
| **Pluralization rules** | Correct grammar for counts (1 item vs 2 items) | Low | Handled by Intl.PluralRules API. Covers 6 forms (zero/one/two/few/many/other). Only needed if displaying counts. [Source](https://generaltranslation.com/en-US/blog/plurals) |
| **Date/time formatting** | Locale-aware dates (MM/DD vs DD/MM) | Low | Intl.DateTimeFormat handles this. Only valuable if landing page displays dates (blog posts, event dates). [Source](https://react.i18next.com/misc/using-with-icu-format) |
| **Number/currency formatting** | Locale-aware numbers (1,000.00 vs 1.000,00) | Low | Intl.NumberFormat handles this. Valuable for pricing pages showing costs in local format. [Source](https://lokalise.com/blog/react-i18n-intl/) |
| **RTL (Right-to-Left) support** | Proper layout for Arabic, Hebrew, etc. | High | Requires `dir` attribute + CSS adjustments. Only needed if targeting RTL languages. [Source](https://www.translatedright.com/blog/20-i18n-mistakes-developers-make-in-react-apps-and-how-to-fix-them/) |
| **Browser language detection** | Auto-select user's preferred language on first visit | Low | Mix with manual switcher—don't force, offer choice. Some users prefer different language than browser default. [Source](https://lingo.dev/en/react-router-i18n/switch-languages) |
| **Trans component for mixed content** | Translate strings with embedded React components (links, bold) | Low | Useful for "Read our <a>privacy policy</a>" type strings. More powerful than simple interpolation. [Source](https://react.i18next.com/latest/trans-component) |

## Anti-Features

Features to explicitly NOT build for simple landing pages.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **URL-based routing (/en/, /vi/)** | Adds significant complexity for minimal benefit on static sites. Hard to find clear implementation guidance. Requires updating all links if you have a big app. | Use language stored in Context/localStorage. No URL changes. Simpler maintenance, no routing complexity. [Source](https://github.com/remix-run/react-router/discussions/10510) |
| **Heavy i18n library (react-i18next)** | 22.2 kB (15.1 kB i18next + 7.1 kB react-i18next) added to bundle for features you don't need. | For 2-language landing page, React Context + JSON files is sufficient. If you need pluralization/date formatting, consider lightweight i18n-js instead. [Source](https://www.i18next.com/overview/comparison-to-others) |
| **Translation Management System (TMS) integration** | Overkill for hardcoded translations managed by single developer. Adds complexity (API keys, sync scripts, dependencies). | Manage JSON files directly in repo. Use version control for translation updates. Consider TMS only when multiple translators or frequent updates. [Source](https://www.glorywebs.com/blog/internationalization-in-react) |
| **Server-side language detection** | Requires backend. IP-based redirection can frustrate users (VPN, travel, preference). | Use browser detection as suggestion, always offer manual switcher. localStorage for persistence. [Source](https://www.maviklabs.com/blog/internationalization-astro-2026/) |
| **CMS for content management** | Adds infrastructure (database, API, admin UI) for what's essentially static config. | Hardcode translations in JSON. Simple, version-controlled, no deployment complexity. [Source](https://attentioninsight.com/multilingual-landing-page-for-your-product/) |
| **Automatic text extraction tools** | Useful for large codebases, but for 9 components you can manually extract strings faster than configuring extraction tooling. | Manually identify translatable strings, create JSON structure. One-time effort, full control. [Source](https://blog.logrocket.com/implementing-safe-dynamic-localization-typescript-apps/) |
| **Monolithic translation files** | One massive en.json becomes unmanageable in large apps. But for small landing page, single file is simpler than namespace overhead. | For this project: single file per language (en.json, vi.json). Don't prematurely optimize with namespaces. [Source](https://www.translatedright.com/blog/20-i18n-mistakes-developers-make-in-react-apps-and-how-to-fix-them/) |
| **Over-interpolation** | Splitting English sentences into fragments makes translation difficult or impossible. Translators need context. | Use interpolation only for truly runtime values (user names, counts, timestamps). Otherwise, use complete self-contained strings. [Source](https://www.i18next.com/translation-function/interpolation) |

## Feature Dependencies

```
Basic translation
  ↓ requires
Language switcher UI
  ↓ updates
Language persistence (localStorage)
  ↓ triggers
Context preservation on switch
  ↓ updates
html lang attribute

Variable interpolation
  ↓ enables
Pluralization (count-based interpolation)

Date/time formatting
  ↓ depends on
Current language context

Type-safe keys
  ↓ requires
TypeScript + translation file structure
```

## MVP Recommendation for This Project

**Context:** Brownfield React landing page (9 components), English + Vietnamese, no backend, bundle size sensitive.

### Prioritize (Must Have)

1. **Basic string translation** — Core functionality
2. **Language switcher (EN | VI inline buttons in navbar)** — User's explicit requirement
3. **Language persistence (localStorage)** — User's explicit requirement
4. **Context preservation** — Expected behavior (don't redirect to top on switch)
5. **`lang` attribute on `<html>`** — SEO/accessibility (free SEO win)
6. **Fallback language (English)** — User's requirement (default to EN)
7. **Variable interpolation** — Likely needed for dynamic content (company name, contact info)

### Consider Adding (Nice to Have)

8. **Browser language detection** — Enhanced UX (auto-select VI for Vietnamese users)
9. **Number/currency formatting** — Valuable for pricing section (3 tiers with costs)
10. **Trans component** — If translations need embedded links (privacy policy, contact links)

### Explicitly Defer

- **Type-safe keys** — Valuable but can add later if needed
- **Lazy loading** — 2 languages × small file = unnecessary
- **Namespace splitting** — 9 components don't need organization overhead
- **Pluralization** — Add only if displaying counts
- **Date formatting** — Not needed for marketing landing page
- **RTL support** — Not targeting RTL languages (EN/VI only)
- **URL routing** — Explicitly out of scope per PROJECT.md
- **Heavy libraries** — Use React Context, not react-i18next

## Implementation Strategy

**Recommended approach for this project:**

1. **No library** — React Context + JSON translation files
2. **File structure:**
   ```
   src/
     i18n/
       translations/
         en.json
         vi.json
       LanguageContext.tsx
       LanguageProvider.tsx
     components/
       LanguageToggle.tsx
   ```
3. **Translation format:**
   ```json
   {
     "hero": {
       "title": "AI-Local Hub",
       "subtitle": "Local AI solutions on Mac Mini M4"
     },
     "pricing": {
       "tier1": {
         "name": "Starter",
         "price": "{{amount}} VND"
       }
     }
   }
   ```
4. **Usage in components:**
   ```tsx
   const { t } = useLanguage();
   return <h1>{t('hero.title')}</h1>;
   ```

**Why no library:**
- Project constraints favor minimal dependencies
- Bundle size sensitive (landing page should load fast)
- Simple use case (2 languages, static content, no complex features)
- React Context is sufficient for state management
- Can add library later if needs grow (pluralization, date formatting, etc.)

## Complexity Assessment

| Feature Category | Estimated Effort | Risk |
|------------------|------------------|------|
| Core translation system | 2-3 hours | Low (well-understood pattern) |
| Language switcher UI | 1 hour | Low (inline buttons in navbar) |
| localStorage persistence | 30 minutes | Low (standard React pattern) |
| html lang attribute | 15 minutes | Low (single useEffect) |
| Variable interpolation | 1 hour | Low (simple string replacement) |
| Browser detection | 30 minutes | Low (navigator.language) |
| Number formatting | 30 minutes | Low (Intl.NumberFormat) |
| **Total MVP** | **5-6 hours** | **Low** |

## Sources

### High Confidence (Official/Primary)
- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com)
- [FormatJS Components](https://formatjs.github.io/docs/react-intl/components/)
- [React i18next Official Guides](https://react.i18next.com/guides/multiple-translation-files)
- [i18next Best Practices](https://www.i18next.com/principles/best-practices)
- [i18next Interpolation](https://www.i18next.com/translation-function/interpolation)

### Medium Confidence (Technical Blogs, Current Year)
- [Internationalization in React 2026 - GloryWebs](https://www.glorywebs.com/blog/internationalization-in-react)
- [Best i18n Libraries for React 2026 - SyntaxHut](https://syntaxhut.tech/blog/best-i18n-libraries-react-2026)
- [React i18n Guide - Lokalise](https://lokalise.com/blog/react-i18n-intl/)
- [i18n Mistakes in React Apps - Translated Right](https://www.translatedright.com/blog/20-i18n-mistakes-developers-make-in-react-apps-and-how-to-fix-them/)
- [Language Switcher Best Practices - Lingo.dev](https://lingo.dev/en/react-router-i18n/switch-languages)
- [Type-Safe Translations - Zwyx](https://zwyx.dev/blog/typesafe-translations)
- [React localStorage Guide - Felix Gerschau](https://felixgerschau.com/react-localstorage/)
- [HTML Lang Attribute SEO - Versionfeatures](https://copyprogramming.com/howto/html-data-lang-not-working-in-html)
- [React Pluralization - General Translation](https://generaltranslation.com/en-US/blog/plurals)
- [Landing Page i18n 2026 - Attention Insight](https://attentioninsight.com/multilingual-landing-page-for-your-product/)

### Verification Notes
- All table stakes features verified across multiple sources
- Best practices aligned with 2026 current year recommendations
- Anti-features based on project constraints (static site, 2 languages, no backend)
- Complexity estimates based on React Context implementation (not library-based)
- Sources span official documentation, technical blogs, and community discussions
