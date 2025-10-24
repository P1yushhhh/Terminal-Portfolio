'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available themes
export type ThemeName = 'dracula' | 'matrix' | 'vscode'  | 'nord' | 'ubuntu' | 'cyberpunk';

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
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.cyberpunk); // Changed to cyberpunk

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('terminal-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(themes[savedTheme]);
    }
  }, []);

  // Function to change theme
  const setTheme = (themeName: ThemeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
      localStorage.setItem('terminal-theme', themeName);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    availableThemes: Object.keys(themes) as ThemeName[],
  };

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
