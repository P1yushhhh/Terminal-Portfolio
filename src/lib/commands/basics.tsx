import React from 'react';
import { registerCommand, getAllCommands } from './registry';
import { useTheme } from '@/contexts/ThemeContext';

// ✅ Helper component to access theme colors (fixes hardcoded colors issue)
const ThemeWrapper = ({ children }: { children: (colors: any) => React.ReactNode }) => {
  const { currentTheme } = useTheme();
  return <>{children(currentTheme.colors)}</>;
};

// HELP command
registerCommand({
  name: 'help',
  description: 'Display available commands',
  usage: 'help [command]',  // ✅ Added optional command parameter
  category: 'system',  // ✅ Added category for grouping
  handler: (args) => {
    const commands = getAllCommands();
    
    // ✅ NEW: Show specific command help if requested
    if (args.length > 0) {
      const cmdName = args[0].toLowerCase();
      const cmd = commands.find(c => c.name === cmdName);
      
      if (!cmd) {
        return (
          <ThemeWrapper>
            {(colors) => (
              <div style={{ color: colors.error }}>
                Command not found: <span style={{ fontWeight: 'bold' }}>{cmdName}</span>
                <br />
                Type <span style={{ color: colors.accent }}>help</span> to see all commands.
              </div>
            )}
          </ThemeWrapper>
        );
      }
      
      return (
        <ThemeWrapper>
          {(colors) => (
            <div>
              <div style={{ color: colors.accent, fontWeight: 'bold', marginBottom: '8px' }}>
                {cmd.name}
              </div>
              <div style={{ color: colors.text, marginBottom: '8px' }}>
                {cmd.description}
              </div>
              <div style={{ color: colors.text, opacity: 0.7 }}>
                <span style={{ color: colors.prompt }}>Usage:</span> {cmd.usage}
              </div>
              {cmd.aliases && cmd.aliases.length > 0 && (
                <div style={{ color: colors.text, opacity: 0.7, marginTop: '4px' }}>
                  <span style={{ color: colors.prompt }}>Aliases:</span> {cmd.aliases.join(', ')}
                </div>
              )}
            </div>
          )}
        </ThemeWrapper>
      );
    }
    
    // ✅ Show all commands (existing behavior)
    return (
      <ThemeWrapper>
        {(colors) => (
          <div>
            <div style={{ marginBottom: '16px', color: colors.accent, fontWeight: 'bold' }}>
              Available Commands:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {commands.map((cmd) => (
                <div key={cmd.name} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ color: colors.accent, minWidth: '120px', fontWeight: 'bold' }}>
                    {cmd.name}
                  </span>
                  <span style={{ color: colors.text, opacity: 0.8 }}>
                    {cmd.description}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px', color: colors.text, opacity: 0.7, fontSize: '14px' }}>
              Type <span style={{ color: colors.accent }}>help &lt;command&gt;</span> for details about a specific command.
            </div>
          </div>
        )}
      </ThemeWrapper>
    );
  },
});

// CLEAR command
registerCommand({
  name: 'clear',
  description: 'Clear the terminal screen',
  usage: 'clear',
  aliases: ['cls'],
  category: 'system',  // ✅ Added category
  handler: () => {
    // This will be handled specially in the terminal component
    return (
      <ThemeWrapper>
        {(colors) => (
          <span style={{ color: colors.accent }}>Terminal cleared</span>
        )}
      </ThemeWrapper>
    );
  },
});

// ECHO command
registerCommand({
  name: 'echo',
  description: 'Display a line of text',
  usage: 'echo <text>',
  category: 'system',  // ✅ Added category
  handler: (args) => {
    if (args.length === 0) {
      return (
        <ThemeWrapper>
          {(colors) => (
            <span style={{ opacity: 0.6, color: colors.text }}>
              Usage: echo &lt;text&gt;
            </span>
          )}
        </ThemeWrapper>
      );
    }
    return (
      <ThemeWrapper>
        {(colors) => <span style={{ color: colors.text }}>{args.join(' ')}</span>}
      </ThemeWrapper>
    );
  },
});

