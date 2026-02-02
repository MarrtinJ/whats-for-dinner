# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` - Start Expo dev server
- `npm run ios` - Start on iOS simulator
- `npm run android` - Start on Android emulator
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Auto-fix lint and formatting issues

## Architecture

This is a React Native/Expo app that uses the device camera to photograph food ingredients and uses Claude's vision API to identify them.

### Tech Stack
- Expo SDK 54 with expo-router for file-based routing
- NativeWind (Tailwind CSS for React Native) for styling
- TypeScript

### Key Directories

- `app/` - Expo Router screens (file-based routing)
  - `index.tsx` - Camera screen (main entry)
  - `results.tsx` - Shows detected ingredients from a photo
- `src/components/` - Reusable UI components
- `src/hooks/` - React hooks (`useCamera`, `useIngredientDetection`)
- `src/services/anthropic.ts` - Claude API integration for ingredient detection
- `src/utils/image.ts` - Image preprocessing (resize, base64 encoding)
- `src/types/` - TypeScript type definitions

### Data Flow

1. `CameraScreen` captures photo via `useCamera` hook
2. Photo URI passed to `/results` screen via route params
3. `useIngredientDetection` hook processes image:
   - `prepareImageForApi()` resizes to 951x1268 and encodes to base64
   - `detectIngredients()` sends to Claude API with vision prompt
   - Returns array of `DetectedIngredient` objects with name and confidence

## Environment

Requires `EXPO_PUBLIC_ANTHROPIC_API_KEY` environment variable for Claude API access.
