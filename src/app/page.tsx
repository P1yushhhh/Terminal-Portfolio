'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import WindowChrome from '@/components/WindowChrome';

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center py-24 px-4"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Terminal window container with fixed size */}
      <div 
        className="w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl border mt-8"
        style={{ 
          borderColor: currentTheme.colors.accent,
          borderWidth: '2px',
          height: '600px',
        }}
      >
        {/* Window chrome (macOS-style header) */}
        <WindowChrome />

        {/* Terminal content area */}
        <div 
          className="p-4 font-mono overflow-y-auto"
          style={{ 
            backgroundColor: currentTheme.colors.bg,
            color: currentTheme.colors.text,
            height: 'calc(100% - 57px)',
          }}
        >
          {/* Temporary welcome message */}
          <div className="space-y-2">
            <p style={{ color: currentTheme.colors.accent }}>
              Welcome to the Terminal Portfolio
            </p>
            <p style={{ color: currentTheme.colors.text }}>
              Type <span style={{ color: currentTheme.colors.prompt }}>help</span> to get started...
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span style={{ color: currentTheme.colors.prompt }}>guest@portfolio:~$</span>
              <span className="cursor-blink" style={{ color: currentTheme.colors.text }}></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
