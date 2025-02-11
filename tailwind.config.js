module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
        },
      },
      backgroundImage: {
        hero: "url('./img/bghero.jpg')",
      },
    },
  },
  plugins: [],
};
