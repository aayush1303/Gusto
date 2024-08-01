/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      borderRadius: {
        'custom-tl': '15px',
        'custom-tr': '15px',
        'custom-bl': '0',
        'custom-br': '0',
      },
    },
  },
  plugins: [],
}