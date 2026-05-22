# Sutra Lock - Architecture

## Directory Structure

```
sutra-lock/
├── docs/                     # Project documentation
├── public/
│   ├── icons/                # PWA icons (various sizes)
│   └── manifest.json         # Web App Manifest
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (meta, PWA tags)
│   │   ├── page.tsx          # Main entry point
│   │   └── globals.css       # Global styles (Tailwind)
│   ├── components/
│   │   ├── PledgeScreen.tsx   # Pledge display + mic button
│   │   ├── TimerScreen.tsx    # Countdown timer display
│   │   └── MicButton.tsx      # Microphone activation button
│   ├── hooks/
│   │   ├── useSpeechRecognition.ts  # Web Speech API wrapper
│   │   └── useTimer.ts              # Countdown timer logic
│   └── lib/
│       ├── similarity.ts     # Text similarity comparison
│       ├── pledge.ts          # Pledge text data
│       └── storage.ts         # localStorage helper
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

## Screen Flow

```
┌─────────────────┐
│  PledgeScreen    │
│                  │
│  誓約文を表示     │
│  [マイクボタン]   │
│                  │
│  音読 → 判定     │
└───────┬─────────┘
        │ success
        ▼
┌─────────────────┐
│  TimerScreen     │
│                  │
│  15:00 残り時間   │
│                  │
│  カウントダウン   │
└───────┬─────────┘
        │ timer expires
        ▼
┌─────────────────┐
│  PledgeScreen    │
│  (ループ)        │
└─────────────────┘
```

## State Management

The app uses React state with localStorage persistence. No external state management library is needed given the app's simplicity.

### App State

```typescript
type AppState = {
  screen: "pledge" | "timer";
  timerEndTime: number | null;  // Unix timestamp (ms)
};
```

- `screen`: Which screen is currently displayed
- `timerEndTime`: When the timer expires, stored as an absolute timestamp for accuracy across page reloads

### State Persistence

Timer state is stored in `localStorage` under the key `sutra-lock-state`. On mount, the app checks if a valid (non-expired) timer exists and restores it.

## Key Modules

### Speech Recognition (`useSpeechRecognition`)

Wraps the Web Speech API:
- Starts/stops listening
- Returns transcript text
- Handles permission errors
- Configured for Japanese (`lang: "ja-JP"`)

### Text Similarity (`similarity.ts`)

Compares the recognized speech against the pledge text:
- Normalizes whitespace and punctuation
- Calculates character-level similarity ratio
- Returns `true` if similarity exceeds threshold (default: 80%)

### Timer (`useTimer`)

Manages the countdown:
- Accepts an end timestamp
- Returns remaining seconds
- Calls an `onExpire` callback when time is up
- Uses `setInterval` with 1-second granularity

### Storage (`storage.ts`)

Thin wrapper around `localStorage`:
- Type-safe get/set for app state
- Handles JSON serialization
- Gracefully handles missing or corrupted data

## PWA Configuration

- **Manifest**: `public/manifest.json` defines app name, icons, theme color, display mode (`standalone`)
- **Service Worker**: Caches core assets for offline access
- **Meta tags**: `<meta name="theme-color">`, `<link rel="manifest">`, Apple-specific tags in `layout.tsx`

## Browser Compatibility

| Feature | Chrome Android | Safari iOS | Notes |
|---------|---------------|------------|-------|
| Web Speech API | Supported | Partial | iOS may require user gesture |
| PWA Install | Supported | Limited | iOS uses "Add to Home Screen" |
| Service Worker | Supported | Supported | — |
| localStorage | Supported | Supported | — |
