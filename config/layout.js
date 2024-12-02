const config = {
  navbar: {
    default: [
      { name: 'Home', path: '/' },
      { name: 'Login', path: '/login' },
    ],
    private: [
      { name: 'Proyectos', path: '/projects' },
      { name: 'Logout', path: '/logout' },
    ],
  },
  publicUser: {
    data: {
      given_name: 'public', // Este dato se verifica en private
      full_name: 'Usuario no logueado'
    }
  },
  path: {
    login: '/projects', // luego de que loguea
    private: '/login', // cuando intenta entrar a una ruta privada
  },
}

export const icons = {
  x: 'bx:x',
  plus: 'ph:plus-fill',
  addEle: 'fluent:stack-add-20-regular',
}

export default config