'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function WindowChrome() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const handleThemeClick = () => {
    const currentIndex = availableThemes.indexOf(currentTheme.name);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: currentTheme.colors.bg === '#0d1117' 
          ? '#161b22'
          : currentTheme.colors.bg === '#1e1e1e'
          ? '#252526'
          : currentTheme.colors.bg === '#282a36'
          ? '#2e303e'
          : currentTheme.colors.bg === '#2e3440'
          ? '#3b4252'
          : currentTheme.colors.bg === '#300a24'
          ? '#3d0f2e'
          : '#131729',
        borderBottom: `1px solid ${currentTheme.colors.accent}55`,
        userSelect: 'none',
      }}
    >
      {/* macOS-style window buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div 
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ff5f56',
            cursor: 'not-allowed',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = '0 0 8px rgba(255, 95, 86, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="Close"
        />
        <div 
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ffbd2e',
            cursor: 'not-allowed',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = '0 0 8px rgba(255, 189, 46, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="Minimize"
        />
        <div 
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#27c93f',
            cursor: 'not-allowed',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = '0 0 8px rgba(39, 201, 63, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="Maximize"
        />
      </div>

      {/* Terminal title */}
      <div 
        style={{ 
          fontSize: '14px',
          fontWeight: 500,
          color: currentTheme.colors.text,
        }}
      >
        guest@portfolio.dev
      </div>

      {/* Theme switcher button - NOW CLICKABLE */}
      <button
        onClick={handleThemeClick}
        style={{ 
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '4px',
          color: currentTheme.colors.accent,
          backgroundColor: currentTheme.colors.accent + '33',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = currentTheme.colors.accent + '55';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = currentTheme.colors.accent + '33';
        }}
        title="Click to change theme"
      >
        {currentTheme.displayName}
      </button>
    </div>
  );
}
