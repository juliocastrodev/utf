/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#05396b",
        background: "#5cdb94",
      },
      fontFamily: {
        standard: ["Bebas Neue", "sans-serif"],
        retro: ["'Press Start 2P'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
