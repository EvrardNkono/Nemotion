/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowNEmotion: '#FFD700',
        blackNEmotion: '#000000',
        grayNEmotion: '#1a1a1a',
      },
    },
  },
  plugins: [],
}
