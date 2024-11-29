import { useEffect, useMemo, useState } from 'react'
import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Spinner from './ui/loading/Spinner'
import Error404 from './Layout/Error404'
import { useAppStore } from './store/useAppStore'

const queryClient = new QueryClient()

function App() {
  const [user, setUser] = useState({ name: 'public' })
  const { isTokenExpired, clearToken } = useAppStore()

  useEffect(() => {
    if (isTokenExpired()) {
      setUser(null)
      clearToken()
    }
  }, [isTokenExpired, clearToken])

  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        context: {
          user: user,
          setUser: setUser,
          queryClient,
        },
        defaultPreload: 'intent',
        defaultPreloadStaleTime: 0,
        defaultNotFoundComponent: () => Error404,
      }),
    []
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
