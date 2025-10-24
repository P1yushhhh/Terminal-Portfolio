'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import WindowChrome from '@/components/WindowChrome';
import Terminal from '@/components/Terminal';

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <main 
      style={{ 
        backgroundColor: currentTheme.colors.bg,
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <div 
        style={{ 
          borderTop: `2px solid ${currentTheme.colors.accent}`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <WindowChrome />
        <Terminal />
      </div>
    </main>
  );
}
