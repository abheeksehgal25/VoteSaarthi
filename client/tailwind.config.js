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
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        neutral: {
          light: '#f3f4f6',
          DEFAULT: '#6b7280',
          dark: '#1f2937',
        }
      },
      fontSize: {
        'touch-sm': ['18px', '28px'],
        'touch-base': ['20px', '32px'],
        'touch-lg': ['24px', '36px'],
        'touch-xl': ['28px', '40px'],
        'touch-2xl': ['32px', '44px'],
      },
      spacing: {
        'touch': '48px', // Minimum touch target size
        'touch-lg': '56px',
      }
    },
  },
  plugins: [],
}
