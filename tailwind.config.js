/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,
      // and have default horizontal padding
      padding: '1rem',
      // but you can also disable it by default
      screens: {
        'sm': '600px',
        'md': '728px',
        'lg': '984px',
        'xl': '1240px',
        '2xl': '1496px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        logo: ['Rubik Vinyl', 'cursive'],
      },
      colors: {
        'regal-green': '#15272a',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

