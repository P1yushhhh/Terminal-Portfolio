'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available themes
export type ThemeName = 'dracula' | 'matrix' | 'vscode' | 'nord' | 'ubuntu' | 'cyberpunk';

// Theme configuration interface
interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    bg: string;
    text: string;
    accent: string;
    prompt: string;
    error: string;
  };
}

// All available themes
export const themes: Record<ThemeName, Theme> = {
  matrix: {
    name: 'matrix',
    displayName: 'Matrix',
    colors: {
      bg: '#0d1117',
      text: '#00ff41',
      accent: '#00ff41',
      prompt: '#00cc33',
      error: '#ff0000',
    },
  },
  vscode: {
    name: 'vscode',
    displayName: 'VS Code Dark+',
    colors: {
      bg: '#1e1e1e',
      text: '#d4d4d4',
      accent: '#4ec9b0',
      prompt: '#569cd6',
      error: '#f48771',
    },
  },
  dracula: {
    name: 'dracula',
    displayName: 'Dracula',
    colors: {
      bg: '#282a36',
      text: '#f8f8f2',
      accent: '#bd93f9',
      prompt: '#ff79c6',
      error: '#ff5555',
    },
  },
  nord: {
    name: 'nord',
    displayName: 'Nord',
    colors: {
      bg: '#2e3440',
      text: '#d8dee9',
      accent: '#88c0d0',
      prompt: '#81a1c1',
      error: '#bf616a',
    },
  },
  ubuntu: {
    name: 'ubuntu',
    displayName: 'Ubuntu',
    colors: {
      bg: '#300a24',
      text: '#ffffff',
      accent: '#e95420',
      prompt: '#dd4814',
      error: '#ff4136',
    },
  },
  cyberpunk: {
    name: 'cyberpunk',
    displayName: 'Cyberpunk',
    colors: {
      bg: '#0a0e27',
      text: '#00fff9',
      accent: '#ff006e',
      prompt: '#ffbe0b',
      error: '#fb5607',
    },
  },
};

// Context type
interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: ThemeName[];
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // ✅ Initialize with default theme
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.cyberpunk);
  const [mounted, setMounted] = useState(false);

  // ✅ Load saved theme ONLY on client side after mount (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);

    try {
      const savedTheme = localStorage.getItem('terminal-theme');
      
      // ✅ Validate saved theme exists in themes object
      if (savedTheme && savedTheme in themes) {
        setCurrentTheme(themes[savedTheme as ThemeName]);
      }
    } catch (error) {
      // ✅ Handle localStorage errors (Safari private mode, security policies)
      console.warn('Failed to load saved theme:', error);
      // Fallback to default theme (already set in useState)
    }
  }, []);

  // ✅ Function to change theme with validation and error handling
  const setTheme = (themeName: ThemeName) => {
    if (!themes[themeName]) {
      console.error(`Theme "${themeName}" does not exist`);
      return;
    }

    setCurrentTheme(themes[themeName]);

    // ✅ Save to localStorage with error handling
    try {
      localStorage.setItem('terminal-theme', themeName);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
      // Theme still works, just won't persist across sessions
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    availableThemes: Object.keys(themes) as ThemeName[],
  };

  // ✅ Prevent flash of unstyled content during hydration
  // Server renders with default theme, then client loads saved theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={value}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}