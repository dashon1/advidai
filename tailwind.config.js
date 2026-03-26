/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1600px',
      },
    },
    extend: {
      colors: {
        bg: {
          base: '#000000',
          surface: '#0a0a0a',
          elevated: '#141414',
          hover: '#1e1e1e',
          active: '#282828',
        },
        text: {
          primary: '#e4e4e7',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
          accent: '#22d3ee',
        },
        accent: {
          primary: '#22d3ee',
          hover: '#06b6d4',
          glow: 'rgba(34, 211, 238, 0.5)',
          dim: 'rgba(34, 211, 238, 0.15)',
        },
        status: {
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          strong: 'rgba(255, 255, 255, 0.2)',
          accent: '#22d3ee',
        },
      },
      fontFamily: {
        display: ["'Inter'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ["'Inter'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", "'Fira Code'", "'Consolas'", 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'glow-subtle': '0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-default': '0 0 0 1px rgba(255, 255, 255, 0.12), 0 4px 16px rgba(0, 0, 0, 0.6)',
        'glow-strong': '0 0 0 1px rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.8)',
        'glow-accent': '0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
