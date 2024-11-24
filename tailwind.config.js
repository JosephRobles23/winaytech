/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      height: {
        '50vh': '50vh', // 50% de la altura de la viewport
        '70vh': '70vh', // 75% de la altura de la viewport
      }
    }
  }
};
