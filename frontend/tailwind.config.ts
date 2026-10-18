import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:      { DEFAULT: '#FAF7F2', dark: '#F0EBE3' },
        charcoal:   { DEFAULT: '#1E1E1E', light: '#3A3A3A' },
        terracotta: { DEFAULT: '#B4552D', light: '#D4754D', dark: '#8C3F1E', pale: '#F5E6DE' },
        sand:       { DEFAULT: '#E7DFD5', dark: '#D1C7BB' },
        muted:      { DEFAULT: '#6B625A', light: '#8A827A' },
        line:       { DEFAULT: '#E7DFD5' },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        box:  '16px',
        btn:  '8px',
      },
      boxShadow: {
        subtle:  '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        card:    '0 4px 12px rgba(0,0,0,0.06)',
        lift:    '0 8px 24px rgba(0,0,0,0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up':  'fade-up 0.6s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
