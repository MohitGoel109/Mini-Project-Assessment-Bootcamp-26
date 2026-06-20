/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    './node_modules/@tremor/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tremor: {
          brand: {
            faint: 'var(--accent-glow)',
            muted: 'var(--accent-dark)',
            subtle: 'var(--accent-dim)',
            DEFAULT: 'var(--accent)',
            emphasis: 'var(--accent)',
            inverted: '#000000',
          },
          background: {
            muted: 'var(--bg-dark)',
            subtle: 'var(--bg-panel)',
            DEFAULT: 'var(--bg-card)',
            emphasis: 'var(--text-dim)',
          },
          border: { DEFAULT: 'var(--border)' },
          ring: { DEFAULT: 'var(--border)' },
          content: {
            subtle: 'var(--text-dim)',
            DEFAULT: 'var(--text-dim)',
            emphasis: 'var(--text)',
            strong: 'var(--text)',
            inverted: '#000000',
          },
        },
      },
    },
  },
  plugins: [],
}
