/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette – strictly black / white / deep-gray. NO yellow/gold.
        brand: {
          black:    '#0a0a0a',
          charcoal: '#1a1a1a',
          graphite: '#2d2d2d',
          iron:     '#3f3f3f',
          ash:      '#6b6b6b',
          silver:   '#9a9a9a',
          mist:     '#c8c8c8',
          smoke:    '#e5e5e5',
          offwhite: '#f5f5f5',
          white:    '#ffffff',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up':         'fade-up 0.6s ease-out forwards',
        'fade-in':         'fade-in 0.4s ease-out forwards',
        'slide-in-right':  'slide-in-right 0.5s ease-out forwards',
        shimmer:           'shimmer 2s linear infinite',
      },
      boxShadow: {
        'soft':   '0 2px 16px 0 rgba(0,0,0,0.08)',
        'medium': '0 4px 32px 0 rgba(0,0,0,0.14)',
        'strong': '0 8px 48px 0 rgba(0,0,0,0.22)',
        'card':   '0 1px 4px 0 rgba(0,0,0,0.06), 0 4px 24px 0 rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
}
