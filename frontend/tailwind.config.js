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
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        luxe: {
          black: '#090a0f',
          card: '#12141c',
          gold: '#dfa85b',
          goldLight: '#fbe2aa',
          accent: '#e65c00',
          smoke: '#181a24',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(249, 115, 22, 0.25)',
        'glow': '0 0 25px rgba(249, 115, 22, 0.35)',
        'glow-lg': '0 0 40px rgba(249, 115, 22, 0.45)',
        'luxe': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'luxe-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 1px 1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};
