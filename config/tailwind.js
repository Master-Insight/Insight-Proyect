import defaultTheme from 'tailwindcss/defaultTheme'

// https://paletton.com/#uid=63C0F0kucHKdCQnmpKgGWulJrli
export const tailwindColors = {
  colors: [
    { // 0 - Color complementary
      lighter: '#FFD593',
      light: '#FFBA4D',
      DEFAULT: '#FFA20E',
      dark: '#F29400',
      darker: '#AA6800',
    },
    { // 1 - Color principal
      lighter: '#8AB2E2',
      light: '#4B88D1',
      DEFAULT: '#1B6BCA',
      dark: '#084C9E',
      darker: '#05356F',
    },
    { // 2 - Color secondary
      lighter: '#85E7AD',
      light: '#41DA7F',
      DEFAULT: '#0CD45D',
      dark: '#00AE46',
      darker: '#007A31',
    },
    { // 3 -Color tertiary
      lighter: '#FFD593',
      light: '#FFBA4D',
      DEFAULT: '#FFA20E',
      dark: '#F29400',
      darker: '#AA6800',
    },
  ],
  // Colores fijos
  simpleColors: {
    white: '#ffffff',      // Blanco
    black: '#111111',       // Negro
  },
}

// Coniguracion de extensión de Tailwind
export const tailwindExtend = {
  fontFamily: {
    title: ['Montserrat', ...defaultTheme.fontFamily.sans],
    subtitle: ['Lato', ...defaultTheme.fontFamily.sans],

  },
  colors: {
    primary: tailwindColors.colors[1],
    secondary: tailwindColors.colors[2],
    tertiary: tailwindColors.colors[3],
    complementary: tailwindColors.colors[0],
    white: tailwindColors.simpleColors.white,
    black: tailwindColors.simpleColors.black,
  },
  boxShadow: {
    custom: '0px 0px 20px 2px #00000033',
    // Resplandor
    glow: '0 0 15px rgba(0, 0, 0, 0.7)',
    // Sombra abajo a la derecha
    bottom: '4px 4px 10px rgba(0, 0, 0, 0.3)',
    // Sombra combinada (abajo a la derecha negra y arriba a la izquierda blanca)
    double: '4px 4px 8px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.5)',
  },
  height: {
    "104": "26rem",
    "112": "28rem",
    "120": "30rem",
    "128": "32rem",
    "136": "34rem",
    "144": "36rem",
  },
  padding: {
    "18": "4.5rem",
  }
}


// Breakpoint prefix	Minimum width	CSS
// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }