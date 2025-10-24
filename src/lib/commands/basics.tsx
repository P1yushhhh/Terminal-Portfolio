import React from 'react';
import { registerCommand, getAllCommands } from './registry';

// HELP command
registerCommand({
  name: 'help',
  description: 'Display available commands',
  usage: 'help',
  handler: () => {
    const commands = getAllCommands();
    return (
      <div>
        <div style={{ marginBottom: '16px', color: '#50fa7b' }}>
          Available Commands:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {commands.map((cmd) => (
            <div key={cmd.name} style={{ display: 'flex', gap: '16px' }}>
              <span style={{ color: '#8be9fd', minWidth: '120px', fontWeight: 'bold' }}>
                {cmd.name}
              </span>
              <span style={{ color: '#f8f8f2', opacity: 0.8 }}>
                {cmd.description}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '16px', opacity: 0.6, fontSize: '14px' }}>
          Type <span style={{ color: '#50fa7b' }}>command --help</span> for detailed usage
        </div>
      </div>
    );
  },
});

// CLEAR command
registerCommand({
  name: 'clear',
  description: 'Clear the terminal screen',
  usage: 'clear',
  aliases: ['cls'],
  handler: () => {
    // This will be handled specially in the terminal component
    return <span style={{ color: '#50fa7b' }}>Terminal cleared</span>;
  },
});

// ECHO command
registerCommand({
  name: 'echo',
  description: 'Display a line of text',
  usage: 'echo <text>',
  handler: (args) => {
    if (args.length === 0) {
      return <span style={{ opacity: 0.6 }}>Usage: echo &lt;text&gt;</span>;
    }
    return <span>{args.join(' ')}</span>;
  },
});

// WHOAMI command
registerCommand({
  name: 'whoami',
  description: 'Display information about me',
  usage: 'whoami',
  handler: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ color: '#50fa7b', fontSize: '18px', fontWeight: 'bold' }}>
          Piyush Chawla
        </div>
        <div style={{ color: '#f8f8f2', opacity: 0.9 }}>
          ML Engineer | Cloud Architect | Product Manager
        </div>
        <div style={{ marginTop: '8px', opacity: 0.7 }}>
          🎓 B.E. Electronics and Computer Science @ Thapar Institute
        </div>
        <div style={{ opacity: 0.7 }}>
          📍 Based in India
        </div>
        <div style={{ marginTop: '12px', opacity: 0.8 }}>
          Passionate about MLOps, Cloud Infrastructure, and Product Strategy.
          <br />
          Type <span style={{ color: '#8be9fd' }}>about</span> to learn more about my journey.
        </div>
      </div>
    );
  },
});
