/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-black': '#ffffff',
        'ai-dark': '#f8fafc',
        'ai-card': '#f1f5f9',
        'ai-border': '#e2e8f0',
        'ai-muted': '#93c5fd',
        'ai-gray': '#64748b',
        'ai-light': '#374151',
        'ai-white': '#1e3a5f',
        'ai-accent': '#2563eb',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

