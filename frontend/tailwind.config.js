/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        heading: ['Lexend', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Micro1 Refined Palette
        'mz-bg':        '#eef2f8', // soft cool slate background with depth
        'mz-bg-subtle': '#f3f6fb', 
        'mz-card':      '#ffffff',
        'mz-card-tint': '#edf2fc', // lavender tinted card surface
        // Borders
        'mz-border':    'rgba(0, 0, 0, 0.08)',
        'mz-border-subtle': 'rgba(0, 0, 0, 0.04)',
        // Typography
        'mz-text':      '#111317', 
        'mz-muted':     '#4f596a',
        'mz-subtle':    '#8b95a5',
        // Accent
        'mz-black':     '#0e1014',
      },
      animation: {
        'scroll-x': 'scroll-x 35s linear infinite',
      },
      keyframes: {
        'scroll-x': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'micro': '0 2px 10px -2px rgba(0, 0, 0, 0.04), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
        'micro-lg': '0 16px 36px -8px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.02)',
        'pill': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
