import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#f7f3f0',
          100: '#ede7e2',
          200: '#d4ccc2',
          300: '#b8a99a',
          400: '#9b8468',
          500: '#7d6e56',
          600: '#645a47',
          700: '#524839',
          800: '#403a2f',
          900: '#332f26',
        },
        water: {
          50: '#f0fdff',
          100: '#ccfbff',
          200: '#99f1ff',
          300: '#66e4ff',
          400: '#33d4ff',
          500: '#00c2ff',
          600: '#00a9e6',
          700: '#008fcc',
          800: '#0074b3',
          900: '#005e99',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
