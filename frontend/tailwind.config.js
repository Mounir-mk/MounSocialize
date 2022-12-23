/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-dianne": "#0C3944",
        "cerise-dark": "#9B084F",
      },
    },
    plugins: [],
  },
};
