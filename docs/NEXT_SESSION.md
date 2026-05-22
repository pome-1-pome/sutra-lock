# Sutra Lock - Next Session Guide

This file helps resume development after a break. Read this first when starting a new session.

## Current Status

**Phase**: Documentation complete. Ready to begin implementation.

**Last completed**: Project documentation (all 7 files in `docs/`)

**Next task**: PWA configuration (Phase 1 in TASKS.md)

## What to Do Next

1. **Configure PWA support**
   - Create `public/manifest.json` with app metadata
   - Generate PWA icons for `public/icons/`
   - Add PWA meta tags to `src/app/layout.tsx`
   - Set up Service Worker

2. **Build core UI** (Phase 2)
   - Create `PledgeScreen` and `TimerScreen` components
   - Implement screen transition in `page.tsx`

## Key Files to Review

| File | Purpose |
|------|---------|
| `docs/PROJECT_SPEC.md` | Full requirements |
| `docs/TASKS.md` | Task checklist with progress |
| `docs/ARCHITECTURE.md` | Planned directory structure and design |
| `src/app/page.tsx` | Main entry point |
| `package.json` | Dependencies and scripts |

## Decisions Already Made

- **State management**: React state + localStorage (no external library)
- **Speech API**: Web Speech API with Japanese (`ja-JP`) locale
- **Similarity threshold**: 80% character-level match
- **Timer duration**: 15 minutes (hardcoded for v1)
- **Deployment**: Vercel
- **Scope**: Japanese only, no auth, no backend

## How to Run

```bash
npm run dev    # Start dev server at http://localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
```

## Important Constraints

- **Mobile-first**: All UI decisions should prioritize smartphone screens
- **Privacy**: No external API calls; all processing is on-device
- **Web Speech API**: Requires HTTPS in production; works on localhost for dev
- **iOS Safari**: Web Speech API support is limited — plan for graceful degradation
