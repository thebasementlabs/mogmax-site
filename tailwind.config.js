/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1C1C1E",
        card: "#2C2C2E",
        border: "#3A3A3C",
        accent: "#E8556D",
        secondary: "#8E8E93",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'system-ui', 'sans-serif'],
        heading: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
