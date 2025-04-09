/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.html", "./components/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // força só o tema claro
  },
}
