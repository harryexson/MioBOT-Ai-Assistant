/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'Georgia', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#06061a',
          800: '#0d0d2e',
          700: '#111136',
          600: '#1a1a4e',
        },
        violet: {
          DEFAULT: '#7c3aed',
          light: '#8b5cf6',
          soft: '#a78bfa',
        },
      },
    },
  },
  plugins: [],
};
