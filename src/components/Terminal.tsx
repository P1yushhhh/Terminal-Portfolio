'use client';

import React, { useEffect, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTerminal } from '@/hooks/useTerminal';
import { executeCommand, getCommandSuggestions } from '@/lib/commands/registry';
import '@/lib/commands/basics';
import '@/lib/commands/portfolio';

export default function Terminal() {
  const { currentTheme } = useTheme();
  const {
    outputs,
    currentInput,
    setCurrentInput,
    inputRef,
    addOutput,
    clearOutputs,
    addToHistory,
    navigateHistory,
  } = useTerminal();

  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      const command = currentInput.trim();
      if (!command) return;

      if (command.toLowerCase() === 'clear' || command.toLowerCase() === 'cls') {
        clearOutputs();
        setCurrentInput('');
        addToHistory(command);
        return;
      }

      const output = executeCommand(command);
      addOutput(command, output);
      addToHistory(command);
      setCurrentInput('');
      setSuggestions([]);
    },
    [currentInput, addOutput, addToHistory, clearOutputs, setCurrentInput]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateHistory('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateHistory('down');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const sug = getCommandSuggestions(currentInput);
        if (sug.length === 1) {
          setCurrentInput(sug[0]);
          setSuggestions([]);
        } else if (sug.length > 1) {
          setSuggestions(sug);
        }
      } else if (e.key === 'Escape') {
        setCurrentInput('');
        setSuggestions([]);
      }
    },
    [currentInput, navigateHistory, setCurrentInput]
  );

  useEffect(() => {
    if (currentInput) {
      const sug = getCommandSuggestions(currentInput);
      setSuggestions(sug);
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      });
    });
  }, [outputs]);

  // Mobile-specific: Focus input when terminal is tapped
  useEffect(() => {
    const handleTap = () => {
      if (inputRef.current && window.innerWidth <= 768) {
        inputRef.current.focus();
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('touchstart', handleTap);
      scrollContainer.addEventListener('click', handleTap);
      return () => {
        scrollContainer.removeEventListener('touchstart', handleTap);
        scrollContainer.removeEventListener('click', handleTap);
      };
    }
  }, [inputRef]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden', // Prevent container overflow
      }}
    >
      <div 
        ref={scrollContainerRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden', // Prevent horizontal scroll
          padding: '16px',
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        }}
      >
        {/* ASCII Art - Always visible */}
        <div style={{ marginBottom: '24px' }}>
          <pre style={{ 
            color: currentTheme.colors.accent, 
            fontSize: '10px', 
            lineHeight: '1.2', 
            fontFamily: 'monospace',
            marginBottom: '16px',
            overflow: 'auto',
            whiteSpace: 'pre', // Prevent text wrapping in ASCII art
            maxWidth: '100%', // Prevent overflow
          }}>
{`    _ __    __                           _                  __  
   (_) /_  / /___ _____ ___  ___  ____  (_)_  ____  _______/ /_ 
  / / __ \\/ / __ \`/ __ \`__ \\/ _ \\/ __ \\/ / / / / / / / ___/ __ \\
 / / /_/ / / /_/ / / / / / /  __/ /_/ / / /_/ / /_/ (__  ) / / /
/_/_.___/_/\\__,_/_/ /_/ /_/\\___/ .___/_/\\__, /\\__,_/____/_/ /_/ 
                              /_/      /____/`}
          </pre>

          <div style={{ color: currentTheme.colors.accent, fontSize: '16px', marginBottom: '8px' }}>
            Welcome to my terminal portfolio. (Version 1.0.0)
          </div>
          
          <div style={{ color: currentTheme.colors.text, opacity: 0.8, marginBottom: '8px' }}>
            This project's source code can be seen in this project's GitHub repo.
          </div>

          <div style={{ color: currentTheme.colors.text, opacity: 0.8 }}>
            For a list of available commands, type <span style={{ color: currentTheme.colors.prompt, fontWeight: 'bold' }}>help</span>.
          </div>
        </div>

        {/* Command history */}
        {outputs.map((output) => (
          <div key={output.id} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: currentTheme.colors.prompt, flexShrink: 0 }}>guest@portfolio:~$</span>
              <span style={{ color: currentTheme.colors.text, wordBreak: 'break-word' }}>{output.command}</span>
            </div>
            <div style={{ paddingLeft: '16px', color: currentTheme.colors.text, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {output.output}
            </div>
          </div>
        ))}

        {/* Current input prompt */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'nowrap' }}>
          <span style={{ color: currentTheme.colors.prompt, whiteSpace: 'nowrap', flexShrink: 0 }}>
            guest@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              minWidth: 0, // Allow flex shrinking
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: currentTheme.colors.text,
              fontFamily: 'inherit',
              fontSize: '16px', // Prevent iOS zoom
              caretColor: currentTheme.colors.accent,
            }}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </form>

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div style={{ 
            paddingLeft: '16px', 
            marginTop: '8px', 
            opacity: 0.8, 
            fontSize: '14px', 
            color: currentTheme.colors.text,
            wordWrap: 'break-word',
          }}>
            Suggestions: {suggestions.map((sug, i) => (
              <span key={sug}>
                <span style={{ color: currentTheme.colors.accent }}>{sug}</span>
                {i < suggestions.length - 1 && ', '}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
