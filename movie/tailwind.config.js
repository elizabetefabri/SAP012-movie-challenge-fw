/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      "Roboto": ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        "color-header": "#0E1428",
        "color-background": "#040714",
        "color-font": "#FFFEFD",
        "color-red": "#E5382A",
      }
    },
  },
  plugins: [],
}

