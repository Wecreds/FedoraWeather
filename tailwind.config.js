/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F0F5EF",
        "black": "#161A1E"
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
  },
  plugins: [],
}

