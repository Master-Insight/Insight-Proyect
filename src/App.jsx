import { useEffect, useMemo, useState } from 'react'

import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Spinner from './ui/loading/Spinner'
import Error404 from './Layout/Error404'

import useAuthStore from './store/useAuthStore'
import myAxios from './api/axiosInstance'
import config from '../config/layout'

const queryClient = new QueryClient()

function App() {
  // Context User (precarga localstorage) - Evita F5 en publico
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : config.publicUser;
  });

  // Actualizar localStorage al cambiar el usuario actual
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const { accessToken, clearAccessToken } = useAuthStore(); // Acceso token

  // Efecto para obtener el usuario actual al iniciar la app o cambiar el token
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!accessToken) {
        console.log('No hay token, usuario no autenticado');
        setCurrentUser(config.publicUser);
        return;
      }

      try {
        // console.log('Obteniendo usuario con el token:', accessToken);
        const response = await myAxios.get('/v1/users/current');
        console.log('Usuario autenticado:', response.data);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        clearAccessToken();
        setCurrentUser(config.publicUser);
      }
    };

    fetchCurrentUser();
  }, [accessToken, clearAccessToken]);

  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        context: {
          currentUser,
          setCurrentUser,
          queryClient,
        },
        defaultPreload: 'intent',
        defaultPreloadStaleTime: 0,
        defaultNotFoundComponent: () => Error404,
      }),
    [currentUser]
  )

  if (!router) {
    return <div className={`p-2 text-2xl`}>Cargando... <Spinner /></div>
  }
  return (
    // https://www.youtube.com/watch?v=PS4Sz9erGgg
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </QueryClientProvider>
  )
}

export default App
