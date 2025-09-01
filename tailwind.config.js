/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'chewy': ['Chewy', 'cursive'],
        'cursive': ['Dancing Script', 'Lobster', 'Pacifico', 'cursive'],
      },
      colors: {
        kerala: {
          // Light Mode Colors
          'deep-green': '#2E7D32',
          'coconut-white': '#FAFAFA',
          'banana-yellow': '#FFC107',
          // Dark Mode Colors
          'dark-palm': '#1B5E20',
          'charcoal': '#121212',
          'muted-gold': '#FFD54F',
          // Additional shades for better UI
          'green-50': '#E8F5E8',
          'green-100': '#C8E6C9',
          'green-700': '#388E3C',
          'green-800': '#2E7D32',
          'green-900': '#1B5E20'
        }
      }
    },
  },
  plugins: [],
}
