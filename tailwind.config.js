/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Modern Purple/Indigo
          dark: '#4F46E5',
          light: '#818CF8',
        },
        success: '#10B981', // Success Green
        warning: '#F59E0B', // Warning Orange
        error: '#EF4444',   // Error Red
        background: '#F9FAFB', // Very light gray
        surface: '#FFFFFF',    // Pure white
        text: {
          main: '#111827',     // Almost black
          secondary: '#6B7280', // Medium gray
          muted: '#9CA3AF',    // Light gray
        },
        border: '#E5E7EB',     // Light gray
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
