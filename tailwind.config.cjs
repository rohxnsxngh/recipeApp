/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        platinum: "#e8dfe0",
        "turtle-green": "#2e6930",
        "gray-blue": "#8a9ea7",
        tan: "#dab692",
        coconut: "#8f5b34",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("daisyui")],
};
