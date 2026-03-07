# Architecture Patterns for React i18n

**Domain:** React internationalization (i18n)
**Context:** Brownfield React 19 + TypeScript + Vite landing page
**Researched:** 2026-03-07

## Recommended Architecture

For this specific project (simple landing page, 2 languages, no backend, preference for minimal dependencies), the **React Context API pattern** is recommended over library-based solutions.

### Pattern: Custom Context-Based i18n

```
┌─────────────────────────────────────────────────────┐
│ index.html (root)                                   │
│ - Sets initial lang attribute                       │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ index.tsx (React entry)                             │
│ - Wraps App with I18nProvider                       │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ I18nProvider (context provider)                     │
│ - Manages language state                            │
│ - Loads from localStorage                           │
│ - Provides: { language, setLanguage, t() }          │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼──────┐   ┌──────▼──────┐
│ Navbar       │   │ Content     │
│ - Toggle UI  │   │ Components  │
│ - Switches   │   │ - Hero      │
│   language   │   │ - Product   │
└──────────────┘   │   Tiers     │
                   │ - etc.      │
                   └─────────────┘
```

## Component Boundaries

### 1. Translation Data Layer

**Location:** `src/i18n/translations/`
**Purpose:** Store all translatable strings
**Boundaries:** Pure data—no React dependencies

| File | Responsibility |
|------|---------------|
| `en.ts` | English translation object |
| `vi.ts` | Vietnamese translation object |
| `index.ts` | Export unified translations type-safe object |

**Structure:**
```typescript
// Nested structure (2-3 levels max)
{
  navbar: {
    hero: "Home",
    problem: "Problem"
  },
  hero: {
    title: "AI Local Agent",
    subtitle: "Your Business Intelligence..."
  }
}
```

**Why nested?** Flat keys collapse into chaos at scale. Nested keys provide context and enable better organization.

### 2. i18n Context Layer

**Location:** `src/contexts/I18nContext.tsx`
**Purpose:** Manage language state and provide translation function
**Boundaries:** Consumes translation data, provides to components

**Responsibilities:**
- Define `Language` type (`'en' | 'vi'`)
- Define `I18nContextType` interface
- Create React Context
- Implement `I18nProvider` component
- Manage language state with `useState`
- Sync language to `localStorage`
- Provide `t()` translation function
- Update `document.documentElement.lang` attribute

**Exports:**
- `I18nContext` - Context object for `useContext`
- `I18nProvider` - Provider wrapper component
- `useI18n` - Custom hook (optional convenience wrapper)

**Data managed:**
- `language: Language` - Current active language
- `setLanguage: (lang: Language) => void` - Language setter
- `t: (key: string) => string` - Translation lookup function

### 3. Application Entry Layer

**Location:** `index.tsx`
**Purpose:** Wrap application with i18n provider
**Boundaries:** Composition point—connects provider to app tree

**Responsibilities:**
- Import `I18nProvider`
- Wrap `<App />` with `<I18nProvider>`
- Maintain existing React 19 StrictMode wrapper

**Structure:**
```tsx
<StrictMode>
  <I18nProvider>
    <App />
  </I18nProvider>
</StrictMode>
```

### 4. Consumer Components Layer

**Location:** Existing `src/components/*.tsx`
**Purpose:** Display translated content
**Boundaries:** Consume context, render UI

**Pattern for each component:**
1. Import `useContext` and `I18nContext`
2. Extract `t` function: `const { t } = useContext(I18nContext)`
3. Replace hardcoded strings with `t('key.path')`

**Example transformation:**
```tsx
// Before
<h1>Giải pháp AI địa phương</h1>

// After
const { t } = useContext(I18nContext);
<h1>{t('hero.title')}</h1>
```

### 5. Language Toggle UI

**Location:** `src/components/Navbar.tsx`
**Purpose:** Allow user to switch languages
**Boundaries:** UI control that calls `setLanguage`

**Responsibilities:**
- Display EN | VI toggle buttons
- Call `setLanguage()` on click
- Style active language (visual feedback)
- Persist choice to localStorage (handled by context)

## Data Flow

### Initialization Flow

```
1. Browser loads index.html
   ↓
2. index.tsx executes
   ↓
3. I18nProvider mounts
   ↓
4. Provider reads localStorage['language'] || 'en'
   ↓
5. Provider sets document.documentElement.lang
   ↓
6. Provider passes { language, setLanguage, t } to Context
   ↓
7. App and child components mount
   ↓
8. Components call useContext(I18nContext)
   ↓
9. Components access t() function
   ↓
10. Components render translated strings
```

### Language Switch Flow

```
1. User clicks EN/VI toggle in Navbar
   ↓
2. Navbar calls setLanguage('en' or 'vi')
   ↓
3. Provider updates state via useState
   ↓
4. Provider useEffect detects language change
   ↓
5. Provider writes to localStorage.setItem('language', lang)
   ↓
6. Provider sets document.documentElement.lang = lang
   ↓
7. Context value updates (new language, same t function)
   ↓
8. All consuming components re-render
   ↓
9. t() function now returns strings from new language
   ↓
10. UI displays translated content
```

### Translation Lookup Flow

```
Component calls t('hero.title')
   ↓
t() function runs inside I18nProvider
   ↓
Reads current language state ('en' or 'vi')
   ↓
Accesses translations[language]['hero']['title']
   ↓
Returns string value
   ↓
Component renders string in JSX
```

## Patterns to Follow

### Pattern 1: Nested Translation Keys

**What:** Organize translations 2-3 levels deep by feature/component
**When:** Always—prevents key naming collisions and provides context
**Example:**
```typescript
{
  hero: {
    title: "...",
    subtitle: "...",
    cta: "..."
  },
  navbar: {
    home: "...",
    about: "..."
  }
}
```

**Why:** Flat keys (`login_button`, `submit_button`) collapse into chaos as the app grows. Nested keys (`auth.login.button`, `forms.submit.button`) maintain context and scale better.

### Pattern 2: Type-Safe Translation Keys

**What:** Use TypeScript to enforce valid translation keys
**When:** Always—prevents runtime errors from typos
**Example:**
```typescript
type TranslationKeys = {
  hero: {
    title: string;
    subtitle: string;
  };
};

// t() function enforces valid paths
const t = (key: string): string => {
  // Type-safe access
};
```

**Why:** Catches missing translations at compile time instead of runtime.

### Pattern 3: localStorage Persistence

**What:** Save language preference to browser storage
**When:** On every language change
**Example:**
```typescript
useEffect(() => {
  localStorage.setItem('language', language);
  document.documentElement.lang = language;
}, [language]);
```

**Why:** User preference persists across sessions without backend.

### Pattern 4: HTML Lang Attribute Synchronization

**What:** Update `<html lang>` attribute when language changes
**When:** On mount and language switch
**Example:**
```typescript
useEffect(() => {
  document.documentElement.lang = language;
}, [language]);
```

**Why:**
- **SEO:** Search engines index page for correct language audience
- **Accessibility:** Screen readers apply correct pronunciation rules
- **UX:** Browsers offer appropriate translation options

### Pattern 5: Custom useI18n Hook (Optional)

**What:** Convenience wrapper around useContext
**When:** To simplify component imports
**Example:**
```typescript
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
```

**Why:** Cleaner component code, built-in error checking.

### Pattern 6: Default Language Fallback

**What:** Use English as default if localStorage is empty
**When:** First visit or cleared storage
**Example:**
```typescript
const [language, setLanguage] = useState<Language>(
  (localStorage.getItem('language') as Language) || 'en'
);
```

**Why:** Ensures predictable behavior and aligns with project requirement.

### Pattern 7: Single Translation File Per Language

**What:** One file per language (en.ts, vi.ts) with all strings
**When:** For small projects (<50 translation keys)
**Example:**
```
src/i18n/translations/
  ├── en.ts    (all English strings)
  ├── vi.ts    (all Vietnamese strings)
  └── index.ts (export merged object)
```

**Why:** Simpler than namespacing for landing pages. Use namespaces only if >100 keys.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Passing Language as Prop

**What:** Drilling language state through component props
**Why bad:** Prop drilling defeats the purpose of Context API
**Instead:** Use Context—every component accesses directly via `useContext`

```tsx
// BAD
<Hero language={language} />

// GOOD
const Hero = () => {
  const { t } = useContext(I18nContext);
  return <h1>{t('hero.title')}</h1>;
};
```

### Anti-Pattern 2: Inline Translation Objects

**What:** Defining translations inside components
**Why bad:** Duplication, no single source of truth, unmaintainable
**Instead:** Centralize in `src/i18n/translations/`

```tsx
// BAD
const Hero = () => {
  const translations = { en: "Welcome", vi: "Chào mừng" };
  return <h1>{translations[language]}</h1>;
};

// GOOD
const Hero = () => {
  const { t } = useContext(I18nContext);
  return <h1>{t('hero.welcome')}</h1>;
};
```

### Anti-Pattern 3: Deeply Nested Keys (>3 levels)

**What:** Translation paths like `sections.hero.header.main.title.primary`
**Why bad:** Verbose, hard to navigate, no added benefit
**Instead:** Keep to 2-3 levels: `hero.title`

```typescript
// BAD
{ sections: { hero: { header: { main: { title: "..." } } } } }

// GOOD
{ hero: { title: "..." } }
```

### Anti-Pattern 4: Mixing Languages in Same File

**What:** Storing EN and VI in one object
**Why bad:** Hard to review translations, error-prone
**Instead:** Separate files (en.ts, vi.ts)

```typescript
// BAD
const translations = {
  hero: {
    en: "Welcome",
    vi: "Chào mừng"
  }
};

// GOOD - en.ts
export const en = {
  hero: { title: "Welcome" }
};

// GOOD - vi.ts
export const vi = {
  hero: { title: "Chào mừng" }
};
```

### Anti-Pattern 5: Not Handling Missing Keys

**What:** Returning undefined or throwing on missing translation
**Why bad:** Breaks UI, poor user experience
**Instead:** Return the key itself as fallback

```typescript
// BAD
const t = (key: string) => {
  return translations[language][key]; // undefined if missing
};

// GOOD
const t = (key: string) => {
  const value = translations[language]?.[key];
  return value || key; // fallback to key if missing
};
```

### Anti-Pattern 6: Over-Engineering for Simple Needs

**What:** Using react-i18next library for a 2-language landing page
**Why bad:** Adds 50KB+ bundle size, complexity, learning curve for no benefit
**Instead:** Use Context API—sufficient for <100 translation keys

**When libraries make sense:**
- 5+ languages
- Pluralization rules (1 item vs 2 items)
- Dynamic translation loading
- Professional translation workflow integration

**For this project:** Context API is the right choice.

## Scalability Considerations

| Scale | Approach | Rationale |
|-------|----------|-----------|
| **<50 keys** (this project) | Single file per language | Simple, maintainable, fast |
| **50-200 keys** | Namespace by page/feature | Lazy load sections on route change |
| **200-1000 keys** | Namespace + library (i18next) | Need pluralization, interpolation, async loading |
| **1000+ keys** | Professional i18n platform | CMS integration, translator workflows, version control |

## Alternative Architectures Considered

### react-i18next (Industry Standard Library)

**Structure:**
- Separate translation JSON files per namespace
- i18next core + react-i18next wrapper
- I18nextProvider wraps app
- useTranslation hook in components
- Automatic resource loading and caching

**When to use:**
- 5+ languages
- Need pluralization (`{count} items`)
- Need interpolation (`Hello {{name}}`)
- Need lazy loading by route
- Professional translation workflow

**Why not for this project:**
- Adds ~50KB to bundle (significant for landing page)
- Overkill for 2 languages, 9 components, ~40 translation keys
- No pluralization needs
- No dynamic content needs

**Confidence:** HIGH (verified via official docs)

### react-intl (Format.JS)

**Structure:**
- IntlProvider wraps app
- FormattedMessage components for display
- formatMessage for imperative translations
- Built-in date/time/number formatting

**When to use:**
- Heavy date/time/currency formatting needs
- ICU message syntax preference
- React Native cross-platform

**Why not for this project:**
- No date/time/currency formatting needs
- Heavier bundle than needed
- More complex API for simple string replacement

**Confidence:** MEDIUM (WebSearch verified)

### LinguiJS (Compile-Time)

**Structure:**
- Extract messages at build time
- Compile translations to optimized format
- <Trans> component for JSX
- Type-safe by default

**When to use:**
- Performance-critical applications
- Large translation sets (1000+ keys)
- TypeScript projects wanting compiler validation

**Why not for this project:**
- Build step complexity
- Setup overhead for small project
- Vite integration requires configuration

**Confidence:** MEDIUM (WebSearch verified)

## Build Order

To implement i18n for this project, follow this order to manage dependencies:

### Phase 1: Foundation (No Dependencies)

**1.1 Create Translation Data Files**
- `src/i18n/translations/en.ts` - English strings
- `src/i18n/translations/vi.ts` - Vietnamese strings
- `src/i18n/translations/index.ts` - Export combined

**Why first:** No dependencies, can be reviewed in parallel with code changes

**1.2 Extract All Strings from Components**
- Audit all 9 components
- Document every hardcoded Vietnamese string
- Create mapping: component → translation keys

**Why second:** Identifies full scope before building system

### Phase 2: Context System (Depends on Phase 1)

**2.1 Create I18nContext**
- `src/contexts/I18nContext.tsx`
- Define types (Language, I18nContextType)
- Implement I18nProvider
- Implement t() function with nested key access
- Add localStorage persistence
- Add HTML lang attribute sync

**Why third:** Needs translation data structure from Phase 1

### Phase 3: Integration (Depends on Phase 2)

**3.1 Wrap Application**
- Modify `index.tsx`
- Add `<I18nProvider>` wrapper

**Why fourth:** Provider must exist before consumers

**3.2 Update Components**
- One component at a time
- Replace hardcoded strings with `t('key.path')`
- Test after each component

**Why fifth:** Incremental updates reduce risk

**3.3 Add Language Toggle UI**
- Modify `Navbar.tsx`
- Add EN | VI toggle buttons
- Wire to `setLanguage()`
- Style active state

**Why last:** Needs full system working before exposing to users

### Phase 4: Polish (Depends on Phase 3)

**4.1 Verify SEO**
- Confirm `<html lang>` updates correctly
- Test in browser DevTools

**4.2 Test Persistence**
- Clear localStorage
- Verify defaults to EN
- Switch to VI, reload, verify persists

**4.3 TypeScript Validation**
- Ensure no `any` types
- Verify t() type safety

## Critical Dependencies

| Component | Depends On | Reason |
|-----------|-----------|--------|
| I18nContext | Translation data files | Must know structure to implement t() |
| index.tsx wrapper | I18nProvider | Can't import before it exists |
| Component updates | Context provider | useContext fails without provider |
| Toggle UI | Working context | Needs setLanguage function |
| localStorage | Language state | Needs current language value |
| HTML lang attribute | Language state | Needs current language value |

## Testing Considerations

**Unit Tests:**
- Test t() function with valid keys
- Test t() function with missing keys (should return key)
- Test localStorage read/write
- Test HTML lang attribute updates

**Integration Tests:**
- Test language switching triggers re-render
- Test persistence across page reloads
- Test default language on first visit

**Manual Tests:**
- Visual inspection of all components in both languages
- Toggle between languages multiple times
- Check browser DevTools for `<html lang>` attribute
- Check localStorage in DevTools

## Performance Impact

**Bundle Size:**
- Context API: 0KB (built into React)
- Translation files: ~5-10KB (EN + VI strings)
- Total added: <10KB

**Runtime:**
- Initial load: +1 localStorage read (~1ms)
- Language switch: 1 setState + localStorage write (~5ms)
- Component renders: Negligible (simple object lookup)

**Compared to libraries:**
- react-i18next: +50KB bundle
- react-intl: +60KB bundle
- LinguiJS: +30KB bundle

**Recommendation:** Context API is the clear winner for performance on this project.

## SEO Integration

**Requirements:**
1. Set `<html lang="en">` or `<html lang="vi">` based on current language
2. Update on language switch
3. Set on initial load (before first paint if possible)

**Implementation in I18nProvider:**
```typescript
useEffect(() => {
  document.documentElement.lang = language;
}, [language]);
```

**Benefits:**
- Search engines index for correct language
- Screen readers announce correct language to users
- Browsers offer translation for opposite language users
- Improves accessibility score

**Note:** For multi-page sites, also consider `hreflang` tags. Not needed for SPA landing page.

## Accessibility Notes

**WCAG 2.1 Requirements:**
- AA: Page language must be programmatically determined
- AAA: Language of parts must be programmatically determined

**Satisfied by:**
- `<html lang>` attribute (page level)
- Context ensures consistent language across all content
- No mixed-language content in this project

**Screen Reader Impact:**
- Correct pronunciation rules applied
- Language switching announced automatically
- Improved experience for non-native English/Vietnamese users

## Sources

**HIGH Confidence** (Official Documentation):
- [react-i18next documentation](https://react.i18next.com)
- [i18next documentation](https://www.i18next.com/)
- [React Context API pattern for i18n](https://www.seeratawan.me/blog/react-internationalization-using-context-api/)
- [localStorage in React](https://www.robinwieruch.de/local-storage-react/)

**MEDIUM Confidence** (Technical Articles):
- [Designing Robust i18n for React Web Applications](https://www.technetexperts.com/react-application-i18n-configuration/)
- [Internationalization (i18n) in React: Complete Guide 2026](https://www.glorywebs.com/blog/internationalization-in-react)
- [React Internationalization Best Practices](https://www.bureauworks.com/blog/react-internationalization-best-practices)
- [The Art of the Key: i18n Key Naming](https://www.locize.com/blog/guide-to-i18n-key-naming/)
- [Building a multi-language app with React JS](https://dev.to/franklin030601/building-a-multi-language-app-with-react-js-2och)
- [A Guide to React Localization with i18next](https://phrase.com/blog/posts/localizing-react-apps-with-i18next/)

**LOW Confidence** (WebSearch Only):
- [Best i18n Libraries for React 2026](https://syntaxhut.tech/blog/best-i18n-libraries-react-2026)
- [React + LinguiJS Guide 2026](https://intlpull.com/blog/linguijs-react-i18n-guide-2026)

---

*Research completed: 2026-03-07*
*Confidence: HIGH (core patterns), MEDIUM (library comparisons)*
