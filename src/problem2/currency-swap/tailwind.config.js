/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'p-0','p-1','p-2','p-3','p-4','p-5',
    'm-0','m-1','m-2','m-3','m-4','m-5',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
