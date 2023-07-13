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
          DEFAULT: 'theme(colors.purple.700)',
          dark: 'theme(colors.purple.900)',
        },
        success: 'theme(colors.green.600)',
        neutral: {
          DEFAULT: 'theme(colors.gray.200)',
          lighter: 'theme(colors.gray.50)',
        },
        error: 'theme(colors.red.500)',
        warning: 'theme(colors.yellow.500)',
      },
    },
  },
  plugins: [],
}
