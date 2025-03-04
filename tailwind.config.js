module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.2' }],
        'title': ['2.25rem', { lineHeight: '2.5rem' }],
        'subtitle': ['1.5rem', { lineHeight: '2rem' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'small': ['0.875rem', { lineHeight: '1.25rem' }],
      },
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
        brand: {
          primary: '#3b82f6',    // Blue
          secondary: '#f43f5e',  // Rose
          accent: '#8b5cf6',     // Purple
          light: '#f0f9ff',      // Light blue
          dark: '#1e3a8a'        // Dark blue
        },
        neutral: {
          light: '#f8fafc',
          dark: '#0f172a'
        },
        accent: '#14b8a6',
        muted: '#64748b',
      },
      letterSpacing: {
        'tight': '-0.025em',
        'wide': '0.025em',
      },
      backgroundImage: {
        hero: "url('./img/bghero.jpg')",
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
