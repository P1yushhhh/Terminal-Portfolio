'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

const MAX_HISTORY = 100; // Limit command history to prevent memory issues

// Counter for guaranteed unique IDs
let commandCounter = 0;

export function useTerminal() {
  const [outputs, setOutputs] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addOutput = useCallback((command: string, output: React.ReactNode) => {
    const newOutput: CommandOutput = {
      id: `cmd-${Date.now()}-${++commandCounter}`,
      command,
      output,
      timestamp: new Date(),
    };
    setOutputs((prev) => [...prev, newOutput]);
  }, []);

  const clearOutputs = useCallback(() => {
    setOutputs([]);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const addToHistory = useCallback((command: string) => {
    const trimmed = command.trim();
    if (trimmed) {
      setCommandHistory((prev) => {
        // Don't add duplicate if same as last command
        if (prev.length > 0 && prev[prev.length - 1] === trimmed) {
          return prev;
        }

        const newHistory = [...prev, trimmed];
        
        // Limit history size to prevent memory issues
        if (newHistory.length > MAX_HISTORY) {
          return newHistory.slice(-MAX_HISTORY);
        }
        
        return newHistory;
      });
      setHistoryIndex(-1);
    }
  }, []);

  const navigateHistory = useCallback(
    (direction: 'up' | 'down') => {
      if (commandHistory.length === 0) return;

      if (direction === 'up') {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex] || '');
      } else {
        const newIndex = historyIndex + 1;

        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex] || '');
        }
      }
    },
    [commandHistory, historyIndex]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    outputs,
    currentInput,
    setCurrentInput,
    commandHistory,
    historyIndex,
    inputRef,
    addOutput,
    clearOutputs,
    addToHistory,
    navigateHistory,
  };
}