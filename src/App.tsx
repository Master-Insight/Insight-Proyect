import { useMemo, useState } from 'react'
import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import './App.css'

function App() {
  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        context: {},
      }),
    []
  )
  return (
    <>
      <RouterProvider router={router}/>
      <TanStackRouterDevtools router={router} />
    </>
  )
}

export default App
