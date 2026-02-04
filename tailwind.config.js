/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6d56a4', // User defined purple
          dark: '#58458c',
          light: '#826eb3',
        },
        success: '#10B981', // Success Green
        warning: '#F59E0B', // Warning Orange
        error: '#EF4444',   // Error Red
        background: '#FAFAFA', // Neutral 50 (Warmer white)
        surface: '#FFFFFF',    // Pure white
        text: {
          main: '#171717',     // Neutral 900
          secondary: '#737373', // Neutral 500
          muted: '#A3A3A3',    // Neutral 400
        },
        border: '#E5E5E5',     // Neutral 200
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 4px rgba(0,0,0,0.02)',
        'soft-md': '0 4px 12px rgba(0,0,0,0.05)',
        'soft-lg': '0 8px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
