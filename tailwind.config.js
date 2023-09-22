/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F1F1F1",
        "black": "#161A1E"
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
  },
  plugins: [],
}

