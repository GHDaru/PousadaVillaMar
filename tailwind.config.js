/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'villa-deep': '#003366',
        'villa-sea': '#70C1B3',
        'villa-sand': '#F5F5DC',
        'villa-shell': '#FAFAFA',
        'villa-gold': '#D4AF37',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
