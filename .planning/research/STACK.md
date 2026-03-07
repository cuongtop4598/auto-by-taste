# Technology Stack - React i18n

**Project:** AI-Local Hub Landing Page i18n
**Researched:** 2026-03-07
**Context:** Adding internationalization (EN/VI) to existing React 19 + TypeScript + Vite landing page

## Recommended Stack

### Approach: React Context (Zero Dependencies)

For this specific use case (2 languages, static translations, simple landing page), **React Context API** is the recommended approach.

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Context API | Built-in (React 19.2.4) | Language state management | Zero dependencies, sufficient for 2 languages, type-safe with TypeScript, ~0kb added to bundle |
| localStorage API | Browser native | Language preference persistence | Native browser API, no library needed, meets "localStorage for persistence" requirement |
| TypeScript types | ~5.8.2 (existing) | Type-safe translations | Already in stack, enforces translation completeness |

**Rationale:**
- **Bundle size:** 0 bytes added (uses existing React)
- **Complexity:** Minimal - matches project constraint "No new dependencies preferred"
- **Sufficiency:** Context API handles all requirements (language state, persistence, toggle UI)
- **Type safety:** TypeScript ensures translation keys exist in both languages
- **Maintenance:** Simple to understand and modify without library-specific APIs

**Confidence:** HIGH - React Context is standard React API, well-documented, proven pattern for i18n with 2 languages

**When NOT to use:** If project scales beyond 2-3 languages, needs pluralization/formatting, or requires lazy-loading of translations

---

## Alternative: Lightweight Libraries (If Context Proves Insufficient)

If React Context becomes insufficient (e.g., needs pluralization, more languages, or complex formatting), consider these alternatives in order:

### Option A: rosetta (Extreme Minimalism)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| rosetta | 1.1.0 | Core i18n engine | 298 bytes total, functional API, no React dependency |
| react-rosetta | 2.0.0 | React bindings | Adds ~1kb, provides useTranslate hook |

**Total bundle impact:** ~1.3kb minified + gzipped

**Pros:**
- Smallest possible library footprint
- Simple functional API
- No external dependencies
- Works with any framework

**Cons:**
- No built-in formatting (dates, numbers, plurals)
- Requires manual React integration or small wrapper
- Less TypeScript support out of the box
- Smaller community than react-i18next

**Confidence:** MEDIUM - rosetta is well-maintained (lukeed/rosetta on GitHub, 34k weekly downloads) but less documented for React-specific usage

### Option B: typesafe-i18n (Type Safety Priority)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| typesafe-i18n | 5.24.3+ | Type-safe i18n with code generation | Full TypeScript support, compile-time guarantees, lightweight runtime |

**Total bundle impact:** ~3-5kb minified + gzipped (only runtime needed in production)

**Pros:**
- Full type safety for translation keys and parameters
- Code generation creates typed helpers
- Zero runtime dependencies
- Supports formatters (dates, numbers, plurals)
- Tree-shakeable

**Cons:**
- Build step required for code generation
- More setup complexity than React Context
- Opinionated file structure

**Confidence:** MEDIUM - Active development, modern approach, but smaller community than established options

### Option C: LinguiJS (Performance + DX)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @lingui/core | 5.9.2+ | Core i18n engine | Compile-time message extraction and optimization |
| @lingui/react | 5.9.2+ | React components | Trans component, useLingui hook, i18n context |
| @lingui/macro | 5.9.2+ (dev) | Message extraction | Babel macro for automatic message collection |

**Total bundle impact:** ~10.4kb minified + gzipped (@lingui/core 7.9kb + @lingui/react 2.5kb)

**Pros:**
- Compile-time optimization (runtime only needs pre-compiled messages)
- Automatic message extraction from code
- Strong TypeScript support
- ICU message format support (pluralization, formatting)
- Modern DX with macros
- Growing adoption in 2025-2026

**Cons:**
- Requires Babel/SWC setup (additional build config)
- More initial setup than Context or rosetta
- Larger bundle than ultra-minimal options
- Vite integration may need additional configuration

**Confidence:** MEDIUM-HIGH - Actively maintained, recommended by 2026 sources for performance-focused projects, but requires build tooling verification with Vite

---

## NOT Recommended: Full-Featured Libraries

### react-i18next + i18next (Industry Standard, But Overkill)

| Technology | Version | Bundle Impact | Why NOT |
|------------|---------|---------------|---------|
| i18next | 25.8.14 | ~15.1kb min+gzip | Core too heavy for 2 languages |
| react-i18next | 16.5.5 | +7.1kb min+gzip | Adds React bindings |
| **Total** | | **~22.2kb** | **10x larger than needed** |

**Why skip:**
- Massive overkill for 2-language static site
- 22.2kb bundle addition violates "bundle size: keep additions minimal" constraint
- Rich plugin ecosystem unused (language detection, backend loading, etc.)
- Designed for complex multi-language apps with dynamic loading
- React 19 compatibility: CONFIRMED (fixed in v16.5.5)

**When to use instead:** 10+ languages, backend translation loading, plugins needed (language detection, translation management service integration)

**Confidence:** HIGH - Most popular React i18n library (6,069 projects use it), actively maintained, React 19 compatible

### react-intl / FormatJS (Enterprise TMS, But Overkill)

| Technology | Version | Bundle Impact | Why NOT |
|------------|---------|---------------|---------|
| react-intl | 8.1.3 | ~17.8kb min+gzip | Smaller than i18next but still too heavy |

**Why skip:**
- Still 17.8kb for 2-language landing page
- Focused on ICU message format and complex formatting
- Better for enterprise translation management workflows
- React 19 compatibility: PARTIAL (SSR issues reported in v8.1.3, see GitHub #5096)

**When to use instead:** Enterprise TMS integration, complex formatting needs, standardized ICU messages

**Confidence:** MEDIUM - Popular library, but React 19 SSR compatibility concerns flagged in recent issues

---

## Implementation Pattern: React Context Approach

### File Structure

```
src/
├── i18n/
│   ├── translations/
│   │   ├── en.ts          # English translations
│   │   └── vi.ts          # Vietnamese translations
│   ├── I18nContext.tsx    # Context provider
│   └── types.ts           # TypeScript types
```

### Core Types

```typescript
// src/i18n/types.ts
export type Language = 'en' | 'vi';

export interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationObject;
}

// Define translation shape (ensures both languages match)
export interface TranslationObject {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  // ... other sections
}
```

### Translation Files

```typescript
// src/i18n/translations/en.ts
import { TranslationObject } from '../types';

export const en: TranslationObject = {
  hero: {
    title: "AI Solutions for Vietnamese Businesses",
    subtitle: "Local AI running on Mac Mini M4",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Learn More"
  },
  // ... rest of translations
};
```

```typescript
// src/i18n/translations/vi.ts
import { TranslationObject } from '../types';

export const vi: TranslationObject = {
  hero: {
    title: "Giải pháp AI cho doanh nghiệp Việt Nam",
    subtitle: "AI cục bộ chạy trên Mac Mini M4",
    ctaPrimary: "Liên hệ",
    ctaSecondary: "Tìm hiểu thêm"
  },
  // ... rest of translations
};
```

### Context Provider

```typescript
// src/i18n/I18nContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, I18nContextValue } from './types';
import { en } from './translations/en';
import { vi } from './translations/vi';

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const translations = { en, vi };

const getStoredLanguage = (): Language => {
  const stored = localStorage.getItem('language');
  if (stored === 'en' || stored === 'vi') return stored;

  // Browser language detection
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('vi') ? 'vi' : 'en';
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang; // SEO requirement
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nContext.Provider value={{
      language,
      setLanguage,
      t: translations[language]
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
```

### Usage in Components

```typescript
// src/components/HeroSection.tsx
import { useI18n } from '../i18n/I18nContext';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
      <button>{t.hero.ctaPrimary}</button>
    </section>
  );
}
```

### Language Switcher

```typescript
// src/components/LanguageSwitcher.tsx
import { useI18n } from '../i18n/I18nContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'font-bold' : ''}
      >
        EN
      </button>
      <span>|</span>
      <button
        onClick={() => setLanguage('vi')}
        className={language === 'vi' ? 'font-bold' : ''}
      >
        VI
      </button>
    </div>
  );
}
```

---

## Installation (If Choosing Library Alternative)

### React Context (Recommended)
```bash
# No installation needed - uses existing React
```

### rosetta (If needed)
```bash
npm install rosetta react-rosetta
```

### typesafe-i18n (If needed)
```bash
npm install typesafe-i18n
```

### LinguiJS (If needed)
```bash
npm install @lingui/core @lingui/react
npm install -D @lingui/macro @lingui/cli
```

### react-i18next (NOT recommended, but if required)
```bash
npm install i18next react-i18next
```

---

## Decision Matrix

| Criterion | React Context | rosetta | typesafe-i18n | LinguiJS | react-i18next |
|-----------|--------------|---------|---------------|----------|---------------|
| Bundle size | 0kb | ~1.3kb | ~3-5kb | ~10kb | ~22kb |
| Dependencies | 0 | 2 | 1 | 3 | 2 |
| Setup complexity | Low | Low | Medium | Medium-High | Medium |
| Type safety | High (TS) | Medium | Very High | High | Medium |
| Formatting support | None | None | Yes | Yes (ICU) | Yes |
| Scalability | 2-3 langs | 5-10 langs | Any | Any | Any |
| React 19 compat | Native | Yes | Yes | Not verified | Yes |
| Maintenance burden | Low | Low | Medium | Medium | High |
| **Fit for project** | **Excellent** | **Good** | **Good** | **Fair** | **Poor** |

---

## Recommendation Summary

**For this project: Use React Context API (zero dependencies)**

**Rationale:**
1. Meets all requirements (2 languages, localStorage persistence, language toggle)
2. Zero bundle size impact (uses existing React 19)
3. Aligns with project constraint: "No new dependencies preferred"
4. Type-safe with existing TypeScript setup
5. Simple to implement and maintain
6. No build configuration changes needed

**Upgrade path if needed:**
1. If more languages needed (3-5): Add rosetta (~1kb)
2. If type safety critical (6+ languages): Use typesafe-i18n (~3kb)
3. If formatting needed (plurals, dates): Use LinguiJS (~10kb)
4. If enterprise TMS needed: Consider react-i18next (~22kb)

---

## Confidence Assessment

| Area | Confidence | Rationale |
|------|-----------|-----------|
| React Context approach | HIGH | Standard React pattern, well-documented, sufficient for 2 languages |
| rosetta as alternative | MEDIUM | Proven library (298 bytes, 34k weekly downloads) but less React-specific docs |
| typesafe-i18n as alternative | MEDIUM | Active project, good for TypeScript, but smaller community |
| LinguiJS as alternative | MEDIUM-HIGH | Growing adoption in 2026, requires Vite build setup verification |
| react-i18next NOT recommended | HIGH | Confirmed overkill for 2-language static site (22kb vs 0kb needed) |
| react-intl NOT recommended | MEDIUM-HIGH | React 19 SSR issues reported, too heavy for use case |
| Bundle sizes | HIGH | Verified from Bundlephobia and official sources |
| React 19 compatibility | HIGH | React Context is native; libraries verified via changelogs |

---

## Sources

**React i18n Ecosystem (2025-2026):**
- [Internationalization (i18n) in React: Complete Guide 2026](https://www.glorywebs.com/blog/internationalization-in-react)
- [Curated List: Our Best of Libraries for React I18n | Phrase](https://phrase.com/blog/posts/react-i18n-best-libraries/)
- [Best i18n Libraries for React 2026 | SyntaxHut](https://syntaxhut.tech/blog/best-i18n-libraries-react-2026)
- [React + LinguiJS: The Complete Internationalization Guide [2026]](https://intlpull.com/blog/linguijs-react-i18n-guide-2026)
- [Best i18n Libraries for Next.js, React & React Native in 2026](https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-3m8f)

**Library Comparisons:**
- [react-intl vs. react-i18next: The Ultimate Comparison](https://www.locize.com/blog/react-intl-vs-react-i18next/)
- [react-i18next vs react-intl | i18nexus](https://i18nexus.com/posts/comparing-react-i18next-and-react-intl)
- [Comparison to others | i18next documentation](https://www.i18next.com/overview/comparison-to-others)

**Lightweight Alternatives:**
- [Best i18n libraries for React, React Native & NextJS | SimpleLocalize](https://simplelocalize.io/blog/posts/the-most-popular-react-localization-libraries/)
- [GitHub - lukeed/rosetta: A general purpose internationalization library in 292 bytes](https://github.com/lukeed/rosetta)
- [GitHub - codingcommons/typesafe-i18n](https://github.com/codingcommons/typesafe-i18n)
- [i18n: The Type-Safe Approach - Simon Boisset](https://simonboisset.com/en/blog/i18n-type-safe-approach)

**React Context Approach:**
- [React Internationalization (i18n) using Context API — Seerat Awan](https://www.seeratawan.me/blog/react-internationalization-using-context-api/)
- [How to Build Multi-Language React Apps with Internationalization](https://dev.to/myogeshchavan97/how-to-build-multi-language-react-apps-with-internationalization-i18n-1o2d)

**Bundle Size Data:**
- [react-i18next bundle size](https://phrase.com/blog/posts/react-i18n-best-libraries/) - 22.2kb total (i18next 15.1kb + react-i18next 7.1kb)
- [react-intl bundle size](https://i18nexus.com/posts/comparing-react-i18next-and-react-intl) - 17.8kb minified + gzipped
- [LinguiJS bundle size](https://bundlephobia.com/package/@lingui/react) - 10.4kb total (@lingui/core 7.9kb + @lingui/react 2.5kb)
- [rosetta bundle size](https://github.com/lukeed/rosetta) - 298 bytes

**Version Information:**
- [react-i18next latest version 16.5.5](https://www.npmjs.com/package/react-i18next)
- [i18next latest version 25.8.14](https://www.npmjs.com/package/i18next)
- [react-intl latest version 8.1.3](https://www.npmjs.com/package/react-intl)
- [LinguiJS latest version 5.9.2](https://www.npmjs.com/package/@lingui/react)

**React 19 Compatibility:**
- [react-i18next React 19 compatibility](https://github.com/i18next/react-i18next/blob/master/CHANGELOG.md) - Fixed in v16.5.5
- [react-intl React 19 SSR issues](https://github.com/formatjs/formatjs/issues/5096) - Known issues in v8.1.3
- [react-i18next React 19 peer dependencies](https://www.npmpeer.dev/packages/react-i18next/compatibility)

**localStorage Persistence:**
- [Complete Guide to Multilingual Support in React (i18n)](https://www.zignuts.com/blog/complete-guide-multilingual-support-react-i18n)
- [Caching | i18next documentation](https://www.i18next.com/how-to/caching)
- [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)
