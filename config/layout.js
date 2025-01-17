const config = {
  navbar: {
    default: [
      { name: 'Home', path: '/' },
      { name: 'Servicios', path: '/services' },
      { name: 'Conocenos', path: '/about' },
      { name: 'Login', path: '/login' },
    ],
    public_It: [
      { name: 'Home', path: '/introit' },
      { name: 'Participa', path: '/participa' },
      { name: 'Conocenos', path: '/aboutit' },
      { name: 'Reglas', path: '/reglas' },
      { name: 'Login', path: '/login' },
    ],
    private: [
      { name: 'Proyectos', path: '/projects' },
      { name: 'Recursos', path: '/resources' },
      { name: 'Code', path: '/codes' },
      { name: 'Asociados', path: '/asociates' },
      { name: 'Clientes', path: '/clients' },
      { name: 'Logout', path: '/logout' },
    ],
  },
  idleUser: {
    data: {
      given_name: 'idle', // Este dato se verifica en private
      full_name: 'Iniciando Usuario'
    }
  },
  publicUser: {
    data: {
      given_name: 'public', // Este dato se verifica en private
      full_name: 'Usuario no logueado',
      role: 'public',
    }
  },
  path: {
    login: '/projects', // luego de que loguea
    private: '/login', // cuando intenta entrar a una ruta privada
  },
}

export const icons = {
  x: 'bx:x', // X de cerrar
  addEle: 'fluent:stack-add-20-regular', // agregar Elemento
  plus: 'ph:plus-fill', // agregar uno m+as +
  edit: "mage:edit", // editar contenido
  reset: "ix:reset", // resetear
  deploy: 'eos-icons:deploy', // deploy
  repository: 'mdi:bookmark-outline',
}

export const styles = {
  button: "px-2 py-2 text-center rounded transition-all",
}

export const variant = {
  primary: " bg-primary hover:bg-primary-dark text-white",
  secondary: " bg-secondary hover:bg-secondary-dark text-white",
  tertiary: " bg-tertiary hover:bg-tertiary-dark text-white",
  complementary: " bg-complementary hover:bg-complementary-dark text-white",
  danger: " bg-red-700 hover:bg-red-900 text-white",
  success: " bg-green-700 hover:bg-green-900 text-white",
  warning: " bg-yellow-700 hover:bg-yellow-900 text-white",
}

export default config

// Breakpoint prefix	Minimum width	CSS
// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }