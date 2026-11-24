/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EC',
        sand: '#F3E9CF',
        accent: '#E07B1A',
        ink: '#1A1A1A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -14px rgba(26,26,26,0.14)',
        lift: '0 40px 80px -30px rgba(26,26,26,0.35)',
        glass:
          'inset 0 1px 0 rgba(255,255,255,0.7), 0 24px 60px -24px rgba(26,26,26,0.28)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
