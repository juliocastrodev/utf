/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#05396b",
        secondary: "#032348",
        background: "#5cdb94",
        error: "#ff0000",
      },
      fontFamily: {
        standard: ["Bebas Neue", "sans-serif"],
        retro: ["'Press Start 2P'", "sans-serif"],
      },
      gridTemplateColumns: {
        "auto-fill-150": "repeat(auto-fill, minmax(150px, 1fr))",
        "auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
}
