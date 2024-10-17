/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{ts,js,tsx,jsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            "libre": ["Libre Baskerville", "sans-serif"],
            "honk": ["Honk", "sans-serif"],
            "titillium": ["Titillium", "sans-serif"],
        }
    },
  },
  plugins: [],
}

