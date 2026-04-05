/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keeping your brand primary color
        primary: "#ff6b6b", 
      }
    },
  },
  plugins: [daisyui], // Use the imported variable here
  daisyui: {
    themes: ["light", "cupcake"],
  },
}