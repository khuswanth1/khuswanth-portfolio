/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#6d5dfc',
        secondary: '#22d3ee',
        accent: '#f472b6',
        dark: {
          950: '#05060f',
          900: '#0a0c1c',
          800: '#10132a',
          700: '#1a1e3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-50px) scale(1.15)' },
          '66%': { transform: 'translate(-30px,30px) scale(0.9)' },
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(109, 93, 252, 0.55)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.5)',
      },
    },
  },
  plugins: [],
};