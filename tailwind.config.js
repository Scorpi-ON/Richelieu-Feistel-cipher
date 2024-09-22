/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'h-sm': {'raw': '(max-height: 640px)'},
        'h-md': {'raw': '(min-height: 641px) and (max-height: 768px)'},
        'h-lg': {'raw': '(min-height: 769px) and (max-height: 1024px)'},
        'h-xl': {'raw': '(min-height: 1025px)'},
      },
    },
  },
  plugins: [
      require('daisyui')
  ],
}