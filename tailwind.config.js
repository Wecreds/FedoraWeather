/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#798C8C",
        "secundary-color":"#AEBFBE",
        "tertiary-color": "tertiary",
        "white": "#F2EFDF",
        "black": "#161A1E"
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container
  },
  plugins: [],
}

