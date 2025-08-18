# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` or `npx expo start` - Start Expo development server
- `npm run android` - Run on Android device/emulator  
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser

### Code Quality
- `npm run check` - Run Biome linting and formatting checks
- `npm run check:fix` - Automatically fix linting and formatting issues
- `npm run check:unsafe` - Fix issues including potentially unsafe transformations

### Project Management
- `npm run reset-project` - Move starter code to app-example/ and create blank app/ directory

## Architecture Overview

This is a **React Native** app built with **Expo** and **Expo Router** for file-based navigation. The project follows a marketplace/TCG app pattern with tab-based navigation.

### Navigation Structure
- **Root Layout**: Stack navigation with hidden headers (`app/_layout.tsx`)
- **Tab Layout**: Bottom tab navigation with 4 main screens (`app/(tabs)/_layout.tsx`)
  - Home (`index.tsx`) 
  - Marketplace (`marketplace.tsx`) - Main screen with AI assistant listings
  - Favorites (`favorites.tsx`)
  - Profile (`profile.tsx`)

### Key Architectural Patterns
- **File-based routing**: Expo Router handles navigation based on file structure in `app/` directory
- **Component-driven**: Reusable components in `components/` directory
- **TypeScript interfaces**: Centralized type definitions in `types/index.ts`
- **Mock data**: Static data for AI assistants and categories defined in types

### Core Components
- `AIAssistantCard` - Main reusable card component for displaying AI assistant information
- Tab navigation with Ionicons and custom styling (purple theme: #8B5CF6)

### Data Models
- `AIAssistant` - Interface for AI assistant objects with id, name, description, rating, etc.
- `Category` - Interface for marketplace categories
- Mock data arrays: `MOCK_ASSISTANTS` and `CATEGORIES`

## Code Style & Standards

### Biome Configuration
- **Line width**: 140 characters
- **Quote style**: Single quotes for JavaScript
- **Indentation**: Spaces (not tabs)
- **Import organization**: Automatically organized
- **Key rules**: No unused variables/imports (warn), no parameter assignment (error)

### TypeScript Standards
- Use `import type` for type-only imports
- Export interfaces from `types/index.ts`
- Strict typing (avoid `any`)
- Component props interfaces required

### Component Structure Pattern
```typescript
// Imports: External libraries first, then internal
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ComponentProps } from '../types';

// Component with proper TypeScript typing
export const ComponentName: React.FC<ComponentProps> = ({ prop1 }) => {
  // Component logic
  return <View style={styles.container}>{/* JSX */}</View>;
};

// Styles at bottom using StyleSheet.create
const styles = StyleSheet.create({
  container: { /* styles */ },
});
```

### Design System
- **Primary**: `#8B5CF6` (purple)
- **Background**: `#F9FAFB` (light gray) 
- **Text**: `#111827` (dark), `#6B7280` (medium gray)
- **Spacing**: 8px, 12px, 16px increments
- **Tab bar**: White background with purple active tint

## Git Workflow

### Branch Strategy
- **Protected branches**: `main` (production), `dev` (integration)
- **Feature branches**: `feature/{issue-number}-short-description`
- **Process**: Create GitHub issue → Create branch → PR to `dev` → Code owner approval

### Before Committing
Always run linting before commits:
```bash
npm run check:fix
```

## Project Context

This is a KlonIT summer project for our organization Triton Consulting Group (TCG). The goal is to build a marketplace app for AI assistants, leveraging React Native and Expo Router for a modern mobile experience. The app will feature a tabbed interface with a focus on user-friendly design and reusable components. It will feature the ability to browse AI assistants, view details, and try out different AI chat features. 