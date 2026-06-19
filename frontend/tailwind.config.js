/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We'll define our gradient colors here
        'primary-gradient': {
          from: '#8B5CF6', // violet-600
          to: '#EC4899',   // pink-500
        },
        'secondary-gradient': {
          from: '#EC4899', // pink-500
          to: '#06B6D4',   // cyan-500
        },
        // Custom colors for Skillher
        'space-deep': '#0a0e1a',
        'space-black': '#05060a',
        'gold': '#e8b86d',
        'offwhite': '#f2f0ec',
        'muted': '#9aa0b8',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
        'glass-gradient': 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
    },
  },
  plugins: [],
};