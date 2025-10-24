'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import WindowChrome from '@/components/WindowChrome';
import Terminal from '@/components/Terminal';

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center py-24 px-4"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Terminal window container */}
      <div 
        className="w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl border-2"
        style={{ 
          borderColor: currentTheme.colors.accent,
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Window chrome */}
        <WindowChrome />

        {/* Terminal component */}
        <div 
          style={{ 
            flex: 1,
            backgroundColor: currentTheme.colors.bg,
            overflow: 'hidden',
          }}
        >
          <Terminal />
        </div>
      </div>
    </main>
  );
}
