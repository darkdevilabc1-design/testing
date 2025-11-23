/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/js/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        '52px': ['52px', { lineHeight: '76px' }], // Custom size for H1
        '24px': ['24px', { lineHeight: '32px' }], // Custom size for H6
      },
      colors: {
        'primary-dark': '#000000',
        'secondary-yellow': '#FEFA17', 
        'text-gray': '#737373',
        'border-light': '#E4E6E8',
        'border-lighter': '#F2F4F6', // New border for header separation
        'header-accent-yellow': '#F09814', // 'Get This Now' color
        'background-light': '#F8F9FA', 
        'icon-light-gray': '#D6D7D8', // New color for input icons
      },
      borderRadius: {
        '32': '32px', 
        '16': '16px', 
        '50': '50px', 
      },
      boxShadow: {
        'search-lg': '0px 10px 20px rgba(0, 0, 0, 0.05)', // Box Shadow specified
        'card': '0 10px 20px rgba(0, 0, 0, 0.05)',
      },
      // Custom spacing/sizing for precise design elements
      spacing: {
        'p-x-50': '50px', 
        'hero-bg-h': '836px',
        'hero-h': '1066px',
        // Custom search element sizes
        'search-w-max': '1224px',
        'search-h': '230px',
        'app-btn-w-play': '204px',
        'app-btn-w-apple': '202px',
        'app-btn-h': '65px',
        'car-w': '979.19px',
        'car-h': '433.72px',
      }
    },
  },
  plugins: [],
}