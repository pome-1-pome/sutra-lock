# Sutra Lock - AI Assistant Context

Use this document to provide context when working with an AI coding assistant on this project.

## Project Summary

Sutra Lock is a PWA for combating smartphone addiction. The user reads a Japanese pledge aloud, and upon successful speech recognition, a 15-minute unlock timer begins. When the timer expires, the pledge must be read again.

## Tech Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Web Speech API for speech recognition
- localStorage for state persistence
- PWA (manifest + Service Worker)
- Deployed on Vercel

## Architecture Summary

- Two screens: `PledgeScreen` (read aloud) and `TimerScreen` (countdown)
- State: `{ screen: "pledge" | "timer", timerEndTime: number | null }`
- Custom hooks: `useSpeechRecognition`, `useTimer`
- Utility modules: `similarity.ts`, `pledge.ts`, `storage.ts`
- All processing on-device, no backend

## Prompt Template

When starting a new AI session, provide the following context:

```
This is a Next.js 16 + TypeScript + Tailwind CSS 4 PWA called "Sutra Lock".

Purpose: Smartphone addiction countermeasure. User reads a Japanese pledge
aloud, speech is recognized via Web Speech API, and a 15-minute unlock
timer starts on success.

Key docs:
- docs/PROJECT_SPEC.md — Full specification
- docs/TASKS.md — Task checklist
- docs/ARCHITECTURE.md — Architecture design
- docs/NEXT_SESSION.md — Current status and next steps

Current status: [describe where you left off]
Next task: [describe what you want to work on]

Constraints:
- Mobile-first, Japanese only (v1)
- No backend, no external APIs
- All state in localStorage
- Follow existing code patterns
```

## Coding Guidelines

- Use functional React components with hooks
- Prefer `"use client"` directive only where needed (speech API, timers)
- Keep components small and focused
- Use TypeScript strict mode
- Follow the directory structure in `ARCHITECTURE.md`
- Commit messages in English, concise imperative form

## Key Reference Files

| Document | What it contains |
|----------|-----------------|
| `docs/PROJECT_SPEC.md` | Requirements, scope, success criteria |
| `docs/TASKS.md` | Implementation checklist with phases |
| `docs/ARCHITECTURE.md` | Directory structure, state design, module specs |
| `docs/DEPLOY.md` | Vercel deployment instructions |
| `docs/PROGRESS_LOG.md` | Chronological development log |
| `docs/NEXT_SESSION.md` | Session resumption guide |
