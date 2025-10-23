'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// Type definitions
export interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

export interface TerminalState {
  outputs: CommandOutput[];
  commandHistory: string[];
  historyIndex: number;
  currentInput: string;
}

export function useTerminal() {
  const [outputs, setOutputs] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Add a new command output
  const addOutput = useCallback((command: string, output: React.ReactNode) => {
    const newOutput: CommandOutput = {
      id: `${Date.now()}-${Math.random()}`,
      command,
      output,
      timestamp: new Date(),
    };
    setOutputs((prev) => [...prev, newOutput]);
  }, []);

  // Clear all outputs
  const clearOutputs = useCallback(() => {
    setOutputs([]);
  }, []);

  // Add command to history
  const addToHistory = useCallback((command: string) => {
    if (command.trim()) {
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }
  }, []);

  // Navigate command history (arrow keys)
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
        const newIndex =
          historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setCurrentInput(newIndex === -1 ? '' : commandHistory[newIndex] || '');
      }
    },
    [commandHistory, historyIndex]
  );

  // Focus input on mount and when outputs change
  useEffect(() => {
    inputRef.current?.focus();
  }, [outputs]);

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
