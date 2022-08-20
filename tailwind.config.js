/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        emerald: colors.emerald,
        sky: colors.sky
      }
    },
  },
  plugins: [],
}
