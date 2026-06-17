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
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
        'glass-gradient': 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
    },
  },
  plugins: [],
};