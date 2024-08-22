/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transformOrigin: {
        '3d': '50% 50%',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      perspective: {
        '1000': '1000px',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
      transformStyle: {
        preserve3d: 'preserve-3d',
      },
    },
  },
  plugins: [],
}

