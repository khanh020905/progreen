/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f1',
          100: '#dcf1df',
          200: '#bbe1c2',
          300: '#8cc998',
          400: '#448438', // Secondary Green
          500: '#388e4a',
          600: '#287028', // Primary Forest Green
          700: '#235b31',
          800: '#1e492a',
          900: '#1a3d25',
          950: '#0e2114',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
