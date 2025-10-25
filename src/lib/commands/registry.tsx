import React from 'react';

// Command handler function type
export type CommandHandler = (args: string[]) => React.ReactNode;

// Command metadata
export interface Command {
  name: string;
  description: string;
  usage: string;
  handler: CommandHandler;
  aliases?: string[];
  category?: 'navigation' | 'info' | 'system' | 'social'; // ✅ Optional grouping for help command
}

// Command registry
const commands: Map<string, Command> = new Map();

// ✅ Register a new command with conflict detection
export function registerCommand(command: Command) {
  // Warn if overwriting existing command (helps catch bugs)
  if (commands.has(command.name)) {
    console.warn(`⚠️ Command "${command.name}" is already registered. Overwriting.`);
  }

  commands.set(command.name, command);

  // Register aliases with conflict detection
  if (command.aliases) {
    command.aliases.forEach((alias) => {
      if (commands.has(alias)) {
        console.warn(`⚠️ Alias "${alias}" conflicts with existing command. Skipping.`);
        return;
      }
      commands.set(alias, command);
    });
  }
}

// ✅ Execute a command with cleaner JSX syntax
export function executeCommand(input: string): React.ReactNode {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Parse command and arguments
  const parts = trimmed.split(/\s+/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Find command
  const command = commands.get(commandName);

  if (!command) {
    return (
      <div style={{ color: '#ff5555' }}>
        Command not found: <span style={{ fontWeight: 'bold' }}>{commandName}</span>
        <br />
        Type <span style={{ color: '#50fa7b' }}>help</span> to see available commands.
      </div>
    );
  }

  // Execute command handler with error boundary
  try {
    return command.handler(args);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return (
      <div style={{ color: '#ff5555' }}>
        Error executing command: {errorMessage}
        <br />
        <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
          Try <span style={{ color: '#50fa7b' }}>help</span> for usage info.
        </span>
      </div>
    );
  }
}

// Get all registered commands
export function getAllCommands(): Command[] {
  const uniqueCommands = new Map<string, Command>();
  commands.forEach((command) => {
    if (!uniqueCommands.has(command.name)) {
      uniqueCommands.set(command.name, command);
    }
  });
  return Array.from(uniqueCommands.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// Autocomplete suggestions
export function getCommandSuggestions(input: string): string[] {
  if (!input) return [];

  const lowerInput = input.toLowerCase();
  const suggestions: string[] = [];

  commands.forEach((command, name) => {
    if (name.startsWith(lowerInput) && !suggestions.includes(command.name)) {
      suggestions.push(command.name);
    }
  });

  return suggestions.slice(0, 5); // Return max 5 suggestions
}