/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FFF5EE',
          100: '#FFDDB0',
          200: '#FFCE9E',
          500: '#FFBE91',
          600: '#E09B6E',
          700: '#C27A4E',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FFFCE1',
          200: '#FAF7D0',
        },
        softblue: {
          100: '#E0F7FA',
          400: '#81D4FA',
          500: '#38BDF8',
          600: '#0284C7',
        },
        slatebg: {
          900: '#121824',
          800: '#1E293B',
          700: '#334155',
        },
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
};
