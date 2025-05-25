/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'doodle': ['Fredoka', 'sans-serif'],
        'doodle-body': ['Fredoka', 'Inter', 'sans-serif'],
        'doodle-fun': ['Fredoka', 'sans-serif'],
        'sans': ['Fredoka', 'Inter', 'sans-serif'],
      },
      fontWeight: {
        'extra-bold': '700',
        'super-bold': '800',
      },
      colors: {
        'pastel-pink': '#FFD4E5',
        'pastel-purple': '#E8D5FF',
        'pastel-blue': '#D4E5FF',
        'pastel-green': '#D5FFE8',
        'pastel-yellow': '#FFF5D4',
        'pastel-orange': '#FFE5D4',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
} 