/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#fafafa',
        primary: '#c9a227',
        'primary-foreground': '#0a0a0a',
        muted: '#171717',
        'muted-foreground': '#a3a3a3',
        accent: '#1a1a1a',
        'accent-foreground': '#fafafa',
        border: '#262626',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
