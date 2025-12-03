/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/frontend/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        haunted: {
          dark: '#1a0b2e',
          purple: '#4a1a6b',
          orange: '#ff6b35',
          green: '#2dd881',
          gray: '#2d2d3a',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        dyslexic: ['OpenDyslexic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
