import { useMemo } from 'react'

import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Spinner from './ui/loading/Spinner'
import Error404 from './Layout/Error404'

import useFetchCurrentUser from './hooks/useFetchCurrentUser'

const queryClient = new QueryClient()

function App() {
  const { currentUser, setCurrentUser } = useFetchCurrentUser(); // hook que maneja estado Current User

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
    [currentUser, setCurrentUser]
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
