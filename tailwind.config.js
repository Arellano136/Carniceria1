/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      }
    },
  },
}
module.exports = {

  plugins: [
      require('flowbite/plugin')
  ], 
  content: [
    "./node_modules/flowbite/**/*.js"
]
}

