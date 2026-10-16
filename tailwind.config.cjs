/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'Georgia', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0f1035',
          800: '#1a1b4b',
          700: '#23245a',
          600: '#2d2f6e',
        },
        violet: {
          DEFAULT: '#7c3aed',
          light: '#8b5cf6',
          soft: '#a78bfa',
        },
        surface: '#f8f7ff',
        border: '#ede9fe',
      },
    },
  },
  plugins: [],
};
