/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#05396b",
        secondary: "#032348",
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
