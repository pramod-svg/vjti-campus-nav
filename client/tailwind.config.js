/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        campus: {
          navy: '#0B132B',
          dark: '#1C2541',
          slate: '#3A506B',
          cyan: '#5BC0BE',
          electric: '#3B82F6',
          accent: '#6FFFE9',
          lightBg: '#F8FAFC',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(91, 192, 190, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glass': '0 8px 32px 0 rgba(11, 19, 43, 0.08)',
      },
    },
  },
  plugins: [],
}
