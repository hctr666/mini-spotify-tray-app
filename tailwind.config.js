/** @type {import('tailwindcss/types/generated/colors').DefaultColors} */
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/app/index.html',
    './src/renderer/app/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.violet[700],
          dark: colors.violet[800],
        },
        success: colors.green[600],
        neutral: {
          DEFAULT: colors.gray[200],
          lighter: colors.gray[50],
        },
        error: colors.red[500],
        warning: colors.yellow[500],
      },
      opacity: {
        65: '.65',
      },
    },
  },
  plugins: [],
}
