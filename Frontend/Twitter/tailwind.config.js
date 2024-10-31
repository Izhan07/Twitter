/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'smoke-gray': 'rgba(169, 169, 169, 0.5)', 
      },
      screens:{
        'sm': '523px'
      } 
    },
  },
  plugins: [
    function ({ addUtilities}) {
      addUtilities({
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none', 
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none', 
        },
      });
    }
  ],
}

