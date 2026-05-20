export const colors = {
  bg: '#030408',
  bgSecondary: '#080b10',
  panel: 'rgba(255,255,255,0.04)',
  panelStrong: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.1)',
  borderStrong: 'rgba(255,255,255,0.18)',
  text: '#f0f4f8',
  muted: 'rgba(240,244,248,0.6)',
  faint: 'rgba(240,244,248,0.35)',
  quantumBlue: '#6EE7FF',
  quantumBlueDim: '#3B8EA5',
  auroraGreen: '#00FFB2',
  auroraGreenDim: '#0A7B52',
  pulseOrange: '#FF8A3D',
} as const

export const spring = {
  gentle: { type: 'spring' as const, stiffness: 120, damping: 14, mass: 1 },
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 15, mass: 0.8 },
  stiff: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 1 },
  smooth: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1 },
} as const

export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
} as const

export const easing = {
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const
