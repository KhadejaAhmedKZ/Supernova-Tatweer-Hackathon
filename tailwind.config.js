/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#04060f',
          900: '#070b18',
          800: '#0d1224',
          700: '#111827',
          600: '#1a2235',
        },
        brand: {
          purple: '#7c3aed',
          indigo: '#4f46e5',
          blue: '#2563eb',
          violet: '#8b5cf6',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4f46e5, #7c3aed, #6366f1)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.4)',
        glow: '0 0 30px rgba(99,102,241,0.3)',
        'glow-sm': '0 0 12px rgba(99,102,241,0.2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
