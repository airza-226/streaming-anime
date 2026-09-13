import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted-foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
      },
      boxShadow: {
        glow: '0 0 24px hsl(var(--glow) / 0.45)',
      },
    },
  },
};

export default config;