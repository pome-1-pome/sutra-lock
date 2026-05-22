# Sutra Lock - Project Specification

## Overview

**Sutra Lock** is a PWA designed to combat smartphone addiction. The user must read aloud a short pledge (誓約文) before unlocking their device usage. Upon successful speech recognition, a 15-minute unlock timer begins.

## Problem Statement

Smartphone overuse is a widespread issue. Existing screen-time tools rely on passive timers or simple taps to bypass restrictions. Sutra Lock introduces **intentional friction** — requiring the user to vocalize a pledge forces a moment of self-awareness before resuming phone usage.

## Core Concept

1. The app displays a short pledge text on screen
2. The user reads it aloud using their microphone
3. The Web Speech API evaluates whether the reading matches the text
4. On success, a 15-minute unlock timer starts
5. When the timer expires, the user must read aloud again

## Target Users

- Individuals who want to reduce mindless phone usage
- Students preparing for exams who need focus time
- Anyone seeking a mindfulness-based approach to digital wellness

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Speech Recognition | Web Speech API (SpeechRecognition) |
| PWA | next-pwa / Web App Manifest + Service Worker |
| State Management | React state + localStorage |
| Deployment | Vercel |

## Functional Requirements

### FR-1: Pledge Display
- Display a predefined Japanese pledge text on the main screen
- Text should be large and readable

### FR-2: Speech Recognition
- Use the Web Speech API (`SpeechRecognition`) to capture audio
- Compare spoken text against the displayed pledge
- Determine success using a similarity threshold (e.g., 80% match)

### FR-3: Unlock Timer
- On successful speech recognition, start a 15-minute countdown
- Display remaining time prominently
- Persist timer state in localStorage so it survives page reloads

### FR-4: Timer Expiry
- When the timer reaches zero, return to the pledge screen
- Notify the user with a visual/audio cue

### FR-5: PWA Support
- Installable as a home screen app on mobile devices
- Works offline (core UI renders without network)
- Includes Web App Manifest and Service Worker

## Non-Functional Requirements

- **Mobile-first**: Optimized for smartphone screens
- **Performance**: Lighthouse PWA score of 90+
- **Accessibility**: Sufficient color contrast, readable font sizes
- **Privacy**: All processing happens on-device; no data is sent to external servers
- **Browser Support**: Chrome (Android), Safari (iOS) — Web Speech API availability may vary

## Out of Scope (v1)

- User accounts or authentication
- Custom pledge text editing
- Backend server or database
- Usage analytics or tracking
- Multi-language support (Japanese only for v1)

## Success Criteria

- User can complete the full flow: read pledge → pass recognition → timer starts → timer expires → repeat
- App is installable as a PWA on Android Chrome
- All state persists across page reloads
