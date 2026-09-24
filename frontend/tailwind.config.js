/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        // Brand palette
        brand: {
          red:    '#D91E2B',
          yellow: '#F5B82E',
          green:  '#137547',
          ivory:  '#F7F4EF',
          dark:   '#1A1A1A',
        },
        // Legacy brand scale (kept for compatibility)
        'brand-legacy': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#D91E2B',
          600: '#B81822',
          700: '#9a0e17',
          800: '#7a0b12',
          900: '#5c080d',
          950: '#3d0508',
        },
      },
      boxShadow: {
        'editorial': '0 4px 24px -4px rgba(0,0,0,0.10)',
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.14)',
        'luxe': '0 20px 40px -15px rgba(0,0,0,0.08)',
        'luxe-hover': '0 25px 50px -12px rgba(0,0,0,0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delay': 'float 3.5s ease-in-out 0.8s infinite',
        'shimmer': 'shimmer 1.8s infinite linear',
        'fade-up': 'fadeSlideUp 0.65s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
