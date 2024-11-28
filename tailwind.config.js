import { tailwindExtend } from './config/tailwind.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: tailwindExtend,
  },
  plugins: [
  ],
}

