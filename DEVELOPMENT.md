# AI Marketplace - Development Guide

## Project Structure

This React Native app follows Expo Router file-based routing and implements a tab-based navigation pattern.

```
app/
├── _layout.tsx          # Root layout with Stack navigation
├── index.tsx            # Entry point (redirects to marketplace)
└── (tabs)/              # Tab-based navigation group
    ├── _layout.tsx      # Tab layout configuration
    ├── index.tsx        # Home screen
    ├── marketplace.tsx  # Main marketplace screen
    ├── favorites.tsx    # Favorites screen
    └── profile.tsx      # Profile screen

components/
└── AIAssistantCard.tsx  # Reusable card component for AI assistants

types/
└── index.ts             # TypeScript interfaces and mock data
```

## Coding Standards

### 1. File Organization
- Use TypeScript for all new files
- Components should have a single responsibility
- Export types and interfaces from `types/` directory
- Use file-based routing with Expo Router

### 2. Component Structure
```typescript
// Component imports
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Type imports
import type { ComponentProps } from '../types';

// Component definition
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState('');

  // Event handlers
  const handlePress = () => {
    // handler logic
  };

  // Render
  return (
    <View style={styles.container}>
      {/* JSX content */}
    </View>
  );
};

// Styles at bottom
const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

### 3. Styling Guidelines
- Use StyleSheet.create for all styles
- Follow design system colors:
  - Primary: `#8B5CF6` (purple)
  - Background: `#F9FAFB` (light gray)
  - Text: `#111827` (dark gray)
  - Secondary text: `#6B7280` (medium gray)
- Use consistent spacing (8px, 12px, 16px)
- Implement responsive design with flex layouts

### 4. TypeScript Best Practices
- Define interfaces for all component props
- Use type imports where possible (`import type`)
- Export types from centralized location
- Use strict typing (avoid `any`)

### 5. Navigation
- Use Expo Router for all navigation
- Implement tab navigation for main screens
- Use proper screen options and icons
- Handle navigation state properly

## Component Examples

### Basic Screen Component
```typescript
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ScreenName() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen Title</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
});
```

### Reusable Component with Props
```typescript
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary' 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant]]} 
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#8B5CF6',
  },
  secondary: {
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#111827',
  },
});
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm run check` - Run Biome linting
- `npm run check:fix` - Fix linting issues automatically

## Development Workflow

1. **Before starting development:**
   ```bash
   npm run check
   ```

2. **Create new components:**
   - Place in `components/` directory
   - Follow naming convention (PascalCase)
   - Export from component file
   - Add TypeScript interfaces

3. **Create new screens:**
   - Place in appropriate `app/` directory
   - Use file-based routing naming
   - Include in navigation if needed

4. **Before committing:**
   ```bash
   npm run check:fix
   ```

## Key Features Implemented

### Marketplace Screen
- Search functionality for AI assistants
- Category filtering with expandable list
- Card-based layout for assistant display
- Rating and user count display

### Navigation
- Tab-based navigation with 4 main sections
- Auto-redirect from index to marketplace
- Consistent icon usage with Ionicons

### Component Architecture
- Reusable AIAssistantCard component
- TypeScript interfaces for data models
- Proper prop typing and component structure

## Future Enhancements

- Add detailed assistant view screens
- Implement favorites functionality
- Add user authentication and profile management
- Integrate with real API endpoints
- Add image loading and caching
- Implement search suggestions
- Add loading states and error handling