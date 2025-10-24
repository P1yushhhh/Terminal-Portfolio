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
}

// Command registry (we'll add commands here)
const commands: Map<string, Command> = new Map();

// Register a new command
export function registerCommand(command: Command) {
  commands.set(command.name, command);
  // Register aliases
  if (command.aliases) {
    command.aliases.forEach((alias) => {
      commands.set(alias, command);
    });
  }
}

// Execute a command
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
    return React.createElement(
      'div',
      { style: { color: '#ff5555' } },
      React.createElement(React.Fragment, null,
        'Command not found: ',
        React.createElement('span', { style: { fontWeight: 'bold' } }, commandName),
        React.createElement('br', null),
        'Type ',
        React.createElement('span', { style: { color: '#50fa7b' } }, 'help'),
        ' to see available commands.'
      )
    );
  }

  // Execute command handler
  try {
    return command.handler(args);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return React.createElement(
      'div',
      { style: { color: '#ff5555' } },
      `Error executing command: ${errorMessage}`
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
