const config = {
  navbar: {
    default: [
      { name: 'Home', path: '/' },
      { name: 'Login', path: '/login' },
      { name: 'Profile', path: '/profile' },
      { name: 'Proyectos', path: '/projects' },
      { name: 'Tareas', path: '/task' },
      { name: 'Logout', path: '/logout' },
    ],
  },
  publicUser: {
    data: {
      given_name: 'public', // Este dato se verifica en private
      full_name: 'Usuario no logueado'
    }
  }
}

export default config