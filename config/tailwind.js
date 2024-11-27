import defaultTheme from 'tailwindcss/defaultTheme'

export const config = {
  // Gama de colores
  colors: [
    // https://paletton.com/#uid=63C0F0kucHKdCQnmpKgGWulJrli
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
  // Colroes fijos
  simpleColors: {
    white: '#ffffff',      // Blanco
    black: '#111111',       // Negro
  },
  // Información de la empresa (se autocompleta en footer y enlace redes sociales)
  empresa: {
    name: "Ideas Propias",
    descripcion: "Consultora integral de negocios que asesora a empresas, empresarios y emprendedores que tienen ambición de progresar en su negocio.",
    direccion: "dirección",
    email: "email@email.com",
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/plan.x5/",
    facebook: "https://www.facebook.com/PlanX5/",
    youtube: "https://www.youtube.com/channel/UCV4sFnwo1RnMLCIT8xPZ7Yg",
    whatsapp: "351-1234567",
  },
  // Imagenes. se clasifica segun la pagina 
  images: {
    logo: [
      "/logo.svg",
      "/logo-color.svg", // pos 1 logo
      "/logo-planx5.png",
    ],
    index: [
      "/images/hero_inicio.jpeg", // pos 0 Hero
    ],
    about: [
      "/images/Diego-presentando.jpg", // pos 0 Hero
    ],
    services: [
      "/images/capacitacion.jpeg", // pos 0 Hero
    ],
    contact: [
      "/images/Conversacion.jpeg", // pos 0 Hero
    ],
  },
  // Objeto que detalle servicios prestados
  servicios: [ // TODO pasar a "Markdown"
    {
      title: "Disertación",
      subtitle: "Detalles",
      img: "/Icono.svg",
      url: "#",
    },
    {
      title: "Asistencia",
      subtitle: "Detalles",
      img: "/Icono.svg",
      url: "#",
    },
    {
      title: "Rescate",
      subtitle: "Detalles",
      img: "/Icono.svg",
      url: "#",
    },
  ],
  blog: "Markdown",
}

// Coniguracion de extensión de Tailwind
export const tailwindExtend = {
  fontFamily: {
    title: ['Francois One', ...defaultTheme.fontFamily.sans],
    subtitle: ['Poiret One', ...defaultTheme.fontFamily.sans],
  },
  colors: {
    primary: config.colors[1],
    secondary: config.colors[2],
    tertiary: config.colors[3],
    complementary: config.colors[0],
    white: config.simpleColors.white,
    black: config.simpleColors.black,
  },
  boxShadow: {
    // Resplandor
    'glow': '0 0 15px rgba(0, 0, 0, 0.7)',
    // Sombra abajo a la derecha
    'bottom': '4px 4px 10px rgba(0, 0, 0, 0.3)',
    // Sombra combinada (abajo a la derecha negra y arriba a la izquierda blanca)
    'double': '4px 4px 8px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.5)',
  },
  height: {
    "104": "26rem",
    "112": "28rem",
    "120": "30rem",
    "128": "32rem",
    "136": "34rem",
    "144": "36rem",
  }
}