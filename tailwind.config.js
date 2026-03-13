/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-black': '#0a0a0a',
        'ai-dark': '#111111',
        'ai-card': '#1a1a1a',
        'ai-border': '#2a2a2a',
        'ai-muted': '#3a3a3a',
        'ai-gray': '#888888',
        'ai-light': '#cccccc',
        'ai-white': '#f5f5f5',
        'ai-accent': '#ffffff',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

