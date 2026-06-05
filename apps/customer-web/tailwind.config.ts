import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf9f2',
          100: '#f5f0de',
          200: '#eaddbc',
          300: '#dec291',
          400: '#d2a465',
          500: '#c88c42',
          600: '#b87535',
          700: '#9a5c2d',
          800: '#7e4b29',
          900: '#663e23',
        },
        champagne: '#F7E7CE',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;
