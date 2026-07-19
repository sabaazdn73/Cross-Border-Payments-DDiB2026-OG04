/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Single restrained brand accent — a muted indigo-violet, matching
        // the F2F mark. Banking-grade palettes (N26, Revolut, Wise) lean on
        // ONE accent used sparingly, not saturating every surface — that
        // discipline is what this ramp replaces the old green with.
        brand: {
          50:  '#f3f1fe',
          100: '#e6e1fd',
          200: '#c9bffa',
          300: '#a99af5',
          400: '#8874ee',
          500: '#6c56e3',
          600: '#5641c4',
          700: '#43329c',
          800: '#33267a',
          900: '#251b59',
          950: '#16102f',
        },
        navy: {
          800: '#12141c',
          900: '#0a0b10',
          950: '#050609',
        },
        accent: {
          400: '#8874ee',
          500: '#6c56e3',
          600: '#5641c4',
        },
        // "Success/verified" reads as a professional blue rather than
        // green — the same signal banks use for a verified badge.
        success: {
          400: '#6fa8f5',
          500: '#3d7ee8',
          600: '#2e63c2',
        },
        warning: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        danger: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0b10 0%, #16102f 55%, #050609 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'brand-gradient': 'linear-gradient(135deg, #6c56e3 0%, #8874ee 100%)',
        'success-gradient': 'linear-gradient(135deg, #3d7ee8 0%, #6fa8f5 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(108, 86, 227, 0.15)',
        'glow': '0 0 20px rgba(108, 86, 227, 0.4)',
        'glow-success': '0 0 20px rgba(61, 126, 232, 0.4)',
        'glow-danger': '0 0 20px rgba(239, 68, 68, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
