# External Integrations

**Analysis Date:** 2026-03-05

## APIs & External Services

**Contact & Communication:**
- Zalo - Customer contact integration
  - Method: Direct link integration via `https://zalo.me/0337776435`
  - Usage locations: `components/Navbar.tsx`, `components/ServicePricing.tsx`, `App.tsx`
  - Implementation: Simple HTTP link target="_blank"
  - No API integration - direct messaging endpoint

**Google APIs:**
- Gemini API - Configured in environment but not actively used in frontend
  - Environment variable: `GEMINI_API_KEY`
  - Config: `vite.config.ts` injects as `process.env.GEMINI_API_KEY`
  - Status: Prepared for future backend integration

## Data Storage

**Databases:**
- None - Fully frontend application
- No database integration currently implemented

**File Storage:**
- None - Application is static/client-side only
- Assets loaded from CDN or relative paths

**Caching:**
- Browser cache only (HTTP cache headers)
- No server-side caching configured

## Authentication & Identity

**Auth Provider:**
- None - No authentication system implemented
- Application is public landing page with no user accounts

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Client-side only - browser console logs
- No centralized logging service

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase (deployment target flexible)
- Static file hosting compatible with any web server
- Suitable for Netlify, Vercel, GitHub Pages, traditional web servers

**CI Pipeline:**
- Not detected in codebase
- No CI configuration files present

## Environment Configuration

**Required env vars:**
- `GEMINI_API_KEY` - Optional for future use, not required for current functionality
  - File: `.env.local`
  - Usage: Referenced in `vite.config.ts` but not actively consumed by frontend code

**Secrets location:**
- `.env.local` file (git ignored)
- Not committed to repository

## External Resources

**CDN/Remote Resources:**
- Tailwind CSS - Loaded from CDN in `index.html`
  - Source: `https://cdn.tailwindcss.com`
- Google Fonts - Inter font family
  - Source: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800`
- Icons8 API - Icon images for messaging apps and hardware
  - Sources: `https://img.icons8.com/color/48/telegram-app.png`, `https://img.icons8.com/color/48/whatsapp.png`, `https://img.icons8.com/color/48/zalo.png`, etc.
  - Usage: `components/AIArchitectureGraph.tsx`, `components/ServicePricing.tsx`, `App.tsx`

**Import Maps (Browser ESM):**
- Esm.sh CDN imports configured in `index.html` importmap:
  - recharts@^3.7.0
  - react@^19.2.4
  - react-dom@^19.2.4
  - Note: These are configured in importmap but built/bundled by Vite for production

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Third-Party Services Integration Points

**Zalo Messaging:**
- Direct contact link: `https://zalo.me/[phone-number]`
- No webhook or API integration
- User redirected to Zalo app/web for direct messaging
- Phone number: 0337776435

---

*Integration audit: 2026-03-05*
