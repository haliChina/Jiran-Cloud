import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        quantum: {
          bg: '#030408',
          panel: 'rgba(255,255,255,0.04)',
          'panel-strong': 'rgba(255,255,255,0.08)',
          border: 'rgba(255,255,255,0.1)',
          'border-strong': 'rgba(255,255,255,0.18)',
          text: '#f0f4f8',
          muted: 'rgba(240,244,248,0.6)',
          faint: 'rgba(240,244,248,0.35)',
          blue: '#6EE7FF',
          'blue-dim': '#3B8EA5',
          green: '#00FFB2',
          'green-dim': '#0A7B52',
          orange: '#FF8A3D',
          white: '#ffffff',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
      },
      maxWidth: {
        shell: '1180px',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 7s ease-in-out infinite',
        'radar': 'radar 5.2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'typewriter': 'typewriter 0.5s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%, 35%': { transform: 'translateX(-120%)' },
          '55%, 100%': { transform: 'translateX(120%)' },
        },
        radar: {
          to: { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        typewriter: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
