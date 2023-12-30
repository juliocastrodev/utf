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
      gridTemplateColumns: {
        "auto-fit-150": "repeat(auto-fit, minmax(150px, 1fr))",
        "auto-fit-200": "repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
}
