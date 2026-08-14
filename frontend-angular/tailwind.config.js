/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FFF5F0',
          100: '#FFE8DC',
          200: '#FFD1B8',
          300: '#FFB48A',
          400: '#FF9466',
          500: '#E0663B',
          600: '#C84A20',
        },
        cream: '#FAF7F2',
        skyAccent: '#38BDF8',
      },
    },
  },
  plugins: [],
}
