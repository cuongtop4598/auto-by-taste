# Auto By Taste

## What This Is

A landing page for Auto By Taste — a service that brings local AI to businesses using Apple Silicon hardware. The site showcases how M-series Macs can run powerful AI models locally, with complete data privacy and no recurring cloud costs.

## Core Value

Convince potential customers that local AI on Apple Silicon is viable, secure, and cost-effective — through clear visuals and compelling hardware/model comparisons.

## Requirements

### Validated

<!-- Existing capabilities from current codebase -->

- ✓ Hero section with product positioning and CTA — existing
- ✓ ModelHardwareGraph showing AI models vs RAM requirements — existing
- ✓ OrgChartAgents showing AI agent structures for 3 company types — existing
- ✓ AIArchitectureGraph showing system architecture — existing
- ✓ ServicePricing component with pricing tiers — existing
- ✓ Navbar with scroll-reactive behavior — existing
- ✓ Contact integration via Zalo — existing
- ✓ Glass-card UI styling with Tailwind — existing

### Active

<!-- Current scope: UI refactor + Mac search feature -->

- [ ] Animated particles background (neural network visualization style)
- [ ] High-tech glass/transparent aesthetic across all sections
- [ ] GPU computing visual theme throughout page
- [ ] Enhanced M-series chip presentation (M1/M2/M3/M4 capabilities)
- [ ] Unified Memory architecture explanation with visuals
- [ ] Performance data display (benchmarks, token speeds)
- [ ] Mac search feature: select Mac model → see compatible AI models

### Out of Scope

- Backend API integration — static site only for v1
- User accounts or authentication — landing page only
- E-commerce/payment processing — handled via Zalo contact
- Mobile app — web-first approach

## Context

**Technical environment:**
- React 19 SPA with Vite build tooling
- Tailwind CSS via CDN for styling
- Recharts for data visualization
- No backend — all data is static/hardcoded in components
- Existing glass-card animations and custom CSS in index.html

**Current state:**
- Landing page functional with 13 section components
- Vietnamese language content targeting local businesses
- Contact via Zalo messaging integration
- Images hosted on Vercel blob storage

**Known issues from codebase map:**
- Large components (OrgChartAgents 485 lines) — may need refactoring
- Hardcoded contact info across multiple files
- No testing infrastructure
- Missing mobile navigation menu

## Constraints

- **Tech stack**: React/Vite/Tailwind — maintain existing stack
- **Performance**: Particle animations must not impact page load or scroll performance
- **Compatibility**: Must work on modern browsers (Chrome, Safari, Firefox)
- **Content**: Vietnamese language for all user-facing text

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Animated particles for background | User preference for neural network visualization style | — Pending |
| Mac search by hardware model | User wants "pick Mac → see AI models" flow | — Pending |
| Keep static architecture | No backend needed for landing page | — Pending |

---
*Last updated: 2026-03-05 after initialization*
