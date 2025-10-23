import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Terminal color themes - we'll have 6 themes
        terminal: {
          // Matrix theme (classic green on black)
          matrix: {
            bg: '#0d1117',
            text: '#00ff41',
            accent: '#00ff41',
            prompt: '#00cc33',
            error: '#ff0000',
          },
          // VS Code Dark+ theme
          vscode: {
            bg: '#1e1e1e',
            text: '#d4d4d4',
            accent: '#4ec9b0',
            prompt: '#569cd6',
            error: '#f48771',
          },
          // Dracula theme (purple/pink)
          dracula: {
            bg: '#282a36',
            text: '#f8f8f2',
            accent: '#bd93f9',
            prompt: '#ff79c6',
            error: '#ff5555',
          },
          // Nord theme (blue-gray)
          nord: {
            bg: '#2e3440',
            text: '#d8dee9',
            accent: '#88c0d0',
            prompt: '#81a1c1',
            error: '#bf616a',
          },
          // Ubuntu theme (orange accent)
          ubuntu: {
            bg: '#300a24',
            text: '#ffffff',
            accent: '#dd4814',
            prompt: '#5e2750',
            error: '#ff0000',
          },
          // Cyberpunk theme (neon)
          cyberpunk: {
            bg: '#0a0e27',
            text: '#00fff9',
            accent: '#ff006e',
            prompt: '#ffbe0b',
            error: '#fb5607',
          },
        },
      },
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'Monaco',
          'Courier New',
          'monospace',
        ],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        typing: 'typing 2s steps(40) 1s',
      },
    },
  },
  plugins: [],
};

export default config;
