/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          'primary': '#be5649',
        },
        fontFamily: {
          'chakra': ['Chakra Petch', 'sans-serif'],
        }
      },
    },
    plugins: [
      require('tailwind-scrollbar'),
    ]
  };
  