/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      fontFamily: {
        'lato': 'Lato'
      },
      colors: {
        'primary-1': '#00C6BE',
        'primary-2': '#00837E',
        'primary-3': '#003D3A',
        'secondary-1': '#ffffff',
        'secondary-2': '#555',
      },
      maxWidth: {
        'screen-xs': '520px'
      },
      screens: {
        'xs': '460px',
        'xm': '540px'
      }
    },
  },
  plugins: [],
}