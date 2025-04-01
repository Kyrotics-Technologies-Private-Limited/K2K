/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'sans': ['"DM Sans"', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'titillium': ['"Titillium Web"', 'sans-serif'],
        'merriweather': ['"Merriweather"', 'serif'],
        'delius': ['"Delius"', 'serif'],
        'dm-serif-display': ['"DM Serif Display"', 'serif'],
        'lora': ['"Lora"', 'serif'],
        'Quando': ["Quando", 'serif'],
        'lato': ["Lato", 'sans-serif']
      }, animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        green: {
          brand: '#0C6908', // Your custom green brand color
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#0C6908',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [],
};