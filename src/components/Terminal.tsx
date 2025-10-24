'use client';

import React, { useEffect, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTerminal } from '@/hooks/useTerminal';
import { executeCommand, getCommandSuggestions } from '@/lib/commands/registry';
import '@/lib/commands/basics';

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

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleTerminalClick}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'text',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {outputs.length === 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ color: currentTheme.colors.accent, fontSize: '16px', marginBottom: '8px' }}>
              Welcome to the Terminal Portfolio
            </div>
            <div style={{ color: currentTheme.colors.text, opacity: 0.8 }}>
              Type <span style={{ color: currentTheme.colors.prompt, fontWeight: 'bold' }}>help</span> to see available commands
            </div>
          </div>
        )}

        {outputs.map((output) => (
          <div key={output.id} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span style={{ color: currentTheme.colors.prompt }}>guest@portfolio:~$</span>
              <span style={{ color: currentTheme.colors.text }}>{output.command}</span>
            </div>
            <div style={{ paddingLeft: '16px', color: currentTheme.colors.text }}>
              {output.output}
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: currentTheme.colors.prompt, whiteSpace: 'nowrap' }}>
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
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: currentTheme.colors.text,
              fontFamily: 'inherit',
              fontSize: 'inherit',
              caretColor: currentTheme.colors.accent,
            }}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>

        {suggestions.length > 0 && (
          <div style={{ paddingLeft: '16px', marginTop: '8px', opacity: 0.6, fontSize: '14px' }}>
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
